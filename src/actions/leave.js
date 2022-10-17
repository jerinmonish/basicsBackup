import axios from 'axios'
import * as constants from '../actions/types'
import { toast } from 'react-toastify'
import { getToken } from '../../src/utils/helper'


//LeaveTypesList
export const LeaveTypesList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVETYPES_LIST_REQUEST,
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
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name,create_date',
    query: "{id,name,group_id,company_id,validity_start,validity_stop,request_unit,code}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("leave Types",lgres);
        dispatch({
          type: constants.LEAVETYPES_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVETYPES_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}


//leaveTypes Delete
export const LeaveTypesAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.LEAVETYPES_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.leave.type/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.LEAVETYPES_DELETE_SUCCESS,
        })
        toast.success('Leave Types Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVETYPES_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//LeaveTypes  Add
export const LeaveTypesAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.LEAVETYPES_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }


  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.leave.type', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVETYPES_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/leave/LeaveTypes')
      })
      
  } catch (error) {
    dispatch({
      type: constants.LEAVETYPES_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//LeaveTypes edit/ find by id
export const LeaveTypesEditAPI = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVETYPES_EDITDETAILS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

 const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.leave.type/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVETYPES_EDITDETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVETYPES_EDITDETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}


//LeaveTypes update
export const LeaveTypesUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVETYPES_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.leave.type/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVETYPES_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/leave/LeaveTypes')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVETYPES_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Leave Request List
export const LeaveRequestList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVEREQUEST_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  
  const queryparams = {
    params: {
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name,create_date,request_date_from,request_date_to',
    query: "{id,name,group_id,mode_company_id,department_id,employee_id,holiday_status_id,request_date_from,request_date_to,state,number_of_days}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("leave Types",lgres);
        dispatch({
          type: constants.LEAVEREQUEST_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Leave Request List
export const LeaveRequestGrid = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVEREQUEST_GRID_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  
  const queryparams = {
    params: {
      query: "{id,name,group_id,mode_company_id,department_id,employee_id,holiday_status_id,request_date_from,request_date_to,state,number_of_days}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/get_api_calendar', {}, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("leave Types",lgres);
        dispatch({
          type: constants.LEAVEREQUEST_GRID_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_GRID_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//leave request  Delete
export const LeaveRequestAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.LEAVEREQUEST_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.leave/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.LEAVEREQUEST_DELETE_SUCCESS,
        })
        toast.success('Leave Request Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  }
  
  catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_DELETE_ERROR,
      
    })
    // alert(error)
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    // console.log(error?.response?.data);
  }
}


//LeaveRequest  Add
export const LeaveRequestAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.LEAVEREQUEST_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.leave', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/leave/leaveRequest')
      })
      
  } catch (error) {
    console.log(error?.response?.data?.result);
    dispatch({
      type: constants.LEAVEREQUEST_ADD_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
 
}

// holiday_status_id: '',
            // request_date_from: '',
            // request_date_to: '',
            // number_of_days: '',
            // name: '',
            // from_half: '',
            // to_half: '',
            // holiday_type: '',
            // group_id: '',
            // mode_company_id: '',
            // department_id: '',
            // employee_id: '',
            // report_note: '',
            
    // "query": "{request_date_from,request_date_to,name,employee_id,employee_id{leave_manager_id,id,name}}",



//LeaveRequest edit/ find by id
export const LeaveRequestEditAPI = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEREQUEST_EDITDETAILS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  const tempParams = {
    params: {
      isEdit: 1,
      query: "{id,name,location_id,holiday_status_id,holiday_type,request_date_from,number_of_days,request_date_to,group_id,mode_company_id,from_half,to_half,report_note,department_id,state,employee_id{leave_manager_id,name,id}}"

    },
  }

//  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.leave/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVEREQUEST_EDITDETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_EDITDETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//LeaveRequest  update
export const LeaveRequestUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.leave/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}



//Leaveallocation List
export const LeaveAllocationList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVEALLOCATION_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
    //
  
  const queryparams = {
    params: {
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name',
    query: "{id,name,group_id,mode_company_id,department_id,employee_id,date_from,date_to,holiday_type,allocation_type,holiday_status_id,holiday_type,duration_display,state}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.allocation', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("leave allocation",lgres);
        dispatch({
          type: constants.LEAVEALLOCATION_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//LeaveAllocation  Add
export const LeaveAllocationAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.LEAVEALLOCATION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }


  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.leave.allocation', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEALLOCATION_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/leave/leaveAllocation')
      })
      
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_ADD_ERROR,
    })
    // console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//LeaveAllocation edit/ find by id
