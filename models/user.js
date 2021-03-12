const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define('User',{
    userId: {
      field: 'userId',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      field: 'name',
      type:Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
          notEmpty: true,
          min: 4,
        }
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password : {
        field: "password",
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    friends : {
      field: "friends",
      type: Sequelize.STRING
    }
  });

module.exports = User;