const express = require('express');
const router = express.Router();
const { createOrder,getOrders } = require('../controller/createOrders');
const { protect } = require('../middleware/authMiddleware');
// Route to handle order creation
router.get('/', getOrders);
router.post('/create',protect, createOrder);

module.exports = router;
