const ErrorResponse = require("../utils/errorResponse");
const asyncHander = require("../middleware/asyncHandler");
const Course = require("../models/Course");

// Description: Get all Courses
// Route: GET /api/v1/courses/
// Route: GET /api/v1/bootcamps/:bootcampId/courses
// Access: Public
exports.getCourses = asyncHander(async (req, res, next) => {
  let query;

  console.log(req.params.bootcampId);
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// Description: Get single Course
// Route: GET /api/v1/courses/:id
// Access: Public
exports.getCourse = asyncHander(async (req, res, next) => {
  const courses = await Course.findById(req.params.id);
  res.status(200).json({ success: true, count: courses.length, data: courses });
});
