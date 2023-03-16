const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config");

class AuthController {
  static async signUp(req, res) {
    try {
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(409).json({
          success: false,
          message: "Account with this email already exists",
        });
      }

      const user = new User()
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.picture = user.gravatar();
        user.isSeller = req.body.isSeller;

      await user.save();
      const token = jwt.sign({ user }, config.secret, { expiresIn: "7d" });

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later",
      });
    }
  }

    static async login(req, res) {
      try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
          res.status(401).json({
            success: false,
            message: "User account cannot be found",
          });
          return;
        }
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.status(401).json({
            success: false,
            message: "Incorrect password",
          });
          return;
        }
        const token = jwt.sign({ user }, config.secret, { expiresIn: "7d" });
        res.json({
          success: true,
          message: "Enjoy your token",
          token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    } 
  
}


module.exports = AuthController
