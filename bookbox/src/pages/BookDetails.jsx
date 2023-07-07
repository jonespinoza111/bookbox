import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { addBookToList, fetchBookData, getLists, getReviews } from "../utility";
import ReviewForm from "../components/ReviewForm";
import Review from "../components/Review";
import BookDescription from "../components/BookDescription";
import { openToastifyMessage } from "../components/ToastifyMessage";
import { useUserContext } from "../context/UserContext";


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const { lists, handleGetLists } = useUserContext();

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const myBook = await fetchBookData(id);
      setIsLoading(true);

      console.log('myBook myBook: ', myBook);
      // const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      // const data = await response.json();
      // console.log('data data ', data);
      
      setBook(myBook);
      setIsLoading(false);
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    handleGetLists();
  }, []);

  const fetchReviews = useCallback(async () => {
    let reviewData = await getReviews(id);
    console.log('all this reviewData, ', reviewData);
    setReviews([...reviewData]);
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);


  const handleAddToList = async () => {
    if (selectedList) {

      console.log('trying to add to list', selectedList);
      console.log('tttt id ', book.id);
      const bookData = {
        bookId: book.bookId,
        title: book.title,
        authors: [book.author],
        description: book.description,
        categories: book.categories,
        thumbnail: book.smallThumbnail,
      };
      const addedBook = await addBookToList(selectedList, bookData);

      if (addedBook.success) {
        openToastifyMessage("success", addedBook.message);
        handleGetLists();
    } else if (!addedBook.success) {
        openToastifyMessage("error", addedBook.error);
    }
      setSelectedList(null);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin mr-2" />
          Loading...
        </div>
      )}
      {!isLoading && book && (
        <>
          <div className="flex flex-col md:flex-row gap-8">
            <img src={book.mediumThumbnail} alt={book.title} className="w-[200px] md:w-[225px] h-auto md:h-[375px] object-fit rounded-md shadow-md" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 text-white">{book.title}</h1>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Author:</span> {book.author}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Publisher:</span> {book.publisher}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Published Date:</span> {book.publishedDate}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Page Count:</span> {book.pageCount}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Categories:</span> {book.categories.join(', ')}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Language:</span> {book.language}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold text-white">Average Rating:</span> {book.averageRating}
              </p>
              <p className="text-gray-400 mb-6">
                <span className="font-bold text-white">Ratings Count:</span> {book.ratingsCount}
              </p>
              <a href={book.previewLink} target="_blank" rel="noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                Preview Book
              </a>
            </div>
          </div>
          <div className="w-full my-10">
            <BookDescription description={book.description} />
          </div>
          <div className="w-full my-10">

          {lists && (
                <div className="mt-4">
                  <label htmlFor="lists" className="block font-bold mb-2 text-white">
                    Add to List:
                  </label>
                  <div className="flex flex-col w-full">

                    <select
                      id="lists"
                      className="border border-gray-300 rounded-md p-2 w-full md:w-[25%] md:min-w-[15em]"
                      value={selectedList || ''}
                      onChange={(e) => setSelectedList(e.target.value)}
                    >
                      <option value="">Select a list</option>
                      {lists.map((list) => (
                        <option key={list.id} value={list.id}>
                          {list.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddToList}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 w-full md:w-[25%] md:min-w-[15em]"
                      disabled={!selectedList}
                    >
                      Add to List
                    </button>
                  </div>
                </div>
              )}
          </div>
              <ReviewForm bookId={id} fetchReviews={fetchReviews} />
              <div className="reviews flex flex-col bg-white">
                {reviews && reviews.map((review) => (
                  <Review key={review.id} review={review} />
                ))}
              </div>

        </>
      )}
    </div>
  )
}

export default BookDetails
