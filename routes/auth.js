const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const jwt = require("../middlewares/jwt");
const OrderController = require("../controllers/OrderController");


router.get('/', (req, res) => {
  // render the home page HTML file
  res.render('index');
});

router.get('/signup', (req, res) => {
  // render the signup page HTML file
  res.render('signup');
});

router.post('/signup', AuthController.signUp);

router.get('/login', (req, res) => {
  // render the login page HTML file
  res.render('login');
});

router.post('/login', AuthController.login);

router.get('/profile', jwt, UserController.getProfile);

router.post('/profile', jwt, UserController.updateProfile);

router.get('/address', jwt, (req, res) => {
  // render the address page HTML file
  res.render('address');
});

router.post('/address', jwt, UserController.updateAddress);

router.get('/orders', jwt, (req, res) => {
  // render the orders page HTML file
  res.render('orders');
});

router.get('/orders/:id', jwt, OrderController.getOrderById);

router.get('/orders/:id/delete', OrderController.deleteOrder);

router.post('/orders', OrderController.postOrder);

module.exports = router;
