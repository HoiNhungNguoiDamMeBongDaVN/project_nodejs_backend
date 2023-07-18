'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor_specially_clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctor_specially_clinic.init({
    doctorid: DataTypes.INTEGER,
    clinicid: DataTypes.INTEGER,
    specialyid:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'doctor_specially_clinic',
  });
  return doctor_specially_clinic;
};