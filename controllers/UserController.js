const User = require('../models/userModel');


class UserController {
    static async getProfile(req, res, next){
        User.findOne({
            _id: req.decoded.user._id
          }, (err, user) => {
            if (err) return next(err);
            res.json({
              success: true,
              user: user,
              message: "Successful",
            });
          });
        };

    static async updateProfile(req, res, next) {
        User.findOne({
            _id: req.decoded.user._id
          }, (err, user) => {
            if (err) return next(err);
        
            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;
        
            user.isSeller = req.body.isSeller;
        
            user.save();
            res.json({
              success: true,
              message: "Profile successfully edited",
            });
          });
    };

    static async getAddress(req, res, next) {
        User.findOne({
            _id: req.decoded.user._id
          }, (err, user) => {
            res.json({
              success: true,
              address: user.address,
              message: "Successful",
            });
          });
    }

    static async updateAddress(req, res, next) {
        User.findOne({
            _id: req.decoded.user._id
          }, (err, user) => {
            if (err) return next(err);
      
            if (req.body.addr1) user.address.addr1 = req.body.addr1;
            if (req.body.addr2) user.address.addr2 = req.body.addr2;
            if (req.body.city) user.address.city = req.body.city;
            if (req.body.state) user.address.state = req.body.state;
            if (req.body.country) user.address.country = req.body.country;
            if (req.body.postalCode) user.address.postalCode = req.body.postalCode;
      
            user.save();
            res.json({
              success: true,
              message: "Address successfully edited",
            });
          });
    };
}



module.exports = UserController