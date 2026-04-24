const mongoose = require("mongoose");
module.exports = mongoose.model("Post", new mongoose.Schema({
  text: String,
  likes: Number
}));
