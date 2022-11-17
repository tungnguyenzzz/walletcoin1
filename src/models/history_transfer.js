'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History_transfer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    History_transfer.init({
        transfer_wallet_code: DataTypes.STRING,
        take_wallet_code: DataTypes.STRING,
        total_coin_NTC: DataTypes.DOUBLE,
        total_coin_NCO: DataTypes.DOUBLE,
        total_coin_NUSD: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'History_transfer',
    });
    return History_transfer;
};