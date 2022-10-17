import axios from 'axios'
import * as constants from '../actions/types'
import { toast } from 'react-toastify'
import { getToken, encryptSingleData } from '../../src/utils/helper'

//Candidate List 
export const CandidateList = (gpparams) => async (dispatch) => {
  dispatch({
    type: constants.CANDIDATE_LIST_REQUEST,
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
      search_fields: 'name,partner_name,email_from',
    query: "{id,name,email_from,partner_name,partner_mobile,process_state,company_id,description,department_id,location_id,job_id,medium_id,applied_on,reference,stage_id}"
    },
  }
  try {
    await axios
      .post(constants.BASE_URL + '/hr.applicant', queryparams, {
        headers: headers,
      })
      .then((lgres) => {
    // console.log("CandidateList",lgres);
        dispatch({
          type: constants.CANDIDATE_LIST_SUCCESS,
          payload: lgres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_LIST_ERROR,
    })
    console.log(error?.response?.data?.result?.message)
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_CENTER
    });
  }
}


//Candidate Delete
export const CandidateAPIDelete = (gid) => async (dispatch) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
  dispatch({
    type: constants.CANDIDATE_DELETE_REQUEST,
  })
  try {
    await axios
      .post(
   
        constants.BASE_URL + '/delete/hr.applicant/' + gid,
        {},
        { headers: headers },
      )
      .then((agres) => {
        dispatch({
          type: constants.CANDIDATE_DELETE_SUCCESS,
        })
        toast.success('Candidate Deleted Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
        //}
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_DELETE_ERROR,
    })
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    //console.log(error.response.data.result.message);
  }
}

