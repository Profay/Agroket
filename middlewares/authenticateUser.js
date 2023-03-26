function authenticateUser(req, res, next) {
    const token = req.cookie.token;
    if (!token) {
      res.redirect('/accounts/login');
      return;
    }
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.redirect('/accounts/login');
        return;
      }
  
      req.user = decoded.user;
      next();
    });
  }

  
  module.exports = authenticateUser