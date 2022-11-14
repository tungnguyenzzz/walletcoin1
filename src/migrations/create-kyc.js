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
      // fullname: DataTypes.STRING,
      // phonenumber: DataTypes.INTEGER,
      // card_id: DataTypes.STRING,
      // birthday: DataTypes.DATE,
      // ssn_id: DataTypes.STRING,
      // ein_id: DataTypes.STRING,
      // card_front: DataTypes.STRING,
      // card_back: DataTypes.STRING,
      // country: DataTypes.STRING,
      // image_ssn: DataTypes.STRING,
      // image_drive: DataTypes.STRING,
      // ein_image: DataTypes.STRING,
      // image_passport: DataTypes.STRING,
      // status: DataTypes.INTEGER
      fullname: { type: Sequelize.STRING, allowNull: true },
      phonenumber: { type: Sequelize.INTEGER, allowNull: true },
      card_id: { type: Sequelize.STRING, allowNull: true },
      birthday: { type: Sequelize.DATE, allowNull: true },
      ssn_id: { type: Sequelize.STRING, allowNull: true },
      ein_id: { type: Sequelize.STRING, allowNull: true },
      card_front: { type: Sequelize.STRING, allowNull: true },
      card_back: { type: Sequelize.STRING, allowNull: true },
      country: { type: Sequelize.STRING, allowNull: true },
      image_ssn: { type: Sequelize.STRING, allowNull: true },
      image_drive: { type: Sequelize.STRING, allowNull: true },
      eil_code: { type: Sequelize.STRING, allowNull: true },
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