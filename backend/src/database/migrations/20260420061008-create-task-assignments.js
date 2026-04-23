'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_assignments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      developer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      assigned_by: {
        type: Sequelize.INTEGER,
      },

      assigned_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task_assignments');
  }
};
