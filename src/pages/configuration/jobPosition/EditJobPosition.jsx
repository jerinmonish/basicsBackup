import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList, CommonLocationIdBasedFunctionData, CommonSubfunctionList, LocationDropDownList } from './../../../actions/commonAction'
import { JobPostionEdit, JobPositionUpdate } from '../../../actions/configuration'
import { useFormik } from 'formik'
import { convertValueLabel, decryptSingleData } from '../../../utils/helper'
import Select from 'react-select'
import CLoader from '../../loader/CLoader';
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

const EditJobPosition = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)
  const { jobPositionDetails, isLoading } = useSelector((state) => state.configurationBackend)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(JobPostionEdit(decryptSingleData(props?.match?.params?.id)));
    dispatch(CommonGroupList())
  }, [])
  const groupOptions = dropdownData?.groupComData?.data?.result;

  const [companyOptions, setCompanyOptions] = useState([]);
  const [cpyLocation, setCpyLocation] = useState([])
  const [funcOptions, setFuncOptions] = useState([]);
  const [subFuncOptions, setSubFuncOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);

  const [groupChanged, setGroupChanged] = useState(false)
  const [companyChanged, setCompanyChanged] = useState(false)
  const [locationChanged, setLocationChanged] = useState(false)
  const [functionChanged, setFunctionChanged] = useState(false)
  const [subfunctionChanged, setSubFunctionChanged] = useState(false)

  const [groupName, setGroupName] = useState([])
  const [companyName, setCompanyName] = useState([])
  const [locationName, setLocationName] = useState([])
  const [functionName, setFunctionName] = useState([])
  const [subFuntionName, setSubFunctionName] = useState([])
  const [jobName, setJobName] = useState([])

  //Job Edit Form Initilization
  const jobPositionEditFormik = useFormik({
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
      dispatch(JobPositionUpdate(decryptSingleData(props?.match?.params?.id), formData, history))
    },
  })

  useEffect(() => {
    if (jobPositionDetails?.data !== null) {
      jobPositionEditFormik.setValues({
        "name": jobPositionDetails?.data?.name,
        "group_id": jobPositionDetails?.data?.group_id,
        "company_id": jobPositionDetails?.data?.company_id,
        "location_id": jobPositionDetails?.data?.location_id,
        "department_id": jobPositionDetails?.data?.department_id,
        "sub_function_id": jobPositionDetails?.data?.sub_function_id,
        "job_id": jobPositionDetails?.data?.job_id,
      });
    }
    if (isLoading === false && jobPositionDetails?.data !== undefined && jobPositionDetails?.data !== null) {
      //Update values to all the dropdowns
      setGroupName(convertValueLabel(jobPositionDetails?.data?.group_id, jobPositionDetails?.data?.group_id_name));
      setCompanyName(convertValueLabel(jobPositionDetails?.data?.company_id, jobPositionDetails?.data?.company_id_name));
      setLocationName(convertValueLabel(jobPositionDetails?.data?.location_id, jobPositionDetails?.data?.location_id_name));
      setFunctionName(convertValueLabel(jobPositionDetails?.data?.department_id, jobPositionDetails?.data?.department_id_name));
      setSubFunctionName(convertValueLabel(jobPositionDetails?.data?.sub_function_id, jobPositionDetails?.data?.sub_function_id_name));
      setJobName(convertValueLabel(jobPositionDetails?.data?.job_id, jobPositionDetails?.data?.job_id_name));
    }
  }, [isLoading, jobPositionDetails?.data])

  //To Load Company data based on Group Id
  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged == 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    } else {
      setCompanyOptions(jobPositionDetails?.data?.company_id_list);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged, jobPositionDetails?.data?.company_id_list])

  //To Load Location data based on Company Id
  useEffect(() => {
    if (dropdownData?.locationCommonData?.data?.result) {
      setCpyLocation(dropdownData?.locationCommonData?.data?.result);
    } else if (jobPositionDetails?.data?.location_id_list) {
      setCpyLocation(jobPositionDetails?.data?.location_id_list)
    }
  }, [dropdownData?.locationCommonData, jobPositionDetails?.data?.location_id_list])

  //To Load Function data based on Company Id
  useEffect(() => {
    if (dropdownData?.funcLocComData?.data?.result) {
      setFuncOptions(dropdownData?.funcLocComData?.data?.result);
    } else {
      setFuncOptions(jobPositionDetails?.data?.department_id_list);
    }
  }, [dropdownData?.funcLocComData?.data?.result, jobPositionDetails?.data?.department_id_list])

  //To Load Sub Function data based on Function Id
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData?.hr_department_list) {
      setSubFuncOptions(dropdownData?.companyCommonCustomData?.hr_department_list);
    } else {
      setSubFuncOptions(jobPositionDetails?.data?.sub_function_id_list);
    }
  }, [dropdownData?.companyCommonCustomData?.hr_department_list, jobPositionDetails?.data?.sub_function_id_list])

  //To Load Job data based on Function Id
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData?.hr_job_list) {
      setJobOptions(dropdownData?.companyCommonCustomData?.hr_job_list);
    } else {
      setJobOptions(jobPositionDetails?.data?.job_id_list);
    }
  }, [dropdownData?.companyCommonCustomData?.hr_job_list, jobPositionDetails?.data?.job_id_list])

  const selectCompanyRef = useRef();
  const selectLocationRef = useRef();
  const selectFuncRef = useRef();
  const selectSubFuncRef = useRef();
  const selectJobRef = useRef();

  const onCompanyClear = () => {
    selectCompanyRef.current.select.clearValue();
    setCompanyOptions(convertValueLabel([]));
    setCompanyName([]);
  }
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue();
    setCpyLocation(convertValueLabel([]));
    setLocationName([]);
  }
  const onFunClear = () => {
    selectFuncRef.current.select.clearValue();
    setFuncOptions(convertValueLabel([]));
    setFunctionName([]);
  }
  const onSubFunClear = () => {
    selectSubFuncRef.current.select.clearValue();
    setSubFuncOptions(convertValueLabel([]));
    setSubFunctionName([]);
  }
  const onJobClear = () => {
    selectJobRef.current.select.clearValue();
    setJobOptions(convertValueLabel([]));
    setJobName([]);
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
      jobPositionEditFormik.setFieldValue('group_id', e.value)
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
      // setCpyLocation(convertValueLabel([]));
    }
  }

  const handleCompanyChanges = (e) => {
    if (e?.value) {
      setCompanyName(convertValueLabel(e?.value, e?.label));
      jobPositionEditFormik.setFieldValue('company_id', e?.value)
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
    if (e?.value) {
      setLocationName(convertValueLabel(e?.value, e?.label));
      jobPositionEditFormik.setFieldValue('location_id', e?.value)
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
      setFunctionName(convertValueLabel(e?.value, e?.label));
      jobPositionEditFormik.setFieldValue('department_id', e?.value);
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
      setSubFunctionName(convertValueLabel(e?.value, e?.label));
      jobPositionEditFormik.setFieldValue('sub_function_id', e?.value);
      setSubFunctionChanged(1);
    }
  }

  const handleJobChange = (e) => {
    if (e?.value) {
      setJobName(convertValueLabel(e?.value, e?.label));
      jobPositionEditFormik.setFieldValue('job_id', e?.value);
    }
  }

  return (
    <main className="c-main">
      {
        (isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> Edit Job Position  </strong>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={jobPositionEditFormik.handleSubmit} className="form-horizontal">
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
                            onBlur={jobPositionEditFormik.handleBlur}
                          />
                          {jobPositionEditFormik.errors.group_id ? <div className="help-block text-danger">{jobPositionEditFormik.errors.group_id}</div> : null}
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
                            value={companyName}
                            name="company_id"
                            options={companyOptions}
                            onChange={(e) => handleCompanyChanges(e)}
                            onBlur={jobPositionEditFormik.handleBlur}
                          />
                          {jobPositionEditFormik.touched.company_id && jobPositionEditFormik.errors.company_id ? (<div className="help-block text-danger">{jobPositionEditFormik.errors.company_id}</div>) : null}
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
                            value={locationName}
                            name="location_id"
                            options={cpyLocation}
                            onBlur={jobPositionEditFormik.handleBlur}
                            onChange={(e) => handleLocationChange(e)}
                          />
                          {jobPositionEditFormik.touched.location_id && jobPositionEditFormik.errors.location_id ? (<div className="help-block text-danger">{jobPositionEditFormik.errors.location_id}</div>) : null}
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
                            value={functionName}
                            options={funcOptions}
                            onBlur={jobPositionEditFormik.handleBlur}
                            onChange={(e) => handleFunctionChange(e)}
                          />
                          {jobPositionEditFormik.touched.department_id && jobPositionEditFormik.errors.department_id ? (<div className="help-block text-danger">{jobPositionEditFormik.errors.department_id}</div>) : null}
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
                            value={subFuntionName}
                            options={subFuncOptions}
                            onBlur={jobPositionEditFormik.handleBlur}
                            onChange={(e) => handleSubFunctionChange(e)}
                          />
                          {jobPositionEditFormik.touched.sub_function_id && jobPositionEditFormik.errors.sub_function_id ? (<div className="help-block text-danger">{jobPositionEditFormik.errors.sub_function_id}</div>) : null}
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
                            value={jobName}
                            options={jobOptions}
                            onBlur={jobPositionEditFormik.handleBlur}
                            onChange={(e) => handleJobChange(e)}
                          />
                          {jobPositionEditFormik.touched.job_id && jobPositionEditFormik.errors.job_id ? (<div className="help-block text-danger">{jobPositionEditFormik.errors.job_id}</div>) : null}
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
                            value={jobPositionEditFormik.values.name}
                            className="form-control"
                            placeholder="Position Code"
                            maxLength={10}
                            onChange={jobPositionEditFormik.handleChange}
                            onBlur={jobPositionEditFormik.handleBlur}
                          />
                          {jobPositionEditFormik.touched.name && jobPositionEditFormik.errors.name ? (<div className="help-block text-danger">{jobPositionEditFormik.errors.name}</div>) : null}
                        </div>
                      </div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className="col-md-10" align="center">
                          <CButton type="submit" size="md" color="primary">
                            <CIcon name="cil-scrubber" /> Update
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
      }
    </main>
  )
}

export default EditJobPosition
