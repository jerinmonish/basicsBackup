/* eslint-disable no-dupe-keys */
import {
  GROUP_ONLY_REQUEST,
  GROUP_ONLY_ERROR,
  GROUP_ONLY_SUCCESS,
  COMMON_TYPE_OF_ORG_REQUEST,
  COMMON_TYPE_OF_ORG_ERROR,
  COMMON_TYPE_OF_ORG_SUCCESS,
  COMMON_TYPE_COUNTRY_REQUEST,
  COMMON_TYPE_COUNTRY_ERROR,
  COMMON_TYPE_COUNTRY_SUCCESS,
  COMMON_TYPE_STATE_REQUEST,
  COMMON_TYPE_STATE_SUCCESS,
  COMMON_TYPE_STATE_ERROR,
  COMMON_TYPE_CURR_REQUEST,
  COMMON_TYPE_CURR_SUCCESS,
  COMMON_TYPE_CURR_ERROR,
  COMMON_TYPE_DISTRICT_REQUEST,
  COMMON_TYPE_DISTRICT_SUCCESS,
  COMMON_TYPE_DISTRICT_ERROR,
  COMMON_INDUSTRY_TYPE_REQUEST,
  COMMON_INDUSTRY_TYPE_SUCCESS,
  COMMON_INDUSTRY_TYPE_ERROR,
  COMMON_TYPE_COMPANYLIST_REQUEST,
  COMMON_TYPE_COMPANYLIST_SUCCESS,
  COMMON_TYPE_COMPANYLIST_ERROR,
  COMMON_TYPE_COSTCENTER_REQUEST,
  COMMON_TYPE_COSTCENTER_SUCCESS,
  COMMON_TYPE_COSTCENTER_ERROR,
  COMMON_COMPANY_CUSTOM_REQUEST,
  COMMON_COMPANY_CUSTOM_SUCCESS,
  COMMON_COMPANY_CUSTOM_ERROR,
  COMMON_TYPE_PARENT_SUCCESS,
  COMMON_TYPE_PARENT_REQUEST,
  COMMON_TYPE_PARENT_ERROR,
  COMMON_TYPE_DESIGNATION_REQUEST,
  COMMON_TYPE_DESIGNATION_SUCCESS,
  COMMON_TYPE_DESIGNATION_ERROR,
  COMMON_TYPE_LEAVINGREASON_REQUEST,
  COMMON_TYPE_LEAVINGREASON_SUCCESS,
  COMMON_TYPE_LEAVINGREASON_ERROR,
  COMMON_TYPE_BLOODGROUP_REQUEST,
  COMMON_TYPE_BLOODGROUP_SUCCESS,
  COMMON_TYPE_BLOODGROUP_ERROR,
  COMMON_TYPE_RELIGION_REQUEST,
  COMMON_TYPE_RELIGION_SUCCESS,
  COMMON_TYPE_RELIGION_ERROR,
  COMMON_TYPE_EMPLOYEE_SUCCESS,
  COMMON_TYPE_EMPLOYEE_REQUEST,
  COMMON_TYPE_EMPLOYEE_ERROR,
  COMMON_TYPE_WORKINGTIME_REQUEST,
  COMMON_TYPE_WORKINGTIME_SUCCESS,
  COMMON_TYPE_WORKINGTIME_ERROR,
  COMMON_TYPE_FUNCTION_REQUEST,
  COMMON_TYPE_FUNCTION_ERROR,
  COMMON_TYPE_FUNCTION_SUCCESS,
  COMMON_TYPE_SUBFUNCTION_REQUEST,
  COMMON_TYPE_SUBFUNCTION_SUCCESS,
  COMMON_TYPE_SUBFUNCTION_ERROR,
  PIE_GRAPH_REQUEST,
  PIE_GRAPH_SUCCESS,
  PIE_GRAPH_ERROR,
  COMMON_TYPE_LOC_FUN_REQUEST,
  COMMON_TYPE_LOC_FUN_SUCCESS,
  COMMON_TYPE_LOC_FUN_ERROR,
  COMMON_TYPE_PAYGRADE_REQUEST,
  COMMON_TYPE_PAYGRADE_SUCCESS,
  COMMON_TYPE_PAYGRADE_ERROR,
  COMMON_TYPE_LOCATION_REQUEST,
  COMMON_TYPE_LOCATION_SUCCESS,
  COMMON_TYPE_LOCATION_ERROR,
  COMMON_TYPE_EMPLOYEEMENT_REQUEST,
  COMMON_TYPE_EMPLOYEEMENT_SUCCESS,
  COMMON_TYPE_EMPLOYEEMENT_ERROR,
  COMMON_TYPE_JOB_REQUEST,
  COMMON_TYPE_JOB_SUCCESS,
  COMMON_TYPE_JOB_ERROR,
  COST_CENTER_RM_JOB_REQUEST,
  COST_CENTER_RM_JOB_SUCCESS,
  COST_CENTER_RM_JOB_ERROR,
  COMMON_TYPE_JOB_POSTION_REQUEST,
  COMMON_TYPE_JOB_POSTION_SUCCESS,
  COMMON_TYPE_JOB_POSTION_ERROR,
  COMMON_TYPE_ROLE_REQUEST,
  COMMON_TYPE_ROLE_SUCCESS,
  COMMON_TYPE_ROLE_ERROR,
  COMMON_TYPE_MEDIUM_REQUEST,
  COMMON_TYPE_MEDIUM_SUCCESS,
  COMMON_TYPE_MEDIUM_ERROR,
  COMMON_TYPE_LEAVETYPE_REQUEST,
  COMMON_TYPE_LEAVETYPE_SUCCESS,
  COMMON_TYPE_LEAVETYPE_ERROR,
  COMMON_TYPE_HREMPLOYEE_REQUEST,
  COMMON_TYPE_HREMPLOYEE_SUCCESS,
  COMMON_TYPE_HREMPLOYEE_ERROR,
  COMMON_UA_TYPE_COUNTRY_REQUEST,
  COMMON_UA_TYPE_COUNTRY_SUCCESS,
  COMMON_UA_TYPE_COUNTRY_ERROR,
  COMMON_UA_TYPE_STATE_REQUEST,
  COMMON_UA_TYPE_STATE_SUCCESS,
  COMMON_UA_TYPE_STATE_ERROR,
  COMMON_UA_TYPE_DISTRICT_REQUEST,
  COMMON_UA_TYPE_DISTRICT_ERROR,
  COMMON_UA_TYPE_DISTRICT_SUCCESS,
  COMMON_TYPE_GET_REPORT_MANAGER_REQUEST,
  COMMON_TYPE_GET_REPORT_MANAGER_ERROR,
  COMMON_TYPE_GET_REPORT_MANAGER_SUCCESS,
  COMMON_MAINTYPES_LIST_REQUEST,
  COMMON_MAINTYPES_LIST_SUCCESS,
  COMMON_MAINTYPES_LIST_ERROR,
  REMAININGLEAVE_LIST_REQUEST,
  REMAININGLEAVE_LIST_SUCCESS,
  REMAININGLEAVE_LIST_ERROR

} from '../actions/types'

