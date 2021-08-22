const Sequelize = require('sequelize');
const dbConfiguration = require('../config/database');

const dbConnection = new Sequelize(dbConfiguration);

module.exports = dbConnection;
