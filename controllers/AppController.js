const checkjwt = require("../middlewares/checkjwt");
const User = require("../models/userModel")

class AppController {
    
    static async homePage(req, res, next) {
            try {
                const user = await User.findOne({ _id: req.decoded.user._id });
                res.render('home', { user: user });
            } catch (err) {
                next(err);
              }
        }

    static async aboutUs(req, res) {
        const user = req.user;
        res.render('about.ejs', { user: user });
    }
}

module.exports = AppController;