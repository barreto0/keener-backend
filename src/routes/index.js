const express = require('express');
const usersRouter = require('./users.routes');
const productsRouter = require('./products.routes');
const transactionRouter = require('./transactions.routes');

const routes = express.Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/transactions', transactionRouter);
routes.get('/', (request, response) => {
  response.json({ message: 'Hello World' });
});
module.exports = routes;
