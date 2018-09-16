import { ArticleState } from './article.state';
import {allActions,
   ActionTypes} from './article.action';
import { deleteFromArray } from '../../../generic/util';

export const initialState: ArticleState = {
  articles: [],
  loading: false
};


export function articleReducer(state = initialState, action: allActions): ArticleState {
  switch (action.type) {

    // get all articles
    case ActionTypes.GetAllArticle:

    // delete user
    case ActionTypes.DeleteArticle:
      return {...state, loading: true};

    // all articles success
    case ActionTypes.GetAllArticleSuccess:
      return {articles: action.articles, loading: false};

    // delete user success
    case ActionTypes.DeleteArticleSuccess:
      return {...state, loading: false, articles: deleteFromArray(state.articles, action.id)  };

    default: {
      return state;
    }

  }
}

