// Here is where we import modules
// We begin by loading Express
const express = require('express');

const app = express();

// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
    // render helps us send our templates to the browser
    // render is taking a file, and show it on the browser
    // res.send, sends a very simple string
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});