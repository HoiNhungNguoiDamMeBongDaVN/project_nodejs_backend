'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialtys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  specialtys.init({
    namespecialty: DataTypes.STRING,
    descriptionHtml: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
    image: DataTypes.TEXT,
    idimage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'specialtys',
  });
  return specialtys;
};