import {
  LEAVEALLOCATION_ADD_ERROR,
  LEAVEALLOCATION_ADD_REQUEST,
    LEAVEALLOCATION_ADD_SUCCESS,
    LEAVEALLOCATION_DELETE_ERROR,
    LEAVEALLOCATION_DELETE_REQUEST,
    LEAVEALLOCATION_DELETE_SUCCESS,
    LEAVEALLOCATION_EDITDETAILS_ERROR,
    LEAVEALLOCATION_EDITDETAILS_REQUEST,
    LEAVEALLOCATION_EDITDETAILS_SUCCESS,
    LEAVEALLOCATION_LIST_ERROR,
    LEAVEALLOCATION_LIST_REQUEST,
    LEAVEALLOCATION_LIST_SUCCESS,
    LEAVEALLOCATION_UPDATE_ERROR,
    
    LEAVEALLOCATION_UPDATE_REQUEST,
    
    LEAVEALLOCATION_UPDATE_SUCCESS,
    
    LEAVEREQUEST_ADD_ERROR,
    
    LEAVEREQUEST_ADD_REQUEST,
    
    LEAVEREQUEST_ADD_SUCCESS,
    
    LEAVEREQUEST_DELETE_ERROR,
    
    LEAVEREQUEST_DELETE_REQUEST,
    
    LEAVEREQUEST_DELETE_SUCCESS,
    
    LEAVEREQUEST_EDITDETAILS_ERROR,
    
    LEAVEREQUEST_EDITDETAILS_REQUEST,
    
    LEAVEREQUEST_EDITDETAILS_SUCCESS,
    
    LEAVEREQUEST_LIST_ERROR,
    LEAVEREQUEST_LIST_REQUEST,
    LEAVEREQUEST_LIST_SUCCESS,

    LEAVEREQUEST_GRID_LIST_ERROR,
    LEAVEREQUEST_GRID_LIST_REQUEST,
    LEAVEREQUEST_GRID_LIST_SUCCESS,
     
    LEAVEREQUEST_UPDATE_ERROR,
     
    LEAVEREQUEST_UPDATE_REQUEST,
     
    LEAVEREQUEST_UPDATE_SUCCESS,
     
    LEAVETYPES_ADD_ERROR,
    
    LEAVETYPES_ADD_REQUEST,
    
    LEAVETYPES_ADD_SUCCESS,
    
    LEAVETYPES_DELETE_ERROR,
    LEAVETYPES_DELETE_REQUEST,
    LEAVETYPES_DELETE_SUCCESS,
    LEAVETYPES_EDITDETAILS_ERROR,
    LEAVETYPES_EDITDETAILS_REQUEST,
    LEAVETYPES_EDITDETAILS_SUCCESS,
    LEAVETYPES_LIST_ERROR,
    LEAVETYPES_LIST_REQUEST,
    LEAVETYPES_LIST_SUCCESS,
    LEAVETYPES_UPDATE_ERROR,
    LEAVETYPES_UPDATE_REQUEST,
    LEAVETYPES_UPDATE_SUCCESS,
    
  LEAVEALLOCATION_APPROVE_STATUS_ERROR,
    LEAVEALLOCATION_APPROVE_STATUS_REQUEST,
  LEAVEALLOCATION_APPROVE_STATUS_SUCCESS,
    LEAVEALLOCATION_REFUSE_STATUS_ERROR,
    
    LEAVEALLOCATION_REFUSE_STATUS_REQUEST,
    
    LEAVEALLOCATION_REFUSE_STATUS_SUCCESS,
    LEAVEALLOCATION_DRAFT_STATUS_REQUEST,
    LEAVEALLOCATION_DRAFT_STATUS_SUCCESS,
    LEAVEALLOCATION_DRAFT_STATUS_ERROR,
    LEAVEALLOCATION_CONFIRM_STATUS_REQUEST,
    LEAVEALLOCATION_CONFIRM_STATUS_SUCCESS,
    LEAVEALLOCATION_CONFIRM_STATUS_ERROR,
    LEAVEALLOCATION_SECONDAPPROVE_STATUS_SUCCESS,
    LEAVEALLOCATION_SECONDAPPROVE_STATUS_ERROR,
    LEAVEALLOCATION_SECONDAPPROVE_STATUS_REQUEST,
    LEAVEREQUEST_APPROVE_STATUS_REQUEST,
    LEAVEREQUEST_APPROVE_STATUS_SUCCESS,
    LEAVEREQUEST_APPROVE_STATUS_ERROR,
    LEAVEREQUEST_REFUSE_STATUS_REQUEST,
    LEAVEREQUEST_REFUSE_STATUS_SUCCESS,
    LEAVEREQUEST_REFUSE_STATUS_ERROR,
    LEAVEREQUEST_CONFIRM_STATUS_REQUEST,
    LEAVEREQUEST_CONFIRM_STATUS_SUCCESS,
    LEAVEREQUEST_CONFIRM_STATUS_ERROR,
    LEAVEREQUEST_DRAFT_STATUS_SUCCESS,
    LEAVEREQUEST_DRAFT_STATUS_REQUEST,
    LEAVE_ACCUMULATION_LIST_REQUEST,
    LEAVE_ACCUMULATION_LIST_SUCCESS,
    LEAVE_ACCUMULATION_LIST_ERROR,
    LEAVE_ACCUMULATION_ADD_REQUEST,
    LEAVE_ACCUMULATION_ADD_ERROR,
    LEAVE_ACCUMULATION_ADD_SUCCESS,
    LEAVE_ACCUMULATION_EDIT_REQUEST,
    LEAVE_ACCUMULATION_EDIT_SUCCESS,
    LEAVE_ACCUMULATION_EDIT_ERROR,
    LEAVE_ACCUMULATION_UPDATE_REQUEST,
    LEAVE_ACCUMULATION_UPDATE_SUCCESS,
    LEAVE_ACCUMULATION_UPDATE_ERROR,
    LEAVE_ACCUMULATION_DELETE_REQUEST,
    LEAVE_ACCUMULATION_DELETE_SUCCESS,
    LEAVE_ACCUMULATION_DELETE_ERROR,
    LEAVE_MAINTYPES_LIST_REQUEST,
    LEAVE_MAINTYPES_LIST_SUCCESS,
    LEAVE_MAINTYPES_LIST_ERROR,
    LEAVE_MAINTYPES_ADD_REQUEST,
    LEAVE_MAINTYPES_ADD_SUCCESS,
    LEAVE_MAINTYPES_ADD_ERROR,
    LEAVE_MAINTYPES_DELETE_REQUEST,
    LEAVE_MAINTYPES_DELETE_SUCCESS,
    LEAVE_MAINTYPES_DELETE_ERROR,
    LEAVE_MAINTYPES_EDIT_REQUEST,
    LEAVE_MAINTYPES_EDIT_SUCCESS,
    LEAVE_MAINTYPES_EDIT_ERROR,
    LEAVE_MAINTYPES_UPDATE_REQUEST,
    LEAVE_MAINTYPES_UPDATE_SUCCESS,
    LEAVE_MAINTYPES_UPDATE_ERROR,
    LEAVE_ACCUMULATION_STATUS_UPDATE_REQUEST,
    LEAVE_ACCUMULATION_STATUS_UPDATE_SUCCESS,
    LEAVE_ACCUMULATION_STATUS_UPDATE_ERROR,
    LEAVEREQUEST_DRAFT_STATUS_ERROR,
    LEAVEREQUEST_SECONDAPPROVE_STATUS_REQUEST,
    LEAVEREQUEST_SECONDAPPROVE_STATUS_SUCCESS,
    LEAVEREQUEST_SECONDAPPROVE_STATUS_ERROR,
    LEAVEREQUEST_CANCELREQUEST_STATUS_ERROR,
    LEAVEREQUEST_CANCELREQUEST_STATUS_SUCCESS,
    LEAVEREQUEST_CANCELREQUEST_STATUS_REQUEST,
    LEAVEREQUEST_CANCELAPPROVAL_STATUS_REQUEST,
    LEAVEREQUEST_CANCELAPPROVAL_STATUS_SUCCESS,
    LEAVEREQUEST_CANCELAPPROVAL_STATUS_ERROR,
    LEAVEREQUEST_DATA_LIST_REQUEST,
    LEAVEREQUEST_DATA_LIST_SUCCESS,
    LEAVEREQUEST_DATA_LIST_ERROR,
   
} from '../actions/types'

