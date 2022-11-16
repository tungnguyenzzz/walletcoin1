'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wallet_code: { type: Sequelize.STRING, allowNull: true },
      total_price: { type: Sequelize.DOUBLE, defaultValue: 0.0000000 },
      total_coin: { type: Sequelize.DOUBLE, defaultValue: 0.0000000 },
      total_coin_referral: { type: Sequelize.DOUBLE, defaultValue: 0.0000000 },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wallets');
  }
};