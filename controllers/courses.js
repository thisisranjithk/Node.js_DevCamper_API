const ErrorResponse = require("../utils/errorResponse");
const asyncHander = require("../middleware/asyncHandler");
const Course = require("../models/Course");
const BootCamp = require("../models/BootCamp");

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
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course was not found with Id  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, count: course.length, data: course });
});

// Description: Add a Course
// Route: POST /api/v1/bootcamps/:bootcampId/courses
// Access: Private
exports.addCourse = asyncHander(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await BootCamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp was not found with that Id ${req.params.bootcampId}`,
        404
      )
    );
  }
  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

// Description: Update a Course
// Route: PUT /api/v1/courses/:id
// Access: Private
exports.updateCourse = asyncHander(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        `No Course was not found with that Id ${req.params.id}`,
        404
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: course,
  });
});

// Description: Delete a Course
// Route: DELETE /api/v1/courses/:id
// Access: Private
exports.deleteCourse = asyncHander(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: "No document found in that Id" });
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});
