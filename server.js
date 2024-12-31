const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
// const logger = require("./middleware/logger"); // custom middleware
const errorHandler = require("./middleware/errorHander"); // error handler middleware

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

//express fileupload
app.use(fileUpload());

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Body parser
app.use(express.json());

// app.use(logger);

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

//error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  );
});
