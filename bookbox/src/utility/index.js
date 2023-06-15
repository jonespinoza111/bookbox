
import { Auth, DataStore } from "aws-amplify";
import { Book, List } from '../models';

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
      id: data.id,
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
    await DataStore.save(new Book({ ...bookInfo, listBooksId: listId }));
}

export async function deleteList(listId, cb) {
  const listToDelete = await DataStore.query(List, listId);
  DataStore.delete(listToDelete);
  cb();
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
