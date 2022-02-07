import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN,
  USER_REGISTER,
  LOGIN_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  AUTH,
  LOGOUT,
  USER_UPDATE,
  CHECK_EMAIL,
  RESET_PASSWORD
} from "../constants/actionsTypes";

const initialState = {
  loading: false,
  errors:null,
  authData:null,
  isvalidemail:false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case USER_REGISTER:
    // case USER_LOGIN:
    // case GET_PROFILE:
    case AUTH :
    
      return {
        ...state,
        loading: true,
        authData: action.data, loading: false, errors: null
        
      };
      case Retrieve_Token:
        return {
          ...state,
          loading:false,
          
        }

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };

      case CHECK_EMAIL:
      return {
        ...state,
        loading: false,
        isvalidemail:true,
      };
      case RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
   
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
        isAuth: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuth: true,
      };
      case USER_UPDATE:
        return {
          ...state,
          loading: false,
        };
      case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;

    
  }
};

export default userReducer;
