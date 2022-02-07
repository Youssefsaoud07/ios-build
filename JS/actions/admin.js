import { DELETE_USER } from "JS/constants/actionsTypes";
import { GET_USERS } from "JS/constants/actionsTypes";
import * as api from '../../API/index';

export const getUsers = () => async (dispatch) => {
    try {
      const { data } = await api.fetchUsers();
  
      dispatch({ type: GET_USERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };


  export const deleteUser = (id) => async (dispatch) => {
    try {
       await api.deleteUser(id);
  
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      console.log(error);
    }
  };