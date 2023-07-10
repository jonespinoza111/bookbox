import { FaTrashAlt } from "react-icons/fa";
import Rating from "react-rating";
import { useUserContext } from "../context/UserContext";
import { deleteReview, fetchBookData } from "../utility";
import { openToastifyMessage } from "./ToastifyMessage";
import { useEffect, useState } from "react";
import BookThumbnail from "./BookThumbnail";
import { useLocation } from "react-router";
import EditReview from "./EditReview";

const Review = ({ review }) => {
    const timestamp = new Date(review.updatedAt || review.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    const location = useLocation();
    const needsThumbnail = location.pathname === '/reviews';

    const { handleGetReviews, userInfo } = useUserContext()

    const [bookInfo, setBookInfo] = useState();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
      console.log('deleting the review now!')
      const deletedReview = await deleteReview(review.id, handleGetReviews)
      if (deletedReview.success) {
        openToastifyMessage("success", deletedReview.message);
      } else if (!deletedReview.success) {
        openToastifyMessage("error", deletedReview.error);
      }
    };

    useEffect(() => {
      const fetchBook = async () => {
        const reviewBook = await fetchBookData(review.bookId);
        console.log('myBook myBook: ', reviewBook);
        setBookInfo(reviewBook);
      };
      fetchBook();
    }, [review.bookId]);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
    }
  
    if (isEditing) {
      return <EditReview review={review} cancel={handleCancel} />;
    }
  
  

    console.log('the godly review', review);
    return (
      <div className={`bg-white p-4 rounded shadow my-4 relative ${needsThumbnail && 'flex md:flex-row flex-col'}`}>
        <div className="mr-4 mb-4 md:mb-0">
          {bookInfo && needsThumbnail && (
            <BookThumbnail key={bookInfo.bookId} title={bookInfo.title} thumbnail={bookInfo.smallThumbnail} size="small" />
          )}
        </div>
        <div>
          <h3 className="text-md sm:text-lg text-gray-500 mb-2">{review.username}</h3>
          <h3 className="text-md sm:text-lg font-semibold mb-2">{review.title}</h3>
          <Rating
            placeholder="Rating (1-5)"
            emptySymbol={<span className="rating-icon">&#9734;</span>}
            fullSymbol={<span className="rating-icon">&#9733;</span>}
            initialRating={review.rating}
            fractions={2}
            className="text-[1.6em] sm:text-[2em] mb-2"
            readonly
          />
          <p className="mb-2">{review.content}</p>
          <p className="text-gray-500 text-sm">
            {timestamp} 
            <span className="ml-2 text-grey-100">
              {review.updatedAt && `Edited`}
            </span>
          </p>
          {userInfo && userInfo.attributes.sub === review.author && (
            <button
              className="absolute top-0 right-0 p-4 cursor-pointer hover:bg-gray-400 text-black"
              onClick={handleDelete}
            >
              <FaTrashAlt />
            </button>
          )}
          {userInfo && userInfo.attributes.sub === review.author && (
            <button className="absolute bottom-0 right-0 p-4 cursor-pointer hover:bg-gray-400 text-black" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    );
};    

export default Review;