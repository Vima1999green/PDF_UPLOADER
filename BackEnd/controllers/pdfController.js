const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const pdf = require("../models/pdfModel");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

//multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, date.now() + path.extname(file.originalname));
  },
});
