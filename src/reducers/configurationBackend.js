import {
  RELATIONSHIP_LIST_REQUEST,
  RELATIONSHIP_LIST_ERROR,
  RELATIONSHIP_LIST_SUCCESS,
  INDUSTRYTYPE_LIST_REQUEST,
  INDUSTRYTYPE_LIST_ERROR,
  INDUSTRYTYPE_LIST_SUCCESS,
  PAYGRADE_LIST_REQUEST,
  PAYGRADE_LIST_ERROR,
  PAYGRADE_LIST_SUCCESS,
  CASTE_LIST_REQUEST,
  CASTE_LIST_ERROR,
  CASTE_LIST_SUCCESS,
  DESIGNATION_LIST_REQUEST,
  DESIGNATION_LIST_ERROR,
  DESIGNATION_LIST_SUCCESS,
  BANK_LIST_REQUEST,
  BANK_LIST_ERROR,
  BANK_LIST_SUCCESS,
  COSTCENTER_LIST_REQUEST,
  COSTCENTER_LIST_ERROR,
  COSTCENTER_LIST_SUCCESS,
  BLOODGROUP_LIST_REQUEST,
  BLOODGROUP_LIST_ERROR,
  BLOODGROUP_LIST_SUCCESS,
  RELIGION_LIST_REQUEST,
  RELIGION_LIST_ERROR,
  RELIGION_LIST_SUCCESS,
  STUDYLEVEL_LIST_REQUEST,
  STUDYLEVEL_LIST_ERROR,
  STUDYLEVEL_LIST_SUCCESS,
  STUDYPROGRAM_LIST_REQUEST,
  STUDYPROGRAM_LIST_ERROR,
  STUDYPROGRAM_LIST_SUCCESS,
  STUDYLEVEL_UA_LIST_REQUEST,
  STUDYLEVEL_UA_LIST_ERROR,
  STUDYLEVEL_UA_LIST_SUCCESS,
  STUDYPROGRAM_UA_LIST_REQUEST,
  STUDYPROGRAM_UA_LIST_ERROR,
  STUDYPROGRAM_UA_LIST_SUCCESS,
  EMPLOYMENT_LIST_REQUEST,
  EMPLOYMENT_LIST_ERROR,
  EMPLOYMENT_LIST_SUCCESS,
  LEAVINGREASON_LIST_REQUEST,
  LEAVINGREASON_LIST_ERROR,
  LEAVINGREASON_LIST_SUCCESS,
  DISTRICT_LIST_REQUEST,
  DISTRICT_LIST_ERROR,
  DISTRICT_LIST_SUCCESS,
  ORGANIZATION_LIST_REQUEST,
  ORGANIZATION_LIST_ERROR,
  ORGANIZATION_LIST_SUCCESS,
  ORGANIZATION_ADD_REQUEST,
  ORGANIZATION_ADD_ERROR,
  ORGANIZATION_ADD_SUCCESS,
  ORGANIZATION_DELETE_REQUEST,
  ORGANIZATION_DELETE_ERROR,
  ORGANIZATION_DELETE_SUCCESS,
  ORGANIZATION_DETAILS_REQUEST,
  ORGANIZATION_DETAILS_ERROR,
  ORGANIZATION_DETAILS_SUCCESS,
  ORGANIZATION_UPDATE_REQUEST,
  ORGANIZATION_UPDATE_ERROR,
  ORGANIZATION_UPDATE_SUCCESS,
  WORKTIME_LIST_REQUEST,
  WORKTIME_LIST_ERROR,
  WORKTIME_LIST_SUCCESS,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_ERROR,
  COUNTRY_LIST_SUCCESS,
  STATE_LIST_REQUEST,
  STATE_LIST_ERROR,
  STATE_LIST_SUCCESS,
  CASTE_ADD_REQUEST,
  CASTE_ADD_SUCCESS,
  CASTE_ADD_ERROR,
  JOB_CONFIG_LIST_REQUEST,
  JOB_CONFIG_LIST_SUCCESS,
  JOB_CONFIG_LIST_ERROR,
  JOB_CONFIG_ADD_REQUEST,
  JOB_CONFIG_ADD_SUCCESS,
  JOB_CONFIG_ADD_ERROR,
  MESSAGE_CLEAR,
  JOB_CONFIG_EDIT_REQUEST,
  JOB_CONFIG_EDIT_SUCCESS,
  JOB_CONFIG_EDIT_ERROR,
  JOB_CONFIG_UPDATE_REQUEST,
  JOB_CONFIG_UPDATE_SUCCESS,
  JOB_CONFIG_UPDATE_ERROR,
  JOB_CONFIG_DELETE_REQUEST,
  JOB_CONFIG_DELETE_ERROR,
  JOB_CONFIG_DELETE_SUCCESS,
  CASTE_DETAILS_ERROR,
  CASTE_DETAILS_REQUEST,
  CASTE_DETAILS_SUCCESS,
  CASTE_UPDATE_REQUEST,
  CASTE_UPDATE_SUCCESS,
  CASTE_UPDATE_ERROR,
  CASTE_DELETE_REQUEST,
  CASTE_DELETE_SUCCESS,
  CASTE_DELETE_ERROR,
  BANK_ADD_REQUEST,
  BANK_ADD_SUCCESS,
  BANK_ADD_ERROR,
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  BANK_DETAILS_ERROR,
  BANK_UPDATE_REQUEST,
  BANK_UPDATE_SUCCESS,
  BANK_UPDATE_ERROR,
  BANK_DELETE_REQUEST,
  BANK_DELETE_SUCCESS,
  BANK_DELETE_ERROR,
  DESIGNATION_ADD_REQUEST,
  DESIGNATION_ADD_SUCCESS,
  DESIGNATION_ADD_ERROR,
  DESIGNATION_DETAILS_REQUEST,
  DESIGNATION_DETAILS_SUCCESS,
  DESIGNATION_DETAILS_ERROR,
  DESIGNATION_UPDATE_REQUEST,
  DESIGNATION_UPDATE_SUCCESS,
  DESIGNATION_UPDATE_ERROR,
  DESIGNATION_DELETE_REQUEST,
  DESIGNATION_DELETE_SUCCESS,
  DESIGNATION_DELETE_ERROR,
  PAYGRADE_ADD_REQUEST,
  PAYGRADE_ADD_SUCCESS,
  PAYGRADE_ADD_ERROR,
  PAYGRADE_DETAILS_REQUEST,
  PAYGRADE_DETAILS_SUCCESS,
  PAYGRADE_DETAILS_ERROR,
  PAYGRADE_UPDATE_REQUEST,
  PAYGRADE_UPDATE_SUCCESS,
  PAYGRADE_UPDATE_ERROR,
  PAYGRADE_DELETE_REQUEST,
  PAYGRADE_DELETE_SUCCESS,
  PAYGRADE_DELETE_ERROR,
  COSTCENTER_ADD_REQUEST,
  COSTCENTER_ADD_SUCCESS,
  COSTCENTER_ADD_ERROR,
  JOB_POSITION_CONFIG_LIST_REQUEST,
  JOB_POSITION_CONFIG_LIST_SUCCESS,
  JOB_POSITION_CONFIG_LIST_ERROR,
  JOB_POSITION_CONFIG_ADD_REQUEST,
  JOB_POSITION_CONFIG_ADD_SUCCESS,
  JOB_POSITION_CONFIG_ADD_ERROR,
  JOB_POSITION_CONFIG_EDIT_REQUEST,
  JOB_POSITION_CONFIG_EDIT_SUCCESS,
  JOB_POSITION_CONFIG_EDIT_ERROR,
  JOB_POSITION_CONFIG_DELETE_REQUEST,
  JOB_POSITION_CONFIG_DELETE_SUCCESS,
  JOB_POSITION_CONFIG_DELETE_ERROR,
  JOB_POSITION_CONFIG_UPDATE_REQUEST,
  JOB_POSITION_CONFIG_UPDATE_SUCCESS,
  JOB_POSITION_CONFIG_UPDATE_ERROR,
  CUS_MENU_CONFIG_LIST_REQUEST,
  CUS_MENU_CONFIG_LIST_SUCCESS,
  CUS_MENU_CONFIG_LIST_ERROR,
  CUS_MENU_CONFIG_EDIT_REQUEST,
  CUS_MENU_CONFIG_EDIT_SUCCESS,
  CUS_MENU_CONFIG_EDIT_ERROR,
  CUS_MENU_CONFIG_UPDATE_REQUEST,
  CUS_MENU_CONFIG_UPDATE_SUCCESS,
  CUS_MENU_CONFIG_UPDATE_ERROR,
  COSTCENTER_DELETE_REQUEST,
  COSTCENTER_DELETE_SUCCESS,
  COSTCENTER_DELETE_ERROR,
  COSTCENTER_EDITDETAILS_REQUEST,
  COSTCENTER_EDITDETAILS_SUCCESS,
  COSTCENTER_EDITDETAILS_ERROR,
  COSTCENTER_UPDATE_REQUEST,
  COSTCENTER_UPDATE_SUCCESS,
  COSTCENTER_UPDATE_ERROR,
  EMP_FAM_ADD_REQUEST,
  EMP_FAM_ADD_SUCCESS,
  EMP_FAM_ADD_ERROR,
  EMP_WE_ADD_REQUEST,
  EMP_WE_ADD_SUCCESS,
  EMP_WE_ADD_ERROR,
  EMP_EDU_ADD_REQUEST,
  EMP_EDU_ADD_SUCCESS,
  EMP_EDU_ADD_ERROR,
  EMP_BANK_ADD_REQUEST,
  EMP_BANK_ADD_SUCCESS,
  EMP_BANK_ADD_ERROR,
  EMP_WE_DELETE_REQUEST,
  EMP_WE_DELETE_SUCCESS,
  EMP_WE_DELETE_ERROR,
  EMP_WE_DETAILS_REQUEST,
  EMP_WE_DETAILS_SUCCESS,
  EMP_WE_DETAILS_ERROR,
  EMP_WE_UPDATE_REQUEST,
  EMP_WE_UPDATE_SUCCESS,
  EMP_WE_UPDATE_ERROR,
  EMP_FAM_DELETE_REQUEST,
  EMP_FAM_DELETE_SUCCESS,
  EMP_FAM_DELETE_ERROR,
  EMP_FAM_EDITDETAILS_REQUEST,
  EMP_FAM_EDITDETAILS_SUCCESS,
  EMP_FAM_EDITDETAILS_ERROR,
  EMP_FAM_UPDATE_REQUEST,
  EMP_FAM_UPDATE_SUCCESS,
  EMP_FAM_UPDATE_ERROR,
  EMP_BANK_EDITDETAILS_REQUEST,
  EMP_BANK_EDITDETAILS_SUCCESS,
  EMP_BANK_EDITDETAILS_ERROR,
  EMP_BANK_UPDATE_REQUEST,
  EMP_BANK_UPDATE_SUCCESS,
  EMP_BANK_UPDATE_ERROR,
  EMP_BANK_DELETE_REQUEST,
  EMP_BANK_DELETE_SUCCESS,
  EMP_BANK_DELETE_ERROR,
  EMP_EDU_DELETE_REQUEST,
  EMP_EDU_DELETE_SUCCESS,
  EMP_EDU_DELETE_ERROR,
  EMP_EDU_EDITDETAILS_REQUEST,
  EMP_EDU_EDITDETAILS_SUCCESS,
  EMP_EDU_EDITDETAILS_ERROR,
  EMP_EDU_UPDATE_REQUEST,
  EMP_EDU_UPDATE_SUCCESS,
  EMP_EDU_UPDATE_ERROR,
  COMPENSATION_DP_LIST_REQUEST,
  COMPENSATION_DP_LIST_SUCCESS,
  COMPENSATION_DP_LIST_ERROR,
  COMPENSATION_COAM_DP_LIST_REQUEST,
  COMPENSATION_COAM_DP_LIST_SUCCESS,
  COMPENSATION_COAM_DP_LIST_ERROR,
  COMPENSATION_ADD_REQUEST,
  COMPENSATION_ADD_SUCCESS,
  COMPENSATION_ADD_ERROR,
  COMPENSATION_EDIT_REQUEST,
  COMPENSATION_EDIT_SUCCESS,
  COMPENSATION_EDIT_ERROR,
  COMPENSATION_UPDATE_REQUEST,
  COMPENSATION_UPDATE_SUCCESS,
  COMPENSATION_UPDATE_ERROR,
  COMPENSATION_DELETE_REQUEST,
  COMPENSATION_DELETE_SUCCESS,
  COMPENSATION_DELETE_ERROR
  
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: '',
  success: '',
  relationshipListDetails: '',
  compensationListDetails: '',
  compensationBasedListDetails: '',
  compensationEditDetails: '',
  industrytypeListDetails: '',
  payGradeListDetails: '',
  casteListDetails: '',
  designationListDetails: '',
  bankListDetails: '',
  costCenterListDetails: '',
  bloodgroupListDetails: '',
  religionListDetails: '',
  studylevelListDetails: '',
  studyProgramListDetails: '',
  studylevelUAListDetails: '',
  studyProgramUAListDetails: '',
  employementListDetails: '',
  leavingreasonListDetails: '',
  districtListDetails: '',
  organizationlistDetails: '',
  worktimelistDetails: '',
  countrylistDetails: '',
  casteAddDetails:'',
  statelistDetails: '',
  isORGtypeLoading: false,
  isDeleted:false,
  jobslistDetails:null,
  organizationDetails:null,
  jobDetails:null,
  casteIdDetails:'',
  isDesignationLoading:false,
  isCompLoading:false,
  isbankLoading:false,
  isCasteLoading:false,
  isCasteDeleted:false,
  isBankDeleted:false,
  isPaygradeDeleted:false,
  isDesignationDeleted:false,
  isPaygradeLoading:false,
  iscostcenterLoading:false,
  jobspostionlistDetails:null,
  jobPositionDetails:null,
  menulistDetails:null,
  cusMenuDetails:null,
  isEmpFamLoading:false,
  isEmpWoeLoading:false,
  isEmpEduLoading:false,
  isEmpBankLoading: false,
  isEmployeeworkExpsDeleted: false,
  WorkexperienceDetails: null,
  employeeFamilyDetails: false,
  EmployeeBanktDetails: null,
  isEmployeeEducationDeleted: false,
  EmployeeEducationDetails:null,
  bid:null,
  famid:null,
  educatId:null,
  empweId:null,
  isEmployeeBankDeleted:false,
  isEmpBankUpdated:false,
  isEmployeeFamilyDeleted:false,
  isCompensationDeleted:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  // console.log("action",action);
  switch (action.type) {
    case RELATIONSHIP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'relationship list request',
        relationshipListDetails: null,
      }
    case RELATIONSHIP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        relationshipListDetails: action.payload,
        success: ' relationship list success ',
      }
    case RELATIONSHIP_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'relationship list error',
        success: '',
        relationshipListDetails: null,
      }
    case COMPENSATION_DP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case COMPENSATION_DP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        compensationListDetails: action.payload,
      }
    case COMPENSATION_DP_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case COMPENSATION_ADD_REQUEST:
      return {
        ...state,
        isCompLoading: true,
      }
    case COMPENSATION_ADD_SUCCESS:
      return {
        ...state,
        isCompLoading: false,
        success: 'compensation added successfully',
        showToast: true,
      }
    case COMPENSATION_ADD_ERROR:
      return {
        ...state,
        isCompLoading: false,
        error: 'error adding compensation'
      }
    case COMPENSATION_EDIT_REQUEST:
      return {
        ...state,
        isCompLoading: true,
      }
    case COMPENSATION_EDIT_SUCCESS:
      return {
        ...state,
        isCompLoading: false,
        compensationEditDetails: action.payload,
      }
    case COMPENSATION_EDIT_ERROR:
      return {
        ...state,
        isCompLoading: false,
      }
    case COMPENSATION_UPDATE_REQUEST:
      return {
        ...state,
        isCompLoading: true,
      }
    case COMPENSATION_UPDATE_SUCCESS:
      return {
        ...state,
        isCompLoading: false,
        success: 'compensation updated successfully',
        showToast: true,
      }
    case COMPENSATION_UPDATE_ERROR:
      return {
        ...state,
        isCompLoading: false,
        error: 'error updating compensation'
      }
    case COMPENSATION_COAM_DP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case COMPENSATION_COAM_DP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        compensationBasedListDetails: action.payload,
      }
    case COMPENSATION_COAM_DP_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case COMPENSATION_DELETE_REQUEST:
      return {
        ...state,
      }
    case COMPENSATION_DELETE_SUCCESS:
      return {
        ...state,
        success: 'compensation delete success',
        isCompensationDeleted:true
      }
    case COMPENSATION_DELETE_ERROR:
      return {
        ...state,
        isCompensationDeleted: false,
        error: 'compensation delete error',
      }
    case INDUSTRYTYPE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'industrytype list request',
        industrytypeListDetails: null,
      }
    case INDUSTRYTYPE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        industrytypeListDetails: action.payload,
        success: ' industrytype list success ',
      }
    case INDUSTRYTYPE_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'industrytype list error',
        success: '',
        industrytypeListDetails: null,
      }
    case PAYGRADE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'studylevel list request',
        payGradeListDetails: null,
      }
    case PAYGRADE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payGradeListDetails: action.payload,
        success: ' studylevel list success ',
      }
    case PAYGRADE_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'studylevel list error',
        success: '',
        payGradeListDetails: null,
      }

      
      case PAYGRADE_ADD_REQUEST:
        return {
          ...state,
          isPaygradeLoading: true,
          success: 'Paygrade request',
         
        }
      case PAYGRADE_ADD_SUCCESS:
        return {
          ...state,
          isPaygradeLoading: false,
          success: 'Paygrade added success',
           showToast: true,
        }
      case PAYGRADE_ADD_ERROR:
        return {
          ...state,
          isPaygradeLoading: false,
          error: 'Paygrade error',
          success: '',
         
        }

        
        case PAYGRADE_DETAILS_REQUEST:
          return {
            ...state,
            isPaygradeLoading: true,
            paygradeEditDetails: null,
          }
        case PAYGRADE_DETAILS_SUCCESS:
          return {
            ...state,
            isPaygradeLoading: false,
            paygradeEditDetails: action.payload,
          }
        case PAYGRADE_DETAILS_ERROR:
          return {
            ...state,
            isPaygradeLoading: false,
            error: 'Paygrade  error',
            success: '',
            paygradeEditDetails: null,
          }

          
          case PAYGRADE_UPDATE_REQUEST:
            return {
              ...state,
              isPaygradeLoading: true,
              success: 'Designation request',
             
            }
          case PAYGRADE_UPDATE_SUCCESS:
            return {
              ...state,
              isPaygradeLoading: false,
              success: 'Paygrade update success',
              showToast: true,
            }
          case PAYGRADE_UPDATE_ERROR:
            return {
              ...state,
              isDesignationLoading: false,
              error: 'Designation error',
              success: '',
             
            }

            case PAYGRADE_DELETE_REQUEST:
              return {
                ...state,
                paygradeEditDetails: true,
              }
            case PAYGRADE_DELETE_SUCCESS:
              return {
                ...state,
                paygradeEditDetails: false,
                success: 'paygrade  success',
                isPaygradeDeleted:true
              }
            case PAYGRADE_DELETE_ERROR:
              return {
                ...state,
                paygradeEditDetails: false,
                error: 'designation error',
              }
    

                   
      case COSTCENTER_ADD_REQUEST:
        return {
          ...state,
          iscostcenterLoading: true,
          success: 'costcenter request',
         
        }
      case COSTCENTER_ADD_SUCCESS:
        return {
          ...state,
          iscostcenterLoading: false,
          success: 'Costcenter added success',
          showToast: true,
        }
      case COSTCENTER_ADD_ERROR:
        return {
          ...state,
          iscostcenterLoading: false,
          error: 'costcenter error',
          success: '',
         
        }
    
            case COSTCENTER_EDITDETAILS_REQUEST:
          return {
            ...state,
            iscostcenterLoading: true,
            costcenterEditDetails: null,
          }
        case COSTCENTER_EDITDETAILS_SUCCESS:
          return {
            ...state,
            iscostcenterLoading: false,
            costcenterEditDetails: action.payload,
          }
        case COSTCENTER_EDITDETAILS_ERROR:
          return {
            ...state,
            iscostcenterLoading: false,
            error: 'costcenter edit  error',
            success: '',
            costcenterEditDetails: null,
          }


         case COSTCENTER_UPDATE_REQUEST:
            return {
              ...state,
              iscostcenterLoading: true,
              success: 'costcenter request',
             
            }
          case COSTCENTER_UPDATE_SUCCESS:
            return {
              ...state,
              iscostcenterLoading: false,
              success: 'Costcenter update success',
              showToast: true,
            }
          case COSTCENTER_UPDATE_ERROR:
            return {
              ...state,
              iscostcenterLoading: false,
              error: 'constcenter error',
              success: '',
             
            }

        
 
      case CASTE_LIST_REQUEST:
      return {
        ...state,
        isCasteLoading: true,
        success: 'caste list request',
        casteListDetails: null,
      }
    case CASTE_LIST_SUCCESS:
      return {
        ...state,
        isCasteLoading: false,
        casteListDetails: action.payload,
        success: ' caste list success ',
      }
    case CASTE_LIST_ERROR:
      return {
        ...state,
        isCasteLoading: false,
        error: 'caste list error',
        success: '',
        casteListDetails: null,
      }

      case CASTE_ADD_REQUEST:
        return {
          ...state,
          isCasteLoading: true,
          success: 'caste casteAddDetails request',
         
        }
      case CASTE_ADD_SUCCESS:
        return {
          ...state,
          isCasteLoading: false,
          success: 'caste added success',
        }
      case CASTE_ADD_ERROR:
        return {
          ...state,
          isCasteLoading: false,
          error: 'caste casteAddDetails error',
          success: '',
         
        }

        case CASTE_DETAILS_REQUEST:
          return {
            ...state,
            isCasteLoading: true,
            casteIdDetails: null,
            success: '',
          }
        case CASTE_DETAILS_SUCCESS:
          return {
            ...state,
            isCasteLoading: false,
            casteIdDetails: action.payload,
          }
        case CASTE_DETAILS_ERROR:
          return {
            ...state,
            isCasteLoading: false,
            casteIdDetails: null,
          }

          case CASTE_UPDATE_REQUEST:
            return {
              ...state,
              isCasteLoading: true,
            }
          case CASTE_UPDATE_SUCCESS:
            return {
              ...state,
              isCasteLoading: false,
              success: 'caste update success',
            }
          case CASTE_UPDATE_ERROR:
            return {
              ...state,
              isCasteLoading: false,
              error: 'caste update error',
            }

            case CASTE_DELETE_REQUEST:
              return {
                ...state,
                isCasteLoading: true,
              }
            case CASTE_DELETE_SUCCESS:
              return {
                ...state,
                isCasteLoading: false,
                success: 'caste Delete success',
                isCasteDeleted:true
              }
            case CASTE_DELETE_ERROR:
              return {
                ...state,
                isCasteLoading: false,
                error: 'caste error',
              }

  

              case DESIGNATION_LIST_REQUEST:
      return {
        ...state,
        isDesignationLoading: true,
        success: 'designation list request',
        designationListDetails: null,
      }
    case DESIGNATION_LIST_SUCCESS:
      return {
        ...state,
        isDesignationLoading: false,
        designationListDetails: action.payload,
        success: ' designation list success ',
      }
    case DESIGNATION_LIST_ERROR:
      return {
        ...state,
        isDesignationLoading: false,
        error: 'designation list error',
        success: '',
        designationListDetails: null,
      }

      case DESIGNATION_ADD_REQUEST:
        return {
          ...state,
          isDesignationLoading: true,
          success: 'Designation request',
         
        }
      case DESIGNATION_ADD_SUCCESS:
        return {
          ...state,
          isDesignationLoading: false,
          success: 'Designation added success',
          showToast: true,
        }
      case DESIGNATION_ADD_ERROR:
        return {
          ...state,
          isDesignationLoading: false,
          error: 'Designation error',
          success: '',
         
        }

        case DESIGNATION_DETAILS_REQUEST:
          return {
            ...state,
            isLoading: true,
            designationEditDetails: null,
          }
        case DESIGNATION_DETAILS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            designationEditDetails: action.payload,
          }
        case DESIGNATION_DETAILS_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'designationEditDetails  error',
            success: '',
            designationEditDetails: null,
          }

          case DESIGNATION_UPDATE_REQUEST:
            return {
              ...state,
              isDesignationLoading: true,
              success: 'Designation request',
             
            }
          case DESIGNATION_UPDATE_SUCCESS:
            return {
              ...state,
              isDesignationLoading: false,
              success: 'Designation update success',
              showToast: true,
            }
          case DESIGNATION_UPDATE_ERROR:
            return {
              ...state,
              isDesignationLoading: false,
              error: 'Designation error',
              success: '',
             
            }

            case DESIGNATION_DELETE_REQUEST:
              return {
                ...state,
                isDesignationLoading: true,
              }
            case DESIGNATION_DELETE_SUCCESS:
              return {
                ...state,
                isDesignationLoading: false,
                success: 'designation error success',
                isDesignationDeleted:true
              }
            case DESIGNATION_DELETE_ERROR:
              return {
                ...state,
                isDesignationLoading: false,
                error: 'designation error',
              }
    

   
        case BANK_LIST_REQUEST:
      return {
        ...state,
        isbankLoading: true,
        success: 'bank list request',
        bankListDetails: null,
      }
    case BANK_LIST_SUCCESS:
      return {
        ...state,
        isbankLoading: false,
        bankListDetails: action.payload,
        success: ' bank list success ',
      }
    case BANK_LIST_ERROR:
      return {
        ...state,
        isbankLoading: false,
        error: 'Bank list error',
        success: '',
        bankListDetails: null,
      }
      case BANK_ADD_REQUEST:
        return {
          ...state,
          isbankLoading: true,
          success: 'bank request',
         
        }
      case BANK_ADD_SUCCESS:
        return {
          ...state,
          isbankLoading: false,
          success: 'Bank added success',
        }
      case BANK_ADD_ERROR:
        return {
          ...state,
          isbankLoading: false,
          error: 'bank error',
          success: '',
         
        }

        case BANK_DETAILS_REQUEST:
          return {
            ...state,
            isbankLoading: true,
            bankIdDisplayData: null,
            success: '',
          }
        case BANK_DETAILS_SUCCESS:
          return {
            ...state,
            isbankLoading: false,
            bankIdDisplayData: action.payload,
          }
        case BANK_DETAILS_ERROR:
          return {
            ...state,
            isbankLoading: false,
            bankIdDisplayData: null,
          }

          case BANK_UPDATE_REQUEST:
            return {
              ...state,
              isbankLoading: true,
            }
          case BANK_UPDATE_SUCCESS:
            return {
              ...state,
              isbankLoading: false,
              success: 'bank update success',
            }
          case BANK_UPDATE_ERROR:
            return {
              ...state,
              isbankLoading: false,
              error: 'bank update error',
            }

            case BANK_DELETE_REQUEST:
              return {
                ...state,
                isbankLoading: true,
              }
            case BANK_DELETE_SUCCESS:
              return {
                ...state,
                isbankLoading: false,
                success: 'bank delete success',
                isBankDeleted:true
              }
            case BANK_DELETE_ERROR:
              return {
                ...state,
                isbankLoading: false,
                error: 'bank error',
              }



    case COSTCENTER_LIST_REQUEST:
      return {
        ...state,
        iscostcenterLoading: true,
        success: 'costCenter List  request',
        costCenterListDetails: null,
      }
    case COSTCENTER_LIST_SUCCESS:
      return {
        ...state,
        iscostcenterLoading: false,
        costCenterListDetails: action.payload,
        success: ' costCenter List success ',
      }
    case COSTCENTER_LIST_ERROR:
      return {
        ...state,
        iscostcenterLoading: false,
        error: 'costCenter List error',
        success: '',
        costCenterListDetails: null,
      }

    case BLOODGROUP_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'bloodgroup List request',
        bloodgroupListDetails: null,
      }
    case BLOODGROUP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bloodgroupListDetails: action.payload,
        success: 'bloodgroup List success ',
      }
    case BLOODGROUP_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'bloodgroup List error',
        success: '',
        bloodgroupListDetails: null,
      }

    case RELIGION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'religion list request',
        religionListDetails: null,
      }
    case RELIGION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        religionListDetails: action.payload,
        success: ' religion list success ',
      }
    case RELIGION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'religion list error',
        success: '',
        religionListDetails: null,
      }

    case STUDYLEVEL_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'studylevel list request',
        studylevelListDetails: null,
      }
    case STUDYLEVEL_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studylevelListDetails: action.payload,
        success: ' studylevel list success ',
      }
    case STUDYLEVEL_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'studylevel list error',
        success: '',
        studylevelListDetails: null,
      }

    case STUDYPROGRAM_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'studyProgramList  request',
        studyProgramListDetails: null,
      }
    case STUDYPROGRAM_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studyProgramListDetails: action.payload,
        success: ' studyProgramList  success ',
      }
    case STUDYPROGRAM_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'studyProgramList  error',
        success: '',
        studyProgramListDetails: null,
      }

    case STUDYLEVEL_UA_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        studylevelUAListDetails: null,
      }
    case STUDYLEVEL_UA_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studylevelUAListDetails: action.payload,
        success: 'studylevel list success ',
      }
    case STUDYLEVEL_UA_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'studylevel list error',
        studylevelUAListDetails: null,
      }

    case STUDYPROGRAM_UA_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        studyProgramUAListDetails: null,
      }
    case STUDYPROGRAM_UA_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studyProgramUAListDetails: action.payload,
        success: 'study program list success ',
      }
    case STUDYPROGRAM_UA_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'study program list  error',
        success: '',
        studyProgramUAListDetails: null,
      }

    case EMPLOYMENT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'studylevel list request',
        employementListDetails: null,
      }
    case EMPLOYMENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employementListDetails: action.payload,
        success: ' studylevel list success ',
      }
    case EMPLOYMENT_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'studylevel list error',
        success: '',
        employementListDetails: null,
      }
    case LEAVINGREASON_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'leavingreason list request',
        leavingreasonListDetails: null,
      }
    case LEAVINGREASON_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leavingreasonListDetails: action.payload,
        success: ' leavingreason list success ',
      }
    case LEAVINGREASON_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leavingreason list error',
        success: '',
        leavingreasonListDetails: null,
      }
    case DISTRICT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'district list request',
        districtListDetails: null,
      }
    case DISTRICT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        districtListDetails: action.payload,
        success: ' district list success ',
      }
    case DISTRICT_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'district list error',
        success: '',
        districtListDetails: null,
      }

    case ORGANIZATION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'Organization list request',
        organizationlistDetails: null,
      }
    case ORGANIZATION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        organizationlistDetails: action.payload,
        success: ' organization list success ',
      }
    case ORGANIZATION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'organization list error',
        success: '',
        organizationlistDetails: null,
      }
    case ORGANIZATION_ADD_REQUEST:
      return {
        ...state,
        isORGtypeLoading: true,
        success: 'organization add request',
      }
    case ORGANIZATION_ADD_SUCCESS:
      return {
        ...state,
        isORGtypeLoading: false,
        success: 'organization add success',
      }
    case ORGANIZATION_ADD_ERROR:
      return {
        ...state,
        isORGtypeLoading: false,
        error: 'organization add error',
      }
    case ORGANIZATION_DELETE_REQUEST:
      return {
        ...state,
        isORGtypeLoading: true,
        success: '',
      }
    case ORGANIZATION_DELETE_SUCCESS:
      return {
        ...state,
        isORGtypeLoading: false,
        success: 'organization delete success',
        isDeleted: true,
      }
    case ORGANIZATION_DELETE_ERROR:
      return {
        ...state,
        isORGtypeLoading: false,
        error: 'organization delete error',
        success: '',
      }
    case ORGANIZATION_DETAILS_REQUEST:
      return {
        ...state,
        isORGtypeLoading: true,
        organizationDetails: null,
        success: '',
      }
    case ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        isORGtypeLoading: false,
        organizationDetails: action.payload,
      }
    case ORGANIZATION_DETAILS_ERROR:
      return {
        ...state,
        isORGtypeLoading: false,
        organizationDetails: null,
      }
    case ORGANIZATION_UPDATE_REQUEST:
      return {
        ...state,
        isORGtypeLoading: true,
      }
    case ORGANIZATION_UPDATE_SUCCESS:
      return {
        ...state,
        isORGtypeLoading: false,
        success: 'organization update success',
      }
    case ORGANIZATION_UPDATE_ERROR:
      return {
        ...state,
        isORGtypeLoading: false,
        error: 'organization update error',
      }
    case WORKTIME_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'worktime list request',
        worktimelistDetails: null,
      }
    case WORKTIME_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        worktimelistDetails: action.payload,
        success: ' worktime list success ',
      }
    case WORKTIME_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'worktime list error',
        success: '',
        worktimelistDetails: null,
      }
    case STATE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'state list request',
        statelistDetails: null,
      }
    case STATE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statelistDetails: action.payload,
        success: ' state list success ',
      }
    case STATE_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'state list error',
        success: '',
        statelistDetails: null,
      }
    case COUNTRY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'country list request',
        countrylistDetails: null,
      }
    case COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countrylistDetails: action.payload,
        success: ' country list success ',
      }
    case COUNTRY_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'country list error',
        success: '',
        countrylistDetails: null,
      }
    case JOB_CONFIG_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        jobslistDetails: null,
      }
    case JOB_CONFIG_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobslistDetails: action.payload,
        success: 'jobs list success ',
      }
    case JOB_CONFIG_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'jobs list error',
        jobslistDetails: null,
      }
    case JOB_CONFIG_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case JOB_CONFIG_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job add success',
        showToast: true,
      }
    case MESSAGE_CLEAR:
      return {
        ...state,
        success: '',
        error: '',
        showToast: false,
      }
    case JOB_CONFIG_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job add error',
        success: '',
      }
    case JOB_CONFIG_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        jobDetails: null,
      }
    case JOB_CONFIG_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobDetails: action.payload,
        success: 'job edit success',
      }
    case JOB_CONFIG_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        jobDetails: null,
        error: 'job edit error',
      }
    case JOB_CONFIG_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case JOB_CONFIG_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job update success',
        showToast: true,
      }
    case JOB_CONFIG_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job update error',
        showToast: false,
      }
    case JOB_CONFIG_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case JOB_CONFIG_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job delete success',
        isDeleted: true,
      }
    case JOB_CONFIG_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job delete error',
        success: '',
      }
    case JOB_POSITION_CONFIG_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        jobspostionlistDetails: null,
      }
    case JOB_POSITION_CONFIG_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobspostionlistDetails: action.payload,
        success: 'job position list success ',
      }
    case JOB_POSITION_CONFIG_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job position list error',
        jobspostionlistDetails: null,
      }
    case JOB_POSITION_CONFIG_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case JOB_POSITION_CONFIG_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job postion add success',
        showToast: true,
      }
    case JOB_POSITION_CONFIG_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job postion add error',
        success: '',
      }
    case JOB_POSITION_CONFIG_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        jobPositionDetails: null,
      }
    case JOB_POSITION_CONFIG_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobPositionDetails: action.payload,
        success: 'job postion edit success',
      }
    case JOB_POSITION_CONFIG_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        jobPositionDetails: null,
        error: 'job postion edit error',
      }
    case JOB_POSITION_CONFIG_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case JOB_POSITION_CONFIG_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job postion update success',
        showToast: true,
      }
    case JOB_POSITION_CONFIG_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job postion update error',
        showToast: false,
      }
    case JOB_POSITION_CONFIG_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case JOB_POSITION_CONFIG_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job delete success',
        isDeleted: true,
      }
    case JOB_POSITION_CONFIG_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job delete error',
        success: '',
      }
    case CUS_MENU_CONFIG_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        menulistDetails: null,
      }
    case CUS_MENU_CONFIG_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menulistDetails: action.payload,
        success: 'menu list success ',
      }
    case CUS_MENU_CONFIG_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'menu list error',
        menulistDetails: null,
      }
    case CUS_MENU_CONFIG_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
        cusMenuDetails: null,
      }
    case CUS_MENU_CONFIG_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cusMenuDetails: action.payload,
        success: 'menu edit success',
      }
    case CUS_MENU_CONFIG_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        cusMenuDetails: null,
        error: 'menu edit error',
      }
    case CUS_MENU_CONFIG_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case CUS_MENU_CONFIG_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'menu update success',
        showToast: true,
      }
    case CUS_MENU_CONFIG_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'menu update error',
        showToast: false,
      }
    // case JOB_POSITION_CONFIG_DELETE_REQUEST:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     success: '',
    //   }
    // case JOB_POSITION_CONFIG_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     success: 'job delete success',
    //     isDeleted: true,
    //   }
    // case JOB_POSITION_CONFIG_DELETE_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: 'job delete error',
    //     success: '',
    //   }

    case COSTCENTER_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: '',
      }
    case COSTCENTER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'Costcenter delete success',
        isDeleted: true,
      }
    case COSTCENTER_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'costcenter delete error',
        success: '',
      }
    case EMP_FAM_ADD_REQUEST:
      return {
        isEmpFamLoading: true,
      }
    case EMP_FAM_ADD_SUCCESS:
      return {
        ...state,
        isEmpFamLoading: false,
        showToast:true,
        success: 'employee family add success',
        famid:action.payload
      }
    case EMP_FAM_ADD_ERROR:
      return {
        ...state,
        isEmpFamLoading: false,
        showToast:true,
        error: 'working experience add error',
      }
    
         case EMP_FAM_DELETE_REQUEST:
        return {
          ...state,
          isEmpFamLoading: true,
          isEmployeeFamilyDeleted:false
        }
    
      case EMP_FAM_DELETE_SUCCESS:
        return {
          ...state,
          isEmpFamLoading: false,
          success: 'employee family delete success',
          isEmployeeFamilyDeleted:true
        }
      case EMP_FAM_DELETE_ERROR:
        return {
          ...state,
          isEmpFamLoading: false,
          error: 'employee family delete error',
          isEmployeeFamilyDeleted:false
        }
    
        case EMP_FAM_EDITDETAILS_REQUEST:
      return {
        ...state,
        isEmpFamLoading: true,
        employeeFamilyDetails: null,
        success: '',
      }
    case EMP_FAM_EDITDETAILS_SUCCESS:
      return {
        ...state,
        isEmpFamLoading: false,
        employeeFamilyDetails: action.payload,
        success: ' employee family details success',
      }
    case EMP_FAM_EDITDETAILS_ERROR:
      return {
        ...state,
        isEmpFamLoading: false,
        employeeFamilyDetails: null,
        error: 'employee family details error',
        success: '',
      }
    
    case EMP_FAM_UPDATE_REQUEST:
      return {
        ...state,
        isEmpFamLoading: true,
        success: 'employee family update request',
        
      }
  case EMP_FAM_UPDATE_SUCCESS:
    return {
      ...state,
      isEmpFamLoading: false,
      success: 'employee family update success',
      showToast: true,
    }
  case EMP_FAM_UPDATE_ERROR:
    return {
      ...state,
      isEmpFamLoading: false,
      error: 'employee family error',
      success: '',
      
    }

    case EMP_WE_ADD_REQUEST:
      return {
        isEmpWoeLoading: true,
      }
    case EMP_WE_ADD_SUCCESS:
      return {
        ...state,
        isEmpWoeLoading: false,
        showToast:true,
        success: 'working experience add success',
        empweId: action.payload,
      }
    case EMP_WE_ADD_ERROR:
      return {
        ...state,
        isEmpWoeLoading: false,
        showToast:true,
        error: 'working experience add error',
      }
    
      case EMP_WE_DELETE_REQUEST:
        return {
          ...state,
          isEmpWoeLoading: true,
          isEmployeeworkExpsDeleted:false
        }
    
      case EMP_WE_DELETE_SUCCESS:
        return {
          ...state,
          isEmpWoeLoading: false,
          success: 'EmployeeExperience delete success',
          isEmployeeworkExpsDeleted:true
        }
      case EMP_WE_DELETE_ERROR:
        return {
          ...state,
          isEmpWoeLoading: false,
          error: 'EmployeeExperience delete error',
          isEmployeeworkExpsDeleted:false
        }
    
    case EMP_WE_DETAILS_REQUEST:
      return {
        ...state,
        isEmpWoeLoading: true,
        WorkexperienceDetails: null,
        success: '',
      }
    case EMP_WE_DETAILS_SUCCESS:
      return {
        ...state,
        isEmpWoeLoading: false,
        WorkexperienceDetails: action.payload,
        success: ' WorkexperienceDetails details success',
      }
    case EMP_WE_DETAILS_ERROR:
      return {
        ...state,
        isEmpWoeLoading: false,
        WorkexperienceDetails: null,
        error: 'WorkexperienceDetails details error',
        success: '',
      }
    
      case EMP_WE_UPDATE_REQUEST:
        return {
          ...state,
          isEmpWoeLoading: true,
          success: 'workexperience update request',
          
        }
      case EMP_WE_UPDATE_SUCCESS:
        return {
          ...state,
          isEmpWoeLoading: false,
          success: 'working experience update success',
          showToast: true,
        }
      case EMP_WE_UPDATE_ERROR:
        return {
          ...state,
          isEmpWoeLoading: false,
          error: 'workexperience error',
          success: '',
          
        }
    
    
    
    case EMP_EDU_ADD_REQUEST:
      return {
        isEmpEduLoading: true,
      }
    case EMP_EDU_ADD_SUCCESS:
      return {
        ...state,
        isEmpEduLoading: false,
        showToast:true,
        success: 'education add success',
        educatId:action.payload
      }
    case EMP_EDU_ADD_ERROR:
      return {
        ...state,
        isEmpEduLoading: false,
        showToast:true,
        error: 'education add error',
      }
    
      case EMP_EDU_DELETE_REQUEST:
        return {
          ...state,
          isEmpEduLoading: true,
          isEmployeeEducationDeleted:false
        }
    
      case EMP_EDU_DELETE_SUCCESS:
        return {
          ...state,
          isEmpEduLoading: false,
          success: 'Employee Education Details delete success',
          isEmployeeEducationDeleted:true
        }
      case EMP_EDU_DELETE_ERROR:
        return {
          ...state,
          isEmpEduLoading: false,
          isEmployeeEducationDeleted:false,
          error: 'Employee Education Details delete error',
        }
    
    case EMP_EDU_EDITDETAILS_REQUEST:
      return {
        ...state,
        isEmpEduLoading: true,
        EmployeeEducationDetails: null,
        success: '',
      }
      case EMP_EDU_EDITDETAILS_SUCCESS:
      return {
        ...state,
        isEmpEduLoading: false,
        EmployeeEducationDetails: action.payload,
        success: 'EmployeeEducationDetails  success',
      }
      case EMP_EDU_EDITDETAILS_ERROR:
      return {
        ...state,
        isEmpEduLoading: false,
        EmployeeEducationDetails: null,
        error: 'EmployeeEducationDetails  error',
        success: '',
      }
    
          case EMP_EDU_UPDATE_REQUEST:
        return {
          ...state,
          isEmpEduLoading: true,
          success: 'education update  request',
          
        }
      case EMP_EDU_UPDATE_SUCCESS:
        return {
          ...state,
          isEmpEduLoading: false,
          success: 'education update success',
          showToast: true,
        }
      case EMP_EDU_UPDATE_ERROR:
        return {
          ...state,
          isEmpEduLoading: false,
          error: 'Education update  error',
          success: '',
          
        }
    
    
    
    
    case EMP_BANK_ADD_REQUEST:
      return {
        isEmpBankLoading: true,
      }
    case EMP_BANK_ADD_SUCCESS:
      return {
        ...state,
        isEmpBankLoading: false,
        showToast:true,
        success: 'bank add success',
        bid:action.payload
      }
    case EMP_BANK_ADD_ERROR:
      return {
        ...state,
        isEmpBankLoading: false,
        showToast:true,
        error: 'bank add error',
      }
    
     case EMP_BANK_EDITDETAILS_REQUEST:
      return {
        ...state,
        isEmpBankLoading: true,
        EmployeeBanktDetails: null,
        success: '',
      }
      case EMP_BANK_EDITDETAILS_SUCCESS:
      return {
        ...state,
        isEmpBankLoading: false,
        EmployeeBanktDetails: action.payload,
        success: 'EmployeeBanktDetails  success',
      }
      case EMP_BANK_EDITDETAILS_ERROR:
      return {
        ...state,
        isEmpBankLoading: false,
        EmployeeBanktDetails: null,
        error: 'EmployeeBanktDetails  error',
        success: '',
      }
    
          case EMP_BANK_UPDATE_REQUEST:
        return {
          ...state,
          isEmpBankLoading: true,
          success: 'bank update  request',
          isEmpBankUpdated:false
        }
      case EMP_BANK_UPDATE_SUCCESS:
        return {
          ...state,
          isEmpBankLoading: false,
          success: 'bank update success',
          showToast: true,
          isEmpBankUpdated:true
        }
      case EMP_BANK_UPDATE_ERROR:
        return {
          ...state,
          isEmpBankLoading: false,
          error: 'bank update  error',
          success: '',
          isEmpBankUpdated:false
          
        }
    
         case EMP_BANK_DELETE_REQUEST:
        return {
          ...state,
          isEmpBankLoading: true,
          isEmployeeBankDeleted:false
        }
    
      case EMP_BANK_DELETE_SUCCESS:
        return {
          ...state,
          isEmpBankLoading: false,
          success: 'Employee Bank delete success',
          isEmployeeBankDeleted:true
        }
      case EMP_BANK_DELETE_ERROR:
        return {
          ...state,
          isEmpBankLoading: false,
          error: 'Employee Bank delete error',
          isEmployeeBankDeleted:false
        }
    
    
    
    
    default:
      return state
  }
}
