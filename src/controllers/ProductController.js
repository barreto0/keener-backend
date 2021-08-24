const Product = require('../models/Product');

module.exports = {
  async listProducts(req, res) {
    if (req.body.id || req.body.category) {
      const { id, category } = req.body;

      if (id && !category) {
        const products = await Product.findAll({
          where: {
            id,
          },
        });
        return res.json(products);
      }

      if (!id && category) {
        const products = await Product.findAll({
          where: {
            category,
          },
        });
        return res.json(products);
      }

      const products = await Product.findAll({
        where: {
          id,
          category,
        },
      });
      return res.json(products);
    }

    const products = await Product.findAll();
    return res.json(products);
  },

  async addProduct(req, res) {
    const {
      name, category, description, image, price, quantity,
    } = req.body;

    const active = true;

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
      active, name, category, description, image, price, quantity,
    });

    return res.json({
      message: 'Produto cadastrado com sucesso',
      product,
    });
  },

  async updateProduct(req, res) {
    const {
      id, active, name, category, description, image, price,
    } = req.body;

    if (id) {
      const product = await Product.findOne({
        where: {
          id,
        },
      });

      if (product) {
        product.active = active;
        product.name = name;
        product.category = category;
        product.description = description;
        product.image = image;
        product.price = price;
        const updatedProduct = await product.save();
        return res.json({
          success: true,
          updatedProduct,
        });
      }
    }

    return res.json({
      success: false,
      message: 'É necessário fornecer o id do produto para atualiza-lo',
    });
  },

  async deleteProduct(req, res) {
    const productId = req.body.id;

    if (productId) {
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (product) {
        await product.destroy();
        return res.json({
          success: true,
          message: 'Produto deletado da base de dados com sucesso',
        });
      }
    }

    return res.json({
      success: false,
      message: 'Não foi possível deletar o produto, verifique se o id está correto',
    });
  },

};
