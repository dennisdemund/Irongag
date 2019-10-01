const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  name: String,
  url: String,
  downvotes: [],
  upvotes: [],
  tags: [],
  uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;