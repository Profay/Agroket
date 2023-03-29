const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const CartController = require('../controllers/CartController');



router.get('/products', ProductController.getProducts);
router.get('/product/:id', ProductController.getProductById);
router.post('/products/:id/qty', ProductController.updateProducts);
router.get('/categories', ProductController.getCategory);
router.get('/categories/new', (req, res, next) => {
    res.render('new-categories')
});
router.post('/categories', ProductController.newCategory);
router.get('/categories/:id', ProductController.getCategoryById);
router.get('/cart/add-to-cart/:id', CartController.addItem);
router.get('/cart/reduce/:id', CartController.reduceItem);
router.get('/cart/remove/:id', CartController.removeItem);
router.get('/cart', CartController.getCart);




module.exports = router;