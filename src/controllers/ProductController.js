const Product = require('../models/Product');

module.exports = {
  async addProduct(req, res) {
    const {
      name, category, description, image, price, quantity,
    } = req.body;

    const checkProductExists = await Product.findOne({
      where: {
        name,
      },
    });

    if (checkProductExists) {
      return res.json({
        message: 'Já existe um produto cadastrado com este nome!',
      });
    }

    const product = await Product.create({
      name, category, description, image, price, quantity,
    });

    return res.json({
      message: 'Produto cadastrado com sucesso',
      product,
    });
  },
};
