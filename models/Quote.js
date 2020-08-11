const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  quote: {
    type: String,
    required: [true, "Please upload a file"],
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Quote", QuoteSchema);
