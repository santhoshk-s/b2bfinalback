const express = require('express');
const router = express.Router();
const { createOrder } = require('../controller/createOrders');
const { protect } = require('../middleware/authMiddleware');
// Route to handle order creation
router.post('/',protect, createOrder);

module.exports = router;
