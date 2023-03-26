const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const checkjwt = require("../middlewares/checkjwt");
const OrderController = require("../controllers/OrderController");



router.get('/home', function(req, res) {
    const loggedIn = req.query.loggedIn === 'true';
    const user = {
      name: req.query.userName
    };
    res.render('home', { loggedIn, user });
  });
router.get('/logout', function(req, res) {
    // Clear the checkjwt token from the client's cookies
    res.clearCookie('checkjwt');
  
    // Redirect to the homepage
    res.redirect('/accounts/home');
  });
  
router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/login', (req, res) => {
    res.render('login')
});
router.post('/signUp', AuthController.signUp);
router.post('/login', AuthController.login);
router.get('/profile', checkjwt, UserController.getProfile);
router.post('/profile', checkjwt, UserController.updateProfile);
router.get('/address', checkjwt, UserController.getAddress);
router.post('/address', checkjwt, UserController.updateAddress);
router.get('/orders', checkjwt, OrderController.getOrder);
router.get('/orders/:id', checkjwt, OrderController.getOrderById);
router.get('/orders/:id/delete', OrderController.deleteOrder);
router.post('/orders', OrderController.postOrder);



module.exports = router