import axios from 'axios'
import * as constants from '../actions/types'
import { toast } from 'react-toastify'
import { getToken } from '../../src/utils/helper'

// RelationshipList
export const RelationshipList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.RELATIONSHIP_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.relationship', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.RELATIONSHIP_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.RELATIONSHIP_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}


// RelationshipList Dropdown
export const RelationshipListDropdown = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.RELATIONSHIP_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      .post(constants.BASE_URL + '/hr.relationship', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.RELATIONSHIP_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.RELATIONSHIP_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// CompensationList Dropdown
export const GetCompensationData = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMPENSATION_DP_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.salary.rule', gpparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.COMPENSATION_DP_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPENSATION_DP_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Compensation Required Fields List Dropdown
export const GetCompensationRelatedData = (gpparams, mid) => async (dispatch) => {
  dispatch({
    type: constants.COMPENSATION_COAM_DP_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.salary.rule/'+mid, gpparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.COMPENSATION_COAM_DP_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPENSATION_COAM_DP_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Add Compensation
export const AddCompensationData = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMPENSATION_ADD_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.employee.compensation.line/', gpparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.COMPENSATION_ADD_SUCCESS,
          payload: relres.data.result,
        });
        toast.success("Compensation Added Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPENSATION_ADD_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Add Compensation
export const UpdateCompensationData = (id, gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COMPENSATION_UPDATE_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/edit/hr.employee.compensation.line/'+id, gpparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.COMPENSATION_UPDATE_SUCCESS,
          payload: relres.data.result,
        });
        toast.success("Compensation Updated Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPENSATION_UPDATE_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Add Compensation
export const DeleteCompensation = (id) => async (dispatch) => {
  dispatch({
    type: constants.COMPENSATION_DELETE_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headerss = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/delete/hr.employee.compensation.line/'+id, {}, { headers: headerss}).then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.COMPENSATION_DELETE_SUCCESS,
          payload: relres.data.result,
        });
        toast.success("Compensation Deleted Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COMPENSATION_DELETE_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Add Compensation
export const EditCompensationData = (eid) => async (dispatch) => {
  dispatch({
    type: constants.COMPENSATION_EDIT_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.employee.compensation.line/'+eid, JSON.stringify({ params: { isEdit: 1 } }), {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.COMPENSATION_EDIT_SUCCESS,
          payload: relres.data.result,
        });
      })
  } catch (error) {
    dispatch({
      type: constants.COMPENSATION_EDIT_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// RelationshipList Dropdown
export const UnauthenticatedRelationshipListDropdown = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.RELATIONSHIP_LIST_REQUEST,
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
      .post(constants.BASE_URL + '/open/hr.relationship', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("relres",relres);
        dispatch({
          type: constants.RELATIONSHIP_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.RELATIONSHIP_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}


//Family members Add
export const AddEmployeeFamilyMember = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.EMP_FAM_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.family.members', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.EMP_FAM_ADD_SUCCESS,
          payload: agres.data.result,
        });
        toast.success('Family Member Added Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_FAM_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Family members Delete
export const DeleteEmployeeFamilyMember = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_FAM_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.family.members/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.EMP_FAM_DELETE_SUCCESS,
        })
        toast.success('Employee Family Member Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_FAM_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Family member Details
export const EditDetailsEmployeeFamily = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_FAM_EDITDETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.family.members/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.EMP_FAM_EDITDETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
        // console.log(edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_FAM_EDITDETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Family member  Update
export const EmployeeFamilyUpdate = (gpedata,) => async (dispatch) => {
  // console.log("gpedata",gid,gpedata);
  dispatch({
    type: constants.EMP_FAM_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/edit/hr.family.members/'+JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.EMP_FAM_UPDATE_SUCCESS,
        });
        toast.success('Family Member Updated Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_FAM_UPDATE_ERROR,
    })
    // console.log(error)
     toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}



//Working Experience Add
export const AddEmployeeWorkExperience = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.EMP_WE_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.work.experience', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.EMP_WE_ADD_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_WE_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//WorkingExperience Update
export const WorkingExperienceUpdate = (gpedata,) => async (dispatch) => {
  dispatch({
    type: constants.EMP_WE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    //  await axios.post(constants.BASE_URL + '/edit/res.organization.type/' +JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
    await axios.post(constants.BASE_URL + '/edit/hr.work.experience/'+JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.EMP_WE_UPDATE_SUCCESS,
        });
        // history.push('/employee/add-employee')
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_WE_UPDATE_ERROR,
    })
    // console.log(error)
     toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}



//Working Experience Delete
export const DeleteEmployeeWorkExperience = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_WE_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.work.experience/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.EMP_WE_DELETE_SUCCESS,
        })
        toast.success('Employee Work Experience Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_WE_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Working Experience Details
export const WorkingExperienceDetails = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_WE_DETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.work.experience/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.EMP_WE_DETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
        // console.log(edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_WE_DETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}






//Education Details Add
export const AddEducationDetails = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.EMP_EDU_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.education', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.EMP_EDU_ADD_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_EDU_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Education Details  Delete
export const DeleteEmployeeEducation = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_EDU_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.education/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.EMP_EDU_DELETE_SUCCESS,
        })
        toast.success('Employee Education Details Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_EDU_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Education Details  Edit
export const EmployeeEducationDetails = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_EDU_EDITDETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.education/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.EMP_EDU_EDITDETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
        // console.log(edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_EDU_EDITDETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//employee education  Update
export const EmployeeEducationUpdate = (gpedata,) => async (dispatch) => {
  dispatch({
    type: constants.EMP_EDU_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    //  await axios.post(constants.BASE_URL + '/edit/res.organization.type/' +JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
    await axios.post(constants.BASE_URL + '/edit/hr.education/'+JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.EMP_EDU_UPDATE_SUCCESS,
        });
        // history.push('/employee/add-employee')
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_EDU_UPDATE_ERROR,
    })
    // console.log(error)
     toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}






//Bank Details Add
export const AddBankDetails = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.EMP_BANK_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/res.partner.bank', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.EMP_BANK_ADD_SUCCESS,
          payload: agres.data.result,
        })
        toast.success("Bank Details Added Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_BANK_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

}


