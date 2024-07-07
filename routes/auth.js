const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register
router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.redirect('/login');
});

// Login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.userId = user._id;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
