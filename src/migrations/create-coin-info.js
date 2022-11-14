'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Coin_infos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //     coin_name: DataTypes.STRING,
            // coin_code: DataTypes.STRING,
            // coin_price: DataTypes.DOUBLE,
            // coin_number: DataTypes.INTEGER,
            // total_coin: DataTypes.DOUBLE
            coin_name: { type: Sequelize.STRING, allowNull: true },
            coin_code: { type: Sequelize.STRING, allowNull: true },
            coin_price: { type: Sequelize.DOUBLE, allowNull: true },
            coin_number: { type: Sequelize.INTEGER, allowNull: true },
            total_coin: { type: Sequelize.DOUBLE, allowNull: true },
            createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Coin_infos');
    }
};