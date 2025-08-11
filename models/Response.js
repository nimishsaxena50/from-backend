const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true }, // Reference to form
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },      // Question id
    answer: { type: mongoose.Schema.Types.Mixed },                             // Answer value (string, array etc)
  }],
  submittedAt: { type: Date, default: Date.now },                             // Submission timestamp
});

module.exports = mongoose.model('Response', responseSchema);
