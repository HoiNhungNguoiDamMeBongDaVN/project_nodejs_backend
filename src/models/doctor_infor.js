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
      doctorinfor.belongsTo(models.user, { foreignKey: 'doctorid' }),

        doctorinfor.belongsTo(models.allcodes, { foreignKey: 'priceid', targetKey: 'keyMap', as: 'priceType' }),
        doctorinfor.belongsTo(models.allcodes, { foreignKey: 'proviceid', targetKey: 'keyMap', as: 'provice' }),
        doctorinfor.belongsTo(models.allcodes, { foreignKey: 'paymentid', targetKey: 'keyMap', as: 'payment' })
    }
  }
  doctorinfor.init({
    doctorid: DataTypes.INTEGER,
    priceid: DataTypes.STRING,
    proviceid: DataTypes.STRING,
    paymentid: DataTypes.STRING,
    addressclinic: DataTypes.STRING,
    nameclinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'doctorinfor',
    //dong này dùng để lấy chính xác tên table, nếu ko có thì mặc định nó sẽ thêm chữ s và table của mình
    freezeTableName: true
  });
  return doctorinfor;
};