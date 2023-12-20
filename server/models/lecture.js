'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lecture.init({
    facultyId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    divisionId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    lectureDate: DataTypes.DATE,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};