'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wallet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Wallet.init({
        coin_code_NTC: DataTypes.STRING,
        coin_code_NCO: DataTypes.STRING,
        coin_code_NUSD: DataTypes.STRING,
        coin_price_NTC: DataTypes.DOUBLE,
        coin_price_NCO: DataTypes.DOUBLE,
        coin_price_NUSD: DataTypes.DOUBLE,
        total_coin_NTC: DataTypes.DOUBLE,
        total_coin_NCO: DataTypes.DOUBLE,
        total_coin_NUSD: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Wallet',
    });
    return Wallet;
};