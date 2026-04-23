'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Seeder} */

module.exports = {

  async up(queryInterface, Sequelize) {

    const roles = await queryInterface.sequelize.query(
      `SELECT id, slug FROM roles`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const departments = await queryInterface.sequelize.query(
      `SELECT id, name FROM departments`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const designations = await queryInterface.sequelize.query(
      `SELECT id, name FROM designations`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roleMap = Object.fromEntries(
      roles.map(r => [r.slug, r.id])
    );

    const deptMap = Object.fromEntries(
      departments.map(d => [d.name, d.id])
    );

    const desigMap = Object.fromEntries(
      designations.map(d => [d.name, d.id])
    );

    const password = await bcrypt.hash('123456', 10);


    await queryInterface.bulkInsert('users', [
      {
        name: 'Ramesh Kumar',
        email: 'ramesh@company.com',
        password,
        department_id: deptMap['IT'],
        role_id: roleMap['manager'],
        designation_id: null,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Suresh Patel',
        email: 'suresh@company.com',
        password,
        department_id: deptMap['IT'],
        role_id: roleMap['team_leader'],
        designation_id: desigMap['Team Leader'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Amit Sharma',
        email: 'amit@company.com',
        password,
        department_id: deptMap['IT'],
        role_id: roleMap['user'],
        designation_id: desigMap['Frontend Developer'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Priya Singh',
        email: 'priya@company.com',
        password,
        department_id: deptMap['IT'],
        role_id: roleMap['user'],
        designation_id: desigMap['Backend Developer'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Vikram Jain',
        email: 'vikram@company.com',
        password,
        department_id: deptMap['Finance'],
        role_id: roleMap['user'],
        designation_id: desigMap['Tax Accountant'],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }

};