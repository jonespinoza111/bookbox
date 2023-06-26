
import { Auth, DataStore } from "aws-amplify";
import { Book, List, Review } from '../models';

export const Category = {
  FICTION: "Fiction",
  NONFICTION: "Nonfiction",
  MYSTERY: "Mystery",
  ROMANCE: "Romance",
  SCIFI: "Science Fiction",
  FANTASY: "Fantasy"
}

export async function fetchBookData(id) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU`);
    const data = await response.json();
    console.log('here here data ', data);
    const bookData = {
      bookId: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      description: data.volumeInfo.description,
      categories: data.volumeInfo.categories?.map(category => Category[category.toUpperCase()]),
      thumbnail: data.volumeInfo.imageLinks?.thumbnail,
    };
    // const query = await DataStore.query(Book);
    const book = await DataStore.save(new Book(bookData));
    console.log('hih hi');
    return book;
}

export async function createList(name, cb) {
  const user = await Auth.currentAuthenticatedUser();
  const newList = await DataStore.save(new List({
    name,
    userId: user.attributes.sub,
    books: []
  }));
  cb();
  return newList;
}

export async function getLists() {
  const user = await Auth.currentAuthenticatedUser();
  const lists = await DataStore.query(List, (list) => list.userId.eq(user.attributes.sub));

  let outputLists = await Promise.all(lists.map(async (list) => {
    let books = await list.books.toArray();
    let newList = { ...list, books };
    console.log('ultra list ', newList);
    return newList;
  }))

  console.log('what an output list ', outputLists)
  return outputLists;
}

export async function addBookToList(listId, bookInfo) {
  return await DataStore.save(new Book({ ...bookInfo, listBooksId: listId }));
}

export async function deleteList(listId, cb) {
  const listToDelete = await DataStore.query(List, listId);
  DataStore.delete(listToDelete);
  cb();
}

export async function createReview(reviewInfo) {
  const user = await Auth.currentAuthenticatedUser();

  await DataStore.save(new Review({
    author: user.attributes.sub,
    ...reviewInfo
  }))
}

export async function getReviews(bookId) {
  const reviews = await DataStore.query(Review, (review) => review.bookId.eq(bookId));
  console.log('my reviews ', reviews);
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function handleSearch(query, page = 1) {
  console.log('query dog ', query);
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${(page - 1) * 10}&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU`);
  const data = await response.json();
  console.log('how about these books today ..', data);

  const books = data.items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] || 'Unknown',
    thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image',
  }));

  console.log('how about these books today ..', books);
  return books;
}

export const getHomeBooksToDisplay = async () => {
  const genrePath = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU';
  const relevancePath = 'https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU';
  const newestPath = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU';

  const fetchGenreBooks = fetch(genrePath).then(response => response.json());
  const fetchRelevanceBooks = fetch(relevancePath).then(response => response.json());
  const fetchNewBooks = fetch(newestPath).then(response => response.json());

  return await Promise.all([fetchGenreBooks, fetchRelevanceBooks, fetchNewBooks])
  .then(([genreBooks, relevanceBooks, newBooks]) => {
    // Combine the results and process them
    const combinedBooks = {
      genreBooks: genreBooks.items,
      relevanceBooks: relevanceBooks.items,
      newBooks: newBooks.items
    };

    console.log('these are the combined outputs of boooks', combinedBooks);
    return combinedBooks;

  })
  .catch(error => {
    console.error('Error:', error);
  });
}
