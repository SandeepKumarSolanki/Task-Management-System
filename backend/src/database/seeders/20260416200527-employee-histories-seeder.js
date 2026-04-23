'use strict';

/** @type {import('sequelize-cli').Seeder} */

module.exports = {

  async up(queryInterface, Sequelize) {

    const users = await queryInterface.sequelize.query(
      `SELECT id, email, department_id, role_id, designation_id FROM users`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const histories = users
      .filter(user => user.role_id !== null)
      .map(user => ({
        user_id: user.id,
        department_id: user.department_id,
        role_id: user.role_id,
        designation_id: user.designation_id,
        start_date: new Date(),
        end_date: null,
        reason: 'Initial Joining',
        created_at: new Date(),
        updated_at: new Date(),
      }));

    await queryInterface.bulkInsert(
      'employee_histories',
      histories
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_histories', null, {});
  },
};