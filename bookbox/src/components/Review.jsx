import Rating from "react-rating";

const Review = ({ review }) => {
    const timestamp = new Date(review.createdAt).toLocaleString();
    return (
      <div className="bg-white p-4 rounded shadow my-4">
        <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
        <Rating
          placeholder="Rating (1-5)"
          emptySymbol={<span className="rating-icon">&#9734;</span>}
          fullSymbol={<span className="rating-icon">&#9733;</span>}
          initialRating={review.rating}
          fractions={2}
          className="text-[2em] mb-2"
          readonly
        />
        <p className="mb-2">{review.content}</p>
        <p className="text-gray-500 text-sm">{timestamp}</p>
      </div>
    );
};    

export default Review;