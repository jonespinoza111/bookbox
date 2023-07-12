import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Book from "./Book";

const Results = ({ results, onLoadMore, isLoading, title, search = false }) => {
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage(page + 1);
    onLoadMore(page + 1);
  };

  return (
    <>
      {results && <h1 className="text-white mx-10 md:mx-20 mb-6">{title}</h1>}
      <div className="flex flex-row flex-wrap px-[2em] md:px-[5em] gap-x-3 gap-y-4">
        {!search &&
          results &&
          results.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.volumeInfo.title || ""}
              author={book.volumeInfo.authors ? book.volumeInfo.authors[0] : ""}
              thumbnail={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : ""
              }
            />
          ))}
        {search &&
          results &&
          results.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title || "N/A"}
              author={book.author}
              thumbnail={book.thumbnail}
            />
          ))}
      </div>
      <br />
      <div className="flex justify-center items-center col-span-3 mx-20">
        {isLoading && (
          <div className="flex justify-center items-center h-[3em] text-white">
            <FaSpinner className="animate-spin mr-2 text-white" />
            Loading...
          </div>
        )}
        {!isLoading && results && results.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md col-span-3 w-full"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Results;
