const ErrorResponse = require("../utils/errorResponse");
const asyncHander = require("../middleware/asyncHandler");
const Course = require("../models/Course");

// Description: Get all Courses
// Route: GET /api/v1/courses/
// Route: GET /api/v1/bootcamps/:bootcampId/courses
// Access: Public
exports.getCourses = asyncHander(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.map((params) => delete reqQuery[params]);

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  // Query for Selected Fields
  if (req.query.select) {
    const fields = req.query.select.replace(",", " ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.replace(",", " ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-updatedAt");
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Course.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Pagination result
  const pagination = {};

  if (startIndex > 0) {
    pagination.prev = {
      prev: page - 1,
      limit,
    };
  }
  pagination.currentPage = page;
  if (endIndex < total) {
    pagination.next = {
      next: page + 1,
      limit,
    };
  }

  const courses = await query;
  res
    .status(200)
    .json({ success: true, count: courses.length, pagination, data: courses });
});

// Description: Get single Course
// Route: GET /api/v1/courses/:id
// Access: Public
exports.getCourse = asyncHander(async (req, res, next) => {
  const courses = await Course.findById(req.params.id);
  res.status(200).json({ success: true, count: courses.length, data: courses });
});
