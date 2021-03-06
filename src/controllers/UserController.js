const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const auth = require('../config/auth');
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
      return res.status(400).json({
        message: 'Usuário já cadastrado!',
      });
    }

    const hashedPassword = await hash(password, 8);
    const user = await User.create({ name, email, password: hashedPassword });
    delete user.dataValues.password;
    return res.json({
      message: 'Usuário cadastrado com sucesso',
      user,
    });
  },

  async authUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        auth: false,
        message: 'Usuário e/ou senha incorretos',
      });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({
        auth: false,
        message: 'Usuário e/ou senha incorretos',
      });
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return res.json({
      auth: true,
      user,
      token,
    });
  },

  async logoutUser(req, res) {
    return res.json(
      {
        auth: false,
        token: null,
      },
    );
  },

};
