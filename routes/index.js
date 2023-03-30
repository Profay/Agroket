const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const checkjwt = require("../middlewares/checkjwt");
const OrderController = require("../controllers/OrderController");
const AppController = require('../controllers/AppController');



router.get('/home', checkjwt, AppController.homePage);
router.get('/logout', function(req, res) {
    res.clearCookie('token');
    res.redirect('/accounts/home');}); 
router.get('/signup', (req, res) => {
    res.render('signup')});
router.get('/login', (req, res) => {
    res.render('login')});
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