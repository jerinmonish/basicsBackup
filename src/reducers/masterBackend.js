import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_ERROR,
  GROUP_LIST_SUCCESS,
  GROUP_ADD_REQUEST,
  GROUP_ADD_ERROR,
  GROUP_ADD_SUCCESS,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_ERROR,
  GROUP_DELETE_SUCCESS,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_ERROR,
  GROUP_DETAILS_SUCCESS,
  GROUP_UPDATE_REQUEST,
  GROUP_UPDATE_ERROR,
  GROUP_UPDATE_SUCCESS,
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_ERROR,
  COMPANY_LIST_SUCCESS,
  COMPANY_ADD_REQUEST,
  COMPANY_ADD_ERROR,
  COMPANY_ADD_SUCCESS,
  COMPANY_EDIT_REQUEST,
  COMPANY_EDIT_ERROR,
  COMPANY_EDIT_SUCCESS,
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_ERROR,
  LOCATION_LIST_SUCCESS,
  LOCATION_ADD_REQUEST,
  LOCATION_ADD_ERROR,
  LOCATION_ADD_SUCCESS,
  LOCATION_EDIT_REQUEST,
  LOCATION_EDIT_SUCCESS,
  LOCATION_UPDATE_REQUEST,
  LOCATION_UPDATE_SUCCESS,
  LOCATION_UPDATE_ERROR,
  LOCATION_DELETE_REQUEST,
  LOCATION_DELETE_SUCCESS,
  LOCATION_DELETE_ERROR,
  FUNCTION_LIST_REQUEST,
  FUNCTION_LIST_ERROR,
  FUNCTION_LIST_SUCCESS,
  SUBFUNCTION_LIST_REQUEST,
  SUBFUNCTION_LIST_ERROR,
  SUBFUNCTION_LIST_SUCCESS,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_ERROR,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_ERROR,
  FUNCTION_ADD_REQUEST,
  FUNCTION_ADD_ERROR,
  FUNCTION_ADD_SUCCESS,
  FUNCTION_EDIT_REQUEST,
  FUNCTION_EDIT_ERROR,
  FUNCTION_EDIT_SUCCESS,
  FUNCTION_UPDATE_REQUEST,
  FUNCTION_UPDATE_ERROR,
  FUNCTION_UPDATE_SUCCESS,
  MESSAGE_CLEAR,
  LOCATION_EDIT_ERROR,
  SUBFUNCTION_ADD_REQUEST,
  SUBFUNCTION_ADD_SUCCESS,
  SUBFUNCTION_ADD_ERROR,
  SUBFUNCTION_EDIT_REQUEST,
  SUBFUNCTION_EDIT_SUCCESS,
  SUBFUNCTION_EDIT_ERROR,
  SUBFUNCTION_DELETE_REQUEST,
  SUBFUNCTION_DELETE_SUCCESS,
  SUBFUNCTION_DELETE_ERROR,
  SUBFUNCTION_UPDATE_REQUEST,
  SUBFUNCTION_UPDATE_SUCCESS,
  SUBFUNCTION_UPDATE_ERROR,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_ERROR,
  EMPLOYEE_ADD_REQUEST,
  EMPLOYEE_ADD_SUCCESS,
  EMPLOYEE_ADD_ERROR,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_ERROR,
  EMPLOYEE_VIEW_REQUEST,
  EMPLOYEE_VIEW_SUCCESS,
  EMPLOYEE_VIEW_ERROR,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_ERROR,
  AADHAR_IMG_REQUEST,
  AADHAR_IMG_SUCCESS,
  AADHAR_IMG_ERROR,
  PAN_IMG_REQUEST,
  PAN_IMG_SUCCESS,
  PAN_IMG_ERROR,
  FUNCTION_DELETE_REQUEST,
  FUNCTION_DELETE_SUCCESS,
  FUNCTION_DELETE_ERROR,
  EMPLOYEE_LIST_UPDATE_HISTORY_REQUEST,
  EMPLOYEE_LIST_UPDATE_HISTORY_SUCCESS,
  EMPLOYEE_LIST_UPDATE_HISTORY_ERROR,
  EMPLOYEE_EXPORT_REQUEST,
  EMPLOYEE_EXPORT_SUCCESS,
  EMPLOYEE_EXPORT_ERROR,
  EMPLOYEE_IMPORT_REQUEST,
  EMPLOYEE_IMPORT_SUCCESS,
  EMPLOYEE_IMPORT_ERROR,
} from '../actions/types'

