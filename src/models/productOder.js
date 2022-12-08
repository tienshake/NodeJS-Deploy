'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductOder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductOder.belongsTo(models.Oder, { foreignKey: 'oderId' });
            // ProductOder.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
            // ProductOder.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
            // ProductOder.hasOne(models.Markdown, { foreignKey: 'doctorId' });
            // ProductOder.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });

        }
    };
    ProductOder.init({
        oderId: DataTypes.STRING,
        productId: DataTypes.STRING,
        quantity: DataTypes.STRING,
        color: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ProductOder',
    });
    return ProductOder;
};