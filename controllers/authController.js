const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
});

router.post('/login', async (req, res) => {
    let userToLogin = await User.findOne({ username: req.body.username });

    if(userToLogin){
        bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
            if (result) {
                req.session.user = userToLogin; // Set user object in session
                res.redirect('/index')
            } else {
                res.render('auth/login.ejs', { errorMessage: 'Incorrect password.' })
            }
        })
    } else {
        res.render('auth/login.ejs', { errorMessage: 'User not found.' })
    }
});

router.post('/register', async (req, res) => {
    if (req.body.username && req.body.password) {
        let plainTextPassword = req.body.password;
        bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
            req.body.password = hashedPassword;
            let newUser = await User.create(req.body);
            req.session.user = newUser; // Automatically log in new user
            res.redirect('/index'); // Redirect to index instead of login
        });
    } else {
        res.render('auth/register.ejs', { errorMessage: 'All fields are required.' })
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register')
});

module.exports = router;
