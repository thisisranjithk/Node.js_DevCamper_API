const BootCamp = require("../models/BootCamp");

// Description: Get all Bootcamps
// Route: GET /api/v1/bootcamps
// Access: Public
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: "Get all bootcamps", hello: req.hello });
};

// Description: Get single Bootcamp
// Route: GET /api/v1/bootcamps/:id
// Access: Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get bootcamp for ${req.params.id}` });
};

// Description: Create a Bootcamp
// Route: POST /api/v1/bootcamps/
// Access: Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Description: Update a Bootcamp
// Route: PUT /api/v1/bootcamps/:id
// Access: Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// Description: Delete a Bootcamp
// Route: DELETE /api/v1/bootcamps/:id
// Access: Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
