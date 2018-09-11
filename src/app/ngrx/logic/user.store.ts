import { DeleteUser, SearchUser } from './../store/user/user.action';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserState} from '../store/user/user.state';
import { GetAllUserSuccess, GetAllUser} from '../store/user/user.action';
import {User} from '../models/user.model';

export interface AppState {
  users: any;
}

@Injectable()
export class UserLogic {

  userState$: Observable<UserState>;

  constructor(private _store: Store<AppState>) {
    this.userState$ = this._store.select('users');
  }

  getListUsers(loading: boolean) {

    this._store.dispatch(new GetAllUser(loading));
  }

  delteUser(id: any) {
    this._store.dispatch(new DeleteUser(id));
  }

  searchUser(text: any) {
    this._store.dispatch(new SearchUser(text));
  }
}
