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
  DeleteArticle, DeleteArticleSuccess, ArticlesByEmail , ArticlesByEmailSuccess,
  LikeArticle, LikeArticleSuccess, AddArticle, AddArticleSuccess } from './article.action';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {environment} from '../../../../environments/environment';
import { ArticlesService } from '../../services/article.service';
import { MatSnackBar } from '@angular/material';
export interface AppState {
  articles: ArticleState;
}

@Injectable()
export class ArticleEffects {

  constructor(private actions$: Actions,
    private _service:  ArticlesService,
    private store$: Store<AppState>,
    public snackBar: MatSnackBar) {
}

 // all articles
  @Effect()
  getArticle$: Observable<Action> = this.actions$.ofType<GetAllArticle>(ActionTypes.GetAllArticle).pipe(
    withLatestFrom(this.store$),
    mergeMap(([action, storeState]) =>
      this._service.getAll()
        .pipe(map((res: any) => {
             return new GetAllArticleSuccess(res as Article[]);

          })
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

     // delete article
     @Effect()
     deleteArticle$: Observable<Action> = this.actions$.ofType<DeleteArticle>(ActionTypes.DeleteArticle).pipe(
       withLatestFrom(this.store$),
       mergeMap(([action, storeState]) =>
         this._service.deleteArticle(action.id).pipe(map((res) => {

          console.log(res);
             return new DeleteArticleSuccess(action.id);
           })
           // ), catchError(() => of ())

         )
       ));

     // like article
     @Effect()
     likeArticlee$: Observable<Action> = this.actions$.ofType<LikeArticle>(ActionTypes.LikeArticle).pipe(
      withLatestFrom(this.store$),
      mergeMap(([action, storeState]) =>

        this._service.likeArticle(action.article, action.user).pipe(map((res: any) => {
          console.log('service', res);
            return new LikeArticleSuccess(res.article);

          })
        )
      ));


      @Effect()
      addArticle$: Observable<Action> = this.actions$.ofType<AddArticle>(ActionTypes.AddArticle).pipe(
       withLatestFrom(this.store$),
       mergeMap(([action, storeState]) =>

         this._service.addArticle(action.article).pipe(map((res: any) => {
           console.log('service', res);

           this._service.saveFile(res.article._id, action.article.file).subscribe(res2 => {
            this.snackBar.open('Article created', 'ok', {
              duration: 2000,
            });
            console.log('res2', res2);
           });

           return new AddArticleSuccess(action.article);



           })
         )
       ));


}
