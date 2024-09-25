// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Route to set a secure cookie
app.post("/set-cookie", (req, res) => {
  const { username } = req.body;

  // Set a cookie with secure and additional options
  res.cookie("username", username, {
    httpOnly: true, // Accessible only by the server, prevents JavaScript access
    secure: true, // Cookie only sent over HTTPS
    sameSite: "strict", // Prevents cross-site request forgery (CSRF)
    maxAge: 24 * 60 * 60 * 1000, // Cookie will be valid for 1 day (in milliseconds)
    path: "/", // Cookie available on all paths
  });

  res.status(200).json({ message: "Secure cookie set successfully!" });
});

// Route to get the cookie
app.get("/get-cookie", (req, res) => {
  const { username } = req.cookies; // Get the username cookie

  if (!username) {
    return res.status(404).json({ message: "No cookie found!" });
  }

  res.status(200).json({ message: `Cookie found: ${username}` });
});

// Route to update the cookie
app.put("/update-cookie", (req, res) => {
  const { newUsername } = req.body;

  // Update the cookie with the new username
  res.cookie("username", newUsername, {
    httpOnly: true, // Keep the same security options
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // Valid for 1 day
    path: "/",
  });

  res.status(200).json({ message: `Cookie updated to: ${newUsername}` });
});

// Route to clear (delete) the cookie
app.post("/clear-cookie", (req, res) => {
  // Clear the cookie by setting its expiration date to the past
  res.clearCookie("username", {
    httpOnly: true, // Use the same options to clear the cookie
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({ message: "Cookie cleared successfully!" });
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////
// example 2 //////////////////
const users = [
  { id: 1, username: "jakir", role: "admin" },
  { id: 2, username: "rahim", role: "user" },
];

// Helper function to find user by username
const findUserByUsername = (username) =>
  users.find((user) => user.username === username);

// Route to login and set a session cookie
app.post("/login", (req, res) => {
  const { username } = req.body;

  // Find user from the users array
  const user = findUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // Set a cookie with user session data
  // Here, we're only setting the user ID and role
  res.cookie(
    "session",
    { id: user.id, role: user.role },
    {
      httpOnly: true, // Ensures cookie is accessible only by the web server
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
  );

  res.status(200).json({ message: "Login successful", user });
});

// Route to get session data from cookies
app.get("/profile", (req, res) => {
  const session = req.cookies.session;

  if (!session) {
    return res
      .status(401)
      .json({ message: "No active session. Please login first." });
  }

  // Retrieve user data from the session stored in cookies
  const user = users.find((u) => u.id === session.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User profile", user });
});

// Route to update user role (Advanced example: Updating a cookie)
app.put("/update-role", (req, res) => {
  const session = req.cookies.session;
  const { newRole } = req.body;

  if (!session) {
    return res
      .status(401)
      .json({ message: "No active session. Please login first." });
  }

  // Update the role in the session cookie
  res.cookie(
    "session",
    { id: session.id, role: newRole },
    {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
  );

  res.status(200).json({ message: `Role updated to ${newRole}` });
});

// Route to clear session (logout)
app.post("/logout", (req, res) => {
  // Clear the session cookie
  res.clearCookie("session");
  res.status(200).json({ message: "Logged out successfully!" });
});

// Server setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
