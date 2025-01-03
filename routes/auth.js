const express = require("express");
const router = express.Router();
const {
  getUser,
  forgotpassword,
  register,
  login,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/user", protect, getUser);
router.post("/forgotpassword", forgotpassword);

module.exports = router;
