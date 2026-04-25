'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      device_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'devices',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      access_token: Sequelize.TEXT,

      refresh_token: Sequelize.TEXT,

      ip_address: Sequelize.STRING,

      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      login_at: Sequelize.DATE,

      logout_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sessions');
  },
};