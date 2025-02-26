const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../../models/db');

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;