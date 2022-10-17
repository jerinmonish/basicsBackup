import axios from 'axios'
import * as constants from '../actions/types'
import { toast } from 'react-toastify'
import CryptoJS from 'crypto-js'
import { getToken, encryptSingleData } from '../../src/utils/helper'
export const GroupList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.GROUP_LIST_REQUEST,
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
      search_fields: 'name,code,create_date',
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
          type: constants.GROUP_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.GROUP_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Group Add
export const GroupAdd = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.GROUP_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/res.group', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.GROUP_ADD_SUCCESS,
          payload: agres.data.result,
        })
        toast.success('Group Saved Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.GROUP_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Group Delete
export const GroupDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.GROUP_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/res.group/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.GROUP_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Group Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.GROUP_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Group Details
export const GroupDetails = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.GROUP_DETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/res.group/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.GROUP_DETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
        // console.log(edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.GROUP_DETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Group Update
export const GroupUpdate = (gpedata) => async (dispatch) => {
  dispatch({
    type: constants.GROUP_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(
        constants.BASE_URL +
          '/edit/res.group/' +
          JSON.parse(gpedata).params.data.id,
        gpedata,
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.GROUP_UPDATE_SUCCESS,
        })
        if (
          agres?.data?.result?.status === 200 &&
          agres?.data?.result?.message === 'Updated successfully.'
        ) {
          toast.success('Group Updated Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
  } catch (error) {
    dispatch({
      type: constants.GROUP_UPDATE_ERROR,
    })
    console.log(error)
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Company List
export const CompanyList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMPANY_LIST_REQUEST,
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
      search_fields: 'name,group_id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.company', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COMPANY_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPANY_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//location List
export const LocationList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LOCATION_LIST_REQUEST,
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
      search_fields: 'name,industry_type_id,code,company_id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/company.location', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.LOCATION_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//funtion List
export const FuntionList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.FUNCTION_LIST_REQUEST,
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
      search_fields: 'name,code',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.department', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.FUNCTION_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.FUNCTION_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//funtion Add
export const FuntionAdd = (funcParams, history) => async (dispatch) => {
  dispatch({
    type: constants.FUNCTION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.department', funcParams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.FUNCTION_ADD_SUCCESS,
          payload: lgres.data.result,
        })
        history.push('/master/function')
      })
  } catch (error) {
    dispatch({
      type: constants.FUNCTION_ADD_ERROR,
    })
    console.log(error)
  }
}

//Company Get Details based on Company Id
export const FunctionEditDetails = (cid) => async (dispatch) => {
  dispatch({
    type: constants.FUNCTION_EDIT_REQUEST,
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
      .post(constants.BASE_URL + `/hr.department/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.FUNCTION_EDIT_SUCCESS,
          payload: agres?.data?.result?.data,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.FUNCTION_EDIT_ERROR,
    })
    //console.log(error?.response);
  }
}

//Function Update
export const FunctionUpdate = (gpedata, fid, history) => async (dispatch) => {
  dispatch({
    type: constants.FUNCTION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/edit/hr.department/' + fid, gpedata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.FUNCTION_UPDATE_SUCCESS,
        })
        history.push('/master/function')
      })
  } catch (error) {
    dispatch({
      type: constants.FUNCTION_UPDATE_ERROR,
    })
    console.log(error)
  }
}

//function Delete
export const FunctionDeleteAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.FUNCTION_DELETE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // /delete/company.location/261

  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/hr.department/' + cid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.FUNCTION_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Function Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.FUNCTION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}


//Subfuntion List
export const SubFunctionList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.SUBFUNCTION_LIST_REQUEST,
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
      search_fields: 'name,code,create_date,parent_id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.department', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.SUBFUNCTION_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.SUBFUNCTION_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Subfunction Add
export const SubFunctionAddAPI = (cpydata, history) => async (dispatch) => {
  dispatch({
    type: constants.SUBFUNCTION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.department', cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.SUBFUNCTION_ADD_SUCCESS,
          payload: agres.data.result,
        })
        console.log('create cpmy result', agres.data.result)
        history.push('/master/subfunction')
      })
  } catch (error) {
    dispatch({
      type: constants.SUBFUNCTION_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}
// View Sub-function
export const ViewSubfuncationAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.SUBFUNCTION_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // console.log("ViewSubfuncationAPI",headers);
  // const tempParams = JSON.stringify({ params: { isEdit: 1, filter: "[['parent_id', '=', "+true+"]]", } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.department/${cid}`,{}, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.SUBFUNCTION_EDIT_SUCCESS,
          payload: agres?.data?.result?.data,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.SUBFUNCTION_EDIT_ERROR,
    })
    //console.log(error?.response);
  }
}

//Sub-function Update
export const SubfunctionUpdate = (gpedata, fid, history) => async (dispatch) => {
  dispatch({
    type: constants.SUBFUNCTION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/edit/hr.department/' + fid, gpedata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.SUBFUNCTION_UPDATE_SUCCESS,
        })
        history.push('/master/subFunction')
      })
  } catch (error) {
    dispatch({
      type: constants.SUBFUNCTION_UPDATE_ERROR,
    })
    console.log(error)
  }
}

