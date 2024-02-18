const express = require('express');
const path = require('path');
const hbs = require('hbs');
const User = require('../models/users');
require('./db/conn');


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        // Get User Data from Database
        const user = await User.findOne({ email });
        
        if (user.email !== email || user.password!==password) {
            res.send('Invalid Username or Password');
        } else {
            res.send('Login Successful');
        }

    } catch (error) {
        res.status(404).send('Invalid Username or Password by error');
    }
})

app.post('/signup', (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });
});


// Home Page Route
app.get('/', (req, res) => {
    res.render('index'); 
});

// Sign Up Root
app.get('/signup', (req, res) => {
    res.render('signup');
});


// Login Route
app.get('/login', (req, res) => {
    res.render('login');
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on Port : ${PORT}`);
});

