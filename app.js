// REQUIRED EXTERNAL MODULE
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// INITIALIZE APP VARIABLE WITH EXPRESS **** APP VARIABLES
const app = express();

// APP CONFIGURATIONS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// ROUTES OR ENDPOINTS DEFINITIONS
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/home', indexRoute);
//app.use('/users', usersRoute);
app.use('/login', indexRoute);
app.use('/dashboard', indexRoute);
app.use('/briefs', indexRoute)
app.use('/quotes', indexRoute)
app.use('/blog', indexRoute)









// SERVER ACTIVATION
const PORT = process.env.PORT || 4020;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

