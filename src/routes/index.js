const express = require('express');
const usersRouter = require('./users.routes');

const routes = express.Router();

routes.use('/users', usersRouter);
routes.get('/', (request, response) => {
  response.json({ message: 'Hello World' });
});
module.exports = routes;