//Sub-function Delete
export const SubfunctionDeleteAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.LOCATION_DELETE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // /delete/company.location/261

  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/hr.department/' + cid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.LOCATION_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Sub Function Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}


//Company Add
export const CompanyAdd = (cpydata, history) => async (dispatch) => {
  dispatch({
    type: constants.COMPANY_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/res.company', cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.COMPANY_ADD_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/master/company')
      })
  } catch (error) {
    dispatch({
      type: constants.COMPANY_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Company Get Details based on Company Id
export const CommonEditDetails = (cid) => async (dispatch) => {
  dispatch({
    type: constants.COMPANY_EDIT_REQUEST,
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
      .post(constants.BASE_URL + `/res.company/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.COMPANY_EDIT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPANY_EDIT_ERROR,
    })
    //console.log(error?.response);
  }
}

//Company Add
export const CompanyUpdate = (cpydata, history, cid) => async (dispatch) => {
  dispatch({
    type: constants.COMPANY_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + `/edit/res.company/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.COMPANY_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
    //     toast.error(agres?.response?.data?.result?.message, {
    //   position: toast.POSITION.TOP_RIGHT,
    // })
        history.push('/master/company')
      })
  } catch (error) {
    dispatch({
      type: constants.COMPANY_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Company Delete
export const CompanyDelete = (cid) => async (dispatch) => {
  dispatch({
    type: constants.COMPANY_DELETE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/res.company/' + cid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.COMPANY_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Company Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.COMPANY_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}
//Location Add
export const LocationAdd = (cpydata, history) => async (dispatch) => {
  dispatch({
    type: constants.LOCATION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/company.location', cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LOCATION_ADD_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/master/location')
      })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Location edit/ find by id
export const LocationEditAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.LOCATION_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // .post(constants.BASE_URL + '/res.group/' + gid, {}, { headers: headers })
  // JSON.stringify({"params":{ "data":{isEdit: 1} }});
  const tempParams = JSON.stringify({ params: { isEdit: 1 } })
  try {
    await axios
      .post(constants.BASE_URL + `/company.location/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LOCATION_EDIT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_EDIT_ERROR,
    })
    //console.log(error?.response);
  }
}
//location update
export const LocationUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.LOCATION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + `/edit/company.location/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.LOCATION_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/master/location')
      })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//location Delete
export const LocationDeleteAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.LOCATION_DELETE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // /delete/company.location/261

  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/company.location/' + cid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.LOCATION_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Location Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Employee List
export const EmployeeUserList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_LIST_REQUEST,
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
      search_fields: 'name,employee_id,work_email,mobile_phone,designation_id',
      query:'{name,employee_id,work_email,mobile_phone,designation_id,id,name_as_per_aadhar}'
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Employee Profile Update List
export const EmployeeProfileUpdateHistoryList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_LIST_UPDATE_HISTORY_REQUEST,
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
      "kwargs":{
            // "employee_id": gpparams.eid ? gpparams.eid : '',
            //page_size: gpparams?.itemsPerPage,
            //page: gpparams?.page,
            //search_key: gpparams?.tableFilterValue,
            //search_fields: 'name, status',
        },
      //query:'{name, requested_date, status, id, write_date}',
      //filter: "[['employee_id', '=', "+105+"]]",
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee.update/get_employee_self_update_record_details', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_LIST_UPDATE_HISTORY_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_LIST_UPDATE_HISTORY_ERROR,
    })
    console.log(error)
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}

// Employee Add
export const EmployeeAddAPI = (funcParams, history) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.employee', funcParams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_ADD_SUCCESS,
          payload: lgres.data.result,
        })
        history.push('/employee/edit-employee/'+encryptSingleData(lgres.data?.result?.data));
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_ADD_ERROR,
    })
    console.log(error)
  }
}

// Employee Add
export const EmployeeUpdateAPI = (eid, funcParams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/edit/hr.employee/'+eid, funcParams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_UPDATE_SUCCESS,
          payload: lgres.data.result,
        });
        //console.log(lgres.data.result.message == "Updated successfully." && lgres.data.result.status == 200);
        if(lgres.data.result.message == "Updated successfully." && lgres.data.result.status == 200){
          toast.success('Employee Updated Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        // history.push('/employee/employee')
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_UPDATE_ERROR,
    });
    toast.error('Error Updating Employee !', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(error)
  }
}

