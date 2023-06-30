import { Auth, DataStore } from "aws-amplify";
import { Book, List, Review } from "../models";

export const Category = {
  FICTION: "Fiction",
  NONFICTION: "Nonfiction",
  MYSTERY: "Mystery",
  ROMANCE: "Romance",
  SCIFI: "Science Fiction",
  FANTASY: "Fantasy",
};

export async function fetchBookData(id) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU`
  );
  const data = await response.json();
  console.log("here here data ", data);
  const bookData = {
    bookId: data.id,
    title: data.volumeInfo.title,
    authors: data.volumeInfo.authors,
    description: data.volumeInfo.description,
    categories: data.volumeInfo.categories?.map(
      (category) => Category[category.toUpperCase()]
    ),
    thumbnail: data.volumeInfo.imageLinks?.thumbnail,
  };
  // const query = await DataStore.query(Book);
  const book = await DataStore.save(new Book(bookData));
  console.log("hih hi");
  return book;
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
  const user = await Auth.currentAuthenticatedUser();

  await DataStore.save(
    new Review({
      author: user.attributes.sub,
      ...reviewInfo,
    })
  );
}

export async function getReviews(bookId) {
  const reviews = await DataStore.query(Review, (review) =>
    review.bookId.eq(bookId)
  );
  console.log("my reviews ", reviews);
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function handleSearch(query, page = 1) {
  console.log("query dog ", query);
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
      (page - 1) * 10
    }&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU`
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
    "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU";
  const relevancePath =
    "https://www.googleapis.com/books/v1/volumes?q=*&orderBy=relevance&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU";
  const newestPath =
    "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU";
  // const categoriesPath = 'https://www.googleapis.com/books/v1/volumes?q=subject:horror&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU';

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
  }&maxResults=10&key=AIzaSyBxOOizpDa_Q3-SQ6g9_EktOK315JTXgVU`;
  const categoryBooks = await fetch(categoriesPath).then((response) =>
    response.json()
  );

  console.log("Many category books ", categoryBooks);
  return categoryBooks.items;
}
