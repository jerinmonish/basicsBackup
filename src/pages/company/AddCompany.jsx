import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CommonGroupList, CommonTypeOfOrgList, CommonCountryList, CommonStateList, CommonCurrencyList, CommonDistrictList } from './../../actions/commonAction';
import { CompanyAdd } from './../../actions/master';
import { useFormik } from 'formik';
import Select from 'react-select';
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { indianDateFormat, convertBase64 } from '../../utils/helper';
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
  CFormGroup,
  CInput,
  CInputGroup,
  CPagination,
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
  CCardFooter,
  CLabel,
  CFormText,
  CButtonToolbar,
  CInputCheckbox
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "react-dates/lib/css/_datepicker.css";
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";

const AddCompany = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dateOfInc, setDateOfInc] = useState(null);
  const [focusOfInc, setFocusOfInc] = useState(false);

  const [dateEpfSt, setDateEpfSt] = useState(null);
  const [focusEpfSt, setFocusEpfSt] = useState(false);

  const [dateEsiSt, setDateEsiSt] = useState(null);
  const [focusEsiSt, setFocusEsiSt] = useState(false);

  const [dateMtps, setDateMtps] = useState(null);
  const [focusMtps, setFocusMtps] = useState(false);

  const dropdownData = useSelector(state => state.commonData);

  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);

  const [imgSelected, setImgSelected] = useState([]);


  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList());
    dispatch(CommonTypeOfOrgList());
    dispatch(CommonCountryList());
    dispatch(CommonCurrencyList());
  }, []);

  const groupOptions = dropdownData?.groupComData?.data?.result;
  const typeOfOrganisationOptions = dropdownData?.typeOfOrgData?.data?.result;
  const countryOptions = dropdownData?.countryCommonData?.data?.result;
  const currencyOptions = dropdownData?.currencyCommonData?.data?.result;

  //To load years
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  //Common Validation for both Add/Edit
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'This field is required.';
    }
    if (!values.group_id) {
      errors.group_id = 'This field is required.';
    }
    if (!values.organization_type_id) {
      errors.organization_type_id = 'This field is required.';
    }
    if (!values.incorporation_date) {
      errors.incorporation_date = 'This field is required.';
    }
    if (!values.registration_no) {
      errors.registration_no = 'This field is required.';
    }
    if (!values.logo) {
      errors.logo = 'This field is required.';
    }
    if (!values.door_no) {
      errors.door_no = 'This field is required.';
    }
    if (!values.house_name) {
      errors.house_name = 'This field is required.';
    }
    if (!values.street_name) {
      errors.street_name = 'This field is required.';
    }
    if (!values.place_name) {
      errors.place_name = 'This field is required.';
    }
    if (!values.country_id) {
      errors.country_id = 'This field is required.';
    }
    if (!values.state_id) {
      errors.state_id = 'This field is required.';
    }
    if (!values.district_id) {
      errors.district_id = 'This field is required.';
    }
    if (!values.pin_code) {
      errors.pin_code = 'This field is required.';
    }
    if (!values.phone) {
      errors.phone = 'This field is required.';
    }
    if (!values.email) {
      errors.email = 'This field is required.';
    }
    if (!values.website) {
      errors.website = 'This field is required.';
    }
    if (!values.vat) {
      errors.vat = 'This field is required.';
    }
    if (!values.company_registry) {
      errors.company_registry = 'This field is required.';
    }
    if (!values.currency_id) {
      errors.currency_id = 'This field is required.';
    }
    if (!values.epf_start_date) {
      errors.epf_start_date = 'This field is required.';
    }
    if (!values.epf_employer_code) {
      errors.epf_employer_code = 'This field is required.';
    }
    // if (!values.employer_pan_no) {
    //   regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
    //   errors.employer_pan_no = 'This field is required.';
    // }
    if (!values.esi_start_date) {
      errors.esi_start_date = 'This field is required.';
    }
    if (!values.esi_employer_code) {
      errors.esi_employer_code = 'This field is required.';
    }
    if (!values.payroll_cycle) {
      errors.payroll_cycle = 'This field is required.';
    }
    if (!values.monthly_process_date) {
      errors.monthly_process_date = 'This field is required.';
    }
    if (!values.remind_before) {
      errors.remind_before = 'This field is required.';
    }
    return errors;
  };

  //Group Add Form Initilization
  const companyAddFormik = useFormik({
    initialValues: {
      name: '',
      group_id: '',
      organization_type_id: '',
      incorporation_date: '',
      registration_no: '',
      logo: '',
      door_no: '',
      house_name: '',
      street_name: '',
      place_name: '',
      country_id: '',
      state_id: '',
      district_id: '',
      pin_code: '',
      phone: '',
      email: '',
      website: '',
      vat: '',
      company_registry: '',
      currency_id: '',
      //parent_company:'',
      epf_start_date: '',
      epf_employer_code: '',
      employer_pan_no: '',
      esi_start_date: '',
      esi_employer_code: '',
      payroll_cycle: '',
      monthly_process_date: '',
      show_caste: '',
      remind_before: '',
    },
    // string(5, "Must be 5 characters").number(4, "Must be 4 Number").string(1, "Must be 1 character at end")
    validate,
    validationSchema: Yup.object({
      employer_pan_no: Yup.mixed().required("Must be 5 characters,Must be 4 Number,Must be 1 character at end"),

    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": values } });
      dispatch(CompanyAdd(formData, history));
    },
  });

  // String regex = "[A-Z]{5}[0-9]{4}[A-Z]{1}";
  const handleCountryChange = (e) => {
    if (e?.value) {
      onDistrictClear();
      dispatch(CommonStateList(e.value));
      companyAddFormik.setFieldValue('country_id', e.value);
    }
  }

  const handleStateChange = (e) => {
    if (e?.value) {
      companyAddFormik.setFieldValue('state_id', e?.value);
      dispatch(CommonDistrictList(e.value));
    }
  }

  const handleDistrictChange = (e) => {
    if (e?.value) {
      companyAddFormik.setFieldValue('district_id', e.value);
    }
  }

  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      onDistrictClear();
      setDistrictOptions(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result, districtOptions]);

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      onClear();
      setStateOptions(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result, stateOptions]);

  const selectStateRef = useRef();
  const selectDistrictRef = useRef();
  const onClear = () => {
    selectStateRef.current.select.clearValue();
  };
  const onDistrictClear = () => {
    selectDistrictRef.current.select.clearValue();
  };

  const handleDateOfInc = (date) => {
    if (date) {
      setDateOfInc(date)
      companyAddFormik.setFieldValue('incorporation_date', indianDateFormat(date._d));
    }
  }

  const handleEpfDate = (date) => {
    if (date) {
      setDateEpfSt(date)
      companyAddFormik.setFieldValue('epf_start_date', indianDateFormat(date._d));
    }
  }

  const handleEsiDate = (date) => {
    if (date) {
      setDateEsiSt(date)
      companyAddFormik.setFieldValue('esi_start_date', indianDateFormat(date._d));
    }
  }

  const handleMonthlyProcessDate = (date) => {
    if (date) {
      setDateMtps(date)
      companyAddFormik.setFieldValue('monthly_process_date', indianDateFormat(date._d));
    }
  }

  const handleLogoChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: companyAddFormik.setFieldValue("logo", event.target.result),
      })
    }
  }

  //Handle show caste checkbox
  const handleShowCaste = (e) => {
    console.log(e.target.checked);
    if (e.target.checked == true) {
      companyAddFormik.setFieldValue('show_caste', 1);
    } else {
      companyAddFormik.setFieldValue('show_caste', 0);
    }
  }

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add Company </strong>
                </CCol>
                {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={companyAddFormik.handleSubmit} className="form-horizontal">
                <div>
                  <h4>Company Details</h4>
                  <hr />
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        defaultValue={''}
                        id="group_id"
                        name="group_id"
                        options={groupOptions}
                        onChange={({ value }) => companyAddFormik.setFieldValue('group_id', value)}
                      />
                      {companyAddFormik.errors.group_id ? <div className="help-block text-danger">{companyAddFormik.errors.group_id}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Company Name <span className='error'>*</span></label>
                      <input type="text" name='name' value={companyAddFormik.values.name} className="form-control" placeholder='Company Name' maxLength={25} onChange={companyAddFormik.handleChange} />
                      {companyAddFormik.errors.name ? <div className="help-block text-danger">{companyAddFormik.errors.name}</div> : null}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">Type of Organization <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Type of Organization'}
                        defaultValue={""}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        // isClearable={isClearable}
                        // isRtl={isRtl}
                        // isSearchable={isSearchable}
                        name="organization_type_id"
                        options={typeOfOrganisationOptions}
                        onChange={({ value }) => companyAddFormik.setFieldValue('organization_type_id', value)}
                      />
                      {companyAddFormik.errors.organization_type_id ? <div className="help-block text-danger">{companyAddFormik.errors.organization_type_id}</div> : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Date of Incorporation <span className='error'>*</span></label>
                      <SingleDatePicker
                        id={'incorporation_date'}
                        date={dateOfInc} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                        focused={focusOfInc} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        isOutsideRange={() => false}
                        placeholder='Date of Incorporation'
                        readOnly={true}
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select
                                value={month.month()}
                                onChange={(e) => onMonthSelect(month, e.target.value)}
                              >
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`incorporation_date_${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('incorporation_date_yr')}
                              </select>
                            </div>
                          </div>}
                      />
                      {companyAddFormik.errors.incorporation_date ? <div className="help-block text-danger">{companyAddFormik.errors.incorporation_date}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Registration Number <span className='error'>*</span></label>
                      <input type="text" name='registration_no' value={companyAddFormik.values.registration_no} className="form-control" placeholder='Registration Number' maxLength={25} onChange={companyAddFormik.handleChange} />
                      {companyAddFormik.errors.registration_no ? <div className="help-block text-danger">{companyAddFormik.errors.registration_no}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Company Logo <span className='error'>*</span></label>
                      <input type="file" name='logo' className="form-control" onChange={(event) => { handleLogoChange(event) }} accept="image/png, image/jpeg, image/jpg" />
                      {companyAddFormik.errors.logo ? <div className="help-block text-danger">{companyAddFormik.errors.logo}</div> : null}
                    </div>
                  </div>
                  <hr />
                  <h4>General Informations</h4>
                  <hr />
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                      <input type="text" name='door_no' value={companyAddFormik.values.door_no} className="form-control" placeholder='Door No' maxLength={25} onChange={companyAddFormik.handleChange} />
                      {companyAddFormik.errors.door_no ? <div className="help-block text-danger">{companyAddFormik.errors.door_no}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                      <input type="text" name='house_name' value={companyAddFormik.values.house_name} className="form-control" placeholder='House/Apartment Name' maxLength={25} onChange={companyAddFormik.handleChange} />
                      {companyAddFormik.errors.house_name ? <div className="help-block text-danger">{companyAddFormik.errors.house_name}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                      <input type="text" name='street_name' value={companyAddFormik.values.street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={companyAddFormik.handleChange} />
                      {companyAddFormik.errors.street_name ? <div className="help-block text-danger">{companyAddFormik.errors.street_name}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                      <input type="text" name='place_name' value={companyAddFormik.values.place_name} className="form-control" placeholder='Place Name' maxLength={25} onChange={companyAddFormik.handleChange} />
                      {companyAddFormik.errors.place_name ? <div className="help-block text-danger">{companyAddFormik.errors.place_name}</div> : null}
                    </div>

                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Country <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={''}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        // isClearable={isClearable}
                        // isRtl={isRtl}
                        // isSearchable={isSearchable}
                        name="country_id"
                        options={countryOptions}
                        placeholder={'Choose a Country'}
                        onChange={(e) => handleCountryChange(e)}
                      />
                      {companyAddFormik.errors.country_id ? <div className="help-block text-danger">{companyAddFormik.errors.country_id}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">State <span className='error'>*</span></label>
                      <Select
                        ref={selectStateRef}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={""}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        // isClearable={isClearable}
                        // isRtl={isRtl}
                        // isSearchable={isSearchable}
                        name="state_id"
                        options={stateOptions}
                        placeholder={'Choose a State'}
                        onChange={(e) => handleStateChange(e)}
                      />
                      {companyAddFormik.errors.state_id ? <div className="help-block text-danger">{companyAddFormik.errors.state_id}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">District <span className='error'>*</span></label>
                      <Select
                        ref={selectDistrictRef}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={""}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        // isClearable={isClearable}
                        // isRtl={isRtl}
                        // isSearchable={isSearchable}
                        name="district_id"
                        options={districtOptions}
                        placeholder={'Choose a District'}
                        onChange={(e) => handleDistrictChange(e)}
                      />
                      {companyAddFormik.errors.district_id ? <div className="help-block text-danger">{companyAddFormik.errors.district_id}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Zip <span className='error'>*</span></label>
                      <input type="text" name='pin_code' value={companyAddFormik.values.pin_code} onChange={companyAddFormik.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                      {companyAddFormik.errors.pin_code ? <div className="help-block text-danger">{companyAddFormik.errors.pin_code}</div> : null}
                    </div>

                  </div>

                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Phone <span className='error'>*</span></label>
                      <input type="text" name='phone' value={companyAddFormik.values.phone} onChange={companyAddFormik.handleChange} className="form-control" placeholder='Phone' maxLength={20} />
                      {companyAddFormik.errors.phone ? <div className="help-block text-danger">{companyAddFormik.errors.phone}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                      <input type="text" name='email' value={companyAddFormik.values.email} onChange={companyAddFormik.handleChange} className='form-control' placeholder='Email' maxLength={50} />
                      {companyAddFormik.errors.email ? <div className="help-block text-danger">{companyAddFormik.errors.email}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Website <span className='error'>*</span></label>
                      <input type="text" name='website' value={companyAddFormik.values.website} onChange={companyAddFormik.handleChange} className='form-control' placeholder='Website' maxLength={120} />
                      {companyAddFormik.errors.website ? <div className="help-block text-danger">{companyAddFormik.errors.website}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Tax ID <span className='error'>*</span></label>
                      <input type="text" name='vat' value={companyAddFormik.values.vat} onChange={companyAddFormik.handleChange} className='form-control' placeholder='Tax ID' maxLength={50} />
                      {companyAddFormik.errors.vat ? <div className="help-block text-danger">{companyAddFormik.errors.vat}</div> : null}
                    </div>

                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Company Registry <span className='error'>*</span></label>
                      <input type="text" name='company_registry' value={companyAddFormik.values.company_registry} onChange={companyAddFormik.handleChange} className='form-control' placeholder='Company Registry' maxLength={50} />
                      {companyAddFormik.errors.company_registry ? <div className="help-block text-danger">{companyAddFormik.errors.company_registry}</div> : null}
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Currency <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={''}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        // isClearable={isClearable}
                        // isRtl={isRtl}
                        // isSearchable={isSearchable}
                        name="currency_id"
                        options={currencyOptions}
                        placeholder={'Choose a Currency'}
                        onChange={({ value }) => companyAddFormik.setFieldValue('currency_id', value)}
                      />
                      {companyAddFormik.errors.currency_id ? <div className="help-block text-danger">{companyAddFormik.errors.currency_id}</div> : null}
                    </div>
                    {/* <div className="col-md-3">
                      <label htmlFor="hf-email">Parent Company</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={''}
                        // isDisabled={isDisabled}
                        // isLoading={isLoading}
                        // isClearable={isClearable}
                        // isRtl={isRtl}
                        // isSearchable={isSearchable}
                        name="parent_company"
                        options={options}
                        placeholder={'Choose a Parent Company'}
                      />
                      {companyAddFormik.errors.parent_company ? <div className="help-block text-danger">{companyAddFormik.errors.parent_company}</div> : null}
                    </div> */}
                  </div>
                  <hr />
                  <h4>Other Informations</h4>
                  <hr />
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">EPF Start Date <span className='error'>*</span></label>
                      <SingleDatePicker
                        id={'epf_start_date'}
                        date={dateEpfSt} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleEpfDate(date)} // PropTypes.func.isRequired
                        focused={focusEpfSt} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusEpfSt(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        isOutsideRange={() => false}
                        placeholder='EPF Start Date'
                        readOnly={true}
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select
                                value={month.month()}
                                onChange={(e) => onMonthSelect(month, e.target.value)}
                              >
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`epf_start_date_${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('epf_start_date_')}
                              </select>
                            </div>
                          </div>}
                      />
                      {companyAddFormik.errors.epf_start_date ? <div className="help-block text-danger">{companyAddFormik.errors.epf_start_date}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">EPF Employer Code	<span className='error'>*</span></label>
                      <input type="text" name='epf_employer_code' value={companyAddFormik.values.epf_employer_code} onChange={companyAddFormik.handleChange} className='form-control' placeholder='EPF Employer Code' maxLength={30} />
                      {companyAddFormik.errors.epf_employer_code ? <div className="help-block text-danger">{companyAddFormik.errors.epf_employer_code}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Employer PAN Number <span className='error'>*</span></label>
                      <input type="text" name='employer_pan_no' value={companyAddFormik.values.employer_pan_no} onChange={companyAddFormik.handleChange} className='form-control' placeholder='Employer PAN Number' maxLength={30} />
                      {companyAddFormik.errors.employer_pan_no ? <div className="help-block text-danger">{companyAddFormik.errors.employer_pan_no}</div> : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">ESI Start Date <span className='error'>*</span></label>
                      <SingleDatePicker
                        id={'esi_start_date'}
                        date={dateEsiSt} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleEsiDate(date)} // PropTypes.func.isRequired
                        focused={focusEsiSt} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusEsiSt(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        isOutsideRange={() => false}
                        placeholder='ESI Start Date'
                        readOnly={true}
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select
                                value={month.month()}
                                onChange={(e) => onMonthSelect(month, e.target.value)}
                              >
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`esi_start_date_${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('esi_start_date_')}
                              </select>
                            </div>
                          </div>}
                      />
                      {companyAddFormik.errors.esi_start_date ? <div className="help-block text-danger">{companyAddFormik.errors.esi_start_date}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">ESI Employer Code	<span className='error'>*</span></label>
                      <input type="text" name='esi_employer_code' value={companyAddFormik.values.esi_employer_code} onChange={companyAddFormik.handleChange} className='form-control' placeholder='ESI Employer Code' maxLength={500} />
                      {companyAddFormik.errors.esi_employer_code ? <div className="help-block text-danger">{companyAddFormik.errors.esi_employer_code}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Payroll Cycle <span className='error'>*</span></label>
                      <Select
                        name="payroll_cycle"
                        onChange={({ value }) => companyAddFormik.setFieldValue('payroll_cycle', value)}
                        options={[{ 'value': "weekly", 'label': "Weekly" }, { 'value': "bi_weekly", 'label': "Bi-Weekly" }, { 'value': "monthly", 'label': "Monthly" }]}
                      />
                      {companyAddFormik.errors.payroll_cycle ? <div className="help-block text-danger">{companyAddFormik.errors.payroll_cycle}</div> : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Monthly Process Date <span className='error'>*</span></label>
                      <SingleDatePicker
                        id={'monthly_process_date'}
                        date={dateMtps} // momentPropTypes.momentObj or null
                        onDateChange={(date) => handleMonthlyProcessDate(date)} // PropTypes.func.isRequired
                        focused={focusMtps} // PropTypes.bool
                        onFocusChange={({ focused }) => setFocusMtps(focused)} // PropTypes.func.isRequired
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        //showClearDate={true}
                        isOutsideRange={() => false}
                        readOnly={true}
                        placeholder='Monthly Process Date'
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select
                                value={month.month()}
                                onChange={(e) => onMonthSelect(month, e.target.value)}
                              >
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`monthly_process_date_${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('monthly_process_date_')}
                              </select>
                            </div>
                          </div>}
                      />
                      {companyAddFormik.errors.monthly_process_date ? <div className="help-block text-danger">{companyAddFormik.errors.monthly_process_date}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Remind the candidate Before (Recruitment)	<span className='error'>*</span></label>
                      <input type="number" name='remind_before' value={companyAddFormik.values.remind_before} onChange={companyAddFormik.handleChange} className='form-control' placeholder='Remind the candidate Before' maxLength={3} />
                      {companyAddFormik.errors.remind_before ? <div className="help-block text-danger">{companyAddFormik.errors.remind_before}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <CFormGroup variant="custom-checkbox" inline style={{ marginTop: '58px !important' }} id='compay_add_show_caste'>
                        <CInputCheckbox custom id="show_caste" name="show_caste" onChange={(e) => handleShowCaste(e)} />
                        <CLabel variant="custom-checkbox" htmlFor="show_caste">Show caste in Employee Form</CLabel>
                      </CFormGroup>
                    </div>
                  </div>
                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      {/* <CButton type="reset" size="md"  className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton> */}
                      <Link className='ml-3 btn btn-danger' to={'company'}><CIcon name="cil-ban" /> Cancel</Link>
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

export default AddCompany