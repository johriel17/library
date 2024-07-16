import { sequelize, Book } from '../models/index.js';
import { Op } from 'sequelize';

export const selectBook = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        copies: { [Op.gt]: 0 },
        borrowed_copies: { [Op.lt]: sequelize.col('copies') }
      },
      attributes: ['id', 'title', 'author']
    });

    const data = books.map(book => ({
      id: book.id,
      val: `${book.title} - ${book.author}`
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error('Error selecting books:', error);
    res.status(500).json({ error: 'Error selecting books' });
  }
};
