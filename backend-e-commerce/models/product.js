'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    detail_product: DataTypes.TEXT,
    image: DataTypes.ARRAY(DataTypes.STRING),
    testimonials: DataTypes.ARRAY(DataTypes.JSON),
    vote: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    color: DataTypes.ARRAY(DataTypes.STRING),
    capacities: DataTypes.ARRAY(DataTypes.STRING),
    size: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};