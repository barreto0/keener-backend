/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const TransactionController = require('../controllers/TransactionController');

const verifyAuth = require('../middlewares/verifyAuth');

const transactionsRoutes = express.Router();
transactionsRoutes.use(verifyAuth);

transactionsRoutes.post('/', TransactionController.listTransactions);
transactionsRoutes.post('/register', TransactionController.createTransaction);

module.exports = transactionsRoutes;
