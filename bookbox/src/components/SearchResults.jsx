import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ results, onLoadMore, isLoading }) => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const handleLoadMore = () => {
    setPage(page + 1);
    onLoadMore(null, page + 1);
  };
  return (
    <div className="flex flex-row flex-wrap px-[5em] gap-x-3 gap-y-4">
      {results &&
        results.map((result) => (
          <div
            key={result.id}
            className="h-[240px] w-[160px] rounded-md cursor-pointer relative"
            title="view details"
            onClick={() => navigate(`/book/${result.id}`)}
          >
            <img
              src={result.thumbnail}
              alt={result.title}
              className="w-full h-full"
            />
            {/* <div className="bg-transparent hover:bg-slate-200 absolute w-[100%] h-[100%] opacity-0 hover:opacity-100 flex top-0 justify-center items-center">
            <h4 className="">See More</h4>
          </div> */}
          </div>
        ))}
      {isLoading && (
        <div className="flex justify-center items-center col-span-3">
          <FaSpinner className="animate-spin mr-2" />
          Loading...
        </div>
      )}
      {!isLoading && results.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md col-span-3"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchResults;
