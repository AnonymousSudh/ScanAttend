'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacultyCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FacultyCourse.init({
    facultyId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FacultyCourse',
  });
  return FacultyCourse;
};