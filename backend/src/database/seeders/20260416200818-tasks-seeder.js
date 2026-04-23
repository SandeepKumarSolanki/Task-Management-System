'use strict';

/** @type {import('sequelize-cli').Seeder} */

module.exports = {

  async up(queryInterface, Sequelize) {

    const managerUser = await queryInterface.sequelize.query(
      `SELECT u.id FROM users u JOIN roles r ON u.role_id = r.id WHERE r.slug = 'manager' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const teamLeaderUser = await queryInterface.sequelize.query(
      `SELECT u.id FROM users u JOIN roles r ON u.role_id = r.id WHERE r.slug = 'team_leader' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const devUsers = await queryInterface.sequelize.query(
      `SELECT u.id FROM users u JOIN roles r ON u.role_id = r.id WHERE r.slug = 'user' ORDER BY u.id LIMIT 2`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const status = await queryInterface.sequelize.query(
      `SELECT id, code FROM task_status`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const statusMap = Object.fromEntries(
      status.map(s => [s.code, s.id])
    );

    const managerId = managerUser[0]?.id;
    const teamLeaderId = teamLeaderUser[0]?.id;
    const dev1 = devUsers[0]?.id;
    const dev2 = devUsers[1]?.id;

    if (!managerId) {
      throw new Error('No manager user found for task created_by');
    }
    if (!teamLeaderId) {
      throw new Error('No team leader user found for task assigned_to');
    }
    if (!dev1) {
      throw new Error('No developer user found for task assignment');
    }

    await queryInterface.bulkInsert('tasks', [

      {
        title: 'Setup Project Architecture',
        description: 'Initialize NestJS + Sequelize + folder structure',
        created_by: managerId,
        assigned_to: teamLeaderId,
        status_id: statusMap['pending'],
        due_date: new Date('2026-04-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Implement Authentication Module',
        description: 'JWT login/register system',
        created_by: teamLeaderId,
        assigned_to: dev1,
        status_id: statusMap['in_progress'],
        due_date: new Date('2026-04-25'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: 'Build Task Management API',
        description: 'CRUD operations for tasks and assignments',
        created_by: teamLeaderId,
        assigned_to: dev2 || dev1,
        status_id: statusMap['pending'],
        due_date: new Date('2026-04-30'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('tasks', null, {});

  }

};