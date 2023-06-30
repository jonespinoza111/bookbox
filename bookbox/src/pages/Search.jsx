import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar';
import { handleSearch } from '../utility';
import Results from '../components/Results';
import { useFetchContext } from '../context/fetchContext';

const Search = () => {
    const [query, setQuery] = useState('');

    const { results, isLoading, resetResults, handleFetch } = useFetchContext()

    useEffect(() => {
      resetResults();

      return () => {
        resetResults()
      }
    }, [])
    
    const onHandleSearch = async (event) => {
      if (event) {
        event.preventDefault();
      }
      handleFetch(handleSearch, query);
    };

    const onHandleSearchMore = async (page) => {
      handleFetch(handleSearch, query, page);
    };
    console.log('all the results', results);

  return (
    <div>
      <SearchBar setQuery={setQuery} query={query} onHandleSearch={onHandleSearch} />
      <Results results={results} onLoadMore={onHandleSearchMore} isLoading={isLoading} title={`Search Results: `} search={true} />
    </div>
  )
}

export default Search
