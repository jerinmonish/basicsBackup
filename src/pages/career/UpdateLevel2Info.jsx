import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import { AadharIdApi, PanIdApi } from 'src/actions/master';
import { CommonUnauthenticatedCountryList } from 'src/actions/commonAction';
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
import { CandidateDetailsUnauthenticatedAPI, CandidateApplyJob, resumeOpenParserApi } from '../../actions/onboarding';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';

const UpdateLevel2Info = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { aadharData, panData } = useSelector((state) => state.masterBackend);
  const { jobUnUserData, resumeUnUserData, error, success, showToast, isLoading } = useSelector(state => state.onboardingBackend);
  const dropdownData = useSelector((state) => state.commonData)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonUnauthenticatedCountryList());
  }, [])

  const [dateOfPExp, setdateOfPExp] = useState(null);
  const [focusOfPExp, setfocusOfPExp] = useState(false);

  const [dateOfAvai, setdateOfAvai] = useState(null);
  const [focusOfAvai, setfocusOfAvai] = useState(false);

  const [internationalWorker, setIsInternationalWorker] = useState(false);

  const userName = jobUnUserData?.data?.result[0]?.partner_name;
  const userEmail = jobUnUserData?.data?.result[0]?.email_from;

  const [aadharImgNumber, setAadharImgNumber] = useState('');
  const [aadharImgName, setAadharImgName] = useState('');
  const [aadharExistingFile, setAadharExistingFile] = useState('');

  const [panImgNumber, setPanImgNumber] = useState('');
  const [panImgName, setPanImgName] = useState('');
  const [panExistingFile, setPanExistingFile] = useState('');

  //Image state data
  const [aadharImgSelected, setAadharImgSelected] = useState([]);
  const [panImgSelected, setPanImgSelected] = useState([]);
  const [voterImgSelected, setVoterImgSelected] = useState([]);
  const [passportImgSelected, setPassportImgSelected] = useState([]);

  const [previewAadhar, setPreviewAadhar] = useState('');
  const [previewPan, setPreviewPan] = useState('');
  const [previewVoter, setPreviewVoter] = useState('');
  const [previewPassport, setPreviewPassport] = useState('');

  const [passportIdExistingFile, setPassportIdExistingFile] = useState('');
  const [passportCountryName, setPassportCountryName] = useState([]);

  const yearsDateOfLeaving = (mrs = false) => {
    let years = []
    for (let i = moment().year(); i <= moment().year() + 30; i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CandidateDetailsUnauthenticatedAPI(atob(props?.match?.params?.id), 4));
    }
  }, [props?.match?.params?.id])

  useEffect(() => {
    if (aadharData?.data?.Uid) {
      setAadharImgNumber(aadharData?.data?.Uid);
      UpdateCandidateLevel3Formik.setFieldValue("aadhar", aadharData?.data?.Uid);
    }
    if (aadharData?.data?.Name) {
      setAadharImgName(aadharData?.data?.Name);
      UpdateCandidateLevel3Formik.setFieldValue("name_as_per_aadhar", aadharData?.data?.Name);
    }

    if (panData?.data?.pan) {
      setPanImgNumber(panData?.data?.pan);
      UpdateCandidateLevel3Formik.setFieldValue("pan_id", panData?.data?.pan);
    }
    if (panData?.data?.Name) {
      setPanImgName(panData?.data?.Name);
      UpdateCandidateLevel3Formik.setFieldValue("name_as_per_pan", panData?.data?.Name);
    }
  }, [aadharData, panData])

  useEffect(() => {
    if (success == "Job Apply Success") {
      history.push('/careers/job-applied/job-success');
    }

    if (error == "user details error") {
      history.push('/careers/job-applied/job-error');
    }
  }, [success, error])

  const UpdateCandidateLevel3Formik = useFormik({
    initialValues: {
      aadhar_proof: '',
      aadhar: '',
      name_as_per_aadhar: '',
      pan_proof: '',
      pan_id: '',
      name_as_per_pan: '',
      passport_country_id: '',
      passport_id: '',
      passport_sur_name: '',
      passport_given_name: '',
      passport_place_of_issue: '',
      passport_expiry_date: '',
      is_international_worker: '',
      passport_proof: '',
      availability: '',
    },
    validationSchema: Yup.object().shape({
      aadhar_proof: Yup.string().required('This field is required'),
      aadhar: Yup.number().typeError("Must be a valid aadhar Number").required('This field is required'),
      name_as_per_aadhar: Yup.string().required('This field is required'),
      pan_proof: Yup.string().required('This field is required'),
      pan_id: Yup.string().matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Must be a valid PAN Number").required('This field is required'),
      name_as_per_pan: Yup.string().required('This field is required'),
      passport_country_id: Yup.string().required('This field is required'),
      passport_id: Yup.number().typeError("That doesn't look like a Passport number").required('This field is required'),
      // passport_sur_name: Yup.string().required('This field is required'),
      passport_given_name: Yup.string().required('This field is required'),
      passport_place_of_issue: Yup.string().required('This field is required'),
      passport_expiry_date: Yup.string().required('This field is required'),
      passport_proof: Yup.string().required('This field is required'),
      availability: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      values.aadhar = aadharImgNumber;
      values.name_as_per_aadhar = aadharImgName;
      values.pan_id = panImgNumber;
      values.name_as_per_pan = panImgName;
      const formData = JSON.stringify({ params: { "id": parseInt(atob(props?.match?.params?.id)), data: values, "level": 5 } })
      dispatch(CandidateApplyJob(formData))
    },
  });

  const handleAadharIdChange = (i) => {
    let files = i.target.files;
    if (files.length > 0) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        setPreviewAadhar(event.target.result);
        setAadharImgSelected({
          selectedImage: UpdateCandidateLevel3Formik.setFieldValue("aadhar_proof", event.target.result),
        })
        if (event.target.result) {
          var adRData = JSON.stringify({ "params": { "aadhar": event.target.result } });
          dispatch(AadharIdApi(adRData));
          setPreviewAadhar(URL.createObjectURL(i.target.files[0]));
        }
      }
    }
  }

  const handleAadharNoChange = (ev) => {
    setAadharImgNumber(ev);
    UpdateCandidateLevel3Formik.setFieldValue("aadhar", ev);
  }

  const handleAadharNameChange = (ev) => {
    setAadharImgName(ev);
    UpdateCandidateLevel3Formik.setFieldValue("name_as_per_aadhar", ev);
  }

  const handlePanCardNoChange = (ev) => {
    setPanImgNumber(ev);
    UpdateCandidateLevel3Formik.setFieldValue("pan_id", ev);
  }

  const handlePanCardNameChange = (ev) => {
    setPanImgName(ev);
    UpdateCandidateLevel3Formik.setFieldValue("name_as_per_pan", ev);
  }

  const handlePanIdChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setPanImgSelected({
        selectedImage: UpdateCandidateLevel3Formik.setFieldValue("pan_proof", event.target.result),
      })
      if (event.target.result) {
        var paRData = JSON.stringify({ "params": { "pan": event.target.result } });
        dispatch(PanIdApi(paRData));
        setPreviewPan(URL.createObjectURL(i.target.files[0]));
      }
    }
  }

  const handlePassportIdChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setPassportImgSelected({
        selectedImage: UpdateCandidateLevel3Formik.setFieldValue("passport_proof", event.target.result),
      })
      setPreviewPassport(URL.createObjectURL(i.target.files[0]));
    }
  }

  const handlePassportCountry = (e) => {
    if (e?.value) {
      setPassportCountryName(convertValueLabel(e.value, e.label));
      UpdateCandidateLevel3Formik.setFieldValue('passport_country_id', e.value);
    }
  }

  const handledateOfPExp = (date) => {
    if (date) {
      setdateOfPExp(date)
      UpdateCandidateLevel3Formik.setFieldValue('passport_expiry_date', indianDateFormat(date._d));
    }
  }

  const handledateOfAvai = (date) => {
    if (date) {
      setdateOfAvai(date)
      UpdateCandidateLevel3Formik.setFieldValue('availability', indianDateFormat(date._d));
    }
  }

  const CheckIsInternational = (e) => {
    if (e.target.checked == true) {
      UpdateCandidateLevel3Formik.setFieldValue('is_international_worker', 1);
      setIsInternationalWorker(true);
    } else {
      UpdateCandidateLevel3Formik.setFieldValue('is_international_worker', 0);
      setIsInternationalWorker(false);
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <div className='careerStart-main'>
        {
          (isLoading === true) ? <CunAuthLoader /> :
            <CRow onSubmit={UpdateCandidateLevel3Formik.handleSubmit} className="justify-content-center w-100" >
              <CCol lg="10">
                <div>
                  <CCard className="p-4 login-card">
                    <CCardBody>
                      <CForm className="form-horizontal">
                        <h1 align="center">Update Job Application</h1>
                        {/* <p className="text-muted">Sign In to your account</p> */}
                        <div className="row form-group">
                          <div className="col-md-4">
                            <label htmlFor="hf-email">Applicant's Name <span className='error'>*</span></label>
                            <input type="text" value={userName} className="form-control" placeholder="Applicant's Name" readOnly />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                            <input type="text" value={userEmail} className="form-control" placeholder="Email" readOnly />
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="">Joining Date <span className='error'>*</span></label>
                            <SingleDatePicker
                              id={'availability'}
                              date={dateOfAvai}
                              onDateChange={(date) => handledateOfAvai(date)}
                              focused={focusOfAvai}
                              onFocusChange={({ focused }) => setfocusOfAvai(focused)}
                              numberOfMonths={1}
                              displayFormat="DD-MM-YYYY"
                              // isOutsideRange={d => d.isSameOrBefore(moment())}
                              isOutsideRange={() => false}
                              isDayHighlighted={day => day.isSame(moment(), 'd')}
                              placeholder='Joining Date'
                              readOnly={true}
                              renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <div>
                                    <select
                                      value={month.month()}
                                      onChange={(e) => onMonthSelect(month, e.target.value)}
                                    >
                                      {moment.months().map((label, value) => (
                                        <option value={value} key={`availability${value}`}>{label}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                      {yearsDateOfLeaving('availability')}
                                    </select>
                                  </div>
                                </div>}
                            />
                            {UpdateCandidateLevel3Formik.errors.availability && UpdateCandidateLevel3Formik.touched.availability ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.availability}</div> : null}
                          </div>
                        </div>
                        <CCard className="mb-4">
                          <CCardHeader id="headingTwo " className="header">
                            <div>
                              <h5 className="m-0 p-0">Aadhar Information</h5>
                            </div>
                          </CCardHeader>
                          <CCardBody>
                            <div className="row form-group">
                              <div className="col-lg-3">
                                <label htmlFor="">Aadhar Proof <span className='error'>*</span></label>
                                <input type="file" name='aadhar_proof' onChange={(event) => { handleAadharIdChange(event) }} />
                                {(() => {
                                  if (previewAadhar) {
                                    return (
                                      <div className='mt-2'><a href={previewAadhar} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    )
                                  } else if (aadharExistingFile) {
                                    return (
                                      <div className='mt-2'><a href={aadharExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    )
                                  }
                                })()}
                                {/*
                                      
                                      (previewAadhar) && <div className='mt-2'><a href={previewAadhar} target='_blank' className='mt-4'>New Attachment</a></div>
                                    }
                                    {
                                      (aadharExistingFile) && <div className='mt-2'><a href={aadharExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    */}
                                {UpdateCandidateLevel3Formik.errors.aadhar_proof && UpdateCandidateLevel3Formik.touched.aadhar_proof ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.aadhar_proof}</div> : null}
                              </div>
                              <div className="col-lg-1"></div>
                              <div className="col-lg-4">
                                <label htmlFor="">Aadhar Number <span className='error'>*</span></label>
                                <input type="text" name='aadhar' id='aadhar' className="form-control" placeholder='Aadhar Number' maxLength={12} onChange={e => handleAadharNoChange(e.target.value)} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={aadharImgNumber} />
                                {UpdateCandidateLevel3Formik.errors.aadhar && UpdateCandidateLevel3Formik.touched.aadhar ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.aadhar}</div> : null}
                              </div>
                              <div className="col-lg-4">
                                <label htmlFor="">Name as per Aadhar <span className='error'>*</span></label>
                                <input type="text" name='name_as_per_aadhar' className="form-control" placeholder='Name as per Aadhar' maxLength={50} onChange={e => handleAadharNameChange(e.target.value)} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={aadharImgName} />
                                {UpdateCandidateLevel3Formik.errors.name_as_per_aadhar && UpdateCandidateLevel3Formik.touched.name_as_per_aadhar ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.name_as_per_aadhar}</div> : null}
                              </div>
                              {/* <pre>{JSON.stringify(UpdateCandidateLevel3Formik, null, 2)}</pre> */}
                            </div>
                          </CCardBody>
                        </CCard>
                        <CCard className="mb-4">
                          <CCardHeader id="headingTwo " className="header">
                            <div>
                              <h5 className="m-0 p-0">PAN Information</h5>
                            </div>
                          </CCardHeader>
                          <CCardBody>
                            <div className="row form-group">
                              <div className="col-lg-3">
                                <label htmlFor="">Upload PAN Card <span className='error'>*</span></label>
                                <input type="file" name='pan_proof' onChange={(event) => { handlePanIdChange(event) }} />
                                {/* {
                                      (panExistingFile) ? <div className='mt-2'><a href={panExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                                    } */}
                                {(() => {
                                  if (previewPan) {
                                    return (
                                      <div className='mt-2'><a href={previewPan} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    )
                                  } else if (panExistingFile) {
                                    return (
                                      <div className='mt-2'><a href={panExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    )
                                  }
                                })()}
                                {UpdateCandidateLevel3Formik.errors.pan_proof && UpdateCandidateLevel3Formik.touched.pan_proof ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.pan_proof}</div> : null}
                              </div>
                              <div className="col-lg-1"></div>
                              <div className="col-lg-4">
                                <label htmlFor="">PAN card Number<span className='error'>*</span></label>
                                <input type="text" name='pan_id' className="form-control" placeholder='PAN card Number' maxLength={10} onChange={e => handlePanCardNoChange(e.target.value)} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={panImgNumber} />
                                {UpdateCandidateLevel3Formik.errors.pan_id && UpdateCandidateLevel3Formik.touched.pan_id ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.pan_id}</div> : null}
                              </div>
                              <div className="col-lg-4">
                                <label htmlFor="">Name as per PAN card <span className='error'>*</span></label>
                                <input type="text" name='name_as_per_pan' className="form-control" placeholder='Name as per PAN card' maxLength={50} onChange={e => handlePanCardNameChange(e.target.value)} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={panImgName} />
                                {UpdateCandidateLevel3Formik.errors.name_as_per_pan && UpdateCandidateLevel3Formik.touched.name_as_per_pan ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.name_as_per_pan}</div> : null}
                              </div>
                            </div>
                          </CCardBody>
                        </CCard>

                        <CCard className="mb-4">
                          <CCardHeader id="headingTwo " className="header">
                            <div>
                              <h5 className="m-0 p-0">Passport Information</h5>
                            </div>
                          </CCardHeader>
                          <CCardBody>
                            <div className="row form-group">
                              <div className="col-lg-3">
                                <label htmlFor="">Upload Passport <span className='error'>*</span></label>
                                <input type="file" name='passport_proof' onChange={(event) => { handlePassportIdChange(event) }} />
                                {/* {
                                      (passportIdExistingFile) ? <div className='mt-2'><a href={passportIdExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                                    } */}
                                {(() => {
                                  if (previewPassport) {
                                    return (
                                      <div className='mt-2'><a href={previewPassport} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    )
                                  } else if (passportIdExistingFile) {
                                    return (
                                      <div className='mt-2'><a href={passportIdExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                                    )
                                  }
                                })()}
                                {UpdateCandidateLevel3Formik.errors.passport_proof && UpdateCandidateLevel3Formik.touched.passport_proof ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_proof}</div> : null}
                              </div>
                              <div className="col-md-3">
                                <label htmlFor="hf-email">Passport Country <span className='error'>*</span></label>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={passportCountryName}
                                  name="passport_country_id"
                                  options={dropdownData?.uaCountryCommonData?.data?.result}
                                  placeholder={'Choose a Country'}
                                  onChange={(e) => handlePassportCountry(e)}
                                  onBlur={UpdateCandidateLevel3Formik.handleBlur}
                                />
                                {UpdateCandidateLevel3Formik.errors.passport_country_id && UpdateCandidateLevel3Formik.touched.passport_country_id ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_country_id}</div> : null}
                              </div>
                              <div className="col-lg-3">
                                <label htmlFor="">Passport Number <span className='error'>*</span></label>
                                <input type="text" name='passport_id' className="form-control" placeholder='Passport Number' maxLength={10} onChange={UpdateCandidateLevel3Formik.handleChange} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={UpdateCandidateLevel3Formik.values.passport_id} />
                                {UpdateCandidateLevel3Formik.errors.passport_id && UpdateCandidateLevel3Formik.touched.passport_id ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_id}</div> : null}
                              </div>
                              <div className="col-lg-3">
                                <label htmlFor="">Surname</label>
                                <input type="text" name='passport_sur_name' className="form-control" placeholder='Surname' maxLength={20} onChange={UpdateCandidateLevel3Formik.handleChange} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={UpdateCandidateLevel3Formik.values.passport_sur_name} />
                                {UpdateCandidateLevel3Formik.errors.passport_sur_name && UpdateCandidateLevel3Formik.touched.passport_sur_name ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_sur_name}</div> : null}
                              </div>
                            </div>
                            <div className="row form-group">
                              <div className="col-lg-3">
                                <label htmlFor="">Given Name</label>
                                <input type="text" name='passport_given_name' className="form-control" placeholder='Given Name' maxLength={20} onChange={UpdateCandidateLevel3Formik.handleChange} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={UpdateCandidateLevel3Formik.values.passport_given_name} />
                                {UpdateCandidateLevel3Formik.errors.passport_given_name && UpdateCandidateLevel3Formik.touched.passport_given_name ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_given_name}</div> : null}
                              </div>
                              <div className="col-lg-3">
                                <label htmlFor="">Place of Issue</label>
                                <input type="text" name='passport_place_of_issue' className="form-control" placeholder='Place of Issue' maxLength={20} onChange={UpdateCandidateLevel3Formik.handleChange} onBlur={UpdateCandidateLevel3Formik.handleBlur} value={UpdateCandidateLevel3Formik.values.passport_place_of_issue} />
                                {UpdateCandidateLevel3Formik.errors.passport_place_of_issue && UpdateCandidateLevel3Formik.touched.passport_place_of_issue ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_place_of_issue}</div> : null}
                              </div>
                              <div className="col-lg-3">
                                <label htmlFor="">Date of Expiry</label>
                                <SingleDatePicker
                                  id={'passport_expiry_date'}
                                  date={dateOfPExp}
                                  onDateChange={(date) => handledateOfPExp(date)}
                                  focused={focusOfPExp}
                                  onFocusChange={({ focused }) => setfocusOfPExp(focused)}
                                  numberOfMonths={1}
                                  displayFormat="DD-MM-YYYY"
                                  // isOutsideRange={d => d.isSameOrAfter(moment())}
                                  isOutsideRange={() => false}
                                  isDayHighlighted={day => day.isSame(moment(), 'd')}
                                  placeholder='Date of Expiry'
                                  readOnly={true}
                                  renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                      <div>
                                        <select
                                          value={month.month()}
                                          onChange={(e) => onMonthSelect(month, e.target.value)}
                                        >
                                          {moment.months().map((label, value) => (
                                            <option value={value} key={`passport_expiry_date_${value}`}>{label}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div>
                                        <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                          {yearsDateOfLeaving('passport_expiry_date_yr')}
                                        </select>
                                      </div>
                                    </div>}
                                />
                                {UpdateCandidateLevel3Formik.errors.passport_expiry_date && UpdateCandidateLevel3Formik.touched.passport_expiry_date ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.passport_expiry_date}</div> : null}
                              </div>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <CFormGroup variant="custom-checkbox" inline style={{ marginTop: '58px !important' }} id='compay_add_show_caste'>
                                    <CInputCheckbox custom id="is_international_worker" name="is_international_worker" onChange={(e) => CheckIsInternational(e)} checked={internationalWorker} />
                                    <CLabel variant="custom-checkbox" htmlFor="is_international_worker">Is International Worker?</CLabel>
                                  </CFormGroup>
                                  {UpdateCandidateLevel3Formik.errors.is_international_worker && UpdateCandidateLevel3Formik.touched.is_international_worker ? <div className="help-block text-danger">{UpdateCandidateLevel3Formik.errors.is_international_worker}</div> : null}
                                </div>
                              </div>
                            </div>
                          </CCardBody>
                        </CCard>

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

export default UpdateLevel2Info
