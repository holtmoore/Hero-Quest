// const express = require('express');
// const router = express.Router();



// router.get('/', (req, res) => {
//     res.render('home.ejs')
// });


// router.get('/index', async (req, res) => {
//   const user = await User.findById(req.session.userId);
//   const quest = await Quest.findById(user.activeQuest);
//   res.render('index', { user: user, quest: quest });
// });





// router.get('/login', (req, res) => {
//     res.render('auth/login.ejs')
// });

// router.post('/login', async (req, res) => {
//     let userToLogin = await User.findOne({ username: req.body.username });
//     if (userToLogin) {
//         bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
//             if (result) {
//                 req.session.userId = userToLogin._id; // Store user's ID in the session
//                 res.redirect('/index');
//             } else {
//                 res.render('auth/login.ejs', { errorMessage: 'Incorrect password.' });
//             }
//         });
//     } else {
//         res.render('auth/login.ejs', { errorMessage: 'User not found.' });
//     }
// });

// router.get('/register', (req, res) => {
//     res.render('auth/register')
// });



// router.post('/register', async (req, res) => {
//     if (req.body.username && req.body.password) {
//         let plainTextPassword = req.body.password;
//         bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
//             req.body.password = hashedPassword;
//             let newUser = await User.create(req.body);
//             req.session.userId = newUser._id; // Change this line
//             res.redirect('/index');
//         });
//     } else {
//         res.render('auth/register.ejs', { errorMessage: 'All fields are required.' })
//     }
// });

// // router.post('/register', upload.single('profileImage'), async (req, res) => {
// //     const { name, username, password } = req.body;
// //     let profileImagePath = '';

// //     try {
// //         if (req.file) {
// //             profileImagePath = `/uploads/${req.file.filename}`;
// //         }
// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const newUser = new User({
// //             name: name,
// //             username: username,
// //             password: hashedPassword,
// //             profileImage: profileImagePath
// //         });
// //         await newUser.save();
// //         req.session.userId = newUser._id;
// //         res.redirect('/index');
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send('Internal Server Error');
// //     }
// // });


// router.get('/update', async (req, res) => {
//     try {
//         const user = await User.findById(req.session.userId);
//         if (!user) {
//             res.status(404).send('User not found');
//             return;
//         }
//         res.render('update-profile', { user: user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
  
// router.post('/update', async (req, res) => {
//     try {
//         const user = await User.findById(req.session.userId);
//         if (!user) {
//             res.status(404).send('User not found');
//             return;
//         }
//         user.username = req.body.username;
//         user.email = req.body.email;

//         await user.save();
//         res.redirect('/index'); // Redirect to the page where you want to show the updated profile
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
  
// router.post('/delete', async (req, res) => {
//     const userId = req.session.userId;
  
//     try {
//       await User.findByIdAndDelete(userId);
//       req.session.destroy(); // Destroy the session after deleting the user
//       res.redirect('/');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });


//   module.exports = router;
