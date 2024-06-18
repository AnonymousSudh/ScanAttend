'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Division.init({
    year: DataTypes.STRING,
    stream: DataTypes.STRING,
    courseId:DataTypes.STRING,
    semester: DataTypes.STRING,
    division: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Division',
  });
  return Division;
};