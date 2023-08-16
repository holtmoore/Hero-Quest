const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const User = require('./models/user');

app.set('view engine', 'ejs');
// middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// routes
app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/login', (req, res) => {
    res.render('auth/login.ejs')
});

app.post('/login', (req, res) => {
    console.log(req.body)
    res.send(req.body)
});

app.post('/register', (req, res) => {
    console.log(req.body)
    res.send(req.body)
});

app.get('/register', (req, res) => {
    res.render('auth/register.ejs')
});

app.listen(port, () => console.log(`show that shii on ${port}!`));
