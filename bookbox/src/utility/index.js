import { Auth, DataStore, Predicates } from "aws-amplify";
import { Book, List, Review } from "../models";

export const Category = {
  FICTION: "Fiction",
  NONFICTION: "Nonfiction",
  MYSTERY: "Mystery",
  ROMANCE: "Romance",
  SCIFI: "Science Fiction",
  FANTASY: "Fantasy",
};

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const Links = {
  relevance: `https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=10&key=${apiKey}`,
  genre: `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=${apiKey}`,
  newest: `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10&key=${apiKey}`,
}

export async function fetchBookData(id) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
  );

  const data = await response.json();

  const bookData = {
    bookId: data.id,
    title: data.volumeInfo.title,
    author: data.volumeInfo.authors?.[0] || 'Unknown',
    description: data.volumeInfo.description || 'No description available.',
    smallThumbnail: data.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image',
    mediumThumbnail: data.volumeInfo.imageLinks?.medium,
    pageCount: data.volumeInfo.pageCount || 'Unknown',
    publisher: data.volumeInfo.publisher || 'Unknown',
    publishedDate: data.volumeInfo.publishedDate || 'Unknown',
    categories: data.volumeInfo.categories || [],
    language: data.volumeInfo.language || 'Unknown',
    averageRating: data.volumeInfo.averageRating || 'Unknown',
    ratingsCount: data.volumeInfo.ratingsCount || 'Unknown',
    previewLink: data.volumeInfo.previewLink || '',
    listPrice: data.saleInfo.listPrice || 'Unknown',
    buyLink: data.saleInfo.buyLink || ''
  };
  // const query = await DataStore.query(Book);
  // const book = await DataStore.save(new Book(bookData));
  // console.log("hih hi");
  return bookData;
}

export async function createList(name, description, cb) {
  const user = await Auth.currentAuthenticatedUser();
  const newList = await DataStore.save(
    new List({
      name,
      description,
      userId: user.attributes.sub,
      books: [],
    })
  );
  cb();
  return newList
    ? { newList, success: true, message: "List created!" }
    : { success: false, error: "Could not create list." };
}

export async function getLists() {
  const user = await Auth.currentAuthenticatedUser();
  const lists = await DataStore.query(List, (list) =>
    list.userId.eq(user.attributes.sub)
  );

  let outputLists = await Promise.all(
    lists.map(async (list) => {
      let books = await list.books.toArray();
      let newList = { ...list, books };
      console.log("ultra list ", newList);
      return newList;
    })
  );

  console.log("what an output list ", outputLists);
  return outputLists;
}

export async function addBookToList(listId, bookInfo) {
  const existingList = await DataStore.query(List, listId);

  let listBooks = existingList && (await existingList.books.toArray());
  const isBookAlreadyAdded = listBooks.some(
    (book) => book.bookId === bookInfo.bookId
  );

  if (isBookAlreadyAdded) {
    return {
      success: false,
      error: `${bookInfo.title} is already in ${existingList.name}`,
    };
  }

  const bookAdded = await DataStore.save(
    new Book({ ...bookInfo, listBooksId: listId })
  );
  return bookAdded
    ? {
        bookAdded,
        success: true,
        message: `Book added to ${existingList.name}`,
      }
    : { success: false, error: `Could not add book to ${existingList.name}` };
}


export async function removeBookFromList(listId, bookIdsToRemove, cb) {
  console.log('listId:', typeof(listId));
  console.log('bookIdsToRemove:', bookIdsToRemove);

  let booksToRemove = await DataStore.query(Book, (b) => b.listBooksId.eq(listId));
  console.log('books with listID ', booksToRemove);
  booksToRemove = booksToRemove.filter((b) => bookIdsToRemove.includes(b.bookId));
  
  console.log('books to remove: ', booksToRemove);

  const booksDeleted = await Promise.all(
    booksToRemove.map((book) => DataStore.delete(book))
  );


  console.log('books deleted here ', booksDeleted);

  cb();

  return booksDeleted ? {
    booksDeleted,
    success: true,
    message: 'The books have been removed from the list!'
  } : {
    success: false,
    error: 'The books could not be removed'
  }

  
}

