const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validate = require("../middlewares/validate");
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const redis = require('../utils/redis')
const secret = process.env.JWT_SECRET;

class AuthController {
  static async signUp(req, res) {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.render('signup', { error: "Account with this email already exists" });
      }
  
      // Validate user input
      const validInput = await validate(req.body)
      if (!validInput.success) {
        return res.render('signup', { error: validInput.message });
      }
  
      const user = new User()
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.picture = user.gravatar();
      user.isSeller = req.body.isSeller === 'on';
      await user.save();
  
      const token = jwt.sign({ user }, secret, { expiresIn: "7d" });
      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      console.log('cookie created')
      res.redirect('/accounts/profile');
    } catch (error) {
      console.error(error);
      res.render('signup', { error: "Something went wrong. Please try again later" });
    }
  }
  

  static async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        res.status(401).render('login', { error: 'User account cannot be found' });
        return;
      }
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.status(401).render('login', { error: 'Incorrect password' });
        return;
      }
      const token = jwt.sign({ user }, secret, { expiresIn: '7d' });
      //localStorage.setItem('Token', token);
      //await redis.cacheToken(token)
      res.cookie('token', token, { maxAge: 86400000, httpOnly: true })
      console.log('cookie created')
      res.redirect('/accounts/profile');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { error: 'Internal server error' });
    }
  }
}  

module.exports = AuthController
