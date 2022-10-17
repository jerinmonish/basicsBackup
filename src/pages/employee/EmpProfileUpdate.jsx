import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decryptSingleData, userLocalDecryptData, convertValueLabel, indianDateFormat, convertDateToMDY } from '../../../src/utils/helper';
import { CommonUnauthenticatedCountryList, CommonUnauthenticatedStateList, CommonUnauthenticatedDistrictList, CommonUnauthenticatedCountryList2, CommonUnauthenticatedStateList2, CommonUnauthenticatedDistrictList2 } from 'src/actions/commonAction';
import { GetEmployeeByIdForSelfUpdateAPI, EmployeeUpdatePersonalSelfAPI, EmployeeUpdatePersonalSelfAPIStatus } from 'src/actions/master';
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CContainer,
  CFade,
  CForm,
  CCardFooter,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CCollapse,
  CCardHeader,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CInputRadio,
  CInputGroup,
  CInput,
  CInputGroupText,
} from "@coreui/react";
import { useFormik } from 'formik'
import Select from "react-select";
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import { EmployeeAddAPI, EmployeeUpdateAPI, EmployeeEditSelfAPI } from 'src/actions/master';
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import 'react-toastify/dist/ReactToastify.css'
import * as constants from '../../actions/types'
import { useHistory } from "react-router-dom";
import CLoader from 'src/pages/loader/CLoader';
import ExistingCareerOnBo1 from "../career/ExistingCareer/ExistingCareerOnBo1";
import ExistingCareerOnBo2 from "../career/ExistingCareer/ExistingCareerOnBo2";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';

