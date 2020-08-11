// REQUIRED EXTERNAL MODULE
require("dotenv").config();
const express = require("express");
const fileupload = require("express-fileupload");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");
const passport = require("passport");

// DB CONNECTION
connectDB();

// INITIALIZE APP VARIABLE WITH EXPRESS **** APP VARIABLES
const app = express();

// FILE UPLOADING
app.use(fileupload());

// PASSPORT CONFIGUE
// require("./config/passport")(passport);

// APP CONFIGURATIONS & MIDDLEWARE
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ROUTES OR ENDPOINTS DEFINITIONS
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");
const blogRoute = require("./routes/blog");
const briefRoute = require("./routes/brief");
const quoteRoute = require("./routes/quote");S
// const passport = require("passport");

app.use("/", indexRoute);
app.use("/api/v1/user", usersRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/briefs", briefRoute);
app.use("/api/v1/quotes", quoteRoute);

// SERVER ACTIVATION
const PORT = process.env.PORT || 4020;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
