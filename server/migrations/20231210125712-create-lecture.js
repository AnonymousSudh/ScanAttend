'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lectures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facultyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Faculties',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      divisionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Divisions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      subjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      lectureDate: {
        type: Sequelize.DATE
      },
      startTime: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Lectures');
  }
};