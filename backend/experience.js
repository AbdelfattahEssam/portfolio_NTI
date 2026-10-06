const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  summary: {
    type: [String],
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;