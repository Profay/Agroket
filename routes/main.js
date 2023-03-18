const express = require('express');
const router = express.Router();
const ProductController = require('../models/ProductController');



router.get('/products', ProductController.getProducts)
router.post('/products/:id/qty', ProductController.updateProducts)
router.get('/categories', ProductController.getCategory)
router.post('/categories', ProductController.newCategory)
router.get('/categories/:id', ProductController.getCategoryById)