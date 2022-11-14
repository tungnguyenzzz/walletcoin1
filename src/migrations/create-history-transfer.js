'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('History_transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      // transfer_wallet_code: DataTypes.STRING,
      //   take_wallet_code: DataTypes.STRING,
      //   total_coin: DataTypes.DOUBLE,
      //   total_coin_referral: DataTypes.DOUBLE
      transfer_wallet_code: { type: Sequelize.STRING, allowNull: true },
      take_wallet_code: { type: Sequelize.STRING, allowNull: true },
      total_coin: { type: Sequelize.DOUBLE, allowNull: true },
      total_coin_referral: { type: Sequelize.DOUBLE, allowNull: true },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('History_transfers');
  }
};