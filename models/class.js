const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  subject: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
});

module.exports = Class = mongoose.model('Class', ClassSchema);
