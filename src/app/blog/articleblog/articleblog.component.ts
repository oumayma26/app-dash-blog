import { Article } from './../../ngrx/models/article.model';
import { HomeblogComponent } from './../homeblog/homeblog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-articleblog',
  templateUrl: './articleblog.component.html',
  styleUrls: ['./articleblog.component.css']
})
export class ArticleblogComponent implements OnInit {

  article: Article;
  constructor( public dialogRef: MatDialogRef<HomeblogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.article = data.article;
    }

  ngOnInit() {
  }

}
