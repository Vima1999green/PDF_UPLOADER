const passport = require("passport");

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../../controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

module.exports = router;
