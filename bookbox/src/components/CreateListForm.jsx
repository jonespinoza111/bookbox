import { useState } from 'react'
import { createList } from '../utility';

const CreateListForm = () => {
    const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('creating the new list');
    createList(name);
    setName('');
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 my-10 max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter list name"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create List
        </button>
      </div>
    </form>
  )
}

export default CreateListForm;