const EmpProfileUpdate = (props) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { employeeAddDetails, employeeViewDetails, isLoading, success, error } = useSelector((state) => state.masterBackend);

  const empData = userLocalDecryptData();
  const dropdownData = useSelector((state) => state.commonData)

  const [marriageStatus, setMarriageStatus] = useState([]);
  const [maritalOptions, setMaritalOptions] = useState([{ value: 'single', label: 'Single' }, { value: 'bachelor', label: 'Bachelor' }, { value: 'spinster', label: 'Spinster' }, { value: 'married', label: 'Married' }, { value: 'widower', label: 'Widower' }, { value: 'divorced', label: 'Divorced' }]);
  const [hideMaritalStatus, setHideMaritalStatus] = useState(0);

  // console.log(dropdownData);
  const [curCountry, setCurCountry] = useState([]);
  const [curState, setCurState] = useState([]);
  const [curDistict, setCurDistict] = useState([]);
  const [perCountry, setPerCountry] = useState([]);
  const [perState, setPerState] = useState([]);
  const [perDistict, setPerDistict] = useState([]);

  //Dropdown Label Data
  const [curStateName, setCurStateName] = useState([]);
  const [curDistrictName, setCurDistrictName] = useState([]);
  const [perStateName, setPerStateName] = useState([]);
  const [perDistrictName, setPerDistrictName] = useState([]);

  const [famData, setFamData] = useState([]);
  const [eduData, setEduData] = useState([]);

  const [dateOfMarriage, setdateOfMarriage] = useState(null);
  const [focusOfMarriage, setfocusOfMarriage] = useState(false);

  const [spouseDob, setspouseDob] = useState(null);
  const [focusofSpouseDob, setfocusofSpouseDob] = useState(false);
  const [spouseNamesett, setSpouseNamesett] = useState('');
  const [sameAsCurrentChe, setSameAsCurrentChe] = useState(0);

  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  useEffect(() => {
    if (success == "employee update success") {
      history.push('/employee/self-update-list');
    }
  }, [success])

  useEffect(() => {
    dispatch(CommonUnauthenticatedCountryList());
  }, [])
  useEffect(() => {
    if (dropdownData?.uaStateCommonData?.data?.result) {
      setCurState(dropdownData?.uaStateCommonData?.data?.result)
    }
  }, [dropdownData?.uaStateCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.uaDistrictCommonData?.data?.result) {
      setCurDistict(dropdownData?.uaDistrictCommonData?.data?.result)
    }
  }, [dropdownData?.uaDistrictCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      setPerState(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      setPerDistict(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result]);

  const selectCurStateRef = useRef();
  const onCurCountryClear = () => {
    selectCurStateRef.current.select.clearValue();
    setCurStateName(convertValueLabel());
  };

  const selectCurDistictRef = useRef();
  const onCurStateClear = () => {
    selectCurDistictRef.current.select.clearValue();
    setCurDistrictName(convertValueLabel());
    setCurDistict(convertValueLabel());
  };

  const selectPerStateRef = useRef();
  const onPerCountryClear = () => {
    selectPerStateRef.current.select.clearValue();
    setPerStateName(convertValueLabel());
  };

  const selectPerDistictRef = useRef();
  const onPerStateClear = () => {
    selectPerDistictRef.current.select.clearValue();
    setPerDistrictName(convertValueLabel());
    setPerDistict(convertValueLabel());
  };

  const handleCurrentCountry = (e) => {
    if (e?.value) {
      setCurCountry(convertValueLabel(e.value, e.label));
      empProfUpdate.setFieldValue('cur_country_id', e.value);
      dispatch(CommonUnauthenticatedStateList(e.value));
      onCurCountryClear();
      onCurStateClear();
    }
  }

  const handleCurrentState = (e) => {
    if (e?.value) {
      setCurStateName(convertValueLabel(e.value, e.label));
      empProfUpdate.setFieldValue('cur_state_id', e.value);
      dispatch(CommonUnauthenticatedDistrictList(e.value));
      onCurStateClear();
    }
  }

  const handleCurrentDistrict = (e) => {
    if (e?.value) {
      setCurDistrictName(convertValueLabel(e.value, e.label));
      empProfUpdate.setFieldValue('cur_district_id', e.value);
    }
  }

  const handlePermanentCountry = (e) => {
    if (e?.value) {
      setPerCountry(convertValueLabel(e.value, e.label));
      empProfUpdate.setFieldValue('country_id', e.value);
      dispatch(CommonUnauthenticatedStateList2(e.value));
      onPerCountryClear();
      onPerStateClear();
    }
  }

  const handlePermanentState = (e) => {
    if (e?.value) {
      setPerStateName(convertValueLabel(e.value, e.label));
      empProfUpdate.setFieldValue('state_id', e.value);
      dispatch(CommonUnauthenticatedDistrictList2(e.value));
      onPerStateClear();
    }
  }

  const handlePermanentDistrict = (e) => {
    if (e?.value) {
      setPerDistrictName(convertValueLabel(e.value, e.label));
      empProfUpdate.setFieldValue('district_id', e.value);
    }
  }

  const markasCurrentAddress = (e) => {
    //console.log(empProfUpdate?.values,curCountry);
    if (e.target.checked == true) {
      setSameAsCurrentChe(1);
      empProfUpdate.setFieldValue("door_no", empProfUpdate?.values?.cur_door_no)
      empProfUpdate.setFieldValue("house_name", empProfUpdate?.values?.cur_house_name)
      empProfUpdate.setFieldValue("street_name", empProfUpdate?.values?.cur_street_name)
      empProfUpdate.setFieldValue("place_name", empProfUpdate?.values?.cur_place_name)
      empProfUpdate.setFieldValue("pin_code", empProfUpdate?.values?.cur_pin_code)
      if (empProfUpdate?.values?.cur_country_id) {
        empProfUpdate.setFieldValue("country_id", empProfUpdate?.values?.cur_country_id)
        setPerCountry(convertValueLabel(curCountry?.value, curCountry.label));
      }

      if (empProfUpdate?.values?.cur_state_id) {
        empProfUpdate.setFieldValue("state_id", empProfUpdate?.values?.cur_state_id)
        setPerStateName(convertValueLabel(curStateName?.value, curStateName.label));
      }

      if (empProfUpdate?.values?.cur_district_id) {
        empProfUpdate.setFieldValue("district_id", empProfUpdate?.values?.cur_district_id)
        setPerDistrictName(convertValueLabel(curDistrictName?.value, curDistrictName.label));
      }
    } else {
      setSameAsCurrentChe(0);
      empProfUpdate.setFieldValue("door_no", "")
      empProfUpdate.setFieldValue("house_name", "")
      empProfUpdate.setFieldValue("street_name", "")
      empProfUpdate.setFieldValue("place_name", "")
      empProfUpdate.setFieldValue("pin_code", "")
      empProfUpdate.setFieldValue("country_id", "")
      setPerCountry(convertValueLabel());
      empProfUpdate.setFieldValue("state_id", "")
      setPerStateName(convertValueLabel());
      empProfUpdate.setFieldValue("district_id", "")
      setPerDistrictName(convertValueLabel());
    }
  }

  //To get employee data if exists
  useEffect(() => {
    if (props?.match.params.id) {
      if (props?.match?.params?.status == "create") {
        dispatch(GetEmployeeByIdForSelfUpdateAPI(decryptSingleData(props?.match.params.id)));
      } else if (props?.match?.params?.status == "edit") {
        dispatch(EmployeeEditSelfAPI(decryptSingleData(props?.match.params.id)));
      }
    } else {
      dispatch({
        type: constants.EMPLOYEE_VIEW_ERROR,
      })
    }
  }, [props?.match.params.id])

  const handleMaritalStatusChange = (e) => {
    if (e?.value) {
      empProfUpdate.setFieldValue('marital', e.value);
      setMarriageStatus(convertValueLabel(e.value, e.label));
      if (e?.value === "married") {
        setHideMaritalStatus(1);
      } else {
        setdateOfMarriage(null);
        setspouseDob(null);
        setSpouseNamesett("");
        setHideMaritalStatus(0);
      }
    }
  }

  const handledateOfMarriage = (date) => {
    if (date) {
      setdateOfMarriage(date)
      empProfUpdate.setFieldValue('marriage_date', indianDateFormat(date._d));
    }
  }

  const handlespouseDob = (date) => {
    if (date) {
      setspouseDob(date)
      empProfUpdate.setFieldValue('spouse_birthdate', indianDateFormat(date._d));
    }
  }

  const handlespouseName = (e) => {
    if (e.target.value) {
      setSpouseNamesett(e.target.value);
      empProfUpdate.setFieldValue('spouse_complete_name', e.target.value);
    }
  }


  //Update Data  
  useEffect(() => {
    if (employeeViewDetails?.data !== null) {

      empProfUpdate.setValues({
        "name": employeeViewDetails?.data?.name,
        "emergency_contact": employeeViewDetails?.data?.emergency_contact,
        "emergency_contact_person": employeeViewDetails?.data?.emergency_contact_person,
        "spouse_complete_name": employeeViewDetails?.data?.spouse_complete_name,
        "marital": employeeViewDetails?.data?.marital,
        "marriage_date": employeeViewDetails?.data?.marriage_date ? indianDateFormat(employeeViewDetails?.data?.marriage_date) : null,
        "spouse_birthdate": employeeViewDetails?.data?.spouse_birthdate ? indianDateFormat(employeeViewDetails?.data?.spouse_birthdate) : null,
        "door_no": employeeViewDetails?.data?.door_no,
        "house_name": employeeViewDetails?.data?.house_name,
        "street_name": employeeViewDetails?.data?.street_name,
        "place_name": employeeViewDetails?.data?.place_name,
        "country_id": employeeViewDetails?.data?.country_id,
        "district_id": employeeViewDetails?.data?.district_id,
        "state_id": employeeViewDetails?.data?.state_id,
        "pin_code": employeeViewDetails?.data?.pin_code,
        "cur_door_no": employeeViewDetails?.data?.cur_door_no,
        "cur_house_name": employeeViewDetails?.data?.cur_house_name,
        "cur_street_name": employeeViewDetails?.data?.cur_street_name,
        "cur_place_name": employeeViewDetails?.data?.cur_place_name,
        "cur_country_id": employeeViewDetails?.data?.cur_country_id,
        "cur_state_id": employeeViewDetails?.data?.cur_state_id,
        "cur_district_id": employeeViewDetails?.data?.cur_district_id,
        "cur_pin_code": employeeViewDetails?.data?.cur_pin_code,
      });

      if (employeeViewDetails?.data?.spouse_complete_name) {
        setSpouseNamesett(employeeViewDetails?.data?.spouse_complete_name);
      }

      if (employeeViewDetails?.data?.marital) {
        setMarriageStatus(convertValueLabel(employeeViewDetails?.data?.marital, employeeViewDetails?.data?.marital_label));
      }
      if (employeeViewDetails?.data?.marital === "married") {
        setHideMaritalStatus(1);
      } else {
        setHideMaritalStatus(0);
      }

      if (employeeViewDetails?.data?.marriage_date) {
        setdateOfMarriage(moment(new Date(convertDateToMDY(employeeViewDetails?.data?.marriage_date))));
      }
      if (employeeViewDetails?.data?.spouse_birthdate) {
        setspouseDob(moment(new Date(convertDateToMDY(employeeViewDetails?.data?.spouse_birthdate))));
      }

      setCurCountry(convertValueLabel(employeeViewDetails?.data?.cur_country_id, employeeViewDetails?.data?.cur_country_id_name));
      if (employeeViewDetails?.data?.cur_state_id_list) {
        setCurState(employeeViewDetails?.data?.cur_state_id_list)
      }
      setCurStateName(convertValueLabel(employeeViewDetails?.data?.cur_state_id, employeeViewDetails?.data?.cur_state_id_name));
      setCurDistrictName(convertValueLabel(employeeViewDetails?.data?.cur_district_id, employeeViewDetails?.data?.cur_district_id_name));
      if (employeeViewDetails?.data?.cur_district_id_list) {
        setCurDistict(employeeViewDetails?.data?.cur_district_id_list)
      }
      setPerCountry(convertValueLabel(employeeViewDetails?.data?.country_id, employeeViewDetails?.data?.country_id_name));
      if (employeeViewDetails?.data?.state_id_list) {
        setPerState(employeeViewDetails?.data?.state_id_list)
      }
      if (employeeViewDetails?.data?.district_id_list) {
        setPerDistict(employeeViewDetails?.data?.district_id_list)
      }
      setPerStateName(convertValueLabel(employeeViewDetails?.data?.state_id, employeeViewDetails?.data?.state_id_name));
      setPerDistrictName(convertValueLabel(employeeViewDetails?.data?.district_id, employeeViewDetails?.data?.district_id_name));
      if (employeeViewDetails?.data?.same_as_current == true) {
        setSameAsCurrentChe(1);
      } else {
        setSameAsCurrentChe(0);
      }

      if (employeeViewDetails?.data?.family_member_ids?.length > 0) {
        // console.log(employeeViewDetails?.data?.family_member_ids);
        let tempFamData = employeeViewDetails?.data?.family_member_ids.map(({ id, name, birthday, gender, gender_label, relationship_id, relationship_id_name, phone }) => ({ id: id ? id : '', name: name ? name : '', birthday: birthday ? birthday : '', gender: gender ? gender : '', gender_label: gender_label ? gender_label : '', relationship_id: relationship_id ? relationship_id : '', relationship_label: relationship_id_name ? relationship_id_name : '', phone: phone ? phone : '' }))
        setFamData(tempFamData);
      }

      if (employeeViewDetails?.data?.education_ids?.length > 0) {
        let tempWorkData = employeeViewDetails?.data?.education_ids.map(({ id, attachment, attachment_name, board_or_university, institution, mode, mode_label, note, program_id, program_id_name, result, study_level_id, study_level_id_name, year_of_passing, year_of_passing_label }) => ({ id: id ? id : '', attachment: attachment ? attachment : '', attachment_name: attachment_name ? attachment_name : '', board_or_university: board_or_university ? board_or_university : '', institution: institution ? institution : '', mode: mode ? mode : '', mode_label: mode_label ? mode_label : '', note: note ? note : '', program_id: program_id ? program_id : '', program_id_label: program_id_name ? program_id_name : '', result: result ? result : '', study_level_id: study_level_id ? study_level_id : '', study_level_id_label: study_level_id_name ? study_level_id_name : '', year_of_passing: year_of_passing ? year_of_passing : '', year_of_passing_label: year_of_passing_label ? year_of_passing_label : '' }))
        setEduData(tempWorkData);
      }
    }
  }, [employeeViewDetails?.data])

  const empProfUpdate = useFormik({
    initialValues: {
      name: '',
      emergency_contact: '',
      emergency_contact_person: '',
      marital: '',
      marriage_date: '',
      spouse_birthdate: '',
      cur_country_id: '',
      cur_state_id: '',
      cur_district_id: '',
      cur_pin_code: '',
      country_id: '',
      state_id: '',
      district_id: '',
      pin_code: '',
      cur_door_no: '',
      cur_house_name: '',
      cur_street_name: '',
      cur_place_name: '',
      door_no: '',
      house_name: '',
      street_name: '',
      place_name: '',
      employee_id: decryptSingleData(props?.match.params.id),
    },
    validationSchema: Yup.object({
      //name: Yup.string().required('This field is required'),
      emergency_contact: Yup.number().typeError("That doesn't look like a mobile number").required('This field is required'),
      emergency_contact_person: Yup.string().required('This field is required'),
      marital: Yup.string().required('This field is required'),
      cur_country_id: Yup.string().required('This field is required'),
      cur_state_id: Yup.string().required('This field is required'),
      cur_district_id: Yup.string().required('This field is required'),
      cur_pin_code: Yup.string().required('This field is required'),
      country_id: Yup.string().required('This field is required'),
      state_id: Yup.string().required('This field is required'),
      district_id: Yup.string().required('This field is required'),
      pin_code: Yup.string().required('This field is required'),
      cur_door_no: Yup.string().required('This field is required'),
      cur_house_name: Yup.string().required('This field is required'),
      cur_street_name: Yup.string().required('This field is required'),
      cur_place_name: Yup.string().required('This field is required'),
      door_no: Yup.string().required('This field is required'),
      house_name: Yup.string().required('This field is required'),
      street_name: Yup.string().required('This field is required'),
      place_name: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      var resulttable1Data = famData.map(({ relationship_label, gender_label, ...tab1Data }) => ({ ...tab1Data }));
      var resulttable2Data = eduData.map(({ study_level_id_label, program_id_label, mode_label, year_of_passing_label, ...tab2Data }) => ({ ...tab2Data }));

      values.family_member_ids = resulttable1Data;
      values.education_ids = resulttable2Data;

      //const formData = JSON.stringify({ params: { data: values } })
      // console.log(formData);
      const fData = {
        "params": {
          "kwargs": {
            "data": values,
            "employee_id": props?.match?.params?.status == "create" ? decryptSingleData(props?.match.params.id) : '',
            "id": props?.match?.params?.status == "edit" ? employeeViewDetails?.data?.id : ''
          }
        }
      }
      dispatch(EmployeeUpdatePersonalSelfAPI(props?.match.params.id, fData));
      /*if (props?.dataEdit?.data?.id) {
        dispatch(EmployeeUpdateAPI(props?.dataEdit?.data?.id, formData))
      } else {
        dispatch(EmployeeAddAPI(formData, history))
      }*/
    },
  });

  const updateEmpStatus = (e) => {
    if (e) {
      dispatch(EmployeeUpdatePersonalSelfAPIStatus(decryptSingleData(props?.match.params.id), e, {}));
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
                      <strong> Employee Self Update </strong>
                      {/* <pre>{JSON.stringify(empProfUpdate, null, 2)}</pre> */}
                      <span style={{ marginRight: (employeeViewDetails?.data?.status_label == 'Draft' || employeeViewDetails?.data?.status_label == 'Approve' || employeeViewDetails?.data?.status_label == 'Requested') ? '115px' : '' }} className="float-right">
                        {
                          (() => {
                            if (employeeViewDetails?.data?.assigned_groups.includes("group_hris_emp_self_update_approve_btn") && employeeViewDetails?.data?.status_label == 'Requested') {
                              return <button className="btn btn-sm btn-primary" onClick={() => updateEmpStatus('approve')}>Approve</button>
                            }
                            if ((empData.employee_id == employeeViewDetails?.data?.employee_id || employeeViewDetails?.data?.assigned_groups.includes("group_hris_emp_self_update_approve_btn")) && (employeeViewDetails?.data?.status_label == 'Draft')) {
                              return <button className="btn btn-sm btn-primary" onClick={() => updateEmpStatus('request_to_update')}>Request</button>
                            }

                          })()
                        }
                      </span>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {
                    (employeeViewDetails?.data?.status_label == 'Draft') ?
                      <div class="ribbon ribbon-top-right">
                        <span style={{ backgroundColor: '#f9b115' }}>Draft</span>
                      </div>
                      : ''
                  }
                  {
                    (employeeViewDetails?.data?.status_label == 'Approved') ?
                      <div class="ribbon ribbon-top-right">
                        <span style={{ backgroundColor: '#2eb85cad' }}>Approved</span>
                      </div>
                      : ''
                  }
                  {
                    (employeeViewDetails?.data?.status_label == 'Requested') ?
                      <div class="ribbon ribbon-top-right">
                        <span style={{ backgroundColor: '#3399ff' }}>Requested</span>
                      </div>
                      : ''
                  }
                  <CForm onSubmit={empProfUpdate.handleSubmit} className="form-horizontal">
                    <div>
                      <div className="row form-group mt-2">
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Name <span className='error'>*</span></label>
                          <input type="text" name='name' className="form-control" placeholder='Name' maxLength={25} onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={(empProfUpdate.values.name) ? empProfUpdate.values.name : ''} readOnly />
                          {empProfUpdate.errors.name && empProfUpdate.touched.name ? <div className="help-block text-danger">{empProfUpdate.errors.name}</div> : null}
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label htmlFor="">Emergency Contact <span className='error'>*</span></label>
                            <input type="text" name='emergency_contact' className="form-control" placeholder='Emergency Contact' maxLength={10} onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.emergency_contact} />
                            {empProfUpdate.errors.emergency_contact && empProfUpdate.touched.emergency_contact ? <div className="help-block text-danger">{empProfUpdate.errors.emergency_contact}</div> : null}
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label htmlFor="">Emergency Contact Person <span className='error'>*</span></label>
                            <input type="text" name='emergency_contact_person' className="form-control" placeholder='Emergency Contact Person' maxLength={20} onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.emergency_contact_person} />
                            {empProfUpdate.errors.emergency_contact_person && empProfUpdate.touched.emergency_contact_person ? <div className="help-block text-danger">{empProfUpdate.errors.emergency_contact_person}</div> : null}
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label htmlFor="">Marital Status <span className='error'>*</span></label>
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder={'Choose a Marital Status'}
                              value={marriageStatus}
                              name="marital"
                              options={maritalOptions}
                              onChange={(e) => handleMaritalStatusChange(e)}
                              onBlur={empProfUpdate.handleBlur}
                            />
                            {empProfUpdate.errors.marital && empProfUpdate.touched.marital ? <div className="help-block text-danger">{empProfUpdate.errors.marital}</div> : null}
                          </div>
                        </div>
                      </div>
                      {(() => {
                        if (hideMaritalStatus) {
                          return (
                            <div className="row form-group mt-2">
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="">Spouse Complete Name <span className='error'>*</span></label>
                                  <input type="text" name='spouse_complete_name' className="form-control" placeholder='Spouse Complete Name' maxLength={20} onChange={handlespouseName} onBlur={empProfUpdate.handleBlur} value={spouseNamesett} />
                                  {empProfUpdate.errors.spouse_complete_name && empProfUpdate.touched.personal_email ? <div className="help-block text-danger">{empProfUpdate.errors.spouse_complete_name}</div> : null}
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="">Date of Marriage <span className='error'>*</span></label>
                                  <SingleDatePicker
                                    id={'marriage_date'}
                                    date={dateOfMarriage}
                                    onDateChange={(date) => handledateOfMarriage(date)}
                                    focused={focusOfMarriage}
                                    onFocusChange={({ focused }) => setfocusOfMarriage(focused)}
                                    numberOfMonths={1}
                                    displayFormat="DD-MM-YYYY"
                                    isOutsideRange={d => d.isAfter(moment())}
                                    isDayHighlighted={day => day.isSame(moment(), 'd')}
                                    placeholder='Date of Marriage'
                                    readOnly={true}
                                    renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div>
                                          <select
                                            value={month.month()}
                                            onChange={(e) => onMonthSelect(month, e.target.value)}
                                          >
                                            {moment.months().map((label, value) => (
                                              <option value={value} key={`marriage_date_${value}`}>{label}</option>
                                            ))}
                                          </select>
                                        </div>
                                        <div>
                                          <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                            {yearsDD('marriage_date_yr')}
                                          </select>
                                        </div>
                                      </div>}
                                  />
                                  {empProfUpdate.errors.marriage_date && empProfUpdate.touched.marriage_date ? <div className="help-block text-danger">{empProfUpdate.errors.marriage_date}</div> : null}
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="">Spouse Birthdate <span className='error'>*</span></label>
                                  <SingleDatePicker
                                    id={'spouse_birthdate'}
                                    date={spouseDob}
                                    onDateChange={(date) => handlespouseDob(date)}
                                    focused={focusofSpouseDob}
                                    onFocusChange={({ focused }) => setfocusofSpouseDob(focused)}
                                    numberOfMonths={1}
                                    displayFormat="DD-MM-YYYY"
                                    isOutsideRange={d => d.isAfter(moment())}
                                    isDayHighlighted={day => day.isSame(moment(), 'd')}
                                    placeholder='Spouse Birthdate'
                                    readOnly={true}
                                    renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div>
                                          <select
                                            value={month.month()}
                                            onChange={(e) => onMonthSelect(month, e.target.value)}
                                          >
                                            {moment.months().map((label, value) => (
                                              <option value={value} key={`spouse_birthdate_${value}`}>{label}</option>
                                            ))}
                                          </select>
                                        </div>
                                        <div>
                                          <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                            {yearsDD('spouse_birthdate_yr')}
                                          </select>
                                        </div>
                                      </div>}
                                  />
                                  {empProfUpdate.errors.spouse_birthdate && empProfUpdate.touched.spouse_birthdate ? <div className="help-block text-danger">{empProfUpdate.errors.spouse_birthdate}</div> : null}
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })()}
                      <CCard className="mb-4">
                        <CCardHeader id="headingOne" className="header">
                          <div>
                            <h5 className="m-0 p-0 msp">Current Address</h5>
                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <div className="row form-group">
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                              <input type={'text'} name="cur_door_no" placeholder="Door No" maxLength={3} className="form-control" onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.cur_door_no} />
                              {empProfUpdate.errors.cur_door_no && empProfUpdate.touched.cur_door_no ? <div className="help-block text-danger">{empProfUpdate.errors.cur_door_no}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                              <input type={'text'} name="cur_house_name" id="cur_house_name" maxLength="25" placeholder="House/Apartment Name" className="form-control" onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.cur_house_name} />
                              {empProfUpdate.errors.cur_house_name && empProfUpdate.touched.cur_house_name ? <div className="help-block text-danger">{empProfUpdate.errors.cur_house_name}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                              <input type={'text'} className="form-control" name="cur_street_name" maxLength="25" placeholder="Street Name" onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.cur_street_name} />
                              {empProfUpdate.errors.cur_street_name && empProfUpdate.touched.cur_street_name ? <div className="help-block text-danger">{empProfUpdate.errors.cur_street_name}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                              <input type="text" name='cur_place_name' value={empProfUpdate.values.cur_place_name} onChange={empProfUpdate.handleChange} className="form-control" placeholder="Place Name" maxLength={25} onBlur={empProfUpdate.handleBlur} />
                              {empProfUpdate.errors.cur_place_name && empProfUpdate.touched.cur_place_name ? <div className="help-block text-danger">{empProfUpdate.errors.cur_place_name}</div> : null}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Current Country <span className='error'>*</span></label>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={curCountry}
                                name="cur_country_id"
                                options={dropdownData?.uaCountryCommonData?.data?.result}
                                placeholder={'Choose a Country'}
                                onChange={(e) => handleCurrentCountry(e)}
                                onBlur={empProfUpdate.handleBlur}
                              />
                              {empProfUpdate.errors.cur_country_id && empProfUpdate.touched.cur_country_id ? <div className="help-block text-danger">{empProfUpdate.errors.cur_country_id}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Current State <span className='error'>*</span></label>
                              <Select
                                ref={selectCurStateRef}
                                className="basic-single"
                                classNamePrefix="select"
                                value={curStateName}
                                name="cur_state_id"
                                options={curState}
                                placeholder={'Choose a State'}
                                onChange={(e) => handleCurrentState(e)}
                                onBlur={empProfUpdate.handleBlur}
                              />
                              {empProfUpdate.errors.cur_state_id && empProfUpdate.touched.cur_state_id ? <div className="help-block text-danger">{empProfUpdate.errors.cur_state_id}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Current District <span className='error'>*</span></label>
                              <Select
                                ref={selectCurDistictRef}
                                className="basic-single"
                                classNamePrefix="select"
                                value={curDistrictName}
                                name="cur_district_id"
                                options={curDistict}
                                placeholder={'Choose a District'}
                                onChange={(e) => handleCurrentDistrict(e)}
                                onBlur={empProfUpdate.handleBlur}
                              />
                              {empProfUpdate.errors.cur_district_id && empProfUpdate.touched.cur_district_id ? <div className="help-block text-danger">{empProfUpdate.errors.cur_district_id}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Current Zip <span className='error'>*</span></label>
                              <input type="text" name='cur_pin_code' value={empProfUpdate.values.cur_pin_code} onChange={empProfUpdate.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                              {empProfUpdate.errors.cur_pin_code && empProfUpdate.touched.cur_pin_code ? <div className="help-block text-danger">{empProfUpdate.errors.cur_pin_code}</div> : null}
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>

                      <CCard className="mb-4">
                        <CCardHeader id="headingTwo" className="header">
                          <div>
                            <h5 className="m-0 p-0">Permanent Address</h5>
                          </div>
                          <div className="">
                            <span className="float-right">
                              <CFormGroup variant="custom-checkbox" inline >
                                <CInputCheckbox custom id="is_same_as_current_address" name="is_same_as_current_address" onChange={(e) => markasCurrentAddress(e)} checked={sameAsCurrentChe} />
                                <CLabel variant="custom-checkbox" htmlFor="is_same_as_current_address">Same as Current Address ?</CLabel>
                              </CFormGroup>
                            </span>
                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <div className="row form-group">
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                              <input type={'text'} name="door_no" placeholder="Door No" maxLength={3} className="form-control" onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.door_no} />
                              {empProfUpdate.errors.door_no && empProfUpdate.touched.door_no ? <div className="help-block text-danger">{empProfUpdate.errors.door_no}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                              <input type={'text'} name="house_name" id="house_name" maxLength="25" placeholder="House/Apartment Name" className="form-control" onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.house_name} />
                              {empProfUpdate.errors.house_name && empProfUpdate.touched.house_name ? <div className="help-block text-danger">{empProfUpdate.errors.house_name}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                              <input type={'text'} className="form-control" name="street_name" maxLength="25" placeholder="Street Name" onChange={empProfUpdate.handleChange} onBlur={empProfUpdate.handleBlur} value={empProfUpdate.values.street_name} />
                              {empProfUpdate.errors.street_name && empProfUpdate.touched.street_name ? <div className="help-block text-danger">{empProfUpdate.errors.street_name}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                              <input type="text" name='place_name' value={empProfUpdate.values.place_name} onChange={empProfUpdate.handleChange} className="form-control" placeholder="Place Name" maxLength={25} onBlur={empProfUpdate.handleBlur} />
                              {empProfUpdate.errors.place_name && empProfUpdate.touched.place_name ? <div className="help-block text-danger">{empProfUpdate.errors.place_name}</div> : null}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Permanent Country <span className='error'>*</span></label>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={perCountry}
                                name="per_country_id"
                                options={dropdownData?.uaCountryCommonData?.data?.result}
                                placeholder={'Choose a Country'}
                                onChange={(e) => handlePermanentCountry(e)}
                                onBlur={empProfUpdate.handleBlur}
                              />
                              {empProfUpdate.errors.country_id && empProfUpdate.touched.country_id ? <div className="help-block text-danger">{empProfUpdate.errors.country_id}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Permanent State <span className='error'>*</span></label>
                              <Select
                                ref={selectPerStateRef}
                                className="basic-single"
                                classNamePrefix="select"
                                value={perStateName}
                                name="per_state_id"
                                options={perState}
                                placeholder={'Choose a State'}
                                onChange={(e) => handlePermanentState(e)}
                                onBlur={empProfUpdate.handleBlur}
                              />
                              {empProfUpdate.errors.state_id && empProfUpdate.touched.state_id ? <div className="help-block text-danger">{empProfUpdate.errors.state_id}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Permanent District <span className='error'>*</span></label>
                              <Select
                                ref={selectPerDistictRef}
                                className="basic-single"
                                classNamePrefix="select"
                                value={perDistrictName}
                                name="per_district_id"
                                options={perDistict}
                                placeholder={'Choose a District'}
                                onChange={(e) => handlePermanentDistrict(e)}
                                onBlur={empProfUpdate.handleBlur}
                              />
                              {empProfUpdate.errors.district_id && empProfUpdate.touched.district_id ? <div className="help-block text-danger">{empProfUpdate.errors.district_id}</div> : null}
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Permanent Zip <span className='error'>*</span></label>
                              <input type="text" name='pin_code' value={empProfUpdate.values.pin_code} onChange={empProfUpdate.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                              {empProfUpdate.errors.pin_code && empProfUpdate.touched.pin_code ? <div className="help-block text-danger">{empProfUpdate.errors.pin_code}</div> : null}
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                      <div id="family1"><ExistingCareerOnBo1 familyData={famData} alterFamilyData={setFamData} /></div>
                      <div id="education1"><ExistingCareerOnBo2 educationData={eduData} alterEducationData={setEduData} /></div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className='col-md-10' align="center" >
                          <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> {
                            props?.match?.params?.status == "edit" ? 'Update' : 'Save'
                          }</CButton>
                          <Link className='ml-3 btn btn-danger' to={'/employee/self-update-list'}><CIcon name="cil-ban" /> Cancel</Link>
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
  );
};

export default EmpProfileUpdate;