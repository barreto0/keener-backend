const { hash } = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  async listAllUsers(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async registerUser(req, res) {
    const { name, email, password } = req.body;

    const checkUserExists = await User.findOne({
      where: {
        email,
      },
    });

    if (checkUserExists) {
      return res.json({
        message: 'Usuário já cadastrado!',
      });
    }

    const hashedPassword = await hash(password, 8);
    const user = await User.create({ name, email, password: hashedPassword });
    return res.json(user);
  },

};
