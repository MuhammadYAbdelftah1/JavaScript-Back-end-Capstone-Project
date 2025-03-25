const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  getBookingById, 
  cancelBooking 
} = require('../models/booking');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    if (!bookingData.userId || !bookingData.itemId) {
      return res.status(400).json({ error: 'User ID and Item ID are required' });
    }
    
    const bookingId = await createBooking(bookingData);
    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully', 
      bookingId 
    });
  } catch (error) {
    console.error('Error in create booking route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await getUserBookings(userId);
    res.json(bookings);
  } catch (error) {
    console.error('Error in get user bookings route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a booking by ID
router.get('/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await getBookingById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error in get booking by ID route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel a booking
router.put('/:id/cancel', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const success = await cancelBooking(bookingId);
    
    if (!success) {
      return res.status(404).json({ error: 'Booking not found or already cancelled' });
    }
    
    res.json({ 
      success: true, 
      message: 'Booking cancelled successfully' 
    });
  } catch (error) {
    console.error('Error in cancel booking route:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;