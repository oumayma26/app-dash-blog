import { Article } from './../../ngrx/models/article.model';
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
  EventEmitter,
  ElementRef, Input
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

  uploading: Boolean = false;

  selectedFile: File = null;

  @Output() title = new EventEmitter();
  constructor(public _logic: ArticleLogic,
    private _logicCategories: CategoryLogic,
    private formBuilder: FormBuilder,
    private el: ElementRef) {

    this.title.emit('New Article');

    this.myForm = new FormBuilder().group({
      title: ['', Validators.required],
      context: ['', Validators.required],
      category: ['', Validators.required],
      author: [localStorage.getItem('id')]
    });

    this._logicCategories.allCategory();
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
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

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    const article: Article = this.myForm.value;
    article.file = formData;
    this._logic.saveArticle(article);
  }

}
