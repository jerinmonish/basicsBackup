import axios from 'axios'
import * as constants from '../actions/types'
import { toast } from 'react-toastify'
import CryptoJS from 'crypto-js'
import { getToken } from '../../src/utils/helper'


//user List 
export const UserList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.USER_LIST_REQUEST,
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
      query: "{id,login,image_1920,name,email,mobile,group_ids,company_id,company_ids,location_ids,department_ids,sub_function_ids,groups_id}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.users', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    //  console.log("user",lgres);
        dispatch({
          type: constants.USER_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//employee  Export
export const EmployeeExportListValAPI = (query) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYEE_EXPORT_LIST_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/api.export.field.line/',query,{ headers: headers })
      .then((agres) => {
        dispatch({
          type: constants.EMPLOYEE_EXPORT_LIST_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYEE_EXPORT_LIST_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//user List Dropdown data
export const UserListDropDown = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.USER_LIST_REQUEST,
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
      query: "{id,name}",
      isDropdown: 1,
      filter: "[['employee_id', '=', False]]",
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.users', (gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    //  console.log("user",lgres);
        dispatch({
          type: constants.USER_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//uSER Delete
export const UserAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.USER_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/res.users/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.USER_DELETE_SUCCESS,
        })
        toast.success('User Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.USER_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//uSER Add
export const UserAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.USER_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/res.users/create_or_update_users', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.USER_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully !', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/administration/user')
      })
      
  } catch (error) {
    dispatch({
      type: constants.USER_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//user edit/ find by id
export const UserEditAPI = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.USER_EDITDETAILS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
// {
//     "params":{
//         "kwargs":{
//             "id": 2
//         }
//     }
// }
  // res.users/create_or_update_users
  // http://localhost:1414/api/res.users/get_user_based_major_role
  const tempParams = JSON.stringify({ params: { isEdit: 1 ,query: "{id,role_id,login,image_1920,name,email,mobile,group_ids,company_id,company_ids,location_ids,department_ids,sub_function_ids,tz}",} })
  try {
    await axios
      .post(constants.BASE_URL + `/res.users/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("user details",agres);
        dispatch({
          type: constants.USER_EDITDETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.USER_EDITDETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//user edit ROLE / find by id
export const UserEditRoleAPI = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.USER_EDITDETAILS_ROLE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
// {
//     "params":{
//         "kwargs":{
//             "id": 2
//         }
//     }
// }
  // http://localhost:1414/api/res.users/get_user_based_major_role
  const tempParams = JSON.stringify({ params: {"kwargs":{"id": cid}}})
  try {
    await axios
      .post(constants.BASE_URL + `/res.users/get_user_based_major_role`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("user details",agres);
        dispatch({
          type: constants.USER_EDITDETAILS_ROLE_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.USER_EDITDETAILS_ROLE_ERROR,
    })
    //console.log(error?.response);
  }
}


//User update
export const UserUpdateAPI = (data, history, cid) => async (
  dispatch,
) => {
  // console.log("data",data);
  dispatch({
    type: constants.USER_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  // const tempParams = { params: {"kwargs":{"id": cid},data}}
  try {
    await axios
      // .post(constants.BASE_URL + `/res.users/create_or_update_users`,tempParams,{
    .post(constants.BASE_URL + '/res.users/create_or_update_users',data,{
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.USER_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/administration/user')
      })
  } catch (error) {
    dispatch({
      type: constants.USER_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//User update
export const UserProfileUpdateAPI = (data) => async (dispatch) => {
  dispatch({
    type: constants.USER_PROFILE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/res.users/update_profile',data,{ headers: headers}).then((agres) => {
      dispatch({
        type: constants.USER_PROFILE_UPDATE_SUCCESS,
        payload: agres.data.result,
      });
      dispatch({
        type: constants.LOGIN_SUCCESS,
        returnToken:agres?.data?.result?.data?.access_token,
        payload:JSON.stringify(agres?.data?.result?.data),
      });
      if(agres.data.result?.message == "Profile Updated Successfully"){
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const userData = CryptoJS.AES.encrypt(JSON.stringify(agres?.data?.result?.data), 'talents-tech-bsoft-org').toString();
        const usertkn = CryptoJS.AES.encrypt(JSON.stringify(agres?.data?.result?.data?.access_token), 'talents-tech-bsoft-org-tkn').toString();
        localStorage.setItem('udata',userData);
        localStorage.setItem('utkn',usertkn);
        localStorage.setItem('tknexp',agres?.data?.result?.data?.expires);
        toast.success(agres.data.result?.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    })
  } catch (error) {
    dispatch({
      type: constants.USER_PROFILE_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

