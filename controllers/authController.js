//contrllers/authController.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { check, validationResult } = require('express-validator');

const registerValidation = [
    check('username')
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ];
  

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
});

router.post('/login', async (req, res) => {
    let userToLogin = await User.findOne({ username: req.body.username });
    if (userToLogin) {
        bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
            if (result) {
                req.session.userId = userToLogin._id; // Store user's ID in the session
                res.redirect('/index');
            } else {
                res.render('auth/login.ejs', { errorMessage: 'Incorrect password.' });
            }
        });
    } else {
        res.render('auth/login.ejs', { errorMessage: 'User not found.' });
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register')
});



router.post('/register', async (req, res) => {
    if (req.body.username && req.body.password) {
        let plainTextPassword = req.body.password;
        bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
            req.body.password = hashedPassword;
            let newUser = await User.create(req.body);
            req.session.userId = newUser._id; // Change this line
            res.redirect('/index');
        });
    } else {
        res.render('auth/register.ejs', { errorMessage: 'All fields are required.' })
    }
});


module.exports = router;
