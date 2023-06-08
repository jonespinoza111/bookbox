
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

export async function createList(name) {
  const user = await Auth.currentAuthenticatedUser();
  const newList = await DataStore.save(new List({
    name,
    userId: user.attributes.sub,
    books: []
  }));
  return newList;
}

export async function getLists() {
  const user = await Auth.currentAuthenticatedUser();
  const list = await DataStore.query(List, (list) => list.userId.eq(user.attributes.sub));
  return list;
}