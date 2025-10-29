const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Admin login -> returns token
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } catch (err) { next(err); }
});

module.exports = router;
