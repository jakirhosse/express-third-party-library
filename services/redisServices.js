const Message = require("../models/Message");

// Create a new message
const createMessage = async (messageContent) => {
  const message = new Message({ content: messageContent });
  await message.save();
  return message;
};

// Get all messages
const getAllMessages = async () => {
  return await Message.find();
};

// Get a message by ID
const getMessageById = async (id) => {
  return await Message.findById(id);
};

// Update a message
const updateMessage = async (id, newContent) => {
  return await Message.findByIdAndUpdate(
    id,
    { content: newContent },
    { new: true }
  );
};

// Delete a message
const deleteMessage = async (id) => {
  return await Message.findByIdAndDelete(id);
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
