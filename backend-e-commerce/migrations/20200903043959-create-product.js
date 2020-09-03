'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      brand: {
        type: Sequelize.STRING
      },
      detail_product: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      testimonials: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      vote: {
        type: Sequelize.INTEGER
      },
      sold: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      capacities: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      size: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};