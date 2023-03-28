//Middle ware file using JSON Web Token for authentication 
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { LocalStorage } = require('node-localstorage');
const localStorage = LocalStorage('./scratch');
const redis = require('../utils/redis')

module.exports = async function (req, res, next) {
  //const token = localStorage.getItem('Token');
  //const token = redis.getToken()
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
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