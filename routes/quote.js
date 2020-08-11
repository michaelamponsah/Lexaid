const express = require("express");
const router = express.Router();

const { getQuotes, createQuote } = require("../controllers/quote");

router.route("/quotes").get(getQuotes).post(createQuote);

module.exports = router;
