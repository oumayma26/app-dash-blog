import { Article } from './article.model';
export interface User {
  _id: string;
  username: string;
  name: String;
  lastname: String;
  email: String;
  password: String;
  date: Date;
  articles: Article;
  }
