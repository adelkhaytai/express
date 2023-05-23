const express = require('express');
const app = express();
  
// Middleware to check if it's within working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  // Check if it's a weekday (Monday to Friday) and within working hours (9 to 17)
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    // Allow access to the application
    next();
  } else {
    // Return an error response if it's outside working hours
    res.status(403).send('Access denied. The application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Apply the middleware to all routes
app.use(workingHoursMiddleware);

// Define your routes and application logic below
app.get('/', (req, res) => {
  res.send('Welcome to the web application!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

