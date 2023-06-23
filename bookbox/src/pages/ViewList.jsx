import { useLocation } from "react-router-dom"
import Book from "../components/Book"


const ViewList = () => {
    const location = useLocation();
    const list = location.state.listData;

    console.log('make a list ', list);
    return (
      <div className='flex justify-center items-start w-[100%] pt-2 flex-col mx-10 my-5 bg-black border- border-white px-5'>
        <h3 className='text-white'>{list.name}</h3>
        <div className='books-container flex flex-row justify-start items-center flex-wrap gap-y-3 gap-x-4 my-4 w-[100%]'>
          {list.books && list.books.map(book => (
            <Book key={book.bookId} id={book.bookId} title={book.title || 'N/A'} author={book.authors || 'N/A'} thumbnail={book.thumbnail || 'N/A'} />
          ))}
          {list.books && list.books.length < 1 && (
            <div className="w-[100%] flex justify-start items-center">
              <p className="text-white">This list is very empty!</p>
            </div>
          )}
        </div>
      </div>
    )
}

export default ViewList
