'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookings.init({
    statusid: DataTypes.STRING,
    doctorid: DataTypes.INTEGER,
    patienid: DataTypes.INTEGER,
    date: DataTypes.STRING,
    time_type: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};