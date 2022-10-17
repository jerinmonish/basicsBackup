import {
    CANDIDATE_ADD_ERROR,
    CANDIDATE_ADD_REQUEST,
    CANDIDATE_ADD_SUCCESS,
    CANDIDATE_DELETE_ERROR,
    CANDIDATE_DELETE_REQUEST,
    CANDIDATE_DELETE_SUCCESS,
    CANDIDATE_EDITDETAILS_ERROR,
    CANDIDATE_EDITDETAILS_REQUEST,
    CANDIDATE_EDITDETAILS_SUCCESS,
    CANDIDATE_LIST_ERROR,
    CANDIDATE_LIST_REQUEST,
    CANDIDATE_LIST_SUCCESS,
    CANDIDATE_UPDATE_ERROR,
    CANDIDATE_UPDATE_REQUEST,
    CANDIDATE_UPDATE_SUCCESS,
    COM_JOB_REQUEST,
    COM_JOB_SUCCESS,
    COM_JOB_ERROR,
    CANDIDATE_JOB_APPLY_REQUEST,
    CANDIDATE_JOB_APPLY_SUCCESS,
    CANDIDATE_JOB_APPLY_ERROR,
    CAND_UNUSER_REQUEST,
    CAND_UNUSER_SUCCESS,
    CAND_UNUSER_ERROR,
    OPEN_RESUME_PARSE_REQUEST,
    OPEN_RESUME_PARSE_SUCCESS,
    OPEN_RESUME_PARSE_ERROR,
    CANDIDATE_WORKFLOW_REQUEST,
    CANDIDATE_WORKFLOW_SUCCESS,
    CANDIDATE_WORKFLOW_ERROR,
    CANDIDATE_STATUS_BTN_REQUEST,
    CANDIDATE_STATUS_BTN_SUCCESS,
    CANDIDATE_STATUS_BTN_ERROR,
    CAND_UNUSER_STATUS_REQUEST,
    CAND_UNUSER_STATUS_SUCCESS,
    CAND_UNUSER_STATUS_ERROR,
    CANDIDATE_UPDATE_ONBOARDING_POPUP_REQUEST,
    CANDIDATE_UPDATE_ONBOARDING_POPUP_SUCCESS,
    CANDIDATE_UPDATE_ONBOARDING_POPUP_ERROR,
    JOB_BASIC_ADD_REQUEST,
    JOB_BASIC_ADD_SUCCESS,
    JOB_BASIC_ADD_ERROR,
    CANDIDATE_INVITE_ADD_REQUEST,
    CANDIDATE_INVITE_ADD_SUCCESS,
    CANDIDATE_INVITE_ADD_ERROR,
  
} from '../actions/types'

