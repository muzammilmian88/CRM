const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: String,
  title: String,
//   image: String,
  description: String,
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'employees', // Reference to the Employee model
  // },
});

const CourseModel = mongoose.model('course', CourseSchema);

module.exports = CourseModel;
