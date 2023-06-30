import { useCallback, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { addBookToList, getLists, getReviews } from "../utility";
import ReviewForm from "../components/ReviewForm";
import Review from "../components/Review";
import BookDescription from "../components/BookDescription";


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      console.log('data data ', data);
      const bookData = {
        id: data.id,
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors?.[0] || 'Unknown',
        description: data.volumeInfo.description || 'No description available.',
        smallThumbnail: data.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image',
        mediumThumbnail: data.volumeInfo.imageLinks?.medium || 'https://via.placeholder.com/128x192.png?text=No+Image',
        pageCount: data.volumeInfo.pageCount || 'Unknown',
        publisher: data.volumeInfo.publisher || 'Unknown',
        publishedDate: data.volumeInfo.publishedDate || 'Unknown',
        categories: data.volumeInfo.categories || [],
        language: data.volumeInfo.language || 'Unknown',
        averageRating: data.volumeInfo.averageRating || 'Unknown',
        ratingsCount: data.volumeInfo.ratingsCount || 'Unknown',
        previewLink: data.volumeInfo.previewLink || '',
      };
      setBook(bookData);
      setIsLoading(false);
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchLists = async () => {
      let listData = await getLists();
      setLists([...listData]);
    };
    fetchLists();
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
        bookId: book.id,
        title: book.title,
        authors: [book.author],
        description: book.description,
        categories: book.categories,
        thumbnail: book.smallThumbnail,
      };
      await addBookToList(selectedList, bookData);
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
            <img src={book.mediumThumbnail || book.smallThumbnail} alt={book.title} className="w-full md:w-[310px] rounded-md shadow-md h-[465px] object-cover" />
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

          {lists.length > 0 && (
                <div className="mt-4">
                  <label htmlFor="lists" className="block font-bold mb-2 text-white">
                    Add to List:
                  </label>
                  <div className="flex flex-col">

                    <select
                      id="lists"
                      className="border border-gray-300 rounded-md p-2 w-[25%]"
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
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 w-[25%]"
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
