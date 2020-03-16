const express = require('express');
const router = express.Router();
const loginController = require('../controllers/user');

// LOGIN PAGE
router.get('/login', loginController.getLogin);

module.exports = router;