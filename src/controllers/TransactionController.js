/* eslint-disable no-unused-vars */
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

module.exports = {

  async listTransactions(req, res) {
    const { type, productId } = req.query;

    if (type && !productId) {
      const transactions = await Transaction.findAll({
        where: {
          type,
        },
      });
      return res.json({
        transactions,
      });
    }

    if (!type && productId) {
      const transactions = await Transaction.findAll({
        where: {
          productId,
        },
      });
      return res.json({
        transactions,
      });
    }

    if (type && productId) {
      const transactions = await Transaction.findAll({
        where: {
          type,
          productId,
        },
      });
      return res.json({
        transactions,
      });
    }

    const transactions = await Transaction.findAll();
    return res.json({
      transactions,
    });
  },

  async createTransaction(req, res) {
    const {
      type, productId, productName, quantity,
    } = req.body;

    if (productId) {
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      if (product) {
        if (module.exports.checkValidTransaction(type, quantity, product.quantity)) {
          product.quantity = type === 'subtract' ? Number(product.quantity) - Number(quantity) : Number(product.quantity) + Number(quantity);
          try {
            await product.save();
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: 'Algo deu errado ao realizar a transação',
            });
          }
          const transaction = await Transaction.create({
            type, productId, productName, quantity,
          });
          return res.json({
            success: true,
            transaction,
          });
        }
      }
    }
    return res.status(500).json({
      success: false,
      message: 'Algo deu errado ao realizar a transação',
    });
  },

  checkValidTransaction(transactionType, transactionQuantity, productQuantity) {
    if (transactionType === 'subtract' && transactionQuantity > productQuantity) {
      return false;
    }
    return true;
  },

};
