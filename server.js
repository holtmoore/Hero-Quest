const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./controllers/authController');
const session = require('express-session');

app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(
    session({ secret: 'somethingrandom', cookie: { maxAge: 3600000 }}) // Increase maxAge to 1 hour (3600 seconds)
);

app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.use(authRoutes);

app.get('/index', (req, res) => {
    const user = req.session.user;
    if (user) {
      res.render('index.ejs', { user: user });
    }
  });


app.use(authRoutes);

app.listen(port, () => console.log(`show that shii on ${port}!`));
