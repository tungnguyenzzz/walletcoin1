'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Kyc extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Kyc.init({
        fullname: DataTypes.STRING,
        phonenumber: DataTypes.INTEGER,
        card_id: DataTypes.INTEGER,
        birthday: DataTypes.DATE,
        card_front: DataTypes.STRING,
        card_back: DataTypes.STRING,
        country: DataTypes.STRING,
        image_ssn: DataTypes.STRING,
        image_drive: DataTypes.STRING,
        eil_code: DataTypes.STRING,
        image_passport: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Kyc',
    });
    return Kyc;
};