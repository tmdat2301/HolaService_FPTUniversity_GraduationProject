'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { targetKey: 'id', foreignKey: 'postedBy', as: 'user' })
      Post.belongsTo(models.Category, { targetKey: 'code', foreignKey: 'category', as: 'categoryData' })
      Post.belongsTo(models.Foodtype, { targetKey: 'code', foreignKey: 'foodType', as: 'foodtypes' })
      Post.hasMany(models.Comment, { targetKey: 'id', foreignKey: 'pid', as: 'comments' })
      Post.hasMany(models.Vote, { targetKey: 'id', foreignKey: 'pid', as: 'votes' })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    star: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    images: {
      type: DataTypes.TEXT,
      set(images) {
        this.setDataValue('images', JSON.stringify(images))
      },
      get() {
        const raw = this.getDataValue('images')
        return raw ? JSON.parse(raw) : null
      }
    },
    address: DataTypes.STRING,
    postedBy: DataTypes.STRING,
    category: DataTypes.STRING,
    receiverName: DataTypes.STRING,
    receiverPhone: DataTypes.STRING,
    foodType: DataTypes.STRING,
    ref: DataTypes.STRING,
    distance: DataTypes.INTEGER,
    area: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    views: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};