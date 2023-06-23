import { useEffect, useState } from "react";
import { getLists } from "../utility";
import List from "../components/List";
import CreateListForm from "../components/CreateListForm";

const MyLists = () => {
    const [lists, setLists] = useState([]);

    const updateLists = async () => {
        let listData = await getLists();
      console.log('new list data ', listData);
        setLists([...listData])
    }

    useEffect(() => {   
        updateLists();
    }, []);

  return (
    <div>
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

export default MyLists
