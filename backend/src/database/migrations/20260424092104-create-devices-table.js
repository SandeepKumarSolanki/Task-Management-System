'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('devices', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      device_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      device_name: Sequelize.STRING,

      device_type: Sequelize.STRING,

      browser: Sequelize.STRING,

      ip_address: Sequelize.STRING,

      user_agent: Sequelize.TEXT,

      last_login_at: Sequelize.DATE,

      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('devices');
  },
};