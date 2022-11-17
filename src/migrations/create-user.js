'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,

        primaryKey: true,
        type: Sequelize.STRING
      },
      // email: DataTypes.STRING,
      // password: DataTypes.STRING,
      // kyc_id: DataTypes.INTEGER,
      // codeRefer: DataTypes.STRING,
      // wallet_id: DataTypes.INTEGER,
      // role: DataTypes.INTEGER,
      // refresh_token: DataTypes.STRING
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      kyc_id: { type: Sequelize.INTEGER },
      codeRefer: { type: Sequelize.STRING },
      wallet_id: { type: Sequelize.STRING },
      role: { type: Sequelize.INTEGER, defaultValue: 0 },
      refresh_token: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};