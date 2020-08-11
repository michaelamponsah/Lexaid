const express = require("express");
const router = express.Router();

const { getBriefs, createBrief } = require("../controllers/brief");

router.route("/briefs").get(getBriefs).post(createBrief);

module.exports = router;

