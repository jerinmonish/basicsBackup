import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList, CommonLocationIdBasedFunctionData, CommonSubfunctionList, LocationDropDownList } from './../../../actions/commonAction'
import { JobPostionAdd } from '../../../actions/configuration'
import { useFormik } from 'formik'
import { convertValueLabel } from '../../../utils/helper'
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const AddJobPosition = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
  }, [])
  const groupOptions = dropdownData?.groupComData?.data?.result;
  const [companyOptions, setCompanyOptions] = useState([]);
  const [cpyLocation, setCpyLocation] = useState([])
  const [funcOptions, setFuncOptions] = useState([]);
  const [subFuncOptions, setSubFuncOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);

  const [groupName, setGroupName] = useState([])

  const [groupChanged, setGroupChanged] = useState(false)
  const [companyChanged, setCompanyChanged] = useState(false)
  const [locationChanged, setLocationChanged] = useState(false)
  const [functionChanged, setFunctionChanged] = useState(false)
  const [subfunctionChanged, setSubFunctionChanged] = useState(false)

  //Job Add Form Initilization
  const jobPositionAddFormik = useFormik({
    initialValues: {
      name: '',
      group_id: '',
      company_id: '',
      location_id: '',
      department_id: '',
      sub_function_id: '',
      job_id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
      department_id: Yup.string().required('This field is required'),
      sub_function_id: Yup.string().required('This field is required'),
      job_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(JobPostionAdd(formData, history))
    },
  })

  const selectCompanyRef = useRef();
  const selectLocationRef = useRef();
  const selectFuncRef = useRef();
  const selectSubFuncRef = useRef();
  const selectJobRef = useRef();

  const onCompanyClear = () => {
    selectCompanyRef.current.select.clearValue();
    setCompanyOptions(convertValueLabel([]));
  }
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue();
    setCpyLocation(convertValueLabel([]));
  }
  const onFunClear = () => {
    selectFuncRef.current.select.clearValue();
    setFuncOptions(convertValueLabel([]));
  }
  const onSubFunClear = () => {
    selectSubFuncRef.current.select.clearValue();
    setSubFuncOptions(convertValueLabel([]));
  }
  const onJobClear = () => {
    selectJobRef.current.select.clearValue();
    setJobOptions(convertValueLabel([]));
  }

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
      setGroupName(convertValueLabel(e?.value, e?.label))
      jobPositionAddFormik.setFieldValue('group_id', e.value)
      onCompanyClear();
      onLocationClear();
      onFunClear();
      onSubFunClear();
      onJobClear();
      setGroupChanged(1);
      setCompanyChanged(0);
      setLocationChanged(0);
      setFunctionChanged(0);
      setSubFunctionChanged(0);
    }
  }

  const handleCompanyChanges = (e) => {
    if (e?.value) {
      jobPositionAddFormik.setFieldValue('company_id', e?.value)
      const compCusData = JSON.stringify({
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["company_id", "=", ' + e?.value + ']]',
        },
      })
      onLocationClear()
      onFunClear()
      onSubFunClear();
      onJobClear();
      dispatch(LocationDropDownList(compCusData)) //To get data based on company id
      setCompanyChanged(1);
      setLocationChanged(0);
      setFunctionChanged(0);
      setSubFunctionChanged(0);
    }
  }

  const handleLocationChange = (e) => {
    jobPositionAddFormik.setFieldValue('location_id', e?.value)
    if (e?.value) {
      const JobPosparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["location_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
        },
      }
      dispatch(CommonLocationIdBasedFunctionData(JobPosparams))
      onFunClear()
      onSubFunClear();
      onJobClear();
      setLocationChanged(1);
      setFunctionChanged(0);
      setSubFunctionChanged(0);
    }
  }

  const handleFunctionChange = (e) => {
    if (e?.value) {
      jobPositionAddFormik.setFieldValue('department_id', e?.value);
      setFunctionChanged(1);
      const sendGpparams = {
        params: {
          models: {
            'hr.department': "[['parent_id', '=', " + e?.value + ']]',
            'hr.job': "[['department_id', '=', " + e?.value + ']]',
          },
        },
      }
      dispatch(CommonCompanyIdBasedData(sendGpparams));
      onSubFunClear();
      onJobClear();
      setSubFunctionChanged(0);
    }
  }

  const handleSubFunctionChange = (e) => {
    if (e?.value) {
      jobPositionAddFormik.setFieldValue('sub_function_id', e?.value);
      setSubFunctionChanged(1);
    }
  }

  const handleJobChange = (e) => {
    if (e?.value) {
      jobPositionAddFormik.setFieldValue('job_id', e?.value);
    }
  }

  //To Load Company data based on Group Id
  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged == 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

  //To Load Location data based on Company Id
  useEffect(() => {
    if (dropdownData?.locationCommonData?.data?.result && companyChanged == 1) {
      setCpyLocation(dropdownData?.locationCommonData?.data?.result)
    }
  }, [dropdownData?.locationCommonData, companyChanged])

  //To Load Function data based on Company Id
  useEffect(() => {
    if (dropdownData?.funcLocComData?.data?.result && locationChanged == 1) {
      setFuncOptions(dropdownData?.funcLocComData?.data?.result);
    }
  }, [dropdownData?.funcLocComData?.data?.result, locationChanged])

  //To Load Sub Function data based on Function Id
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData?.hr_department_list && functionChanged == 1) {
      setSubFuncOptions(dropdownData?.companyCommonCustomData?.hr_department_list);
    }
  }, [dropdownData?.companyCommonCustomData?.hr_department_list, functionChanged])

  //To Load Job data based on Function Id
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData?.hr_job_list && functionChanged == 1) {
      setJobOptions(dropdownData?.companyCommonCustomData?.hr_job_list);
    }
  }, [dropdownData?.companyCommonCustomData?.hr_job_list, functionChanged])

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add Job Position  </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={jobPositionAddFormik.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        value={groupName}
                        id="group_id"
                        name="group_id"
                        options={groupOptions}
                        onChange={(e) => handleGroupChange(e)}
                        onBlur={jobPositionAddFormik.handleBlur}
                      />
                      {jobPositionAddFormik.errors.group_id ? <div className="help-block text-danger">{jobPositionAddFormik.errors.group_id}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectCompanyRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company'}
                        defaultValue={''}
                        name="company_id"
                        options={companyOptions}
                        onChange={(e) => handleCompanyChanges(e)}
                        onBlur={jobPositionAddFormik.handleBlur}
                      />
                      {jobPositionAddFormik.touched.company_id && jobPositionAddFormik.errors.company_id ? (<div className="help-block text-danger">{jobPositionAddFormik.errors.company_id}</div>) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Location <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectLocationRef}
                        // isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose Location'}
                        defaultValue={''}
                        name="location_id"
                        options={cpyLocation}
                        onBlur={jobPositionAddFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      />
                      {jobPositionAddFormik.touched.location_id && jobPositionAddFormik.errors.location_id ? (<div className="help-block text-danger">{jobPositionAddFormik.errors.location_id}</div>) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Function <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectFuncRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose Function'}
                        name="department_id"
                        options={funcOptions}
                        onBlur={jobPositionAddFormik.handleBlur}
                        onChange={(e) => handleFunctionChange(e)}
                      />
                      {jobPositionAddFormik.touched.department_id && jobPositionAddFormik.errors.department_id ? (<div className="help-block text-danger">{jobPositionAddFormik.errors.department_id}</div>) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Sub Function <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectSubFuncRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose Sub Function'}
                        name="sub_function_id"
                        options={subFuncOptions}
                        onBlur={jobPositionAddFormik.handleBlur}
                        onChange={(e) => handleSubFunctionChange(e)}
                      />
                      {jobPositionAddFormik.touched.sub_function_id && jobPositionAddFormik.errors.sub_function_id ? (<div className="help-block text-danger">{jobPositionAddFormik.errors.sub_function_id}</div>) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Job <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectJobRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose Job'}
                        name="job_id"
                        options={jobOptions}
                        onBlur={jobPositionAddFormik.handleBlur}
                        onChange={(e) => handleJobChange(e)}
                      />
                      {jobPositionAddFormik.touched.job_id && jobPositionAddFormik.errors.job_id ? (<div className="help-block text-danger">{jobPositionAddFormik.errors.job_id}</div>) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Position Code <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={jobPositionAddFormik.values.name}
                        className="form-control"
                        placeholder="Position Code"
                        maxLength={10}
                        onChange={jobPositionAddFormik.handleChange}
                        onBlur={jobPositionAddFormik.handleBlur}
                      />
                      {jobPositionAddFormik.touched.name && jobPositionAddFormik.errors.name ? (<div className="help-block text-danger">{jobPositionAddFormik.errors.name}</div>) : null}
                    </div>
                  </div>
                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Save
                      </CButton>
                      <Link className="ml-3 btn btn-danger" to={'/configuration/job-position'}>
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

export default AddJobPosition
