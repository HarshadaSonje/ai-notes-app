const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
  tags: [String],
  isPublic: { type: Boolean, default: false },
  shareId: String,
  isArchived: {
  type: Boolean,
  default: false
},
aiUsed: {
  type: Number,
  default: 0
},
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);