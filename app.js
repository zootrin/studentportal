const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express(); 

//Passport configuration
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser:true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 6969;

app.listen(PORT, console.log(`Server started on port ${PORT}`));