const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();
const { getUser } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/user", protect, getUser);

module.exports = router;
