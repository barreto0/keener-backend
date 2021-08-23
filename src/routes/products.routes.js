/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const ProductController = require('../controllers/ProductController');

const verifyAuth = require('../middlewares/verifyAuth');

const productsRoutes = express.Router();
productsRoutes.use(verifyAuth);

productsRoutes.post('/register', ProductController.addProduct);
productsRoutes.post('/', ProductController.listProducts);

module.exports = productsRoutes;
