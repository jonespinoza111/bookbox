/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook(
    $filter: ModelSubscriptionBookFilterInput
    $owner: String
  ) {
    onCreateBook(filter: $filter, owner: $owner) {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook(
    $filter: ModelSubscriptionBookFilterInput
    $owner: String
  ) {
    onUpdateBook(filter: $filter, owner: $owner) {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook(
    $filter: ModelSubscriptionBookFilterInput
    $owner: String
  ) {
    onDeleteBook(filter: $filter, owner: $owner) {
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
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onCreateList(filter: $filter, owner: $owner) {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onUpdateList(filter: $filter, owner: $owner) {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList(
    $filter: ModelSubscriptionListFilterInput
    $owner: String
  ) {
    onDeleteList(filter: $filter, owner: $owner) {
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
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview(
    $filter: ModelSubscriptionReviewFilterInput
    $owner: String
  ) {
    onCreateReview(filter: $filter, owner: $owner) {
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
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview(
    $filter: ModelSubscriptionReviewFilterInput
    $owner: String
  ) {
    onUpdateReview(filter: $filter, owner: $owner) {
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
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview(
    $filter: ModelSubscriptionReviewFilterInput
    $owner: String
  ) {
    onDeleteReview(filter: $filter, owner: $owner) {
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
