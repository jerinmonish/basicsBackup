import axios from 'axios'
import * as constants from '../actions/types'
import { getToken } from '../../src/utils/helper'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Group List for dropdown
export const CommonGroupList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.GROUP_ONLY_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.group', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.GROUP_ONLY_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.GROUP_ONLY_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Type Of Organization List for dropdown
export const CommonTypeOfOrgList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_OF_ORG_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.organization.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_OF_ORG_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_OF_ORG_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Country List for dropdown
export const CommonCountryList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_COUNTRY_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.country', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_COUNTRY_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_COUNTRY_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//State List based on country id for dropdown
export const CommonStateList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_STATE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['country_id', 'in', [" + gpparams + ']]]',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.country.state', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_STATE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_STATE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//District List based on state id for dropdown
export const CommonDistrictList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_DISTRICT_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['state_id', 'in', [" + gpparams + ']]]',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.state.district', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_DISTRICT_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_DISTRICT_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}


//Country List for dropdown unauthenticated 1
export const CommonUnauthenticatedCountryList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_UA_TYPE_COUNTRY_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/res.country', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_UA_TYPE_COUNTRY_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_UA_TYPE_COUNTRY_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//State List based on country id for dropdown unauthenticated 1
export const CommonUnauthenticatedStateList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_UA_TYPE_STATE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['country_id', 'in', [" + gpparams + ']]]',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/res.country.state', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_UA_TYPE_STATE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_UA_TYPE_STATE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//District List based on state id for dropdown unauthenticated 1
export const CommonUnauthenticatedDistrictList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_UA_TYPE_DISTRICT_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['state_id', 'in', [" + gpparams + ']]]',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/res.state.district', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_UA_TYPE_DISTRICT_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_UA_TYPE_DISTRICT_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Country List for dropdown unauthenticated 2
export const CommonUnauthenticatedCountryList2 = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_COUNTRY_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/res.country', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_COUNTRY_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_COUNTRY_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//State List based on country id for dropdown unauthenticated 2
export const CommonUnauthenticatedStateList2 = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_STATE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['country_id', 'in', [" + gpparams + ']]]',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/res.country.state', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_STATE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_STATE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//District List based on state id for dropdown unauthenticated 3
export const CommonUnauthenticatedDistrictList2 = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_DISTRICT_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['state_id', 'in', [" + gpparams + ']]]',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/res.state.district', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_DISTRICT_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_DISTRICT_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Location based Function Data
export const CommonLocationIdBasedFunctionData = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_LOC_FUN_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  try {
    await axios
      .post(constants.BASE_URL + '/hr.department', gpparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.COMMON_TYPE_LOC_FUN_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_LOC_FUN_ERROR,
    })
    console.log(error)
  }
}

// function Id based sub-function List  for dropdown
export const CommonSubfunctionList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_SUBFUNCTION_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter: "[['parent_id', '=', [" + gpparams + ']]]',
    },
  }

  try {
    await axios
      .post(constants.BASE_URL + '/hr.department',(gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log("subfunctionCommonData",lgres);
        dispatch({
          type: constants.COMMON_TYPE_SUBFUNCTION_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_SUBFUNCTION_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}


//Currency List for dropdown
export const CommonCurrencyList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_CURR_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.currency', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_TYPE_CURR_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_CURR_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Industry Type List for dropdown
export const CommonIndustryTypeDropdownList = (gpparams) => async (
  dispatch,
) => {
  dispatch({
    type: constants.COMMON_INDUSTRY_TYPE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.industry.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.COMMON_INDUSTRY_TYPE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_INDUSTRY_TYPE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Company List for dropdown
export const CompanyDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_COMPANYLIST_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    error_code:400,
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.company',(gpparams) ? gpparams : queryparams,  {
      headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for company', lgres)
        dispatch({
          type: constants.COMMON_TYPE_COMPANYLIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_COMPANYLIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Role List for dropdown
export const RoleDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_ROLE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.users/get_user_based_major_role', (gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for role', lgres.data.result)
        dispatch({
          type: constants.COMMON_TYPE_ROLE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_ROLE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}




//CostCenter List for dropdown
export const GetChartData = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.PIE_GRAPH_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee/get_headcount_data_basic', gpparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.PIE_GRAPH_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.PIE_GRAPH_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//CostCenter List for dropdown
export const getReportManagerDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_GET_REPORT_MANAGER_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  if(gpparams){
    var queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: "[['company_id', 'in', [" + gpparams + ']]]',
      },
    }
  } else {
    var queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
      },
    }
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.COMMON_TYPE_GET_REPORT_MANAGER_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_GET_REPORT_MANAGER_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//CostCenter List for dropdown
export const CostCenterDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_COSTCENTER_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  if(gpparams){
    var queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: "[['company_id', 'in', [" + gpparams + ']]]',
      },
    }
  } else {
    var queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
      },
    }
  }
  try {
    await axios
      .post(constants.BASE_URL + '/cost.center', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.COMMON_TYPE_COSTCENTER_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_COSTCENTER_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Data based on requirement of company id for dropdown
export const CommonCompanyIdBasedData = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_COMPANY_CUSTOM_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/filter/common', gpparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log("CommonCompanyIdBasedData",lgres);
        dispatch({
          type: constants.COMMON_COMPANY_CUSTOM_SUCCESS,
          payload: lgres.data.result.data,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_COMPANY_CUSTOM_ERROR,
    })
    console.log(error)
  }
}

//Parent List for dropdown
export const ParentFuncationDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_PARENT_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.department', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.COMMON_TYPE_PARENT_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_PARENT_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Designation List for dropdown
export const DesignationDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_DESIGNATION_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.designations', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for designation', lgres)
        dispatch({
          type: constants.COMMON_TYPE_DESIGNATION_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_DESIGNATION_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Leaving List for dropdown
export const LeavingReasonDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_LEAVINGREASON_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leaving.reason', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for designation', lgres)
        dispatch({
          type: constants.COMMON_TYPE_LEAVINGREASON_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_LEAVINGREASON_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//bloodgroup List for dropdown
export const BloodgroupDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_BLOODGROUP_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/blood.group', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for designation', lgres)
        dispatch({
          type: constants.COMMON_TYPE_BLOODGROUP_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_BLOODGROUP_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Religion List for dropdown
export const ReligionDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_RELIGION_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.religion', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for religionCommonData', lgres)
        dispatch({
          type: constants.COMMON_TYPE_RELIGION_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_RELIGION_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Employee List for dropdown
export const EmployeeDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_EMPLOYEE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employment.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log('DROPdownlist for religionCommonData', lgres)
        dispatch({
          type: constants.COMMON_TYPE_EMPLOYEE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_EMPLOYEE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Workingtime List for dropdown
export const WorkingTimeDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_WORKINGTIME_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/resource.calendar', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log('DROPdownlist for workingtimeOptions', lgres)
        dispatch({
          type: constants.COMMON_TYPE_WORKINGTIME_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_WORKINGTIME_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

// EmployeementType List for dropdown
export const EmployeementDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_EMPLOYEEMENT_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employment.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log('DROPdownlist for workingtimeOptions', lgres)
        dispatch({
          type: constants.COMMON_TYPE_EMPLOYEEMENT_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_EMPLOYEEMENT_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}


//function List for dropdown
export const FunctionDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_FUNCTION_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
      filter : "[['parent_id', '=', False]]"
    },
  }
  
  try {
    await axios
      .post(constants.BASE_URL + '/hr.department',(gpparams) ? gpparams: queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log('DROPdownlist for COMMON_TYPE_FUNCTION_SUCCESS', lgres)
        dispatch({
          type: constants.COMMON_TYPE_FUNCTION_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_FUNCTION_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}
//medium  List for dropdown
export const MediumDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_MEDIUM_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
     
    },
  }
  
  try {
    await axios
      .post(constants.BASE_URL + '/utm.medium',(gpparams) ? gpparams: queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log('DROPdownlist for COMMON_TYPE_FUNCTION_SUCCESS', lgres)
        dispatch({
          type: constants.COMMON_TYPE_MEDIUM_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_MEDIUM_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}



//function List for dropdown
export const LocationDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_LOCATION_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }

  try {
    await axios
      .post(constants.BASE_URL + '/company.location',(gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((lgres) => {
          // console.log('DROPdownlist for LOCATION_REQUEST ', lgres)
        dispatch({
          type: constants.COMMON_TYPE_LOCATION_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_LOCATION_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Job List for dropdown
export const JoblistDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_JOB_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }

  try {
    await axios
      .post(constants.BASE_URL + '/hr.job',(gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((lgres) => {
          // console.log('DROPdownlist for LOCATION_REQUEST ', lgres)
        dispatch({
          type: constants.COMMON_TYPE_JOB_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_JOB_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Job Position List for dropdown based on Job Id
export const JobPositionDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_JOB_POSTION_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/hr.job.position', gpparams, {
        headers: headers,
      })
      .then((lgres) => {
          // console.log('DROPdownlist for LOCATION_REQUEST ', lgres)
        dispatch({
          type: constants.COMMON_TYPE_JOB_POSTION_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_JOB_POSTION_ERROR,
    })
    console.log(error)
  }
}


//paygrade List for dropdown
export const PayGradeDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_PAYGRADE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name}',
      isDropdown: 1,
    },
  }

  try {
    await axios
      .post(constants.BASE_URL + '/hr.pay.grade', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
          // console.log('DROPdownlist for COMMON_TYPE_PAYGRADE_SUCCESS', lgres)
        dispatch({
          type: constants.COMMON_TYPE_PAYGRADE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_PAYGRADE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Job List for dropdown
export const CostCenterBasedRepManagerJob = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COST_CENTER_RM_JOB_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee/get_cost_center_data', gpparams , {
        headers: headers,
      })
      .then((lgres) => {
          // console.log('DROPdownlist for LOCATION_REQUEST ', lgres)
        dispatch({
          type: constants.COST_CENTER_RM_JOB_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COST_CENTER_RM_JOB_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//LEAVETYPE List for dropdown
export const LeaveTypesDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_LEAVETYPE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  // const queryparams = {
  //   params: {
  //     query: '{id,name}',
  //     isDropdown: 1,
  //     filter : "[['parent_id', '=', False]]"
  //   },
  // }
  
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.type',gpparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log('DROPdownlist for COMMON_TYPE_FUNCTION_SUCCESS', lgres)
        dispatch({
          type: constants.COMMON_TYPE_LEAVETYPE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_LEAVETYPE_ERROR,
    })
    // console.log(error)
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}

//hr Employee List for dropdown
export const HREmployeeDropDownList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_TYPE_HREMPLOYEE_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  // const queryparams = {
  //   params: {
  //     query: '{id,name}',
  //     isDropdown: 1,
  //     filter : "[['parent_id', '=', False]]"
  //   },
  // }
  
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee',gpparams, {
        headers: headers,
      })
      .then((lgres) => {
        //  console.log('DROPdownlist for COMMON_TYPE_FUNCTION_SUCCESS', lgres)
        dispatch({
          type: constants.COMMON_TYPE_HREMPLOYEE_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_TYPE_HREMPLOYEE_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

export const CommonMainTypesDropdown = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMMON_MAINTYPES_LIST_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      query: '{id,name,code,main_type,main_validation_type}',
      isDropdown: 1,
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.main.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMMON_MAINTYPES_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMMON_MAINTYPES_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

export const CommonRemainingDropdown = (id) => async (dispatch) => {
  dispatch({
    type: constants.REMAININGLEAVE_LIST_REQUEST,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  const params =
        {
            "params":
            {
                "kwargs": {
                    "employee_id": id
                }
          },
          
        }

  // remaining_leaves_calculate

  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.type/remaining_leaves_calculate', params, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.REMAININGLEAVE_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.REMAININGLEAVE_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}






