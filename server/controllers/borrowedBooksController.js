import { sequelize, BorrowedBook, Book } from '../models/index.js';
import { Op } from 'sequelize';
import { sendEmailNotification } from '../util/emailer.js'

export const getBorrowedBooks = async (req, res) => {
  const { search = '', page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const searchTerm = `%${search}%`;

  try {
    const { count, rows } = await BorrowedBook.findAndCountAll({
      where: {
        borrowed_by: {
          [Op.like]: searchTerm
        }
      },
      include: [{
        model: Book,
        attributes: ['title', 'author']
      }],
      order: [['created', 'DESC']],
      limit: pageSize,
      offset: offset
    });

    const totalItems = count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // rows.forEach(row => {
    //   row.due_date = new Date(row.due_date).toLocaleDateString('en-US');
    //   if (row.returned_date) {
    //     row.returned_date = new Date(row.returned_date).toLocaleDateString('en-US');
    //   }
    // });

    const response = {
      borrowed_books: rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ error: 'Error fetching borrowed books' });
  }
};


export const getBorrowedBook = async (req, res) => {
  const { id } = req.params;

  try {
    const borrowedBook = await BorrowedBook.findOne({
      where: { id },
      include: [{
        model: Book,
        attributes: ['title']
      }]
    });

    if (!borrowedBook) {
      return res.status(404).json({ error: "No such Borrowed Book" });
    }

    // borrowedBook.due_date = new Date(borrowedBook.due_date).toLocaleDateString('en-US');
    // if (borrowedBook.returned_date) {
    //   borrowedBook.returned_date = new Date(borrowedBook.returned_date).toLocaleDateString('en-US');
    // }

    res.status(200).json(borrowedBook);
  } catch (error) {
    console.error('Error fetching borrowed book:', error);
    res.status(500).json({ error: 'Error fetching borrowed book' });
  }
};


export const addBorrowedBook = async (req, res) => {
  const { selectedBook, borrowedBy, dueDate, borrowerEmail } = req.body;

  const errors = {}

  if (!selectedBook) {
    errors.selectedBook = "select a book";
  }
  if (!borrowedBy) {
    errors.borrowedBy = "borrorwed by is required";
  }
  if (!dueDate) {
    errors.dueDate = "due date is required";
  }
  if (!borrowerEmail) {
    errors.borrowerEmail = "borrower email is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please fill out all the fields", errors });
  }

  try {
    const date = new Date();

    const newBorrowedBook = await BorrowedBook.create({
      book_id: selectedBook,
      borrowed_by: borrowedBy,
      borrower_email: borrowerEmail,
      due_date: dueDate,
      created: date,
      modified: date
    });

    await Book.increment('borrowed_copies', { where: { id: selectedBook } });

    res.status(201).json(newBorrowedBook);
  } catch (error) {
    console.error('Error adding borrowed book:', error);
    res.status(500).json({ error: 'Error adding borrowed book' });
  }
};


export const updateBorrowedBook = async (req, res) => {
  const { id } = req.params;
  const { selectedBook, borrowedBy, borrowerEmail, dueDate } = req.body;

  const errors = {}

  if (!selectedBook) {
    errors.selectedBook = "select a book";
  }
  if (!borrowedBy) {
    errors.borrowedBy = "borrorwed by is required";
  }
  if (!dueDate) {
    errors.dueDate = "due date is required";
  }
  if (!borrowerEmail) {
    errors.borrowerEmail = "borrower email is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please fill out all the fields", errors });
  }

  try {
    const date = new Date();

    const [updatedRowsCount, updatedRows] = await BorrowedBook.update({
      book_id: selectedBook,
      borrowed_by: borrowedBy,
      borrower_email: borrowerEmail,
      due_date: dueDate,
      modified: date
    }, {
      where: { id },
      returning: true
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "No such borrowed book" });
    }

    res.status(200).json(updatedRows[0]);
  } catch (error) {
    console.error('Error updating borrowed book:', error);
    res.status(500).json({ error: 'Error updating borrowed book' });
  }
};


export const deleteBorrowedBook = async (req, res) => {
  const { id, book_id } = req.params;

  try {
    const borrowedBook = await BorrowedBook.findByPk(id);

    if (!borrowedBook) {
      return res.status(404).json({ error: "No such borrowed book" });
    }

    await borrowedBook.destroy();

    if (!borrowedBook.is_returned) {
      await Book.decrement('borrowed_copies', { where: { id: book_id } });
    }

    res.status(200).json({ message: "Borrowed book deleted", data: borrowedBook });
  } catch (error) {
    console.error('Error deleting borrowed book:', error);
    res.status(500).json({ error: 'Error deleting borrowed book' });
  }
};


export const returnBook = async (req, res) => {
  const { id, book_id } = req.params;
  const { returnDate } = req.body;

  try {
    const date = new Date();

    const [updatedRowsCount] = await BorrowedBook.update({
      is_returned: true,
      returned_date: returnDate,
      modified: date
    }, {
      where: { id },
      returning: true
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "No such borrowed book" });
    }

    await Book.decrement('borrowed_copies', { where: { id: book_id } });

    const updatedRow = await BorrowedBook.findOne({
      where: { id },
      include: [{
        model: Book,
        attributes: ['title']
      }]
    });

    res.status(200).json(updatedRow);
  } catch (error) {
    console.error('Error returning borrowed book:', error);
    res.status(500).json({ error: 'Error returning borrowed book' });
  }
};


export const notify = async (req,res) => {
  
  const {dueDate, email} = req.query

   sendEmailNotification(
    email,
    'Book Return',
    `Please return it by the due date: ${dueDate}.`
  );


  res.status(200).json({message : "Email Sent!"});
}
  

