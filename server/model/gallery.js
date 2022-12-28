const mongoose = require("mongoose");

module.exports = mongoose.model(
    "Gallery",
    new mongoose.Schema({
        categoryName: String,
        uploadedImage: String,
        resultantImage: String,
        createdAt: { type: Date, default: Date.now },
        status: { type: Number, default: 1 },
        isArchived: { type: Number, default: 0 },
        isPublic: { type: Boolean, default: 0 },
        user: { type: mongoose.SchemaTypes.ObjectId, ref: "Profile" }
    })
);