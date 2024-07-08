import pool from '../config/database.js'

export const getBorrowedBooks = (req, res) => {
  const { search = '', page = 1, pageSize = 10 } = req.query;

  const offset = (page - 1) * pageSize;

  const query = `
    SELECT BorrowedBooks.*, Books.title, Books.author
    FROM borrowed_books BorrowedBooks
    JOIN books Books ON BorrowedBooks.book_id = Books.id
    WHERE BorrowedBooks.borrowed_by LIKE ?
    ORDER BY created DESC
    LIMIT ? OFFSET ?;
  `;

  const searchTerm = `%${search}%`;

  pool.query(query, [searchTerm, parseInt(pageSize), parseInt(offset)], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    
    const countQuery = `
      SELECT COUNT(*) AS total FROM borrowed_books
      WHERE borrowed_by LIKE ?
    `;

    pool.query(countQuery, [searchTerm], (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / pageSize);

      results.forEach(result => {
        const dueDate = new Date(result.due_date);
        result.due_date = dueDate.toLocaleDateString('en-US');
        const returDate = new Date(result.returned_date);
        result.returned_date = returDate.toLocaleDateString('en-US');
      });

      const response = {
        borrowed_books: results,
        pagination: {
          totalItems,
          totalPages,
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
        },
      };

      res.status(200).json(response);
    });
  });
};


export const getBorrowedBook = (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT BorrowedBooks.*, Books.title FROM borrowed_books BorrowedBooks JOIN books Books ON BorrowedBooks.book_id = Books.id WHERE BorrowedBooks.id = ${id}`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    results.forEach(result => {
        const dueDate = new Date(result.due_date);
        result.due_date = dueDate.toLocaleDateString('en-US');
        const returDate = new Date(result.returned_date);
        result.returned_date = returDate.toLocaleDateString('en-US');
    });

    if (results.length === 0) {
      return res.status(404).json({ error: "No such Borrowd Book" });
    }
    res.status(200).json(results);
  });
};

export const addBorrowedBook = async (req, res) => {
  const { selectedBook, borrowedBy, dueDate} = req.body;

  const errors = {}

  if (!selectedBook) {
    errors.selectedBook = "select a book";
  }
  if (!borrowedBy) {
    errors.borrowedBy = "borrorwedBy is required";
  }
  if (!dueDate) {
    errors.dueDate = "dueDate is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please fill out all the fields", errors });
  }

  const date = new Date();

  pool.query(
    "INSERT INTO borrowed_books (book_id, borrowed_by, due_date, created, modified) VALUES (?, ?, ?, ?, ?)",
    [selectedBook, borrowedBy, dueDate, date, date],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      pool.query(
        "UPDATE books SET borrowed_copies = borrowed_copies + 1 WHERE id = ?",
        [selectedBook],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({ id: results.insertId, selectedBook, borrowedBy, dueDate });
        }
      );
    }
  );
};

export const updateBorrowedBook = (req, res) => {
  const { id } = req.params;
  const { selectedBook, borrowedBy, dueDate} = req.body;

  const errors = {}

  if (!selectedBook) {
    errors.selectedBook = "select a book";
  }
  if (!borrowedBy) {
    errors.borrowedBy = "borrorwedBy is required";
  }
  if (!dueDate) {
    errors.dueDate = "dueDate is required";
  }


  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please fill out all the fields", errors });
  }

  const date = new Date()

  pool.query(
    "UPDATE borrowed_books SET book_id = ?, borrowed_by = ?, due_date = ?, modified = ? WHERE id = ?",
    [selectedBook, borrowedBy, dueDate, date, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "No such borrowed book" });
      }
      res
        .status(200)
        .json({ message: "Book updated", id, selectedBook, borrowedBy, dueDate });
    }
  );
};

export const deleteBorrowedBook = (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM borrowed_books WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "No such book" });
    }
    res.status(200).json({ message: "Book deleted" });
  });
};

export const returnBook = (req, res) => {
    const { id, book_id } = req.params;
    const {returnDate} = req.body

    const date = new Date();
    pool.query(
      "UPDATE borrowed_books SET is_returned = ?, returned_date = ?, modified = ? WHERE id = ?",
      [true, returnDate, date, id],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "No such borrowed book" });
        }
  
        pool.query(
          `SELECT BorrowedBooks.*, Books.title FROM borrowed_books BorrowedBooks JOIN books Books ON BorrowedBooks.book_id = Books.id WHERE BorrowedBooks.id = ${id}`,
          (err, selectResults) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
  
            if (selectResults.length === 0) {
              return res.status(404).json({ error: "No such borrowed book" });
            }

            pool.query(
              "UPDATE books SET borrowed_copies = borrowed_copies - 1 WHERE id = ?",
              [book_id],
              (err) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }
      
                selectResults.forEach(result => {
                  result.due_date = new Date(result.due_date).toLocaleDateString('en-US');
                  result.returned_date = new Date(result.returned_date).toLocaleDateString('en-US');
                });
    
              res.status(200).json(selectResults);
              }
            );

          }
        );
      }
    );
  };
  

