const User = require('../models/userModel');


class UserController {
  static async getProfile(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.decoded.user._id });
      res.render('profile', { user });
    } catch (err) {
      next(err);
    }
  };

  static async updateProfile(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.decoded.user._id });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      if (req.body.name) {
        user.name = req.body.name;
      }
  
      if (req.body.email) {
        user.email = req.body.email;
      }
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      user.isSeller = req.body.isSeller;
  
      await user.save();
  
      res.redirect('/accounts/profile');
    } catch (err) {
      return next(err);
    }
  };  

  static async getAddress(req, res, next) {
    try {
      const user = await User.findOne({_id: req.decoded.user._id});
      res.json({
        success: true,
        address: user.address,
        message: "Successful",
      });
    } catch (error) {
      next(error);
    }
  }
  

  static async updateAddress(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.decoded.user._id });
      if (!user) {
        return res.json({
          success: false,
          message: 'User not found',
        });
      }
  
      if (req.body.addr1) user.address.addr1 = req.body.addr1;
      if (req.body.addr2) user.address.addr2 = req.body.addr2;
      if (req.body.city) user.address.city = req.body.city;
      if (req.body.state) user.address.state = req.body.state;
      if (req.body.country) user.address.country = req.body.country;
      if (req.body.postalCode) user.address.postalCode = req.body.postalCode;
  
      await user.save();
  
      res.json({
        success: true,
        message: 'Address successfully edited',
      });
    } catch (err) {
      next(err);
    }
  };
  
}



module.exports = UserController