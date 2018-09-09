import { UserState } from './user.state';
import {allActions, ActionTypes} from './user.action';

export const initialState: UserState = {
  users: [],
  loading: false
};


export function userReducer(state = initialState, action: allActions): UserState {
  switch (action.type) {

    case ActionTypes.GetAllUser:
    return {...state, loading: true};

    case ActionTypes.GetAllUserSuccess:
    return {
      users: action.users,
      loading: false
    };

    default: {
      return state;
    }

  }
}

