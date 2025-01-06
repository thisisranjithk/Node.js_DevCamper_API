const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Review = require("../models/Review");
const BootCamp = require("../models/BootCamp");

// Description: Get all Reviews
// Route: GET /api/v1/reviews/
// Route: GET /api/v1/bootcamps/:bootcampId/reviews
// Access: Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
