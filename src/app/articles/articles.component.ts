import { ArticleLogic } from './../ngrx/logic/articles.store';
import { Article } from './../ngrx/models/article.model';
import { ArticlesService } from './../ngrx/services/article.service';
import { AlertMsgComponent } from './../alert-msg/alert-msg.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: any[];
  filterText : string;

  constructor(public dialog: MatDialog,
public _logic: ArticleLogic) {

    this._logic.getListArticles();

   }

  openDialog() {
    const dialogRef = this.dialog.open(AlertMsgComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {

    this._logic.articlesState$.subscribe(
      state => {
        this.articles = state.articles;
        console.log(state.articles);
      });

  }

  deleteArticle(id) {
    const dialogRef = this.dialog.open(AlertMsgComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result === true ) {
        this._logic.delteArticle(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

}
