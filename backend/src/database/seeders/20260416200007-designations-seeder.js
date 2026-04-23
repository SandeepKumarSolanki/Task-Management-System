'use strict';

/** @type {import('sequelize-cli').Seeder} */

module.exports = {

  async up(queryInterface, Sequelize) {
    const departments = await queryInterface.sequelize.query(
      `SELECT id, name FROM departments`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const deptMap = Object.fromEntries(
      departments.map((d) => [d.name, d.id])
    );

    const getDeptId = (name) => {
      if (!deptMap[name]) {
        throw new Error(`Missing department: ${name}`);
      }
      return deptMap[name];
    };

    await queryInterface.bulkInsert('designations', [

      {
        department_id: getDeptId('IT'),
        name: 'Frontend Developer',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        department_id: getDeptId('IT'),
        name: 'Backend Developer',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        department_id: getDeptId('IT'),
        name: 'Fullstack Developer',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        department_id: getDeptId('IT'),
        name: 'Backend Developer',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        department_id: getDeptId('Finance'),
        name: 'Tax Accountant',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        department_id: getDeptId('Finance'),
        name: 'Payroll Accountant',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('designations', null, {});

  }

};