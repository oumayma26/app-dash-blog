import { GetAllCategory, AddCategory } from './../store/category/category.action';


import { CategoryState } from './../store/category/category.state';

import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

export interface AppState {
  categories: any;

}

@Injectable()
export class CategoryLogic {

  categoriesState$: Observable<CategoryState>;

  constructor(private _store: Store<AppState>) {
    this.categoriesState$ = this._store.select('categories');
  }


  allCategory() {

    this._store.dispatch(new GetAllCategory());
  }

  saveCategory(c) {
    this._store.dispatch( new AddCategory(c));
  }
}
