import { User } from './user.model';

export interface Article {
  title: String;
  context: String;
  date:  Date;
  author: User;
}
