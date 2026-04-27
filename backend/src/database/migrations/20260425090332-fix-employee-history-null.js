module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('employee_histories', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('employee_histories', 'department_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('employee_histories', 'designation_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_histories');
  }
};