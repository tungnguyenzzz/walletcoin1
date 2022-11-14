'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wallet_coin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Wallet_coin.init({
        wallet_id: DataTypes.INTEGER,
        coin_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Wallet_coin',
    });
    return Wallet_coin;
};