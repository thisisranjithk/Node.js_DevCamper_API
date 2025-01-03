const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampImageUpload,
} = require("../controllers/bootcampes");
const BootCamp = require("../models/BootCamp");
const advancedResults = require("../middleware/advancedResults");
// Include other resouce Router
const courseRouter = require("./courses");
const { protect } = require("../middleware/auth");

// Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(BootCamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

router.route("/:id/image").put(protect, bootcampImageUpload);

module.exports = router;
