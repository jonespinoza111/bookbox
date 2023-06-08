// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Book, List } = initSchema(schema);

export {
  Book,
  List
};