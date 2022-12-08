'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            // userId: {
            //     type: Sequelize.STRING,
            //     allowNull: false,
            // },

            nameItem: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB("long")
            },
            imgAngle: {
                type: Sequelize.BLOB("long")
            },
            type: {
                type: Sequelize.STRING
            },
            manufacturer: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            ram: {
                type: Sequelize.STRING
            },
            rom: {
                type: Sequelize.STRING
            },
            vote: {
                type: Sequelize.STRING
            },
            pin: {
                type: Sequelize.STRING
            },
            display: {
                type: Sequelize.STRING
            },
            camera: {
                type: Sequelize.STRING
            },

            hdh: {
                type: Sequelize.STRING
            },
            chip: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};