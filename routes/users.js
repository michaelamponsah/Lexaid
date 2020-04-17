const express = require('express');
const router = express.Router();
const loginController = require('../controllers/user');
const dashboardController = require('../controllers/user');

// LOGIN PAGE
router.get('/login', loginController.login);
router.get('/dashboard', dashboardController.dashboard);

module.exports = router;