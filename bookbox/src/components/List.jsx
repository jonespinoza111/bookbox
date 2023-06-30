import { useNavigate } from "react-router-dom";
import { deleteList } from "../utility";
import Book from "./Book";
import BookThumbnail from "./BookThumbnail";

const List = ({ list, updateLists }) => {
    const navigate = useNavigate();
    const onViewAll = () => {
        navigate(`/list/${list.id}`, { state: { listData: list }});
    }
   const onDelete = async () => {
    console.log('Deleting the list now');
    deleteList(list.id, updateLists);
   };
  return (
    <div key={list.id} className='flex justify-center items-start w-[37em] pt-2 flex-col my-5 bg-transparent border-t-[1px] border-gray-600 px-5 cursor-pointer' onClick={onViewAll}>
        <div className="flex flex-row justify-between w-full">
            <h3 className='text-white'>{list.name}</h3>
            <span className="text-white">{list.books.length} books</span>
        </div>
        <div className='books-container flex flex-row justify-start items-center flex-wrap gap-y-3 gap-x-4 my-4 w-[100%]'>
            {list.books && list.books.slice(0, 5).map(book => (
            <BookThumbnail key={book.bookId} thumbnail={book.thumbnail} size="small" />
            ))}
            {list.books && list.books.length < 1 && (
                <div className="w-[100%] flex justify-start items-center">
                    <p className="text-white">This list is very empty!</p>
                </div>
            )}
            <div className="buttons-container">
                <button className="bg-white text-black px-4 py-2 mr-2 hover:bg-gray-200 rounded-md mt-2" onClick={onViewAll}>View All</button>
                <button className="bg-white text-black px-4 py-2 hover:bg-gray-200 rounded-md mt-2 mr-2" onClick={onDelete}>Delete List</button>
            </div>
        </div>
    </div>
  )
}

export default List;
