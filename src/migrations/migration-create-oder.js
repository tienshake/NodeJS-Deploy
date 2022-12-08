'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Oders', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      provincial: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      wards: {
        type: Sequelize.STRING
      },
      streetName: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      sumPrice: {
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
    await queryInterface.dropTable('Oders');
  }
};