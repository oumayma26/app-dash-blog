import { ArticlesByEmail } from './../store/article/article.action';

import { GetAllCategory } from './../store/Category/category.action';
import { CategoryState } from './../store/category/category.state';
import { ArticleState } from './../store/article/article.state';

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { GetAllArticle, DeleteArticle} from '../store/article/article.action';


export interface AppState {
  articles: any;
}

@Injectable()
export class ArticleLogic {

  articlesState$: Observable<ArticleState>;

  constructor(private _store: Store<AppState>) {
    this.articlesState$ = this._store.select('articles');

  }

  getListArticles() {
    this._store.dispatch(new GetAllArticle());
  }

  delteArticle(id: any) {
    this._store.dispatch(new DeleteArticle(id));
  }

  getArticlesByEmail(email: string) {
    this._store.dispatch(new ArticlesByEmail(email));
  }


}

