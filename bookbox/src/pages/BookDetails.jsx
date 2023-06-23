import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { addBookToList, getLists } from "../utility";


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const data = await response.json();
      const bookData = {
        id: data.id,
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors?.[0] || 'Unknown',
        description: data.volumeInfo.description || 'No description available.',
        thumbnail: data.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image',
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
        thumbnail: book.thumbnail,
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
            <img src={book.thumbnail} alt={book.title} className="w-full md:w-1/3 rounded-md shadow-md" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Author:</span> {book.author}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Publisher:</span> {book.publisher}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Published Date:</span> {book.publishedDate}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Page Count:</span> {book.pageCount}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Categories:</span> {book.categories.join(', ')}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Language:</span> {book.language}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Average Rating:</span> {book.averageRating}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Ratings Count:</span> {book.ratingsCount}
              </p>
              <p className="text-gray-700 mb-4">{book.description}</p>
              <a href={book.previewLink} target="_blank" rel="noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                Preview Book
              </a>

              {lists.length > 0 && (
                <div className="mt-4">
                  <label htmlFor="lists" className="block font-bold mb-2">
                    Add to List:
                  </label>
                  <select
                    id="lists"
                    className="border border-gray-300 rounded-md p-2 w-full"
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
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2"
                    disabled={!selectedList}
                  >
                    Add to List
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BookDetails
