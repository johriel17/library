'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        created: date,
        modified: date
      },
      {
        name: 'librarian',
        created: date,
        modified: date
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};