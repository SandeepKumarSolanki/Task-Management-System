'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'status_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'task_status',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'status_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },
};
