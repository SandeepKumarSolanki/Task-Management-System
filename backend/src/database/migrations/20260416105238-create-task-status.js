'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_status', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },


      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },


      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },


      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });

    /* ===============================
       INDEXES (VERY IMPORTANT)
    =============================== */

    await queryInterface.addIndex('task_status', ['code']);
    await queryInterface.addIndex('task_status', ['is_active']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('task_status');
  },
};