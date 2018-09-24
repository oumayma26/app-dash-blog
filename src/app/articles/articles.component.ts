import { DeleteCategory } from './../ngrx/store/category/category.action';
import { CategoryLogic } from './../ngrx/logic/category.store';
import { AddCategoryComponent } from './add-category/add-category.component';
import { Category } from './../ngrx/models/category.model';
import { ArticleLogic } from './../ngrx/logic/articles.store';
import { Article } from './../ngrx/models/article.model';
import { ArticlesService } from './../ngrx/services/article.service';
import { AlertMsgComponent } from './../alert-msg/alert-msg.component';
import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: any[];
  categories: Category[];
  filterText: string;

  @Input() public  name;

  constructor(public dialog: MatDialog,
public _logic: ArticleLogic,
public _logicCategory: CategoryLogic,
private service: ArticlesService
) {

    this._logic.getListArticles();
    this._logicCategory.allCategory();
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
      });

    this._logicCategory.categoriesState$.subscribe(
      state => {
        console.log(state.categories);
        this.categories = state.categories;
      }
    )

  }

  deleteArticle(id) {
    const dialogRef = this.dialog.open(AlertMsgComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result === true ) {
        this.service.deleteCategory(id).subscribe(res => {
          console.log(res);
        });
      }
      console.log(`Dialog result: ${result}`);
    });
  }


  deleteCategory(id) {
    const dialogRef = this.dialog.open(AlertMsgComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result === true ) {
        this._logic.delteArticle(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }
  openModalaSaveCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result === true ) {
      }

    });
  }

}
