const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a course title"],
      trim: true,
      maxlength: [50, "course title can not be more than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "course description field is required"],
    },
    weeks: {
      type: String,
      required: [true, "Please add number of weeks"],
    },
    tuition: {
      type: Number,
      required: [true, "please add a tuition fees"],
    },
    minimumSkill: {
      type: String,
      required: [true, "please a minimum skill level"],
      enum: ["beginner", "intermediate", "advanced"],
    },
    scholarhipsAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: "Bootcamp",
      required: [true, "Bootcamp Id is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
