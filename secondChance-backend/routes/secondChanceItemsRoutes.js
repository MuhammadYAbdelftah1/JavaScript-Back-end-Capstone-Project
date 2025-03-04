const express = require('express');
const multer = require('multer');
const router = express.Router();
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

router.get('/items', async (req, res) => {
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

// Route to handle file upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    // You can now save file information to the database if needed
    res.status(200).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
