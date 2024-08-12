const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../controllers/mailControllers')

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    sendWelcomeEmail(user.email);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({
        "message": "Success",
        token 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