// Employee Update Self API
export const EmployeeEditSelfAPI = (eid, funcParams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_VIEW_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  const tempParams = JSON.stringify({ params: { isEdit: 1, 
"query": "{id,employee_id,status,name,marriage_date,marital,spouse_complete_name,spouse_birthdate,door_no,house_name,street_name,place_name,district_id,state_id,country_id,pin_code,cur_door_no,cur_pin_code,cur_house_name,cur_street_name,cur_place_name,cur_district_id,cur_state_id,cur_country_id,same_as_current,emergency_contact,emergency_contact_person,education_ids{id,study_level_id,program_id,year_of_passing,institution,note,mode,result,attachment,attachment_name,board_or_university},family_member_ids{id,name,relationship_id,gender,birthday,phone}}" } })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee.update/'+eid, tempParams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_VIEW_SUCCESS,
          payload: lgres.data.result,
        });
        // history.push('/employee/employee')
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_UPDATE_ERROR,
    });
    toast.error('Error Fetching Employee !', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(error)
  }
}

// Employee Add
export const EmployeeUpdatePersonalSelfAPI = (eid, funcParams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee.update/create_or_update_hr_emp_self/', funcParams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_UPDATE_SUCCESS,
          payload: lgres.data.result,
        });
        //console.log(lgres.data.result.message == "Updated successfully." && lgres.data.result.status == 200);
        // history.push('/employee/employee')
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_UPDATE_ERROR,
    });
    toast.error('Error Fetching Employee !', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(error)
  }
}

// Employee Add
export const EmployeeUpdatePersonalSelfAPIStatus = (eid,estatus, funcParams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee.update/'+eid+'/'+estatus, funcParams, {
        headers: headers,
      })
      .then((lgres) => {
        dispatch({
          type: constants.EMPLOYEE_UPDATE_SUCCESS,
          payload: lgres.data.result,
        });
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_UPDATE_ERROR,
    });
    toast.error('Error Fetching Employee !', {
      position: toast.POSITION.TOP_RIGHT,
    })
    console.log(error)
  }
}

