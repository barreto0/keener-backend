const { Sequelize, DataTypes } = require('sequelize');
const dbConfiguration = require('../config/database');

const sequelize = new Sequelize(dbConfiguration);

// construção model padrão do sequelize pela documentação

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
});

module.exports = User;
