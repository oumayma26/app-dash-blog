import { Article } from './../../ngrx/models/article.model';
import { Component, OnInit, Input } from '@angular/core';
import { ArticleLogic } from './../../ngrx/logic/articles.store';
@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {
  articles: any[];
  constructor(public _logic: ArticleLogic) {
    this._logic.getListArticles();
   }

  ngOnInit() {
    this._logic.articlesState$.subscribe(
      state => {
        this.articles = state.articles;
      });
  }

}