//Bank Details editdetails
export const BankEditDetails = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_BANK_EDITDETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/res.partner.bank/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.EMP_BANK_EDITDETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
        // console.log(edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_BANK_EDITDETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//employee bank Update
export const EmployeeBankUpdate = (gpedata,) => async (dispatch) => {
  // console.log("EmployeeBankUpdate",gpedata);
  // console.log("gpedata",gid,gpedata);
  dispatch({
    type: constants.EMP_BANK_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    //  await axios.post(constants.BASE_URL + '/edit/res.organization.type/' +JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
    await axios.post(constants.BASE_URL + '/edit/res.partner.bank/'+JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        // console.log("WorkingExperience Update",agres);
        dispatch({
          type: constants.EMP_BANK_UPDATE_SUCCESS,
        });
         toast.success("Bank Details Updated Successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        })
        // history.push('/employee/add-employee')
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_BANK_UPDATE_ERROR,
    })
    // console.log(error?.response?.data)
     toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}


//Employee Bank Delete
export const EmployeeBankDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.EMP_BANK_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/res.partner.bank/' + gid, {},{ headers: headers },
      )
      .then((agres) => {
        // console.log(agres);
        dispatch({
          type: constants.EMP_BANK_DELETE_SUCCESS,
        })
        toast.success('Employee Bank Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.EMP_BANK_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}



//Organization type
export const OrganizationList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.ORGANIZATION_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.organization.type', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        dispatch({
          type: constants.ORGANIZATION_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.ORGANIZATION_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//ORGANIZATION Add
export const OrganisationTypeAdd = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.ORGANIZATION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/res.organization.type', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.ORGANIZATION_ADD_SUCCESS,
          payload: agres.data.result,
        })
        
        toast.success('Organization  Saved Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.ORGANIZATION_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Organization Details
export const OrganizationDetails = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.ORGANIZATION_DETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/res.organization.type/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.ORGANIZATION_DETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
        // console.log(edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.ORGANIZATION_DETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Organization Delete
export const OrganisationDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.ORGANIZATION_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/res.organization.type/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.ORGANIZATION_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Organization Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.ORGANIZATION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Organization Update
export const OrganizationUpdate = (gpedata) => async (dispatch) => {
  dispatch({
    type: constants.ORGANIZATION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/edit/res.organization.type/' +JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.ORGANIZATION_UPDATE_SUCCESS,
        })
          toast.success('Organization Updated Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })
      })
  } catch (error) {
    dispatch({
      type: constants.ORGANIZATION_UPDATE_ERROR,
    })
    // console.log(error)
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}


//Jobs List
export const JobsList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.JOB_CONFIG_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      .post(constants.BASE_URL + '/hr.job', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        dispatch({
          type: constants.JOB_CONFIG_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_CONFIG_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Job Add
export const JobAdd = (gpdata, history) => async (dispatch) => {
  dispatch({
    type: constants.JOB_CONFIG_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.job', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.JOB_CONFIG_ADD_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/configuration/jobs')
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_CONFIG_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Job Edit
export const JobEdit = (jid) => async (dispatch) => {
  dispatch({
    type: constants.JOB_CONFIG_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + `/hr.job/${jid}`, JSON.stringify({ params: { isEdit: 1 } }), {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.JOB_CONFIG_EDIT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_CONFIG_EDIT_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}


//Job Update
export const JobUpdate = (jid, gpedata, history) => async (dispatch) => {
  dispatch({
    type: constants.JOB_CONFIG_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/edit/hr.job/' +jid, gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.JOB_CONFIG_UPDATE_SUCCESS,
        });
        history.push('/configuration/jobs')
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_CONFIG_UPDATE_ERROR,
    })
    // console.log(error)
  }
}

//Jobs Delete
export const JobsDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.JOB_CONFIG_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/hr.job/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.JOB_CONFIG_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Job Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_CONFIG_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Jobs Position List
export const JobPositionList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.JOB_POSITION_CONFIG_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      .post(constants.BASE_URL + '/hr.job.position', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        dispatch({
          type: constants.JOB_POSITION_CONFIG_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_POSITION_CONFIG_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Job Postion Add
export const JobPostionAdd = (gpdata, history) => async (dispatch) => {
  dispatch({
    type: constants.JOB_POSITION_CONFIG_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.job.position', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.JOB_POSITION_CONFIG_ADD_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/configuration/job-position')
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_POSITION_CONFIG_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Job Postion Edit
export const JobPostionEdit = (jid) => async (dispatch) => {
  dispatch({
    type: constants.JOB_POSITION_CONFIG_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + `/hr.job.position/${jid}`, JSON.stringify({ params: { isEdit: 1 } }), {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.JOB_POSITION_CONFIG_EDIT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_POSITION_CONFIG_EDIT_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Job Postion Update
export const JobPositionUpdate = (jid, gpedata, history) => async (dispatch) => {
  dispatch({
    type: constants.JOB_POSITION_CONFIG_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/edit/hr.job.position/' +jid, gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.JOB_POSITION_CONFIG_UPDATE_SUCCESS,
        });
        history.push('/configuration/job-position')
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_POSITION_CONFIG_UPDATE_ERROR,
    })
    // console.log(error)
  }
}


//Job  Postion Delete
export const JobPostionDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.JOB_POSITION_CONFIG_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/hr.job.position/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.JOB_POSITION_CONFIG_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('Job Position Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.JOB_POSITION_CONFIG_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Costcenter Delete
export const CostCenterDeleteAPI = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.COSTCENTER_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
        constants.BASE_URL + '/delete/cost.center/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.COSTCENTER_DELETE_SUCCESS,
        })
        //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
        toast.success('CostCenter Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.COSTCENTER_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Costcenter edit/ find by id
export const CostCenterEditAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.COSTCENTER_EDITDETAILS_REQUEST,
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
      .post(constants.BASE_URL + `/cost.center/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.COSTCENTER_EDITDETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COSTCENTER_EDITDETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//Costcenter update
export const CostcenterUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.COSTCENTER_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/cost.center/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.COSTCENTER_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/configuration/CostCenter')
      })
  } catch (error) {
    dispatch({
      type: constants.COSTCENTER_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}




//Menu List
export const CusMenuList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.CUS_MENU_CONFIG_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/ir.ui.menu/', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        dispatch({
          type: constants.CUS_MENU_CONFIG_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CUS_MENU_CONFIG_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Menu Edit
export const CusMenuEdit = (jid) => async (dispatch) => {
  dispatch({
    type: constants.CUS_MENU_CONFIG_EDIT_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + `/ir.ui.menu/${jid}`, JSON.stringify({ params: { isEdit: 1 } }), {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.CUS_MENU_CONFIG_EDIT_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CUS_MENU_CONFIG_EDIT_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Menu Update
export const CusMenuUpdate = (jid, gpedata, history) => async (dispatch) => {
  dispatch({
    type: constants.CUS_MENU_CONFIG_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios.post(constants.BASE_URL + '/edit/ir.ui.menu/' +jid, gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.CUS_MENU_CONFIG_UPDATE_SUCCESS,
        });
        history.push('/configuration/menu')
      })
  } catch (error) {
    dispatch({
      type: constants.CUS_MENU_CONFIG_UPDATE_ERROR,
    })
    // console.log(error)
  }
}

// StudyLevel List
export const StudyLevelList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.STUDYLEVEL_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name,study_level_code,id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.study.level',gpparams ? gpparams:queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("study leve ",relres);
        dispatch({
          type: constants.STUDYLEVEL_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.STUDYLEVEL_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//study Program list
export const StudyProgramList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.STUDYPROGRAM_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.study.program', gpparams ? gpparams : queryparams, {
        headers: headers,
      })
      .then((relres) => {
        // console.log("STUDYPROGRAM",relres);
        dispatch({
          type: constants.STUDYPROGRAM_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.STUDYPROGRAM_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}


// StudyLevel Unauthenticated List
export const StudyLevelUAList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.STUDYLEVEL_UA_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name,study_level_code',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/hr.study.level', (gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("study leve ",relres);
        dispatch({
          type: constants.STUDYLEVEL_UA_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.STUDYLEVEL_UA_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.repsonse?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//study Program list
export const StudyProgramUAList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.STUDYPROGRAM_UA_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  // console.log(gpparams);
  const queryparams = {
    params: {
      page_size: gpparams?.itemsPerPage,
      page: gpparams?.page,
      search_key: gpparams?.tableFilterValue,
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/open/hr.study.program', (gpparams) ? gpparams : queryparams, {
        headers: headers,
      })
      .then((relres) => {
        // console.log("STUDYPROGRAM",relres);
        dispatch({
          type: constants.STUDYPROGRAM_UA_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.STUDYPROGRAM_UA_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Employment List
export const EmploymentList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.EMPLOYMENT_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      .post(constants.BASE_URL + '/hr.employment.type', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("EMPLOYMENT ",relres);
        dispatch({
          type: constants.EMPLOYMENT_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.EMPLOYMENT_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// LeavingReason List
export const LeavingReasonList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.LEAVINGREASON_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.leaving.reason', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        // console.log("leaving reason ",relres);
        dispatch({
          type: constants.LEAVINGREASON_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.LEAVINGREASON_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// DistrictList List
export const DistrictList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.DISTRICT_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      .post(constants.BASE_URL + '/res.state.district', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("Districtlist ",relres);
        dispatch({
          type: constants.DISTRICT_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.DISTRICT_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Bloodgroup List
export const BloodGroupList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.BLOODGROUP_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name,id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/blood.group', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("bloodgroup ",relres);
        dispatch({
          type: constants.BLOODGROUP_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.BLOODGROUP_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Religion List
export const ReligionList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.RELIGION_LIST_REQUEST,
  })
  const tmpToken = localStorage.getItem('user_token')
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.religion', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("RELIGION ",relres);
        dispatch({
          type: constants.RELIGION_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.RELIGION_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {  
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Costcenter List
export const CostcenterList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COSTCENTER_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/cost.center', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        //  console.log("COSTCENTER ",relres);
        dispatch({
          type: constants.COSTCENTER_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COSTCENTER_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Costcenter Add
export const CostcenterAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  // console.log("history",history);
  // console.log("dispatch",dispatch);
  dispatch({
    type: constants.COSTCENTER_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }


  try {
    await axios
      .post(constants.BASE_URL + '/create/cost.center/', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.COSTCENTER_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/configuration/CostCenter')
      })
      
  } catch (error) {
    dispatch({
      type: constants.COSTCENTER_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

// Industrytype List
export const IndustryTypeList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.INDUSTRYTYPE_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.industry.type', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        dispatch({
          type: constants.INDUSTRYTYPE_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.INDUSTRYTYPE_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

// Paygrade List
export const PaygradeList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.PAYGRADE_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name,pay_scale',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.pay.grade', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        // console.log('paygrade ', relres)
        dispatch({
          type: constants.PAYGRADE_LIST_SUCCESS,
          payload: relres.data.result,
        })
        
      })
  } catch (error) {
    dispatch({
      type: constants.PAYGRADE_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Paygrade Add
export const PaygradeAddAPI = (gpdata,history) => async (dispatch) => {
  dispatch({
    type: constants.PAYGRADE_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.pay.grade/', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.PAYGRADE_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Paygrade Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/configuration/paygrade')
      })
  } catch (error) {
    dispatch({
      type: constants.PAYGRADE_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Paygrade edit/ find by id
export const PaygradeEditAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.PAYGRADE_DETAILS_REQUEST,
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
      .post(constants.BASE_URL + `/hr.pay.grade/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.PAYGRADE_DETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.PAYGRADE_DETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//Paygrade update
export const PaygradeUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.PAYGRADE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.pay.grade/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.PAYGRADE_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/configuration/paygrade')
      })
  } catch (error) {
    dispatch({
      type: constants.PAYGRADE_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Paygrade Delete
export const PaygradeAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.PAYGRADE_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.pay.grade/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.PAYGRADE_DELETE_SUCCESS,
        })
        toast.success('Pay Grade Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.PAYGRADE_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}


// Caste List
export const CasteList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.CASTE_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.caste', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        // console.log('caste ', relres)
        dispatch({
          type: constants.CASTE_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CASTE_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Cast Add
export const CasteAdd = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.CASTE_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.caste/', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.CASTE_ADD_SUCCESS,
          payload: agres.data.result,
        })
        toast.success('Caste Saved Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CASTE_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//caste Details for fetch id based data to display in form
export const CasteDetails = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.CASTE_DETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/hr.caste/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.CASTE_DETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
      //  console.log("CASTE_DETAILS_SUCCESS",edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.CASTE_DETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Caste Update
export const CasteUpdate = (gpedata) => async (dispatch) => {
  dispatch({
    type: constants.CASTE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // console.log("headers",headers);

  try {
    await axios.post(constants.BASE_URL + '/edit/hr.caste/' +JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.CASTE_UPDATE_SUCCESS,
        })
          toast.success('Caste Updated Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })

          // console.log("agres",agres);
      })
  } catch (error) {
    dispatch({
      type: constants.CASTE_UPDATE_ERROR
      ,
    })
    // console.log(error)
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}


//caste Delete
export const CasteAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.CASTE_DELETE_REQUEST,
  })
  try {
    await axios
      .post(

      
        constants.BASE_URL + '/delete/hr.caste/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.CASTE_DELETE_SUCCESS,
        })
        toast.success('Caste Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.CASTE_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}







// Bank List
export const BankList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.BANK_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name,id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/res.bank',queryparams,{
        headers: headers,
      })
      .then((relres) => {
        // console.log(' ', relres)
        dispatch({
          type: constants.BANK_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.BANK_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Bank Add
export const BankAddAPI = (gpdata) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.BANK_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + '/create/res.bank/', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.BANK_ADD_SUCCESS,
          payload: agres.data.result,
        })
        toast.success('Bank Saved Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.BANK_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//bank Details for fetch id based data to display in form
export const BankDisplayAPI = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.BANK_DETAILS_REQUEST,
  })
  try {
    await axios
      .post(constants.BASE_URL + '/res.bank/' + gid, {}, { headers: headers })
      .then((edgres) => {
        dispatch({
          type: constants.BANK_DETAILS_SUCCESS,
          payload: edgres?.data?.result?.data,
        })
      //  console.log("CASTE_DETAILS_SUCCESS",edgres?.data?.result?.data);
      })
  } catch (error) {
    dispatch({
      type: constants.BANK_DETAILS_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}


//bank Update
export const BankUpdateAPI = (gpedata) => async (dispatch) => {
  // console.log("BankUpdateAPI",gpedata);
  dispatch({
    type: constants.BANK_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  // console.log("headers",headers);

  try {
    await axios.post(constants.BASE_URL + '/edit/res.bank/' +JSON.parse(gpedata).params.data.id,gpedata,{ headers: headers },)
      .then((agres) => {
        dispatch({
          type: constants.BANK_UPDATE_REQUEST,
        })
          toast.success('Bank Updated Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })

          // console.log("agres",agres);
      })
  } catch (error) {
    dispatch({
      type: constants.BANK_UPDATE_REQUEST
      ,
    })
    // console.log(error)
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//bank Delete
export const BankAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.BANK_DELETE_REQUEST,
  })
  try {
    await axios
      .post(

      
        constants.BASE_URL + '/delete/res.bank/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.BANK_DELETE_SUCCESS,
        })
        toast.success('Bank Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.BANK_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}



// Designation List
export const DesignationList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.DESIGNATION_LIST_REQUEST,
  })
  // const tmpToken = localStorage.getItem('user_token');
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
      search_fields: 'name,salary_grade_id,code',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.designations', queryparams, {
        headers: headers,
      })
      .then((relres) => {
        // console.log(' ', relres)
        dispatch({
          type: constants.DESIGNATION_LIST_SUCCESS,
          payload: relres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.DESIGNATION_LIST_ERROR,
    })
    // console.log(error);
    toast.error(error.repsonse.data.message, {
      position: toast.POSITION.TOP_CENTER,
    })
  }
}

//Designation Add
export const DesignationAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.DESIGNATION_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }


  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.designations/', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.DESIGNATION_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/configuration/designation')
      })
      
  } catch (error) {
    dispatch({
      type: constants.DESIGNATION_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//designation edit/ find by id
export const DesignationEditAPI = (cid) => async (dispatch) => {
  dispatch({
    type: constants.DESIGNATION_DETAILS_REQUEST,
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
      .post(constants.BASE_URL + `/hr.designations/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.DESIGNATION_DETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.DESIGNATION_DETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//designation update
export const DesignationUpdateAPI = (cpydata, history, cid) => async (
  dispatch,
) => {
  dispatch({
    type: constants.DESIGNATION_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.designations/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.DESIGNATION_UPDATE_SUCCESS,
          payload: agres.data.result,
        })
        history.push('/configuration/designation')
      })
  } catch (error) {
    dispatch({
      type: constants.DESIGNATION_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//designation Delete
export const DesignationAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.DESIGNATION_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.designations/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.DESIGNATION_DELETE_SUCCESS,
        })
        toast.success('Designation Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.DESIGNATION_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}




// worktimelist
export const WorkTimeList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.WORKTIME_LIST_REQUEST,
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
      search_fields: 'name,company_id',
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/resource.calendar', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.WORKTIME_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.WORKTIME_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

// Country list
export const CountryList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.COUNTRY_LIST_REQUEST,
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
      .post(constants.BASE_URL + '/res.country', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.COUNTRY_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COUNTRY_LIST_ERROR,
    })
    // console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

// state list
export const StateList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.STATE_LIST_REQUEST,
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
      .post(constants.BASE_URL + '/res.country.state', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
        // console.log(lgres);
        dispatch({
          type: constants.STATE_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.STATE_LIST_ERROR,
    })
    console.log(error)
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

//Group Add
// export const GroupAdd = (gpdata) => async (dispatch) => {
//   dispatch({
//     type: constants.GROUP_ADD_REQUEST
//   });
//   const tmpToken = localStorage.getItem('user_token');
//   const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `${tmpToken}`,
//   }

//   try {
//     await axios.post(constants.BASE_URL+'/create/res.group',gpdata,{headers: headers})
//     .then((agres)=> {
//         console.log(agres);
//       dispatch({
//         type: constants.GROUP_ADD_SUCCESS,
//         payload:agres.data.result
//       });
//       toast.success("Group Saved Successfully", {
//         position: toast.POSITION.TOP_RIGHT
//       });
//     });
//   } catch (error) {
//     dispatch({
//       type: constants.GROUP_ADD_ERROR
//     });
//     //console.log(error?.response);
//     toast.error(error?.response?.data?.result?.message, {
//       position: toast.POSITION.TOP_RIGHT
//     });
//   }
// }

//Group Delete
// export const GroupDelete = (gid) => async (dispatch) => {
//   const tmpToken = localStorage.getItem('user_token');
//   const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `${tmpToken}`,
//   }
//   dispatch({
//     type: constants.GROUP_DELETE_REQUEST
//   });
//   try {
//     await axios.post(constants.BASE_URL+'/delete/res.group/'+gid,{},{headers: headers})
//     .then((agres)=> {
//       dispatch({
//         type: constants.GROUP_DELETE_SUCCESS,
//       });
//       //if(agres.response.data.result.message === "Deleted successfully" && agres.response.data.result.status === 200){
//         toast.success("Group Deleted Successfully", {
//           position: toast.POSITION.TOP_RIGHT
//         });
//       //}
//       console.log(agres);
//     });
//   } catch (error) {
//     dispatch({
//       type: constants.GROUP_DELETE_ERROR,
//     });
//     toast.error(error?.response?.data?.result?.message, {
//       position: toast.POSITION.TOP_RIGHT
//     });
//     //console.log(error.response.data.result.message);
//   }
// }

//Group Details
// export const GroupDetails = (gid) => async (dispatch) => {
//   const tmpToken = localStorage.getItem('user_token');
//   const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `${tmpToken}`,
//   }
//   dispatch({
//     type: constants.GROUP_DETAILS_REQUEST
//   });
//   try {
//     await axios.post(constants.BASE_URL+'/res.group/'+gid,{},{headers: headers})
//     .then((edgres)=> {
//       dispatch({
//         type: constants.GROUP_DETAILS_SUCCESS,
//         payload:edgres?.data?.result?.data
//       });
//       // console.log(edgres?.data?.result?.data);
//     });
//   } catch (error) {
//     dispatch({
//       type: constants.GROUP_DETAILS_ERROR,
//     });
//     toast.error(error?.response?.data?.result?.message, {
//       position: toast.POSITION.TOP_RIGHT
//     });
//     //console.log(error.response.data.result.message);
//   }
// }

//Group Update
// export const GroupUpdate = (gpedata) => async (dispatch) => {
//   dispatch({
//     type: constants.GROUP_UPDATE_REQUEST
//   });
//   const tmpToken = localStorage.getItem('user_token');
//   const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `${tmpToken}`,
//   }

//   try {
//     await axios.post(constants.BASE_URL+'/edit/res.group/'+JSON.parse(gpedata).params.data.id,gpedata,{headers: headers})
//     .then((agres)=> {
//       dispatch({
//         type: constants.GROUP_UPDATE_SUCCESS,
//       });
//       if(agres?.data?.result?.status === 200 && agres?.data?.result?.message === "Updated successfully."){
//         toast.success("Group Updated Successfully", {
//           position: toast.POSITION.TOP_RIGHT
//         });
//       }
//     });
//   } catch (error) {
//     dispatch({
//       type: constants.GROUP_UPDATE_ERROR
//     });
//     console.log(error);
//     toast.error(error?.response?.data?.result?.message, {
//       position: toast.POSITION.TOP_RIGHT
//     });
//   }
// }
