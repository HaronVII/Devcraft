// backend/src/models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const Message = require('./Message');

User.hasMany(Message, { foreignKey: 'authorId' });
Message.belongsTo(User, { foreignKey: 'authorId' });

module.exports = {
  User,
  Message,
  sequelize
};