/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
      bookId
      title
      authors
      description
      categories
      thumbnail
      listBooksId
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
      bookId
      title
      authors
      description
      categories
      thumbnail
      listBooksId
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
      bookId
      title
      authors
      description
      categories
      thumbnail
      listBooksId
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
      id
      name
      description
      userId
      books {
        items {
          bookId
          title
          authors
          description
          categories
          thumbnail
          listBooksId
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
      id
      name
      description
      userId
      books {
        items {
          bookId
          title
          authors
          description
          categories
          thumbnail
          listBooksId
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
      id
      name
      description
      userId
      books {
        items {
          bookId
          title
          authors
          description
          categories
          thumbnail
          listBooksId
          id
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
      id
      username
      title
      content
      rating
      createdAt
      updatedAt
      author
      bookId
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
      id
      username
      title
      content
      rating
      createdAt
      updatedAt
      author
      bookId
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
      id
      username
      title
      content
      rating
      createdAt
      updatedAt
      author
      bookId
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
