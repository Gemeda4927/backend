const express = require("express");
const router = express.Router();

const {
  register,
  login,
  googleLogin,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/auth.controller");

router
  .post("/register", register)
  .post("/login", login)
  .post("/google", googleLogin)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword)
  .post("/logout", logout);

router
  .get("/me", getMe)
  .put("/update-password", updatePassword);

module.exports = router;