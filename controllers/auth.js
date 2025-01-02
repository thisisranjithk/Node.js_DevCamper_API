const ErrorResponse = require("../utils/errorResponse");
const asyncHander = require("../middleware/asyncHandler");
const User = require("../models/User");

// Description:  Register User
// Route: POST /api/v1/auth/register
// Access: Public
exports.register = asyncHander(async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "This is a Register user Route",
  });
});
