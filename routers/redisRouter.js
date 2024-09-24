const express = require("express");
const {
  publishMessage,
  fetchAllMessages,
  fetchMessageById,
  updateMessageController,
  deleteMessageController,
} = require("../controllers/messageController");

const router = express.Router();

// POST মেসেজ পাবলিশ করার জন্য
router.post("/publish", publishMessage);

// GET সব মেসেজ নিয়ে আসার জন্য
router.get("/", fetchAllMessages);

// GET মেসেজ ID দ্বারা নিয়ে আসার জন্য
router.get("/:id", fetchMessageById);

// UPDATE মেসেজ ID দ্বারা আপডেট করার জন্য
router.put("/:id", updateMessageController);

// DELETE মেসেজ ID দ্বারা মুছতে
router.delete("/:id", deleteMessageController);

module.exports = router;
