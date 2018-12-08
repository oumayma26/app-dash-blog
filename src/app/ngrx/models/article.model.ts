import { Category } from './category.model';
import { User } from './user.model';

export interface Article {
  _id: String;
  title: String;
  context: String;
  date:  Date;
  author: User;
  category: Category;
  like: any;

  file?: FormData;

  path?: String;
}
