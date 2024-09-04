const Order = require('../Models/order');

const createOrder = async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
  } = req.body;

  try {
    if (!req.user || !req.user._id) {
      throw new Error('User not authenticated');
    }

    // Create a new order
    const order = new Order({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      // Add other necessary fields here
    });

    // Save order to the database
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); 
    res.status(200).json(orders); 
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

module.exports = { createOrder,getOrders };
