const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

module.exports = { registerUser };
