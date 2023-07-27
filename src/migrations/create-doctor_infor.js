'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('doctorinfor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            priceid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            proviceid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            addressclinic: {
                type: Sequelize.STRING
            },
            nameclinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue:0
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
        await queryInterface.dropTable('doctorinfor');
    }
};