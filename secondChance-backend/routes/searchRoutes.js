const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../../models/db');

router.get('/suggestions', async (req, res) => { // Ensure the route matches your frontend request
  try {
    const db = await connectToDatabase();
    const query = req.query.q; // Get the search query from the URL
    console.log("Search Query:", query); // Log the query

    // Check if the query is empty
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Filter items by name or category
    const filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
        { category: { $regex: query, $options: 'i' } } // Case-insensitive search by category
      ]
    };
    console.log("Filter:", filter); // Log the filter

    const items = await db.collection('items').find(filter).toArray();
    console.log("Filtered Items:", items); // Log the filtered items

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
