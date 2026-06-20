const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/auth.controller");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

module.exports = router;