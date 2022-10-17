import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CForm,
  CCardFooter,
  CCol,
  CCardHeader,
  CFormGroup,
  CInputCheckbox,
  CLabel,
} from "@coreui/react";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EmployeeUpdateAPI } from 'src/actions/master';
import { convertValueLabel, indianDateFormat, convertDateToMDY } from '../../../utils/helper'
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';

const Tab3 = (props) => {
  const dispatch = useDispatch()
  const timzoneData = require('../../../components/data/TimeZone.json');

  const dropdownData = useSelector((state) => state.commonData)
  // console.log(dropdownData);

  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  //Hide/Show States
  const [hideTransportFields, setHideTransportFields] = useState(0);
  const [hideIsEligibleForOt, setHideIsEligibleForOt] = useState(0);
  const [hideTerminationDate, setHideTerminationDate] = useState(0);
  const [hideDeathDate, setHideDeathDate] = useState(0);
  const [hideOthers, setHideOthers] = useState(0);
  const [hideContractor, setHideContactor] = useState(0);

  //Datepicker Settings
  const [joiningDate, setJoiningDate] = useState(null);
  const [focusJoiningDate, setfocusJoiningDate] = useState(false);

  const [rejoiningDate, setRejoiningDate] = useState(null);
  const [focusRejoiningDate, setfocusRejoiningDate] = useState(false);

  const [trainingCompDate, setTrainingCompDate] = useState(null);
  const [focusTrainingCompDate, setfocusTrainingCompDate] = useState(false);

  const [probationCompDate, setProbationCompDate] = useState(null);
  const [focusProbationCompDate, setfocusProbationCompDate] = useState(false);

  const [confirmationDate, setConfirmationDate] = useState(null);
  const [focusConfirmationDate, setfocusConfirmationDate] = useState(false);

  const [resignationDate, setResignationDate] = useState(null);
  const [focusResignationDate, setfocusResignationDate] = useState(false);

  const [relievingDate, setRelievingDate] = useState(null);
  const [focusRelievingDate, setfocusRelievingDate] = useState(false);

  const [terminationDate, setTerminationDate] = useState(null);
  const [focusTerminationDate, setfocusTerminationDate] = useState(false);

  const [deathDate, setDeathDate] = useState(null);
  const [focusDeathDate, setfocusDeathDate] = useState(false);

  const [GazetteDate, setGazetteDate] = useState(null);
  const [focusGazetteDate, setfocusGazetteDate] = useState(false);

  const [contractFromDate, setContractFromDate] = useState(null);
  const [focusContractFromDate, setfocusContractFromDate] = useState(false);

  const [contractToDate, setContractToDate] = useState(null);
  const [focusContractToDate, setfocusContractToDate] = useState(false);

  //File Content
  const [appointmentProofSelected, setAppointmentProof] = useState([]);
  const [uploadGazetteSelected, setUploadGazette] = useState([]);

  const [leaveManager, setLeaveManager] = useState([]);
  const [workingHour, setWorkingHour] = useState([]);
  const [timeZone, setTimeZone] = useState([]);
  const [empType, setEmpType] = useState([]);
  const [payGrade, setPayGrade] = useState([]);
  const [resLeaving, setResLeaving] = useState([]);

  const [isCTransport, setIsCTransport] = useState(false);
  const [eliOverTime, setEliOverTime] = useState(false);
  const [eliShiftTime, setEliShiftTime] = useState(false);


  const buildRequiredForDiffAddress = requiredText => ({
    is: false,
    then: Yup.string().required(requiredText)
  });

  const Tab3Formik = useFormik({
    initialValues: {
      leave_manager_id: '',
      resource_calendar_id: '',
      tz: '',
      appointment_proof: '',
      joining_date: '',
      employment_type_id: '',
      pay_grade_id: '',
      is_company_transport: '',
      pickup_location: '',
      pickup_pin_code: '',
      route_no: '',
      is_eligible_for_ot: '',
      ot_wages: '',
      is_eligible_for_shift_allowance: '',
      rejoin_date: '',
      training_duration: '',
      training_complete_date: '',
      probation_duration: '',
      probation_complete_date: '',
      confirmation_date: '',
      resignation_date: '',
      notice_period: '',
      relieving_date: '',
      leaving_reason_id: '',
      termination_date: '',
      death_date: '',
      // other_reason:'',
      gazette_proof: '',
      new_name: '',
      gazette_date: '',
      contractor_name: "",
      contract_date_from: "",
      contract_date_to: ""
    },
    validationSchema: Yup.object().shape({
      leave_manager_id: Yup.string().required('This field is required'),
      resource_calendar_id: Yup.string().required('This field is required'),
      tz: Yup.string().required('This field is required'),
      // appointment_proof:Yup.string().required('This field is required'),
      joining_date: Yup.string().required('This field is required'),
      employment_type_id: Yup.string().required('This field is required'),
      pay_grade_id: Yup.string().required('This field is required'),
      is_company_transport: Yup.string().required('This field is required'),
      pickup_location: Yup.string().when("is_company_transport", buildRequiredForDiffAddress('This field is required')),
      // pickup_pin_code:Yup.string().required('This field is required'),
      // route_no:Yup.string().required('This field is required'),
      is_eligible_for_ot: Yup.string().required('This field is required'),
      is_eligible_for_shift_allowance: Yup.string().required('This field is required'),
      // ot_wages:Yup.string().required('This field is required'),
      rejoin_date: Yup.string().required('This field is required'),
      training_duration: Yup.string().required('This field is required'),
      training_complete_date: Yup.string().required('This field is required'),
      probation_duration: Yup.string().required('This field is required'),
      probation_complete_date: Yup.string().required('This field is required'),
      confirmation_date: Yup.string().required('This field is required'),
      resignation_date: Yup.string().required('This field is required'),
      notice_period: Yup.string().required('This field is required'),
      relieving_date: Yup.string().required('This field is required'),
      leaving_reason_id: Yup.string().required('This field is required'),
      // termination_date:Yup.string().required('This field is required'),
      // death_date:Yup.string().required('This field is required'),
      // other_reason:Yup.string().required('This field is required'),
      // gazette_proof:Yup.string().required('This field is required'),
      new_name: Yup.string().required('This field is required'),
      gazette_date: Yup.string().required('This field is required'),
      // contractor_name: Yup.string().required('This field is required'),
      // contract_date_from: Yup.string().required('This field is required'),
      // contract_date_to: Yup.string().required('This field is required')
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values, tab: 'T3' } })
      // console.log(formData);
      dispatch(EmployeeUpdateAPI(props.dataId, formData))
    },
  });

  //Update Data
  useEffect(() => {
    if (props?.dataEdit?.data !== null) {
      Tab3Formik.setValues({
        "leave_manager_id": props?.dataEdit?.data?.leave_manager_id,
        "resource_calendar_id": props?.dataEdit?.data?.resource_calendar_id,
        "tz": props?.dataEdit?.data?.tz,
        //"appointment_proof":props?.dataEdit?.data?.appointment_proof,
        "joining_date": props?.dataEdit?.data?.joining_date,
        "employment_type_id": props?.dataEdit?.data?.employment_type_id,
        "pay_grade_id": props?.dataEdit?.data?.pay_grade_id,
        "is_company_transport": props?.dataEdit?.data?.is_company_transport,
        "pickup_location": props?.dataEdit?.data?.pickup_location,
        "pickup_pin_code": props?.dataEdit?.data?.pickup_pin_code,
        "route_no": props?.dataEdit?.data?.route_no,
        "is_eligible_for_ot": props?.dataEdit?.data?.is_eligible_for_ot,
        "ot_wages": props?.dataEdit?.data?.ot_wages,
        "is_eligible_for_shift_allowance": props?.dataEdit?.data?.is_eligible_for_shift_allowance,
        "rejoin_date": props?.dataEdit?.data?.rejoin_date,
        "training_duration": props?.dataEdit?.data?.training_duration,
        "training_complete_date": props?.dataEdit?.data?.training_complete_date,
        "probation_duration": props?.dataEdit?.data?.probation_duration,
        "probation_complete_date": props?.dataEdit?.data?.probation_complete_date,
        "confirmation_date": props?.dataEdit?.data?.confirmation_date,
        "resignation_date": props?.dataEdit?.data?.resignation_date,
        "notice_period": props?.dataEdit?.data?.notice_period,
        "relieving_date": props?.dataEdit?.data?.relieving_date,
        "leaving_reason_id": props?.dataEdit?.data?.leaving_reason_id,
        "termination_date": props?.dataEdit?.data?.termination_date,
        "death_date": props?.dataEdit?.data?.death_date,
        "other_reason": props?.dataEdit?.data?.other_reason,
        "gazette_proof": props?.dataEdit?.data?.gazette_proof,
        "new_name": props?.dataEdit?.data?.new_name,
        "gazette_date": props?.dataEdit?.data?.gazette_date,
        "contractor_name": props?.dataEdit?.data?.contractor_name,
        "contract_date_from": props?.dataEdit?.data?.contract_date_from,
        "contract_date_to": props?.dataEdit?.data?.contract_date_to
      });
      setLeaveManager(convertValueLabel(props?.dataEdit?.data?.leave_manager_id, props?.dataEdit?.data?.leave_manager_id_name));
      setWorkingHour(convertValueLabel(props?.dataEdit?.data?.resource_calendar_id, props?.dataEdit?.data?.resource_calendar_id_name));
      setTimeZone(convertValueLabel(props?.dataEdit?.data?.tz, props?.dataEdit?.data?.tz_label));
      setEmpType(convertValueLabel(props?.dataEdit?.data?.employment_type_id, props?.dataEdit?.data?.employment_type_id_name));
      setPayGrade(convertValueLabel(props?.dataEdit?.data?.pay_grade_id, props?.dataEdit?.data?.pay_grade_id_name));
      setResLeaving(convertValueLabel(props?.dataEdit?.data?.leaving_reason_id, props?.dataEdit?.data?.leaving_reason_id_name));

      if (props?.dataEdit?.data?.joining_date) {
        setJoiningDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.joining_date))));
      }
      if (props?.dataEdit?.data?.rejoin_date) {
        setRejoiningDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.rejoin_date))));
      }
      if (props?.dataEdit?.data?.training_complete_date) {
        setTrainingCompDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.training_complete_date))));
      }
      if (props?.dataEdit?.data?.probation_complete_date) {
        setProbationCompDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.probation_complete_date))));
      }
      if (props?.dataEdit?.data?.confirmation_date) {
        setConfirmationDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.confirmation_date))));
      }
      if (props?.dataEdit?.data?.resignation_date) {
        setResignationDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.resignation_date))));
      }
      if (props?.dataEdit?.data?.relieving_date) {
        setRelievingDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.relieving_date))));
      }
      if (props?.dataEdit?.data?.termination_date) {
        setTerminationDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.termination_date))));
      }
      if (props?.dataEdit?.data?.death_date) {
        setDeathDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.death_date))));
      }
      if (props?.dataEdit?.data?.gazette_date) {
        setGazetteDate(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.gazette_date))));
      }
      if (props?.dataEdit?.data?.is_company_transport) {
        setIsCTransport(true);
        setHideTransportFields(true);
      }
      if (props?.dataEdit?.data?.is_eligible_for_ot) {
        setEliOverTime(true);
      }
      if (props?.dataEdit?.data?.is_eligible_for_shift_allowance) {
        setHideIsEligibleForOt(1);
        setEliShiftTime(true);
      }

      // console.log(props?.dataEdit?.data?.leaving_reason_id_name);

      if (props?.dataEdit?.data?.leaving_reason_id_name === "Disciplinary Issue") {
        setHideTerminationDate(1);
        setHideDeathDate(0);
        setHideOthers(0);
      } else if (props?.dataEdit?.data?.leaving_reason_id_name === "Death") {
        setHideTerminationDate(0);
        setHideDeathDate(1);
        setHideOthers(0);
      } else if (props?.dataEdit?.data?.leaving_reason_id_name === "Others") {
        setHideTerminationDate(0);
        setHideDeathDate(0);
        setHideOthers(1);
      } else {
        setHideTerminationDate(0);
        setHideDeathDate(0);
        setHideOthers(0);
      }


    } else {
      //dispatch(UserListDropDown());
    }
  }, [props?.dataEdit?.data])

  const handleLeaveManagerChange = (e) => {
    if (e?.value) {
      Tab3Formik.setFieldValue('leave_manager_id', e.value);
      setLeaveManager(convertValueLabel(e.value, e.label));
      // setMarriageStatus(convertValueLabel(e.value,e.label));
    }
  }

  const handleWorkingHoursChange = (e) => {
    if (e?.value) {
      Tab3Formik.setFieldValue('resource_calendar_id', e.value);
      setWorkingHour(convertValueLabel(e.value, e.label));
      // setMarriageStatus(convertValueLabel(e.value,e.label));
    }
  }

  const handleTimezoneChange = (e) => {
    if (e?.value) {
      Tab3Formik.setFieldValue('tz', e.value);
      setTimeZone(convertValueLabel(e.value, e.label));
      // setMarriageStatus(convertValueLabel(e.value,e.label));
    }
  }

  const handleAppointmentIdChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setAppointmentProof({
        selectedImage: Tab3Formik.setFieldValue("appointment_proof", event.target.result),
      })
    }
  }

  const handledateOfJoining = (date) => {
    if (date) {
      setJoiningDate(date)
      Tab3Formik.setFieldValue('joining_date', indianDateFormat(date._d));
    }
  }

  const handleContractFromDate = (date) => {
    if (date) {
      setContractFromDate(date)
      Tab3Formik.setFieldValue('contract_date_from', indianDateFormat(date._d));
    }
  }

  const handleContractToDate = (date) => {
    if (date) {
      setContractToDate(date)
      Tab3Formik.setFieldValue('contract_date_to', indianDateFormat(date._d));
    }
  }

  const handleTypeOfEmployment = (e) => {
    if (e?.value) {
      Tab3Formik.setFieldValue('employment_type_id', e.value);
      // setMarriageStatus(convertValueLabel(e.value,e.label));
      setEmpType(convertValueLabel(e.value, e.label));
      if (e.value == '1') {
        setHideContactor(1);
      } else {
        setHideContactor(0);
      }
    }
  }

  const handlePayGrade = (e) => {
    if (e?.value) {
      Tab3Formik.setFieldValue('pay_grade_id', e.value);
      setPayGrade(convertValueLabel(e.value, e.label));
      // setMarriageStatus(convertValueLabel(e.value,e.label));
    }
  }

  const handleIsCompanyTransportChange = (e) => {
    if (e.target.checked === true) {
      Tab3Formik.setFieldValue('is_company_transport', 1);
      setHideTransportFields(1);
      setIsCTransport(true);
    } else {
      Tab3Formik.setFieldValue('is_company_transport', 0);
      setHideTransportFields(0);
      setIsCTransport(false);
    }
  }

  const handleEligibleForOtChange = (e) => {
    if (e.target.checked === true) {
      Tab3Formik.setFieldValue('is_eligible_for_ot', 1);
      setHideIsEligibleForOt(1);
      setEliOverTime(true);
    } else {
      Tab3Formik.setFieldValue('is_eligible_for_ot', 0);
      setHideIsEligibleForOt(0);
      setEliOverTime(false);
    }
  }

  const handleEligibleForShiftChange = (e) => {
    if (e.target.checked === true) {
      Tab3Formik.setFieldValue('is_eligible_for_shift_allowance', 1);
      setEliShiftTime(true);
    } else {
      Tab3Formik.setFieldValue('is_eligible_for_shift_allowance', 0);
      setEliShiftTime(false);
    }
  }

  const handledateOfJoiningAgain = (date) => {
    if (date) {
      setRejoiningDate(date)
      Tab3Formik.setFieldValue('rejoin_date', indianDateFormat(date._d));
    }
  }

  const handleTrainingDuration = (e) => {
    Tab3Formik.setFieldValue('training_duration', e?.target?.value);
    var startdate = moment().format("DD-MM-YYYY");;
    var new_date = moment(startdate, "DD-MM-YYYY");
    new_date.add(e?.target?.value, 'months');
    setTrainingCompDate(new_date)
    Tab3Formik.setFieldValue('training_complete_date', indianDateFormat(new_date._d));
  }

  const handleTrainingCompDate = (date) => {
    if (date) {
      setTrainingCompDate(date)
      Tab3Formik.setFieldValue('training_complete_date', indianDateFormat(date._d));
    }
  }

  const handleProbationDuration = (e) => {
    Tab3Formik.setFieldValue('probation_duration', e?.target?.value);
    var startdate = moment().format("DD-MM-YYYY");;
    var new_date = moment(startdate, "DD-MM-YYYY");
    new_date.add(e?.target?.value, 'months');
    setProbationCompDate(new_date)
    Tab3Formik.setFieldValue('probation_complete_date', indianDateFormat(new_date._d));
  }

  const handleProbationCompDate = (date) => {
    if (date) {
      setProbationCompDate(date)
      Tab3Formik.setFieldValue('probation_complete_date', indianDateFormat(date._d));
    }
  }

  const handleDateOfConfirmation = (date) => {
    if (date) {
      setConfirmationDate(date)
      Tab3Formik.setFieldValue('confirmation_date', indianDateFormat(date._d));
    }
  }

  const handleDateOfResignation = (date) => {
    if (date) {
      setResignationDate(date)
      Tab3Formik.setFieldValue('resignation_date', indianDateFormat(date._d));
    }
  }

  const handleNoticePeriod = (e) => {
    Tab3Formik.setFieldValue('notice_period', e?.target?.value);
    var startdate = moment().format("DD-MM-YYYY");;
    var new_date = moment(startdate, "DD-MM-YYYY");
    new_date.add(e?.target?.value, 'days');
    setRelievingDate(new_date)
    Tab3Formik.setFieldValue('relieving_date', indianDateFormat(new_date._d));
  }

  const handleDateOfRelieving = (date) => {
    if (date) {
      setRelievingDate(date)
      Tab3Formik.setFieldValue('relieving_date', indianDateFormat(date._d));
    }
  }

  const handleReasonForLeaving = (e) => {
    if (e.label) {
      Tab3Formik.setFieldValue('leaving_reason_id', e.value);
      console.log(e.label);
      if (e.label === "Disciplinary Issue") {
        setHideTerminationDate(1);
        setHideDeathDate(0);
        setHideOthers(0);
      } else if (e.label === "Death") {
        setHideTerminationDate(0);
        setHideDeathDate(1);
        setHideOthers(0);
      } else if (e.label === "Others") {
        setHideTerminationDate(0);
        setHideDeathDate(0);
        setHideOthers(1);
      } else {
        setHideTerminationDate(0);
        setHideDeathDate(0);
        setHideOthers(0);
      }
      setResLeaving(convertValueLabel(e.value, e.label));
    }
  }

  const handledateOfTermination = (date) => {
    if (date) {
      setTerminationDate(date)

      Tab3Formik.setFieldValue('termination_date', indianDateFormat(date._d));
    }
  }

  const handledateOfDeath = (date) => {
    if (date) {
      setDeathDate(date)
      Tab3Formik.setFieldValue('death_date', indianDateFormat(date._d));
    }
  }

  const handledateOfGazNoti = (date) => {
    if (date) {
      setGazetteDate(date)
      Tab3Formik.setFieldValue('gazette_date', indianDateFormat(date._d));
    }
  }

  const handleGazetteNotiChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setUploadGazette({
        selectedImage: Tab3Formik.setFieldValue("gazette_proof", event.target.result),
      })
    }
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CForm onSubmit={Tab3Formik.handleSubmit} className="form-horizontal">
          <div>
            <div className='row mb-4'>
              <div className='col-md-5'>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Approvers</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-lg-6">
                        <label htmlFor="">Leave <span className='error'>*</span></label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'(Select)'}
                          value={leaveManager}
                          name="leave_manager_id"
                          options={props?.dataEdit?.data?.leave_manager_id_list}
                          onChange={(e) => handleLeaveManagerChange(e)}
                          onBlur={Tab3Formik.handleBlur}
                        />
                        {Tab3Formik.errors.leave_manager_id && Tab3Formik.touched.leave_manager_id ? <div className="help-block text-danger">{Tab3Formik.errors.leave_manager_id}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
              <div className='col-md-7'>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Schedule</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-lg-6">
                        <label htmlFor="">Working Hours <span className='error'>*</span></label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Working Hour'}
                          value={workingHour}
                          name="resource_calendar_id"
                          options={props?.dataEdit?.data?.resource_calendar_id_list}
                          onChange={(e) => handleWorkingHoursChange(e)}
                          onBlur={Tab3Formik.handleBlur}
                        />
                        {Tab3Formik.errors.resource_calendar_id && Tab3Formik.touched.resource_calendar_id ? <div className="help-block text-danger">{Tab3Formik.errors.resource_calendar_id}</div> : null}
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="">Timezone <span className='error'>*</span></label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Timezone'}
                          value={timeZone}
                          name="tz"
                          options={timzoneData}
                          onChange={(e) => handleTimezoneChange(e)}
                          onBlur={Tab3Formik.handleBlur}
                        />
                        {Tab3Formik.errors.tz && Tab3Formik.touched.tz ? <div className="help-block text-danger">{Tab3Formik.errors.tz}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
            </div>
            <CCard className="mb-4">
              <CCardHeader id="headingTwo " className="header">
                <div>
                  <h5 className="m-0 p-0">Joining Details</h5>
                </div>
              </CCardHeader>
              <CCardBody>
                <div className="row mb-0">
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Appointment Proof	 <span className='error'>*</span></label>
                      <input type="file" name="appointment_proof" onChange={(event) => { handleAppointmentIdChange(event) }} />
                      {Tab3Formik.errors.appointment_proof && Tab3Formik.touched.appointment_proof ? <div className="help-block text-danger">{Tab3Formik.errors.appointment_proof}</div> : null}
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Date of Joining <span className='error'>*</span></label>
                      <div className="">
                        <SingleDatePicker
                          id={'joining_date'}
                          date={joiningDate}
                          onDateChange={(date) => handledateOfJoining(date)}
                          focused={focusJoiningDate}
                          onFocusChange={({ focused }) => setfocusJoiningDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Date of Joining'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`joining_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('joining_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.joining_date && Tab3Formik.touched.joining_date ? <div className="help-block text-danger">{Tab3Formik.errors.joining_date}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3" style={{ whiteSpace: 'nowrap' }}>
                    <div className="form-group">
                      <label htmlFor="">Type of Employment <span className='error'>*</span></label>
                      <div className="">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose an Employment Type'}
                          value={empType}
                          name="employment_type_id"
                          options={props?.dataEdit?.data?.employment_type_id_list}
                          onChange={(e) => handleTypeOfEmployment(e)}
                          onBlur={Tab3Formik.handleBlur}
                        />
                        {Tab3Formik.errors.employment_type_id && Tab3Formik.touched.employment_type_id ? <div className="help-block text-danger">{Tab3Formik.errors.employment_type_id}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Pay Grade <span className='error'>*</span></label>
                      <div className="">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Pay Grade'}
                          value={payGrade}
                          name="pay_grade_id"
                          options={props?.dataEdit?.data?.pay_grade_id_list}
                          onChange={(e) => handlePayGrade(e)}
                          onBlur={Tab3Formik.handleBlur}
                        />
                        {Tab3Formik.errors.pay_grade_id && Tab3Formik.touched.pay_grade_id ? <div className="help-block text-danger">{Tab3Formik.errors.pay_grade_id}</div> : null}
                      </div>
                    </div>
                  </div>
                </div>
                {(() => {
                  if (hideContractor) {
                    return (
                      <>
                        <div className="row mb-0">
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="">Name of the Contractor <span className='error'>*</span></label>
                              <input type="text" name='contractor_name' className="form-control" placeholder='Name of the Contractor' maxLength={6} onChange={(e) => handleTrainingDuration(e)} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.training_duration} />
                              {Tab3Formik.errors.contractor_name && Tab3Formik.touched.contractor_name ? <div className="help-block text-danger">{Tab3Formik.errors.contractor_name}</div> : null}
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="">Contract Date From <span className='error'>*</span></label>
                              <div className="">
                                <SingleDatePicker
                                  id={'contract_date_from'}
                                  date={contractFromDate}
                                  onDateChange={(date) => handleContractFromDate(date)}
                                  focused={focusContractFromDate}
                                  onFocusChange={({ focused }) => setfocusContractFromDate(focused)}
                                  numberOfMonths={1}
                                  displayFormat="DD-MM-YYYY"
                                  isOutsideRange={d => d.isAfter(moment())}
                                  placeholder='Contract Date From'
                                  readOnly={true}
                                  renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                      <div>
                                        <select
                                          value={month.month()}
                                          onChange={(e) => onMonthSelect(month, e.target.value)}
                                        >
                                          {moment.months().map((label, value) => (
                                            <option value={value} key={`contract_date_from${value}`}>{label}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div>
                                        <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                          {yearsDD('joining_date_yr')}
                                        </select>
                                      </div>
                                    </div>}
                                />
                                {Tab3Formik.errors.contract_date_from && Tab3Formik.touched.contract_date_from ? <div className="help-block text-danger">{Tab3Formik.errors.contract_date_from}</div> : null}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="">Contract Date To <span className='error'>*</span></label>
                              <div className="">
                                <SingleDatePicker
                                  id={'contract_date_to'}
                                  date={contractToDate}
                                  onDateChange={(date) => handleContractToDate(date)}
                                  focused={focusContractToDate}
                                  onFocusChange={({ focused }) => setfocusContractToDate(focused)}
                                  numberOfMonths={1}
                                  displayFormat="DD-MM-YYYY"
                                  isOutsideRange={d => d.isBefore(moment(contractFromDate))}
                                  placeholder='Contract Date To'
                                  readOnly={true}
                                  renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                      <div>
                                        <select
                                          value={month.month()}
                                          onChange={(e) => onMonthSelect(month, e.target.value)}
                                        >
                                          {moment.months().map((label, value) => (
                                            <option value={value} key={`contract_date_to${value}`}>{label}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div>
                                        <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                          {yearsDD('joining_date_yr')}
                                        </select>
                                      </div>
                                    </div>}
                                />
                                {Tab3Formik.errors.contract_date_to && Tab3Formik.touched.contract_date_to ? <div className="help-block text-danger">{Tab3Formik.errors.contract_date_to}</div> : null}
                              </div>
                            </div>
                          </div>

                        </div>
                      </>
                    )
                  }
                })()}
              </CCardBody>
            </CCard>
            <CCard className="mb-4">
              <CCardHeader id="headingTwo " className="header">
                <div>
                  <h5 className="m-0 p-0">Company Transport</h5>
                </div>
              </CCardHeader>
              <CCardBody>
                <div className="row mb-4">
                  <div className="col-lg-3">
                    <CFormGroup variant="custom-checkbox" inline id=''>
                      <CInputCheckbox custom id="is_company_transport" name="is_company_transport" onChange={(e) => handleIsCompanyTransportChange(e)} checked={isCTransport} />
                      <CLabel variant="custom-checkbox" htmlFor="is_company_transport">Is Company Transport ?</CLabel>
                    </CFormGroup>
                    {Tab3Formik.errors.is_company_transport && Tab3Formik.touched.is_company_transport ? <div className="help-block text-danger">{Tab3Formik.errors.is_company_transport}</div> : null}
                  </div>
                  {(() => {
                    if (hideTransportFields) {
                      return (
                        <>
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="">Pick-up Location <span className='error'>*</span></label>
                              <div className="">
                                <input type="text" name='pickup_location' className="form-control" placeholder='Pick-up Location' maxLength={20} onChange={Tab3Formik.handleChange} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.pickup_location} />
                                {Tab3Formik.errors.pickup_location && Tab3Formik.touched.pickup_location ? <div className="help-block text-danger">{Tab3Formik.errors.pickup_location}</div> : null}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="">PIN Code <span className='error'>*</span></label>
                              <div className="">
                                <input type="text" name='pickup_pin_code' className="form-control" placeholder='PIN Code' maxLength={6} onChange={Tab3Formik.handleChange} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.pickup_pin_code} />
                                {Tab3Formik.errors.pickup_pin_code && Tab3Formik.touched.pickup_pin_code ? <div className="help-block text-danger">{Tab3Formik.errors.pickup_pin_code}</div> : null}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="">Route No. <span className='error'>*</span></label>
                              <div className="">
                                <input type="text" name='route_no' className="form-control" placeholder='Route No.' maxLength={6} onChange={Tab3Formik.handleChange} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.route_no} />
                                {Tab3Formik.errors.route_no && Tab3Formik.touched.route_no ? <div className="help-block text-danger">{Tab3Formik.errors.route_no}</div> : null}
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    }
                  })()}
                </div>
              </CCardBody>
            </CCard>
            <div className='row mb-4'>
              <div className='col-md-8'>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Overtime &amp; Shift</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group mb-4">
                      <div className="col-lg-4">
                        <CFormGroup variant="custom-checkbox" inline id=''>
                          <CInputCheckbox custom id="is_eligible_for_ot" name="is_eligible_for_ot" onChange={(e) => handleEligibleForOtChange(e)} checked={eliOverTime} />
                          <CLabel variant="custom-checkbox" htmlFor="is_eligible_for_ot">Eligibility for Overtime Wages </CLabel>
                        </CFormGroup>
                        {Tab3Formik.errors.is_eligible_for_ot && Tab3Formik.touched.is_eligible_for_ot ? <div className="help-block text-danger">{Tab3Formik.errors.is_eligible_for_ot}</div> : null}
                      </div>
                      {(() => {
                        if (hideIsEligibleForOt) {
                          return (
                            <>
                              <div className="col-lg-4">
                                <label htmlFor="">Rate of Overtime Wages <span className='error'>*</span></label>
                                <input type="text" name='ot_wages' className="form-control" placeholder='Rate of Overtime Wages' maxLength={6} onChange={Tab3Formik.handleChange} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.ot_wages} />
                                {Tab3Formik.errors.ot_wages && Tab3Formik.touched.ot_wages ? <div className="help-block text-danger">{Tab3Formik.errors.ot_wages}</div> : null}
                              </div>
                            </>
                          )
                        }
                      })()}
                      <div className="col-lg-4">
                        <CFormGroup variant="custom-checkbox" inline id=''>
                          <CInputCheckbox custom id="is_eligible_for_shift_allowance" name="is_eligible_for_shift_allowance" onChange={(e) => handleEligibleForShiftChange(e)} checked={eliShiftTime} />
                          <CLabel variant="custom-checkbox" htmlFor="is_eligible_for_shift_allowance">Eligibility for Shift Allowance</CLabel>
                        </CFormGroup>
                        {Tab3Formik.errors.is_eligible_for_shift_allowance && Tab3Formik.touched.is_eligible_for_shift_allowance ? <div className="help-block text-danger">{Tab3Formik.errors.is_eligible_for_shift_allowance}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
              <div className='col-md-4'>
                <CCard className="mb-4 h-auto">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Rehiring</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ display: 'contents' }}>
                        <label htmlFor="">Date of Joining Again <span className='error'>*</span></label>
                      </div>

                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ margin: '-5px' }}>
                        <SingleDatePicker
                          id={'rejoin_date'}
                          date={rejoiningDate}
                          onDateChange={(date) => handledateOfJoiningAgain(date)}
                          focused={focusRejoiningDate}
                          onFocusChange={({ focused }) => setfocusRejoiningDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Date of Joining Again'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`rejoin_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('rejoin_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.rejoin_date && Tab3Formik.touched.rejoin_date ? <div className="help-block text-danger">{Tab3Formik.errors.rejoin_date}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
            </div>

            <CCard className="mb-4">
              <CCardHeader id="headingTwo " className="header">
                <div>
                  <h5 className="m-0 p-0">Employment Details</h5>
                </div>
              </CCardHeader>
              <CCardBody>
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Duration of Training (In months) <span className='error'>*</span></label>
                      <input type="text" name='training_duration' className="form-control" placeholder='Duration of Training (In months)' maxLength={6} onChange={(e) => handleTrainingDuration(e)} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.training_duration} />
                      {Tab3Formik.errors.training_duration && Tab3Formik.touched.training_duration ? <div className="help-block text-danger">{Tab3Formik.errors.training_duration}</div> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Training Completion Date <span className='error'>*</span></label>
                      <div className="">
                        <SingleDatePicker
                          id={'training_complete_date'}
                          date={trainingCompDate}
                          onDateChange={(date) => handleTrainingCompDate(date)}
                          focused={focusTrainingCompDate}
                          onFocusChange={({ focused }) => setfocusTrainingCompDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Training Completion Date'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`training_complete_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('training_complete_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.training_complete_date && Tab3Formik.touched.training_complete_date ? <div className="help-block text-danger">{Tab3Formik.errors.training_complete_date}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Duration of Probation (In months) <span className='error'>*</span></label>
                      <div className="">
                        <input type="text" name='probation_duration' className="form-control" placeholder='Duration of Probation (In months)' maxLength={6} onChange={(e) => handleProbationDuration(e)} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.probation_duration} />
                        {Tab3Formik.errors.probation_duration && Tab3Formik.touched.probation_duration ? <div className="help-block text-danger">{Tab3Formik.errors.probation_duration}</div> : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Probation Completion Date <span className='error'>*</span></label>
                      <div className="">
                        <SingleDatePicker
                          id={'probation_complete_date'}
                          date={probationCompDate}
                          onDateChange={(date) => handleProbationCompDate(date)}
                          focused={focusProbationCompDate}
                          onFocusChange={({ focused }) => setfocusProbationCompDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Probation Completion Date'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`probation_complete_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('probation_complete_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.probation_complete_date && Tab3Formik.touched.probation_complete_date ? <div className="help-block text-danger">{Tab3Formik.errors.probation_complete_date}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Date of Confirmation <span className='error'>*</span></label>
                      <div className="">
                        <SingleDatePicker
                          id={'confirmation_date'}
                          date={confirmationDate}
                          onDateChange={(date) => handleDateOfConfirmation(date)}
                          focused={focusConfirmationDate}
                          onFocusChange={({ focused }) => setfocusConfirmationDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Date of Confirmation'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`probation_complete_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('probation_complete_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.confirmation_date && Tab3Formik.touched.confirmation_date ? <div className="help-block text-danger">{Tab3Formik.errors.confirmation_date}</div> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </CCardBody>
            </CCard>

            <CCard className="mb-4">
              <CCardHeader id="headingTwo " className="header">
                <div>
                  <h5 className="m-0 p-0">Employee Separation</h5>
                </div>
              </CCardHeader>
              <CCardBody>
                <div className="row ">
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Date of Resignation <span className='error'>*</span></label>
                      <SingleDatePicker
                        id={'resignation_date'}
                        date={resignationDate}
                        onDateChange={(date) => handleDateOfResignation(date)}
                        focused={focusResignationDate}
                        onFocusChange={({ focused }) => setfocusResignationDate(focused)}
                        numberOfMonths={1}
                        displayFormat="DD-MM-YYYY"
                        isOutsideRange={() => false}
                        placeholder='Date of Resignation'
                        readOnly={true}
                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                              <select
                                value={month.month()}
                                onChange={(e) => onMonthSelect(month, e.target.value)}
                              >
                                {moment.months().map((label, value) => (
                                  <option value={value} key={`resignation_date_${value}`}>{label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                {yearsDD('resignation_date_yr')}
                              </select>
                            </div>
                          </div>}
                      />

                      {Tab3Formik.errors.resignation_date && Tab3Formik.touched.resignation_date ? <div className="help-block text-danger">{Tab3Formik.errors.resignation_date}</div> : null}
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Notice Period (In days) <span className='error'>*</span></label>
                      <div className="">
                        <input type="text" name='notice_period' className="form-control" placeholder='Notice Period (In days)' maxLength={2} onChange={(e) => handleNoticePeriod(e)} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.notice_period} />
                        {Tab3Formik.errors.notice_period && Tab3Formik.touched.notice_period ? <div className="help-block text-danger">{Tab3Formik.errors.notice_period}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Date of Relieving <span className='error'>*</span></label>
                      <div className="">
                        <SingleDatePicker
                          id={'relieving_date'}
                          date={relievingDate}
                          onDateChange={(date) => handleDateOfRelieving(date)}
                          focused={focusRelievingDate}
                          onFocusChange={({ focused }) => setfocusRelievingDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Date of Relieving'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`relieving_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('relieving_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.relieving_date && Tab3Formik.touched.relieving_date ? <div className="help-block text-danger">{Tab3Formik.errors.relieving_date}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Reason for Leaving <span className='error'>*</span></label>
                      <div className="">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Reason for Leaving'}
                          value={resLeaving}
                          name="leaving_reason_id"
                          options={props?.dataEdit?.data?.leaving_reason_id_list}
                          onChange={(e) => handleReasonForLeaving(e)}
                          onBlur={Tab3Formik.handleBlur}
                        />
                        {Tab3Formik.errors.leaving_reason_id && Tab3Formik.touched.leaving_reason_id ? <div className="help-block text-danger">{Tab3Formik.errors.leaving_reason_id}</div> : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-3">
                    <div className="form-group">
                      {(() => {
                        if (hideTerminationDate) {
                          return (
                            <>
                              <label htmlFor="">Date of Termination <span className='error'>*</span></label>
                              <SingleDatePicker
                                id={'termination_date'}
                                date={terminationDate}
                                onDateChange={(date) => handledateOfTermination(date)}
                                focused={focusTerminationDate}
                                onFocusChange={({ focused }) => setfocusTerminationDate(focused)}
                                numberOfMonths={1}
                                displayFormat="DD-MM-YYYY"
                                isOutsideRange={() => false}
                                placeholder='Date of Termination'
                                readOnly={true}
                                renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                      <select
                                        value={month.month()}
                                        onChange={(e) => onMonthSelect(month, e.target.value)}
                                      >
                                        {moment.months().map((label, value) => (
                                          <option value={value} key={`termination_date_${value}`}>{label}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                        {yearsDD('termination_date_yr')}
                                      </select>
                                    </div>
                                  </div>}
                              />

                              {Tab3Formik.errors.termination_date && Tab3Formik.touched.termination_date ? <div className="help-block text-danger">{Tab3Formik.errors.termination_date}</div> : null}
                            </>
                          )
                        } else if (hideDeathDate) {
                          return (
                            <>
                              <label htmlFor="">Date of Death <span className='error'>*</span></label>
                              <SingleDatePicker
                                id={'death_date'}
                                date={deathDate}
                                onDateChange={(date) => handledateOfDeath(date)}
                                focused={focusDeathDate}
                                onFocusChange={({ focused }) => setfocusDeathDate(focused)}
                                numberOfMonths={1}
                                displayFormat="DD-MM-YYYY"
                                isOutsideRange={() => false}
                                placeholder='Date of Death'
                                readOnly={true}
                                renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                      <select
                                        value={month.month()}
                                        onChange={(e) => onMonthSelect(month, e.target.value)}
                                      >
                                        {moment.months().map((label, value) => (
                                          <option value={value} key={`death_date_${value}`}>{label}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                        {yearsDD('death_date_yr')}
                                      </select>
                                    </div>
                                  </div>}
                              />

                              {Tab3Formik.errors.death_date && Tab3Formik.touched.death_date ? <div className="help-block text-danger">{Tab3Formik.errors.death_date}</div> : null}
                            </>
                          )
                        } else if (hideOthers) {
                          return (
                            <>
                              <label htmlFor="">Other Reason <span className='error'>*</span></label>
                              <textarea name="other_reason" value={Tab3Formik.values.other_reason} className="form-control" placeholder="Other Reason" maxLength={500} onChange={Tab3Formik.handleChange} onBlur={Tab3Formik.handleBlur} />
                            </>
                          )
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </CCardBody>
            </CCard>


            <CCard className="mb-4">
              <CCardHeader id="headingTwo " className="header">
                <div>
                  <h5 className="m-0 p-0">Employee Name Change by Gazette</h5>
                </div>
              </CCardHeader>
              <CCardBody>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Upload Gazette Notification <span className='error'>*</span></label>
                      <br />
                      <input type="file" name='gazette_proof' onChange={(event) => { handleGazetteNotiChange(event) }} />
                      {Tab3Formik.errors.gazette_proof && Tab3Formik.touched.gazette_proof ? <div className="help-block text-danger">{Tab3Formik.errors.gazette_proof}</div> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">New Name As per Gazette Notification <span className='error'>*</span></label>
                      <div className="">
                        <input type="text" name='new_name' className="form-control" placeholder='New Name As per Gazette Notification' maxLength={50} onChange={Tab3Formik.handleChange} onBlur={Tab3Formik.handleBlur} value={Tab3Formik.values.new_name} />
                        {Tab3Formik.errors.new_name && Tab3Formik.touched.new_name ? <div className="help-block text-danger">{Tab3Formik.errors.new_name}</div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Date of Gazette Notification <span className='error'>*</span></label>
                      <div className="">
                        <SingleDatePicker
                          id={'gazette_date'}
                          date={GazetteDate}
                          onDateChange={(date) => handledateOfGazNoti(date)}
                          focused={focusGazetteDate}
                          onFocusChange={({ focused }) => setfocusGazetteDate(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Date of Gazette Notification'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`gazette_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('gazette_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {Tab3Formik.errors.gazette_date && Tab3Formik.touched.gazette_date ? <div className="help-block text-danger">{Tab3Formik.errors.gazette_date}</div> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </div>
          <CCardFooter>
            <CRow>
              <CCol className='text-center'>
                <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                <Link className='ml-3 btn btn-danger' to={'/employee/employee'}><CIcon name="cil-ban" /> Cancel</Link>
              </CCol>
            </CRow>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default Tab3
