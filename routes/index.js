const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const loginController = require('../controllers/user');


// GET homepage
router.get('/', homeController.index);
router.get('/home', homeController.index);

// GET user login page
router.get('/login', loginController.getLogin);


module.exports = router;