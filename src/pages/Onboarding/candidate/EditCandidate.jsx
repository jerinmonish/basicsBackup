import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LocationDropDownList, FunctionDropDownList, JoblistDropDownList, MediumDropDownList } from '../../../actions/commonAction'
import { CandidateEditAPI, CandidateUpdateAPI } from '../../../actions/onboarding'
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
import { decryptSingleData, indianDateFormat, convertDateToMDY, convertValueLabel } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const EditCandidate = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const dropdownData = useSelector((state) => state.commonData)
  // console.log("dropdownData",dropdownData);

  const [selectGroupName, setSelectGroupName] = useState([])
  const [selectCompany, setSelectCompany] = useState([])
  const [selectlocation, setSelectLocation] = useState([])
  const [selectfunction, setSelectFunction] = useState([])

  const [selectjobname, setSelectJobname] = useState([])
  const [selectMedium, setSelectMedium] = useState([])
  //To load dropdown predefined data
  useEffect(() => {


    dispatch(CommonGroupList())
    dispatch(MediumDropDownList())

    dispatch(CandidateEditAPI(decryptSingleData(props?.match?.params?.id)))
  }, [])
  const { candidateEditDetails, isLoading } = useSelector((state) => state.onboardingBackend)



  const [dateEpfSt, setDateEpfSt] = useState(null);
  const [focusEsiSt, setFocusEsiSt] = useState(false);

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
  // const jobOptions = dropdownData?.joblistComData?.data?.result
  const mediumOptions = dropdownData?.mediumComData?.data?.result



  const selectCompanyRef = useRef()
  const selectLocationRef = useRef()
  const selectFunctionRef = useRef()
  const selectJobRef = useRef()

  const onCompanyClear = () => {

    selectCompanyRef?.current?.select.clearValue()
    setCompanyOptions(convertValueLabel([]))
    setSelectCompany('')

  }


  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
    setSelectLocation('')
  }

  const onFunctionClear = () => {
    selectFunctionRef?.current?.select.clearValue()
    setSelectFunction('')
  }

  const onJobClear = () => {
    selectJobRef?.current?.select.clearValue()
    setSelectJobname('')
  }

  // useEffect(() => {
  //   if(dropdownData?.companyCommonData?.data?.result && groupChanged == 1){
  //     setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
  //   } else if(candidateEditDetails?.data?.company_id_list){
  //     setCompanyOptions(candidateEditDetails?.data?.company_id_list)
  //   }
  // }, [dropdownData?.companyCommonData?.data?.result, groupChanged, candidateEditDetails?.data?.company_id_list])

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
      // setLocationChanged(convertValueLabel([]));
      setLocationOptions(convertValueLabel([]))
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
      setLocationOptions(dropdownData?.locationCommonData?.data?.result);
      // setLocationOptions(convertValueLabel([]));
    }
  }, [dropdownData?.locationCommonData?.data?.result, companyChanged])


  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.functionCommonData?.data?.result && locationChanged === 1) {
      setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
      // setLocationOptions(convertValueLabel([]));
    }
  }, [dropdownData?.functionCommonData?.data?.result, locationChanged])



  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.joblistComData?.data?.result && functionChanged === 1) {
      setJobOptions(dropdownData?.joblistComData?.data?.result);
      // setFunctionOptions(convertValueLabel([]));
    }
  }, [dropdownData?.joblistComData?.data?.result, functionChanged])


  //when onchange

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
      CandidateEditFormik.setFieldValue('group_id', e.value)
      onCompanyClear();
      onLocationClear();
      onFunctionClear();
      onJobClear();
      setGroupChanged(1);
      setLocationOptions(convertValueLabel([]));
      setFunctionOptions(convertValueLabel([]));
      //  setSubfunctionOptions(convertValueLabel([]));
      setSelectGroupName(convertValueLabel(e?.value, e?.label));

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
      CandidateEditFormik.setFieldValue('company_id', e.value)
      onLocationClear()
      onFunctionClear()
      onJobClear()
      setFunctionOptions(convertValueLabel([]));
      setJobOptions(convertValueLabel([]));
      setCompanyChanged(1);
      setSelectCompany(convertValueLabel(e?.value, e?.label))

    }
  }


  const handleLocationChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          //  filter : '[("location_id", "=", '+e.value+')]'
          filter: '[["location_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
        },
      }
      // onFunctionClear()
      dispatch(FunctionDropDownList(sendGpparams))
      CandidateEditFormik.setFieldValue('location_id', e?.value)
      onFunctionClear()
      onJobClear()
      setJobOptions(convertValueLabel([]));
      setLocationChanged(1)
      setSelectLocation(convertValueLabel(e?.value, e?.label))
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
      CandidateEditFormik.setFieldValue('department_id', e?.value)
      setFunctionChanged(1);
      setSelectFunction(convertValueLabel(e?.value, e?.label))

    }
  }

  const handleJobChange = (e) => {
    CandidateEditFormik.setFieldValue('job_id', e?.value)
    setSelectJobname(convertValueLabel(e?.value, e?.label))
  }

  const handleMediumChange = (e) => {
    CandidateEditFormik.setFieldValue('medium_id', e?.value)
    setSelectMedium(convertValueLabel(e?.value, e?.label))
  }



  const handleEsiDate = (date) => {
    if (date) {
      setDateEpfSt(date)
      CandidateEditFormik.setFieldValue('applied_on', indianDateFormat(date._d));
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

  // console.log("candidateEditDetails",candidateEditDetails);


  // data.applied_on
  useEffect(() => {
    if (candidateEditDetails?.data !== null) {
      CandidateEditFormik.setValues({
        partner_name: candidateEditDetails?.data?.partner_name,
        name: candidateEditDetails?.data?.name,
        reference: candidateEditDetails?.data?.reference,
        email_from: candidateEditDetails?.data?.email_from,
        partner_mobile: candidateEditDetails?.data?.partner_mobile,
        description: candidateEditDetails?.data?.description,
        group_id: candidateEditDetails?.data?.group_id,
        company_id: candidateEditDetails?.data?.company_id,
        location_id: candidateEditDetails?.data?.location_id,
        department_id: candidateEditDetails?.data?.department_id,
        job_id: candidateEditDetails?.data?.job_id,
        applied_on: candidateEditDetails?.data?.applied_on,
        medium_id: candidateEditDetails?.data?.medium_id,


      })
    }


    // to set the on loading data value
    if (isLoading === false && candidateEditDetails?.data !== undefined && candidateEditDetails?.data !== null) {
      setDateEpfSt(moment(new Date(convertDateToMDY(candidateEditDetails?.data?.applied_on))));
      setSelectGroupName(convertValueLabel(candidateEditDetails?.data?.group_id, candidateEditDetails?.data.group_id_name))
      setSelectCompany(convertValueLabel(candidateEditDetails?.data?.company_id, candidateEditDetails?.data.company_id_name))
      setSelectLocation(convertValueLabel(candidateEditDetails?.data?.location_id, candidateEditDetails?.data.location_id_name))
      setSelectFunction(convertValueLabel(candidateEditDetails?.data?.department_id, candidateEditDetails?.data.department_id_name))
      setSelectJobname(convertValueLabel(candidateEditDetails?.data?.job_id, candidateEditDetails?.data.job_id_name))
      setSelectMedium(convertValueLabel(candidateEditDetails?.data?.medium_id, candidateEditDetails?.data.medium_id_name))



    }


  }, [isLoading, candidateEditDetails?.data])





  // const roleOptions = dropdownData?.roleCommonData

  // console.log("roleOptions",dropdownData?.roleCommonData);
  //Designation Add Form Initilization
  const CandidateEditFormik = useFormik({
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
      medium_id: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      partner_name: Yup.string().required('This field is required'),
      // reference: Yup.string().required('This field is required'),
      email_from: Yup.string().required('This field is required'),
      partner_mobile: Yup.string().required('This field is required'),
      description: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
      // department_id: Yup.string().required('This field is required'),
      job_id: Yup.string().required('This field is required'),
      applied_on: Yup.date().required('This field is required'),
      // medium_id: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(CandidateUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)));
      // console.log("formData",formData);
    },
  })



  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Edit Candidate </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={CandidateEditFormik.handleSubmit} className="form-horizontal">
                <div>

                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Group<span className="error">*</span>
                      </label>
                      <Select

                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        name="group_id"
                        value={selectGroupName}
                        options={groupOptions}
                        onBlur={CandidateEditFormik.handleBlur}
                        onChange={(e) => handleGroupChange(e)}
                      // onChange={({ value }) => CandidateEditFormik.setFieldValue('group_id', value)}
                      />
                      {CandidateEditFormik.touched.group_id &&
                        CandidateEditFormik.errors.group_id ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.group_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company <span className="error">*</span>
                      </label>
                      <Select
                        //  isMulti={true}
                        ref={selectCompanyRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a  Company '}
                        name="company_id"
                        options={companyOptions}
                        value={selectCompany}
                        onBlur={CandidateEditFormik.handleBlur}
                        onChange={(e) => handleCompanyChange(e)}

                      // onChange={({ value }) => CandidateEditFormik.setFieldValue('company_id', value)}
                      />
                      {CandidateEditFormik.touched.company_id &&
                        CandidateEditFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Location <span className="error">*</span>
                      </label>
                      <Select

                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a location'}
                        name="location_id"
                        value={selectlocation}
                        options={locationOptions}
                        onBlur={CandidateEditFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      //  onChange={({ value }) => CandidateEditFormik.setFieldValue('location_id', value)}
                      />
                      {CandidateEditFormik.touched.location_id && CandidateEditFormik.errors.location_id ? (<div className="help-block text-danger">{CandidateEditFormik.errors.location_id}
                      </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Function<span className="error">*</span>
                      </label>
                      <Select

                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a function'}
                        name="department_id"
                        value={selectfunction}
                        options={functionOptions}
                        onBlur={CandidateEditFormik.handleBlur}
                        onChange={(e) => handleFunctionChange(e)}
                      // onChange={({ value }) => CandidateEditFormik.setFieldValue('department_id', value)}
                      />
                      {CandidateEditFormik.touched.department_id &&
                        CandidateEditFormik.errors.department_id ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.department_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Applied Job <span className="error">*</span>
                      </label>
                      <Select
                        //  isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Job '}
                        name="job_id"
                        options={jobOptions}
                        value={selectjobname}
                        onBlur={CandidateEditFormik.handleBlur}
                        onChange={(e) => handleJobChange(e)}
                      // onChange={(e) => handleCompanyIDSChange(e)}
                      // onChange={({ value }) => CandidateEditFormik.setFieldValue('job_id', value)}
                      />
                      {CandidateEditFormik.touched.job_id &&
                        CandidateEditFormik.errors.job_id ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.job_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Medium {/*<span className="error">*</span>*/}
                      </label>
                      <Select

                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a medium'}
                        name="medium_id"
                        value={selectMedium}
                        options={mediumOptions}
                        onBlur={CandidateEditFormik.handleBlur}
                        onChange={(e) => handleMediumChange(e)}
                      //  onChange={({ value }) => CandidateEditFormik.setFieldValue('medium_id', value)}
                      />
                      {CandidateEditFormik.touched.medium_id && CandidateEditFormik.errors.medium_id ? (<div className="help-block text-danger">{CandidateEditFormik.errors.medium_id}
                      </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row form-group">

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Candidate's Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="partner_name"
                        value={CandidateEditFormik.values.partner_name}
                        className="form-control"
                        placeholder="Enter Candidate's Name"
                        maxLength={25}
                        onChange={CandidateEditFormik.handleChange}
                        onBlur={CandidateEditFormik.handleBlur}
                      />
                      {CandidateEditFormik.touched.partner_name && CandidateEditFormik.errors.partner_name ? (<div className="help-block text-danger">{CandidateEditFormik.errors.partner_name}
                      </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Subject <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={CandidateEditFormik.values.name}
                        className="form-control"
                        placeholder="Enter a Subject"
                        maxLength={25}
                        onChange={CandidateEditFormik.handleChange}
                        onBlur={CandidateEditFormik.handleBlur}
                      />
                      {CandidateEditFormik.touched.name &&
                        CandidateEditFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Applied on<span className="error">*</span>
                      </label>
                      <SingleDatePicker
                        id={'applied_on'}
                        date={dateEpfSt} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleEsiDate(date)} // PropTypes.func.isRequired
                        focused={focusEsiSt} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusEsiSt(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        //   name='applied_on'
                        isOutsideRange={() => false}
                        placeholder='Applied date'
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
                      {CandidateEditFormik.touched.applied_on &&
                        CandidateEditFormik.errors.applied_on ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.applied_on}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-4">
                      <label hidden htmlFor="hf-email">
                        Temporary Reference <span className="error">*</span>
                      </label>
                      <input
                        type="hidden"
                        name="reference"
                        value={CandidateEditFormik.values.reference}
                        className="form-control"
                        placeholder="Enter a reference"
                        maxLength={10}
                        onChange={CandidateEditFormik.handleChange}
                        onBlur={CandidateEditFormik.handleBlur}
                      />
                      {/* {CandidateEditFormik.touched.reference &&
                      CandidateEditFormik.errors.reference ? (
                        <div className="help-block text-danger">
                          {CandidateEditFormik.errors.reference}
                        </div>
                      ) : null} */}
                    </div>

                  </div>
                  <div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Email <span className="error">*</span>
                        </label>
                        <input
                          type="email"
                          name="email_from"
                          value={CandidateEditFormik.values.email_from}
                          className="form-control"
                          placeholder="Enter a email"
                          maxLength={25}
                          onChange={CandidateEditFormik.handleChange}
                          onBlur={CandidateEditFormik.handleBlur}
                        />
                        {CandidateEditFormik.touched.email_from &&
                          CandidateEditFormik.errors.email_from ? (
                          <div className="help-block text-danger">
                            {CandidateEditFormik.errors.email_from}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Mobile<span className="error">*</span>
                        </label>
                        <input
                          type="tel"
                          name="partner_mobile"
                          value={CandidateEditFormik.values.partner_mobile}
                          className="form-control"
                          placeholder="Enter a mobile"
                          maxLength={10}
                          onChange={CandidateEditFormik.handleChange}
                          onBlur={CandidateEditFormik.handleBlur}
                        />
                        {CandidateEditFormik.touched.partner_mobile &&
                          CandidateEditFormik.errors.partner_mobile ? (
                          <div className="help-block text-danger">
                            {CandidateEditFormik.errors.partner_mobile}
                          </div>
                        ) : null}
                      </div>


                    </div>

                    <div className="row form-group">


                      <div className="col-md-8">
                        <label htmlFor="hf-email">
                          Application Summary <span className="error">*</span>
                        </label>

                        <textarea
                          type="range"
                          name="description"
                          value={CandidateEditFormik.values.description}
                          className="form-control"
                          placeholder="Enter Application Summary"
                          maxLength={25}
                          onChange={CandidateEditFormik.handleChange}
                          onBlur={CandidateEditFormik.handleBlur}
                        />

                        {CandidateEditFormik.touched.description && CandidateEditFormik.errors.description ? (<div className="help-block text-danger">{CandidateEditFormik.errors.description}
                        </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Update
                      </CButton>
                      <Link className="ml-3 btn btn-danger" to={'/onboarding/candidates'}>
                        <CIcon name="cil-ban" /> Cancel
                      </Link>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CContainer>
      </CFade>
    </main>
  )
}

export default EditCandidate
