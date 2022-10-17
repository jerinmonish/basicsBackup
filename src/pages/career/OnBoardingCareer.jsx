import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import * as constants from "src/actions/types"
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
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
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux';
import { isLoggedIn, encryptSingleData, indianDateFormat } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetJobBasedCompany, CandidateApplyJob } from '../../actions/onboarding';
import CLoader from 'src/pages/loader/CLoader';
import CunAuthLoader from '../loader/CunAuthLoader';
const OnBoardingCareer = (props) => {
  const dispatch = useDispatch();
  const { jobData, success, showToast, isLoading } = useSelector(state => state.onboardingBackend);
  const [jobOptions, setJobOptions] = useState([]);

  console.log("jobdata", jobData);

  //To load years
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  useEffect(() => {
    const query = JSON.stringify({
      "params": {
        query: '{id,name}',
        isDropdown: 1,
        filter: "[['state', '=', 'recruit'],['company_id','='," + props.match.params.id + "]]"
      }
    });
    dispatch(GetJobBasedCompany(query));
  }, [])

  useEffect(() => {
    if (jobData?.data?.result?.length > 0) {
      setJobOptions(jobData?.data?.result)
    }
  }, [jobData])

  useEffect(() => {
    //To Show Success Message
    if (showToast) {
      let sMsg = ''
      if (success === 'Job Apply Success') {
        sMsg = 'Thank You for applying, We will contact you shortly.'
        JobCareerFormik.resetForm();
      }
      if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT,
        })
        dispatch({
          type: constants.MESSAGE_CLEAR,
        })
      }
    }
  }, [success, showToast]);


  const [userDob, setUserDob] = useState(null);
  const [focusDob, setFocusDob] = useState(false);

  //Form Validation
  const JobCareerFormik = useFormik({
    initialValues: {
      partner_name: '',
      email_from: '',
      job_id: '',
      partner_mobile: '',
      birthday: '',
    },
    validationSchema: Yup.object({
      partner_name: Yup.string().required('This field is required'),
      email_from: Yup.string().email('Invalid email format').required('This field is required'),
      job_id: Yup.string().required('This field is required'),
      birthday: Yup.string().required('This field is required'),
      partner_mobile: Yup.string()
        .required("This field is Required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{7,8}?$/,
          "Phone number is not valid"
        ),
      year_of_experience: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(CandidateApplyJob(formData))
    },
  })


  const handleJobChange = (e) => {
    if (e?.value) {
      JobCareerFormik.setFieldValue('job_id', e.value)
    }
  }

  const handleDOB = (date) => {
    if (date) {
      setUserDob(date)
      JobCareerFormik.setFieldValue('birthday', indianDateFormat(date._d));
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {
        (isLoading === true) ? <CunAuthLoader /> :
          <div className='login-main'>

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
                            <label htmlFor="hf-email">Applicant's Name <span className='error'>*</span></label>
                            <input type="text" name='partner_name' value={JobCareerFormik.values.partner_name} className="form-control" placeholder="Applicant's Name" maxLength={25} onChange={JobCareerFormik.handleChange} onBlur={JobCareerFormik.handleBlur} />
                            {JobCareerFormik.touched.partner_name && JobCareerFormik.errors.partner_name ? (<div className="help-block text-danger">{JobCareerFormik.errors.partner_name}</div>) : null}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                            <input type="text" name='email_from' className="form-control" placeholder='Email' maxLength={50} value={JobCareerFormik.values.email_from} onChange={JobCareerFormik.handleChange} onBlur={JobCareerFormik.handleBlur} />
                            {JobCareerFormik.touched.email_from && JobCareerFormik.errors.email_from ? (<div className="help-block text-danger">{JobCareerFormik.errors.email_from}</div>) : null}
                          </div>
                        </div>
                        {/* <pre>{JSON.stringify(JobCareerFormik, null, 2)}</pre> */}
                        <div className="row form-group">
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Applied Job <span className='error'>*</span></label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              name="job_id"
                              options={jobOptions}
                              placeholder={'Choose a Job'}
                              onChange={(e) => handleJobChange(e)}
                            />
                            {JobCareerFormik.touched.job_id && JobCareerFormik.errors.job_id ? (<div className="help-block text-danger">{JobCareerFormik.errors.job_id}
                            </div>
                            ) : null}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="hf-email">Year of Experience</label>
                            <input type="number" name='year_of_experience' className="form-control" placeholder='Year of experience' maxLength={2} value={JobCareerFormik.values.year_of_experience} onChange={JobCareerFormik.handleChange} onBlur={JobCareerFormik.handleBlur} />
                            {JobCareerFormik.touched.year_of_experience && JobCareerFormik.errors.year_of_experience ? (<div className="help-block text-danger">{JobCareerFormik.errors.year_of_experience}</div>) : null}
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Mobile <span className='error'>*</span></label>
                            <input type="text" name='partner_mobile' className="form-control" placeholder='Mobile' maxLength={10} value={JobCareerFormik.values.partner_mobile} onChange={JobCareerFormik.handleChange} onBlur={JobCareerFormik.handleBlur} />
                            {JobCareerFormik.touched.partner_mobile && JobCareerFormik.errors.partner_mobile ? (<div className="help-block text-danger">{JobCareerFormik.errors.partner_mobile}</div>) : null}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Date Of Birth <span className='error'>*</span></label>
                            <SingleDatePicker
                              id={'birthday'}
                              date={userDob} // momentPropTypes.momentObj or null
                              onDateChange={(date) => handleDOB(date)} // PropTypes.func.isRequired
                              focused={focusDob} // PropTypes.bool
                              onFocusChange={({ focused }) => setFocusDob(focused)} // PropTypes.func.isRequired
                              numberOfMonths={1}
                              displayFormat="DD-MM-YYYY"
                              //showClearDate={true}
                              // isOutsideRange={d => d.isAfter(moment())}
                              isOutsideRange={() => false}
                              isDayHighlighted={day => day.isAfter(moment(), 'd')}
                              placeholder='Date Of Birth'
                              readOnly={true}
                              renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <div>
                                    <select value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
                                      {moment.months().map((label, value) => (
                                        <option value={value} key={`DOB${value}`}>{label}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                      {yearsDD('DOB')}
                                    </select>
                                  </div>
                                </div>
                              }
                            />
                            {JobCareerFormik.touched.birthday && JobCareerFormik.errors.birthday ? (<div className="help-block text-danger">{JobCareerFormik.errors.birthday}</div>) : null}
                          </div>
                          {/* <div className="col-md-6">
                                <label htmlFor="hf-email">Subject / Application Name</label>
                                <textarea type="text" name='name' className="form-control" placeholder="Subject / Application Name" maxLength={500}value={JobCareerFormik.values.name} onChange={JobCareerFormik.handleChange} onBlur={JobCareerFormik.handleBlur}></textarea>
                              </div> */}
                        </div>
                        <CRow>
                          <CCol xs="6">
                            <CButton type='submit' color="primary" className="px-4">Apply</CButton>
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

          </div>
      }
    </div>
  )
}

export default OnBoardingCareer
