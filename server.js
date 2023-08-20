//server.js
const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./controllers/authController');
const session = require('express-session');
const User = require('./models/user');
const questController = require('./controllers/questController');
const Quest = require('./models/quest');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const uploadDir = path.join(__dirname, 'public', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

if (!fs.existsSync(uploadDir)) {
  // If not, create it
  fs.mkdirSync(uploadDir, { recursive: true });
}


// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(session({ secret: 'somethingrandom', cookie: { maxAge: 3600000 }}));
app.use(express.urlencoded({ extended: true }));
app.use('/quests', questController);
app.use(authRoutes);
app.use('/quests', questController);
app.use('/users', authRoutes);


//routes
app.get('/', (req, res) => {
    res.render('home.ejs')
});


app.get('/index', async (req, res) => {
  const user = await User.findById(req.session.userId);
  const quest = await Quest.findById(user.activeQuest);
  res.render('index', { user: user, quest: quest });
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));
