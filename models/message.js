'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      // User-Message relationship
      Message.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      // Room-Message relationship
      Message.belongsTo(models.Room, {
        foreignKey: 'room_id',
        as: 'room'
      });
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
    context: DataTypes.TEXT,
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    room_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Room', 
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
