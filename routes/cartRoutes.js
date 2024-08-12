const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, viewCart, updateCartItem } = require('../controllers/cartControllers');
const { authorize } = require('../middlewares/auth');
const { protect } = require('../middlewares/auth');

router.post('/add-to-cart', protect, authorize('user'), addToCart);
router.delete('/remove-from-cart', protect, authorize('user'), removeFromCart);
router.get('/get-cart', protect, authorize('user'), viewCart);
router.post('/update-cart', protect, authorize('user'), updateCartItem);

module.exports = router;
