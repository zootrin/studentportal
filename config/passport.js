const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');


//Get the user model
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({ email: email})
            .then(user => {
                if(!user){
                    return done(null, false, { message: 'That email is not registered'});
                }

                //Match password
                if(password !== user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password is wrong'});
                    }
                });
            })
            .catch(err => console.log(err)); 
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}