import { UserState } from './user.state';
import {allActions,
   ActionTypes,
  DeleteUser,
DeleteUserSuccess} from './user.action';
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
    return {...state, loading: true};

    // all user success
    case ActionTypes.GetAllUserSuccess:
    return {users: action.users, loading: false};

    // delete user success
    case ActionTypes.DeleteUserSuccess:
    console.log('action.id' , action.id);

    return {...state, loading: false, users: deleteFromArray(state.users, action.id)  };

    default: {
      return state;
    }

  }
}

