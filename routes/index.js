const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const jwt = require("../middlewares/jwt");
const OrderController = require("../controllers/OrderController");



router.get('/home', function(req, res) {
    const loggedIn = req.query.loggedIn === 'true';
    const user = {
      name: req.query.userName
    };
    res.render('home', { loggedIn, user });
  });
router.get('/logout', function(req, res) {
    // Clear the JWT token from the client's cookies
    res.clearCookie('jwt');
  
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
router.get('/profile', jwt, UserController.getProfile);
router.post('/profile', jwt, UserController.updateProfile);
router.get('/address', jwt, UserController.getAddress);
router.post('/address', jwt, UserController.updateAddress);
router.get('/orders', jwt, OrderController.getOrder);
router.get('/orders/:id', jwt, OrderController.getOrderById);
router.get('/orders/:id/delete', OrderController.deleteOrder);
router.post('/orders', OrderController.postOrder);



module.exports = router