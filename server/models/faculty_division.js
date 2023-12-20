'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty_Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Faculty_Division.init({
    facultyId: DataTypes.INTEGER,
    divisionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Faculty_Division',
  });
  return Faculty_Division;
};