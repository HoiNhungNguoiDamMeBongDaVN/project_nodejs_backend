'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //query table in mysql
      allcodes.hasMany(models.user, { foreignKey: 'positionid', as: 'positionData' }),
        allcodes.hasMany(models.user, { foreignKey: 'gender', as: 'genderData' }),
        allcodes.hasMany(models.schedules, { foreignKey: 'timeType', as: 'timeData' })
    }
  }
  allcodes.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'allcodes',
  });
  return allcodes;
};