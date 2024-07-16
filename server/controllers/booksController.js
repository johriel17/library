import { sequelize, Book, BorrowedBook } from '../models/index.js'; 
import { Op } from 'sequelize';


export const getBooks = async (req, res) => {
  const { search = '', page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const searchTerm = `%${search}%`;

  try {
    const { rows: books, count: totalItems } = await Book.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: searchTerm } },
          { author: { [Op.like]: searchTerm } },
          { publisher: { [Op.like]: searchTerm } }
        ]
      },
      order: [['created', 'DESC']],
      limit: parseInt(pageSize),
      offset: parseInt(offset)
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    res.status(200).json({
      books,
      pagination: { totalItems, totalPages, currentPage: parseInt(page), pageSize: parseInt(pageSize) }
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
};



export const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'No such book' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book' });
  }
};


export const addBook = async (req, res) => {
  const { bookNumber, title, author, publisher, year, copies } = req.body;

  const errors = {}

  if (!bookNumber) {
    errors.bookNumber = "book number is required";
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

  try {
    const newBook = await Book.create({
      book_number: bookNumber,
      title,
      author,
      publisher,
      year,
      copies,
      created: new Date(),
      modified: new Date()
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Error adding book' });
  }
};


export const updateBook = async (req, res) => {
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

  try {
    const [affectedRows] = await Book.update({
      book_number: bookNumber,
      title,
      author,
      publisher,
      year,
      copies,
      modified: new Date()
    }, {
      where: { id },
      returning: true // To get updated record in the response
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'No such book' });
    }

    const updatedBook = await Book.findByPk(id);
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
};


export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Book.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'No such book' });
    }

    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
};

export const borrowBook = async (req, res) => {
  const { book_id, borrowedBy, dueDate, borrowerEmail } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const newBorrowedBook = await BorrowedBook.create({
      book_id,
      borrowed_by: borrowedBy,
      due_date: dueDate,
      borrower_email: borrowerEmail,
      created: new Date(),
      modified: new Date()
    }, { transaction });

    // Update borrowed copies in books table
    await Book.increment('borrowed_copies', { where: { id: book_id }, transaction });

    await transaction.commit();

    res.status(201).json(newBorrowedBook);
  } catch (error) {
    await transaction.rollback();
    console.error('Error borrowing book:', error);
    res.status(500).json({ error: 'Error borrowing book' });
  }
};


