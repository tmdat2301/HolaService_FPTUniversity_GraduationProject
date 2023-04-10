'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'role', targetKey: 'code', as: 'roleData' })
      User.hasMany(models.Post, { foreignKey: 'postedBy', targetKey: 'id', as: 'posts' })
    }
  }
  User.init({
    email: DataTypes.STRING,
    pass: {
      type: DataTypes.STRING,
      set(pass) {
        const salt = bcrypt.genSaltSync(10);
        this.setDataValue('pass', bcrypt.hashSync(pass, salt))
      }
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.STRING,
    phone: DataTypes.STRING,
    rspasstk: DataTypes.STRING,
    rspassexp: {
      type: DataTypes.DATE,
      set(seconds) {
        this.setDataValue('rspassexp', Data.now() + seconds * 1000)
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};