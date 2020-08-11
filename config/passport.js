const LocalStrtegy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrtegy(),
    {
      usernameField: "username",
    },
    (username, password, done) => {
      // Match user
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Username is not registered" });
          }
          // Match Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    }
  );

  passport.serializeUser((id, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
