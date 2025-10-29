/*
  seed/seed.js
  Run: node seed/seed.js
  This script connects to MONGO_URI and seeds 7 projects + an admin account.
*/
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const Project = require('../models/Project');
const Admin = require('../models/Admin');

const projects = [
  {
    prid: "PRW01",
    title: "Attendance Management System",
    category: "Web Development",
    techStack: "React, Node, MongoDB",
    price: 1500,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Full-stack attendance system with authentication."
  },
  {
    prid: "PRW02",
    title: "Chatbot Using NLP",
    category: "AI/ML Projects",
    techStack: "Python, NLTK, Flask",
    price: 2000,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Intent classification and response generation chatbot."
  },
  {
    prid: "PRW03",
    title: "IoT Smart Home Controller",
    category: "IoT/Arduino",
    techStack: "Arduino, Node, MQTT",
    price: 2500,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Control home devices via web interface using Arduino."
  },
  {
    prid: "PRW04",
    title: "E-commerce Mobile App",
    category: "App Development",
    techStack: "React Native, Firebase",
    price: 3000,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Mobile shopping app with cart and payment simulation."
  },
  {
    prid: "PRW05",
    title: "Mini Project: Fruit Classifier",
    category: "Mini Projects",
    techStack: "Python, TensorFlow",
    price: 1200,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Image classification for fruits using CNN."
  },
  {
    prid: "PRW06",
    title: "Library Management System",
    category: "Web Development",
    techStack: "PHP, MySQL, Bootstrap",
    price: 1000,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Classic LMS with book issue/return workflows."
  },
  {
    prid: "PRW07",
    title: "Face Recognition Door Unlock",
    category: "AI/ML Projects",
    techStack: "OpenCV, Python, Raspberry Pi",
    price: 3500,
    deliveryTime: "Instant",
    demoVideoUrl: "",
    reportIncluded: true,
    setupGuide: true,
    screenshots: [],
    description: "Face recognition based access control demo."
  }
];

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('Please set MONGO_URI in your environment (see .env.example)');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Inserted projects');

    const existing = await Admin.findOne({ email: 'admin@webnest.local' });
    if (!existing) {
      const hash = await bcrypt.hash('admin123', 10);
      await Admin.create({ email: 'admin@webnest.local', passwordHash: hash });
      console.log('Created admin: admin@webnest.local / admin123');
    } else {
      console.log('Admin already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();
