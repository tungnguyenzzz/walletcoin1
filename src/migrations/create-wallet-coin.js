'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Wallet_coins', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            wallet_id: { type: Sequelize.INTEGER, allowNull: true },
            coin_id: { type: Sequelize.INTEGER, allowNull: true },
            createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Wallet_coins');
    }
};