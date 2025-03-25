import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetails.css'; // We'll create this CSS file next

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Fetch item details
    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item:', error));
    
    // Fetch reviews for this item
    fetch(`/api/reviews/item/${id}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const submitReview = (e) => {
    e.preventDefault();
    
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: id,
        rating: newReview.rating,
        comment: newReview.comment,
        // In a real app, you'd get the userId from authentication
        userId: 'anonymous'
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Add the new review to the reviews array
      setReviews([data, ...reviews]);
      // Reset the form
      setNewReview({
        rating: 5,
        comment: ''
      });
      setSubmitStatus('Review submitted successfully!');
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    })
    .catch(error => {
      console.error('Error submitting review:', error);
      setSubmitStatus('Failed to submit review. Please try again.');
    });
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <div className="item-details">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        
        {/* Other item details */}
        {item.price && <p className="item-price">Price: ${item.price}</p>}
        {item.category && <p>Category: {item.category}</p>}
      </div>
      
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        
        {/* Review Form */}
        <div className="review-form-container">
          <h4>Leave a Review</h4>
          <form onSubmit={submitReview} className="review-form">
            <div className="form-group">
              <label>Rating:</label>
              <select 
                name="rating" 
                value={newReview.rating} 
                onChange={handleReviewChange}
                required
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Comment:</label>
              <textarea 
                name="comment" 
                value={newReview.comment} 
                onChange={handleReviewChange}
                placeholder="Share your experience with this item..."
                required
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-review-btn">Submit Review</button>
            
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </form>
        </div>
        
        {/* Reviews List */}
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this item!</p>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <div className="star-rating">
                    {renderStars(review.rating)}
                  </div>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <p className="review-user">By: {review.userId}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;