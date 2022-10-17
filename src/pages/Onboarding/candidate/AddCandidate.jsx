import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decryptSingleData, encryptSingleData } from '../../../utils/helper';
import { CandidateEditAPI, onBoardingWorkFlow, onBoardingUpdateStatus, CandidateApplyJob, CandidatePopUpOnboardingUpdateAPI } from '../../../actions/onboarding'
import { getReportManagerDropDownList } from '../../../actions/commonAction';
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
import AddCandidate1 from "./AECandidate1";
import AddCandidate2 from "./AECandidate2";
import AddCandidate3 from "./AECandidate3";
import AddCandidate4 from "./AECandidate4";
import AddCandidate5 from "./AECandidate5";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from '../../../actions/types'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const AddCandidate = (props) => {
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
                props?.match?.params?.id === undefined ? <strong>Add Candidate</strong> : <strong>Edit Candidate</strong>
              }

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
              </span>
            </CCardHeader>

            <CCardBody>
              {
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
                          {/* <p>{oData?.name}</p> */}
                        </Step>
                      )
                    })
                  }
                </MultiStepForm>
              </div>

              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>Basic Details</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    {
                      ((candidateEditDetails?.data && candidateEditDetails?.message == "Data retrieved successfully.") || (CandidateAddAPI?.data && CandidateAddAPI?.state == "success")) ?
                        <CNavLink>Private Info</CNavLink> : <CNavLink disabled>Private Info</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((candidateEditDetails?.data && candidateEditDetails?.message == "Data retrieved successfully.") || (CandidateAddAPI?.data && CandidateAddAPI?.state == "success")) ?
                        <CNavLink>Family Members</CNavLink> : <CNavLink disabled>Family Members</CNavLink>
                    }
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
                    <AddCandidate1 dataId={(candidateEditDetails?.data && candidateEditDetails?.data?.id) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                  <CTabPane>
                    <AddCandidate2 dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                  <CTabPane>
                    <AddCandidate3 dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                  <CTabPane>
                    <AddCandidate4 dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                  <CTabPane>
                    <AddCandidate5 dataId={(candidateEditDetails?.data) ? candidateEditDetails?.data?.id : CandidateAddAPI?.data} dataEdit={candidateEditDetails} />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CContainer>
      </CFade>

      {/* Group Add Form */}
      <CModal show={openBoardingPopup} onClose={handleResetform} size="xl" color="info">
        <CModalHeader closeButton><CModalTitle>Add Onboarding Data</CModalTitle></CModalHeader>
        <CModalBody>
          {
            (isCandidateOnboardingStatus === true) ? 'Updating Please Wait...' :
              <CForm onSubmit={updateSendOnboardingPass.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Address To Report</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='address' value={updateSendOnboardingPass.values.address} placeholder="Address To Report" maxLength={60} onChange={updateSendOnboardingPass.handleChange} title='Address To Report' />
                      {updateSendOnboardingPass.errors.address ? <div className="help-block text-danger">{updateSendOnboardingPass.errors.address}</div> : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Reporting Manager</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Reporting Manager'}
                        id="reporting_manager_id"
                        name="reporting_manager_id"
                        options={dropdownData?.managerCommonData?.data?.result}
                        onChange={({ value }) => updateSendOnboardingPass.setFieldValue('reporting_manager_id', value)}
                      />
                      {updateSendOnboardingPass.errors.reporting_manager_id ? <div className="help-block text-danger">{updateSendOnboardingPass.errors.reporting_manager_id}</div> : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Building/Block</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='building' value={updateSendOnboardingPass.values.building} placeholder="Building/Block" maxLength={60} onChange={updateSendOnboardingPass.handleChange} title='Building/Block' />
                      {updateSendOnboardingPass.errors.building ? <div className="help-block text-danger">{updateSendOnboardingPass.errors.building}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      <CButton type="reset" onClick={handleResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>
    </main>
  );
};

export default AddCandidate;