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
    <div className="mx-10 my-5 flex flex-row">
        <div className=''>
          <h2 className='text-white'>My Lists</h2>
          <div className="flex flex-col flex-wrap gap-x-5">
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
