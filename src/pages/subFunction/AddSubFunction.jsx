import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CompanyDropDownList,
  CommonCompanyIdBasedData,
  ParentFuncationDropDownList,
  CommonGroupList,
} from './../../actions/commonAction'
import { SubFunctionAddAPI } from '../../actions/master'
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { convertValueLabel } from '../../utils/helper'

const AddSubFunction = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)
  // console.log("dropdownData",dropdownData);
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(ParentFuncationDropDownList())
    // dispatch(CompanyDropDownList())
    dispatch(CommonGroupList())
  },[])

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
    // eslint-disable-next-line no-use-before-define
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])


  // const companyOptions = dropdownData?.companyCommonData?.data?.result
  const groupOptions = dropdownData?.groupComData?.data?.result;
  const [parentOptions, setParentOptions] = useState([])
  const [companyOptions, setCompanyOptions] = useState([]);
  const [cpyManager, setCpyManager] = useState([])
  const [cpyLocation, setCpyLocation] = useState([])
  const [cpyCostCenter, setCpyCostCenter] = useState([])
  const [groupName, setGroupName] = useState([])
  const [groupChanged, setGroupChanged] = useState(0);

  //subfunction Add Form Initilization
  const subFunctionAddFormik = useFormik({
    initialValues: {
      name: '',
      code: '',
      group_id: '',
      company_id: '',
      // cost_center_id: '',
      manager_id: '',
      location_id: '',
      parent_id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      code: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      // cost_center_id: Yup.string().required('This field is required'),
      // manager_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
      parent_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(SubFunctionAddAPI(formData, history))
    },
  })



  const handleGroupChange = (e) => {
    //  console.log("handleGroupChange",e);
    if (e?.value) {
      // onCompanyClear();
      // onCCClear();
      // functionAddFormik.setFieldValue('group_id', e.value)
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("group_id", "=", ' + e.value + ')]'
        },
      }
      dispatch(CompanyDropDownList(sendGpparams))
      setGroupName(convertValueLabel(e?.value, e?.label))
      subFunctionAddFormik.setFieldValue('group_id', e.value)
      setGroupChanged(1)
    }
  }

  const handleCompanyChanges = (e) => {
    if (e?.value) {
      subFunctionAddFormik.setFieldValue('company_id', e?.value)
      const compCusData = JSON.stringify({
        params: {
          models: {
            'hr.employee': "[['company_id', '=', " + e?.value + ']]',
            'company.location': "[['company_id', '=', " + e?.value + ']]',
            'cost.center': "[['company_id', '=', " + e?.value + ']]',
            'hr.department': "[['company_id', '=', " + e?.value + ']]',

          },
        },
      })
      onManagerClear()
      onLocationClear()
      onCostCenterClear()
      dispatch(CommonCompanyIdBasedData(compCusData)) //To get data based on company id
    }
  }

  //To load dropdown data based on company id and its change
  useEffect(() => {
    if (dropdownData?.companyCommonCustomData) {
      setCpyManager(dropdownData?.companyCommonCustomData?.hr_employee_list)
      setCpyLocation(dropdownData?.companyCommonCustomData?.company_location_list)
      setCpyCostCenter(dropdownData?.companyCommonCustomData?.cost_center_list)
      setParentOptions(dropdownData?.companyCommonCustomData?.hr_department_list);
    }
  }, [dropdownData?.companyCommonCustomData])


  const selectManagerRef = useRef()
  const selectLocationRef = useRef()
  const selectCostCenterRef = useRef()
  const onManagerClear = () => {
    selectManagerRef?.current?.select.clearValue()
  }
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
  }
  const onCostCenterClear = () => {
    selectCostCenterRef?.current?.select.clearValue()
  }
  const handleManagerChange = (e) => {
    subFunctionAddFormik.setFieldValue('manager_id', e?.value)
  }

  const handleLocationChange = (e) => {
    //console.log(e);
    // let locationList = []
    // e?.map((data, i) => locationList.push(data.value))
    // if (locationList.length > 0) {
    subFunctionAddFormik.setFieldValue('location_id', e?.value)
    // }
  }


  const handleParentFuntionChange = (e) => {
    subFunctionAddFormik.setFieldValue('parent_id', e?.value)
  }
  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add Sub Function </strong>
                </CCol>
                {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm
                onSubmit={subFunctionAddFormik.handleSubmit}
                className="form-horizontal"
              >
                <div>
                  {/* <h4>Company Details</h4>
                  <hr /> */}
                  <div className="row form-group">
                    {/* <div className="col-md-4">
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
                        // onChange={({ value }) => functionAddFormik.setFieldValue('group_id', value)}
                      />
                      {functionAddFormik.errors.group_id ? <div className="help-block text-danger">{functionAddFormik.errors.group_id}</div> : null}
                    </div> */}
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        value={groupName}
                        id="group_id"
                        name="group_id"
                        onChange={(e) => handleGroupChange(e)}
                        options={groupOptions}
                      // onChange={({ value }) => subFunctionAddFormik.setFieldValue('group_id', value)}
                      />
                      {subFunctionAddFormik.errors.group_id ? <div className="help-block text-danger">{subFunctionAddFormik.errors.group_id}</div> : null}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company <span className="error">*</span>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company'}
                        defaultValue={''}
                        name="company_id"
                        options={companyOptions}
                        onChange={(e) => handleCompanyChanges(e)}
                        onBlur={subFunctionAddFormik.handleBlur}
                      />
                      {subFunctionAddFormik.touched.company_id &&
                        subFunctionAddFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>
                    {/* <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company <span className="error">*</span>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company'}
                        defaultValue={''}
                        name="company_id"
                        options={companyOptions}
                        onChange={(e) => handleCompanyChanges(e)}
                        onBlur={subFunctionAddFormik.handleBlur}
                      />
                      {subFunctionAddFormik.touched.company_id &&
                      subFunctionAddFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div> */}
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
                        onBlur={subFunctionAddFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      />
                      {subFunctionAddFormik.touched.location_id &&
                        subFunctionAddFormik.errors.location_id ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.location_id}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Function <span className="error">*</span>
                      </label>
                      <Select
                        // ref={selectParentFunctionRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a   Function name '}
                        defaultValue={''}
                        name="parent_id"
                        options={parentOptions}
                        onBlur={subFunctionAddFormik.handleBlur}
                        onChange={(e) => handleParentFuntionChange(e)}
                      />
                      {subFunctionAddFormik.touched.parent_id &&
                        subFunctionAddFormik.errors.parent_id ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.parent_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Sub Function Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={subFunctionAddFormik.values.name}
                        className="form-control"
                        placeholder="Sub Function Name"
                        maxLength={25}
                        onChange={subFunctionAddFormik.handleChange}
                        onBlur={subFunctionAddFormik.handleBlur}
                      />
                      {subFunctionAddFormik.touched.name &&
                        subFunctionAddFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Code <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={subFunctionAddFormik.values.code}
                        className="form-control"
                        placeholder="Function Code"
                        maxLength={25}
                        onChange={subFunctionAddFormik.handleChange}
                        onBlur={subFunctionAddFormik.handleBlur}
                      />
                      {subFunctionAddFormik.touched.code &&
                        subFunctionAddFormik.errors.code ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.code}
                        </div>
                      ) : null}
                    </div>

                  </div>
                  <div className="row form-group">
                    {/* <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Cost Center <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectCostCenterRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Cost Center'}
                        defaultValue={''}
                        name="cost_center_id"
                        options={cpyCostCenter}
                        onBlur={subFunctionAddFormik.handleBlur}
                        onChange={(e) => handleCostCenterChange(e)}
                      />
                      {subFunctionAddFormik.touched.cost_center_id &&
                      subFunctionAddFormik.errors.cost_center_id ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.cost_center_id}
                        </div>
                      ) : null}
                    </div> */}
                    {/*<div className="col-md-4">
                      <label htmlFor="hf-email">
                        Manager
                      </label>
                      <Select
                        ref={selectManagerRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Manager'}
                        defaultValue={''}
                        name="manager_id"
                        options={cpyManager}
                        onBlur={subFunctionAddFormik.handleBlur}
                        onChange={(e) => handleManagerChange(e)}
                      />
                      {subFunctionAddFormik.touched.manager_id &&
                        subFunctionAddFormik.errors.manager_id ? (
                        <div className="help-block text-danger">
                          {subFunctionAddFormik.errors.manager_id}
                        </div>
                      ) : null}
                    </div> */}



                  </div>
                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Save
                      </CButton>
                      {/* <CButton type="reset" size="md"  className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton> */}
                      <Link
                        className="ml-3 btn btn-danger"
                        to={'/master/subfunction'}
                      >
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

export default AddSubFunction
