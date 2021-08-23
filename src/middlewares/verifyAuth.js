/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

function verifyAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ auth: false, message: 'Não foi fornecido nenhum token' });
  }

  jwt.verify(token, auth.jwt.secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(500).json({ auth: false, message: 'Seu token expirou!' });
      }
      return res.status(500).json({ auth: false, message: 'Falha ao autenticar token' });
    }
    // savando sub no request para uso em todas as rotas que utilizam o middleware
    req.userId = decoded.sub;
    next();
  });
}

module.exports = verifyAuth;
