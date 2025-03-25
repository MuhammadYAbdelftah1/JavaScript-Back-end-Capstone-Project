const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('./db');

// Create a new booking
async function createBooking(bookingData) {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('bookings').insertOne({
      ...bookingData,
      createdAt: new Date(),
      status: 'active' // active, cancelled
    });
    return result.insertedId;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

// Get all bookings for a user
async function getUserBookings(userId) {
  try {
    const db = await connectToDatabase();
    return await db.collection('bookings')
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error('Error getting user bookings:', error);
    throw error;
  }
}

// Get a booking by ID
async function getBookingById(bookingId) {
  try {
    const db = await connectToDatabase();
    return await db.collection('bookings').findOne({ 
      _id: new ObjectId(bookingId) 
    });
  } catch (error) {
    console.error('Error getting booking by ID:', error);
    throw error;
  }
}

// Cancel a booking
async function cancelBooking(bookingId) {
  try {
    const db = await connectToDatabase();
    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'cancelled', cancelledAt: new Date() } }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
}

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking
};