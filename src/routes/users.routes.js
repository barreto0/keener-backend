const express = require('express');
const UserController = require('../controllers/UserController');

const usersRouter = express.Router();

usersRouter.post('/', UserController.registerUser);
usersRouter.get('/', UserController.listAllUsers);

module.exports = usersRouter;
