import { AddCategoryComponent } from './../../../articles/add-category/add-category.component';
import { Category } from './../../models/category.model';
import {Action} from '@ngrx/store';

export enum ActionTypes {
  GetAllCategory = '[Category] GetAllCategory',
  GetAllCategorySuccess = '[Category] GetAllCategorySuccess',

  DeleteCategory = '[Category] DeleteCategory',
  DeleteCategorySuccess = '[Category] DeleteCategorySuccess',

  AddCategory = '[Category] AddCategory',
  AddCategorySuccess = '[Category] AddCategorySuccess'


}


/*
  -------------- delete Category -------------------------------------- */
export class DeleteCategory implements Action {

  readonly type = ActionTypes.DeleteCategory;

  constructor(public id: any) {

  }
}

export class DeleteCategorySuccess implements Action {

  readonly type = ActionTypes.DeleteCategorySuccess;

  constructor(public id: any) {

  }
}

/*
  -------------- All Category -------------------------------------- */
export class GetAllCategory implements Action {
  readonly type = ActionTypes.GetAllCategory;

  constructor() {

  }
}

export class GetAllCategorySuccess implements Action {
  readonly type = ActionTypes.GetAllCategorySuccess;

  constructor(public category: Category[]) {

  }
}


export class AddCategory implements Action {
  readonly type = ActionTypes.AddCategory;

  constructor(public category: Category) {

  }
}

export class AddCategorySuccess implements Action {
  readonly type = ActionTypes.AddCategorySuccess;

  constructor(public category: Category) {

  }
}

export type allActions =
GetAllCategory
  | GetAllCategorySuccess
  | DeleteCategory
  | DeleteCategorySuccess
  | AddCategory
  | AddCategorySuccess;
