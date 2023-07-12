import { useEffect, useState } from "react";
import { getCategoryBooks } from "../utility";
import { useParams } from "react-router";
import Book from "../components/Book";
import { FaSpinner } from "react-icons/fa";
import Results from "../components/Results";
import { useFetchContext } from "../context/fetchContext";

const CategoryResults = () => {
  const category = useParams();
  const { results, isLoading, resetResults, handleFetch } = useFetchContext();

  useEffect(() => {
    const fetchCategoryBooks = () => {
      resetResults();
      handleFetch(getCategoryBooks, category.category);
    };
    if (category && category.category) {
      fetchCategoryBooks();
    }
  }, []);

  useEffect(() => {
    return () => {
      resetResults();
    };
  }, []);

  const handleLoadMore = async (page) => {
    handleFetch(getCategoryBooks, category.category, page + 1);
  };
  return (
    <div className="flex flex-col my-10">
      <Results
        results={results}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        title={category.category}
      />
    </div>
  );
};

export default CategoryResults;
