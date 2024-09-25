const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());

app.post(
  "/register",
  [
    // Validation rules
    body("email")
      .isEmail()
      .withMessage("Valid email address দিন")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      .matches(/\d/)
      .withMessage("পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে")
      .matches(/[A-Z]/)
      .withMessage("পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে")
      .trim(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    // যদি কোনো validation error থাকে
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validation সফল হলে ইউজার নিবন্ধন
    res.send("User registered successfully!");
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
