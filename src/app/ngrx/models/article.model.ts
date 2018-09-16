import { Category } from './category.model';
import { User } from './user.model';

export interface Article {
  title: String;
  context: String;
  date:  Date;
  author: User;
  category: Category;
}
