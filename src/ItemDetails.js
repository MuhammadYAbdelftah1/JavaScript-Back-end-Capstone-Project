import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch item details
    fetch(`/api/items/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        return response.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
        setError(error.message);
        setLoading(false);
      });

    // Mock reviews data (since we don't have a real API endpoint for reviews)
    // In a real application, this would be fetched from an API
    const mockReviews = [
      { id: 1, user: 'John Doe', rating: 4.5, comment: 'Great service, highly recommended!', date: '2023-05-15' },
      { id: 2, user: 'Jane Smith', rating: 5, comment: 'Excellent experience, will book again.', date: '2023-06-02' },
      { id: 3, user: 'Bob Johnson', rating: 3.5, comment: 'Good service but could be better.', date: '2023-06-10' }
    ];
    
    // Simulate API call delay
    setTimeout(() => {
      setReviews(mockReviews);
    }, 500);
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <div className="item-details-container">
      <div className="item-details">
        <h2 className="item-name">{item.name}</h2>
        
        <div className="item-info">
          <div className="info-section">
            <h3>Price</h3>
            <p className="price">${item.price}</p>
          </div>
          
          <div className="info-section">
            <h3>Description</h3>
            <p className="description">{item.description || 'No description available'}</p>
          </div>
          
          <div className="info-section">
            <h3>Availability</h3>
            <p className="availability">
              {item.seats ? `${item.seats} seats available` : 'Availability information not available'}
            </p>
          </div>
          
          <div className="info-section">
            <h3>Category</h3>
            <p className="category">{item.category || 'Uncategorized'}</p>
          </div>
        </div>
      </div>
      
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <span className="review-rating">Rating: {review.rating}/5</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews available for this item.</p>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;