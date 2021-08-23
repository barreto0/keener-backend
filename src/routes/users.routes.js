/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const UserController = require('../controllers/UserController');

const verifyAuth = require('../middlewares/verifyAuth');

// filtra as rotas que não quero que use o middleware de autenticação
function unless(middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
}

const usersRouter = express.Router();
usersRouter.use(unless(verifyAuth, '/register', '/login'));
// usersRouter.use(verifyAuth);

usersRouter.post('/register', UserController.registerUser);
usersRouter.post('/login', UserController.authUser);
usersRouter.get('/', UserController.listAllUsers);
usersRouter.get('/protected');

module.exports = usersRouter;
