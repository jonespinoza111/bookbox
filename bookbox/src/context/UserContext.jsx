import { createContext, useState, useContext, useEffect } from 'react';
import { getLists } from '../utility';

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [lists, setLists] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
  
    const handleGetLists = async () => {
        setIsLoading(true);
        let listData = await getLists();
        console.log('new list data ', listData);
        setLists([...listData])
        setIsLoading(false);
    }

    useEffect(() => {   
        handleGetLists();
    }, []);
  
    return (
      <UserContext.Provider value={{ lists, isLoading, handleGetLists }}>
        {children}
      </UserContext.Provider>
    );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };

