'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        kyc_id: DataTypes.INTEGER,
        codeRefer: DataTypes.STRING,
        wallet_id: DataTypes.INTEGER,
        role: DataTypes.INTEGER,
        refresh_token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};