'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.allcodes, { foreignKey: 'positionid', targetKey: "keyMap", as: 'positionData' }),
        user.belongsTo(models.allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' }),
        user.hasOne(models.markdowns, { foreignKey: 'doctorid' }),
        user.hasOne(models.doctorinfor, { foreignKey: 'doctorid' }),

        user.hasMany(models.schedules, { foreignKey: 'doctorid', as: 'doctorData' })

        // user.belongsTo(models.doctorinfor, { foeirgnKey: 'doctorid' })


      // user.hasMany(models.bookings,{foreignKey:'patienid',as:'dataPatient'})

    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleid: DataTypes.STRING,
    positionid: DataTypes.STRING,
    image: DataTypes.STRING,
    idimage:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};