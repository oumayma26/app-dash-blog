import { Category } from './../../models/category.model';
import { Article } from './../../models/article.model';
import {Action} from '@ngrx/store';

import { User } from '../../models/user.model';

export enum ActionTypes {
  GetAllArticle = '[Article] GetAllArticle',
  GetAllArticleSuccess = '[Article] GetAllArticleSuccess',

  DeleteArticle = '[Article] DeleteArticle',
  DeleteArticleSuccess = '[Article] DeleteArticleSuccess',

  GetAllCategory = '[Category] GetAllCategory',
  GetAllCategorySuccess = '[Category] GetAllCategorySuccess',

  ArticlesByEmail = '[Article] ArticleByEmail',
  ArticlesByEmailSuccess = '[Article] ArticleByEmailSuccess',
}

/*
  -------------- All articles -------------------------------------- */
export class GetAllArticle implements Action {
  readonly type = ActionTypes.GetAllArticle;

  constructor() {

  }
}

export class GetAllArticleSuccess implements Action {
  readonly type = ActionTypes.GetAllArticleSuccess;

  constructor(public articles: Article[]) {

  }
}

/*
  -------------- delete article -------------------------------------- */
  export class DeleteArticle implements Action {

    readonly type = ActionTypes.DeleteArticle;

    constructor(public id: any) {

    }
  }

  export class DeleteArticleSuccess implements Action {

    readonly type = ActionTypes.DeleteArticleSuccess;

    constructor(public id: any) {

    }
  }

/*
  -------------- articles by email -------------------------------------- */
  export class ArticlesByEmail implements Action {

    readonly type = ActionTypes.ArticlesByEmail;

    constructor(public email: string) {

    }
  }

  export class ArticlesByEmailSuccess implements Action {
    readonly type = ActionTypes.ArticlesByEmailSuccess;
    constructor(public articles: Article[]) {

    }
  }

export type allActions =
GetAllArticle
  | GetAllArticleSuccess
  | DeleteArticle
  | DeleteArticleSuccess
  | ArticlesByEmail
  | ArticlesByEmailSuccess;
