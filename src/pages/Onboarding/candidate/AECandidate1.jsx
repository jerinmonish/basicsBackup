import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LocationDropDownList, FunctionDropDownList, JoblistDropDownList, MediumDropDownList } from '../../../actions/commonAction'
import { CandidateAddAPI, CandidateUpdateAPI } from '../../../actions/onboarding'
import { useFormik } from 'formik'
import Select from 'react-select'
import * as Yup from 'yup'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CFade,
  CForm,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { decryptSingleData, indianDateFormat, convertValueLabel, convertDateToMDY } from '../../../utils/helper'
import { UserListDropDown } from '../../../actions/administration';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import CLoader from 'src/pages/loader/CLoader';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from "src/actions/types"
const AddCandidate1 = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const dropdownData = useSelector((state) => state.commonData);
  const { isLoading, error, success, showToast } = useSelector((state) => state.onboardingBackend);
  const administrationData = useSelector((state) => state.administrationBackend);

  useEffect(() => {
    //To Show Success Message
    if (showToast) {
      let sMsg = ''
      if (success === 'Candidate add success') {
        sMsg = 'Candidate Successfully Saved'
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

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
    dispatch(MediumDropDownList())
  }, [])

  const [dateEpfSt, setDateEpfSt] = useState(null);
  const [focusEsiSt, setFocusEsiSt] = useState(false);

  const handleEsiDate = (date) => {
    if (date) {
      setDateEpfSt(date)
      CandidateAddFormik.setFieldValue('applied_on', indianDateFormat(date._d));
    }
  }

  const [dateAvailability, setDateAvailability] = useState(null);
  const [focusAvailability, setFocusAviSt] = useState(false);

  const handleAviDate = (date) => {
    if (date) {
      setDateAvailability(date)
      CandidateAddFormik.setFieldValue('availability', indianDateFormat(date._d));
    }
  }

  //To load years
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  const [groupChanged, setGroupChanged] = useState(0);
  const [companyChanged, setCompanyChanged] = useState(0);
  const [locationChanged, setLocationChanged] = useState(0);
  const [functionChanged, setFunctionChanged] = useState(0);
  const [jobChanged, setJobChanged] = useState(0);


  // to load the option data for dropdown
  const groupOptions = dropdownData?.groupComData?.data?.result
  const [companyOptions, setCompanyOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [functionOptions, setFunctionOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [recruiterOptions, setRecruiterOptions] = useState([]);
  // const jobOptions = dropdownData?.joblistComData?.data?.result
  const mediumOptions = dropdownData?.mediumComData?.data?.result


  const [selectGroupName, setSelectGroupName] = useState([])
  const [selectCompany, setSelectCompany] = useState([])
  const [selectlocation, setSelectLocation] = useState([])
  const [selectfunction, setSelectFunction] = useState([])
  const [selectjobname, setSelectJobname] = useState([])
  const [selectMedium, setSelectMedium] = useState([])
  const [selectRecruiter, setSelectRecruiter] = useState([])


  const selectCompanyRef = useRef()
  const selectLocationRef = useRef()
  const selectFunctionRef = useRef()
  const selectJobRef = useRef()
  const selectRecuriterRef = useRef()

  const onCompanyClear = () => {
    selectCompanyRef?.current?.select.clearValue();
    setSelectCompany(convertValueLabel([]));
  }


  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
    setSelectLocation(convertValueLabel([]));
  }

  const onFunctionClear = () => {
    selectFunctionRef?.current?.select.clearValue()
    setSelectFunction(convertValueLabel([]));
  }

  const onJobClear = () => {
    selectJobRef?.current?.select.clearValue()
    setSelectJobname(convertValueLabel([]));
    setJobOptions([]);
  }

  const onRecruiterClear = () => {
    selectRecuriterRef?.current?.select.clearValue()
    setSelectRecruiter(convertValueLabel([]));
    setRecruiterOptions([]);
  }

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

  useEffect(() => {
    if (dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
      setLocationOptions(dropdownData?.locationCommonData?.data?.result);
    }
  }, [dropdownData?.locationCommonData?.data?.result, companyChanged])


  useEffect(() => {
    if (dropdownData?.functionCommonData?.data?.result && locationChanged === 1) {
      setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
    }
  }, [dropdownData?.functionCommonData?.data?.result, locationChanged])



  useEffect(() => {
    if (dropdownData?.joblistComData?.data?.result && functionChanged === 1) {
      setJobOptions(dropdownData?.joblistComData?.data?.result);
    }
  }, [dropdownData?.joblistComData?.data?.result, functionChanged])

  useEffect(() => {
    if (administrationData?.userlistDetails?.data?.result && companyChanged === 1) {
      setRecruiterOptions(administrationData?.userlistDetails?.data?.result);
    }
  }, [administrationData?.userlistDetails?.data?.result, companyChanged])


  const handleGroupChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("group_id", "=", ' + e.value + ')]'
        },
      }
      dispatch(CompanyDropDownList(sendGpparams))
      CandidateAddFormik.setFieldValue('group_id', e.value)
      setSelectGroupName(convertValueLabel(e?.value, e?.label))
      onCompanyClear();
      onLocationClear();
      onFunctionClear();
      onJobClear();
      setGroupChanged(1);
      setLocationOptions(convertValueLabel([]));
      setFunctionOptions(convertValueLabel([]));
    }
  }


  const handleCompanyChange = (e) => {
    if (e?.value) {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("company_id", "=", ' + e.value + ')]'
        },
      }

      dispatch(LocationDropDownList(sendGpparams))
      CandidateAddFormik.setFieldValue('company_id', e.value)
      setSelectCompany(convertValueLabel(e?.value, e?.label))
      onLocationClear()
      onFunctionClear()
      onJobClear()
      onRecruiterClear()
      setFunctionOptions(convertValueLabel([]));
      setJobOptions(convertValueLabel([]));
      setCompanyChanged(1);
      const recParams = {
        params: {
          query: "{id,name}",
          isDropdown: 1,
          filter: "[['company_id', '=', " + e.value + "]]",
        },
      }
      dispatch(UserListDropDown(recParams));
    }
  }


  const handleLocationChange = (e) => {
    if (e?.value) {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["location_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
        },
      }
      dispatch(FunctionDropDownList(sendGpparams))
      CandidateAddFormik.setFieldValue('location_id', e?.value)
      setSelectLocation(convertValueLabel(e?.value, e?.label))
      onFunctionClear()
      onJobClear()
      setJobOptions(convertValueLabel([]));
      setLocationChanged(1)
    }
  }

  const handleFunctionChange = (e) => {
    if (e?.value) {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["department_id", "in", [' + e?.value + ']]]',
        },
      }
      onJobClear()
      dispatch(JoblistDropDownList(sendGpparams))
      CandidateAddFormik.setFieldValue('department_id', e?.value)
      setFunctionChanged(1);
      setSelectFunction(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleJobChange = (e) => {
    if (e?.value) {
      CandidateAddFormik.setFieldValue('job_id', e?.value)
      setSelectJobname(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleMediumChange = (e) => {
    if (e?.value) {
      CandidateAddFormik.setFieldValue('medium_id', e?.value)
      setSelectMedium(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleRecuriterChange = (e) => {
    if (e?.value) {
      CandidateAddFormik.setFieldValue('user_id', e?.value);
      setSelectRecruiter(convertValueLabel(e?.value, e?.label));
    }
  }

  //Designation Add Form Initilization
  const CandidateAddFormik = useFormik({
    initialValues: {
      name: '',
      partner_name: '',
      reference: '',
      email_from: '',
      partner_mobile: '',
      description: '',
      group_id: '',
      company_id: '',
      location_id: '',
      department_id: '',
      job_id: '',
      applied_on: '',
      medium_id: '',
      user_id: '',
      availability: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      partner_name: Yup.string().required('This field is required'),
      // reference: Yup.string().required('This field is required'),
      email_from: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      partner_mobile: Yup.string()
        .required("This field is Required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{7,8}?$/,
          "Phone number is not valid"
        ),
      // description: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
      // department_id: Yup.array().required('This field is required'),
      job_id: Yup.string().required('This field is required'),
      applied_on: Yup.string().required('This field is required'),
      // medium_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })

      if (props?.dataEdit?.data?.id) {
        dispatch(CandidateUpdateAPI(props.dataId, formData))
      } else {
        dispatch(CandidateAddAPI(formData, history))
      }
    },
  })

  //Update Data  
  useEffect(() => {
    if (props?.dataEdit?.data !== null) {
      CandidateAddFormik.setValues({
        "name": props?.dataEdit?.data?.name ? props?.dataEdit?.data?.name : '',
        "partner_name": props?.dataEdit?.data?.partner_name ? props?.dataEdit?.data?.partner_name : '',
        "email_from": props?.dataEdit?.data?.email_from ? props?.dataEdit?.data?.email_from : '',
        "description": props?.dataEdit?.data?.description ? props?.dataEdit?.data?.description : '',
        "partner_mobile": props?.dataEdit?.data?.partner_mobile ? props?.dataEdit?.data?.partner_mobile : '',
        "applied_on": props?.dataEdit?.data?.applied_on ? props?.dataEdit?.data?.applied_on : null,
        "group_id": props?.dataEdit?.data?.group_id,
        "company_id": props?.dataEdit?.data?.company_id,
        "location_id": props?.dataEdit?.data?.location_id,
        "department_id": props?.dataEdit?.data?.department_id,
        "job_id": props?.dataEdit?.data?.job_id,
        "medium_id": props?.dataEdit?.data?.medium_id,
        "user_id": props?.dataEdit?.data?.user_id,
        "availability": props?.dataEdit?.data?.availability,

      });

      if (props?.dataEdit?.data?.applied_on) {
        setDateEpfSt(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.applied_on))));
      } else {
        setDateEpfSt(null);
      }
      if (props?.dataEdit?.data?.availability) {
        setDateAvailability(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.availability))));
      } else {
        setDateAvailability(null);
      }

      setSelectGroupName(convertValueLabel(props?.dataEdit?.data?.group_id, props?.dataEdit?.data?.group_id_name))
      setSelectCompany(convertValueLabel(props?.dataEdit?.data?.company_id, props?.dataEdit?.data?.company_id_name))
      setSelectLocation(convertValueLabel(props?.dataEdit?.data?.location_id, props?.dataEdit?.data?.location_id_name))
      setSelectFunction(convertValueLabel(props?.dataEdit?.data?.department_id, props?.dataEdit?.data?.department_id_name))
      setSelectJobname(convertValueLabel(props?.dataEdit?.data?.job_id, props?.dataEdit?.data?.job_id_name))
      setSelectMedium(convertValueLabel(props?.dataEdit?.data?.medium_id, props?.dataEdit?.data?.medium_id_name))
      setSelectRecruiter(convertValueLabel(props?.dataEdit?.data?.user_id, props?.dataEdit?.data?.user_id_name))

      setCompanyOptions(props?.dataEdit?.data?.company_id_list);
      setLocationOptions(props?.dataEdit?.data?.location_id_list);
      setFunctionOptions(props?.dataEdit?.data?.department_id_list);
      setJobOptions(props?.dataEdit?.data?.job_id_list);
      setRecruiterOptions(props?.dataEdit?.data?.user_id_list);
    }
  }, [props?.dataEdit?.data])

  return (
    <CCard className="mb-4">
      {
        (isLoading === true) ? <CLoader /> :
          <CCardBody>
            <CForm onSubmit={CandidateAddFormik.handleSubmit} className="form-horizontal">
              <div>
                <div className="row form-group">
                  <div className="col-md-4">
                    <label htmlFor="hf-email">Candidate's Name <span className="error">*</span></label>
                    <input
                      type="text"
                      name="partner_name"
                      value={CandidateAddFormik.values.partner_name ? CandidateAddFormik.values.partner_name : ''}
                      className="form-control"
                      placeholder="Candidate's Name"
                      maxLength={25}
                      onChange={CandidateAddFormik.handleChange}
                      onBlur={CandidateAddFormik.handleBlur}
                    />
                    {CandidateAddFormik.touched.partner_name && CandidateAddFormik.errors.partner_name ? (<div className="help-block text-danger">{CandidateAddFormik.errors.partner_name}
                    </div>
                    ) : null}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="hf-email">Subject <span className="error">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={CandidateAddFormik.values.name}
                      className="form-control"
                      placeholder="Subject"
                      maxLength={25}
                      onChange={CandidateAddFormik.handleChange}
                      onBlur={CandidateAddFormik.handleBlur}
                    />
                    {CandidateAddFormik.touched.name && CandidateAddFormik.errors.name ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.name}</div>) : null}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="hf-email">Email <span className="error">*</span></label>
                    <input
                      type="email"
                      name="email_from"
                      value={CandidateAddFormik.values.email_from}
                      className="form-control"
                      placeholder="Email"
                      maxLength={50}
                      onChange={CandidateAddFormik.handleChange}
                      onBlur={CandidateAddFormik.handleBlur}
                    />
                    {CandidateAddFormik.touched.email_from && CandidateAddFormik.errors.email_from ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.email_from}</div>) : null}
                  </div>

                  {/* <div className="col-md-4">
                  <label hidden htmlFor="hf-email">
                  Temporary Reference <span className="error">*</span>

                  </label>
                  <input
                  type="hidden"

                  name="reference"
                  value={CandidateAddFormik.values.reference}
                  className="form-control"
                  placeholder="Enter a reference"
                  maxLength={10}
                  onChange={CandidateAddFormik.handleChange}
                  onBlur={CandidateAddFormik.handleBlur}
                  />
                  {CandidateAddFormik.touched.reference &&
                  CandidateAddFormik.errors.reference ? (
                  <div className="help-block text-danger">
                  {CandidateAddFormik.errors.reference}
                  </div>
                  ) : null}
                  </div> 
                  */}
                </div>
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Mobile<span className="error">*</span></label>
                      <input
                        type="text"
                        name="partner_mobile"
                        value={CandidateAddFormik.values.partner_mobile}
                        className="form-control"
                        placeholder="Mobile"
                        maxLength={10}
                        onChange={CandidateAddFormik.handleChange}
                        onBlur={CandidateAddFormik.handleBlur}
                      />
                      {CandidateAddFormik.touched.partner_mobile && CandidateAddFormik.errors.partner_mobile ? (<div className="help-block text-danger">{CandidateAddFormik.errors.partner_mobile}</div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Applied On <span className="error">*</span></label>
                      <SingleDatePicker
                        id={'applied_on'}
                        date={dateEpfSt} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleEsiDate(date)} // PropTypes.func.isRequired
                        focused={focusEsiSt} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusEsiSt(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        isOutsideRange={d => d.isAfter(moment())}
                        isDayHighlighted={day => day.isSame(moment(), 'd')}
                        placeholder='Applied On'
                        readOnly={true}
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select
                                value={month.month()}
                                onChange={(e) => onMonthSelect(month, e.target.value)}
                              >
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`applied_on${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('applied_on')}
                              </select>
                            </div>
                          </div>}
                      />
                      {CandidateAddFormik.touched.applied_on &&
                        CandidateAddFormik.errors.applied_on ? (
                        <div className="help-block text-danger">
                          {CandidateAddFormik.errors.applied_on}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">Group <span className="error">*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        name="group_id"
                        value={selectGroupName}
                        options={groupOptions}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleGroupChange(e)}
                      // onChange={({ value }) => CandidateAddFormik.setFieldValue('group_id', value)}
                      />
                      {CandidateAddFormik.touched.group_id && CandidateAddFormik.errors.group_id ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.group_id} </div>) : null}
                    </div>

                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Company <span className="error">*</span></label>
                      <Select
                        //  isMulti={true}
                        ref={selectCompanyRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a  Company '}
                        name="company_id"
                        options={companyOptions}
                        value={selectCompany}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleCompanyChange(e)}
                      />
                      {CandidateAddFormik.touched.company_id && CandidateAddFormik.errors.company_id ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.company_id}</div>) : null}
                    </div>
                    <div className="col-md-4"> <label htmlFor="hf-email"> Location <span className="error">*</span> </label>
                      <Select
                        ref={selectLocationRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a location'}
                        name="location_id"
                        options={locationOptions}
                        value={selectlocation}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      />
                      {CandidateAddFormik.touched.location_id && CandidateAddFormik.errors.location_id ? (<div className="help-block text-danger">{CandidateAddFormik.errors.location_id}</div>) : null}</div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Function<span className="error">*</span></label>
                      <Select
                        ref={selectFunctionRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a function'}
                        name="department_id"
                        options={functionOptions}
                        value={selectfunction}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleFunctionChange(e)}
                      />
                      {CandidateAddFormik.touched.department_id && CandidateAddFormik.errors.department_id ? (<div className="help-block text-danger">{CandidateAddFormik.errors.department_id}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4"><label htmlFor="hf-email">Applied Job <span className="error">*</span></label>
                      <Select
                        //  isMulti={true}
                        ref={selectJobRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Job '}
                        name="job_id"
                        options={jobOptions}
                        value={selectjobname}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleJobChange(e)}
                      />
                      {CandidateAddFormik.touched.job_id && CandidateAddFormik.errors.job_id ? (<div className="help-block text-danger">{CandidateAddFormik.errors.job_id}</div>) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Medium {/*<span className="error">*</span>*/}</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a medium'}
                        name="medium_id"
                        options={mediumOptions}
                        value={selectMedium}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleMediumChange(e)}
                      />
                      {CandidateAddFormik.touched.medium_id && CandidateAddFormik.errors.medium_id ? (<div className="help-block text-danger">{CandidateAddFormik.errors.medium_id}</div>) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Recruiter</label>
                      <Select
                        ref={selectRecuriterRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Recruiter'}
                        name="user_id"
                        options={recruiterOptions}
                        value={selectRecruiter}
                        onBlur={CandidateAddFormik.handleBlur}
                        onChange={(e) => handleRecuriterChange(e)}
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Availability</label>
                      <SingleDatePicker
                        id={'availability'}
                        date={dateAvailability} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleAviDate(date)} // PropTypes.func.isRequired
                        focused={focusAvailability} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusAviSt(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        isOutsideRange={() => false}
                        isDayHighlighted={day => day.isSame(moment(), 'd')}
                        placeholder='Availability'
                        readOnly={true}
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`availability${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('availability')}
                              </select>
                            </div>
                          </div>
                        }
                      />
                    </div>
                    <div className="col-md-8">
                      <label htmlFor="hf-email">Application Summary</label>
                      <textarea
                        type="range"
                        name="description"
                        value={CandidateAddFormik.values.description}
                        className="form-control"
                        placeholder="Application Summary"
                        maxLength={500}
                        onChange={CandidateAddFormik.handleChange}
                        onBlur={CandidateAddFormik.handleBlur}
                      />
                      {CandidateAddFormik.touched.description && CandidateAddFormik.errors.description ? (<div className="help-block text-danger">{CandidateAddFormik.errors.description}</div>) : null}
                    </div>
                  </div>
                </div>
              </div>
              <CCardFooter>
                <CRow>
                  <CCol className="col-md-10" align="center">
                    <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" />{props?.dataEdit?.data?.id ? ' Update' : ' Save'}</CButton>
                    <Link className="ml-3 btn btn-danger" to={'/onboarding/candidates'}><CIcon name="cil-ban" /> Cancel</Link>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CForm>
          </CCardBody>
      }
    </CCard>
  )
}

export default AddCandidate1
