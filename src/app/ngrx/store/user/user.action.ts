import { Article } from './../../models/article.model';
import {Action} from '@ngrx/store';

import { User } from '../../models/user.model';

export enum ActionTypes {
  GetAllUser = '[User] GetAllUser',
  GetAllUserSuccess = '[User] GetAllUserSuccess',

  DeleteUser = '[User] DeleteUser',
  DeleteUserSuccess = '[User] DeleteUserSuccess',

  SearchUser = '[User] SearchUser',
  SearchUserSuccess = '[User] SearchUserSuccess'


}
/*
  -------------- Search user -------------------------------------- */
export class SearchUser implements Action {

  readonly type = ActionTypes.SearchUser;

  constructor(public name: any) {

  }
}

export class SearchUserSuccess implements Action {

  readonly type = ActionTypes.SearchUserSuccess;

  constructor(public users: User[]) {

  }
}

/*
  -------------- delete user -------------------------------------- */
export class DeleteUser implements Action {

  readonly type = ActionTypes.DeleteUser;

  constructor(public id: any) {

  }
}

export class DeleteUserSuccess implements Action {

  readonly type = ActionTypes.DeleteUserSuccess;

  constructor(public id: any) {

  }
}

/*
  -------------- All user -------------------------------------- */
export class GetAllUser implements Action {
  readonly type = ActionTypes.GetAllUser;

  constructor(public move: boolean) {

  }
}

export class GetAllUserSuccess implements Action {
  readonly type = ActionTypes.GetAllUserSuccess;

  constructor(public users: User[]) {

  }
}



export type allActions =
GetAllUser
  | GetAllUserSuccess
  | DeleteUser
  | DeleteUserSuccess
  | SearchUser
  | SearchUserSuccess;
