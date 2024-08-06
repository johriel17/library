import sequelize from '../config/database.js';
import Book from './booksModel.js';
import BorrowedBook from './borrowedBooksModel.js';
import User from './usersModel.js';
import Role from './rolesModel.js';

// Define associations
Book.hasMany(BorrowedBook, { foreignKey: 'book_id' });
BorrowedBook.belongsTo(Book, { foreignKey: 'book_id' });
Role.hasMany(User, { foreignKey: 'role_id'});
User.belongsTo(Role, { foreignKey: 'role_id'})

// Export models and Sequelize instance
export { 
    sequelize,
    Book,
    BorrowedBook,
    User,
    Role 
};