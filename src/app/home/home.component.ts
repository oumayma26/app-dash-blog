import { ArticleLogic } from './../ngrx/logic/articles.store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
