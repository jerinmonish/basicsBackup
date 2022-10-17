import {
  USER_ADD_ERROR,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS,
  USER_DELETE_ERROR,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_EDITDETAILS_ERROR,
  USER_EDITDETAILS_REQUEST,
  USER_EDITDETAILS_ROLE_ERROR,
  USER_EDITDETAILS_ROLE_REQUEST,
  USER_EDITDETAILS_ROLE_SUCCESS,
  USER_EDITDETAILS_SUCCESS,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_ERROR,
  EMPLOYEE_EXPORT_LIST_REQUEST,
  EMPLOYEE_EXPORT_LIST_SUCCESS,
  EMPLOYEE_EXPORT_LIST_ERROR,
  
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: '',
  success: '',
  userlistDetails: null,
  isUserDeleted:false,
  isImpChkLoading:false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action)
{
  // console.log("action",action);
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'user list request',
        userlistDetails: null,
      }
    case USER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userlistDetails: action.payload,
        success: ' user list success ',
      }
    case USER_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'user list error',
        success: '',
        userlistDetails: null,
      }

      case USER_DELETE_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
            case USER_DELETE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'User delete success',
                isUserDeleted:true
              }
            case USER_DELETE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'user delete error',
              }
            case USER_ADD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: 'User add  request',
         
        }
      case USER_ADD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: 'User added success',
          showToast: true,
        }
      case USER_ADD_ERROR:
        return {
          ...state,
          isLoading: false,
          error: 'user add  error',
          success: '',
         
        }
    
      case USER_EDITDETAILS_REQUEST:
          return {
            ...state,
            isLoading: true,
            userEditDetails: null,
          }
        case USER_EDITDETAILS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            userEditDetails: action.payload,
          }
        case USER_EDITDETAILS_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'user  edit  error',
            success: '',
            userEditDetails: null,
          }
    
          case USER_EDITDETAILS_ROLE_REQUEST:
          return {
            ...state,
            isLoading: true,
            userEditRoleDetails: null,
          }
        case USER_EDITDETAILS_ROLE_SUCCESS:
          return {
            ...state,
            isLoading: false,
            userEditRoleDetails: action.payload,
          }
        case USER_EDITDETAILS_ROLE_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'user  edit  error',
            success: '',
            userEditRoleDetails: null,
          }
    
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'user update request',
        
      }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'User update success',
        showToast: true,
      }
    case USER_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'user error',
        success: '',
        
      }
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'user update success',
      }
    case USER_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'user update error',
      }
    case EMPLOYEE_EXPORT_LIST_REQUEST:
      return {
        ...state,
        isImpChkLoading: true,
        success: '',
      }
    case EMPLOYEE_EXPORT_LIST_SUCCESS:
      return {
        ...state,
        isImpChkLoading: false,
        columnNameChk: action.payload,
        success: 'Employee export checkbox success',
      }
    case EMPLOYEE_EXPORT_LIST_ERROR:
      return {
        ...state,
        isImpChkLoading: false,
        error: 'Employee export checkbox error',
      }


    default:
      return state
  }
}
