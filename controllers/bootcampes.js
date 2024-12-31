const BootCamp = require("../models/BootCamp");
const asyncHander = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// Description: Get all Bootcamps
// Route: GET /api/v1/bootcamps
// Access: Public
exports.getBootcamps = asyncHander(async (req, res, next) => {
  let query;

  // Copy of req.query
  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "limit", "page"];

  removeFields.map((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = BootCamp.find(JSON.parse(queryStr)).populate({
    path: "courses",
    select: "title description",
  });

  // Query to Select fields
  if (req.query.select) {
    let fields = req.query.select.replace(",", " ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    let sortBy = req.query.sort.replace(",", " ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-updatedAt");
  }

  //Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const bootcamps = await query;

  // Pagination Result
  const pagination = {};

  if (startIndex > 0) {
    pagination.previousPage = page - 1;
  }

  pagination.currentPage = page;

  if (endIndex < total) {
    pagination.nextPage = page + 1;
  }

  pagination.limit = limit;

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

// Description: Get single Bootcamp
// Route: GET /api/v1/bootcamps/:id
// Access: Public
exports.getBootcamp = asyncHander(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp was not found with Id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// Description: Create a Bootcamp
// Route: POST /api/v1/bootcamps/
// Access: Private
exports.createBootcamp = asyncHander(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// Description: Update a Bootcamp
// Route: PUT /api/v1/bootcamps/:id
// Access: Private
exports.updateBootcamp = asyncHander(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

// Description: Delete a Bootcamp
// Route: DELETE /api/v1/bootcamps/:id
// Access: Private
exports.deleteBootcamp = asyncHander(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return res
      .status(500)
      .json({ success: false, message: "No document found in that Id" });
  }
  await bootcamp.deleteOne();
  res.status(200).json({
    success: true,
    message: "Bootcamp has been deleted successfully",
  });
});
