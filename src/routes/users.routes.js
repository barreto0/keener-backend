/* eslint-disable no-unused-vars */
const express = require('express');
const UserController = require('../controllers/UserController');

const verifyAuth = require('../middlewares/verifyAuth');

const usersRouter = express.Router();
usersRouter.use(verifyAuth);

usersRouter.post('/register', UserController.registerUser);
usersRouter.post('/login', UserController.authUser);
usersRouter.get('/', UserController.listAllUsers);
usersRouter.get('/protected');

module.exports = usersRouter;
