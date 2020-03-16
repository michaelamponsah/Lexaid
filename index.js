// REQUIRE EXPRESS MODULE
const express = require('express');

const expressLayouts = require('express-ejs-layouts');

// INITIALIZE APP VARIABLE WITH EXPRESS
const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4020;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

