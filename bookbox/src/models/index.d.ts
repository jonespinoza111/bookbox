import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerBook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Book, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookId: string;
  readonly title: string;
  readonly authors?: (string | null)[] | null;
  readonly description: string;
  readonly categories?: (string | null)[] | null;
  readonly thumbnail: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listBooksId?: string | null;
}

type LazyBook = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Book, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bookId: string;
  readonly title: string;
  readonly authors?: (string | null)[] | null;
  readonly description: string;
  readonly categories?: (string | null)[] | null;
  readonly thumbnail: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listBooksId?: string | null;
}

export declare type Book = LazyLoading extends LazyLoadingDisabled ? EagerBook : LazyBook

export declare const Book: (new (init: ModelInit<Book>) => Book) & {
  copyOf(source: Book, mutator: (draft: MutableModel<Book>) => MutableModel<Book> | void): Book;
}

type EagerList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<List, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly books: (Book | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<List, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly books: AsyncCollection<Book>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type List = LazyLoading extends LazyLoadingDisabled ? EagerList : LazyList

export declare const List: (new (init: ModelInit<List>) => List) & {
  copyOf(source: List, mutator: (draft: MutableModel<List>) => MutableModel<List> | void): List;
}

type EagerReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly content: string;
  readonly rating: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly author: string;
  readonly bookId: string;
}

type LazyReview = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Review, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly content: string;
  readonly rating: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly author: string;
  readonly bookId: string;
}

export declare type Review = LazyLoading extends LazyLoadingDisabled ? EagerReview : LazyReview

export declare const Review: (new (init: ModelInit<Review>) => Review) & {
  copyOf(source: Review, mutator: (draft: MutableModel<Review>) => MutableModel<Review> | void): Review;
}