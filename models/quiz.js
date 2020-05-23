const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title required"],
  },
  author: {
    type: String,
    required: [true, "Author required"],
  },
  questions: {
    type: Array,
    default: [],
  },
  public: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
