const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/', () => {
  console.log('route for new user');
});

module.exports = usersRouter;
