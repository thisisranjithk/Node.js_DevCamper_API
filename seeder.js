const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const BootCamp = require("./models/BootCamp");

// Load Env Variables
dotenv.config({ path: "./config/config.env" });

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Read Json file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

// Import into DB
const importData = async () => {
  try {
    await BootCamp.create(bootcamps);
    console.log("Bootcamp data imported successfully...".yellow.inverse);
    process.exit();
  } catch (error) {
    console.log(error.red);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    console.log("Bootcamp data deleted...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error.red);
  }
};

console.log("argv 1 ", process.argv[0]);
console.log("argv 2 ", process.argv[1]);
console.log("argv 3 ", process.argv[2]);

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
