'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin_user',
        email: 'admin@example.com',
        password: 'leirhoj',
        role_id: 1,
        created: date,
        modified: date
      },
      {
        username: 'librarian_user',
        email: 'librarian@example.com',
        password: 'leirhoj',
        role_id: 2, 
        created: date,
        modified: date
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
