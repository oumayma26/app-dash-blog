import { User } from '../../models/user.model';

export interface UserState {
  users?: User[];
  loading?: boolean;

  currentUser?: User;

}
