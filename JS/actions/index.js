import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_REGISTER,
  USER_UPDATE,
  LOGIN_FAIL,
 
  AUTH,
  CHECK_EMAIL,
  RESET_PASSWORD
  
} from "../constants/actionsTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched');
      dispatch({
        type: AUTH,
        payload: token,
        
      })
    }
  }
}

export const userRegister = (newUser,router) => async (dispatch) => {
  dispatch({ type: USER_REGISTER });

  try {
    const addResult = await axios.post("http://localhost:7000/user/register", newUser);
     console.log('addResult',addResult.config)
    //  await AsyncStorage.setItem('token', token);
    dispatch({ type: USER_REGISTER, payload: addResult.config.data });
    
   
  } catch (error) {
    console.log(error.data);
    

     

    // dispatch({ type: REGISTER_FAIL, payload: error.response.data });
    
  }
};

export const userLogin = (userLog) => async (dispatch) => {
  // dispatch({ type: USER_LOGIN });
  console.log('userlog',userLog)

  try {
    const loginResult = await axios.post("https://dev.uwandzani.com/api/login_check", userLog);
    

    console.log('login result',loginResult.data);
   
     await AsyncStorage.setItem('token', token);

    dispatch({ type: AUTH , data:{ result ,token  }});
    

    // dispatch({ type: LOGIN_SUCCESS, payload: loginResult.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    console.log('err',error.response.data)
  }
};
export const ResetPassword = (userLog) => async (dispatch) => {
  // dispatch({ type: USER_LOGIN });
  console.log('userlog',userLog)

  try {
    const loginResult = await axios.post("https://dev.uwandzani.com/api/reset_password", userLog);
    

    console.log('login result',loginResult.data);
   

    dispatch({ type: RESET_PASSWORD , data:{ result ,token  }});
    

    // dispatch({ type: LOGIN_SUCCESS, payload: loginResult.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    console.log('err',error.response.data)
  }
};
export const EmailCheck = (userLog) => async (dispatch) => {
  // dispatch({ type: USER_LOGIN });
  console.log('userlog',userLog)

  try {
    const loginResult = await axios.post("https://dev.uwandzani.com/api/check_email", userLog);
    

    console.log('login result',loginResult.data);
   

    dispatch({ type: CHECK_EMAIL , data:{ result ,token  }});
    

    // dispatch({ type: LOGIN_SUCCESS, payload: loginResult.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    console.log('err',error.response.data)
  }
};



export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT'
    })
  }
}
// export const getProfile = () => async (dispatch) => {
//   dispatch({ type: GET_PROFILE });

//   try {
//     const config = {
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     };

//     const user = await axios.get("/user/currentPage", config);

//     dispatch({ type: GET_PROFILE_SUCCESS, payload: user.data });
//   } catch (error) {
//     dispatch({ type: GET_PROFILE_FAIL, payload: error.response.data });
//   }
// };
export const userUpdate = (userUp,router) => async (dispatch) => {
  dispatch({ type: USER_UPDATE});

  try {
    const update = await axios.put("http://localhost:7000/user/update", userUp);
    

    console.log('update result',update.data);
    

    
    router.push('/');

    // dispatch({ type: LOGIN_SUCCESS, payload: loginResult.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
