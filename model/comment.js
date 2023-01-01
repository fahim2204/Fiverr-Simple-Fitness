const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentDetails: { type: String, required: true, minlength: 4 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  status: { type: Number, default: 1 },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
});


module.exports = mongoose.models.Commnet || mongoose.model('Commnet', commentSchema);
