const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');




router.get('/', AppController.homePage);
router.get('/about', AppController.aboutUs);
router.get('/login', AuthController.login);
router.get('/auth/google', AuthController.authGoogle);
router.get('/auth/google/callback', AuthController.authGoogle);
router.get('/auth/facebook/callback', AuthController.authFacebook);
router.get('/auth/facebook', AuthController.authFacebook);
router.get('/auth/twitter', AuthController.authTwitter);
router.get('/auth/twitter/callback', AuthController.authTwitter);


module.exports = router