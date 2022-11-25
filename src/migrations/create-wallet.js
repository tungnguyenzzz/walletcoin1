'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      coin_code_NTC: { type: Sequelize.STRING, allowNull: true },
      coin_code_NCO: { type: Sequelize.STRING, allowNull: true },
      coin_code_NUSD: { type: Sequelize.STRING, allowNull: true },
      coin_price_NTC: { type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0.000000 },
      coin_price_NCO: { type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0.000000 },
      coin_price_NUSD: { type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0.000000 },
      total_coin_NTC: { type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0.000000 },
      total_coin_NCO: { type: Sequelize.DOUBLE, allowNull: true, defaultValue: 0.000000 },
      total_coin_NUSD: { type: Sequelize.DOUBLE, allowNull: true, defaultValue: 110 },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wallets');
  }
};