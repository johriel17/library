import pool from '../config/database.js'

export const getBooks = (req, res) => {
  pool.query("SELECT * FROM books", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
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