const initialState = {
  isGPLoading: false,
  isTPOLoading: false,
  isCOULoading: false,
  isSTATELoading: false,
  isCURRLoading: false,
  isDISTLoading: false,
  isGRA1Loading: false,
  isLOCFUNCLoading:false,
  isPaygradeLoading:false,
  isUACOULoading: false,
  isUASTATELoading: false,
  isUADISTLoading: false,
  isManagerLoading: false,
  isMainTypeLoading:false,
  error: '',
  success: '',
  groupComData: null,
  funcLocComData: null,
  typeOfOrgData: null,
  countryCommonData: null,
  stateCommonData: null,
  currencyCommonData: null,
  districtCommonData: null,
  companyCommonCustomData: null,
  dashboard1ChartData: null,
  paygradeComData:null,
  locationCommonData: null,
  joblistComData:null,
  ccdropdownData:null,
  jobpostionComData:null,
  roleCommonData: null,
  isroleloading: false,
  leaveTypesCommonData: null,
  uaCountryCommonData: null,
  uaStateCommonData: null,
  uaDistrictCommonData: null,
  managerCommonData:null,
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GROUP_ONLY_REQUEST:
      return {
        ...state,
        isGPLoading: true,
        success: '',
      }
    case GROUP_ONLY_SUCCESS:
      return {
        ...state,
        isGPLoading: false,
        success: 'group list success',
        groupComData: action.payload,
      }
    case GROUP_ONLY_ERROR:
      return {
        ...state,
        isGPLoading: false,
        error: 'group list error',
        success: '',
      }
    case COMMON_TYPE_OF_ORG_REQUEST:
      return {
        ...state,
        isTPOLoading: true,
        success: '',
      }
    case COMMON_TYPE_OF_ORG_SUCCESS:
      return {
        ...state,
        isTPOLoading: false,
        success: 'type of organization list success',
        typeOfOrgData: action.payload,
      }
    case COMMON_TYPE_OF_ORG_ERROR:
      return {
        ...state,
        isTPOLoading: false,
        error: 'type of organization list error',
        success: '',
      }
    case COMMON_TYPE_COUNTRY_REQUEST:
      return {
        ...state,
        isCOULoading: true,
        success: '',
      }
    case COMMON_TYPE_COUNTRY_SUCCESS:
      return {
        ...state,
        isCOULoading: false,
        success: 'country list success',
        countryCommonData: action.payload,
      }
    case COMMON_TYPE_COUNTRY_ERROR:
      return {
        ...state,
        isCOULoading: false,
        error: 'country list error',
        success: '',
      }
    case COMMON_TYPE_STATE_REQUEST:
      return {
        ...state,
        isSTATELoading: true,
        success: '',
      }
    case COMMON_TYPE_STATE_SUCCESS:
      return {
        ...state,
        isSTATELoading: false,
        success: 'state list success',
        stateCommonData: action.payload,
      }
    case COMMON_TYPE_STATE_ERROR:
      return {
        ...state,
        isSTATELoading: false,
        error: 'state list error',
        success: '',
      }
    case COMMON_TYPE_CURR_REQUEST:
      return {
        ...state,
        isCURRLoading: true,
        success: '',
      }
    case COMMON_TYPE_CURR_SUCCESS:
      return {
        ...state,
        isCURRLoading: false,
        success: 'currency list success',
        currencyCommonData: action.payload,
      }
    case COMMON_TYPE_CURR_ERROR:
      return {
        ...state,
        isCURRLoading: false,
        error: 'currency list error',
        success: '',
      }
    case COMMON_TYPE_DISTRICT_REQUEST:
      return {
        ...state,
        isDISTLoading: true,
        success: '',
      }
    case COMMON_TYPE_DISTRICT_SUCCESS:
      return {
        ...state,
        isDISTLoading: false,
        success: 'district list success',
        districtCommonData: action.payload,
      }
    case COMMON_TYPE_DISTRICT_ERROR:
      return {
        ...state,
        isDISTLoading: false,
        error: 'district list error',
        success: '',
      }
    case COMMON_INDUSTRY_TYPE_REQUEST:
      return {
        ...state,
        isIndustryLoading: true,
        success: '',
      }
    case COMMON_INDUSTRY_TYPE_SUCCESS:
      return {
        ...state,
        isIndustryLoading: false,
        success: 'industrytype list success',
        industryCommonData: action.payload,
      }
    case COMMON_INDUSTRY_TYPE_ERROR:
      return {
        ...state,
        isIndustryLoading: false,
        error: 'industrytype list error',
        success: '',
      }

    case COMMON_TYPE_COMPANYLIST_REQUEST:
      return {
        ...state,
        isCompanyDropdownListLoading: true,
        success: '',
      }
    case COMMON_TYPE_COMPANYLIST_SUCCESS:
      return {
        ...state,
        isCompanyDropdownListLoading: false,
        success: 'company dropdown list success',
        companyCommonData: action.payload,
      }
    case COMMON_TYPE_COMPANYLIST_ERROR:
      return {
        ...state,
        isCompanyDropdownListLoading: false,
        error: 'company dropdown list error',
        success: '',
      }

      case COMMON_TYPE_LOCATION_REQUEST:
        return {
          ...state,
          islocationDropdownListLoading: true,
          success: '',
        }
      case COMMON_TYPE_LOCATION_SUCCESS:
        return {
          ...state,
          islocationDropdownListLoading: false,
          success: 'location dropdown list success',
          locationCommonData: action.payload,
        }
      case COMMON_TYPE_LOCATION_ERROR:
        return {
          ...state,
          islocationDropdownListLoading: false,
          error: 'location dropdown list error',
          success: '',
        }

    case COMMON_TYPE_COSTCENTER_REQUEST:
      return {
        ...state,
        isCostCenterDropdownListLoading: true,
        success: '',
      }
    case COMMON_TYPE_COSTCENTER_SUCCESS:
      return {
        ...state,
        isCostCenterDropdownListLoading: false,
        success: 'company dropdown list success',
        costCenterCommonData: action.payload,
      }
    case COMMON_TYPE_COSTCENTER_ERROR:
      return {
        ...state,
        isCostCenterDropdownListLoading: false,
        error: 'company dropdown list error',
        success: '',
      }
    case COMMON_COMPANY_CUSTOM_REQUEST:
      return {
        ...state,
        companyCommonCustomData: null,
        success: '',
      }
    case COMMON_COMPANY_CUSTOM_SUCCESS:
      return {
        ...state,
        companyCommonCustomData: false,
        success: 'company common list success',
        companyCommonCustomData: action.payload,
      }
    case COMMON_COMPANY_CUSTOM_ERROR:
      return {
        ...state,
        companyCommonCustomData: null,
        error: 'company common list error',
        success: '',
      }
    
    
     case COMMON_TYPE_ROLE_REQUEST:
      return {
        ...state,
        isroleloading: true,
        success: '',
      }
    case COMMON_TYPE_ROLE_SUCCESS:
      return {
        ...state,
        isroleloading: false,
        success: 'role dropdown list success',
        roleCommonData: action.payload,
      }
    case COMMON_TYPE_ROLE_ERROR:
      return {
        ...state,
        isroleloading: false,
        error: 'role dropdown list error',
        success: '',
      }


    case COMMON_TYPE_PARENT_REQUEST:
      return {
        ...state,
        parentCommonData: null,
        success: '',
      }
    case COMMON_TYPE_PARENT_SUCCESS:
      return {
        ...state,
        parentCommonData: false,
        success: 'company common list success',
        parentCommonData: action.payload,
      }
    case COMMON_TYPE_PARENT_ERROR:
      return {
        ...state,
        parentCommonData: null,
        error: 'company common list error',
        success: '',
      }
    
      case COMMON_TYPE_DESIGNATION_REQUEST:
      return {
        ...state,
        designationCommonData: null,
        success: '',
      }
    case COMMON_TYPE_DESIGNATION_SUCCESS:
      return {
        ...state,
        designationCommonData: false,
        success: 'designationCommonData common list success',
        // eslint-disable-next-line no-dupe-keys
        designationCommonData: action.payload,
      }
    case COMMON_TYPE_DESIGNATION_ERROR:
      return {
        ...state,
        designationCommonData: null,
        error: 'designationCommonData common list error',
        success: '',
      }
    
      case COMMON_TYPE_LEAVINGREASON_REQUEST:
      return {
        ...state,
        leavingCommonData: null,
        success: '',
      }
    case COMMON_TYPE_LEAVINGREASON_SUCCESS:
      return {
        ...state,
        leavingCommonData: false,
        success: 'leavingCommonData common list success',
        leavingCommonData: action.payload,
      }
    case COMMON_TYPE_LEAVINGREASON_ERROR:
      return {
        ...state,
        leavingCommonData: null,
        error: 'leavingCommonData common list error',
        success: '',
      }
    
          case COMMON_TYPE_BLOODGROUP_REQUEST:
      return {
        ...state,
        bloodCommonData: null,
        success: '',
      }
    case COMMON_TYPE_BLOODGROUP_SUCCESS:
      return {
        ...state,
        bloodCommonData: false,
        success: 'bloodCommonData common list success',
        bloodCommonData: action.payload,
      }
    case COMMON_TYPE_BLOODGROUP_ERROR:
      return {
        ...state,
        bloodCommonData: null,
        error: 'bloodCommonData common list error',
        success: '',
      }
    
       case COMMON_TYPE_RELIGION_REQUEST:
      return {
        ...state,
        religionCommonData: null,
        success: '',
      }
    case COMMON_TYPE_RELIGION_SUCCESS:
      return {
        ...state,
        religionCommonData: false,
        success: 'relitionCommonData common list success',
        religionCommonData: action.payload,
      }
    case COMMON_TYPE_RELIGION_ERROR:
      return {
        ...state,
        religionCommonData: null,
        error: 'relitionCommonData common list error',
        success: '',
      }
    
    case COMMON_TYPE_EMPLOYEE_REQUEST:
      return {
        ...state,
        employeeCommonData: null,
        success: '',
      }
    case COMMON_TYPE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeeCommonData: false,
        success: 'employeeCommonData common list success',
        employeeCommonData: action.payload,
      }
    case COMMON_TYPE_EMPLOYEE_ERROR:
      return {
        ...state,
        employeeCommonData: null,
        error: 'employeeCommonData  list error',
        success: '',
      }
    
        case COMMON_TYPE_EMPLOYEEMENT_REQUEST:
      return {
        ...state,
        employeeMentCommonData: null,
        success: '',
      }
    case COMMON_TYPE_EMPLOYEEMENT_SUCCESS:
      return {
        ...state,
        employeeMentCommonData: false,
        success: 'employeement CommonData common list success',
        employeeMentCommonData: action.payload,
      }
    case COMMON_TYPE_EMPLOYEEMENT_ERROR:
      return {
        ...state,
        employeeMentCommonData: null,
        error: 'employeement CommonData  list error',
        success: '',
      }
    
    
    case COMMON_TYPE_WORKINGTIME_REQUEST:
      return {
        ...state,
        workingTimeCommonData: null,
        success: '',
      }
    case COMMON_TYPE_WORKINGTIME_SUCCESS:
      return {
        ...state,
        workingTimeCommonData: false,
        success: 'workingTimeCommonData  list success',
        workingTimeCommonData: action.payload,
      }
    case COMMON_TYPE_WORKINGTIME_ERROR:
      return {
        ...state,
        workingTimeCommonData: null,
        error: 'workingTimeCommonData  list error',
        success: '',
      }
    
    case COMMON_TYPE_FUNCTION_REQUEST:
      return {
        ...state,
        functionCommonData: null,
        success: '',
      }
    case COMMON_TYPE_FUNCTION_SUCCESS:
      return {
        ...state,
        functionCommonData: false,
        success: 'functionCommonData  list success',
        functionCommonData: action.payload,
      }
    case COMMON_TYPE_FUNCTION_ERROR:
      return {
        ...state,
        functionCommonData: null,
        error: 'functionCommonData  list error',
        success: '',
      }
    case COMMON_TYPE_SUBFUNCTION_REQUEST:
      return {
        ...state,
        subfunctionCommonData: null,
        success: '',
      }
    case COMMON_TYPE_SUBFUNCTION_SUCCESS:
      return {
        ...state,
        subfunctionCommonData: false,
        success: 'functionCommonData  list success',
        subfunctionCommonData: action.payload,
      }
    case COMMON_TYPE_SUBFUNCTION_ERROR:
      return {
        ...state,
        subfunctionCommonData: null,
        error: 'functionCommonData  list error',
        success: '',
      }
    case PIE_GRAPH_REQUEST:
      return {
        ...state,
        isGRA1Loading: true,
        success: '',
      }
    case PIE_GRAPH_SUCCESS:
      return {
        ...state,
        isGRA1Loading: false,
        success: 'dashboard1 list success',
        dashboard1ChartData: action.payload,
      }
    case PIE_GRAPH_ERROR:
      return {
        ...state,
        isGRA1Loading: false,
        error: 'dashboard1 list error',
        success: '',
      }
    case COMMON_TYPE_LOC_FUN_REQUEST:
      return {
        ...state,
        isLOCFUNCLoading: true,
        success: '',
      }
    case COMMON_TYPE_LOC_FUN_SUCCESS:
      return {
        ...state,
        isLOCFUNCLoading: false,
        success: 'function data success',
        funcLocComData: action.payload,
      }
    case COMMON_TYPE_LOC_FUN_ERROR:
      return {
        ...state,
        isLOCFUNCLoading: false,
        error: 'function data error',
        success: '',
      }

      case COMMON_TYPE_PAYGRADE_REQUEST:
        return {
          ...state,
          isPaygradeLoading: true,
          success: '',
        }
      case COMMON_TYPE_PAYGRADE_SUCCESS:
        return {
          ...state,
          isPaygradeLoading: false,
          success: 'paygrade data success',
          paygradeComData: action.payload,
        }
      case COMMON_TYPE_PAYGRADE_ERROR:
        return {
          ...state,
          isPaygradeLoading: false,
          error: 'paygrade data error',
          success: '',
        }
      case COST_CENTER_RM_JOB_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case COST_CENTER_RM_JOB_SUCCESS:
        return {
          ...state,
          isLoading: false,
          ccdropdownData: action.payload,
        }
      case COST_CENTER_RM_JOB_ERROR:
        return {
          ...state,
          isLoading: false,
        }
      case COMMON_TYPE_JOB_REQUEST:
        return {
          ...state,
          jobLoading: true,
          success: '',
        }
      case COMMON_TYPE_JOB_SUCCESS:
        return {
          ...state,
          isPaygradeLoading: false,
          success: 'paygrade data success',
          joblistComData: action.payload,
        }
      case COMMON_TYPE_JOB_ERROR:
        return {
          ...state,
          isPaygradeLoading: false,
          error: 'paygrade data error',
          success: '',
        }
        case COMMON_TYPE_JOB_POSTION_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case COMMON_TYPE_JOB_POSTION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          jobpostionComData: action.payload,
        }
      case COMMON_TYPE_JOB_POSTION_ERROR:
        return {
          ...state,
          isLoading: false,
        }
    
    case COMMON_TYPE_MEDIUM_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case COMMON_TYPE_MEDIUM_SUCCESS:
        return {
          ...state,
          isLoading: false,
          mediumComData: action.payload,
        }
      case COMMON_TYPE_MEDIUM_ERROR:
        return {
          ...state,
          isLoading: false,
        }
    
    case COMMON_TYPE_LEAVETYPE_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case COMMON_TYPE_LEAVETYPE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          leaveTypesCommonData: action.payload,
        }
      case COMMON_TYPE_LEAVETYPE_ERROR:
        return {
          ...state,
          isLoading: false,
        }
    
     case COMMON_TYPE_HREMPLOYEE_REQUEST:
        return {
          ...state,
          isLoading: true,
        }
      case COMMON_TYPE_HREMPLOYEE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          hrEmployeeCommonData: action.payload,
        }
      case COMMON_TYPE_HREMPLOYEE_ERROR:
        return {
          ...state,
          isLoading: false,
        }
    case COMMON_UA_TYPE_COUNTRY_REQUEST:
      return {
        ...state,
        isUACOULoading: true,
        success: '',
      }
    case COMMON_UA_TYPE_COUNTRY_SUCCESS:
      return {
        ...state,
        isUACOULoading: false,
        success: 'country list success',
        uaCountryCommonData: action.payload,
      }
    case COMMON_UA_TYPE_COUNTRY_ERROR:
      return {
        ...state,
        isUACOULoading: false,
        error: 'country list error',
        success: '',
      }
    case COMMON_UA_TYPE_STATE_REQUEST:
      return {
        ...state,
        isUASTATELoading: true,
        success: '',
      }
    case COMMON_UA_TYPE_STATE_SUCCESS:
      return {
        ...state,
        isUASTATELoading: false,
        success: 'state list success',
        uaStateCommonData: action.payload,
      }
    case COMMON_UA_TYPE_STATE_ERROR:
      return {
        ...state,
        isUASTATELoading: false,
        error: 'state list error',
        success: '',
      }

      case COMMON_UA_TYPE_DISTRICT_REQUEST:
      return {
        ...state,
        isUADISTLoading: true,
        success: '',
      }
    case COMMON_UA_TYPE_DISTRICT_SUCCESS:
      return {
        ...state,
        isUADISTLoading: false,
        success: 'district list success',
        uaDistrictCommonData: action.payload,
      }
    case COMMON_UA_TYPE_DISTRICT_ERROR:
      return {
        ...state,
        isUADISTLoading: false,
        error: 'district list error',
        success: '',
      }
    case COMMON_TYPE_GET_REPORT_MANAGER_REQUEST:
      return {
        ...state,
        isManagerLoading: true,
        success: '',
      }
    case COMMON_TYPE_GET_REPORT_MANAGER_SUCCESS:
      return {
        ...state,
        isManagerLoading: false,
        success: 'manager list success',
        managerCommonData: action.payload,
      }
    case COMMON_TYPE_GET_REPORT_MANAGER_ERROR:
      return {
        ...state,
        isManagerLoading: false,
        error: 'manager list error',
        success: '',
      }
    
    case COMMON_MAINTYPES_LIST_REQUEST:
      return {
        ...state,
        isMainTypeLoading: true,
        success: '',
      }
    case COMMON_MAINTYPES_LIST_SUCCESS:
      return {
        ...state,
        isMainTypeLoading: false,
        success: 'maintypes common list success',
        mainTypeCommonData: action.payload,
      }
    case COMMON_MAINTYPES_LIST_ERROR:
      return {
        ...state,
        isMainTypeLoading: false,
        error: 'maintypes common list error',
        success: '',
      }
    
     case REMAININGLEAVE_LIST_REQUEST:
      return {
        ...state,
        isRemaingLoading: true,
        success: '',
      }
    case REMAININGLEAVE_LIST_SUCCESS:
      return {
        ...state,
        isRemaingLoading: false,
        success: 'RemaingLoading common list success',
        reMainginCommonData: action.payload,
      }
    case REMAININGLEAVE_LIST_ERROR:
      return {
        ...state,
        isRemaingLoading: false,
        error: 'RemaingLoading common list error',
        success: '',
      }
    
    default:
      return state
  }
}
