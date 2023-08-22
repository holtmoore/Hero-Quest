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
                req.session.userId = userToLogin._id;
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

// router.post('/register', async (req, res) => {
//     if (req.body.username && req.body.password) {
//         let plainTextPassword = req.body.password;
//         bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
//             req.body.password = hashedPassword;
//             let newUser = await User.create(req.body);
//             req.session.userId = newUser._id;

//             // Check if the name entered matches your mom's name
//             if (req.body.name === "Christine Moore") {
//                 res.render('specialMessage', { user: newUser });
//             } else {
//                 res.redirect('/index');
//             }
//         });
//     } else {
//         res.render('auth/register.ejs', { errorMessage: 'All fields are required.' })
//     }
// });


router.post('/register', upload.single('profileImage'), async (req, res) => {
    if (req.body.username && req.body.password) {
      let plainTextPassword = req.body.password;
      bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
        req.body.password = hashedPassword;
        if (req.file) {
          req.body.image = req.file.filename;
        }
        let newUser = await User.create(req.body);
        req.session.userId = newUser._id;
        res.redirect('/index');
      });
    } else {
      res.render('auth/register.ejs', { errorMessage: 'All fields are required.' })
    }
  });
  

router.get('/update', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('update-profile', { user: user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
  
router.post('/update', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        user.username = req.body.username;
        user.email = req.body.email;

        await user.save();
        res.redirect('/index');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
  
router.post('/delete', async (req, res) => {
    const userId = req.session.userId;
  
    try {
      await User.findByIdAndDelete(userId);
      req.session.destroy(); 
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/timeline', async (req, res) => {
    try {
      const users = await User.find({ active: true }).populate('active_quest');
      res.render('timeline', { users });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      res.redirect('/'); 
    });
  });
  

module.exports = router;
