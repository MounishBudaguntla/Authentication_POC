const express = require('express');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

router.get('/user', protect, authorize('user', 'admin'), (req, res) => {
  res.json({ message: 'Welcome User' });
});

module.exports = router;