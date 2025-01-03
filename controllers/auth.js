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

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    token,
  });
});

// Description:  Login User
// Route: POST /api/v1/auth/login
// Access: Public
exports.login = asyncHander(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorResponse("Please provide the email", 404));
  }

  if (!password) {
    return next(new ErrorResponse("Please provide the password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  // MatchPassword Middleware method
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const token = user.getSignedJwtToken();
  res.status(200).json({
    success: true,
    message: "User LoggedIn successfully",
    token,
  });
});
