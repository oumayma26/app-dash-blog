import { Article } from './article.model';
export interface User {
  username: string;
  name: String;
  lastname: String;
  email: String;
  password: String;
  date: Date;
  articles: Article;
  }
