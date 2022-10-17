import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CommonGroupList,
  CommonCountryList,
  CommonStateList,
  CommonDistrictList,
  CommonIndustryTypeDropdownList,
  CompanyDropDownList,
  CostCenterDropDownList,
} from '../../actions/commonAction'
import { LocationEditAPI, LocationUpdateAPI } from '../../actions/master'
import { useFormik } from 'formik'
import Select from 'react-select'
import 'react-dates/initialize'
import { convertValueLabel, decryptSingleData } from '../../utils/helper'
import CLoader from '../loader/CLoader'
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
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

const EditLocation = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  //To get common details like country, state, group and other common data
  const dropdownData = useSelector((state) => state.commonData)

  //To get company details
  const { locationEditDetails, isLoading } = useSelector((state) => state.masterBackend)

  const [stateOptions, setStateOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [imgSelected, setImgSelected] = useState([])
  const [costCenterOptions, setCostCenterOptions] = useState({})

  //Set Edit Values for Dropdowns
  const [selectIndustryType, setselectIndustryType] = useState({})
  const [selectGroupName, setSelectGroupName] = useState({})
  const [selecCompanyDropdown, setselecCompanyDropdown] = useState({})
  const [CostCenterDefDropDownList, setCostCenterDefDropDownList] = useState({})
  const [selectCountryName, setSelectCountryName] = useState({})
  const [selectStateName, setSelectStateName] = useState({})
  const [selectDistrictName, setSelectDistrictName] = useState({})
  const [countryChangedFlag, setCountryChangedFlag] = useState(0)
  const [stateChangedFlag, setStateChangedFlag] = useState(0)

  //To load dropdown predefined data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(LocationEditAPI(decryptSingleData(props?.match?.params?.id)))
      // dispatch(LocationEditAPI(props?.match?.params?.id))
    }
    dispatch(CommonCountryList())
    dispatch(CommonIndustryTypeDropdownList())
    // dispatch(CompanyDropDownList())
    dispatch(CommonGroupList())
    // dispatch(CostCenterDropDownList())
  }, [])

  //location Edit Form Initilization
  const EditLocationFormik = useFormik({
    initialValues: {
      name: '',
      industry_type_id: '',
      code: '',
      company_id: '',
      cost_center_id: '',
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
      cost_center_id: Yup.string().required('This field is required'),
      door_no: Yup.string().required('This field is required'),
      house_name: Yup.string().required('This field is required'),
      street_name: Yup.string().required('This field is required'),
      place_name: Yup.string().required('This field is required'),
      country_id: Yup.string().required('This field is required'),
      state_id: Yup.string().required('This field is required'),
      district_id: Yup.string().required('This field is required'),
      pin_code: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(LocationUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
    },
  })

  //To set Dristrict data in dropdown
  const selectDistrictRef = useRef()
  useEffect(() => {
    if (stateChangedFlag) {
      if (dropdownData?.districtCommonData?.data?.result) {
        setSelectDistrictName([])
        onDistrictClear()
        setDistrictOptions(dropdownData?.districtCommonData?.data?.result)
      }
    } else {
      if (locationEditDetails?.data?.district_id_list) {
        setDistrictOptions(locationEditDetails?.data?.district_id_list)
      }
    }
  }, [
    locationEditDetails?.data?.district_id_list,
    districtOptions,
    stateChangedFlag,
    dropdownData?.districtCommonData?.data?.result,
  ])

  //To set State data in dropdown
  const selectStateRef = useRef()
  useEffect(() => {
    if (countryChangedFlag) {
      if (dropdownData?.stateCommonData?.data?.result) {
        setSelectDistrictName([])
        onDistrictClear()
        setSelectStateName([])
        onStateClear()
        setStateOptions(dropdownData?.stateCommonData?.data?.result)
      }
    } else {
      if (locationEditDetails?.data?.state_id_list) {
        //setSelectDistrictName(convertValueLabel([]))
        onDistrictClear()
        onStateClear()
        setStateOptions(locationEditDetails?.data?.state_id_list)
      }
    }
  }, [
    locationEditDetails?.data?.state_id_list,
    stateOptions,
    countryChangedFlag,
    dropdownData?.stateCommonData?.data?.result,
  ])

  useEffect(() => {
    // console.log("locationEditDetails?.data", locationEditDetails?.data);
    if (locationEditDetails?.data !== null) {
      EditLocationFormik.setValues({
        name: locationEditDetails?.data?.name,
        industry_type_id: locationEditDetails?.data?.industry_type_id,
        code: locationEditDetails?.data?.code,
        company_id: locationEditDetails?.data.company_id,
        cost_center_id: locationEditDetails?.data.cost_center_id,
        door_no: locationEditDetails?.data?.door_no,
        house_name: locationEditDetails?.data?.house_name,
        street_name: locationEditDetails?.data?.street_name,
        place_name: locationEditDetails?.data?.place_name,
        country_id: locationEditDetails?.data?.country_id,
        state_id: locationEditDetails?.data?.state_id,
        district_id: locationEditDetails?.data?.district_id,
        pin_code: locationEditDetails?.data?.pin_code,
        known_as: locationEditDetails?.data?.known_as,
      })
    }
    if (isLoading === false && locationEditDetails?.data !== undefined && locationEditDetails?.data !== null) {
      setSelectGroupName(convertValueLabel(locationEditDetails?.data?.group_id, locationEditDetails?.data.group_id_name))
      setselectIndustryType(convertValueLabel(locationEditDetails?.data?.industry_type_id, locationEditDetails?.data.industry_type_id_name))
      setselecCompanyDropdown(convertValueLabel(locationEditDetails?.data?.company_id, locationEditDetails?.data.company_id_name))
      setCostCenterDefDropDownList(convertValueLabel(locationEditDetails?.data.cost_center_id, locationEditDetails?.data.cost_center_id_name))
      setSelectCountryName(convertValueLabel(locationEditDetails?.data?.country_id, locationEditDetails?.data.country_id_name))
      setSelectStateName(convertValueLabel(locationEditDetails?.data?.state_id, locationEditDetails?.data.state_id_name))
      setSelectDistrictName(convertValueLabel(locationEditDetails?.data?.district_id, locationEditDetails?.data.district_id_name))
    }
  }, [isLoading, locationEditDetails?.data])

  //To load dropdown data based on company id and its change
  useEffect(() => {
    if (dropdownData?.costCenterCommonData) { //For Onchange
      setCostCenterOptions(dropdownData?.costCenterCommonData?.data?.result);
    } else if (locationEditDetails?.data) { //For update
      setCostCenterOptions(locationEditDetails?.data?.cost_center_id_list);
    }
  }, [locationEditDetails?.data, dropdownData?.costCenterCommonData])


  const handleCompanyDropDownList = (e) => {
    if (e?.value) {
      EditLocationFormik.setFieldValue('company_id', e?.value)
      // dispatch(CompanyDropDownList(e.value))
      dispatch(CostCenterDropDownList(e.value))
      setselecCompanyDropdown(convertValueLabel(e.value, e.label));
      setCostCenterDefDropDownList([]);
    }
  }

  const handleCostCenterDropDownList = (e) => {
    if (e?.value) {
      EditLocationFormik.setFieldValue('cost_center_id', e?.value)
      setCostCenterDefDropDownList(convertValueLabel(e.value, e.label));
    }
  }

  //To Clear the selected values
  const onStateClear = () => {
    selectStateRef?.current?.select?.clearValue()
  }
  const onDistrictClear = () => {
    selectDistrictRef?.current?.select?.clearValue()
  }

  const selectCompanyRef = useRef()
  const onCompanyClear = () => {
    selectCompanyRef.current.select.clearValue()
  }

  const selectCCRef = useRef()
  const onCCClear = () => {
    selectCCRef.current.select.clearValue()
  }

  const industryOptions = dropdownData?.industryCommonData?.data?.result
  // const companyOptions = dropdownData?.companyCommonData?.data?.result
  const [companyOptions, setCompanyOptions] = useState([]);
  // const costCenterOptions = dropdownData?.costCenterCommonData?.data?.result
  const countryOptions = dropdownData?.countryCommonData?.data?.result
  const groupOptions = dropdownData?.groupComData?.data?.result;

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result) {
      setselecCompanyDropdown(dropdownData?.companyCommonData?.data?.result);
    } else if (locationEditDetails?.data?.company_id_list) {
      setselecCompanyDropdown(locationEditDetails?.data?.company_id_list)
    }
  }, [dropdownData?.companyCommonData?.data?.result, locationEditDetails?.data?.company_id_list])

  const handleGroupChange = (e) => {
    setselecCompanyDropdown([]);
    setCostCenterDefDropDownList([]);
    if (e?.value) {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("group_id", "=", ' + e.value + ')]'
        },
      }
      dispatch(CompanyDropDownList(sendGpparams))
      setSelectGroupName(convertValueLabel(e.value, e.label))
      EditLocationFormik.setFieldValue('group_id', e.value)
    }
  }

  const handleCountryChange = (e) => {
    if (e?.value) {
      EditLocationFormik.setFieldValue('country_id', e.value)
      setSelectCountryName(convertValueLabel(e.value, e.label))
      dispatch(CommonStateList(e.value))
      setCountryChangedFlag(1);
    }
  }

  const handleStateChange = (e) => {
    if (e?.value) {
      EditLocationFormik.setFieldValue('state_id', e?.value)
      setSelectStateName(convertValueLabel(e.value, e.label))
      dispatch(CommonDistrictList(e.value))
      setStateChangedFlag(1);
    }
  }

  const handleDistrictChange = (e) => {
    if (e?.value) {
      setSelectDistrictName(convertValueLabel(e?.value, e?.label))
      EditLocationFormik.setFieldValue('district_id', e.value);
    }
  }

  const handleIndustryType = (e) => {
    if (e?.value) {
      setselectIndustryType(convertValueLabel(e?.value, e?.label))
      EditLocationFormik.setFieldValue('industry_type_id', e.value);
    }
  }


  return (
    <main className="c-main">
      {isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Edit Location </strong>
                  </CCol>
                  {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm
                  onSubmit={EditLocationFormik.handleSubmit}
                  className="form-horizontal"
                >
                  <div>
                    {/* <strong> Edit Location Details</strong>
                    <hr /> */}
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Group Name'}
                          id="group_id"
                          name="group_id"
                          value={selectGroupName}
                          options={groupOptions}
                          // onChange={({ value }) => locationAddFormik.setFieldValue('group_id', value)}
                          onChange={(e) => handleGroupChange(e)}
                        />
                        {EditLocationFormik.errors.group_id ? <div className="help-block text-danger">{EditLocationFormik.errors.group_id}</div> : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Company Name <span className="error">*</span></label>
                        <Select
                          ref={selectCompanyRef}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Company'}
                          value={selecCompanyDropdown}
                          id="company_id"
                          name="company_id"
                          onBlur={EditLocationFormik.handleBlur}
                          options={companyOptions}
                          onChange={(e) => handleCompanyDropDownList(e)}
                        />
                        {EditLocationFormik.touched.company_id && EditLocationFormik.errors.company_id ? (<div className="help-block text-danger">{EditLocationFormik.errors.company_id}</div>) : null}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Type of Industry <span className="error">*</span>
                        </label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Industry Name'}
                          value={selectIndustryType}
                          id="industry_type_id"
                          name="industry_type_id"
                          onBlur={EditLocationFormik.handleBlur}
                          options={industryOptions}
                          onChange={(e) => handleIndustryType(e)}
                        />
                        {EditLocationFormik.touched.industry_type_id &&
                          EditLocationFormik.errors.industry_type_id ? (
                          <p className="text-danger">
                            {EditLocationFormik.errors.industry_type_id}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          Location Name <span className="error">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={EditLocationFormik.values.name}
                          className="form-control"
                          placeholder="Name"
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={EditLocationFormik.handleChange}
                        />
                        {EditLocationFormik.touched.name &&
                          EditLocationFormik.errors.name ? (
                          <p className="text-danger">
                            {EditLocationFormik.errors.name}
                          </p>
                        ) : null}
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          Known As
                        </label>
                        <input
                          type="text"
                          name="known_as"
                          id="known_as"
                          value={EditLocationFormik.values.known_as}
                          className="form-control"
                          placeholder="Known As"
                          onChange={EditLocationFormik.handleChange}
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          Branch Code <span className="error">*</span>
                        </label>
                        <input
                          type="text"
                          name="code"
                          id="code"
                          value={EditLocationFormik.values.code}
                          className="form-control"
                          placeholder="Branch Code"
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={EditLocationFormik.handleChange}
                        />
                        {EditLocationFormik.touched.code &&
                          EditLocationFormik.errors.code ? (
                          <p className="text-danger">
                            {EditLocationFormik.errors.code}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          Cost Center <span className="error">*</span>
                        </label>
                        <Select
                          ref={selectCCRef}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Cost Center'}
                          value={CostCenterDefDropDownList}
                          id="cost_center_id"
                          name="cost_center_id"
                          onBlur={EditLocationFormik.handleBlur}
                          options={costCenterOptions}
                          onChange={(e) => handleCostCenterDropDownList(e)}
                        />
                        {EditLocationFormik.touched.cost_center_id &&
                          EditLocationFormik.errors.cost_center_id ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.cost_center_id}
                          </div>
                        ) : null}
                      </div>
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
                          value={EditLocationFormik.values.door_no}
                          className="form-control"
                          placeholder="Door No"
                          maxLength={25}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={EditLocationFormik.handleChange}
                        />
                        {EditLocationFormik.touched.door_no &&
                          EditLocationFormik.errors.door_no ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.door_no}
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
                          value={EditLocationFormik.values.house_name}
                          className="form-control"
                          placeholder="House/Apartment Name"
                          maxLength={25}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={EditLocationFormik.handleChange}
                        />
                        {EditLocationFormik.touched.house_name &&
                          EditLocationFormik.errors.house_name ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.house_name}
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
                          value={EditLocationFormik.values.street_name}
                          className="form-control"
                          placeholder="Street Name"
                          maxLength={25}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={EditLocationFormik.handleChange}
                        />
                        {EditLocationFormik.errors.street_name ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.touched.street_name &&
                              EditLocationFormik.errors.street_name}
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
                          value={EditLocationFormik.values.place_name}
                          className="form-control"
                          placeholder="Place Name"
                          maxLength={25}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={EditLocationFormik.handleChange}
                        />
                        {EditLocationFormik.touched.place_name &&
                          EditLocationFormik.errors.place_name ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.place_name}
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
                          value={selectCountryName}
                          name="country_id"
                          id="country_id"
                          options={countryOptions}
                          placeholder={'Choose a Country'}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={(e) => handleCountryChange(e)}
                        />
                        {EditLocationFormik.touched.country_id &&
                          EditLocationFormik.errors.country_id ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.country_id}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          State <span className="error">*</span>
                        </label>
                        <Select
                          // ref={selectInputRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectStateName}
                          name="state_id"
                          options={stateOptions}
                          placeholder={'Choose a State'}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={(e) => handleStateChange(e)}
                        />
                        {EditLocationFormik.touched.state_id &&
                          EditLocationFormik.errors.state_id ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.state_id}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          District <span className="error">*</span>
                        </label>
                        <Select
                          // ref={selectInputRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectDistrictName}
                          name="district_id"
                          options={districtOptions}
                          placeholder={'Choose a District'}
                          onBlur={EditLocationFormik.handleBlur}
                          onChange={(e) => handleDistrictChange(e)}
                        />
                        {EditLocationFormik.touched.district_id &&
                          EditLocationFormik.errors.district_id ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.district_id}
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
                          value={EditLocationFormik.values.pin_code}
                          onChange={EditLocationFormik.handleChange}
                          onBlur={EditLocationFormik.handleBlur}
                          className="form-control"
                          placeholder="Zip"
                          maxLength={10}
                        />
                        {EditLocationFormik.touched.pin_code &&
                          EditLocationFormik.errors.pin_code ? (
                          <div className="help-block text-danger">
                            {EditLocationFormik.errors.pin_code}
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
                        {/* <CButton type="reset" size="md"  className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton> */}
                        <Link
                          className="ml-3 btn btn-danger"
                          to={'/master/location'}
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
      )}
    </main>
  )
}

export default EditLocation
