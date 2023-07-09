import { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { useUserContext } from '../context/UserContext';
import { editReview } from '../utility';
import { openToastifyMessage } from './ToastifyMessage';

const EditReview = ({ review, cancel }) => {
  const { userInfo, handleGetReviews } = useUserContext();
  const [editedReview, setEditedReview] = useState({
    title: review.title,
    rating: review.rating,
    comments: review.content,
  });

  const [saveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {
    const formChanged =
      review.title !== editedReview.title ||
      review.rating !== editedReview.rating ||
      review.content !== editedReview.comments;

    setSaveDisabled(!formChanged);
  }, [editedReview, review]);

  const handleRatingChange = (value) => {
    setEditedReview({ ...editedReview, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('type of editedReview.rating ', typeof editedReview.rating);

    let updatedReview = {
      title: editedReview.title,
      rating: editedReview.rating,
      content: editedReview.comments,
      updatedAt: new Date().toString(),
    };

    const newReview = await editReview(review.id, updatedReview);
    console.log('this is the new review here: ', newReview);

    cancel();

    if (newReview.success) {
        openToastifyMessage("success", newReview.message);
        handleGetReviews();
    } else if (!newReview.success) {
        openToastifyMessage("error", newReview.error);
    }

    // Implement your update logic here
    // You can pass the updatedReview object to the parent component for saving

    setEditedReview({
      title: '',
      rating: 0,
      comments: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow my-4">
      <h3 className="text-lg font-semibold mb-2">Edit Review</h3>
      <input
        type="text"
        placeholder="title"
        value={editedReview.title}
        onChange={(e) =>
          setEditedReview({ ...editedReview, title: e.target.value })
        }
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <Rating
        placeholder="Rating (1-5)"
        emptySymbol={<span className="rating-icon">&#9734;</span>}
        fullSymbol={<span className="rating-icon">&#9733;</span>}
        initialRating={editedReview.rating}
        onChange={handleRatingChange}
        fractions={2}
        className="text-[2em] mb-2"
      />
      <textarea
        placeholder="Comments"
        value={editedReview.comments}
        onChange={(e) =>
          setEditedReview({ ...editedReview, comments: e.target.value })
        }
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        disabled={saveDisabled}
      >
        Save
      </button>
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
        onClick={cancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditReview;
