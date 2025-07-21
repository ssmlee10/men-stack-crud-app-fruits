const dotenv = require("dotenv"); // bringing the functionality of dotenv
dotenv.config(); // using dotenv to bring the variables from the .env file

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

// connects to mongodb fruits
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

// Import the fruit model
const Fruit = require("./models/fruit.js");

// adding middleware for app
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
  // render helps us send our templates to the browser
  // render is taking a file, and show it on the browser
  // res.send, sends a very simple string
});

// define index
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find({});
  // console.log(allFruits);
  res.render("fruits/index.ejs", { fruits: allFruits });
});

// GET /fruits/new
// get the page that shows the user the form
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// GET /fruits/:fruitId
// enter in the id, and it should show this message
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    console.log(foundFruit);
    res.render('fruits/show.ejs', { fruit: foundFruit });
    // res.send(`This route renders the show page for the fruit with the id of: ${req.params.fruitId}`);
});

// POST /fruits
app.post("/fruits", async (req, res) => {
  // req.body is what we are modifying
  // console.log(req.body);
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  // this line is the database transaction
  await Fruit.create(req.body);
  res.redirect("/fruits");
});

// DELETE route
app.delete('/fruits/:fruitId', async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect('/fruits');
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
