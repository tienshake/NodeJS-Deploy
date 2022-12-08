'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DetailPhotos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DetailPhotos.belongsTo(models.Product, { foreignKey: 'productId', as: 'photoDetail' });
        }
    };

    DetailPhotos.init({
        productId: DataTypes.INTEGER,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'DetailPhotos',
    });
    return DetailPhotos;
};