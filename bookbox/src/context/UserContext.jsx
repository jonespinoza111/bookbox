import { createContext, useState, useContext, useEffect } from 'react';
import { getLists, getReviewsFromUserId } from '../utility';
import { Auth } from 'aws-amplify';

const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    const [lists, setLists] = useState(null);
    const [reviews, setReviews] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          console.log('our lord and user ', user);
          setUserInfo(user);
        } catch (error) {
          console.log('Error fetching user information:', error);
        }
      };
    
      fetchUserInfo();
    }, []);
  
  
    const handleGetLists = async () => {
        setIsLoading(true);
        let listData = await getLists();
        console.log('new list data ', listData);
        setLists([...listData])
        setIsLoading(false);
    }

    const handleGetReviews = async () => {
      console.log('userInfo here, ', userInfo)
      setIsLoading(true);
      let reviewData = await getReviewsFromUserId(userInfo.attributes.sub);
      console.log('new list data ', reviewData);
      setReviews([...reviewData])
      setIsLoading(false);
    }

    useEffect(() => {   
        handleGetLists();
        // handleGetReviews();
    }, []);

    useEffect(() => { 
      if (userInfo) {
        handleGetReviews();
      }  
  }, [userInfo]);
  
    return (
      <UserContext.Provider value={{ userInfo, lists, reviews, isLoading, handleGetLists, handleGetReviews }}>
        {children}
      </UserContext.Provider>
    );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };

