//Middle ware file using JSON Web Token for authentication 
const jwt = require('jsonwebtoken');
const config = require('../config');
const redistoken = require('../utils/redis');

module.exports = async function (req, res, next) {
  const token = await redistoken.getToken();
  console.log(token);

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