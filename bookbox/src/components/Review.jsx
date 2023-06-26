
const Review = ({ review }) => {
    const timestamp = new Date(review.createdAt).toLocaleString();
    return (
      <div className="bg-white p-4 rounded shadow my-4">
        <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
        <p className="mb-2">Rating: {review.rating}</p>
        <p className="mb-2">{review.content}</p>
        <p className="text-gray-500 text-sm">{timestamp}</p>
      </div>
    );
};    

export default Review;