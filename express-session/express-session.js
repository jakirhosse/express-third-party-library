const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // MongoDB session store

const app = express();

// MongoDB connection string
const mongoUrl = "mongodb://localhost:27017/session-demo";

// Session setup with MongoDB store
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      ttl: 14 * 24 * 60 * 60, // 14 days expiry
      autoRemove: "native", // Removes expired sessions automatically
    }),
    cookie: {
      secure: false, // Production এ true করবেন (HTTPS এর জন্য)
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true, // Prevents client-side JS from accessing the cookie
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You have visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send("Welcome to the advanced session demo. Refresh the page!");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
