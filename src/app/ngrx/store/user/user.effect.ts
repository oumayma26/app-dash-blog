import { UserService } from './../../services/user.service';
import { User } from '../../models/user.model';
import {UserState} from './user.state';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { allActions, ActionTypes, GetAllUser, GetAllUserSuccess, DeleteUser,
   DeleteUserSuccess, SearchUser, SearchUserSuccess } from './user.action';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {environment} from '../../../../environments/environment';
export interface AppState {
  users: UserState;
}

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
    private _service:  UserService,
    private store$: Store<AppState>) {
}

 // all users
  @Effect()
  getUsers$: Observable<Action> = this.actions$.ofType<GetAllUser>(ActionTypes.GetAllUser).pipe(
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
      this._service.getAll()
        .pipe(map((res: any) => {


            return new GetAllUserSuccess(res as User[]);
          }
          )
          // ,
          // catchError(() => of(new GeneralErrorDialog()))
        )
    ));

 // delete user
    @Effect()
    deleteUser$: Observable<Action> = this.actions$.ofType<DeleteUser>(ActionTypes.DeleteUser).pipe(
      withLatestFrom(this.store$),
      mergeMap(([action, storeState]) =>
        this._service.deleteUser(action.id).pipe(map(() => {

            return new DeleteUserSuccess(action.id);
          })
          // ), catchError(() => of ())

        )
      ));

    // search user
    @Effect()
    searchUser$: Observable<Action> = this.actions$.ofType<SearchUser>(ActionTypes.SearchUser).pipe(
      withLatestFrom(this.store$),
      mergeMap(([action, storeState]) =>
        this._service.searchByName(action.name)
          .pipe(map((res: any) => {
            console.log(res);
              return new SearchUserSuccess(res as User[]);
            }
            )
            // ,
            // catchError(() => of(new GeneralErrorDialog()))
          )
      ));

}
