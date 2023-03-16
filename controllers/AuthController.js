const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

class AuthController {
  static async signUp(req, res) {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;
    User.findOne({
      email: req.body.email
    }, (err, existingUser) => {
      if (existingUser) {
        res.json({
          success: false,
          message: "Account with this email already exist",
        });
      } else {
        user.save();
        var token = jwt.sign({
          user: user,
        },
        config.secret, {
          expiresIn: "7d",
        }
      );

      res.json({
        success: true,
        message: "Token Success",
        token: token,
        });
      }
    });
  };

  static async login(req, res, next) {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) throw err;
  
      if (!user) {
        res.json({
          success: false,
          message: "User account cannot be found",
        });
      } else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: "Incorrect password",
          });
        } else {
          var token = jwt.sign({
              user: user,
            },
            config.secret, {
              expiresIn: "7d",
            }
          );
  
          res.json({
            success: true,
            mesage: "Enjoy your token",
            token: token,
          });
        }
      }
    });
  };
  
}


module.exports = AuthController
