import { Category } from './../../models/category.model';
import { Article } from './../../models/article.model';
import { UserService } from './../../services/user.service';
import { User } from '../../models/user.model';
import {ArticleState} from './article.state';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { allActions, ActionTypes, GetAllArticle, GetAllArticleSuccess,
  DeleteArticle, DeleteArticleSuccess, ArticlesByEmail , ArticlesByEmailSuccess } from './article.action';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {environment} from '../../../../environments/environment';
import { ArticlesService } from '../../services/article.service';
export interface AppState {
  articles: ArticleState;
}

@Injectable()
export class ArticleEffects {

  constructor(private actions$: Actions,
    private _service:  ArticlesService,
    private store$: Store<AppState>) {
}

 // all articles
  @Effect()
  getArticle$: Observable<Action> = this.actions$.ofType<GetAllArticle>(ActionTypes.GetAllArticle).pipe(
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
      this._service.getAll()
        .pipe(map((res: any) => {

      //  this._service.getAllCategory().pipe(map((res2: any) => {

             return new GetAllArticleSuccess(res as Article[]);


          }
          )
          // ,
          // catchError(() => of(new GeneralErrorDialog()))
        )
    ));

     @Effect()
    getArticleByEmail$: Observable<Action> = this.actions$.ofType<ArticlesByEmail>(ActionTypes.ArticlesByEmail).pipe(
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
      this._service.getArticlesByEmail(action.email)
      .pipe(map((res: any) => {
        console.log(res);
             return new ArticlesByEmailSuccess(res.articles as Article[]);

          })
        )
    ));

     // delete user
     @Effect()
     deleteArticle$: Observable<Action> = this.actions$.ofType<DeleteArticle>(ActionTypes.DeleteArticle).pipe(
       withLatestFrom(this.store$),
       mergeMap(([action, storeState]) =>
         this._service.deleteArticle(action.id).pipe(map(() => {

             return new DeleteArticleSuccess(action.id);
           })
           // ), catchError(() => of ())

         )
       ));

}
