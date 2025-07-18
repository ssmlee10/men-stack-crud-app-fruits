const dotenv = require('dotenv');// bringing the functionality of dotenv
dotenv.config(); // using dotenv to bring the variables from the .env file

const express = require('express'); 
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

// connects to mongodb fruits
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// Import the fruit model
const Fruit = require('./models/fruit.js');

// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
    // render helps us send our templates to the browser
    // render is taking a file, and show it on the browser
    // res.send, sends a very simple string
});

//GET /fruits/new
// get the page that shows the user the form
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});