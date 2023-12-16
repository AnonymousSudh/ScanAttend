'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      code: {
        type: Sequelize.STRING
      },
      stream: {
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      totalHours: {
        type: Sequelize.STRING
      },
      facultyId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Change to false if facultyId should not be nullable
        references: {
          model: 'faculties', // Name of the referenced table
          key: 'id' // Primary key of the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('Courses');
  }
};