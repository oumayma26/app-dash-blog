import {
  Category
} from './../../ngrx/models/category.model';
import {
  CategoryLogic
} from './../../ngrx/logic/category.store';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ArticleLogic
} from './../../ngrx/logic/articles.store';
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MatSnackBar
} from '@angular/material';
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  myForm: FormGroup;

  categories: Category[];

  @Output() title = new EventEmitter();
  constructor(public _logic: ArticleLogic,
    private _logicCategories: CategoryLogic,
    private formBuilder: FormBuilder) {
    this.title.emit('New Article');

    this.myForm = new FormBuilder().group({
      title: ['', Validators.required],
      context: ['', Validators.required],
      category: ['', Validators.required],
      author: [localStorage.getItem('id')]
    });

    this._logicCategories.allCategory();
  }

  get f() {
    return this.myForm.controls;
  }
  ngOnInit() {
    this._logicCategories.categoriesState$.subscribe(state => {
      this.categories = state.categories;
    });
  }

  save() {

    this._logic.saveArticle(this.myForm.value);
  }

}
