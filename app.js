const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to verify the time of the request
const verifyTime = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.status(404).send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Set up the routes
app.use(express.static('public')); // Serve static files in public directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (for form data)
app.set('view engine', 'ejs'); // Set up EJS as the template engine

app.get('/', verifyTime, (req, res) => {
  res.render('home');
});

app.get('/services', verifyTime, (req, res) => {
  res.render('services');
});

app.get('/contact', verifyTime, (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Web application listening at http://localhost:${port}`);
});
