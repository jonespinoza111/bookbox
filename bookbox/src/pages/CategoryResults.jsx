import { useEffect, useState } from 'react'
import { getCategoryBooks } from '../utility';
import { useParams } from 'react-router';
import Book from '../components/Book';
import { FaSpinner } from 'react-icons/fa';
import Results from '../components/Results';
import { useFetchContext } from '../context/fetchContext';

const CategoryResults = () => {
    const category = useParams();
    const { results, isLoading, resetResults, handleFetch } = useFetchContext();

    useEffect(() => {
        console.log('useeffect effecting');
        const fetchCategoryBooks = () => {
            resetResults();
            handleFetch(getCategoryBooks, category.category);
        };
        if (category && category.category) {
            console.log('fetching category nows');
            fetchCategoryBooks()
        }
    }, []);

    useEffect(() => {
        return () => {
          resetResults()
        }
    }, [])
    

    console.log('this is the category ', category);

    const handleLoadMore = async (page) => {
        console.log('loading more now')
        handleFetch(getCategoryBooks, category.category, page + 1);
    }
  return (
    <div className='flex flex-col my-10'>
        <Results results={results} onLoadMore={handleLoadMore} isLoading={isLoading} title={category.category} />
    </div>
  )
}

export default CategoryResults;
