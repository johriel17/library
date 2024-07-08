import pool from '../config/database.js'

export const getBooks = (req, res) => {
  const { search = '', page = 1, pageSize = 10 } = req.query;

  const offset = (page - 1) * pageSize;

  const query = `
    SELECT * FROM books
    WHERE title LIKE ? OR author LIKE ? OR publisher LIKE ?
    LIMIT ? OFFSET ?;
  `;

  const searchTerm = `%${search}%`;

  pool.query(query, [searchTerm, searchTerm, searchTerm, parseInt(pageSize), parseInt(offset)], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    
    const countQuery = `
      SELECT COUNT(*) AS total FROM books
      WHERE title LIKE ? OR author LIKE ? OR publisher LIKE ?
    `;

    pool.query(countQuery, [searchTerm, searchTerm, searchTerm], (err, countResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / pageSize);

      
      const response = {
        books: results,
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


export const getBook = (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT * FROM books WHERE id = ${id}`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No such book" });
    }
    res.status(200).json(results);
  });
};

export const addBook = async (req, res) => {
  const { bookNumber, title, author, publisher, year, copies } = req.body;

  const errors = {}

  if (!bookNumber) {
    errors.bookNumber = "bookNumber is required";
  }
  if (!title) {
    errors.title = "title is required";
  }
  if (!author) {
    errors.author = "author is required";
  }
  if (!publisher) {
    errors.publisher = "publisher is required";
  }
  if (!year) {
    errors.year = "year is required";
  }
  if (!copies) {
    errors.copies = "copies is required";
  }


  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please fill out all the fields", errors });
  }

  const date = new Date();

  pool.query(
    "INSERT INTO books (book_number, title, author, publisher, year, copies, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [bookNumber, title, author, publisher, year, copies, date, date],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, bookNumber, title, author, publisher, year, copies });
    }
  );
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { bookNumber, title, author, publisher, year, copies } = req.body;

  const errors = {}

  if (!bookNumber) {
    errors.bookNumber = "bookNumber is required";
  }
  if (!title) {
    errors.title = "title is required";
  }
  if (!author) {
    errors.author = "author is required";
  }
  if (!publisher) {
    errors.publisher = "publisher is required";
  }
  if (!year) {
    errors.year = "year is required";
  }
  if (!copies) {
    errors.copies = "copies is required";
  }


  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please fill out all the fields", errors });
  }

  const date = new Date()

  pool.query(
    "UPDATE books SET book_number = ?, title = ?, author = ?, publisher = ?, year = ?, copies = ?, modified = ? WHERE id = ?",
    [bookNumber, title, author, publisher, year, copies, date, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "No such book" });
      }
      res
        .status(200)
        .json({ message: "Book updated", id, bookNumber, title, author, publisher, year, copies });
    }
  );
};

export const deleteBook = (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM books WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "No such book" });
    }
    res.status(200).json({ message: "Book deleted" });
  });
};

export const borrowBook = async (req, res) => {
  const { book_id, borrowedBy, dueDate} = req.body;

  const date = new Date();

  pool.query(
    "INSERT INTO borrowed_books (book_id, borrowed_by, due_date, created, modified) VALUES (?, ?, ?, ?, ?)",
    [book_id, borrowedBy, dueDate, date, date],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      pool.query(
        "UPDATE books SET borrowed_copies = borrowed_copies + 1 WHERE id = ?",
        [book_id],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(201).json({ id: results.insertId, book_id, borrowedBy, dueDate });
        }
      );
    }
  );
};

