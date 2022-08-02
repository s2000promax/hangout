const express = require('express');
const Profession = require('../models/Profession');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const professions = await Profession.find();
    res.status(200).send(professions);
  } catch (e) {
    res.status(500).json({
      message: 'Server error. Please try again later'
    })
  }
});

module.exports = router;
