import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const history = useHistory();
  
  // Mock user ID for demonstration purposes
  // In a real application, this would come from authentication
  const userId = localStorage.getItem('userId') || '123456';

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);

  const handleBooking = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          itemId: id,
          itemName: item.name,
          bookingDate: new Date()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }
      
      const data = await response.json();
      setBookingSuccess(true);
      setBookingError(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    } catch (err) {
      setBookingError(err.message);
      setBookingSuccess(false);
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setBookingError(null);
      }, 3000);
    }
  };

  const goToProfile = () => {
    history.push('/profile');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      
      {/* Display success message if booking was created */}
      {bookingSuccess && (
        <div className="success-message">
          Booking created successfully! 
          <button onClick={goToProfile} className="view-profile-button">
            View in My Profile
          </button>
        </div>
      )}
      
      {/* Display error message if there was an error */}
      {bookingError && (
        <div className="error-message">
          {bookingError}
        </div>
      )}
      
      <button onClick={handleBooking} className="book-button">
        Book Now
      </button>
    </div>
  );
}

export default ItemDetails;