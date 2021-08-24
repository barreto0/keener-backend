const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

module.exports = {

  // async listTransactions(req, res) {
  //   const { type, productId, startDate, endDate } = req.body;
  // },

  async createTransaction(req, res) {
    const { type, productId, quantity } = req.body;

    if (productId) {
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      if (product) {
        if (module.exports.checkValidTransaction(type, quantity, product.quantity)) {
          product.quantity = type === 'subtract' ? Number(product.quantity) - Number(quantity) : Number(product.quantity) + Number(quantity);
          const transaction = await Transaction.create({ type, productId, quantity });
          await product.save();
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