export async function deleteList(listId, cb) {
  const listToDelete = await DataStore.query(List, listId);
  const deletedList = await DataStore.delete(listToDelete);
  console.log("this is the deleted list ", deletedList);
  cb();

  return deletedList
    ? { deletedList, success: true, message: "List deleted!" }
    : { success: false, error: "Could not delete list." };
}

export async function createReview(reviewInfo) {
  // const user = await Auth.currentAuthenticatedUser();

  await DataStore.save(
    new Review({
      ...reviewInfo
    })
  );
}

export async function editReview(reviewId, updates) {
  const original = await DataStore.query(Review, reviewId);
  
  const updatedReview = await DataStore.save(
    Review.copyOf(original, updated => {
      updated.title = updates.title;
      updated.rating = updates.rating;
      updated.content = updates.content;
      updated.updatedAt = updates.updatedAt;
    })
  );

  return updatedReview ? { updatedReview, success: true, message: "Review updated!" }
  : { success: false, error: "Could not update the review." };
}

export async function getReviews(bookId) {
  const reviews = await DataStore.query(Review, (review) =>
    review.bookId.eq(bookId)
  );
  console.log("my reviews ", reviews);
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getReviewsFromUserId(userId) {
  const reviews = await DataStore.query(Review, (review) =>
    review.author.eq(userId)
  );
  console.log("my reviews from userID ", reviews);
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteReview(reviewId, cb) {
  const reviewToDelete = await DataStore.query(Review, reviewId);
  const deletedReview = await DataStore.delete(reviewToDelete);
  console.log("this is the deleted review ", deletedReview);
  cb();

  return deletedReview
    ? { deletedReview, success: true, message: "Review deleted!" }
    : { success: false, error: "Could not delete review." };
  
}

export async function handleSearch(query, page = 1) {
  console.log("query dog ", query);
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
      (page - 1) * 10
    }&maxResults=10&key=${apiKey}`
  );
  const data = await response.json();
  console.log("how about these books today ..", data);

  const books = data.items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] || "Unknown",
    thumbnail:
      item.volumeInfo.imageLinks?.thumbnail ||
      "https://via.placeholder.com/128x192.png?text=No+Image",
  }));

  console.log("how about these books today ..", books);
  return books;
}

export const getHomeBooksToDisplay = async () => {
  const genrePath =
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=${apiKey}`;
  const relevancePath =
    `https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=10&key=${apiKey}`;
  const newestPath =
    `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10&key=${apiKey}`;

  const fetchGenreBooks = fetch(genrePath).then((response) => response.json());
  const fetchRelevanceBooks = fetch(relevancePath).then((response) =>
    response.json()
  );
  const fetchNewBooks = fetch(newestPath).then((response) => response.json());
  // const fetchCategories = fetch(categoriesPath).then(response => response.json());

  return await Promise.all([
    fetchGenreBooks,
    fetchRelevanceBooks,
    fetchNewBooks,
  ])
    .then(([genreBooks, relevanceBooks, newBooks]) => {
      // const allCategories = categories.items.map(item => ({
      //   id: item.id,
      //   name: item.volumeInfo.title,
      //   thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'N/A',
      // }));
      // Combine the results and process them
      const combinedBooks = {
        genreBooks: genreBooks.items,
        relevanceBooks: relevanceBooks.items,
        newBooks: newBooks.items,
      };

      console.log("these are the combined outputs of boooks", combinedBooks);
      return combinedBooks;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export async function getCategoryBooks(category, page = 1) {
  console.log("what is my start index ", page);

  const categoriesPath = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
    category
  )}&startIndex=${
    (page - 1) * 10
  }&maxResults=10&key=${apiKey}`;
  const categoryBooks = await fetch(categoriesPath).then((response) =>
    response.json()
  );

  console.log("Many category books ", categoryBooks);
  return categoryBooks.items;
}

export const fetchBooks = async (linkName, page = 1, link = null) => {
  console.log('fullLink here here: ', link);
  let fetchLink;
  if (link) {
    fetchLink = link;
  } else {
    fetchLink = Links[linkName];
  }
  fetchLink = fetchLink + `&startIndex=${
    (page - 1) * 10
  }`

  console.log('fetchLInk arrrrghhh ', fetchLink);
  const fetchedBooks = await fetch(fetchLink).then(response => response.json());
  console.log('link name : ', linkName);
  console.log('fetchedBooks : ', fetchedBooks);
  return fetchedBooks.items;
}
