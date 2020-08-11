const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @Desc Render registration page
// @Route GET /api/v1/users/register
// @Access Public

exports.getRegister = (req, res) => {
  res.render("./admin-area/register", {
    title: "Lexaid-Register",
  });
};

// @Desc Register user
// @Route POST /api/v1/users/register
// @Access Public
exports.createRegister = async (req, res) => {
  const { username, password, passwordConfirm } = req.body;
  const errors = [];

  // Check required fields
  if (!username || !password || !passwordConfirm) {
    errors.push({ message: "Please fill in all fields" });
  }

  // Check if passwords match
  if (password !== passwordConfirm) {
    errors.push({ message: "Passwords do not match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters long" });
  }

  if (errors.length > 0) {
    res.render("./admin-area/register", {
      title: "Lexaid-Register",
      errors,
      username,
      password,
      passwordConfirm,
    });
  } else {
    try {
      const user = await User.findOne({ username: username });
      // User exists
      if (user) {
        errors.push({ message: "Username is already registered" });
        res.render("./admin-area/register", {
          title: "Lexaid-Register",
          errors,
          username,
          password,
          passwordConfirm,
        });
      } else {
        const newUser = new User({
          username: username,
          password: password,
        });
        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hash
            newUser.password = hash;
            // Save the newUser
            try {
              User.create(newUser);
              res.render("./admin-area/login", {
                title: "Lexaid-Login",
              });
            } catch (error) {
              res.status(500).json({ success: false, message: error.message });
            }
          })
        );
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// @Desc Render login page
// @Route GET /api/v1/users/login
// @Access Public
exports.getLogin = (req, res) => {
  res.render("./admin-area/login", {
    title: "Lexaid-Logins",
  });
};

// @Desc Log a user in
// @Route POST /api/v1/users/login
// @Access Public
exports.createLogin = (req, res) => {
  res.send("Login");
};

// @Desc Render dashboard
// @Route GET /api/v1/users/dashbord
// @Access Private
exports.getDashboard = (req, res) => {
  res.render("./admin-area/admin-dashboard", {
    title: "Lexaid-Dashboard",
  });
};
