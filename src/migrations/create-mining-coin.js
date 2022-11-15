'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mining_coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      time_start: { type: Sequelize.DATE, allowNull: true },
      time_over: { type: Sequelize.DATE, allowNull: true },
      status: { type: Sequelize.STRING, allowNull: true },
      total_coin: { type: Sequelize.DOUBLE, allowNull: true },
      wallet_id: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mining_coins');
  }
};