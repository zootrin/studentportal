const express = require('express');
const router = express.Router();

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
        res.send('pass');
    }
});

module.exports = router;
