'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kycs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: { type: Sequelize.STRING, allowNull: true },
      phonenumber: { type: Sequelize.INTEGER, allowNull: true },
      card_id: { type: Sequelize.STRING, allowNull: true },
      birthday: { type: Sequelize.DATE, allowNull: true },
      ssn_id: { type: Sequelize.STRING, allowNull: true },
      ein_id: { type: Sequelize.STRING, allowNull: true },
      card_front: { type: Sequelize.STRING, allowNull: true },
      card_back: { type: Sequelize.STRING, allowNull: true },
      country: { type: Sequelize.STRING, allowNull: true },
      image_face: { type: Sequelize.STRING, allowNull: true },
      image_ssn: { type: Sequelize.STRING, allowNull: true },
      image_drive: { type: Sequelize.STRING, allowNull: true },
      ein_image: { type: Sequelize.STRING, allowNull: true },
      image_passport: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kycs');
  }
};