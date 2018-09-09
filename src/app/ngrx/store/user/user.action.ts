import {Action} from '@ngrx/store';

import { User } from '../../models/user.model';

export enum ActionTypes {
  GetAllUser = '[User] GetAllUser',
  GetAllUserSuccess = '[User] GetAllUserSuccess',

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
  | GetAllUserSuccess;
