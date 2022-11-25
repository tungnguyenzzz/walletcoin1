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
        verify: DataTypes.BOOLEAN,
        code_verify: DataTypes.STRING,
        kyc_id: DataTypes.STRING,
        codeRefer: DataTypes.STRING,
        entered: DataTypes.BOOLEAN,
        wallet_id: DataTypes.STRING,
        role_login: DataTypes.INTEGER,
        role: DataTypes.INTEGER,
        refresh_token: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};