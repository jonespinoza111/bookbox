import { useEffect } from "react";
import List from "../components/List";
import CreateListForm from "../components/CreateListForm";
import { useUserContext } from "../context/UserContext";

const MyLists = () => {
  const { lists, handleGetLists } = useUserContext();
  useEffect(() => {
    handleGetLists();
  }, []);
  return (
    <div className="mx-10 my-5 flex flex-col lg:flex-row">
      <div className="">
        <h2 className="text-white">My Lists</h2>
        <div className="flex flex-col flex-wrap gap-x-5">
          {lists &&
            lists.map((list) => {
              return (
                <List key={list.id} list={list} updateLists={handleGetLists} />
              );
            })}
          {(!lists || lists.length < 1) && (
            <span className="text-gray-400 mt-4">
              No lists. Create one now!
            </span>
          )}
        </div>
      </div>
      <CreateListForm updateLists={handleGetLists} />
    </div>
  );
};

export default MyLists;
