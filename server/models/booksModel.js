import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Book', {
  book_number: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.STRING, allowNull: false },
  copies: { type: DataTypes.INTEGER, allowNull: false },
  borrowed_copies: { type: DataTypes.INTEGER, defaultValue: 0 },
  created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});

export default Book;