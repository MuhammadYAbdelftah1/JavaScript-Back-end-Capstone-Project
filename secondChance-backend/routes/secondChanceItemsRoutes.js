const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../../models/db');
const { ObjectId } = require('mongodb');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE route to delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const id = req.params.id;
    const result = await db.collection('items').deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
