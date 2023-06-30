import { createContext, useState, useContext, useCallback } from 'react';

const FetchContext = createContext();

const FetchProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async (fetchFunction, ...args) => {
    console.log('starting to fetch you');
    setIsLoading(true);
    const data = await fetchFunction(...args);
    setResults((prevResults) =>  {
        let prevIds = prevResults && prevResults.map(item => item.id);
        const uniqueData = prevResults ? data.filter((item) => !prevIds.includes(item.id)) : data;
        return prevResults ? [...prevResults, ...uniqueData] : [...uniqueData];
    });
    setIsLoading(false);
  };

  const resetResults = () => {
    console.log('the results are being reset now');
    setResults(null);
    setIsLoading(false);
  }

  return (
    <FetchContext.Provider value={{ results, isLoading, resetResults, handleFetch }}>
      {children}
    </FetchContext.Provider>
  );
};

const useFetchContext = () => useContext(FetchContext);

export { FetchProvider, useFetchContext };