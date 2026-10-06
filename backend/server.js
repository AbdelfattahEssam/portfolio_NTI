require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;
const Project = require("./project");
const Experience = require("./experience");
const About = require("./about");
const fs = require("fs");
const multer = require("multer");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const DB_URL = process.env.MONGO_URI;
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB error:", err.message));
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.post("/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.post("/experience", async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.get("/experience", async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.put("/experience/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.delete("/experience/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.post("/about", upload.single("image"), async (req, res) => {
  try {
    const about = await About.create({
      description: req.body.description,
      image: req.file ? req.file.filename : undefined,
    });
    res.status(201).json(about);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.get("/about", async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.put("/about/:id", upload.single("image"), async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      if (req.file) fs.unlink("uploads/" + req.file.filename, () => {});
      return res.status(404).json({ message: "About not found" });
    }

    if (req.body.description) {
      about.description = req.body.description;
    }

    if (req.file) {
      if (about.image) {
        fs.unlink("uploads/" + about.image, () => {});
      }
      about.image = req.file.filename;
    }

    await about.save();
    res.json(about);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));
