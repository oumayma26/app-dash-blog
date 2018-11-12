import { ArticleState } from './article.state';
import {allActions,
   ActionTypes} from './article.action';
import { deleteFromArray, updateArray } from '../../../generic/util';

export const initialState: ArticleState = {
  articles: [],
  loading: false
};


export function articleReducer(state = initialState, action: allActions): ArticleState {
  switch (action.type) {

    // get all articles
    case ActionTypes.GetAllArticle:
    // get all ArticlesByEmail
    case ActionTypes.ArticlesByEmail:

    // delete user
    case ActionTypes.DeleteArticle:

    // like article
    case ActionTypes.LikeArticle:
      return {...state, loading: true};
    // like article sucess
    case ActionTypes.LikeArticleSuccess:
      return {...state, loading: false, articles: updateArray(state.articles, action.article)};
    // all articles success
    case ActionTypes.GetAllArticleSuccess:
      return {articles: action.articles, loading: false};

    case ActionTypes.ArticlesByEmailSuccess:
      return {articles: action.articles, loading: false};

    // delete user success
    case ActionTypes.DeleteArticleSuccess:
      return {...state, loading: false, articles: deleteFromArray(state.articles, action.id)  };

    default: {
      return state;
    }

  }
}

