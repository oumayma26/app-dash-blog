import { User } from './user.model';
import { Article } from './article.model';

export interface Like {
  article: Article;
  author: User;
}
