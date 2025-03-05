const express = require('express');
const router = express.Router();
const items = ["Item1", "Item2", "Item3", "Cloud Services", "Mobile Development", "Desktop Applications", "Database Management", "Custom Software"]; // Example items

router.get('/suggestions', (req, res) => {
  const query = req.query.query.toLowerCase();
  const suggestions = items.filter(item => item.toLowerCase().includes(query));
  res.json(suggestions);
});

module.exports = router;
