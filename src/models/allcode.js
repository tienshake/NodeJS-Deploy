'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.Product, { foreignKey: 'type', as: 'typeData' });
            Allcode.hasMany(models.Product, { foreignKey: 'manufacturer', as: 'manufacturerData' });
            Allcode.hasMany(models.Product, { foreignKey: 'pin', as: 'pinData' });
            Allcode.hasMany(models.Product, { foreignKey: 'camera', as: 'cameraData' });
            Allcode.hasMany(models.Product, { foreignKey: 'display', as: 'displayData' });
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};