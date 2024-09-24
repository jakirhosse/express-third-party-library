const Joi = require("joi");
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require("../services/messageService");
const redis = require("redis");

// Redis ক্লায়েন্ট তৈরি করা
const publisher = redis.createClient();

// মেসেজ ভ্যালিডেশন স্কিমা
const messageSchema = Joi.object({
  content: Joi.string().required(),
});

// Create message controller
const publishMessage = async (req, res) => {
  const { error, value } = messageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const messageContent = value.content;
  const message = await createMessage(messageContent);
  publisher.publish("my_channel", messageContent);
  res.status(201).json({ status: "সফল", message });
};

// Get all messages controller
const fetchAllMessages = async (req, res) => {
  const messages = await getAllMessages();
  res.status(200).json(messages);
};

// Get message by ID controller
const fetchMessageById = async (req, res) => {
  const message = await getMessageById(req.params.id);
  if (!message) {
    return res.status(404).json({ error: "মেসেজ পাওয়া যায়নি।" });
  }
  res.status(200).json(message);
};

// Update message controller
const updateMessageController = async (req, res) => {
  const { error, value } = messageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const updatedMessage = await updateMessage(req.params.id, value.content);
  if (!updatedMessage) {
    return res.status(404).json({ error: "মেসেজ আপডেট করতে ব্যর্থ।" });
  }
  res.status(200).json(updatedMessage);
};

// Delete message controller
const deleteMessageController = async (req, res) => {
  const deletedMessage = await deleteMessage(req.params.id);
  if (!deletedMessage) {
    return res.status(404).json({ error: "মেসেজ মুছতে ব্যর্থ।" });
  }
  res.status(204).send(); // No content
};

module.exports = {
  publishMessage,
  fetchAllMessages,
  fetchMessageById,
  updateMessageController,
  deleteMessageController,
};
