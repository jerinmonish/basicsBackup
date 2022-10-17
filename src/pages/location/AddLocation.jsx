import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CommonCountryList,
  CommonStateList,
  CommonGroupList,
  CommonDistrictList,
  CommonIndustryTypeDropdownList,
  CompanyDropDownList,
  CostCenterDropDownList,
} from './../../actions/commonAction'
import { LocationAdd } from './../../actions/master'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import 'react-dates/initialize'
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
import 'react-dates/lib/css/_datepicker.css'
import { convertValueLabel } from '../../utils/helper'
import { useHistory } from 'react-router-dom'

const AddLocation = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const industrydropdownData = useSelector((state) => state.commonData)
  const dropdownData = useSelector((state) => state.commonData)
  const [stateOptions, setStateOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [costCenterOptions, setCostCenterOptions] = useState([])
  const [groupName, setGroupName] = useState([])
  const [groupChanged, setGroupChanged] = useState(0);

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonCountryList())
    dispatch(CommonIndustryTypeDropdownList())
    dispatch(CommonGroupList())
    // dispatch(LocationList())
    // dispatch(CostCenterDropDownList())
  }, [])

  const industryOptions = dropdownData?.industryCommonData?.data?.result
  const [companyOptions, setCompanyOptions] = useState([]);//dropdownData?.companyCommonData?.data?.result
  // const costCenterOptions = dropdownData?.costCenterCommonData?.data?.result
  const groupOptions = dropdownData?.groupComData?.data?.result;
  const countryOptions = dropdownData?.countryCommonData?.data?.result
  const locationAddFormik = useFormik({
    initialValues: {
      name: '',
      industry_type_id: '',
      code: '',
      group_id: '',
      company_id: '',
      // cost_center_id: '',
      door_no: '',
      house_name: '',
      street_name: '',
      place_name: '',
      country_id: '',
      state_id: '',
      district_id: '',
      pin_code: '',
      known_as: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      industry_type_id: Yup.string().required('This field is required'),
      code: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      // cost_center_id: Yup.string().required('This field is required'),
      door_no: Yup.string().required('This field is required'),
      house_name: Yup.string().required('This field is required'),
      street_name: Yup.string().required('This field is required'),
      place_name: Yup.string().required('This field is required'),
      country_id: Yup.string().required('This field is required'),
      state_id: Yup.string().required('This field is required'),
      district_id: Yup.string().required('This field is required'),
      pin_code: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(LocationAdd(formData, history))
      // console.log('formData', formData)
    },
  })

  const handleGroupChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("group_id", "=", ' + e?.value + ')]'
        },
      }
      dispatch(CompanyDropDownList(sendGpparams))
      setGroupName(convertValueLabel(e?.value, e?.label))
      locationAddFormik.setFieldValue('group_id', e?.value)
      // onCompanyClear();
      // onCCClear();
      setGroupChanged(1);
    }
  }

  const handleCountryChange = (e) => {
    if (e?.value) {
      dispatch(CommonStateList(e.value))
      locationAddFormik.setFieldValue('country_id', e.value)
    }
  }

  const handleStateChange = (e) => {
    if (e?.value) {
      locationAddFormik.setFieldValue('state_id', e?.value)
      dispatch(CommonDistrictList(e.value))
    }
  }

  const handleIndustrytype = (e) => {
    if (e?.value) {
      locationAddFormik.setFieldValue('industry_type_id', e?.value)
      dispatch(CommonIndustryTypeDropdownList(e.value))
    }
  }
  const handleCompanyDropDownList = (e) => {
    if (e?.value) {
      // onCCClear();
      locationAddFormik.setFieldValue('company_id', e?.value)
      // dispatch(CompanyDropDownList(e.value))
      dispatch(CostCenterDropDownList(e.value))
    }
  }
  const handleCostCenterDropDownList = (e) => {
    if (e?.value) {
      locationAddFormik.setFieldValue('cost_center_id', e?.value)
      // dispatch(CostCenterDropDownList(e.value))
    }
  }

  const handleDistrictChange = (e) => {
    if (e?.value) {
      locationAddFormik.setFieldValue('district_id', e.value)
    }
  }

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])


  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      onClear()
      setDistrictOptions(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result, districtOptions])

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      onClear()
      setStateOptions(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result, stateOptions])

  //To load dropdown data based on company id and its change
  useEffect(() => {
    if (dropdownData?.costCenterCommonData) {
      // console.log(dropdownData?.costCenterCommonData?.data?.result);
      setCostCenterOptions(dropdownData?.costCenterCommonData?.data?.result);
    }
  }, [dropdownData?.costCenterCommonData])

  const selectInputRef = useRef()
  const onClear = () => {
    selectInputRef.current.select.clearValue()
  }

  const selectCompanyRef = useRef()
  const onCompanyClear = () => {
    selectCompanyRef.current.select.clearValue()
  }

  const selectCCRef = useRef()
  const onCCClear = () => {
    selectCCRef.current.select.clearValue()
  }

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add Location </strong>
                </CCol>
                {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm
                onSubmit={locationAddFormik.handleSubmit}
                className="form-horizontal"
              >
                <div>
                  {/* <strong>Location Details</strong>
                  <hr /> */}
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        // id="group_id"
                        value={groupName}
                        name="group_id"
                        options={groupOptions}
                        // onChange={({ value }) => locationAddFormik.setFieldValue('group_id', value)}
                        onChange={(e) => handleGroupChange(e)}
                      />
                      {locationAddFormik.touched.group_id && locationAddFormik.errors.group_id ? <div className="help-block text-danger">{locationAddFormik.errors.group_id}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company Name <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectCompanyRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company'}
                        id="company_id"
                        name="company_id"
                        onBlur={locationAddFormik.handleBlur}
                        options={companyOptions}
                        onChange={(e) => handleCompanyDropDownList(e)}
                      />
                      {locationAddFormik.touched.company_id &&
                        locationAddFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Type of Industry <span className="error">*</span>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Industry Name'}
                        id="industry_type_id"
                        name="industry_type_id"
                        onBlur={locationAddFormik.handleBlur}
                        options={industryOptions}
                        onChange={(e) => handleIndustrytype(e)}
                      />
                      {locationAddFormik.touched.industry_type_id &&
                        locationAddFormik.errors.industry_type_id ? (
                        <p className="text-danger">
                          {locationAddFormik.errors.industry_type_id}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Location Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={locationAddFormik.values.name}
                        className="form-control"
                        placeholder="Location Name"
                        onBlur={locationAddFormik.handleBlur}
                        onChange={locationAddFormik.handleChange}
                      />
                      {locationAddFormik.touched.name &&
                        locationAddFormik.errors.name ? (
                        <p className="text-danger">
                          {locationAddFormik.errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Known As
                      </label>
                      <input
                        type="text"
                        name="known_as"
                        id="known_as"
                        value={locationAddFormik.values.known_as}
                        className="form-control"
                        placeholder="Known As"
                        onChange={locationAddFormik.handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Branch Code <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        value={locationAddFormik.values.code}
                        className="form-control"
                        placeholder="Branch Code"
                        onBlur={locationAddFormik.handleBlur}
                        onChange={locationAddFormik.handleChange}
                      />
                      {locationAddFormik.touched.code &&
                        locationAddFormik.errors.code ? (
                        <p className="text-danger">
                          {locationAddFormik.errors.code}
                        </p>
                      ) : null}
                    </div>

                    {/* <div className="col-md-3">
                      <label htmlFor="hf-email">
                        Cost Center <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectCCRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Cost Center'}
                        id="cost_center_id"
                        name="cost_center_id"
                        onBlur={locationAddFormik.handleBlur}
                        options={costCenterOptions}
                        onChange={(e) => handleCostCenterDropDownList(e)}
                      />
                      {locationAddFormik.touched.cost_center_id &&
                      locationAddFormik.errors.cost_center_id ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.cost_center_id}
                        </div>
                      ) : null}
                    </div> */}

                  </div>


                  <hr />
                  <h4>General Informations</h4>
                  <hr />
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        Door No <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="door_no"
                        value={locationAddFormik.values.door_no}
                        className="form-control"
                        placeholder="Door No"
                        maxLength={25}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={locationAddFormik.handleChange}
                      />
                      {locationAddFormik.touched.door_no &&
                        locationAddFormik.errors.door_no ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.door_no}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        House/Apartment Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="house_name"
                        id="house_name"
                        value={locationAddFormik.values.house_name}
                        className="form-control"
                        placeholder="House/Apartment Name"
                        maxLength={25}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={locationAddFormik.handleChange}
                      />
                      {locationAddFormik.touched.house_name &&
                        locationAddFormik.errors.house_name ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.house_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        Street Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="street_name"
                        value={locationAddFormik.values.street_name}
                        className="form-control"
                        placeholder="Street Name"
                        maxLength={25}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={locationAddFormik.handleChange}
                      />
                      {locationAddFormik.errors.street_name ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.touched.street_name &&
                            locationAddFormik.errors.street_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        Place Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="place_name"
                        value={locationAddFormik.values.place_name}
                        className="form-control"
                        placeholder="Place Name"
                        maxLength={25}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={locationAddFormik.handleChange}
                      />
                      {locationAddFormik.touched.place_name &&
                        locationAddFormik.errors.place_name ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.place_name}
                        </div>
                      ) : null}
                    </div>

                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        Country <span className="error">*</span>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="country_id"
                        id="country_id"
                        options={countryOptions}
                        placeholder={'Choose a Country'}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={(e) => handleCountryChange(e)}
                      />
                      {locationAddFormik.touched.country_id &&
                        locationAddFormik.errors.country_id ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.country_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        State <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectInputRef}
                        className="basic-single"
                        classNamePrefix="select"
                        name="state_id"
                        options={stateOptions}
                        placeholder={'Choose a State'}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={(e) => handleStateChange(e)}
                      />
                      {locationAddFormik.touched.state_id &&
                        locationAddFormik.errors.state_id ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.state_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        District <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectInputRef}
                        className="basic-single"
                        classNamePrefix="select"
                        name="district_id"
                        options={districtOptions}
                        placeholder={'Choose a District'}
                        onBlur={locationAddFormik.handleBlur}
                        onChange={(e) => handleDistrictChange(e)}
                      />
                      {locationAddFormik.touched.district_id &&
                        locationAddFormik.errors.district_id ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.district_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">
                        Zip <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="pin_code"
                        value={locationAddFormik.values.pin_code}
                        onChange={locationAddFormik.handleChange}
                        onBlur={locationAddFormik.handleBlur}
                        className="form-control"
                        placeholder="Zip"
                        maxLength={10}
                      />
                      {locationAddFormik.touched.pin_code &&
                        locationAddFormik.errors.pin_code ? (
                        <div className="help-block text-danger">
                          {locationAddFormik.errors.pin_code}
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
                      {/* <CButton type="reset" size="md"  className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton> */}
                      <Link className="ml-3 btn btn-danger" to={'/master/location'}>
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

export default AddLocation
