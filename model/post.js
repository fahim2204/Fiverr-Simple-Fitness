const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postTitle: { type: String, required: true, minlength: 4 },
  postDetails: { type: String, required: true, minlength: 4 },
  postImage: { type: String, required: false },
  category: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  status: { type: Number, default: 1 },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
});


module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
