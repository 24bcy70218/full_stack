const mongoose = require("mongoose");

module.exports = mongoose.model("Post", new mongoose.Schema({
  title: String,
  content: String,
  userId: String
}));
