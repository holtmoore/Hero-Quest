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

app.use(
    session({ secret: 'somethingrandom', cookie: { maxAge: 60000 }})
    );

    app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.use(authRoutes)

app.listen(port, () => console.log(`show that shii on ${port}!`));
