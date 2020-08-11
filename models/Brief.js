const mongoose = require("mongoose");

const BriefSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  subCategory: {
    type: String,
    required: [true, "Please provide a sub category"],
    maxlength: [50, "Sub category cannot be more than 30 characters"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    unique: true,
    maxlength: [50, "Title cannot be more than 50 characters"],
  },
  brief: {
    type: String,
    required: [true, "Please upload a pdf file"],
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Brief", BriefSchema);
