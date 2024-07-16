import sequelize from '../config/database.js';
import Book from './booksModel.js'
import BorrowedBook from './borrowedBooksModel.js';

// Define associations
Book.hasMany(BorrowedBook, { foreignKey: 'book_id' });
BorrowedBook.belongsTo(Book, { foreignKey: 'book_id' });

// Export models and Sequelize instance
export { sequelize, Book, BorrowedBook };