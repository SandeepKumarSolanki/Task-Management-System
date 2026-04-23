'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [

      {
        name: 'Manager',
        slug: 'manager',
        description: 'Department Manager',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Team Leader',
        slug: 'team_leader',
        description: 'Leads team members',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'User',
        slug: 'user',
        description: 'Normal Employee',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});

  }
};
