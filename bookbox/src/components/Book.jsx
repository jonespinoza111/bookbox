import { useNavigate } from "react-router";

const Book = ({ id, title, author, thumbnail, size = "medium" }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-white ${
        size == "medium" && "w-[8em] h-[16em]"
      } rounded-lg shadow-md ${
        size == "small" && "w-[6em] h-[10em]"
      } cursor-pointer`}
      title="See Details"
      onClick={() => navigate(`/book/${id}`)}
    >
      <div
        className={`w-[100%] ${size == "medium" && "h-[12em]"} ${
          size == "small" && "h-[7.5em]"
        }`}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-[100%] h-[100%] object-fill rounded-t-lg mx-auto mb-4"
        />
      </div>
      <div className="px-2">
        <h2
          className="text-md font-medium text-gray-800 truncate"
          title={title}
        >
          {title}
        </h2>
        <p className="text-xs text-gray-600 mb-2 truncate" title={author}>
          {author}
        </p>
      </div>
    </div>
  );
};

export default Book;
