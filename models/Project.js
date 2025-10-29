const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  prid: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  category: String,
  techStack: String,
  price: Number,
  deliveryTime: String,
  demoVideoUrl: String,
  reportIncluded: Boolean,
  setupGuide: Boolean,
  screenshots: [String],
  description: String,
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
