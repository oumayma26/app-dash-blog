import { User } from './user.model';
import { Article } from './article.model';

export interface Comment {
  comment: String;
  article: Article;
  date:  Date;
  author: User;
}
