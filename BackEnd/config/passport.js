const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/userModel");
require("dotenv").config();

const opts = {
  //jwtFromRequest tells Passport where to find the JWT token in the request.
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //secretOrKey is the secret key used to verify the JWT's signature.
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((error) => {
          console.error(error);
        });
    })
  );
};
