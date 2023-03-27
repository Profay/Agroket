//Middle ware file using JSON Web Token for authentication 
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async function (req, res, next) {
  const token = req.cookies.token
  if (cookie === undefined) {
    const token = jwt.sign({ user }, config.secret, { expiresIn: "7d" });
    res.cookie('token', token, {maxAge: 604800, httpOnly: true});
  } else {
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {

        req.decoded = decoded;
        next();

      }
    });

  } else {
    res.status(403).json({
      success: false,
      message: 'No token provided'
    });

  }
}
}