const initialState = {
  isLoading: false,
  isCandInviteLoading: false,
  isResumeLoading:false,
  isCandidateOnboardingStatus:false,
  error: '',
  success: '',
  candidatelistDetails: null,
  candidateworkflowDetails: null,
  iscandidateDeleted:false,
  jobData:null,
  jobUnUserData:null,
  resumeUnUserData:null,
  candidateStatusUpdateDetails:null,
  candidateStatusDropdownDetails:null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action)
{
  // console.log("action",action);
  switch (action.type) {
    case CANDIDATE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'candidate list request',
        candidatelistDetails: null,
      }
    case CANDIDATE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        candidatelistDetails: action.payload,
        success: ' candidate list success ',
      }
    case CANDIDATE_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'candidate list error',
        success: '',
        candidatelistDetails: null,
      }

      case CANDIDATE_DELETE_REQUEST:
              return {
                ...state,
                isLoading: true,
              }
            case CANDIDATE_DELETE_SUCCESS:
              return {
                ...state,
                isLoading: false,
                success: 'candidate delete success',
                iscandidateDeleted:true
              }
            case CANDIDATE_DELETE_ERROR:
              return {
                ...state,
                isLoading: false,
                error: 'candidate delete error',
              }
    case CANDIDATE_ADD_REQUEST:
        return {
          ...state,
          isLoading: true,
          success: 'Candidate add request',
         
        }
      case CANDIDATE_ADD_SUCCESS:
        return {
          ...state,
          isLoading: false,
          success: 'Candidate add success',
          showToast: true,
        }
      case CANDIDATE_ADD_ERROR:
        return {
          ...state,
          isLoading: false,
          error: 'Candidate add error',
        }
    
      case CANDIDATE_EDITDETAILS_REQUEST:
          return {
            ...state,
            isLoading: true,
            candidateEditDetails: null,
          }
        case CANDIDATE_EDITDETAILS_SUCCESS:
          return {
            ...state,
            isLoading: false,
            candidateEditDetails: action.payload,
          }
        case CANDIDATE_EDITDETAILS_ERROR:
          return {
            ...state,
            isLoading: false,
            error: 'candidate edit error',
            success: '',
            candidateEditDetails: null,
          }
    
    
    case CANDIDATE_UPDATE_REQUEST:
    return {
      ...state,
      isLoading: true,
      success: 'Candidate update request',
      showToast: false,
    
    }
  case CANDIDATE_UPDATE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      success: 'Candidate update success',
      showToast: true,
    }
  case CANDIDATE_UPDATE_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'Candidate update error',
      success: '',
    
    }
  
  case CANDIDATE_JOB_APPLY_REQUEST:
    return {
      ...state,
      isLoading: true,
      success: 'Job Apply Request',
      showToast: false,
    }
  case CANDIDATE_JOB_APPLY_SUCCESS:
    return {
      ...state,
      isLoading: false,
      success: 'Job Apply Success',
      showToast: true,
    }
  case CANDIDATE_JOB_APPLY_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'Job Apply Error',
    }
  case COM_JOB_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: 'Company Job dropdown request',
        showToast: false,
      }
  case COM_JOB_SUCCESS:
    return {
      ...state,
      isLoading: false,
      success: 'Company Job dropdown success',
      jobData:action.payload,
      showToast: true,
    }
  case COM_JOB_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'Company Job dropdown error',
      success: '',
    }
  case CAND_UNUSER_REQUEST:
    return {
      ...state,
      isLoading: true,
      showToast: false,
    }
  case CAND_UNUSER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      success: 'user details success',
      jobUnUserData:action.payload,
      showToast: true,
    }
  case CAND_UNUSER_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'user details error',
      success: '',
    }
  case OPEN_RESUME_PARSE_REQUEST:
    return {
      ...state,
      isResumeLoading: true,
    }
  case OPEN_RESUME_PARSE_SUCCESS:
    return {
      ...state,
      isResumeLoading: false,
      success: 'resume details success',
      resumeUnUserData:action.payload,
    }
  case OPEN_RESUME_PARSE_ERROR:
    return {
      ...state,
      isResumeLoading: false,
      error: 'resume details error',
      success: '',
    }
  case CANDIDATE_WORKFLOW_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case CANDIDATE_WORKFLOW_SUCCESS:
    return {
      ...state,
      isLoading: false,
      success: 'workflow details success',
      candidateworkflowDetails:action.payload,
    }
  case CANDIDATE_WORKFLOW_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'workflow details error',
    }
  case CANDIDATE_STATUS_BTN_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case CANDIDATE_STATUS_BTN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      success: 'candidate status details success',
      candidateStatusUpdateDetails:action.payload,
    }
  case CANDIDATE_STATUS_BTN_ERROR:
    return {
      ...state,
      isLoading: false,
      error: 'candidate status details error',
    }
  case CAND_UNUSER_STATUS_REQUEST:
    return {
      ...state,
      isLoading: true,
    }
  case CAND_UNUSER_STATUS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      candidateStatusDropdownDetails:action.payload,
    }
  case CAND_UNUSER_STATUS_ERROR:
    return {
      ...state,
      isLoading: false,
    }
  case CANDIDATE_UPDATE_ONBOARDING_POPUP_REQUEST:
    return {
      ...state,
      isCandidateOnboardingStatus: true,
    }
  case CANDIDATE_UPDATE_ONBOARDING_POPUP_SUCCESS:
    return {
      ...state,
      isCandidateOnboardingStatus: false,
      success:'Onboarding Status update success'
    }
  case CANDIDATE_UPDATE_ONBOARDING_POPUP_ERROR:
    return {
      ...state,
      isCandidateOnboardingStatus: false,
    }

        
    case JOB_BASIC_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case JOB_BASIC_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: 'job basic added success',
        showToast: true,
      }
    case JOB_BASIC_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: 'job basic add error',
        success: '',
      }
    case CANDIDATE_INVITE_ADD_REQUEST:
      return {
        ...state,
        isCandInviteLoading: true,
        success: 'Candidate invite request',
        
      }
    case CANDIDATE_INVITE_ADD_SUCCESS:
      return {
        ...state,
        isCandInviteLoading: false,
        success: 'Candidate invite success',
        showToast: true,
      }
    case CANDIDATE_INVITE_ADD_ERROR:
      return {
        ...state,
        isCandInviteLoading: false,
        error: 'Candidate invite error',
      }
    

  default:
    return state
  }
}
