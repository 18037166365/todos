'use strict';
module.exports = (sequelize, Sequelize) => {
  const Messages = sequelize.define('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  }, {
    tableName: 'messages'
  });
  Messages.associate = function(models) {
    // associations can be defined here
    Messages.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };
  return Messages;
};