const initialState = {
  isLoading: false,
  error: '',
  success: '',
  isDeleted:false,
  leaveTypeslistDetails: null,
  mainTypesListDetails :null,
  isleaveTypesDeleted: false,
  leaveListDetails: null,
  leaveAccumulationListDetails: null,
  isleaveDeleted: false,
  leaveAllocationlistDetails: null,
  isleaveAllocationDeleted: false,
  leaveAllocationApprove:null,
  leaveAccumulationDetails:null,
  isLeaveGridLoading:false,
  leaveGridDetails: null,
  getLeaveRequestDataList:null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action)
{
  // console.log("action",action);
  switch (action.type) 
  {
    case LEAVETYPES_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'leavetypes list request',
        leaveTypeslistDetails: null,
      }
    case LEAVETYPES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveTypeslistDetails: action.payload,
        success: ' leaveTypes list success ',
      }
    case LEAVETYPES_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leavetypes list error',
        success: '',
        leaveTypeslistDetails: null,
      }

      case LEAVETYPES_DELETE_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
            case LEAVETYPES_DELETE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leavetypes delete success',
                isleaveTypesDeleted:true
              }
            case LEAVETYPES_DELETE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leavetypes delete error',
              }
    case LEAVETYPES_ADD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: 'leavetypes add  request',
         
        }
      case LEAVETYPES_ADD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: 'leavetypes added success',
          showToast: true,
        }
      case LEAVETYPES_ADD_ERROR:
        return {
          ...state,
          isLoading: false,
          error: 'leavetypes add  error',
          success: '',
         
        }
    
     case LEAVETYPES_EDITDETAILS_REQUEST:
          return {
            ...state,
            isLoading: true,
            leaveTypesEditDetails: null,
          }
        case LEAVETYPES_EDITDETAILS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            leaveTypesEditDetails: action.payload,
          }
        case LEAVETYPES_EDITDETAILS_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'leaveTypes edit  error',
            success: '',
            leaveTypesEditDetails: null,
          }
    
       case LEAVETYPES_UPDATE_REQUEST:
            return {
              ...state,
              isLoading: true,
              success: 'leaveTypes update request',
             
            }
          case LEAVETYPES_UPDATE_SUCCESS:
            return {
              ...state,
              isLoading: false,
              success: 'LeaveType update success',
              showToast: true,
            }
          case LEAVETYPES_UPDATE_ERROR:
            return {
              ...state,
              isLoading: false,
              error: 'leaveTypes error',
              success: '',
            }
    
     
    
    
            
    
    case LEAVEREQUEST_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'leaveRequest list request',
        leaveListDetails: null,
      }
    case LEAVEREQUEST_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveListDetails: action.payload,
        success: ' leaverequest list success ',
      }
    case LEAVEREQUEST_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leaverequest list error',
        success: '',
        leaveListDetails: null,
      }

    case LEAVEREQUEST_GRID_LIST_REQUEST:
      return {
        ...state,
        isLeaveGridLoading: true,
        success: 'leaveRequest grid request',
        leaveGridDetails: null,
      }
    case LEAVEREQUEST_GRID_LIST_SUCCESS:
      return {
        ...state,
        isLeaveGridLoading: false,
        leaveGridDetails: action.payload,
        success: ' leaverequest grid success ',
      }
    case LEAVEREQUEST_GRID_LIST_ERROR:
      return {
        ...state,
        isLeaveGridLoading: false,
        error: 'leaverequest grid error',
        success: '',
        leaveGridDetails: null,
      }
    
     case LEAVEREQUEST_ADD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: 'leaverequest add  request',
         
        }
      case LEAVEREQUEST_ADD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: 'leaverequest added success',
          showToast: true,
        }
      case LEAVEREQUEST_ADD_ERROR:
        return {
          ...state,
          isLoading: false,
          error: 'leaverequest  error',
          // showToast: true,
          isleaveError:true
         
        }
    
        case LEAVEREQUEST_EDITDETAILS_REQUEST:
          return {
            ...state,
            isLoading: true,
            leaveRequestEditDetails: null,
          }
        case LEAVEREQUEST_EDITDETAILS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            leaveRequestEditDetails: action.payload,
          }
        case LEAVEREQUEST_EDITDETAILS_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'leaverequest editdetails  error',
            success: '',
            leaveRequestEditDetails: null,
          }
    
       case LEAVEREQUEST_UPDATE_REQUEST:
            return {
              ...state,
              isLoading: true,
              success: 'leaverequest update request',
             
            }
          case LEAVEREQUEST_UPDATE_SUCCESS:
            return {
              ...state,
              isLoading: false,
              success: 'leaverequest update success',
              showToast: true,
            }
          case LEAVEREQUEST_UPDATE_ERROR:
            return {
              ...state,
              isLoading: false,
              error: 'leaverequest error',
              success: '',
            }
    
     case LEAVEREQUEST_DELETE_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
      case LEAVEREQUEST_DELETE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaverequest delete success',
                isleaveDeleted:true
              }
      case LEAVEREQUEST_DELETE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaverequest delete error',
              }
    
    case LEAVEALLOCATION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'leaveallocation list request',
        leaveAllocationlistDetails: null,
      }
    case LEAVEALLOCATION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveAllocationlistDetails: action.payload,
        success: ' leaveAllocation list success ',
      }
    case LEAVEALLOCATION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leaveallocation list error',
        success: '',
        leaveAllocationlistDetails: null,
      }
    
    case LEAVEALLOCATION_ADD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: 'leaveAllocation add  request',
         
        }
      case LEAVEALLOCATION_ADD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: 'leaveAllocation added success',
          showToast: true,
        }
      case LEAVEALLOCATION_ADD_ERROR:
        return {
          ...state,
          isLoading: false,
          error: 'leaveAllocation add  error',
          success: '',
         
        }
    
         case LEAVEALLOCATION_EDITDETAILS_REQUEST:
          return {
            ...state,
            isLoading: true,
            leaveAllocationEditDetails: null,
          }
        case LEAVEALLOCATION_EDITDETAILS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            leaveAllocationEditDetails: action.payload,
          }
        case LEAVEALLOCATION_EDITDETAILS_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'leaveAllocation editdetails  error',
            success: '',
            leaveAllocationEditDetails: null,
          }
    
        case LEAVEALLOCATION_UPDATE_REQUEST:
            return {
              ...state,
              isLoading: true,
              success: 'leaverallocation update request',
             
            }
          case LEAVEALLOCATION_UPDATE_SUCCESS:
            return {
              ...state,
              isLoading: false,
              success: 'leaverAllocation update success',
              showToast: true,
            }
          case LEAVEALLOCATION_UPDATE_ERROR:
            return {
              ...state,
              isLoading: false,
              error: 'leaveallocation error',
              success: '',
            }
    
    case LEAVEALLOCATION_DELETE_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
      case LEAVEALLOCATION_DELETE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveallocation delete success',
                isleaveAllocationDeleted:true
              }
      case LEAVEALLOCATION_DELETE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveallocation delete error',
              }
    
    // leave Allocation workflow  buttons

    case LEAVEALLOCATION_APPROVE_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEALLOCATION_APPROVE_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveallocation approve success',
                isleaveAllocationApprove: true,
              }
      case LEAVEALLOCATION_APPROVE_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveallocation approve error',
              }
    
    case LEAVEALLOCATION_REFUSE_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
      case LEAVEALLOCATION_REFUSE_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveallocation refuse success',
                isleaveAllocationRefuse: true,
              }
      case LEAVEALLOCATION_REFUSE_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveallocation refuse error'
              }
    
    case LEAVEALLOCATION_DRAFT_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
      case LEAVEALLOCATION_DRAFT_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveallocation refuse success',
                 isleaveAllocationDraft: true,
              }
      case LEAVEALLOCATION_DRAFT_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveallocation refuse error'
              }
    
    case LEAVEALLOCATION_CONFIRM_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
      case LEAVEALLOCATION_CONFIRM_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveallocation confirm success',
                 isleaveAllocationConfirm: true,
              }
      case LEAVEALLOCATION_CONFIRM_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveallocation confirm error'
              }
    
    
              case LEAVEALLOCATION_SECONDAPPROVE_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
      case LEAVEALLOCATION_SECONDAPPROVE_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveallocation second approve success',
                 isleaveAllocationSecondApprove: true,
              }
      case LEAVEALLOCATION_SECONDAPPROVE_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveallocation second approve error'
              }
    
    // leave Request workflow

        case LEAVEREQUEST_APPROVE_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_APPROVE_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest approve success',
                isleaveRequestApprove: true,
              }
      case LEAVEREQUEST_APPROVE_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveRequest approve error',
              }
    
            case LEAVEREQUEST_REFUSE_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_REFUSE_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest Refuse success',
                isleaveRequestRefuse: true,
              }
      case LEAVEREQUEST_REFUSE_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveRequest Refuse error',
              }
    
        case LEAVEREQUEST_CONFIRM_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_CONFIRM_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest confirm success',
                isleaveRequestConfirm: true,
              }
      case LEAVEREQUEST_CONFIRM_STATUS_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leaveRequest confirm error',
              }
    
    
      case LEAVEREQUEST_DRAFT_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_DRAFT_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest draft success',
                isleaveRequestDraft: true,
              }
    
    case LEAVEREQUEST_DRAFT_STATUS_ERROR:
            return {
              ...state,
              isLoading: false,
              error: 'leaveRequest draft error',
            }
    
    
          case LEAVEREQUEST_SECONDAPPROVE_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_SECONDAPPROVE_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest SecondApproval success',
                isleaveRequestSecondApproval: true,
              }
    
    case LEAVEREQUEST_SECONDAPPROVE_STATUS_ERROR:
            return {
              ...state,
              isLoading: false,
              error: 'leaveRequest SecondApproval error',
            }
    
    
              case LEAVEREQUEST_CANCELREQUEST_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_CANCELREQUEST_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest CancelRequest success',
                isleaveRequestCancelRequest: true,
              }
    
          case LEAVEREQUEST_CANCELREQUEST_STATUS_ERROR:
                  return {
                    ...state,
                    isLoading: false,
                    error: 'leaveRequest CancelRequest error',
                  }
    
     case LEAVEREQUEST_CANCELAPPROVAL_STATUS_REQUEST:
              return {
                ...state,
                isLoading: true,
                //  leaveAllocationApprove: null,
              }
      case LEAVEREQUEST_CANCELAPPROVAL_STATUS_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leaveRequest CancelApproval success',
                isleaveRequestCancelApproval: true,
              }
    
          case LEAVEREQUEST_CANCELAPPROVAL_STATUS_ERROR:
                  return {
                    ...state,
                    isLoading: false,
                    error: 'leaveRequest CancelApproval error',
                  }
    
    
    
    
    case LEAVE_ACCUMULATION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'leave accumulation list request',
        leaveAccumulationListDetails: null,
      }
    case LEAVE_ACCUMULATION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveAccumulationListDetails: action.payload,
        success: ' leave accumulation list success ',
      }
    case LEAVE_ACCUMULATION_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leave accumulation list error',
        success: '',
        leaveAccumulationListDetails: null,
      }
    
    case LEAVE_ACCUMULATION_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LEAVE_ACCUMULATION_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'leave accumulation added success',
        showToast: true,
      }
    case LEAVE_ACCUMULATION_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leave accumulation add error',
        success: '',
      }
    
    case LEAVE_ACCUMULATION_EDIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LEAVE_ACCUMULATION_EDIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaveAccumulationDetails: action.payload,
        success: 'leave accumulation details success',
      }
    case LEAVE_ACCUMULATION_EDIT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leave accumulation details error',
      }
    case LEAVE_ACCUMULATION_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LEAVE_ACCUMULATION_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'leave accumulation update success',
        showToast: true,
      }
    case LEAVE_ACCUMULATION_UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leave accumulation error',
      }
    case LEAVE_ACCUMULATION_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LEAVE_ACCUMULATION_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'leave accumulation deleted success',
        isDeleted: true,
      }
    case LEAVE_ACCUMULATION_DELETE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leave accumulation delete error',
        isDeleted: false,
      }
    
    
        case LEAVE_MAINTYPES_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'maintypes list request',
        mainTypesListDetails: null,
      }
    case LEAVE_MAINTYPES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        mainTypesListDetails: action.payload,
        success: ' maintypes list success ',
      }
    case LEAVE_MAINTYPES_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'maintypes list error',
        success: '',
        mainTypesListDetails: null,
      }
    
     case LEAVE_MAINTYPES_ADD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: 'maintypes add  request',
         
        }
      case LEAVE_MAINTYPES_ADD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: 'maintypes added success',
          showToast: true,
        }
      case LEAVE_MAINTYPES_ADD_ERROR:
        return {
          ...state,
          isLoading: false,
          error: 'maintypes  error',
          // showToast: true,
          isleaveError:true
         
        }
    
            case LEAVE_MAINTYPES_EDIT_REQUEST:
          return {
            ...state,
            isLoading: true,
            maintypesEditDetails: null,
          }
        case LEAVE_MAINTYPES_EDIT_SUCCESS:
          return {
            ...state,
            isLoading: false,
            maintypesEditDetails: action.payload,
          }
        case LEAVE_MAINTYPES_EDIT_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'main types editdetails  error',
            success: '',
            maintypesEditDetails: null,
          }

    
           case LEAVE_MAINTYPES_UPDATE_REQUEST:
            return {
              ...state,
              isLoading: true,
              success: 'maintypes update request',
             
            }
          case LEAVE_MAINTYPES_UPDATE_SUCCESS:
            return {
              ...state,
              isLoading: false,
              success: 'maintypes update success',
              showToast: true,
            }
          case LEAVE_MAINTYPES_UPDATE_ERROR:
            return {
              ...state,
              isLoading: false,
              error: 'maintypes error',
              success: '',
            }
    
    
      case LEAVE_MAINTYPES_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
              }
      case LEAVE_MAINTYPES_DELETE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'maintypes delete success',
                isMaintypeDeleted:true
              }
      case LEAVE_MAINTYPES_DELETE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'maintypes delete error',
              }
      case LEAVE_ACCUMULATION_STATUS_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
              }
      case LEAVE_ACCUMULATION_STATUS_UPDATE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'leave accumulation status update success',
                showToast:true
              }
      case LEAVE_ACCUMULATION_STATUS_UPDATE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'leave accumulation status update error',
              }
    
        
        case LEAVEREQUEST_DATA_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'leave data show list request',
        getLeaveRequestDataList: null,
      }
    case LEAVEREQUEST_DATA_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getLeaveRequestDataList: action.payload,
        success: ' leave data show list success ',
      }
    case LEAVEREQUEST_DATA_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'leave data show list error',
        success: '',
        getLeaveRequestDataList: null,
      }
    
    default:
      return state
  }
}
