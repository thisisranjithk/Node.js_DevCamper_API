const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHander"); // error handler middleware

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();
const app = express();

//express fileupload
app.use(fileUpload());

// Set static folders
app.use(express.static(path.join(__dirname, "public")));

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

//error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  );
});
