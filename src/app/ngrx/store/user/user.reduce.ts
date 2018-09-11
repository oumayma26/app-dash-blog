import { UserState } from './user.state';
import {allActions,
   ActionTypes,
  DeleteUser,
DeleteUserSuccess,
SearchUser,
SearchUserSuccess} from './user.action';
import { deleteFromArray } from '../../../generic/util';

export const initialState: UserState = {
  users: [],
  loading: false
};


export function userReducer(state = initialState, action: allActions): UserState {
  switch (action.type) {

    // get all user
    case ActionTypes.GetAllUser:
    // delete user
    case ActionTypes.DeleteUser:
    // search user
    case ActionTypes.SearchUser:
      return {...state, loading: true};

    // all user success
    case ActionTypes.GetAllUserSuccess:
      return {users: action.users, loading: false};

    // search user success
    case ActionTypes.SearchUserSuccess:
    return {...state, users: action.users, loading: false};

    // delete user success
    case ActionTypes.DeleteUserSuccess:
      return {...state, loading: false, users: deleteFromArray(state.users, action.id)  };

    default: {
      return state;
    }

  }
}

