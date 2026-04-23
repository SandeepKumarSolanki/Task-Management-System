'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [

      {
        name: 'IT',
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'HR',
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Finance',
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
