const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB এর সাথে সংযোগ সফল!");
  } catch (error) {
    console.error("MongoDB সংযোগে ত্রুটি:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
