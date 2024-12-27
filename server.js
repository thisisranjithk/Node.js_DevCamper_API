const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
// const logger = require("./middleware/logger"); // custom middleware
const errorHandler = require("./middleware/errorHander"); // error handler middleware

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();
// Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Body parser
app.use(express.json());

// app.use(logger);

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

//error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  );
});