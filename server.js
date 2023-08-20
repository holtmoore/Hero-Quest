const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./controllers/authController');
const session = require('express-session');
const User = require('./models/user');
const questController = require('./controllers/questController');
const Quest = require('./models/quest');

// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(session({ secret: 'somethingrandom', cookie: { maxAge: 3600000 }}));
app.use(express.urlencoded({ extended: true }));
app.use('/quests', questController);
app.use(authRoutes);


//routes
app.get('/', (req, res) => {
    res.render('home.ejs')
});


app.get('/index', async (req, res) => {
  const user = await User.findById(req.session.userId);
  const quest = await Quest.findById(user.activeQuest);
  res.render('index', { user: user, quest: quest });
});

app.post('/acceptQuest/:questId', async (req, res) => {
  const userId = req.session.userId;
  const questId = req.params.questId;

  try {
      await User.findByIdAndUpdate(userId, {
          activeQuest: questId,
          questCompleted: false,
      });
      res.redirect('/index');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/completeQuest', async (req, res) => {
  const userId = req.session.userId;

  try {
      await User.findByIdAndUpdate(userId, {
          questCompleted: true,
      });
      res.redirect('/index');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));
