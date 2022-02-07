import { GET_USERS,DELETE_USER } from '../constants/actionsTypes';

export default (Users = [ ], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
   
    case DELETE_USER:
      return Users.filter((user) => user._id !== action.payload);
    default:
      return Users;
  }
};