export const LeaveAllocationEditAPI = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEALLOCATION_EDITDETAILS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

 const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.leave.allocation/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVEALLOCATION_EDITDETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_EDITDETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//LeaveAllocation  update
export const LeaveAllocationUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEALLOCATION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.leave.allocation/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEALLOCATION_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/leave/leaveAllocation')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Leaveallocation Delete
export const LeaveAllocationAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.LEAVEALLOCATION_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.leave.allocation/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.LEAVEALLOCATION_DELETE_SUCCESS,
        })
        toast.success('Leave Allocation Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//leave Allocation workflow API 


export const LeaveAllocationApprove = (data) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEALLOCATION_APPROVE_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

//  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.allocation/leave_allocation_validate', data, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("approve details",agres);
        dispatch({
          type: constants.LEAVEALLOCATION_APPROVE_STATUS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_APPROVE_STATUS_ERROR,
    })
    //console.log(error?.response);
  }
}

export const LeaveAllocationRefuse = (data) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEALLOCATION_REFUSE_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

//  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.allocation/leave_allocation_refuse', data, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVEALLOCATION_REFUSE_STATUS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_REFUSE_STATUS_ERROR,
    })
    //console.log(error?.response);
  }
}

export const LeaveAllocationDraft = (data) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEALLOCATION_DRAFT_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

//  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.allocation/leave_allocation_draft', data, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVEALLOCATION_DRAFT_STATUS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_DRAFT_STATUS_ERROR,
    })
    //console.log(error?.response);
  }
}

export const LeaveAllocationConfirm = (data) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEALLOCATION_CONFIRM_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

//  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.allocation/leave_allocation_confirm', data, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVEALLOCATION_CONFIRM_STATUS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_CONFIRM_STATUS_ERROR,
    })
    //console.log(error?.response);
  }
}

export const LeaveAllocationSecondApprove = (data) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVEALLOCATION_SECONDAPPROVE_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code': 400
  }

  //  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.allocation/leave_allocation_validate', data, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVEALLOCATION_SECONDAPPROVE_STATUS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEALLOCATION_SECONDAPPROVE_STATUS_ERROR,
    })
    //console.log(error?.response);
  }
}

// Leave request workflow API

export const LeaveRequestUpdateApproval = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_APPROVE_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // console.log("check",cid);
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_request_validate', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_APPROVE_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_APPROVE_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}
export const LeaveRequestUpdateRefuse = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_REFUSE_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_request_refuse', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_REFUSE_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_REFUSE_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export const LeaveRequestUpdateConfirm = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_CONFIRM_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_request_confirm', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_CONFIRM_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_CONFIRM_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export const LeaveRequestUpdateDraft = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_DRAFT_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  

  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_request_draft', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_DRAFT_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_DRAFT_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export const LeaveRequestSecondApproval = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_SECONDAPPROVE_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_request_draft', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_SECONDAPPROVE_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_SECONDAPPROVE_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export const LeaveRequestCancelRequest = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_CANCELREQUEST_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_cancel_request', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_CANCELREQUEST_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_CANCELREQUEST_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export const LeaveRequestCancelApproval = (mydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVEREQUEST_CANCELAPPROVAL_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave/leave_request_canceled', mydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVEREQUEST_CANCELAPPROVAL_STATUS_SUCCESS,
          payload: agres.data.result,
        })
        console.log(agres);
        // history.push('/leave/leaveRequest')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_CANCELAPPROVAL_STATUS_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}





//Leave Accumulation List
export const LeaveAccumulationListData = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVE_ACCUMULATION_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  const queryparams = {
    params: {
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name',
      query: "{id,name,employee_ids{id,name,job_id,department_id,work_email},source_leave_type_id,dest_leave_type_id,state,carryover_method,carryover_percentage,limit_carryover,carryover_days,carryover_executed,schedule_carryover,scheduled_date,allocations_count,allocations_generated,create_date}"
    },
  }
  try {
    await axios.post(constants.BASE_URL + '/leave.carry.over', queryparams, { headers: headers}).then((lgres) => {
      dispatch({
        type: constants.LEAVE_ACCUMULATION_LIST_SUCCESS,
        payload: lgres.data.result,
      })
    })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_ACCUMULATION_LIST_ERROR,
    })
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

//Leave Accumulation add
export const LeaveAccumulationAddData = (gpparams, history) => async (dispatch) => {
  dispatch({
    type: constants.LEAVE_ACCUMULATION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/create/leave.carry.over', gpparams, { headers: headers}).then((lgres) => {
      dispatch({
        type: constants.LEAVE_ACCUMULATION_ADD_SUCCESS,
        payload: lgres.data.result,
      })
      history.push('/leave/accumulation')
    })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_ACCUMULATION_ADD_ERROR,
    })
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

