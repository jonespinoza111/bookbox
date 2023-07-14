import { createContext, useState, useContext, useEffect } from "react";
import { getLists, getReviewsFromUserId } from "../utility";
import { Auth } from "aws-amplify";

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
        setUserInfo(user);
      } catch (error) {
        console.log("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleGetLists = async () => {
    setIsLoading(true);
    let listData = await getLists();
    setLists([...listData]);
    setIsLoading(false);
  };

  const handleGetReviews = async () => {
    if (userInfo) {
      setIsLoading(true);
      let reviewData = await getReviewsFromUserId(userInfo.attributes.sub);
      setReviews([...reviewData]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetLists();
  }, []);

  useEffect(() => {
    if (userInfo) {
      handleGetReviews();
    }
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        lists,
        reviews,
        isLoading,
        handleGetLists,
        handleGetReviews,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };
