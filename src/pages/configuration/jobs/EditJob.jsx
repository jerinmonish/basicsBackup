import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList, CommonLocationIdBasedFunctionData} from './../../../actions/commonAction'
import { JobEdit, JobUpdate } from '../../../actions/configuration'
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

const EditJob = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  const {jobDetails, isLoading} = useSelector((state) => state.configurationBackend)
  //To load dropdown predefined data
  useEffect(()=>{
    dispatch(CommonGroupList());
    if(props?.match?.params?.id){
      dispatch(JobEdit(decryptSingleData(props?.match?.params?.id)));
    }
  },[]);
  
  const groupOptions = dropdownData?.groupComData?.data?.result;
  const [companyOptions, setCompanyOptions] = useState([]);
  const [funcOptions, setFuncOptions] = useState([]);
  const [cpyLocation, setCpyLocation] = useState([])
  const [recruOptions, setRecruOptions] = useState([]);
  const [recruiterName,setRecruiterName]=useState([])
  const [groupChanged,setGroupChanged]=useState(false);


  const [groupName,setGroupName]=useState([])
  const [companyName,setCompanyName]=useState([])
  const [locationName,setLocationName]=useState([])
  const [functionName,setFunctionName]=useState([])


  //Job Add Form Initilization
  const jobUpdateFormik = useFormik({
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
      dispatch(JobUpdate(decryptSingleData(props?.match?.params?.id), formData,history));
    },
  });


  useEffect(()=>{
    if(jobDetails?.data !== null){
      jobUpdateFormik.setValues({
        "name":jobDetails?.data?.name,
        "description": jobDetails?.data?.description,
        "group_id":jobDetails?.data?.group_id,
        "company_id": jobDetails?.data?.company_id,
        "location_id":jobDetails?.data?.location_id,
        "department_id":jobDetails?.data?.department_id,
        "user_id":jobDetails?.data?.user_id,
      });
    }
    if(isLoading === false && jobDetails?.data !== undefined && jobDetails?.data !== null){
      //Update values to all the dropdowns
      setGroupName(convertValueLabel(jobDetails?.data?.group_id,jobDetails?.data?.group_id_name));
      setCompanyName(convertValueLabel(jobDetails?.data?.company_id,jobDetails?.data?.company_id_name));
      setLocationName(convertValueLabel(jobDetails?.data?.location_id,jobDetails?.data?.location_id_name));
      setFunctionName(convertValueLabel(jobDetails?.data?.department_id,jobDetails?.data?.department_id_name));
      setRecruiterName(convertValueLabel(jobDetails?.data?.user_id,jobDetails?.data?.user_id_name));
    }
  },[isLoading, jobDetails?.data])

  const selectCompanyRef  = useRef()
  const selectFuncRef     = useRef()
  const selectLocationRef = useRef()
  const selectRecruRef    = useRef()
  const onCompanyClear = () => {
    selectCompanyRef.current.select.clearValue();
    setCompanyOptions(convertValueLabel([]));
    setCompanyName(convertValueLabel([]));
  }
  const onFunClear = () => {
    selectFuncRef.current.select.clearValue()
    setFuncOptions(convertValueLabel([]));
    setFunctionName(convertValueLabel([]));
  }
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
    setCpyLocation(convertValueLabel([]));
    setLocationName(convertValueLabel([]));
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
      jobUpdateFormik.setFieldValue('group_id', e.value)
      onCompanyClear();
      onLocationClear();
      onFunClear();
      setGroupChanged(1);
      onRecruiterClear();
    }
  }
 
  const handleCompanyChanges = (e) => {
    if (e?.value) {
      jobUpdateFormik.setFieldValue('company_id', e?.value)
      setCompanyName(convertValueLabel(e?.value,e?.label));
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

  useEffect(() => {
    if(dropdownData?.companyCommonData?.data?.result && groupChanged == 1){
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    } else if(jobDetails?.data?.company_id_list){
      setCompanyOptions(jobDetails?.data?.company_id_list)
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged, jobDetails?.data?.company_id_list])

  //To load dropdown data based on company id and its change
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData) {
      setCpyLocation(dropdownData?.companyCommonCustomData?.company_location_list)
    } else if(jobDetails?.data?.location_id_list){
      setCpyLocation(jobDetails?.data?.location_id_list)
    }

    if(dropdownData?.companyCommonCustomData?.res_users_list){
      setRecruOptions(dropdownData?.companyCommonCustomData?.res_users_list)
    } else if(jobDetails?.data?.user_id_list){
      setRecruOptions(jobDetails?.data?.user_id_list)
    }
  }, [dropdownData?.companyCommonCustomData, jobDetails?.data?.location_id_list, jobDetails?.data?.user_id_list])
  
  useEffect(() => {
    if(dropdownData?.funcLocComData?.data?.result){
      setFuncOptions(dropdownData?.funcLocComData?.data?.result);
    } else if(jobDetails?.data?.department_id_list){
      setFuncOptions(jobDetails?.data?.department_id_list)
    }
  }, [dropdownData?.funcLocComData?.data?.result, jobDetails?.data?.department_id_list])

  const handleLocationChange = (e) => {
    if(e?.value){
      jobUpdateFormik.setFieldValue('location_id', e?.value)
      setLocationName(convertValueLabel(e?.value,e?.label));
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
    if(e?.value){
      jobUpdateFormik.setFieldValue('department_id', e?.value);
      setFunctionName(convertValueLabel(e?.value,e?.label));
    }
  }

  const handleRecruiterChange = (e) => {
    if(e?.value){
      jobUpdateFormik.setFieldValue('user_id', e?.value);
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
                  <strong> Edit Job </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={jobUpdateFormik.handleSubmit} className="form-horizontal">
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
                        onBlur={jobUpdateFormik.handleBlur}
                      />
                      {jobUpdateFormik.errors.group_id ? <div className="help-block text-danger">{jobUpdateFormik.errors.group_id}</div> : null}
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
                        onBlur={jobUpdateFormik.handleBlur}
                      />
                      {jobUpdateFormik.touched.company_id && jobUpdateFormik.errors.company_id ? ( <div className="help-block text-danger">{jobUpdateFormik.errors.company_id}</div>) : null}
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
                        onBlur={jobUpdateFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      />
                      {jobUpdateFormik.touched.location_id &&
                      jobUpdateFormik.errors.location_id ? (
                        <div className="help-block text-danger">
                          {jobUpdateFormik.errors.location_id}
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
                        value={functionName}
                        name="department_id"
                        options={funcOptions}
                        onBlur={jobUpdateFormik.handleBlur}
                        onChange={(e) => handleFunctionChange(e)}
                      />
                      {jobUpdateFormik.touched.department_id &&
                      jobUpdateFormik.errors.department_id ? (
                        <div className="help-block text-danger">
                          {jobUpdateFormik.errors.department_id}
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
                          onBlur={jobUpdateFormik.handleBlur}
                        />
                        {jobUpdateFormik.errors.user_id ? <div className="help-block text-danger">{jobUpdateFormik.errors.user_id}</div> : null}
                      </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Job Title <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={jobUpdateFormik.values.name}
                        className="form-control"
                        placeholder="Job Title"
                        maxLength={25}
                        onChange={jobUpdateFormik.handleChange}
                        onBlur={jobUpdateFormik.handleBlur}
                      />
                      {jobUpdateFormik.touched.name &&
                      jobUpdateFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {jobUpdateFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-8">
                      <label htmlFor="hf-email">Job Description <span className="error">*</span></label>
                        <textarea
                          name="description"
                          value={jobUpdateFormik.values.description}
                          className="form-control"
                          placeholder="Job Description"
                          maxLength={500}
                          onChange={jobUpdateFormik.handleChange}
                          onBlur={jobUpdateFormik.handleBlur}
                        />
                        {jobUpdateFormik.touched.description &&
                        jobUpdateFormik.errors.description ? (
                          <div className="help-block text-danger">
                            {jobUpdateFormik.errors.description}
                          </div>
                        ) : null}
                    </div>
                    </div>
                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Update
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

export default EditJob
