const ErrorResponse = require("../utils/errorResponse");
const asyncHander = require("../middleware/asyncHandler");
const User = require("../models/User");

// Description:  Register User
// Route: POST /api/v1/auth/register
// Access: Public
exports.register = asyncHander(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    username: name,
    email,
    password,
    role,
  });
  res.status(200).json({
    success: true,
    message: "User registered successfully",
  });
});
