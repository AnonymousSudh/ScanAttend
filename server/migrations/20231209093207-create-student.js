'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.BIGINT
      },
      deviceAddress: {
        type: Sequelize.STRING
      },
      rollNumber: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      programName: {
        type: Sequelize.STRING
      },
      programSemester: {
        type: Sequelize.STRING
      },
      authToken: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};