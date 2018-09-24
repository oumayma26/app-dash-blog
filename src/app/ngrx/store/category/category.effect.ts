import { Category } from './../../models/category.model';
import { UserService } from './../../services/user.service';
import { User } from '../../models/user.model';
import {CategoryState} from './category.state';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { allActions, ActionTypes, GetAllCategory, GetAllCategorySuccess, DeleteCategory,
   DeleteCategorySuccess , AddCategorySuccess, AddCategory} from './category.action';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {environment} from '../../../../environments/environment';
import { ArticlesService } from '../../services/article.service';
export interface AppState {
  categories: CategoryState;
}

@Injectable()
export class CategoryEffects {

  constructor(private actions$: Actions,
    private _service:  ArticlesService,
    private store$: Store<AppState>) {
}

 // all users
  @Effect()
  getCategory$: Observable<Action> = this.actions$.ofType<GetAllCategory>(ActionTypes.GetAllCategory).pipe(
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
      this._service.getAllCategory()
        .pipe(map((res: any) => {


            return new GetAllCategorySuccess(res as Category[]);
          }
          )
          // ,
          // catchError(() => of(new GeneralErrorDialog()))
        )
    ));

 // delete user
    @Effect()
    deleteUser$: Observable<Action> = this.actions$.ofType<DeleteCategory>(ActionTypes.DeleteCategory).pipe(
      withLatestFrom(this.store$),
      mergeMap(([action, storeState]) =>
        this._service.deleteCategory(action.id).pipe(map(() => {

            return new DeleteCategorySuccess(action.id);
          })
          // ), catchError(() => of ())

        )
      ));

      @Effect()
      AddCategory$: Observable<Action> = this.actions$.ofType<AddCategory>(ActionTypes.AddCategory).pipe(
        withLatestFrom(this.store$),
        mergeMap(([action, storeState]) =>
          this._service.addCategory(action.category).pipe(map(() => {

              return new AddCategorySuccess(action.category);
            })
            // ), catchError(() => of ())

          )
        ));


}
