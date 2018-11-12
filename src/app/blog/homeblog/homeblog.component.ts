import {
  ArticleblogComponent
} from './../articleblog/articleblog.component';
import {
  MatDialog
} from '@angular/material';
import {
  Article
} from './../../ngrx/models/article.model';
import {
  ArticleLogic
} from './../../ngrx/logic/articles.store';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-homeblog',
  templateUrl: './homeblog.component.html',
  styleUrls: ['./homeblog.component.css', ]
})
export class HomeblogComponent implements OnInit {


  articles: any[];

  constructor(public _logic: ArticleLogic, ) {
    this._logic.getListArticles();
  }



  ngOnInit() {
    this._logic.articlesState$.subscribe(
      state => {
        this.articles = state.articles;
      });
  }

}
