const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./controllers/authController');
const session = require('express-session');
const User = require('./models/user');
const questController = require('./controllers/questController');
const Quest = require('./models/quest');

app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(
    session({ secret: 'somethingrandom', cookie: { maxAge: 3600000 }})
);
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/quests', questController);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/index', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const quest = await Quest.findById(user.active_quest);
    res.render('index', { user: user, quest: quest });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));
