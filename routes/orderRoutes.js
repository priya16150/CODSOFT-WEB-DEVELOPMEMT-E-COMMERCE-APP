const express = require('express');
const { createOrder, getOrderById, getUserOrders, updateOrderToPaid } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.route('/').post(protect, createOrder).get(protect, getUserOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;