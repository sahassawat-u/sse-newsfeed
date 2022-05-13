const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    title: { type: String, require: true },
    content: { type: String, require: true },
    photo: { type: String, require: true },
    likers: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
