//server.js
const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./controllers/authController');
const questRoutes = require('./controllers/questController');
const session = require('express-session');
const User = require('./models/user');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(session({ secret: 'somethingrandom', cookie: { maxAge: 3600000 }}));
app.use(express.urlencoded({ extended: true }));
app.use(questRoutes)

app.use('/', authRoutes);
app.use('/users', authRoutes);


//routes
app.get('/', (req, res) => {
    res.render('home.ejs')
});


app.get('/index', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate('active_quest');
    const quest = user.active_quest;
    res.render('index', { user, quest });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => console.log(`Server listening on port ${port}!`));
