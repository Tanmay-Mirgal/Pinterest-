const express = require('express');
const router = express.Router();
const Pin = require('../models/pin');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Create Pin
router.get('/create', requireAuth, (req, res) => res.render('create-pin'));
router.post('/create', requireAuth, upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const pin = new Pin({
    title,
    description,
    imageUrl: `/uploads/${req.file.filename}`,
    author: req.session.userId
  });
  await pin.save();
  res.redirect('/');
});

// View Pins
router.get('/', async (req, res) => {
  const pins = await Pin.find().populate('author');
  res.render('index', { pins });
});

module.exports = router;
