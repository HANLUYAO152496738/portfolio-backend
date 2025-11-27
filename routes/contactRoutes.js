const express = require('express');
const router = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(submitContact)
  .get(protect, getMessages);

module.exports = router;
