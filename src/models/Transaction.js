const { Sequelize, DataTypes } = require('sequelize');
const dbConfiguration = require('../config/database');

const sequelize = new Sequelize(dbConfiguration);

// construção model padrão do sequelize pela documentação

const Transaction = sequelize.define('Transaction', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
}, {
  // Other model options go here
});

module.exports = Transaction;
