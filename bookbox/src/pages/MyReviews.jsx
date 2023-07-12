import { useContext, useEffect, useState } from "react";
import { getLists } from "../utility";
import List from "../components/List";
import CreateListForm from "../components/CreateListForm";
import { useUserContext } from "../context/UserContext";
import Review from "../components/Review";

const MyReviews = () => {
  const { reviews, handleGetReviews } = useUserContext();
  useEffect(() => {
    handleGetReviews();
  }, []);
  return (
    <div className="mx-10 my-5 flex flex-col lg:flex-row">
      <div className="w-full md:w-[50%]  ">
        <h2 className="text-white">My Reviews</h2>
        <div className="flex flex-col flex-wrap gap-x-5">
          {reviews &&
            reviews.map((review, index) => {
              return <Review key={index} review={review} />;
            })}
          {(!reviews || reviews.length < 1) && (
            <span className="text-gray-400 mt-4">
              You have written no reviews
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
