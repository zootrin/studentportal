const express = require('express');
const router = express.Router();
const passport = require('passport');

//User Model
const User = require('../models/User')

//Login Page
router.get('/login', (request, response) => response.render('Login'));

//Register Page
router.get('/Register', (request, response) => response.render('Register'));

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check for required fields
    if(!name || !email || !password || !password2){
        errors.push({ })
    }

    //Check passwords match
    if(password !== password2){
        errors.push({ msg: 'Passwords are not the same'})
    }

    //Check password length
    if(password.length < 3){
        errors.push({ msg: 'Your password must be at least 3 characters' })
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Access Granted 
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                //User Exists
                errors.push({ msg: 'Email is already in use'});
                res.render('register', {
                    errors: errors,
                    name: name,
                    email: email,
                    password: password,
                    password2: password2
                });
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                newUser.save()
                    .then(user => {
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
            }
        });
    }
});

//Login Handles
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login'
    })(req, res, next);
});

module.exports = router;

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})