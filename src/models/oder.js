'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Oder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Oder.hasMany(models.ProductOder, { foreignKey: 'oderId' });
        }
    };

    Oder.init({
        userId: DataTypes.STRING,
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        provincial: DataTypes.STRING,
        district: DataTypes.STRING,
        wards: DataTypes.STRING,
        streetName: DataTypes.STRING,
        note: DataTypes.STRING,
        state: DataTypes.STRING,
        quantity: DataTypes.STRING,
        sumPrice: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Oder',
    });
    return Oder;
};