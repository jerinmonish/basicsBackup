import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIDE_MENU_REQUEST,
  SIDE_MENU_SUCCESS,
  SIDE_MENU_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
} from "../actions/types";

const initialState = {
  isLoading:false,
  isAuthenticated:false,
  token:null,
  error:"",
  success:"",
  isLogout:false,
  userDetails:null,
  employeeListDetails: null,
  isMenuLoading:false,
  menuData:null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
        userDetails:null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:true,
        token:action.returnToken,
        userDetails:action.payload,
        success:"login success",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"login error",
        success:"",
        userDetails:null,
      };
    case SIDE_MENU_REQUEST:
      return {
        ...state,
        isMenuLoading: true,
      };
    case SIDE_MENU_SUCCESS:
      return {
        ...state,
        isMenuLoading: false,
        success:"menu success",
        menuData:action.payloadMenu,
      };
    case SIDE_MENU_ERROR:
      return {
        ...state,
        isMenuLoading: false,
        error:"menu error",
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        token:"",
        success:"",
        isLogout:true
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"login error",
        success:"",
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        token:"",
        success:"",
        isLogout:true
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"login error",
        success:"",
      };
    
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated:false,
        success:"",
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        token:"",
        success:"Reset password success",
        isLogout:true
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated:false,
        error:"reset password  error",
        success:"",
      };
    default:
      return state;
  }
}
