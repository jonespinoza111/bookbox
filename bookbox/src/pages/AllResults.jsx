import { useEffect } from "react";
import Results from "../components/Results";
import { useFetchContext } from "../context/fetchContext";
import { fetchBooks } from "../utility";
import { useLocation } from "react-router";

const AllResults = () => {
  const {
    state: { title, link, fullLink },
  } = useLocation();
  const { results, isLoading, resetResults, handleFetch } = useFetchContext();

  useEffect(() => {
    const fetchAll = () => {
      resetResults();
      handleFetch(fetchBooks, link, 1, fullLink);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    return () => {
      resetResults();
    };
  }, []);

  const handleLoadMore = async (page) => {
    handleFetch(fetchBooks, link, page + 1, fullLink);
  };

  return (
    <div className="flex flex-col my-10">
      <Results
        results={results}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        title={title}
      />
    </div>
  );
};

export default AllResults;
