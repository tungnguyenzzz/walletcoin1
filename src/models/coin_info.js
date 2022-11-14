'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Coin_info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Coin_info.init({
        coin_name: DataTypes.STRING,
        coin_code: DataTypes.STRING,
        coin_price: DataTypes.DOUBLE,
        coin_number: DataTypes.INTEGER,
        total_coin: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Coin_info',
    });
    return Coin_info;
};