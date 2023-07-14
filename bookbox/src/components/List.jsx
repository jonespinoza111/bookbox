import { useNavigate } from "react-router-dom";
import { deleteList } from "../utility";
import BookThumbnail from "./BookThumbnail";
import { openToastifyMessage } from "./ToastifyMessage";

const List = ({ list, updateLists }) => {
  const navigate = useNavigate();
  const onViewAll = () => {
    navigate(`/list/${list.id}`, { state: { listData: list } });
  };
  const onDelete = async () => {
    const deletedList = await deleteList(list.id, updateLists);
    if (deletedList.success) {
      openToastifyMessage("success", deletedList.message);
    } else if (!deletedList.success) {
      openToastifyMessage("error", deletedList.error);
    }
  };
  return (
    <div
      key={list.id}
      className="flex justify-center items-start w-full md:w-[37em] pt-2 flex-col my-5 bg-transparent border-t-[1px] border-gray-600 md:px-5"
    >
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-white">{list.name}</h3>
        <span className="text-white">{list.books.items.length} {list.books.items.length === 1 ? 'book' : 'books'}</span>
      </div>
      <div className="flex flex-row justify-between w-full mt-4">
        <span className="text-gray-400">{list.description}</span>
      </div>
      <div
        className="books-container flex flex-row justify-start items-center flex-wrap gap-y-3 gap-x-4 my-4 w-[100%] cursor-pointer"
        onClick={onViewAll}
      >
        {list.books.items &&
          list.books.items
            .slice(0, 5)
            .map((book) => (
              <BookThumbnail
                key={book.bookId}
                title={book.title}
                thumbnail={book.thumbnail}
                size="small"
              />
            ))}
        {list.books.items && list.books.items.length < 1 && (
          <div className="w-[100%] flex justify-start items-center">
            <p className="text-white">This list is very empty!</p>
          </div>
        )}
      </div>
      <div className="buttons-container">
        <button
          className="bg-white text-black px-4 py-2 mr-2 hover:bg-gray-200 rounded-md mt-2 disabled:bg-gray-400"
          onClick={onViewAll}
          disabled={list.books.items && list.books.items.length < 1}
        >
          View All
        </button>
        <button
          className="bg-white text-black px-4 py-2 hover:bg-gray-200 rounded-md mt-2 mr-2"
          onClick={onDelete}
        >
          Delete List
        </button>
      </div>
    </div>
  );
};

export default List;
