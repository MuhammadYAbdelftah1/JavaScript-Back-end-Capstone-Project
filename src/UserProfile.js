import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function UserProfile() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(null);
  const history = useHistory();
  
  // Mock user ID for demonstration purposes
  // In a real application, this would come from authentication
  const userId = localStorage.getItem('userId') || '123456';

  useEffect(() => {
    // Fetch user's bookings when component mounts
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      
      const data = await response.json();
      
      // Show success message
      setCancelSuccess(data.message);
      
      // Refresh bookings list
      fetchUserBookings();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setCancelSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      
      {/* Display success message if booking was cancelled */}
      {cancelSuccess && (
        <div className="success-message">
          {cancelSuccess}
        </div>
      )}
      
      {/* Display error message if there was an error */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <h3>My Bookings</h3>
      
      {bookings.length === 0 ? (
        <p>You don't have any bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h4>{booking.itemName || 'Unnamed Item'}</h4>
              <p>Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              
              {booking.status === 'active' && (
                <button 
                  onClick={() => handleCancelBooking(booking._id)}
                  className="cancel-button"
                >
                  Cancel Booking
                </button>
              )}
              
              {booking.status === 'cancelled' && (
                <p className="cancelled-text">
                  Cancelled on {new Date(booking.cancelledAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;