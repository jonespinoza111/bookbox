import { useState } from 'react'
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { handleSearch } from '../utility';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const onHandleSearch = async (event) => {
      if (event) {
        event.preventDefault();
      }
        setIsLoading(true);
        const books = await handleSearch(query);
        setResults([...books]);
        setIsLoading(false);
    };

    const onHandleSearchMore = async (event, page) => {
      if (event) {
        event.preventDefault(); 
      }
      setIsLoading(true);
      const books = await handleSearch(query, page);
      
      console.log('books already here ', results);
      console.log('books Im going to add ', books);
      setResults((prevResults) => [...prevResults, ...books]);
      setIsLoading(false);
    }

    console.log('all the results', results);

  return (
    <div>
      <SearchBar setQuery={setQuery} query={query} onHandleSearch={onHandleSearch} />
      <SearchResults results={results} onLoadMore={(e, page) => onHandleSearchMore(e,  page)} isLoading={isLoading} />
    </div>
  )
}

export default Search
