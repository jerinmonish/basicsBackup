import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CommonGroupList, CommonTypeOfOrgList, CommonCountryList, CommonStateList, CommonCurrencyList, CommonDistrictList } from '../../actions/commonAction';
import { CompanyAdd, CommonEditDetails, CompanyUpdate } from '../../actions/master';
import { useFormik } from 'formik';
import Select from 'react-select';
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { indianDateFormat, convertDateToMDY, convertValueLabel, decryptSingleData } from '../../utils/helper';
import CLoader from '../loader/CLoader';
import CryptoJS from "crypto-js";
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
import { useHistory } from "react-router-dom";

const EditCompany = (props) => {
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

  //To get common details like country, state, group and other common data
  const dropdownData = useSelector(state => state.commonData);

  //To get company details
  const { companyDetails, isLoading } = useSelector(state => state.masterBackend);

  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [imgSelected, setImgSelected] = useState([]);

  //Set Edit Values for Dropdowns
  const [selectGroupName, setSelectGroupName] = useState({});
  const [selectOrganisationName, setSelectOrganisationName] = useState({});
  const [selectCountryName, setSelectCountryName] = useState({});
  const [selectStateName, setSelectStateName] = useState({});
  const [selectDistrictName, setSelectDistrictName] = useState({});
  const [selectCurrencyName, setSelectCurrencyName] = useState({});
  const [selectPayrollCycleName, setSelectPayrollCycleName] = useState({});

  const [countryChangedFlag, setCountryChangedFlag] = useState(0);
  const [stateChangedFlag, setStateChangedFlag] = useState(0);

  const [checkboxstatus, setCheckboxStatus] = useState()


  //To load dropdown predefined data
  useEffect(() => {
    // console.log(decryptSingleData(props?.match?.params?.id));
    if (props?.match?.params?.id) {
      dispatch(CommonEditDetails(decryptSingleData(props?.match?.params?.id)));
    }
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
  // const validate = (values) => {
  //   const errors = {};
  //   if (!values.name) {
  //     errors.name = 'This field is required.';
  //   }
  //   if (!values.group_id) {
  //     errors.group_id = 'This field is required.';
  //   }
  //   if (!values.organization_type_id) {
  //     errors.organization_type_id = 'This field is required.';
  //   }
  //   if (!values.incorporation_date) {
  //     errors.incorporation_date = 'This field is required.';
  //   }
  //   if (!values.registration_no) {
  //     errors.registration_no = 'This field is required.';
  //   }
  //   /*if (!values.logo) {
  //     errors.logo = 'This field is required.';
  //   }*/
  //   if (!values.door_no) {
  //     errors.door_no = 'This field is required.';
  //   }
  //   if (!values.house_name) {
  //     errors.house_name = 'This field is required.';
  //   }
  //   if (!values.street_name) {
  //     errors.street_name = 'This field is required.';
  //   }
  //   if (!values.place_name) {
  //     errors.place_name = 'This field is required.';
  //   }
  //   if (!values.country_id) {
  //     errors.country_id = 'This field is required.';
  //   }
  //   if (!values.state_id) {
  //     errors.state_id = 'This field is required.';
  //   }
  //   if (!values.district_id) {
  //     errors.district_id = 'This field is required.';
  //   }
  //   if (!values.pin_code) {
  //     errors.pin_code = 'This field is required.';
  //   }
  //   if (!values.phone) {
  //     errors.phone = 'This field is required.';
  //   }
  //   if (!values.email) {
  //     errors.email = 'This field is required.';
  //   }
  //   if (!values.website) {
  //     errors.website = 'This field is required.';
  //   }
  //   if (!values.vat) {
  //     errors.vat = 'This field is required.';
  //   }
  //   if (!values.company_registry) {
  //     errors.company_registry = 'This field is required.';
  //   }
  //   if (!values.currency_id) {
  //     errors.currency_id = 'This field is required.';
  //   }
  //   if (!values.epf_start_date) {
  //     errors.epf_start_date = 'This field is required.';
  //   }
  //   if (!values.epf_employer_code) {
  //     errors.epf_employer_code = 'This field is required.';
  //   }
  //   if (!values.employer_pan_no) {
  //     errors.employer_pan_no = 'This field is required.';
  //   }
  //   if (!values.esi_start_date) {
  //     errors.esi_start_date = 'This field is required.';
  //   }
  //   if (!values.esi_employer_code) {
  //     errors.esi_employer_code = 'This field is required.';
  //   }
  //   if (!values.payroll_cycle) {
  //     errors.payroll_cycle = 'This field is required.';
  //   }
  //   if (!values.monthly_process_date) {
  //     errors.monthly_process_date = 'This field is required.';
  //   }
  //   if (!values.remind_before) {
  //     errors.remind_before = 'This field is required.';
  //   }
  //   return errors;
  // };

  //Company Edit Form Initilization
  const companyUpdateFormik = useFormik({
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
    // validate,
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": values } });
      dispatch(CompanyUpdate(formData, history, decryptSingleData(props?.match?.params?.id)));
    },
  });

  //To set Dristrict data in dropdown
  const selectDistrictRef = useRef();
  useEffect(() => {
    if (stateChangedFlag) {
      if (dropdownData?.districtCommonData?.data?.result) {
        setSelectDistrictName(convertValueLabel([]));
        onDistrictClear();
        setDistrictOptions(dropdownData?.districtCommonData?.data?.result)
      }
    } else {
      if (companyDetails?.data?.district_id_list) {
        setDistrictOptions(companyDetails?.data?.district_id_list)
      }
    }
  }, [companyDetails?.data?.district_id_list, districtOptions, stateChangedFlag, dropdownData?.districtCommonData?.data?.result]);

  //To set State data in dropdown
  const selectStateRef = useRef();
  useEffect(() => {
    if (countryChangedFlag) {
      if (dropdownData?.stateCommonData?.data?.result) {
        // setSelectDistrictName(convertValueLabel([]));
        onDistrictClear();
        setSelectStateName(convertValueLabel([]));
        onStateClear();
        setStateOptions(dropdownData?.stateCommonData?.data?.result)
      }
    } else {
      if (companyDetails?.data?.state_id_list) {
        // setSelectDistrictName(convertValueLabel([]));
        onDistrictClear();
        onStateClear();
        setStateOptions(companyDetails?.data?.state_id_list)
      }
    }
  }, [companyDetails?.data?.state_id_list, stateOptions, countryChangedFlag, dropdownData?.stateCommonData?.data?.result]);

  useEffect(() => {

    console.log("companyDetails?.data", companyDetails?.data?.show_caste);
    setCheckboxStatus(companyDetails?.data?.show_caste)
    if (companyDetails?.data !== null) {
      companyUpdateFormik.setValues({
        "name": companyDetails?.data?.name,
        "group_id": companyDetails?.data?.group_id,
        "organization_type_id": companyDetails?.data?.organization_type_id,
        //"logo":companyDetails?.data?.logo,
        "registration_no": companyDetails?.data?.registration_no,
        "incorporation_date": indianDateFormat(companyDetails?.data?.incorporation_date),
        "door_no": companyDetails?.data?.door_no,
        "house_name": companyDetails?.data?.house_name,
        "street_name": companyDetails?.data?.street_name,
        "place_name": companyDetails?.data?.pin_code,
        "country_id": companyDetails?.data?.country_id,
        "state_id": companyDetails?.data?.state_id,
        district_id: companyDetails?.data?.district_id,
        "pin_code": companyDetails?.data?.pin_code,
        "phone": companyDetails?.data?.phone,
        "email": companyDetails?.data?.email,
        "website": companyDetails?.data?.website,
        "vat": companyDetails?.data?.vat,
        "company_registry": companyDetails?.data?.company_registry,
        "currency_id": companyDetails?.data?.currency_id,
        "epf_start_date": indianDateFormat(companyDetails?.data?.epf_start_date),
        "esi_start_date": indianDateFormat(companyDetails?.data?.esi_start_date),
        "monthly_process_date": indianDateFormat(companyDetails?.data?.monthly_process_date),
        "epf_employer_code": companyDetails?.data?.epf_employer_code,
        "esi_employer_code": companyDetails?.data?.esi_employer_code,
        "employer_pan_no": companyDetails?.data?.employer_pan_no,
        "payroll_cycle": companyDetails?.data?.payroll_cycle,
        "show_caste": companyDetails?.data?.show_caste,
        "remind_before": companyDetails?.data?.remind_before,
      });
    }
    if (isLoading === false && companyDetails?.data !== undefined && companyDetails?.data !== null) {
      //Update values to all the dropdowns
      setSelectGroupName(convertValueLabel(companyDetails?.data?.group_id, companyDetails?.data?.group_id_name));
      setSelectOrganisationName(convertValueLabel(companyDetails?.data?.organization_type_id, companyDetails?.data?.organization_type_id_name));
      setSelectCountryName(convertValueLabel(companyDetails?.data?.country_id, companyDetails?.data?.country_id_name));
      setSelectStateName(convertValueLabel(companyDetails?.data?.state_id, companyDetails?.data?.state_id_name));
      setSelectDistrictName(convertValueLabel(companyDetails?.data?.district_id, companyDetails?.data?.district_id_name));
      setSelectCurrencyName(convertValueLabel(companyDetails?.data?.currency_id, companyDetails?.data?.currency_id_name));
      setSelectPayrollCycleName(convertValueLabel(companyDetails?.data?.payroll_cycle, companyDetails?.data?.payroll_cycle_label));

      //Update values of all dates to particular date fields
      if (companyDetails?.data?.incorporation_date) {
        setDateOfInc(moment(new Date(convertDateToMDY(companyDetails?.data?.incorporation_date))));
      }
      if (companyDetails?.data?.epf_start_date) {
        setDateEpfSt(moment(new Date(convertDateToMDY(companyDetails?.data?.epf_start_date))));
      }
      if (companyDetails?.data?.esi_start_date) {
        setDateEsiSt(moment(new Date(convertDateToMDY(companyDetails?.data?.esi_start_date))));
      }
      if (companyDetails?.data?.monthly_process_date) {
        setDateMtps(moment(new Date(convertDateToMDY(companyDetails?.data?.monthly_process_date))));
      }
    }
  }, [isLoading, companyDetails?.data])

  //To Clear the selected values
  const onStateClear = () => {
    selectStateRef?.current?.select?.clearValue();
  };

  const onDistrictClear = () => {
    selectDistrictRef?.current?.select?.clearValue();
  };

  const handleDateOfInc = (date) => {
    if (date) {
      setDateOfInc(date)
      companyUpdateFormik.setFieldValue('incorporation_date', indianDateFormat(date._d));
    }
  }

  const handleEpfDate = (date) => {
    if (date) {
      setDateEpfSt(date)
      companyUpdateFormik.setFieldValue('epf_start_date', indianDateFormat(date._d));
    }
  }

  const handleEsiDate = (date) => {
    if (date) {
      setDateEsiSt(date)
      companyUpdateFormik.setFieldValue('esi_start_date', indianDateFormat(date._d));
    }
  }

  const handleMonthlyProcessDate = (date) => {
    if (date) {
      setDateMtps(date)
      companyUpdateFormik.setFieldValue('monthly_process_date', indianDateFormat(date._d));
    }
  }

  const groupNameSetSelected = (value) => {
    companyUpdateFormik.setFieldValue('group_id', value.value);
    setSelectGroupName(convertValueLabel(value.value, value.label))
  }

  const organisationNameSetSelected = (value) => {
    companyUpdateFormik.setFieldValue('organization_type_id', value.value);
    setSelectOrganisationName(convertValueLabel(value.value, value.label))
  }

  const countryNameSetSelected = (value) => {
    companyUpdateFormik.setFieldValue('country_id', value.value);
    setSelectCountryName(convertValueLabel(value.value, value.label))
    dispatch(CommonStateList(value.value));
    setCountryChangedFlag(1);
  }

  const handleStateChange = (e) => {
    if (e?.value) {
      setSelectStateName(convertValueLabel(e?.value, e?.label))
      companyUpdateFormik.setFieldValue('state_id', e?.value);
      dispatch(CommonDistrictList(e.value));
      setStateChangedFlag(1);
    }
  }

  const handleDistrictChange = (e) => {
    if (e?.value) {
      setSelectDistrictName(convertValueLabel(e?.value, e?.label))
      companyUpdateFormik.setFieldValue('district_id', e.value);
    }
  }

  const currencyNameSetSelected = (value) => {
    companyUpdateFormik.setFieldValue('currency_id', value.value);
    setSelectCurrencyName(convertValueLabel(value.value, value.label))
  }

  const payrollCycleNameSetSelected = (value) => {
    companyUpdateFormik.setFieldValue('payroll_cycle', value.value);
    setSelectPayrollCycleName(convertValueLabel(value.value, value.label))
  }

  //Handle show caste checkbox
  const handleShowCaste = (e) => {

    setCheckboxStatus([])

    if (e.target.checked == true) {
      setCheckboxStatus(true)
      companyUpdateFormik.setFieldValue('show_caste', 1);
    } else {
      companyUpdateFormik.setFieldValue('show_caste', 0);
    }
  }

  const handleLogoChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: companyUpdateFormik.setFieldValue("logo", event.target.result),
      })
    }
  }

  const handleimageFile = (e) => {
    window.open(companyDetails?.data?.logo)
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
                      <strong> Edit Company </strong>
                    </CCol>
                    {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={`master/company`}>List Company</Link>
                </CCol> */}
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={companyUpdateFormik.handleSubmit} className="form-horizontal">
                    <div>
                      <h4>Company Details</h4>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Company Name <span className='error'>*</span></label>
                          <input type="text" name='name' value={companyUpdateFormik.values.name} className="form-control" placeholder='Company Name' maxLength={25} onChange={companyUpdateFormik.handleChange} />
                          {companyUpdateFormik.errors.name ? <div className="help-block text-danger">{companyUpdateFormik.errors.name}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Group Name'}
                            value={selectGroupName}
                            // defaultValue={companyDetails?.data?.group_id}
                            // isDisabled={isDisabled}
                            // isLoading={isLoading}
                            // isClearable={isClearable}
                            // isRtl={isRtl}
                            // isSearchable={isSearchable}
                            id="group_id"
                            name="group_id"
                            options={groupOptions}
                            // onChange={({ value }) => companyUpdateFormik.setFieldValue('group_id', value)}
                            onChange={(value) => groupNameSetSelected(value)}
                          />
                          {companyUpdateFormik.errors.group_id ? <div className="help-block text-danger">{companyUpdateFormik.errors.group_id}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Type of Organization <span className='error'>*</span></label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Type of Organization'}
                            value={selectOrganisationName}
                            name="organization_type_id"
                            options={typeOfOrganisationOptions}
                            onChange={(value) => organisationNameSetSelected(value)}
                          />
                          {companyUpdateFormik.errors.organization_type_id ? <div className="help-block text-danger">{companyUpdateFormik.errors.organization_type_id}</div> : null}
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
                            placeholder='Date of Incorportation'
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
                          {companyUpdateFormik.errors.incorporation_date ? <div className="help-block text-danger">{companyUpdateFormik.errors.incorporation_date}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Registration Number <span className='error'>*</span></label>
                          <input type="text" name='registration_no' value={companyUpdateFormik.values.registration_no} className="form-control" placeholder='Registration Number' maxLength={25} onChange={companyUpdateFormik.handleChange} />
                          {companyUpdateFormik.errors.registration_no ? <div className="help-block text-danger">{companyUpdateFormik.errors.registration_no}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Company Logo <span className='error'>*</span></label>
                          <input type="file" name='logo' className="form-control" onChange={(event) => { handleLogoChange(event) }} accept="image/png, image/jpeg, image/jpg" />
                          {/* {companyUpdateFormik.errors.logo ? <div className="help-block text-danger">{companyUpdateFormik.errors.logo}</div> : null} */}
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Existing Logo </label>
                          {/* {to = {`/${companyDetails?.data?.logo}`} } */}

                          <label className='ml-2'>
                            <img onClick={(e) => { handleimageFile(e) }} src={`${companyDetails?.data?.logo}`} title={`${companyDetails?.data?.name}`} alt={`${companyDetails?.data?.name}`} height={60} width={60} />
                          </label>
                        </div>
                      </div>
                      <hr />
                      <h4>General Informations</h4>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                          <input type="text" name='door_no' value={companyUpdateFormik.values.door_no} className="form-control" placeholder='Door No' maxLength={25} onChange={companyUpdateFormik.handleChange} />
                          {companyUpdateFormik.errors.door_no ? <div className="help-block text-danger">{companyUpdateFormik.errors.door_no}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                          <input type="text" name='house_name' value={companyUpdateFormik.values.house_name} className="form-control" placeholder='House/Apartment Name' maxLength={25} onChange={companyUpdateFormik.handleChange} />
                          {companyUpdateFormik.errors.house_name ? <div className="help-block text-danger">{companyUpdateFormik.errors.house_name}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                          <input type="text" name='street_name' value={companyUpdateFormik.values.street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={companyUpdateFormik.handleChange} />
                          {companyUpdateFormik.errors.street_name ? <div className="help-block text-danger">{companyUpdateFormik.errors.street_name}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                          <input type="text" name='place_name' value={companyUpdateFormik.values.place_name} className="form-control" placeholder='Place Name' maxLength={25} onChange={companyUpdateFormik.handleChange} />
                          {companyUpdateFormik.errors.place_name ? <div className="help-block text-danger">{companyUpdateFormik.errors.place_name}</div> : null}
                        </div>

                      </div>
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Country <span className='error'>*</span></label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            value={selectCountryName}
                            name="country_id"
                            options={countryOptions}
                            placeholder={'Choose a Country'}
                            onChange={(value) => countryNameSetSelected(value)}
                          />
                          {companyUpdateFormik.errors.country_id ? <div className="help-block text-danger">{companyUpdateFormik.errors.country_id}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">State <span className='error'>*</span></label>
                          <Select
                            ref={selectStateRef}
                            className="basic-single"
                            classNamePrefix="select"
                            value={selectStateName}
                            name="state_id"
                            options={stateOptions}
                            placeholder={'Choose a State'}
                            onChange={(e) => handleStateChange(e)}
                          />
                          {companyUpdateFormik.errors.state_id ? <div className="help-block text-danger">{companyUpdateFormik.errors.state_id}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">District <span className='error'>*</span></label>
                          <Select
                            ref={selectDistrictRef}
                            className="basic-single"
                            classNamePrefix="select"
                            // value={selectDistrictName}
                            value={selectDistrictName}
                            name="district_id"
                            options={districtOptions}
                            placeholder={'Choose a District'}
                            onChange={(e) => handleDistrictChange(e)}
                          />
                          {companyUpdateFormik.errors.district_id ? <div className="help-block text-danger">{companyUpdateFormik.errors.district_id}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Zip <span className='error'>*</span></label>
                          <input type="text" name='pin_code' value={companyUpdateFormik.values.pin_code} onChange={companyUpdateFormik.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                          {companyUpdateFormik.errors.pin_code ? <div className="help-block text-danger">{companyUpdateFormik.errors.zpin_codeip}</div> : null}
                        </div>

                      </div>

                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Phone <span className='error'>*</span></label>
                          <input type="text" name='phone' value={companyUpdateFormik.values.phone} onChange={companyUpdateFormik.handleChange} className="form-control" placeholder='Phone' maxLength={20} />
                          {companyUpdateFormik.errors.phone ? <div className="help-block text-danger">{companyUpdateFormik.errors.phone}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                          <input type="text" name='email' value={companyUpdateFormik.values.email} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='Email' maxLength={50} />
                          {companyUpdateFormik.errors.email ? <div className="help-block text-danger">{companyUpdateFormik.errors.email}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Website <span className='error'>*</span></label>
                          <input type="text" name='website' value={companyUpdateFormik.values.website} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='Website' maxLength={120} />
                          {companyUpdateFormik.errors.website ? <div className="help-block text-danger">{companyUpdateFormik.errors.website}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Tax ID <span className='error'>*</span></label>
                          <input type="text" name='vat' value={companyUpdateFormik.values.vat} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='Tax ID' maxLength={50} />
                          {companyUpdateFormik.errors.vat ? <div className="help-block text-danger">{companyUpdateFormik.errors.vat}</div> : null}
                        </div>

                      </div>
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Company Registry <span className='error'>*</span></label>
                          <input type="text" name='company_registry' value={companyUpdateFormik.values.company_registry} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='Company Registry' maxLength={50} />
                          {companyUpdateFormik.errors.company_registry ? <div className="help-block text-danger">{companyUpdateFormik.errors.company_registry}</div> : null}
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Currency <span className='error'>*</span></label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            value={selectCurrencyName}
                            name="currency_id"
                            options={currencyOptions}
                            placeholder={'Choose a Currency'}
                            onChange={(value) => currencyNameSetSelected(value)}
                          />
                          {companyUpdateFormik.errors.currency_id ? <div className="help-block text-danger">{companyUpdateFormik.errors.currency_id}</div> : null}
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
                      {companyUpdateFormik.errors.parent_company ? <div className="help-block text-danger">{companyUpdateFormik.errors.parent_company}</div> : null}
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
                          {companyUpdateFormik.errors.epf_start_date ? <div className="help-block text-danger">{companyUpdateFormik.errors.epf_start_date}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">EPF Employer Code	<span className='error'>*</span></label>
                          <input type="text" name='epf_employer_code' value={companyUpdateFormik.values.epf_employer_code} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='EPF Employer Code' maxLength={30} />
                          {companyUpdateFormik.errors.epf_employer_code ? <div className="help-block text-danger">{companyUpdateFormik.errors.epf_employer_code}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Employer PAN Number <span className='error'>*</span></label>
                          <input type="text" name='employer_pan_no' value={companyUpdateFormik.values.employer_pan_no} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='Employer PAN Number' maxLength={30} />
                          {companyUpdateFormik.errors.employer_pan_no ? <div className="help-block text-danger">{companyUpdateFormik.errors.employer_pan_no}</div> : null}
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
                          {companyUpdateFormik.errors.esi_start_date ? <div className="help-block text-danger">{companyUpdateFormik.errors.esi_start_date}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">ESI Employer Code	<span className='error'>*</span></label>
                          <input type="text" name='esi_employer_code' value={companyUpdateFormik.values.esi_employer_code} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='ESI Employer Code' maxLength={500} />
                          {companyUpdateFormik.errors.esi_employer_code ? <div className="help-block text-danger">{companyUpdateFormik.errors.esi_employer_code}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Payroll Cycle <span className='error'>*</span></label>
                          <Select
                            name="payroll_cycle"
                            onChange={(value) => payrollCycleNameSetSelected(value)}
                            options={[{ 'value': "weekly", 'label': "Weekly" }, { 'value': "bi_weekly", 'label': "Bi-Weekly" }, { 'value': "monthly", 'label': "Monthly" }]}
                            value={selectPayrollCycleName}
                          />
                          {companyUpdateFormik.errors.payroll_cycle ? <div className="help-block text-danger">{companyUpdateFormik.errors.payroll_cycle}</div> : null}
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
                          {companyUpdateFormik.errors.monthly_process_date ? <div className="help-block text-danger">{companyUpdateFormik.errors.monthly_process_date}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Remind the candidate Before (Recruitment)	<span className='error'>*</span></label>
                          <input type="number" name='remind_before' value={companyUpdateFormik.values.remind_before} onChange={companyUpdateFormik.handleChange} className='form-control' placeholder='Remind the candidate Before' maxLength={3} />
                          {companyUpdateFormik.errors.remind_before ? <div className="help-block text-danger">{companyUpdateFormik.errors.remind_before}</div> : null}
                        </div>
                        <div className="col-md-4">
                          {/* checked={companyDetails?.data?.show_caste == 1 ? true : false} */}
                          <CFormGroup variant="custom-checkbox" inline style={{ marginTop: '58px !important' }} id='compay_add_show_caste'>
                            <CInputCheckbox custom id="show_caste" name="show_caste" checked={checkboxstatus == true ? true : false} onChange={(e) => handleShowCaste(e)} />
                            <CLabel variant="custom-checkbox" htmlFor="show_caste">Show caste in Employee Form</CLabel>
                          </CFormGroup>
                        </div>
                      </div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className='col-md-10' align="center" >
                          <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                          <Link className='ml-3 btn btn-danger' to={'/master/company'}><CIcon name="cil-ban" /> Cancel</Link>
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

export default EditCompany