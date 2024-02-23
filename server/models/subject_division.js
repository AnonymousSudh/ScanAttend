'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject_Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subject_Division.init({
    subjectId: DataTypes.INTEGER,
    divisionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject_Division',
  });
  return Subject_Division;
};