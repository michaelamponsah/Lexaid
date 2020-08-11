const express = require("express");
const router = express.Router();

const { getBlog, createBlog } = require("../controllers/blog");

router.route("/blog").get(getBlog).post(createBlog);

module.exports = router;
