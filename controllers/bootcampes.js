const BootCamp = require("../models/BootCamp");

// Description: Get all Bootcamps
// Route: GET /api/v1/bootcamps
// Access: Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

// Description: Get single Bootcamp
// Route: GET /api/v1/bootcamps/:id
// Access: Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);

    // if (!bootcamp) {
    //   return res.status(400).json({ success: false });
    // }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
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
    next(error);
  }
};

// Description: Update a Bootcamp
// Route: PUT /api/v1/bootcamps/:id
// Access: Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

// Description: Delete a Bootcamp
// Route: DELETE /api/v1/bootcamps/:id
// Access: Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(500)
        .json({ success: false, message: "No document found in that Id" });
    }
    await BootCamp.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Bootcamp has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
