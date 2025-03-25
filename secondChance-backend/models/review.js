// Review model schema
const reviewSchema = {
  itemId: String,  // Reference to the item being reviewed
  rating: Number,  // Rating (1-5 stars)
  comment: String, // Review comment
  userId: String,  // User who left the review (can be enhanced with authentication)
  createdAt: Date  // When the review was created
};

module.exports = { reviewSchema };