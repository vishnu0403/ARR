const mongoose = require("mongoose");

const ARFormSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    companyName: { type: String, required: true },
    purpose: { type: String, required: true },
    logo: { type: String },
    video: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ARForm", ARFormSchema);
