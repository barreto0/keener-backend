/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const TransactionController = require('../controllers/TransactionController');

const verifyAuth = require('../middlewares/verifyAuth');

const productsRoutes = express.Router();
productsRoutes.use(verifyAuth);

productsRoutes.post('/register', TransactionController.createTransaction);

module.exports = productsRoutes;
