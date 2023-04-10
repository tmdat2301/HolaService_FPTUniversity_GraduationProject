'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      star: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: -1
      },
      images: {
        type: Sequelize.TEXT('long')
      },
      address: {
        type: Sequelize.STRING
      },
      foodType: {
        type: Sequelize.STRING
      },
      postedBy: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      receiverName: {
        type: Sequelize.STRING
      },
      receiverPhone: {
        type: Sequelize.STRING
      },
      ref: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.INTEGER,
        defaultValue: -1
      },
      area: {
        type: Sequelize.INTEGER,
        defaultValue: -1
      },
      desc: {
        type: Sequelize.TEXT('long')
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};