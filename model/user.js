const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 4 },
  profilePic: String,
  gender: String,
  email: { type: String, unique: false },
  country: String,
  token: String,
  status: Number,
  joinedAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});


module.exports = mongoose.models.User || mongoose.model('User', userSchema);
