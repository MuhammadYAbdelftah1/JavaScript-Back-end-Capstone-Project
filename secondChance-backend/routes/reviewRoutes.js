const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');

// Get all reviews for a specific item
router.get('/item/:itemId', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const itemId = req.params.itemId;
    const reviews = await db.collection('reviews')
      .find({ itemId: itemId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .toArray();
    
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { itemId, rating, comment, userId } = req.body;
    
    // Validate input
    if (!itemId || !rating || !comment) {
      return res.status(400).json({ error: 'ItemId, rating, and comment are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const newReview = {
      itemId,
      rating: Number(rating),
      comment,
      userId: userId || 'anonymous', // Default to anonymous if no userId provided
      createdAt: new Date()
    };
    
    const result = await db.collection('reviews').insertOne(newReview);
    res.status(201).json({ 
      ...newReview, 
      _id: result.insertedId 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;