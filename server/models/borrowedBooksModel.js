import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BorrowedBook = sequelize.define('BorrowedBook', {
  book_id: { type: DataTypes.INTEGER, allowNull: false },
  borrowed_by: { type: DataTypes.STRING, allowNull: false },
  due_date: { type: DataTypes.DATEONLY, allowNull: false },
  is_returned: { type: DataTypes.TINYINT, defaultValue: 0},
  returned_date : { type: DataTypes.DATEONLY, allowNull: true},
  borrower_email: { type: DataTypes.STRING, allowNull: false },
  created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});

export default BorrowedBook;