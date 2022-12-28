const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Faq",
  new mongoose.Schema({
    question: String,
    answer: String,
    createdAt: { type: Date, default: Date.now },
  })
);
