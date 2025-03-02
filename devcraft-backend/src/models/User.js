// src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue("password", bcrypt.hashSync(value, 10));
    },
  },
});

module.exports = User;