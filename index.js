const express = require("express");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB সংযোগ
connectDB();

// JSON পোস্ট ডেটা গ্রহণের জন্য মিডলওয়্যার
app.use(express.json());

// রাউট সেটআপ
app.use("/api/messages", messageRoutes);

// সার্ভার চালানো
app.listen(PORT, () => {
  console.log(`সার্ভার চলছে পোর্ট ${PORT} এ`);
});
