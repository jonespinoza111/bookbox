import Book from '../components/Book';
import { useEffect, useState } from 'react';
import { getHomeBooksToDisplay, getLists } from '../utility';
import CreateListForm from '../components/CreateListForm';
import List from '../components/List';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';


const Home = () => {
    const [fictionBooks, setFictionBooks] = useState(null);
    const [popularBooks, setPopularBooks] = useState(null);
    const [newBooks, setNewBooks] = useState(null);

    const getHomeBooks = async () => {
      const homeBooks = await getHomeBooksToDisplay();
      console.log('what I got back from homebooks ', homeBooks);
      setFictionBooks(homeBooks.genreBooks);
      setPopularBooks(homeBooks.relevanceBooks);
      setNewBooks(homeBooks.newBooks);
    }
    useEffect(() => {  
      getHomeBooks();
    }, []);

  return (
    <div className='w-[100%]'>
        <h2>BookBox</h2>
        <div className='flex flex-col items-start mx-10 my-5 flex-1'>
          <div className='flex flex-row justify-between w-[100%] mb-5'>
            <h2 className="text-white">Popular Books</h2>
            <Link>
              <span className='underline text-white capitalize'>See All</span>
            </Link>
          </div>
          <div className='flex flex-row no-wrap gap-x-3'>
            {popularBooks ? popularBooks.map(book => (
              <Book key={book.id} id={book.id} title={book.volumeInfo.title || 'N/A'} author={book.volumeInfo.authors && book.volumeInfo.authors[0] || 'N/A'} thumbnail={book.volumeInfo.imageLinks.thumbnail || 'N/A'} />
            )) : (
              <div className="flex justify-center items-center col-span-3 text-white">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col items-start mx-10 my-5 flex-1'>
          <div className='flex flex-row justify-between w-[100%] mb-5'>
            <h2 className="text-white">Fiction Books</h2>
            <Link>
              <span className='underline text-white capitalize'>See All</span>
            </Link>
          </div>
          <div className='flex flex-row no-wrap gap-x-3'>
            {fictionBooks ? fictionBooks.map(book => (
              <Book key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors[0]} thumbnail={book.volumeInfo.imageLinks.thumbnail} />
            )) : (
              <div className="flex justify-center items-center col-span-3 text-white">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col items-start mx-10 my-5 flex-1'>
          <div className='flex flex-row justify-between w-[100%] mb-5'>
            <h2 className="text-white">New Books</h2>
            <Link>
              <span className='underline text-white capitalize'>See All</span>
            </Link>
          </div>
          <div className='flex flex-row no-wrap gap-x-3'>
            {newBooks ? newBooks.map(book => (
              <Book key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors[0]} thumbnail={book.volumeInfo.imageLinks.thumbnail} />
            )) : (
              <div className="flex justify-center items-center col-span-3 text-white">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            )}
          </div>
        </div>
    </div>  
  )
}

export default Home;
