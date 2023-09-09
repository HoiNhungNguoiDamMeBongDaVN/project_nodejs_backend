'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class handbook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    handbook.init({
        name_handbook: DataTypes.STRING,
        descriptionhtml:DataTypes.TEXT('long'),
        descriptionmarkdown:DataTypes.TEXT('long'),
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        image: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'handbook',
        freezeTableName: true
    });
    return handbook;
};