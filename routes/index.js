const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');


// GET homepage
router.get('/', homeController.index);
router.get('/home', homeController.index);
router.get('/login', homeController.login);
router.get('/dashboard', homeController.dashboard);
router.get('/briefs', homeController.briefs);
router.get('/quotes', homeController.quotes);
router.get('/blog', homeController.blog);

module.exports = router;