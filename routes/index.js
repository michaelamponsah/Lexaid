const express = require("express");
const router = express.Router();

const {
  getHomepage,
  getSingleBlogPost,
  getPdf,
} = require("../controllers/index");

// GET homepage and Single blog post view page

router.route("/").get(getHomepage);
router.route("/blog/:slug").get(getSingleBlogPost);
router.route("/uploads/briefs/:brief").get(getPdf);

/*
router.get('/login', homeController.login);
router.get('/dashboard', homeController.dashboard);
router.get('/briefs', homeController.briefs);
router.get('/quotes', homeController.quotes);
router.get('/blog', homeController.blog);
*/

module.exports = router;