const initialState = {
  isLoading: false,
  iscmpyLoading:false,
  isImpLoading:false,
  error: '',
  success: '',
  groupListDetails: '',
  empProfHistoryListDetails: '',
  groupDetails: null,
  companyDetails: null,
  locationEditDetails: null,
  isDeleted: false,
  isGALoading: false,
  isGELoading: false,
  locationAddDetails: false,
  showToast: false,
  functionDetails: null,
  employeeListDetails: null,
  subfunctionDetails: null,
  aadharData:null,
  isPanLoading:null,
  panData:{},
  empExportData:null,
  columnNameChk:null,
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GROUP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
        groupListDetails: null,
      }
    case GROUP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        groupListDetails: action.payload,
        success: ' group list success',
      }
    case GROUP_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'group list error',
        success: '',
        groupListDetails: null,
      }
    case GROUP_ADD_REQUEST:
      return {
        ...state,
        isGALoading: true,
        success: '',
      }
    case GROUP_ADD_SUCCESS:
      return {
        ...state,
        isGALoading: false,
        success: ' group add success',
      }
    case GROUP_ADD_ERROR:
      return {
        ...state,
        isGALoading: false,
        error: 'group add error',
        success: '',
      }
    case GROUP_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case GROUP_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: ' group delete success',
        isDeleted: true,
      }
    case GROUP_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'group delete error',
        success: '',
      }
    case GROUP_DETAILS_REQUEST:
      return {
        ...state,
        isGELoading: true,
        groupDetails: null,
        success: '',
      }
    case GROUP_DETAILS_SUCCESS:
      return {
        ...state,
        isGELoading: false,
        groupDetails: action.payload,
        success: ' group delete success',
      }
    case GROUP_DETAILS_ERROR:
      return {
        ...state,
        isGELoading: false,
        groupDetails: null,
        error: 'group delete error',
        success: '',
      }
    case GROUP_UPDATE_REQUEST:
      return {
        ...state,
        isGELoading: true,
      }
    case GROUP_UPDATE_SUCCESS:
      return {
        ...state,
        isGELoading: false,
        success: ' group update success',
      }
    case GROUP_UPDATE_ERROR:
      return {
        ...state,
        isGELoading: false,
        error: 'group update error',
      }

    case COMPANY_LIST_REQUEST:
      return {
        ...state,
        iscmpyLoading: true,
        success: '',
        companyListDetails: null,
      }
    case COMPANY_LIST_SUCCESS:
      return {
        ...state,
        iscmpyLoading: false,
        companyListDetails: action.payload,
        success: 'company list success',
      }
    case COMPANY_LIST_ERROR:
      return {
        ...state,
        iscmpyLoading: false,
        error: 'company list error',
        success: '',
        companyListDetails: null,
      }
    case COMPANY_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case COMPANY_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'company add success',
        showToast: true,
      }
    case MESSAGE_CLEAR:
      return {
        ...state,
        success: '',
        error: '',
        showToast: false,
      }
    case COMPANY_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'company add error',
        success: '',
      }
    case COMPANY_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        companyDetails: null,
      }
    case COMPANY_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companyDetails: action.payload,
        success: 'company edit success',
        showToast: true,
      }
    case COMPANY_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        companyDetails: null,
        error: 'company edit error',
      }
    case COMPANY_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case COMPANY_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'company update success',
      }
    case COMPANY_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'group update error',
      }
    case COMPANY_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case COMPANY_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'company delete success',
        isDeleted: true,
      }
    case COMPANY_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'company delete error',
        success: '',
      }
    case LOCATION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'location list request',
        locationListDetails: null,
      }
    case LOCATION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locationListDetails: action.payload,
        success: ' location list success ',
      }
    case LOCATION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'location list error',
        success: '',
        locationListDetails: null,
      }
    case LOCATION_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'locatiON ADD request',
        // locationAddDetails: null,
      }
    case LOCATION_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // locationAddDetails: action.payload,
        success: 'location add success',
        showToast: true,
      }
    case LOCATION_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'location add error',
        success: '',
        // locationAddDetails: null,
      }

    case LOCATION_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        locationEditDetails: null,
      }
    case LOCATION_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        locationEditDetails: action.payload,
      }
    case LOCATION_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'location edit error',
        success: '',
        locationEditDetails: null,
      }

    case LOCATION_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LOCATION_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'location update success',
        showToast: true,
      }
    case LOCATION_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'location update error',
      }

    case LOCATION_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case LOCATION_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'location delete success',
        isDeleted: true,
      }
    case LOCATION_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'location delete error',
        success: '',
      }

    case FUNCTION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'function list request',
        functionListDetails: null,
      }
    case FUNCTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        functionListDetails: action.payload,
        success: ' function list success ',
      }
    case FUNCTION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function add error',
        success: '',
        functionListDetails: null,
      }
    case FUNCTION_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'function add request',
      }
    case FUNCTION_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'function add success',
        showToast: true,
      }
    case FUNCTION_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function add error',
      }
    case FUNCTION_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case FUNCTION_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        functionDetails: action.payload,
        success: 'function edit success',
      }
    case FUNCTION_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function edit error',
      }
    case FUNCTION_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case FUNCTION_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'function update success',
        showToast: true,
      }
    case FUNCTION_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function update error',
      }
    case SUBFUNCTION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'function list request',
        subfunctionListDetails: null,
      }
    case SUBFUNCTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subfunctionListDetails: action.payload,
        success: 'function list success',
      }
    case SUBFUNCTION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function list error',
        success: '',
        subfunctionListDetails: null,
      }
    case SUBFUNCTION_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case SUBFUNCTION_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'sub function update success',
        showToast: true,
      }
    case SUBFUNCTION_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'sub function update error',
      }
    case EMPLOYEE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success:"employee list success",
        employeeListDetails:action.payload
      };
    case EMPLOYEE_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error:"employee list error",
        employeeListDetails:null
      };
    
    case EMPLOYEE_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'Employee ADD request',
        employeeAddDetails: null,
      }
    case EMPLOYEE_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employeeAddDetails: action.payload,
        success: 'employee add success',
        showToast: true,
      }
    case EMPLOYEE_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'employee add error',
        success: '',
        employeeAddDetails: null,
      }
    case EMPLOYEE_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'employee update success',
        showToast: true,
      }
    case EMPLOYEE_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'employee update error',
        showToast: true,
      }
    case EMPLOYEE_VIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'Employee view request',
        employeeViewDetails: null,
      }
    case EMPLOYEE_VIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employeeViewDetails: action.payload,
        success: 'employee view success',
        showToast: true,
      }
    case EMPLOYEE_VIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'employee view error',
        success: '',
        employeeViewDetails: null,
      }
    
    case EMPLOYEE_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'employee delete success',
        isDeleted: true,
      }
    case EMPLOYEE_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'employee delete error',
        success: '',
      }

    
     case SUBFUNCTION_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'sub function add request',
        subfunctionAddDetails: null,
      }
    case SUBFUNCTION_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subfunctionAddDetails: action.payload,
        success: 'sub function add success',
        showToast: true,
      }
    case SUBFUNCTION_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'sub function add error',
        success: '',
        subfunctionAddDetails: null,
      }

    case SUBFUNCTION_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'function edit request',
        subfunctionEditDetails: null,
      }
    case SUBFUNCTION_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subfunctionEditDetails: action.payload,
        success: 'function edit success',
      }
    case SUBFUNCTION_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function edit error',
        success: '',
        subfunctionEditDetails: null,
      }

    case SUBFUNCTION_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'function delete request',
        // subfunctionAddDetails: null,
      }
    case SUBFUNCTION_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // subfunctionEditDetails: action.payload,
        success: 'function delete success',
        isDeleted: true,
      }
    case SUBFUNCTION_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function delete error',
        success: '',
        // subfunctionAddDetails: null,
      }
    
    case FUNCTION_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'function delete request',
        // subfunctionAddDetails: null,
      }
    case FUNCTION_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // subfunctionEditDetails: action.payload,
        success: 'function delete success',
      }
    case FUNCTION_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'function delete error',
        success: '',
        // subfunctionAddDetails: null,
      }
    case AADHAR_IMG_REQUEST:
      return {
        ...state,
        isAdharLoading: true,
        success: 'aadhar image request',
        aadharData:null
      }
    case AADHAR_IMG_SUCCESS:
      return {
        ...state,
        isAdharLoading: false,
        success: 'aadhar image success',
        aadharData:action.payload
      }
    case AADHAR_IMG_ERROR:
      return {
        ...state,
        isAdharLoading: false,
        error: 'aadhar image error',
        aadharData:null
      }
    case PAN_IMG_REQUEST:
      return {
        ...state,
        isPanLoading: true,
        success: 'pan image request',
        panData:null
      }
    case PAN_IMG_SUCCESS:
      return {
        ...state,
        isPanLoading: false,
        success: 'pan image success',
        panData:action.payload
      }
    case PAN_IMG_ERROR:
      return {
        ...state,
        isPanLoading: false,
        error: 'pan image error',
        panData:null
      }
    case EMPLOYEE_LIST_UPDATE_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
        empProfHistoryListDetails: null,
      }
    case EMPLOYEE_LIST_UPDATE_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        empProfHistoryListDetails: action.payload,
        success: 'Employee list success',
      }
    case EMPLOYEE_LIST_UPDATE_HISTORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'Employee list error',
        success: '',
        empProfHistoryListDetails: null,
      }
    case EMPLOYEE_EXPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
        empExportData: null,
      }
    case EMPLOYEE_EXPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        empExportData: action.payload,
        success: 'Employee export success',
        showToast: true,
      }
    case EMPLOYEE_EXPORT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'Employee export error',
      }
    case EMPLOYEE_IMPORT_REQUEST:
      return {
        ...state,
        isImpLoading: true,
        success: '',
      }
    case EMPLOYEE_IMPORT_SUCCESS:
      return {
        ...state,
        isImpLoading: false,
        success: 'Employee import success',
      }
    case EMPLOYEE_IMPORT_ERROR:
      return {
        ...state,
        isImpLoading: false,
        error: 'Employee import error',
      }
    default:
      return state
  }
}
