const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },           // categorize, cloze, comprehension
  questionText: { type: String, required: true },   // Question text
  imageUrl: { type: String },                        // Optional image for question
  options: [String],                                 // Options for categorize or comprehension (if needed)
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Form title
  headerImageUrl: { type: String },                  // Header image URL (optional)
  questions: [questionSchema],                        // Array of questions
  createdAt: { type: Date, default: Date.now },      // Timestamp
});

module.exports = mongoose.model('Form', formSchema);
