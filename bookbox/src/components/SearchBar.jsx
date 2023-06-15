import { useState } from 'react'

const SearchBar = ({ setQuery, query, onHandleSearch }) => {

  return (
    <form onSubmit={onHandleSearch} className='mx-[5em] my-[2em]'>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-2 mt-[1em]"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar;
