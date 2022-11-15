'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Mining_coin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Mining_coin.init({
        time_start: DataTypes.DATE,
        time_over: DataTypes.DATE,
        status: DataTypes.STRING,
        total_coin: DataTypes.DOUBLE,
        wallet_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Mining_coin',
    });
    return Mining_coin;
};