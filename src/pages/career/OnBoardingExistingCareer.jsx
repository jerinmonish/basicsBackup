import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import * as constants from "src/actions/types"
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
import { CandidateDetailsUnauthenticatedAPI, CandidateApplyJob, resumeOpenParserApi } from '../../actions/onboarding';
import { CommonUnauthenticatedCountryList, CommonUnauthenticatedStateList, CommonUnauthenticatedDistrictList, CommonUnauthenticatedCountryList2, CommonUnauthenticatedStateList2, CommonUnauthenticatedDistrictList2 } from './../../actions/commonAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import ExistingCareerOnBo1 from './ExistingCareer/ExistingCareerOnBo1';
import ExistingCareerOnBo2 from './ExistingCareer/ExistingCareerOnBo2';
import ExistingCareerOnBo3 from './ExistingCareer/ExistingCareerOnBo3';
import CunAuthLoader from '../loader/CunAuthLoader';
const OnBoardingExistingCareer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { jobUnUserData, resumeUnUserData, error, success, showToast, isLoading } = useSelector(state => state.onboardingBackend);

  const userName = jobUnUserData?.data?.result[0]?.partner_name;
  const userEmail = jobUnUserData?.data?.result[0]?.email_from;

  const dropdownData = useSelector((state) => state.commonData)
  // console.log(dropdownData);
  const [curCountry, setCurCountry] = useState([]);
  const [curState, setCurState] = useState([]);
  const [curDistict, setCurDistict] = useState([]);
  const [perCountry, setPerCountry] = useState([]);
  const [perState, setPerState] = useState([]);
  const [perDistict, setPerDistict] = useState([]);

  //Dropdown Label Data
  const [curStateName, setCurStateName] = useState([]);
  const [curDistrictName, setCurDistrictName] = useState([]);
  const [perStateName, setPerStateName] = useState([]);
  const [perDistrictName, setPerDistrictName] = useState([]);

  const [resumeImgSelected, setResumeImgSelected] = useState([]);

  const [tab1Data, setTab1Data] = useState([]);
  const [tab2Data, setTab2Data] = useState([]);
  const [tab3Data, setTab3Data] = useState([]);

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CandidateDetailsUnauthenticatedAPI(atob(props?.match?.params?.id), 2));
    }
  }, [props?.match?.params?.id])

  useEffect(() => {
    if (success == "Job Apply Success") {
      history.push('/careers/job-applied/job-success');
    }

    if (error == "user details error") {
      history.push('/careers/job-applied/job-error');
    }
  }, [success, error])

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonUnauthenticatedCountryList());
  }, [])
  useEffect(() => {
    if (dropdownData?.uaStateCommonData?.data?.result) {
      setCurState(dropdownData?.uaStateCommonData?.data?.result)
    }
  }, [dropdownData?.uaStateCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.uaDistrictCommonData?.data?.result) {
      setCurDistict(dropdownData?.uaDistrictCommonData?.data?.result)
    }
  }, [dropdownData?.uaDistrictCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      setPerState(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      setPerDistict(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result]);

  const selectCurStateRef = useRef();
  const onCurCountryClear = () => {
    selectCurStateRef.current.select.clearValue();
    setCurStateName(convertValueLabel());
  };

  const selectCurDistictRef = useRef();
  const onCurStateClear = () => {
    selectCurDistictRef.current.select.clearValue();
    setCurDistrictName(convertValueLabel());
    setCurDistict(convertValueLabel());
  };

  const selectPerStateRef = useRef();
  const onPerCountryClear = () => {
    selectPerStateRef.current.select.clearValue();
    setPerStateName(convertValueLabel());
  };

  const selectPerDistictRef = useRef();
  const onPerStateClear = () => {
    selectPerDistictRef.current.select.clearValue();
    setPerDistrictName(convertValueLabel());
    setPerDistict(convertValueLabel());
  };


  //Form Validation
  const JobCareerFormik = useFormik({
    initialValues: {
      resume: '',
    },
    validationSchema: Yup.object({
      resume: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      var resulttable1Data = tab1Data.map(({ relationship_label, gender_label, ...tab1Data }) => ({ ...tab1Data }));
      var resulttable2Data = tab2Data.map(({ study_level_id_label, program_id_label, mode_label, year_of_passing_label, ...tab2Data }) => ({ ...tab2Data }));

      values.family_member_ids = resulttable1Data;
      values.education_ids = resulttable2Data;
      values.work_experience_ids = tab3Data;
      const formData = JSON.stringify({ params: { "id": parseInt(atob(props?.match?.params?.id)), data: values, "level": 3 } })
      dispatch(CandidateApplyJob(formData))
    },
  });

  const handleResumeChange = (i) => {
    let files = i.target.files;
    if (files.length > 0) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        setResumeImgSelected({
          selectedImage: JobCareerFormik.setFieldValue("resume", event.target.result),
        })
        if (event.target.result) {
          var adRData = JSON.stringify({ "params": { "resume": event.target.result } });
          dispatch(resumeOpenParserApi(adRData));
        }
      }
    }
  }

  const handleCurrentCountry = (e) => {
    if (e?.value) {
      setCurCountry(convertValueLabel(e.value, e.label));
      JobCareerFormik.setFieldValue('cur_country_id', e.value);
      dispatch(CommonUnauthenticatedStateList(e.value));
      onCurCountryClear();
      onCurStateClear();
    }
  }

  const handleCurrentState = (e) => {
    if (e?.value) {
      setCurStateName(convertValueLabel(e.value, e.label));
      JobCareerFormik.setFieldValue('cur_state_id', e.value);
      dispatch(CommonUnauthenticatedDistrictList(e.value));
      onCurStateClear();
    }
  }

  const handleCurrentDistrict = (e) => {
    if (e?.value) {
      setCurDistrictName(convertValueLabel(e.value, e.label));
      JobCareerFormik.setFieldValue('cur_district_id', e.value);
    }
  }

  const handlePermanentCountry = (e) => {
    if (e?.value) {
      setPerCountry(convertValueLabel(e.value, e.label));
      JobCareerFormik.setFieldValue('country_id', e.value);
      dispatch(CommonUnauthenticatedStateList2(e.value));
      onPerCountryClear();
      onPerStateClear();
    }
  }

  const handlePermanentState = (e) => {
    if (e?.value) {
      setPerStateName(convertValueLabel(e.value, e.label));
      JobCareerFormik.setFieldValue('state_id', e.value);
      dispatch(CommonUnauthenticatedDistrictList2(e.value));
      onPerStateClear();
    }
  }

  const handlePermanentDistrict = (e) => {
    if (e?.value) {
      setPerDistrictName(convertValueLabel(e.value, e.label));
      JobCareerFormik.setFieldValue('district_id', e.value);
    }
  }

  const markasCurrentAddress = (e) => {
    //console.log(JobCareerFormik?.values,curCountry);
    if (e.target.checked == true) {
      JobCareerFormik.setFieldValue("door_no", JobCareerFormik?.values?.cur_door_no)
      JobCareerFormik.setFieldValue("house_name", JobCareerFormik?.values?.cur_house_name)
      JobCareerFormik.setFieldValue("street_name", JobCareerFormik?.values?.cur_street_name)
      JobCareerFormik.setFieldValue("place_name", JobCareerFormik?.values?.cur_place_name)
      JobCareerFormik.setFieldValue("pin_code", JobCareerFormik?.values?.cur_pin_code)
      if (JobCareerFormik?.values?.cur_country_id) {
        JobCareerFormik.setFieldValue("country_id", JobCareerFormik?.values?.cur_country_id)
        setPerCountry(convertValueLabel(curCountry?.value, curCountry.label));
      }

      if (JobCareerFormik?.values?.cur_state_id) {
        JobCareerFormik.setFieldValue("state_id", JobCareerFormik?.values?.cur_state_id)
        setPerStateName(convertValueLabel(curStateName?.value, curStateName.label));
      }

      if (JobCareerFormik?.values?.cur_district_id) {
        JobCareerFormik.setFieldValue("district_id", JobCareerFormik?.values?.cur_district_id)
        setPerDistrictName(convertValueLabel(curDistrictName?.value, curDistrictName.label));
      }
    } else {
      JobCareerFormik.setFieldValue("door_no", "")
      JobCareerFormik.setFieldValue("house_name", "")
      JobCareerFormik.setFieldValue("street_name", "")
      JobCareerFormik.setFieldValue("place_name", "")
      JobCareerFormik.setFieldValue("pin_code", "")
      JobCareerFormik.setFieldValue("country_id", "")
      setPerCountry(convertValueLabel());
      JobCareerFormik.setFieldValue("state_id", "")
      setPerStateName(convertValueLabel());
      JobCareerFormik.setFieldValue("district_id", "")
      setPerDistrictName(convertValueLabel());
    }
  }

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView()
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
                      <CForm onSubmit={JobCareerFormik.handleSubmit} className="form-horizontal">
                        <h1 align="center">Job Application</h1>
                        {/* <p className="text-muted">Sign In to your account</p> */}
                        <div className="row form-group">
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Applicant's Name test <span className='error'>*</span></label>
                            <input type="text" value={userName} className="form-control" placeholder="Applicant's Name" readOnly />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                            <input type="text" value={userEmail} className="form-control" placeholder="Email" readOnly />
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Resume <span className='error'>*</span></label>
                            <input type="file" name='resume' className="form-control" onChange={(event) => { handleResumeChange(event) }} />
                            {JobCareerFormik.touched.resume && JobCareerFormik.errors.resume ? (<div className="help-block text-danger">{JobCareerFormik.errors.resume}</div>) : null}
                          </div>
                        </div>

                        {/* {className = "careerheader"} */}
                        <CCard className="mb-4">
                          <CCardHeader id="" className="header">
                            <div>
                              <h5 className="m-0 p-0 msp">Current Address</h5>
                            </div>
                          </CCardHeader>
                          <CCardBody>
                            <div className="row form-group">
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Current Country <span className='error'>*</span></label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={curCountry}
                                  name="cur_country_id"
                                  options={dropdownData?.uaCountryCommonData?.data?.result}
                                  placeholder={'Choose a Country'}
                                  onChange={(e) => handleCurrentCountry(e)}
                                  onBlur={JobCareerFormik.handleBlur}
                                />
                                {JobCareerFormik.errors.cur_country_id && JobCareerFormik.touched.cur_country_id ? <div className="help-block text-danger">{JobCareerFormik.errors.cur_country_id}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Current State <span className='error'>*</span></label>
                                <Select
                                  ref={selectCurStateRef}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={curStateName}
                                  name="cur_state_id"
                                  options={curState}
                                  placeholder={'Choose a State'}
                                  onChange={(e) => handleCurrentState(e)}
                                  onBlur={JobCareerFormik.handleBlur}
                                />
                                {JobCareerFormik.errors.cur_state_id && JobCareerFormik.touched.cur_state_id ? <div className="help-block text-danger">{JobCareerFormik.errors.cur_state_id}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Current District <span className='error'>*</span></label>
                                <Select
                                  ref={selectCurDistictRef}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={curDistrictName}
                                  name="cur_district_id"
                                  options={curDistict}
                                  placeholder={'Choose a District'}
                                  onChange={(e) => handleCurrentDistrict(e)}
                                  onBlur={JobCareerFormik.handleBlur}
                                />
                                {JobCareerFormik.errors.cur_district_id && JobCareerFormik.touched.cur_district_id ? <div className="help-block text-danger">{JobCareerFormik.errors.cur_district_id}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Current Zip <span className='error'>*</span></label>
                                <input type="text" name='cur_pin_code' value={JobCareerFormik.values.cur_pin_code} onChange={JobCareerFormik.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                                {JobCareerFormik.errors.cur_pin_code && JobCareerFormik.touched.cur_pin_code ? <div className="help-block text-danger">{JobCareerFormik.errors.cur_pin_code}</div> : null}
                              </div>
                            </div>
                          </CCardBody>
                        </CCard>

                        <CCard className="mb-4">
                          <CCardHeader id="" className="header">
                            <div>
                              <h5 className="m-0 p-0">Permanent Address</h5>
                            </div>
                            <div className="">
                              <span className="float-right">
                                <CFormGroup variant="custom-checkbox" inline >
                                  <CInputCheckbox custom id="is_same_as_current_address" name="is_same_as_current_address" onChange={(e) => markasCurrentAddress(e)} />
                                  <CLabel variant="custom-checkbox" htmlFor="is_same_as_current_address">Same as Current Address ?</CLabel>
                                </CFormGroup>
                              </span>
                            </div>
                          </CCardHeader>
                          <CCardBody>
                            <div className="row form-group">
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Permanent Country <span className='error'>*</span></label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={perCountry}
                                  name="per_country_id"
                                  options={dropdownData?.uaCountryCommonData?.data?.result}
                                  placeholder={'Choose a Country'}
                                  onChange={(e) => handlePermanentCountry(e)}
                                  onBlur={JobCareerFormik.handleBlur}
                                />
                                {JobCareerFormik.errors.per_country_id && JobCareerFormik.touched.per_country_id ? <div className="help-block text-danger">{JobCareerFormik.errors.per_country_id}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Permanent State <span className='error'>*</span></label>
                                <Select
                                  ref={selectPerStateRef}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={perStateName}
                                  name="per_state_id"
                                  options={perState}
                                  placeholder={'Choose a State'}
                                  onChange={(e) => handlePermanentState(e)}
                                  onBlur={JobCareerFormik.handleBlur}
                                />
                                {JobCareerFormik.errors.per_state_id && JobCareerFormik.touched.per_state_id ? <div className="help-block text-danger">{JobCareerFormik.errors.per_state_id}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Permanent District <span className='error'>*</span></label>
                                <Select
                                  ref={selectPerDistictRef}
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={perDistrictName}
                                  name="per_district_id"
                                  options={perDistict}
                                  placeholder={'Choose a District'}
                                  onChange={(e) => handlePermanentDistrict(e)}
                                  onBlur={JobCareerFormik.handleBlur}
                                />
                                {JobCareerFormik.errors.per_district_id && JobCareerFormik.touched.per_district_id ? <div className="help-block text-danger">{JobCareerFormik.errors.per_district_id}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Permanent Zip <span className='error'>*</span></label>
                                <input type="text" name='pin_code' value={JobCareerFormik.values.pin_code} onChange={JobCareerFormik.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                                {JobCareerFormik.errors.pin_code && JobCareerFormik.touched.pin_code ? <div className="help-block text-danger">{JobCareerFormik.errors.pin_code}</div> : null}
                              </div>
                            </div>
                          </CCardBody>
                        </CCard>

                        {/* <div className='mt-4'></div> */}

                        <div id="family1"><ExistingCareerOnBo1 dataId={atob(props?.match?.params?.id)} familyData={tab1Data} alterFamilyData={setTab1Data} /></div>
                        <div id="education1"><ExistingCareerOnBo2 dataId={atob(props?.match?.params?.id)} educationData={tab2Data} alterEducationData={setTab2Data} /></div>
                        <div id="workExp1"><ExistingCareerOnBo3 dataId={atob(props?.match?.params?.id)} WorkExpData={tab3Data} /></div>

                        <CRow>
                          <CCol xs="6">
                            <CButton type='submit' color="primary" className="px-4">Update</CButton>
                          </CCol>
                          {/* <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0" onClick={()=>setForgotPassForm(true)}>Forgot password?</CButton>
                            </CCol> */}
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                      <CCardBody className="text-center">
                      <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                      <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                      </div>
                      </CCardBody>
                      </CCard> */}
                </div>
              </CCol>
            </CRow>
        }
      </div>
    </div>
  )
}

export default OnBoardingExistingCareer
