import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import * as constants from "src/actions/types"
import CunAuthLoader from '../loader/CunAuthLoader';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
  CFade,
  CCardFooter,
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CDataTable,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux';
import { isLoggedIn, encryptSingleData, indianDateFormat, convertValueLabel } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CandidateDetailsUnauthenticatedAPI, CandidateApplyJob, CandidateDetailsStatusAPI } from '../../actions/onboarding';

const OfferAcceptance = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {jobUnUserData, resumeUnUserData, error, success, showToast, isLoading, candidateStatusDropdownDetails} = useSelector(state => state.onboardingBackend);

  const [reason, setReason] = useState(0);
  const [statusDpName, setStatusDpName] = useState([]);
  
  const userName = jobUnUserData?.data?.result[0]?.partner_name;
  const userEmail = jobUnUserData?.data?.result[0]?.email_from;

  useEffect(() => {
    if(props?.match?.params?.id){
      dispatch(CandidateDetailsUnauthenticatedAPI(atob(props?.match?.params?.id),7));
      dispatch(CandidateDetailsStatusAPI());
    }
    
    if(props?.match?.params?.status == "discuss"){
      OfferAcceptanceData.setFieldValue('refuse_reason_id', 9);
      setStatusDpName(convertValueLabel(9, "Others"));
      setReason(1);
    }
  }, [props?.match?.params?.id])

  useEffect(() => {
    if(props?.match?.params?.status == "accept"){
      const acceptFormData = JSON.stringify(
                              { params: { "id":parseInt(atob(props?.match?.params?.id)), data: {'offer_status':props?.match?.params?.status} } }
                            )
      dispatch(CandidateApplyJob(acceptFormData))
    }
  }, [props?.match?.params?.status])

  
  
  useEffect(() => {
    if(success == "Job Apply Success"){
      history.push('/careers/offer-success');
    }

    if(error == "user details error"){
      history.push('/careers/job-applied/job-error');
    }
  }, [success, error])

    //Form Validation
  const OfferAcceptanceData = useFormik({
    initialValues: {
      refuse_reason_id:'',
      offer_refuse_reason:'',
    },
    validationSchema: Yup.object({
      refuse_reason_id: Yup.string().required('This field is required'),
      //offer_refuse_reason: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      // console.log(wrkInfoData);
      values.offer_status = props?.match?.params?.status;
      const formData = JSON.stringify({ params: { "id":parseInt(atob(props?.match?.params?.id)), data: values } })
      dispatch(CandidateApplyJob(formData))
    },
  });

  const handleOfferState = (e) => {
    if(e.value){
      OfferAcceptanceData.setFieldValue('refuse_reason_id', e.value);
      setStatusDpName(convertValueLabel(e.value, e.label));
      if(e.label == "Others"){
        setReason(1);
      } else {
        setReason(0);
      }
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
          <div className='careerStart-main'>
            {
              (isLoading === true) ? <CunAuthLoader /> :
                <CRow className="justify-content-center w-100" >
                  <CCol lg="10">
                    <div>
                      <CCard className="p-4 login-card">
                        <CCardBody>
                          <CForm onSubmit={OfferAcceptanceData.handleSubmit} className="form-horizontal">
                            <h1 align="center">Update Offer Status</h1>
                            {/* <p className="text-muted">Sign In to your account</p> */}
                            <div className="row form-group">
                              <div className="col-md-6">
                                <label htmlFor="hf-email">Applicant's Name <span className='error'>*</span></label>
                                <input type="text" value={userName} className="form-control" placeholder="Applicant's Name" readOnly/>
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                                <input type="text" value={userEmail} className="form-control" placeholder="Email" readOnly/>
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-md-6">
                                <label htmlFor="hf-email">Status <span className='error'>*</span></label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  placeholder={'Choose a Status'}
                                  value={statusDpName}
                                  id="refuse_reason_id"
                                  name="refuse_reason_id"
                                  options={candidateStatusDropdownDetails?.data?.result}
                                  onChange={(value) => handleOfferState(value)}
                                />
                                {OfferAcceptanceData.errors.refuse_reason_id ? <div className="help-block text-danger">{OfferAcceptanceData.errors.refuse_reason_id}</div> : null}
                              </div>
                              {
                                reason == 1 ? 
                                  <div className="col-md-6">
                                    <label htmlFor="hf-email">Reason <span className='error'>*</span></label>
                                    <textarea name='offer_refuse_reason' rows={5} className={'form-control'} onChange={OfferAcceptanceData.handleChange}></textarea>
                                    {OfferAcceptanceData.errors.offer_refuse_reason ? <div className="help-block text-danger">{OfferAcceptanceData.errors.offer_refuse_reason}</div> : null}
                                  </div>
                                : ""
                              }
                            </div>
                            <CRow>
                            <CCol xs="6">
                              <CButton type='submit' color="primary" className="px-4">Update</CButton>    
                            </CCol>
                            </CRow>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </div>
                  </CCol>
                </CRow>
            }
        </div>
    </div>
  )
}

export default OfferAcceptance
