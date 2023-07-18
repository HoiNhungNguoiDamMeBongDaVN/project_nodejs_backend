'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class markdowns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      markdowns.belongsTo(models.user,{foreignKey:'id'})
    }
  }
  markdowns.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    descriptions: DataTypes.TEXT('long'),
    doctorid: DataTypes.INTEGER,
    speciallyid:DataTypes.INTEGER,
    clinicid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'markdowns',
  });
  return markdowns;
};