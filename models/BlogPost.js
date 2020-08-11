const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
    maxlength: [50, "Title cannot be more than 50 characters"],
  },
  author: {
    type: String,
    required: [true, "Please provide an author"],
  },
  body: {
    type: String,
    required: [true, "please provide a post body"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
