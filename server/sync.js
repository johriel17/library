import { sequelize, Book, BorrowedBook } from './models/index.js'

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Sync all models with the database
    console.log('Database synced');

  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

syncDatabase();