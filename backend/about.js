const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;