'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctorinfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctorinfor.init({
    doctorid:DataTypes.INTEGER,
    priceid:DataTypes.STRING,
    proviceid:DataTypes.STRING,
    paymentid:DataTypes.STRING,
    addressclinic:DataTypes.STRING,
    nameclinic:DataTypes.STRING,
    note:DataTypes.STRING,
    count:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'doctorinfor',
  });
  return doctorinfor;
};