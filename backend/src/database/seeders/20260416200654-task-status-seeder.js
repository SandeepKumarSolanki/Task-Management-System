'use strict';

/** @type {import('sequelize-cli').Seeder} */

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('task_status', [

      {
        name: 'Pending',
        code: 'pending',
        order: 1,
        is_default: true,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'In Progress',
        code: 'in_progress',
        order: 2,
        is_default: false,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'In Review',
        code: 'in_review',
        order: 3,
        is_default: false,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'Completed',
        code: 'completed',
        order: 4,
        is_default: false,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'Rejected',
        code: 'rejected',
        order: 5,
        is_default: false,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('task_status', null, {});

  }

};