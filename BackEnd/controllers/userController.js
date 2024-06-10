const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();

SECRET_KEY = process.env.SECRET_KEY;

//@type: User Registration controller
//@desc: to resgister a user here we hash the passowords and store user details in database

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = User.findOne({ email });
  user
    .then((user) => {
      //check user already exists
      if (user) {
        return res.status(400).json({ msg: "User already Exists" });
      }

      // create a new user instance
      const newUser = new User({
        name,
        email,
        password,
      });

      //Encrypt the passoword before saving
      bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(newUser.password, salt).then((hash) => {
          newUser.password = hash;

          //save new user to database
          newUser.save().then(() => {
            res.status(200).json({ msg: "User Registration Successfull" });
          });
        });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

//****************************************************************************************************
//@type: User Login controller
//@desc: check the user login is valid
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  user.then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not Found.check the email Address" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    isMatch
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: "Passoword Incorrect" });
        }
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
        JWT.sign(payload, SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
          if (err) {
            res.status(500).json({ msg: "Error in token genarating", err });
          }
          res.json({
            success: true,
            token: "Bearer " + token,
          });
          console.log(token);
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
      });
  });
};

//controller for getting current user
const getCurrentUser = async (req, res) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({ msg: "No user found" });
    }

    res.json({
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };
