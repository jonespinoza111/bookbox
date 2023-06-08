import Book from '../components/Book';
import { useEffect, useState } from 'react';
import { fetchBookData, getLists } from '../utility';
import CreateListForm from '../components/CreateListForm';

const Home = () => {
    const [bookData, setBookData] = useState([]);
    const [lists, setLists] = useState([]);

    const start = async () => {
      console.log('helloooooooo')
        let bookData = await fetchBookData('_ojXNuzgHRcC');
        console.log('This is the book data here ', bookData);
        setBookData(prev => [...prev, bookData]); 

        let lists = await getLists();

        setLists(prev => [...prev, ...lists])
    }
    useEffect(() => {   
        start();
    }, []);
  return (
    <div>
        <h2>BookBox</h2>
        <div className='w-[100%] flex flex-wrap flex-row'>
          {bookData.length > 0 && bookData.map(book => (
            <Book key={book.id} title={book.title} author={book.authors[0]} description={book.description} thumbnail={book.thumbnail} />
          ))}
        </div>
        <div className=''>
          <h2 className='text-white'>My Lists</h2>
          <div>
            {lists.length > 0 && lists.map(list => (
              <div key={list.id} className=''>
                <h3 className='text-white'>{list.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <CreateListForm />
    </div>  
  )
}

export default Home;
