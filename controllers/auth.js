const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

// Description:  Register User
// Route: POST /api/v1/auth/register
// Access: Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    username: name,
    email,
    password,
    role,
  });

  SendCookieTokenResponse(user, 200, res, "User Registered successfully");
});

// Description:  Login User
// Route: POST /api/v1/auth/login
// Access: Public
exports.login = asyncHandler(async (req, res, next) => {
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

  SendCookieTokenResponse(user, 200, res, "User LoggedIn successfully");
});

// Get token from model and create cookie and send as response
const SendCookieTokenResponse = (user, statusCode, res, message) => {
  // Generate Token
  const token = user.getSignedJwtToken();

  //Cookie parser options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
  });
};

// Description:  Get User
// Route: POST /api/v1/auth/user
// Access: Private

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
