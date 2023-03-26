const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');



router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProductById)
router.post('/products/:id/qty', ProductController.updateProducts)
router.get('/categories', ProductController.getCategory)
router.get('/categories/new', (req, res, next) => {
    res.render('new-categories')
})
router.post('/categories', ProductController.newCategory)
router.get('/categories/:id', ProductController.getCategoryById)



module.exports = router;