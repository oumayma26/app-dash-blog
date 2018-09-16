import { Article } from '../../models/article.model';


export interface ArticleState {
  articles?: Article[];
  loading?: boolean;

  currentArticle?: Article;
}
