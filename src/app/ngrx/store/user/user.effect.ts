import { UserService } from './../../services/user.service';
import { User } from '../../models/user.model';
import {UserState} from './user.state';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { allActions, ActionTypes, GetAllUser, GetAllUserSuccess, DeleteUser, DeleteUserSuccess } from './user.action';
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


  @Effect()
  getNews$: Observable<Action> = this.actions$.ofType<GetAllUser>(ActionTypes.GetAllUser).pipe(
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


    @Effect()
    deleteUser$: Observable<Action> = this.actions$.ofType<DeleteUser>(ActionTypes.DeleteUser).pipe(
      withLatestFrom(this.store$),
      mergeMap(([action, storeState]) =>
        this._service.deleteUser(action.id).pipe(map((res) => {
        
            return new DeleteUserSuccess(action.id);
          }
          )

        )
      ));

}
