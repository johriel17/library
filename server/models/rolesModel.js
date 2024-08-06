import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  name: { type: DataTypes.STRING, allowNull: false },
  created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});

export default Role;