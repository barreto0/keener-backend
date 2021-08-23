const Product = require('../models/Product');

module.exports = {
  async listProducts(req, res) {
    if (!req.body) {
      const products = await Product.findAll();
      return res.json(products);
    }
    const { name, category } = req.body;

    if (name && !category) {
      const products = await Product.findAll({
        where: {
          name,
        },
      });
      return res.json(products);
    }

    if (!name && category) {
      const products = await Product.findAll({
        where: {
          category,
        },
      });
      return res.json(products);
    }

    const products = await Product.findAll({
      where: {
        name,
        category,
      },
    });
    return res.json(products);
  },

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
