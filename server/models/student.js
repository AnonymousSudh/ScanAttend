'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    userName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    mobileNumber: DataTypes.BIGINT,
    deviceAddress: DataTypes.STRING,
    rollNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    course: DataTypes.STRING,
    authToken: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};