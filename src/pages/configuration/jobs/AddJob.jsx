import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList, CommonLocationIdBasedFunctionData} from './../../../actions/commonAction'
import { JobAdd } from '../../../actions/configuration'
import { useFormik } from 'formik'
import { convertValueLabel} from '../../../utils/helper'
import CLoader from '../../loader/CLoader';
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

const AddJob = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)
  const {isLoading} = useSelector((state) => state.configurationBackend)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
  }, [])
  const [companyOptions, setCompanyOptions] = useState([]);
  const [funcOptions, setFuncOptions] = useState([]);
  const [recruOptions, setRecruOptions] = useState([]);
  const groupOptions = dropdownData?.groupComData?.data?.result;
  const [cpyLocation, setCpyLocation] = useState([])
  const [groupName,setGroupName]=useState([])
  const [recruiterName,setRecruiterName]=useState([])
  const [groupChanged,setGroupChanged]=useState(false)

  //Job Add Form Initilization
  const jobAddFormik = useFormik({
    initialValues: {
      name: '',
      description: '',
      group_id:'',
      company_id: '',
      location_id:'',
      department_id:'',
      user_id:'',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      description: Yup.string().required('This field is required'),
      group_id:Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
      department_id: Yup.string().required('This field is required'),
      user_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(JobAdd(formData, history))
    },
  })

  const selectCompanyRef  = useRef()
  const selectFuncRef     = useRef()
  const selectLocationRef = useRef()
  const selectRecruRef    = useRef()
  const onCompanyClear = () => {
    selectCompanyRef.current.select.clearValue()
  }
  const onFunClear = () => {
    selectFuncRef.current.select.clearValue()
  }
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
  }
  const onRecruiterClear = () => {
    selectRecruRef?.current?.select.clearValue()
    setRecruiterName([]);
  }

  const handleGroupChange = (e) => {
    if (e?.value) {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter : '[("group_id", "=", '+e.value+')]'
        },
      }
      dispatch(CompanyDropDownList(sendGpparams))
      setGroupName(convertValueLabel(e?.value,e?.label))
      jobAddFormik.setFieldValue('group_id', e.value)
      onCompanyClear();
      onLocationClear();
      onFunClear();
      onRecruiterClear();
      setGroupChanged(1);
    }
  }
 
  const handleCompanyChanges = (e) => {
    if (e?.value) {
      jobAddFormik.setFieldValue('company_id', e?.value)
      const compCusData = JSON.stringify({
        params: {
          models: {
            'company.location': "[['company_id', '=', " + e?.value + ']]',
            'res.users': "[['company_id', '=', " + e?.value + ']]',
          },
        },
      })
      onLocationClear()
      onFunClear()
      onRecruiterClear()
      dispatch(CommonCompanyIdBasedData(compCusData)) //To get data based on company id
    }
  }

  //To load dropdown data based on company id and its change
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData) {
      setCpyLocation(dropdownData?.companyCommonCustomData?.company_location_list)
    }
    if(dropdownData?.companyCommonCustomData?.res_users_list){
      setRecruOptions(dropdownData?.companyCommonCustomData?.res_users_list)
    }
  }, [dropdownData?.companyCommonCustomData])

  useEffect(() => {
    if(dropdownData?.companyCommonData?.data?.result && groupChanged == 1){
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])
  
  useEffect(() => {
    if(dropdownData?.funcLocComData?.data?.result){
        setFuncOptions(dropdownData?.funcLocComData?.data?.result);
    }
  }, [dropdownData?.funcLocComData?.data?.result])

  const handleLocationChange = (e) => {
    jobAddFormik.setFieldValue('location_id', e?.value)
    if(e?.value){
      const Jobparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["location_id", "in", ['+e?.value+']],["parent_id", "=", False]]',
        },
      }
      dispatch(CommonLocationIdBasedFunctionData(Jobparams))
    }
  }

  const handleFunctionChange = (e) => {
    jobAddFormik.setFieldValue('department_id', e?.value);
  }

  const handleRecruiterChange = (e) => {
    if(e?.value){
      jobAddFormik.setFieldValue('user_id', e?.value);
      setRecruiterName(convertValueLabel(e?.value,e?.label))
    }
  }

  return (
    <main className="c-main">
      {
      (isLoading === true) ? <CLoader />: 
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Add Job </strong>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={jobAddFormik.handleSubmit} className="form-horizontal">
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
                          onBlur={jobAddFormik.handleBlur}
                        />
                        {jobAddFormik.errors.group_id ? <div className="help-block text-danger">{jobAddFormik.errors.group_id}</div> : null}
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
                          onBlur={jobAddFormik.handleBlur}
                        />
                        {jobAddFormik.touched.company_id && jobAddFormik.errors.company_id ? ( <div className="help-block text-danger">{jobAddFormik.errors.company_id}</div>) : null}
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
                          onBlur={jobAddFormik.handleBlur}
                          onChange={(e) => handleLocationChange(e)}
                        />
                        {jobAddFormik.touched.location_id &&
                        jobAddFormik.errors.location_id ? (
                          <div className="help-block text-danger">
                            {jobAddFormik.errors.location_id}
                          </div>
                        ) : null}
                      </div>
                      </div>
                      <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Function Name <span className="error">*</span>
                        </label>
                        <Select
                          ref={selectFuncRef}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose Function'}
                          name="department_id"
                          options={funcOptions}
                          onBlur={jobAddFormik.handleBlur}
                          onChange={(e) => handleFunctionChange(e)}
                        />
                        {jobAddFormik.touched.department_id &&
                        jobAddFormik.errors.department_id ? (
                          <div className="help-block text-danger">
                            {jobAddFormik.errors.department_id}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Recruiter <span className='error'>*</span></label>
                        <Select
                          ref={selectRecruRef}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Recruiter'}
                          value={recruiterName}
                          id="user_id"
                          name="user_id"
                          options={recruOptions}
                          onChange={(e) => handleRecruiterChange(e)}
                          onBlur={jobAddFormik.handleBlur}
                        />
                        {jobAddFormik.errors.user_id ? <div className="help-block text-danger">{jobAddFormik.errors.user_id}</div> : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Job Title <span className="error">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={jobAddFormik.values.name}
                          className="form-control"
                          placeholder="Job Title"
                          maxLength={25}
                          onChange={jobAddFormik.handleChange}
                          onBlur={jobAddFormik.handleBlur}
                        />
                        {jobAddFormik.touched.name &&
                        jobAddFormik.errors.name ? (
                          <div className="help-block text-danger">
                            {jobAddFormik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-8">
                        <label htmlFor="hf-email">Job Description <span className="error">*</span></label>
                          <textarea
                            name="description"
                            value={jobAddFormik.values.description}
                            className="form-control"
                            placeholder="Job Description"
                            maxLength={500}
                            onChange={jobAddFormik.handleChange}
                            onBlur={jobAddFormik.handleBlur}
                          />
                          {jobAddFormik.touched.description &&
                          jobAddFormik.errors.description ? (
                            <div className="help-block text-danger">
                              {jobAddFormik.errors.description}
                            </div>
                          ) : null}
                      </div>
                      </div>
                  </div>
                  <CCardFooter>
                    <CRow>
                      <CCol className="col-md-10" align="center">
                        <CButton type="submit" size="md" color="primary">
                          <CIcon name="cil-scrubber" /> Save
                        </CButton>
                        <Link className="ml-3 btn btn-danger" to={'/configuration/jobs'}>
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

export default AddJob