//employee  Delete by id
export const EmployeeDeletePersonalSelfAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_DELETE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/delete/hr.employee.update/' + cid,{},{ headers: headers })
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_DELETE_SUCCESS,
        })
        toast.success('Employee Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//View employee By Id
export const ViewEmployeeByIdAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_VIEW_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // .post(constants.BASE_URL + '/res.group/' + gid, {}, { headers: headers })
  // JSON.stringify({"params":{ "data":{isEdit: 1} }});
  const tempParams = JSON.stringify({ params: { isEdit: 1, 
"query": "{id,name_as_per_aadhar,name_as_per_voter_id,name,aadhar,birthday,cur_pin_code,image_1920,cost_center_id,gender,door_no,house_name,street_name,place_name,district_id,state_id,country_id,pin_code,aadhar_proof,passport_country_id,passport_id,passport_sur_name,passport_given_name,passport_place_of_issue,passport_expiry_date,passport_proof,is_international_worker,pan_id,name_as_per_pan,pan_proof,voter_country_id,voter_id,voter_proof,mobile_phone,land_line_no,emergency_contact,emergency_contact_person,emergency_contact_person_relation_id,personal_email,blood_group_id,uan_no,epf_previous_employer,epf_joining_date,epf_leaving_date,marital,spouse_complete_name,marriage_date,spouse_birthdate,religion_id,is_disabled,disabilities,cur_door_no,cur_house_name,cur_street_name,cur_place_name,cur_district_id,cur_state_id,cur_country_id,employee_id,joining_date,employment_type_id,group_id,company_id,location_id,department_id,sub_function_id,parent_id,assistant,work_location,designation_id,pay_grade_id,work_email,work_phone,appointment_proof,is_company_transport,pickup_location,pickup_pin_code,route_no,training_duration,probation_duration,training_complete_date,probation_complete_date,confirmation_date,is_eligible_for_ot,ot_wages,is_eligible_for_shift_allowance,caste_id,show_caste,resignation_date,notice_period,relieving_date,leaving_reason_id,leaving_reason_name,termination_date,death_date,employee_id_new,rejoin_date,new_name,gazette_date,gazette_proof,tz,resource_calendar_id,job_id,position_id,user_id,leave_manager_id,family_member_ids{id,name,relationship_id,gender,birthday,phone,employee_id},education_ids{id,study_level_id,program_id,year_of_passing,institution,note,mode,result,attachment,attachment_name,board_or_university,employee_id},work_experience_ids{id,name,joining_date,leaving_date,role_played,employee_id},bank_account_ids{id,acc_number,account_type,acc_holder_name,bank_id,bank_branch,ifsc_code,employee_id,door_no,house_name,street_name,place_name,district_id,state_id,country_id,pin_code},compensation_ids{id,type,amount,code,salary_id,define_amount_in_emp,employee_id}}" } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.employee/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_VIEW_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_VIEW_ERROR,
    })
    //console.log(error?.response);
  }
}

//View employee By Id
export const GetEmployeeByIdForSelfUpdateAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_VIEW_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  // .post(constants.BASE_URL + '/res.group/' + gid, {}, { headers: headers })
  // JSON.stringify({"params":{ "data":{isEdit: 1} }});
  const tempParams = JSON.stringify({ params: { isEdit: 1, 
"query": "{name,marriage_date,marital,same_as_current,spouse_complete_name,spouse_birthdate,door_no,house_name,street_name,place_name,district_id,state_id,country_id,pin_code,cur_door_no,cur_pin_code,cur_house_name,cur_street_name,cur_place_name,cur_district_id,cur_state_id,cur_country_id,same_as_current,emergency_contact,emergency_contact_person,education_ids{id,study_level_id,program_id,year_of_passing,institution,note,mode,result,attachment,attachment_name,board_or_university},family_member_ids{id,name,relationship_id,gender,birthday,phone}}" } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.employee/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_VIEW_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_VIEW_ERROR,
    })
    //console.log(error?.response);
  }
}

//employee  Delete by id
export const EmployeeDeleteAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_DELETE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // /delete/company.location/261

  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/hr.employee/' + cid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Employee Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//employee  Export
export const EmployeeExportAPI = (query) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_EXPORT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/export/',query,{ headers: headers })
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_EXPORT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_EXPORT_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//employee  Export
export const EmployeeImportAPI = (query) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_IMPORT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/import/hr-employee/',query,{ headers: headers })
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_IMPORT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_IMPORT_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

// To render number from aadhar Id
export const AadharIdApi = (funcParams) => async (dispatch) => {
  dispatch({
    type: constants.AADHAR_IMG_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/parse/aadhar', funcParams, {headers: headers}).then((lgres) => {
      dispatch({
        type: constants.AADHAR_IMG_SUCCESS,
        payload: lgres.data.result,
      });
    })
  } catch (error) {
    dispatch({
      type: constants.AADHAR_IMG_ERROR,
    });
    console.log(error)
  }
}

// To render number from pan Id
export const PanIdApi = (funcParams) => async (dispatch) => {
  dispatch({
    type: constants.PAN_IMG_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/parse/pan', funcParams, {headers: headers}).then((lgres) => {
      dispatch({
        type: constants.PAN_IMG_SUCCESS,
        payload: lgres?.data?.result,
      });
    })
  } catch (error) {
    dispatch({
      type: constants.PAN_IMG_ERROR,
    });
    console.log(error)
  }
}

