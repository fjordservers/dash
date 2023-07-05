const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line

const app = express();

// Configure session middleware
app.use(
  session({
    secret: 'mysecretkey', // Change this to a more secure secret in a real-world application
    resave: false,
    saveUninitialized: true,
  })
);

// Parse request bodies as JSON
app.use(bodyParser.json()); // Add this line

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint for handling login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    console.log('Received login request:', username, password);
  
    // Perform actual authentication here (e.g., check against a database)
  
    // Dummy authentication for demonstration purposes
    if (username === 'admin' && password === 'Password') {
      req.session.username = username;
  
      console.log('Login successful');
  
      res.sendStatus(200); // Success
    } else {
      console.log('Login failed');
  
      res.sendStatus(401); // Unauthorized
    }
  });
  
    

// Endpoint for handling logout requests
app.get('/logout', (req, res) => {
  // Destroy the user's session
  req.session.destroy();

  res.sendStatus(200); // Success
});

// Endpoint for checking if the user is logged in
app.get('/checkAuth', (req, res) => {
  if (req.session.username) {
    res.sendStatus(200); // User is logged in
  } else {
    res.sendStatus(401); // User is not logged in
  }
});

// Serve the login.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the dashboard.html file
app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  } else {
    res.redirect('/');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
