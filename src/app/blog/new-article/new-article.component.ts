import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  @Output() title = new EventEmitter();
  constructor() {
    this.title.emit('New Article');
  }

  ngOnInit() {
  }

}
