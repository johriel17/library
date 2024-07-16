import { Book, BorrowedBook } from '../models/index.js';

export const booksCount = async (req, res) => {
  try {
    const count = await Book.count();
    res.status(200).json(count);
  } catch (error) {
    console.error('Error counting books:', error);
    res.status(500).json({ error: 'Error counting books' });
  }
};

export const borrowedBooksCount = async (req, res) => {
  try {
    const count = await BorrowedBook.count();
    res.status(200).json(count);
  } catch (error) {
    console.error('Error counting borrowed books:', error);
    res.status(500).json({ error: 'Error counting borrowed books' });
  }
};

export const notReturnedBooksCount = async (req, res) => {
  try {
    const count = await BorrowedBook.count({ where: { is_returned: false } });
    res.status(200).json(count);
  } catch (error) {
    console.error('Error counting not returned books:', error);
    res.status(500).json({ error: 'Error counting not returned books' });
  }
};
