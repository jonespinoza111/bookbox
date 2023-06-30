import Book from '../components/Book';
import { useEffect, useState } from 'react';
import { getHomeBooksToDisplay } from '../utility';
import Category from '../components/Category';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToastifyMessage from '../components/ToastifyMessage';


const bookCategories = [
  "Arts & Photography",
  "Biographies & Memoirs",
  "Business & Economics",
  "Computers & Technology",
  "Cookbooks, Food & Wine",
  "Health & Fitness",
  "History",
  "Mystery, Thriller & Suspense",
  "Science Fiction & Fantasy",
  "Self-Help",
  "Travel"
];

const homeImages = [
  {
    author: 'J.K Rowling',
    title: 'The Harry Potter Collection',
    searchParam: '',
    imageLink: 'https://prodimage.images-bn.com/pimages/9780545162074_p2_v1_s600x595.jpg',
  },
  {
    author: 'J.R.R. Tolkein',
    title: 'The Lord of the Rings Trilogy',
    searchParam: '',
    imageLink: 'data:image/jpeg;base64,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',
  },
  {
    author: 'George R.R. Martin',
    title: 'The Game of Thrones Set',
    searchParam: 'The Game of Thrones Set',
    imageLink: 'data:image/jpeg;base64,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'
  },
]

const Home = () => {
    const [fictionBooks, setFictionBooks] = useState(null);
    const [popularBooks, setPopularBooks] = useState(null);
    const [newBooks, setNewBooks] = useState(null);
    const [heroImages, setHeroImages] = useState(null);

    const getHomeBooks = async () => {
      const homeBooks = await getHomeBooksToDisplay();
      console.log('what I got back from homebooks ', homeBooks);
      setFictionBooks(homeBooks.genreBooks);
      setPopularBooks(homeBooks.relevanceBooks);
      setNewBooks(homeBooks.newBooks);

      let newHeroImages = homeBooks.relevanceBooks.map(book => {
        return book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''
      });
      setHeroImages(newHeroImages);
    }
    useEffect(() => {  
      getHomeBooks();
    }, []);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  

  return (
    <div className='w-full h-auto page'>
        <div>
        <Slider {...settings}>
          {homeImages.map((image, index) => (
            <div key={index} className='w-full h-[100%] md:h-[20em] bg-white'>
              <div className='w-[100%] h-[15em] md:h-[100%] flex flex-row'>
                <div className='w-[55%] flex flex-col justify-center px-10'>
                  <h3 className='text-[1.5em] font-semibold md:text-[3em]'>{image.title}</h3>
                  <h2 className='text-black text-[1em] md:text-[2em]'>{image.author}</h2>
                </div>
                <div className='w-[45%] bg-white'>
                  <img src={image.imageLink} className='w-[100%] h-[100%] object-contain' alt={`Book ${index + 1}`} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
        </div>
        <div className='flex flex-col items-start my-5 flex-1'>
          <div className='flex flex-row justify-between w-[100%] mb-5'>
            <h2 className="text-white">Popular Books</h2>
            <Link>
              <span className='underline text-white capitalize'>See All</span>
            </Link>
          </div>
          <div className='flex flex-row no-wrap gap-x-3 pb-3 overflow-x-scroll md:overflow-x-auto w-full'>
            {popularBooks ? popularBooks.map(book => (
              <Book key={book.id} id={book.id} title={book.volumeInfo.title || 'N/A'} author={book.volumeInfo.authors && book.volumeInfo.authors[0] || 'N/A'} thumbnail={book.volumeInfo.imageLinks.thumbnail || 'N/A'} />
            )) : (
              <div className="flex justify-center items-center col-span-3 text-white">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-row justify-between w-[100%] mb-5'>
          <h2 className="text-white">Categories</h2>
          <Link>
            <span className='underline text-white capitalize'>See All</span>
          </Link>
        </div>
        <div className='flex flex-row no-wrap gap-x-3 pb-3 w-full overflow-x-auto md:mr-5'>
          {bookCategories.map(category => (
            <Category key={category.id} name={category} />
          ))}
        </div>

        <div className='flex flex-col items-start my-5 flex-1'>
          <div className='flex flex-row justify-between w-[100%] mb-5'>
            <h2 className="text-white">Fiction Books</h2>
            <Link>
              <span className='underline text-white capitalize'>See All</span>
            </Link>
          </div>
          <div className='flex flex-row no-wrap gap-x-3 pb-3 w-full overflow-x-scroll md:overflow-x-auto'>
            {fictionBooks ? fictionBooks.map(book => (
              <Book key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors[0]} thumbnail={book.volumeInfo.imageLinks.thumbnail} />
            )) : (
              <div className="flex justify-center items-center col-span-3 text-white">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col items-start my-5 flex-1'>
          <div className='flex flex-row justify-between w-[100%] mb-5'>
            <h2 className="text-white">New Books</h2>
            <Link>
              <span className='underline text-white capitalize'>See All</span>
            </Link>
          </div>
          <div className='flex flex-row no-wrap gap-x-3 pb-3 w-full overflow-x-scroll md:overflow-x-auto'>
            {newBooks ? newBooks.map(book => (
              <Book key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors[0]} thumbnail={book.volumeInfo.imageLinks.thumbnail} />
            )) : (
              <div className="flex justify-center items-center col-span-3 text-white">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            )}
          </div>
        </div>
    </div>  
  )
}

export default Home;
