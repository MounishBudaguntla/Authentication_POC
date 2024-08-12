const express = require('express');
const {createProduct, getProductById, getUserProducts, updateProduct, deleteProduct, getAllProducts} = require('../controllers/productControllers');
const { authorize } = require('../middlewares/auth');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/product', protect, authorize('user'), createProduct);
router.get('/product', protect, authorize('user'), getUserProducts);
router.get('/product/:id', protect, authorize('user'), getProductById);
router.put('/product/:id', protect, authorize('user'), updateProduct);
router.delete('/product/:id', protect, authorize('user', 'admin'), deleteProduct);
router.get('/products-list', protect, authorize('user', 'admin'), getAllProducts);

module.exports = router;
