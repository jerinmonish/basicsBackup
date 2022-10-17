import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decryptSingleData, encryptSingleData } from '../../utils/helper';
import { CandidateEditAPI, onBoardingWorkFlow, onBoardingUpdateStatus, CandidateApplyJob, CandidatePopUpOnboardingUpdateAPI } from '../../actions/onboarding'
import { getReportManagerDropDownList } from '../../actions/commonAction';
import { MultiStepForm, Step } from 'react-multi-form';

import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CContainer,
  CFade,
  CForm,
  CCardFooter,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CCollapse,
  CCardHeader,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CInputRadio,
  CInputGroup,
  CInput,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import JobBasicTab from "./JobBasicTab";
// import AddCandidate2 from "./AECandidate2";
// import AddCandidate3 from "./AECandidate3";
// import AddCandidate4 from "./AECandidate4";
// import AddCandidate5 from "./AECandidate5";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from '../../actions/types'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import EduBasicTab from "./EduBasicTab";
import WkExpTab from "../employee/employeeTabs/WkExpTab";
const JobApp = (props) => {
  const dispatch = useDispatch()
  const { CandidateAddAPI, candidateEditDetails, candidateworkflowDetails, candidateStatusUpdateDetails, isCandidateOnboardingStatus, success } = useSelector((state) => state.onboardingBackend);
  const [openBoardingPopup, setOpenBoardingPopup] = useState(false)
  const dropdownData = useSelector((state) => state.commonData);

  //To get candidate data if exists
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CandidateEditAPI(decryptSingleData(props?.match?.params?.id)));
      dispatch(onBoardingWorkFlow());
    } else {
      dispatch({
        type: constants.CANDIDATE_EDITDETAILS_ERROR,
      })
    }
  }, [props?.match?.params?.id])

  useEffect(() => {
    if (candidateStatusUpdateDetails?.message) {
      dispatch(CandidateEditAPI(decryptSingleData(props?.match?.params?.id)));
    }
  }, [candidateStatusUpdateDetails])

  useEffect(() => {
    if (candidateEditDetails?.data?.company_id) {
      dispatch(getReportManagerDropDownList(candidateEditDetails?.data?.company_id));
    }
  }, [candidateEditDetails?.data?.company_id])

  const updateCandSatus = (e) => {
    const tempParams = JSON.stringify({ params: { "level": e, "id": decryptSingleData(props?.match?.params?.id) } })
    dispatch(onBoardingUpdateStatus(tempParams));
  }

  const updateSendOnboardingPass = useFormik({
    initialValues: {
      address: '',
      reporting_manager_id: '',
      building: '',
    },
    validationSchema: Yup.object({
      address: Yup.string().required('This field is required'),
      reporting_manager_id: Yup.string().required('This field is required'),
      building: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { id: decryptSingleData(props?.match?.params?.id), level: parseInt(9), data: values } })
      dispatch(CandidatePopUpOnboardingUpdateAPI(formData))
    },
  })

  const handleResetform = () => {
    updateSendOnboardingPass.resetForm()
    setOpenBoardingPopup(!openBoardingPopup)
  }

  useEffect(() => {
    if (success === "Onboarding Status update success") {
      setOpenBoardingPopup(!openBoardingPopup);
      dispatch(CandidateEditAPI(decryptSingleData(props?.match?.params?.id)));
      toast.success("Updated successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });

    }
  }, [success])

  // console.log("id=", props?.match?.params?.id);
  return (
    <main className="c-main">
      <ToastContainer />
      <CFade>
        <CContainer fluid>
          <CCard>
            {/* <strong> Candidate </strong> */}
            <CCardHeader>
              {
                props?.match?.params?.id === undefined ? <strong>Add Job Application</strong> : <strong>Edit Job Application</strong>
                
              }
              { /*
              <span style={{ marginRight: (candidateEditDetails?.data?.process_state_label == 'Refuse' || candidateEditDetails?.data?.process_state_label == 'Select' || candidateEditDetails?.data?.process_state_label == 'Reject' || candidateEditDetails?.data?.process_state_label == 'Onhold') ? '115px' : '' }} className="float-right">
                {
                  (() => {
                    if (candidateEditDetails?.data?.stage_id?.sequence == 1)
                      return <button className="btn btn-md btn-primary" onClick={() => updateCandSatus(2)}>Send Interview Details</button>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 3 && candidateEditDetails?.data?.process_state == 'select')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus(4)}>Send Offer Letter</button>&nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>

                    if (candidateEditDetails?.data?.stage_id?.sequence == 3 && candidateEditDetails?.data?.process_state == 'onhold')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 3 && candidateEditDetails?.data?.process_state == 'reject')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 3)
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 5 && candidateEditDetails?.data?.process_state == 'select')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus(6)}>Send Appointment Letter</button>&nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 5 && candidateEditDetails?.data?.process_state == 'reject')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 5 && candidateEditDetails?.data?.process_state == 'onhold')
                      return <>
                        <button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>
                        &nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('select')}>Select</button>
                        &nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 5 && candidateEditDetails?.data?.process_state == 'refuse')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus('select')}>Select</button>
                        &nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button></>

                    if (candidateEditDetails?.data?.stage_id?.sequence == 6 && candidateEditDetails?.data?.process_state == 'select')
                      return <><button className="btn btn-md btn-primary" onClick={() => updateCandSatus(7)}>Send Info Link to Candidate</button>&nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 6 && candidateEditDetails?.data?.process_state == 'reject')
                      return <><button className="btn btn-md btn-danger" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 6 && candidateEditDetails?.data?.process_state == 'onhold')
                      return <><button className="btn btn-md btn-danger" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 6 && candidateEditDetails?.data?.process_state == 'refuse')
                      return <><button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button>
                        &nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 8 && candidateEditDetails?.data?.process_state == 'select')
                      return <><button className="btn btn-sm btn-primary" onClick={() => setOpenBoardingPopup(!openBoardingPopup)}>Send Onboarding Pass</button>&nbsp;&nbsp;<button className="btn btn-sm btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-sm btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-sm btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 8 && candidateEditDetails?.data?.process_state == 'reject')
                      return <><button className="btn btn-md btn-danger" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 8 && candidateEditDetails?.data?.process_state == 'onhold')
                      return <><button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 8 && candidateEditDetails?.data?.process_state == 'refuse')
                      return <><button className="btn btn-md btn-dark" onClick={() => updateCandSatus('select')}>Select</button>
                        &nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 9 && candidateEditDetails?.data?.process_state == 'select')
                      return <><button className="btn btn-sm btn-primary" onClick={() => updateCandSatus(10)}>Complete &amp; Create Employee</button>&nbsp;&nbsp;<button className="btn btn-sm btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-sm btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-sm btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 9 && candidateEditDetails?.data?.process_state == 'reject')
                      return <><button className="btn btn-md btn-danger" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 9 && candidateEditDetails?.data?.process_state == 'onhold')
                      return <><button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-md btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    if (candidateEditDetails?.data?.stage_id?.sequence == 9 && candidateEditDetails?.data?.process_state == 'refuse')
                      return <><button className="btn btn-md btn-dark" onClick={() => updateCandSatus('select')}>Select</button>
                        &nbsp;&nbsp;<button className="btn btn-md btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-md btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button></>
                    // if (candidateEditDetails?.data?.stage_id?.sequence == 10 && candidateEditDetails?.data?.process_state == 'select')
                    //   return <><button className="btn btn-sm btn-primary" onClick={() => updateCandSatus(11)}>Create Employee</button>&nbsp;&nbsp;<button className="btn btn-sm btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-sm btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-sm btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    // if (candidateEditDetails?.data?.stage_id?.sequence == 10 && candidateEditDetails?.data?.process_state == 'reject')
                    //   return <><button className="btn btn-sm btn-danger" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-sm btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button>&nbsp;&nbsp;<button className="btn btn-sm btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    // if (candidateEditDetails?.data?.stage_id?.sequence == 10 && candidateEditDetails?.data?.process_state == 'onhold')
                    //   return <><button className="btn btn-sm btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-sm btn-warning" onClick={() => updateCandSatus('select')}>Select</button>&nbsp;&nbsp;<button className="btn btn-sm btn-dark" onClick={() => updateCandSatus('refuse')}>Refuse</button></>
                    // if (candidateEditDetails?.data?.stage_id?.sequence == 10 && candidateEditDetails?.data?.process_state == 'refuse')
                    //   return <><button className="btn btn-sm btn-dark" onClick={() => updateCandSatus('select')}>Select</button>
                    //     &nbsp;&nbsp;<button className="btn btn-sm btn-danger" onClick={() => updateCandSatus('reject')}>Reject</button>&nbsp;&nbsp;<button className="btn btn-sm btn-warning" onClick={() => updateCandSatus('onhold')}>Onhold</button></>
                  })()
                }
              </span> */}
            </CCardHeader>

            <CCardBody>
              {/*
                (candidateEditDetails?.data?.process_state_label == 'Refuse') ?
                  <div className="ribbon ribbon-top-right">
                    <span style={{ backgroundColor: '#e55353ab' }}>Refused</span>
                  </div>
                  : ''
              }
              {
                (candidateEditDetails?.data?.process_state_label == 'Reject') ?
                  <div className="ribbon ribbon-top-right">
                    <span style={{ backgroundColor: '#e55353ab' }}>Reject</span>
                  </div>
                  : ''
              }
              {
                (candidateEditDetails?.data?.process_state_label == 'Select') ?
                  <div className="ribbon ribbon-top-right">
                    <span style={{ backgroundColor: '#2eb85c' }}>Selected</span>
                  </div>
                  : ''
              }
              {
                (candidateEditDetails?.data?.process_state_label == 'Onhold') ?
                  <div className="ribbon ribbon-top-right">
                    <span style={{ backgroundColor: '#eac53e' }}>Onhold</span>
                  </div>
                  : ''
              }

              <div className="mulForm">
                <MultiStepForm activeStep={candidateEditDetails?.data?.stage_id?.sequence} className="mainFTag" accentColor="#3399ff">
                  {
                    candidateworkflowDetails?.data?.result?.map(oData => {
                      return (
                        <Step label={oData?.name} className="mainStepTag" key={oData?.name}>
                          {/* <p>{oData?.name}</p> }
                        </Step>
                      )
                    })
                  }
                </MultiStepForm>
              </div>
              */}

              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>Basic Details</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    {
                      ((candidateEditDetails?.data && candidateEditDetails?.message == "Data retrieved successfully.") || (CandidateAddAPI?.data && CandidateAddAPI?.state == "success")) ?
                        <CNavLink>Education</CNavLink> : <CNavLink disabled>Education</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((candidateEditDetails?.data && candidateEditDetails?.message == "Data retrieved successfully.") || (CandidateAddAPI?.data && CandidateAddAPI?.state == "success")) ?
                        <CNavLink>Work Experience</CNavLink> : <CNavLink disabled>Work Experience</CNavLink>
                    }
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <JobBasicTab dataId={(candidateEditDetails?.data && candidateEditDetails?.data?.id) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                  <CTabPane>
                    <EduBasicTab dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                <CTabPane>
                    <WkExpTab dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                {/*    <CTabPane>
                    <AddCandidate4 dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                  <CTabPane>
                    <AddCandidate5 dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>*/}
                </CTabContent> 
              </CTabs>
            </CCardBody>
          </CCard>
        </CContainer>
      </CFade>
    </main>
  );
};

export default JobApp;