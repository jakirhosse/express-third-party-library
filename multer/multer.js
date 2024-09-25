// app.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir); // File will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Create a unique filename
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Preserve original file extension
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/; // Allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Only .png, .jpg, .jpeg, .gif, .pdf, .doc, and .docx files are allowed!"
      )
    );
  }
};

// Initialize multer with storage configuration and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: fileFilter,
});

// Define a POST route for single file upload
app.post("/upload-single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Define a POST route for multiple file uploads
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  // Allow up to 5 files
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const fileNames = req.files.map((file) => file.filename);
  res.send(`Files uploaded successfully: ${fileNames.join(", ")}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).send(err.message);
  } else if (err) {
    return res.status(400).send(err.message);
  }
  next();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
