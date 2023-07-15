import { useNavigate, useParams } from "react-router-dom";
import Book from "../components/Book";
import { useState } from "react";
import { removeBookFromList } from "../utility";
import { useUserContext } from "../context/UserContext";
import { openToastifyMessage } from "../components/ToastifyMessage";

const ViewList = () => {
  const { id } = useParams();
  const { lists, handleGetLists } = useUserContext();

  const navigate = useNavigate();

  const list = lists && lists.find((l) => l.id === id);

  const [editMode, setEditMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleEditList = () => {
    setEditMode((prev) => !prev);
  };

  const handleBookSelection = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleRemoveFromList = async () => {
    const removedBooks = await removeBookFromList(
      list.id,
      selectedBooks
    );

    if (removedBooks.success) {
      openToastifyMessage("success", removedBooks.message);
      setTimeout(handleGetLists, 1000);
    } else if (!removedBooks.success) {
      openToastifyMessage("error", removedBooks.error);
    }

    setSelectedBooks([]);
    setEditMode(false);
  };

  return (
    <div className="flex justify-center items-start w-full pt-2 flex-col md:mx-10 my-5 bg-black border- border-white  pl-10 md:px-5">
      <h3 className="text-white">{list && list.name}</h3>
      <div className="books-container flex flex-row justify-start items-center flex-wrap gap-y-3 gap-x-4 my-4 w-[100%]">
        {list &&
          list.books.items &&
          list.books.items.map((book) => (
            <div key={book.bookId} className="flex flex-col">
              <Book
                id={book.bookId}
                title={book.title || "N/A"}
                author={book.authors || "N/A"}
                thumbnail={book.thumbnail || "N/A"}
              />
              {editMode && (
                <input
                  className="mt-4 h-5 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  type="checkbox"
                  checked={selectedBooks.includes(book.bookId)}
                  onChange={() => handleBookSelection(book.bookId)}
                />
              )}
            </div>
          ))}
        {list && list.books.items && list.books.items.length < 1 && (
          <div className="w-[100%] flex justify-start items-center">
            <p className="text-white">This list is very empty!</p>
          </div>
        )}
      </div>
      <div className="buttons-container flex flex-row">
        {editMode && (
          <div className="text-white">
            <button
              className="bg-white text-black px-4 py-2 mr-2 hover:bg-gray-200 rounded-md mt-2"
              onClick={handleRemoveFromList}
            >
              Remove from list
            </button>
          </div>
        )}
        <div className="text-white">
          <button
            className="bg-white text-black px-4 py-2 mr-2 hover:bg-gray-200 rounded-md mt-2"
            onClick={handleEditList}
          >
            {editMode ? "Cancel" : "Edit List"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewList;
