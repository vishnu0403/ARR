// backend1/routes/arforms.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ARForm = require("../models/ARForm");
const auth = require("../middleware/auth");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post(
  "/submit",
  auth,
  upload.fields([{ name: "logo" }, { name: "video" }]),
  async (req, res) => {
    try {
      const { type, companyName, purpose } = req.body;
      const logo = req.files["logo"][0].path;
      const video = req.files["video"][0].path;

      const newForm = new ARForm({
        type,
        companyName,
        purpose,
        logo,
        video,
      });

      await newForm.save();
      res.status(200).json({ message: "Form submitted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error submitting form" });
    }
  }
);

module.exports = router;
