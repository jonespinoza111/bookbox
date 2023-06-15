import Book from '../components/Book';
import { useEffect, useState } from 'react';
import { getLists } from '../utility';
import CreateListForm from '../components/CreateListForm';
import List from '../components/List';


const Home = () => {
    const [lists, setLists] = useState([]);

    const updateLists = async () => {
        let listData = await getLists();
      console.log('new list data ', listData);
        setLists([...listData])
    }
    useEffect(() => {   
      updateLists();
    }, []);

    console.log('lists data here hrererear ', lists);
  return (
    <div>
        <h2>BookBox</h2>
        <div className=''>
          <h2 className='text-white'>My Lists</h2>
          <div>
            {lists.length > 0 && lists.map(list => {
              return (
                <List key={list.id} list={list} updateLists={updateLists} />
              )
            })}
          </div>
        </div>
        <CreateListForm updateLists={updateLists} />
    </div>  
  )
}

export default Home;
