import {Action} from '@ngrx/store';

import { User } from '../../models/user.model';

export enum ActionTypes {
  GetAllUser = '[User] GetAllUser',
  GetAllUserSuccess = '[User] GetAllUserSuccess',

  DeleteUser = '[User] DeleteUser',
  DeleteUserSuccess = '[User] DeleteUserSuccess',

}

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
  | DeleteUserSuccess;
