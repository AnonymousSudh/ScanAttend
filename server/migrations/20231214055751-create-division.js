'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Divisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      stream: {
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      courseId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Divisions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

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
    await queryInterface.dropTable('Divisions');
  }
};