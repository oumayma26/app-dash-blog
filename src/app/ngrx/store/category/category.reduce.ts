import {CategoryState } from './category.state';
import {allActions,
   ActionTypes,
  DeleteCategory,
  DeleteCategorySuccess} from './category.action';
import { deleteFromArray } from '../../../generic/util';

export const initialState: CategoryState = {
  categories: [],
  loading: false
};


export function categoriesReducer(state = initialState, action: allActions): CategoryState {
  switch (action.type) {

    // get all Category
    case ActionTypes.GetAllCategory:
    // delete Category
    case ActionTypes.DeleteCategory:
      return {...state, loading: true};

    // all Category success
    case ActionTypes.GetAllCategorySuccess:
      return {categories: action.category, loading: false};

    case ActionTypes.AddCategory:
      return {...state, loading: true};

    // delete Category success
    case ActionTypes.DeleteCategorySuccess:
      return {...state, loading: false, categories: deleteFromArray(state.categories, action.id)  };

    default: {
      return state;
    }

  }
}

