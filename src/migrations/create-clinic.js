'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clinics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      descriptionHtmlShort: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      descriptionHTML: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      image: {
        type: Sequelize.BLOB('long'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clinics');
  }
};