const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    opinion: Number,
    category: Number,
    feedText: String,
    createdAt: { type: Date, default: Date.now },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Profile'
    }
  })
);