//Leave Accumulation Edit
export const LeaveAccumulationEditData = (id) => async (dispatch) => {
  dispatch({
    type: constants.LEAVE_ACCUMULATION_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  const tempParams = JSON.stringify({ params: { isEdit: 1 } })

  try {
    await axios.post(constants.BASE_URL + '/leave.carry.over/'+id, tempParams, { headers: headers}).then((lgres) => {
      dispatch({
        type: constants.LEAVE_ACCUMULATION_EDIT_SUCCESS,
        payload: lgres.data.result,
      })
    })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_ACCUMULATION_EDIT_ERROR,
    })
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

//Leave Accumulation add
export const LeaveAccumulationUpdateData = (lid, gpparams, history) => async (dispatch) => {
  dispatch({
    type: constants.LEAVE_ACCUMULATION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + `/edit/leave.carry.over/${lid}`, gpparams, { headers: headers}).then((lgres) => {
      dispatch({
        type: constants.LEAVE_ACCUMULATION_UPDATE_SUCCESS,
        payload: lgres.data.result,
      })
      history.push('/leave/accumulation')
    })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_ACCUMULATION_UPDATE_ERROR,
    })
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

//leaveTypes Delete
export const LeaveAccumulationDeleteData = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.LEAVE_ACCUMULATION_DELETE_REQUEST,
  })
  try {
    await axios.post(constants.BASE_URL + '/delete/leave.carry.over/' + gid,{},{ headers: headers })
      .then((agres) => {
        dispatch({
          type: constants.LEAVE_ACCUMULATION_DELETE_SUCCESS,
        })
        toast.success('Leave Accumulation Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_ACCUMULATION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}



//leave Main types
export const LeaveMaintypesList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVE_MAINTYPES_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
    //
  
  const queryparams = {
    params: {
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name,code',
    query: "{id,name,code,main_type,main_validation_type}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.main.type', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("leave allocation",lgres);
        dispatch({
          type: constants.LEAVE_MAINTYPES_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_MAINTYPES_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Main types  Add
export const LeaveMainTypesAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.LEAVE_MAINTYPES_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }


  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.leave.main.type', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVE_MAINTYPES_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/leave/maintypes')
      })
      
  } catch (error) {
    dispatch({
      type: constants.LEAVE_MAINTYPES_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

// Main types edit
export const LeaveMainTypesEditAPI = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.LEAVE_MAINTYPES_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

 const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.leave.main.type/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.LEAVE_MAINTYPES_EDIT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_MAINTYPES_EDIT_ERROR,
    })
    //console.log(error?.response);
  }
}

//MainTypes  update
export const LeaveMainTypesUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LEAVE_MAINTYPES_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.leave.main.type/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LEAVE_MAINTYPES_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/leave/maintypes')
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_MAINTYPES_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Main types Delete
export const LeaveMainTypesAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.LEAVE_MAINTYPES_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.leave.main.type/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.LEAVE_MAINTYPES_DELETE_SUCCESS,
        })
        toast.success('Main Type Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_MAINTYPES_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Leave Accumulation Status Update
export const LeaveAccumulationStatusUpdateData = (cid, apiUrlParam, history) => async (dispatch) => {
  dispatch({
    type: constants.LEAVE_ACCUMULATION_STATUS_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + `/leave.carry.over/${cid}/${apiUrlParam}`, {}, { headers: headers}).then((lgres) => {
      dispatch({
        type: constants.LEAVE_ACCUMULATION_STATUS_UPDATE_SUCCESS,
        payload: lgres.data.result,
      })
      history.push('/leave/accumulation')
    })
  } catch (error) {
    dispatch({
      type: constants.LEAVE_ACCUMULATION_STATUS_UPDATE_ERROR,
    })
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

export const LeaveRequestDataViewList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVEREQUEST_DATA_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log(gpparams);
    //
  
  // const queryparams = {
  //   params: {
  //     page_size: gpparams?.itemsPerPage,
  //     page: gpparams?.page,
  //     search_key: gpparams?.tableFilterValue,
  //     search_fields: 'name,code',
  //   query: "{id,name,code,main_type,main_validation_type}"
  //   },
  // }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leave.type/get_days_all_request', {}, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("leave allocation",lgres);
        dispatch({
          type: constants.LEAVEREQUEST_DATA_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVEREQUEST_DATA_LIST_ERROR,
    })
    // console.log(error)
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}





