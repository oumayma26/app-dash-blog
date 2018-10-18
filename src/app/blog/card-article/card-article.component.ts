import { ArticleblogComponent } from './../articleblog/articleblog.component';
import { Article } from './../../ngrx/models/article.model';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component ({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.css']
})
export class CardArticleComponent implements OnInit {


  @Input() article: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  seeMore(article) {

    const dialogRef = this.dialog.open(ArticleblogComponent, {
      width: '800px',
      data: {type: 'see more', article: article }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
}

}
