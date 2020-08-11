const express = require("express");
const router = express.Router();

const {
  getDashboard,
  createRegister,
  getRegister,
  createLogin,
  getLogin,
} = require("../controllers/users");

router.route("/dashboard").get(getDashboard);
router.route("/register").get(getRegister).post(createRegister);
router.route("/login").get(getLogin).post(createLogin);

module.exports = router;
