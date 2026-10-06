const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  linkSource: {
    type: String,
  },
  linkPreview: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;