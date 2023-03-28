const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const checkjwt = require("../middlewares/checkjwt");
const OrderController = require("../controllers/OrderCo1ntroller");



router.get('/', (req, res) => {
  res.render('index');
});
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', AuthController.signUp);
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', AuthController.login);
router.get('/profile', checkjwt, UserController.getProfile);
router.post('/profile', checkjwt, UserController.updateProfile);
router.post('/address', checkjwt, UserController.updateAddress);
router.get('/orders', checkjwt, (req, res) => {
  res.render('orders');});
router.get('/orders/:id', checkjwt, OrderController.getOrderById);
router.get('/orders/:id/delete', OrderController.deleteOrder);
router.post('/orders', OrderController.postOrder);

module.exports = router;
