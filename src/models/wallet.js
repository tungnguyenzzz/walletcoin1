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
        wallet_code: DataTypes.STRING,
        total_price: DataTypes.DOUBLE,
        total_coin: DataTypes.DOUBLE,
        total_coin_referral: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Wallet',
    });
    return Wallet;
};