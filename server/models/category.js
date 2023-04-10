'use strict';
const {
  Model
} = require('sequelize');
const slugify = require('slugify')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    code: DataTypes.STRING,
    value: DataTypes.STRING,
    image: DataTypes.STRING,
    header: DataTypes.STRING,
    subheader: DataTypes.TEXT,
    slug: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('slug', slugify(value))
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};