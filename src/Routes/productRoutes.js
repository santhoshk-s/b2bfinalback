const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/product', productController.addProduct);
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);
router.get('/image/:filename', productController.getImage);
router.get('/products/category/:categoryId', productController.getProductsByCategory);

module.exports = router;
