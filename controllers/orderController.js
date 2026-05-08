const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity)
        return res.status(400).json({ message: `Product ${item.name} is out of stock`, success: false });
    }
    const order = new Order({ user: req.user._id, items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice });
    const createdOrder = await order.save();
    for (const item of items) await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    res.status(201).json({ success: true, order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found', success: false });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found', success: false });
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = req.body.paymentResult;
    order.status = 'processing';
    const updatedOrder = await order.save();
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { createOrder, getOrderById, getUserOrders, updateOrderToPaid };