//Candidate Add
export const CandidateAddAPI = (gpdata,history) => async (dispatch) => {
  dispatch({
    type: constants.CANDIDATE_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/create/hr.applicant', gpdata, {headers: headers,}).then((agres) => {
        dispatch({
          type: constants.CANDIDATE_ADD_SUCCESS,
          payload: agres.data.result,
        })
        if(agres?.data?.result?.message == "Created successfully." && agres?.data?.result?.data){
          toast.success('Candidate Saved Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })
          history.push('/onboarding/edit-candidate/'+encryptSingleData(agres?.data?.result?.data));
        }
        //history.push('/onboarding/candidate')
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Candidate edit/ find by id
export const CandidateEditAPI = (cid) => async (dispatch) => {
  // console.log("cid",cid);
  dispatch({
    type: constants.CANDIDATE_EDITDETAILS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

 const tempParams = JSON.stringify({ params: { isEdit: 1, 
"query":"{id,name,partner_name,description,aadhar_proof,pan_proof,voter_proof,passport_proof,reference,email_from,email_cc,partner_phone,partner_mobile,type_id,categ_ids{id,name,color},user_id,medium_id,source_id,group_id,company_id,location_id,department_id,job_id,applied_on,salary_expected,salary_expected_extra,salary_proposed,salary_proposed_extra,availability,education_ids{id,attachment,study_level_id,program_id,mode,institution,board_or_university,year_of_passing,result,note},work_experience_ids{id,name,joining_date,leaving_date,role_played},family_member_ids{id,name,relationship_id,gender,phone,birthday},birthday,gender,blood_group_id,is_disabled,disabilities,aadhar,name_as_per_aadhar,religion_id,show_caste,caste_id,door_no,house_name,street_name,place_name,district_id,state_id,country_id,pin_code,cur_door_no,cur_house_name,cur_street_name,cur_place_name,cur_district_id,cur_state_id,cur_country_id,cur_pin_code,passport_id,passport_country_id,passport_sur_name,passport_given_name,passport_place_of_issue,passport_expiry_date,is_international_worker,pan_id,name_as_per_pan,voter_country_id,voter_id,name_as_per_voter_id,land_line_no,mobile_phone,emergency_contact,emergency_contact_person,emergency_contact_person_relation_id,uan_no,epf_previous_employer,epf_joining_date,epf_leaving_date,marriage_date,marital,spouse_complete_name,spouse_birthdate,stage_id{id,name,sequence},process_state}" } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.applicant/${cid}`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        // console.log("candidate details",agres);
        dispatch({
          type: constants.CANDIDATE_EDITDETAILS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_EDITDETAILS_ERROR,
    })
    //console.log(error?.response);
  }
}

//Candidate workflow data
export const onBoardingWorkFlow = (cid) => async (dispatch) => {

  // console.log("cid",cid);
  dispatch({
    type: constants.CANDIDATE_WORKFLOW_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 const tempParams = JSON.stringify({ params: { "query": "{id, name, sequence}","order": "id asc" } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr.recruitment.stage/`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({  
          type: constants.CANDIDATE_WORKFLOW_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_WORKFLOW_ERROR,
    })
    //console.log(error?.response);
  }
}

//Candidate update status
export const onBoardingUpdateStatus = (statusData) => async (dispatch) => {
  dispatch({
    type: constants.CANDIDATE_STATUS_BTN_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 const tempParams = JSON.stringify({ params: { "query": "{id, name, sequence}","order": "id asc" } })
  try {
    await axios
      .post(constants.BASE_URL + `/hr/applicant/create-update/`, statusData, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({  
          type: constants.CANDIDATE_STATUS_BTN_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_STATUS_BTN_ERROR,
    })
    //console.log(error?.response);
  }
}


//Candidate update
export const CandidateUpdateAPI = (cid, cpydata) => async (
  dispatch,
) => {
  dispatch({
    type: constants.CANDIDATE_UPDATE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + `/edit/hr.applicant/${cid}`, cpydata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.CANDIDATE_UPDATE_SUCCESS,
          payload: agres.data.result,
        });
        toast.success('Updated  Private Information  Successfully !', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_UPDATE_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Candidate update
export const CandidatePopUpOnboardingUpdateAPI = (cpydata) => async (
  dispatch,
) => {
  dispatch({
    type: constants.CANDIDATE_UPDATE_ONBOARDING_POPUP_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }
 
  try {
    await axios
      .post(constants.BASE_URL + '/hr/applicant/create-update', cpydata, {headers: headers})
      .then((agres) => {
        dispatch({
          type: constants.CANDIDATE_UPDATE_ONBOARDING_POPUP_SUCCESS,
          payload: agres.data.result,
        });
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_UPDATE_ONBOARDING_POPUP_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Candidate Add
export const CandidateApplyJob = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.CANDIDATE_JOB_APPLY_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/hr/applicant/create-update', gpdata, {headers: headers,}).then((agres) => {
        dispatch({
          type: constants.CANDIDATE_JOB_APPLY_SUCCESS,
          payload: agres.data.result,
        })
        // if(agres?.data?.result?.message == "Created successfully." && agres?.data?.result?.data){
        //   toast.success('Candidate Saved Successfully !', {
        //     position: toast.POSITION.TOP_RIGHT,
        //   })
        // }
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_JOB_APPLY_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Candidate find by id
export const CandidateDetailsUnauthenticatedAPI = (cid,fid=false) => async (dispatch) => {
  dispatch({
    type: constants.CAND_UNUSER_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }

 const tempParams = JSON.stringify(
                          { params: 
                            { isEdit: 1,
                              query:"{id,partner_name,email_from,work_experience_ids{id,name,joining_date,role_played,leaving_date}}",
                              // filter : "[['id', '=', "+cid+"],['stage_id.sequence', '=', "+fid+"]]"
                              filter : "[['id', '=', "+cid+"]]"
                            } 
                          });
  try {
    await axios
      .post(constants.BASE_URL + `/open/hr.applicant`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.CAND_UNUSER_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CAND_UNUSER_ERROR,
    })
    //console.log(error?.response);
  }
}

//Candidate find by id
export const CandidateDetailsStatusAPI = (cid,fid=false) => async (dispatch) => {
  dispatch({
    type: constants.CAND_UNUSER_STATUS_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }

 const tempParams = JSON.stringify({ params: { query: '{name,id}',isDropdown:1, filter : "[['is_offer_state', '=', "+1+"]]"}});
  try {
    await axios
      .post(constants.BASE_URL + `/open/hr.applicant.refuse.reason`, tempParams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.CAND_UNUSER_STATUS_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.CAND_UNUSER_STATUS_ERROR,
    })
    //console.log(error?.response);
  }
}

//Candidate find by id
export const resumeOpenParserApi = (gparams) => async (dispatch) => {
  dispatch({
    type: constants.OPEN_RESUME_PARSE_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  try {
    await axios
      .post(constants.BASE_URL + `/parse/resume`, gparams, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.OPEN_RESUME_PARSE_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.OPEN_RESUME_PARSE_ERROR,
    })
    //console.log(error?.response);
  }
}

//To get jobs based on company id
export const GetJobBasedCompany = (gpdata) => async (dispatch) => {
  dispatch({
    type: constants.COM_JOB_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/open/hr.job', gpdata, {headers: headers,}).then((agres) => {
        dispatch({
          type: constants.COM_JOB_SUCCESS,
          payload: agres.data.result,
        })
      })
  } catch (error) {
    dispatch({
      type: constants.COM_JOB_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

export const JobBasicAddAPI = (gpdata,history) => async (dispatch) => {

  // console.log("gpdata",gpdata);
  dispatch({
    type: constants.JOB_BASIC_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

// .post(constants.BASE_URL + '/open/create/hr.applicant', gpdata, {
  try {
    await axios
      .post(constants.BASE_URL + '/create/hr.applicant', gpdata, {
        headers: headers,
      })
      .then((agres) => {
        dispatch({
          type: constants.JOB_BASIC_ADD_SUCCESS,
          payload: agres.data.result,
        })
        // toast.success('Designation Saved Successfully', {
        //   position: toast.POSITION.TOP_RIGHT,
        // })
        history.push('/onboarding/job-application')
      })
      
  } catch (error) {
    dispatch({
      type: constants.JOB_BASIC_ADD_ERROR,
    })
    // console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}

//Candidate Add
export const CandidateInviteAddAPI = (gpdata,) => async (dispatch) => {
  dispatch({
    type: constants.CANDIDATE_INVITE_ADD_REQUEST,
  })
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`,
    'error_code':400
  }

  try {
    await axios.post(constants.BASE_URL + '/create/hr.job.application', gpdata, {headers: headers,}).then((agres) => {
        dispatch({
          type: constants.CANDIDATE_INVITE_ADD_SUCCESS,
          payload: agres.data.result,
        })
        if(agres?.data?.result?.message == "Created successfully." && agres?.data?.result?.data){
          toast.success('Invitation Sent Successfully !', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
  } catch (error) {
    dispatch({
      type: constants.CANDIDATE_INVITE_ADD_ERROR,
    })
    //console.log(error?.response);
    toast.error(error?.response?.data?.result?.message, {
      position: toast.POSITION.TOP_RIGHT,
    })
  }
}


