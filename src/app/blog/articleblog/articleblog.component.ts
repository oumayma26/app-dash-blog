import { Article } from './../../ngrx/models/article.model';
import { HomeblogComponent } from './../homeblog/homeblog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import {
  ArticleLogic
} from './../../ngrx/logic/articles.store';
@Component({
  selector: 'app-articleblog',
  templateUrl: './articleblog.component.html',
  styleUrls: ['./articleblog.component.css']
})
export class ArticleblogComponent implements OnInit {

  id: any;
  article: Article;
  constructor( public dialogRef: MatDialogRef<HomeblogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _logic: ArticleLogic) {
      this.id = localStorage.getItem('id');
      console.log(data);
      this.article = data.article;
    }

  ngOnInit() {
  }

   likeArticle(user, article) {
    console.log('article: ', article);
    const like = {
      user: user,
      article: article
    };
    this._logic.likeArticle(user, article);
  }

}
