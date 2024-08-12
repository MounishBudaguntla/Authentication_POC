const express = require('express');
const router = express.Router();
const { createPayments } = require('../controllers/paymentControllers');
const { protect } = require('../middlewares/auth');

router.post('/payment/:productId', protect, createPayments);

module.exports = router;
