'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post),
      this.belongsTo(models.User)
    }
  }
  Comment.init({
    content: {
     type: DataTypes.TEXT,
     allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    underscored: true
  });
  return Comment;
};