const express = require('express');
const app = express();
const itemsRouter = require('./routes/secondChanceItemsRoutes'); // Ensure the correct path
const searchRouter = require('./routes/searchRoutes'); // Ensure the correct path

// Middleware to parse JSON requests
app.use(express.json());

// Use the items router for item-related routes
app.use('/api/items', itemsRouter);
app.use('/api/search', searchRouter);

// Example of other routes
app.get('/', (req, res) => {
  res.send('Welcome to the JavaScript Back-end Capstone Project!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
