import { useState } from "react";
import { createReview } from "../utility";
import Rating from 'react-rating';

const ReviewForm = ({ bookId, fetchReviews }) => {
    const [review, setReview] = useState({
      reviewerName: '',
      rating: 0,
      comments: '',
    });

    const handleRatingChange = (value) => {
      setReview({ ...review, rating: value });
    };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      console.log('type of review.rating ', typeof(review.rating));

      let reviewInfo = {
        name: review.reviewerName,
        rating: review.rating,
        content: review.comments,
        bookId: bookId,
        createdAt: new Date().toString()
      }

      await createReview(reviewInfo)

      setReview({
        reviewerName: '',
        rating: 0,
        comments: '',
      });

      fetchReviews();
    };
  
    return (
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow my-4">
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={review.reviewerName}
          onChange={(e) =>
            setReview({ ...review, reviewerName: e.target.value })
          }
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
        />
        <Rating
          placeholder="Rating (1-5)"
          emptySymbol={<span className="rating-icon">&#9734;</span>}
          fullSymbol={<span className="rating-icon">&#9733;</span>}
          initialRating={review.rating}
          onChange={handleRatingChange}
          fractions={2}
          className="text-[2em] mb-2"
        />
        <textarea
          placeholder="Comments"
          value={review.comments}
          onChange={(e) => setReview({ ...review, comments: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    );
};

export default ReviewForm;