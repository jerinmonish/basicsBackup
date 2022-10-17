import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { TextMask, InputAdapter } from 'react-text-mask-hoc'
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CostCenterDropDownList, CostCenterBasedRepManagerJob, JobPositionDropDownList, BloodgroupDropDownList, ReligionDropDownList, CommonCountryList, CommonStateList, CommonDistrictList } from './../../../actions/commonAction';
import { AadharIdApi, PanIdApi } from 'src/actions/master';
import { CandidateUpdateAPI } from '../../../actions/onboarding'
import { convertValueLabel, indianDateFormat, convertDateToMDY } from '../../../utils/helper'
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import CLoader from 'src/pages/loader/CLoader';
const AddCandidate2 = (props) => {
  const dispatch = useDispatch()
  const { aadharData, panData } = useSelector((state) => state.masterBackend);
  const { isLoading } = useSelector((state) => state.onboardingBackend);
  //Dropdown Data
  const [gender, setGender] = useState([]);
  const [bloodgroup, setBloodGroup] = useState([]);
  const [religion, setReligion] = useState([]);
  const [marriageStatus, setMarriageStatus] = useState([]);
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
  const [votCountryName, setVotCountryName] = useState([]);
  const [passportCountryName, setPassportCountryName] = useState([]);

  //checkbox
  const [internationalWorker, setIsInternationalWorker] = useState(false);
  const [isPhyDisab, setIsPhyDisab] = useState(false);

  //Image/Word Data
  const [aadharImgNumber, setAadharImgNumber] = useState('');
  const [aadharImgName, setAadharImgName] = useState('');
  const [aadharExistingFile, setAadharExistingFile] = useState('');

  const [panImgNumber, setPanImgNumber] = useState('');
  const [panImgName, setPanImgName] = useState('');
  const [panExistingFile, setPanExistingFile] = useState('');

  const [voterIdExistingFile, setVoterIdExistingFile] = useState('');

  const [passportIdExistingFile, setPassportIdExistingFile] = useState('');

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(BloodgroupDropDownList());
    dispatch(ReligionDropDownList());
    dispatch(CommonCountryList());
  }, [])

  const dropdownData = useSelector((state) => state.commonData)
  // console.log(dropdownData);

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      setCurState(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result]);

  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      setCurDistict(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result]);

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

  useEffect(() => {
    if (aadharData?.data?.Uid) {
      setAadharImgNumber(aadharData?.data?.Uid);
    }
    if (aadharData?.data?.Name) {
      setAadharImgName(aadharData?.data?.Name);
    }

    if (panData?.data?.pan) {
      setPanImgNumber(panData?.data?.pan);
    }
    if (panData?.data?.Name) {
      setPanImgName(panData?.data?.Name);
    }
  }, [aadharData, panData])



  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }
  // Date of Leaving
  const yearsDateOfLeaving = (mrs = false) => {
    let years = []
    for (let i = moment().year(); i <= moment().year() + 30; i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  //Hide/Show States
  const [hideMaritalStatus, setHideMaritalStatus] = useState(0);
  const [hideDisabilitiesArea, setHideDisabilitiesArea] = useState(0);

  //Predefined Option Data
  const [maritalOptions, setMaritalOptions] = useState([{ value: 'single', label: 'Single' }, { value: 'bachelor', label: 'Bachelor' }, { value: 'spinster', label: 'Spinster' }, { value: 'married', label: 'Married' }]);
  const [genderOptions, setGenderOptions] = useState([{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'transgender', label: 'Transgender' }]);


  //Datepicker Settings
  const [dateOfBir, setdateOfBir] = useState(null);
  const [focusOfBir, setfocusOfBir] = useState(false);

  const [dateOfPExp, setdateOfPExp] = useState(null);
  const [focusOfPExp, setfocusOfPExp] = useState(false);

  const [dateOfJoining, setdateOfJoining] = useState(null);
  const [focusOfJoining, setfocusOfJoining] = useState(false);

  const [dateOfLeaving, setdateOfLeaving] = useState(null);
  const [focusOfLeaving, setfocusOfLeaving] = useState(false);

  const [dateOfMarriage, setdateOfMarriage] = useState(null);
  const [focusOfMarriage, setfocusOfMarriage] = useState(false);

  const [spouseDob, setspouseDob] = useState(null);
  const [focusofSpouseDob, setfocusofSpouseDob] = useState(false);

  //Image state data
  const [aadharImgSelected, setAadharImgSelected] = useState([]);
  const [panImgSelected, setPanImgSelected] = useState([]);
  const [voterImgSelected, setVoterImgSelected] = useState([]);
  const [passportImgSelected, setPassportImgSelected] = useState([]);

  const [previewAadhar, setPreviewAadhar] = useState('');
  const [previewPan, setPreviewPan] = useState('');
  const [previewVoter, setPreviewVoter] = useState('');
  const [previewPassport, setPreviewPassport] = useState('');


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

  const AddCandidate2Formik = useFormik({
    initialValues: {
      birthday: '',
      gender: '',
      religion_id: '',
      // personal_email: '',
      mobile_phone: '',
      emergency_contact: '',
      emergency_contact_person: '',
      marital: '',
      spouse_complete_name: '',
      marriage_date: '',
      spouse_birthdate: '',
      is_disabled: '',
      disabilities: '',
      door_no: '',
      house_name: '',
      street_name: '',
      place_name: '',
      country_id: '',
      district_id: '',
      state_id: '',
      pin_code: '',
      cur_door_no: '',
      cur_house_name: '',
      cur_street_name: '',
      cur_place_name: '',
      cur_country_id: '',
      cur_state_id: '',
      cur_district_id: '',
      cur_pin_code: '',
      aadhar_proof: '',
      aadhar: '',
      name_as_per_aadhar: '',
      pan_proof: '',
      pan_id: '',
      name_as_per_pan: '',
      voter_proof: '',
      voter_id: '',
      name_as_per_voter_id: '',
      voter_country_id: '',
      passport_country_id: '',
      passport_id: '',
      passport_sur_name: '',
      passport_given_name: '',
      passport_place_of_issue: '',
      passport_expiry_date: '',
      is_international_worker: '',
      uan_no: '',
      epf_previous_employer: '',
      epf_joining_date: '',
      epf_leaving_date: '',
    },
    validationSchema: Yup.object().shape({
      birthday: Yup.string().required('This field is required'),
      gender: Yup.string().required('This field is required'),
      //religion_id: Yup.string().required('This field is required'),
      // personal_email: Yup.string().email('Invalid email format').required('This field is required'),
      mobile_phone: Yup.string()
        .required("This field is Required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{7,8}?$/,
          "Phone number is not valid"
        ),
      // Yup.number().typeError("That doesn't look like a mobile number").required('This field is required'),
      //emergency_contact: Yup.string().required('This field is required'),
      //emergency_contact_person: Yup.string().required('This field is required'),
      marital: Yup.string().required('This field is required'),
      /*door_no: Yup.string().required('This field is required'),
      house_name: Yup.string().required('This field is required'),
      street_name: Yup.string().required('This field is required'),
      place_name: Yup.string().required('This field is required'),
      country_id: Yup.string().required('This field is required'),
      district_id: Yup.string().required('This field is required'),
      state_id: Yup.string().required('This field is required'),
      pin_code: Yup.string().required('This field is required'),*/
      cur_door_no: Yup.string().required('This field is required'),
      cur_house_name: Yup.string().required('This field is required'),
      cur_street_name: Yup.string().required('This field is required'),
      cur_place_name: Yup.string().required('This field is required'),
      cur_country_id: Yup.string().required('This field is required'),
      cur_state_id: Yup.string().required('This field is required'),
      cur_district_id: Yup.string().required('This field is required'),
      cur_pin_code: Yup.string().required('This field is required'),
      //aadhar_proof: Yup.string().required('This field is required'),
      aadhar: Yup.number().typeError("Must be a valid aadhar Number"),
      //name_as_per_aadhar: Yup.string().required('This field is required'),
      // pan_proof:Yup.string().required('This field is required'),
      pan_id: Yup.string().matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, "Must be a valid PAN Number"),
      //name_as_per_pan: Yup.string().required('This field is required'),
      // voter_proof:'',
      voter_id: Yup.string().matches(/^[A-Z]{3}[0-9]{7}$/, "Must be a valid Voter ID"),
      // name_as_per_voter_id: Yup.string().required('This field is required'),
      // voter_country_id: Yup.string().required('This field is required'),
      // passport_country_id: Yup.string().required('This field is required'),
      passport_id: Yup.number().typeError("That doesn't look like a Passport number"),
      /*passport_sur_name: Yup.string().required('This field is required'),
      passport_given_name: Yup.string().required('This field is required'),
      passport_place_of_issue: Yup.string().required('This field is required'),
      passport_expiry_date: Yup.string().required('This field is required'),*/
      uan_no: Yup.number().typeError("That doesn't look like a UAN number"),
      /*epf_previous_employer: Yup.string().required('This field is required'),
      epf_joining_date: Yup.string().required('This field is required'),
      epf_leaving_date: Yup.string().required('This field is required'),*/
    }),
    onSubmit: (values) => {
      values.aadhar = aadharImgNumber;
      values.name_as_per_aadhar = aadharImgName;
      values.pan_id = panImgNumber;
      values.name_as_per_pan = panImgName;
      const formData = JSON.stringify({ params: { data: values, tab: 'T2' } })
      // console.log(values);
      // console.log(aadharImgNumber);
      dispatch(CandidateUpdateAPI(props.dataId, formData))
    },
  });

  //Update Data
  useEffect(() => {
    if (props?.dataEdit?.data !== null) {
      AddCandidate2Formik.setValues({
        "birthday": (props?.dataEdit?.data?.birthday) ? indianDateFormat(props?.dataEdit?.data?.birthday) : '',
        "gender": props?.dataEdit?.data?.gender,
        "religion_id": props?.dataEdit?.data?.religion_id,
        // "personal_email": props?.dataEdit?.data?.personal_email,
        "mobile_phone": props?.dataEdit?.data?.mobile_phone,
        "emergency_contact": props?.dataEdit?.data?.emergency_contact,
        "emergency_contact_person": props?.dataEdit?.data?.emergency_contact_person,
        "marital": props?.dataEdit?.data?.marital,
        "spouse_complete_name": props?.dataEdit?.data?.spouse_complete_name,
        "marriage_date": props?.dataEdit?.data?.marriage_date,
        "spouse_birthdate": props?.dataEdit?.data?.spouse_birthdate,
        "is_disabled": props?.dataEdit?.data?.is_disabled,
        "disabilities": props?.dataEdit?.data?.disabilities,
        "door_no": props?.dataEdit?.data?.door_no,
        "house_name": props?.dataEdit?.data?.house_name,
        "street_name": props?.dataEdit?.data?.street_name,
        "place_name": props?.dataEdit?.data?.place_name,
        "country_id": props?.dataEdit?.data?.country_id,
        "district_id": props?.dataEdit?.data?.district_id,
        "state_id": props?.dataEdit?.data?.state_id,
        "pin_code": props?.dataEdit?.data?.pin_code,
        "cur_door_no": props?.dataEdit?.data?.cur_door_no,
        "cur_house_name": props?.dataEdit?.data?.cur_house_name,
        "cur_street_name": props?.dataEdit?.data?.cur_street_name,
        "cur_place_name": props?.dataEdit?.data?.cur_place_name,
        "cur_country_id": props?.dataEdit?.data?.cur_country_id,
        "cur_state_id": props?.dataEdit?.data?.cur_state_id,
        "cur_district_id": props?.dataEdit?.data?.cur_district_id,
        "cur_pin_code": props?.dataEdit?.data?.cur_pin_code,
        //"aadhar_proof":props?.dataEdit?.data?.aadhar_proof,
        "aadhar": (props?.dataEdit?.data?.aadhar) ? props?.dataEdit?.data?.aadhar : aadharImgNumber,
        "name_as_per_aadhar": props?.dataEdit?.data?.name_as_per_aadhar,
        //"pan_proof":props?.dataEdit?.data?.pan_proof,
        "pan_id": (props?.dataEdit?.data?.pan_id) ? props?.dataEdit?.data?.pan_id : '',
        "name_as_per_pan": props?.dataEdit?.data?.name_as_per_pan,
        //"voter_proof":props?.dataEdit?.data?.voter_proof,
        "voter_id": props?.dataEdit?.data?.voter_id,
        "name_as_per_voter_id": props?.dataEdit?.data?.name_as_per_voter_id,
        "voter_country_id": props?.dataEdit?.data?.voter_country_id,
        "passport_country_id": props?.dataEdit?.data?.passport_country_id,
        "passport_id": props?.dataEdit?.data?.passport_id,
        "passport_sur_name": props?.dataEdit?.data?.passport_sur_name,
        "passport_given_name": props?.dataEdit?.data?.passport_given_name,
        "passport_place_of_issue": props?.dataEdit?.data?.passport_place_of_issue,
        "passport_expiry_date": props?.dataEdit?.data?.passport_expiry_date,
        "is_international_worker": props?.dataEdit?.data?.is_international_worker,
        "uan_no": props?.dataEdit?.data?.uan_no,
        "epf_previous_employer": props?.dataEdit?.data?.epf_previous_employer,
        "epf_joining_date": props?.dataEdit?.data?.epf_joining_date,
        "epf_leaving_date": props?.dataEdit?.data?.epf_leaving_date,
      });

      if (props?.dataEdit?.data?.birthday) {
        setdateOfBir(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.birthday))));
      }
      if (props?.dataEdit?.data?.passport_expiry_date) {
        setdateOfPExp(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.passport_expiry_date))));
      }
      if (props?.dataEdit?.data?.epf_joining_date) {
        setdateOfJoining(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.epf_joining_date))));
      }
      if (props?.dataEdit?.data?.epf_leaving_date) {
        setdateOfLeaving(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.epf_leaving_date))));
      }
      if (props?.dataEdit?.data?.marriage_date) {
        setdateOfMarriage(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.marriage_date))));
      }
      if (props?.dataEdit?.data?.spouse_birthdate) {
        setspouseDob(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.spouse_birthdate))));
      }

      setGender(convertValueLabel(props?.dataEdit?.data?.gender, props?.dataEdit?.data?.gender_label));
      setBloodGroup(convertValueLabel(props?.dataEdit?.data?.blood_group_id, props?.dataEdit?.data?.blood_group_id_name));
      setReligion(convertValueLabel(props?.dataEdit?.data?.religion_id, props?.dataEdit?.data?.religion_id_name));
      setMarriageStatus(convertValueLabel(props?.dataEdit?.data?.marital, props?.dataEdit?.data?.marital_label));
      if (props?.dataEdit?.data?.marital == "married") {
        setHideMaritalStatus(1);
      } else {
        setHideMaritalStatus(0);
      }
      if (props?.dataEdit?.data?.is_disabled == true) {
        AddCandidate2Formik.setFieldValue('is_disabled', 1);
        setHideDisabilitiesArea(1);
        setIsPhyDisab(true);
      } else {
        AddCandidate2Formik.setFieldValue('is_disabled', 0);
        setHideDisabilitiesArea(0);
        setIsPhyDisab(false);
      }

      if (props?.dataEdit?.data?.is_international_worker == true) {
        AddCandidate2Formik.setFieldValue('is_international_worker', 1);
        setIsInternationalWorker(true);
      } else {
        AddCandidate2Formik.setFieldValue('is_international_worker', 0);
        setIsInternationalWorker(false);
      }

      setCurCountry(convertValueLabel(props?.dataEdit?.data?.cur_country_id, props?.dataEdit?.data?.cur_country_id_name));
      if (props?.dataEdit?.data?.cur_state_id_list) {
        setCurState(props?.dataEdit?.data?.cur_state_id_list)
      }
      setCurStateName(convertValueLabel(props?.dataEdit?.data?.cur_state_id, props?.dataEdit?.data?.cur_state_id_name));
      setCurDistrictName(convertValueLabel(props?.dataEdit?.data?.cur_district_id, props?.dataEdit?.data?.cur_district_id_name));
      if (props?.dataEdit?.data?.cur_district_id_list) {
        setCurDistict(props?.dataEdit?.data?.cur_district_id_list)
      }
      setPerCountry(convertValueLabel(props?.dataEdit?.data?.country_id, props?.dataEdit?.data?.country_id_name));
      if (props?.dataEdit?.data?.state_id_list) {
        setPerState(props?.dataEdit?.data?.state_id_list)
      }
      if (props?.dataEdit?.data?.district_id_list) {
        setPerDistict(props?.dataEdit?.data?.district_id_list)
      }
      setPerStateName(convertValueLabel(props?.dataEdit?.data?.state_id, props?.dataEdit?.data?.state_id_name));
      setPerDistrictName(convertValueLabel(props?.dataEdit?.data?.district_id, props?.dataEdit?.data?.district_id_name));
      setPassportCountryName(convertValueLabel(props?.dataEdit?.data?.passport_country_id, props?.dataEdit?.data?.passport_country_id_name));
      setVotCountryName(convertValueLabel(props?.dataEdit?.data?.voter_country_id, props?.dataEdit?.data?.voter_country_id_name));
      if (props?.dataEdit?.data?.aadhar) {
        setAadharImgNumber(props?.dataEdit?.data?.aadhar);
      }

      if (props?.dataEdit?.data?.name_as_per_aadhar) {
        setAadharImgName(props?.dataEdit?.data?.name_as_per_aadhar);
      }
      setPanImgNumber(props?.dataEdit?.data?.pan_id);
      setPanImgName(props?.dataEdit?.data?.name_as_per_pan);
      if (props?.dataEdit?.data?.aadhar_proof) {
        setAadharExistingFile(props?.dataEdit?.data?.aadhar_proof);
      }
      if (props?.dataEdit?.data?.pan_proof) {
        setPanExistingFile(props?.dataEdit?.data?.pan_proof);
      }
      if (props?.dataEdit?.data?.voter_proof) {
        setVoterIdExistingFile(props?.dataEdit?.data?.voter_proof);
      }
      if (props?.dataEdit?.data?.passport_proof) {
        setPassportIdExistingFile(props?.dataEdit?.data?.passport_proof);
      }

    }
  }, [props?.dataEdit?.data])

  const handlePhysicallyDisabledChange = (e) => {
    console.log(e.target.checked);
    if (e.target.checked == true) {
      AddCandidate2Formik.setFieldValue('is_disabled', 1);
      setHideDisabilitiesArea(1);
      setIsPhyDisab(true);
    } else {
      AddCandidate2Formik.setFieldValue('is_disabled', 0);
      setHideDisabilitiesArea(0);
      setIsPhyDisab(false);
    }
  }


  const CheckIsInternational = (e) => {
    if (e.target.checked == true) {
      AddCandidate2Formik.setFieldValue('is_international_worker', 1);
      setIsInternationalWorker(true);
    } else {
      AddCandidate2Formik.setFieldValue('is_international_worker', 0);
      setIsInternationalWorker(false);
    }
  }

  const handledateOfBir = (date) => {
    if (date) {
      setdateOfBir(date)
      AddCandidate2Formik.setFieldValue('birthday', indianDateFormat(date._d));
    }
  }

  const handledateOfPExp = (date) => {
    if (date) {
      setdateOfPExp(date)
      AddCandidate2Formik.setFieldValue('passport_expiry_date', indianDateFormat(date._d));
    }
  }

  const handledateOfJoining = (date) => {
    if (date) {
      setdateOfJoining(date)
      AddCandidate2Formik.setFieldValue('epf_joining_date', indianDateFormat(date._d));
    }
  }

  const handledateOfLeaving = (date) => {
    if (date) {
      setdateOfLeaving(date)
      AddCandidate2Formik.setFieldValue('epf_leaving_date', indianDateFormat(date._d));
    }
  }

  const handleGender = (e) => {
    if (e) {
      AddCandidate2Formik.setFieldValue('gender', e.value);
      setGender(convertValueLabel(e.value, e.label));
    }
  }

  const handleBloodGroup = (e) => {
    if (e) {
      AddCandidate2Formik.setFieldValue('blood_group_id', e.value);
      setBloodGroup(convertValueLabel(e.value, e.label));
    }
  }

  const handleReligion = (e) => {
    if (e) {
      AddCandidate2Formik.setFieldValue('religion_id', e.value);
      setReligion(convertValueLabel(e.value, e.label));
    }
  }

  const handleMaritalStatusChange = (e) => {
    if (e?.value) {
      AddCandidate2Formik.setFieldValue('marital', e.value);
      setMarriageStatus(convertValueLabel(e.value, e.label));
      if (e?.value == "married") {
        setHideMaritalStatus(1);
      } else {
        setHideMaritalStatus(0);
      }
    }
  }

  const handledateOfMarriage = (date) => {
    if (date) {
      setdateOfMarriage(date)
      AddCandidate2Formik.setFieldValue('marriage_date', indianDateFormat(date._d));
    }
  }

  const handlespouseDob = (date) => {
    if (date) {
      setspouseDob(date)
      AddCandidate2Formik.setFieldValue('spouse_birthdate', indianDateFormat(date._d));
    }
  }

  const handleCurrentCountry = (e) => {
    if (e?.value) {
      setCurCountry(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('cur_country_id', e.value);
      dispatch(CommonStateList(e.value));
      onCurCountryClear();
      onCurStateClear();
    }
  }

  const handleCurrentState = (e) => {
    if (e?.value) {
      setCurStateName(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('cur_state_id', e.value);
      dispatch(CommonDistrictList(e.value));
      onCurStateClear();
    }
  }

  const handleCurrentDistrict = (e) => {
    if (e?.value) {
      setCurDistrictName(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('cur_district_id', e.value);
    }
  }

  const handlePermanentCountry = (e) => {
    if (e?.value) {
      setPerCountry(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('country_id', e.value);
      dispatch(CommonStateList(e.value));
      onPerCountryClear();
      onPerStateClear();
    }
  }

  const handlePermanentState = (e) => {
    if (e?.value) {
      setPerStateName(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('state_id', e.value);
      dispatch(CommonDistrictList(e.value));
      onPerStateClear();
    }
  }

  const handlePermanentDistrict = (e) => {
    if (e?.value) {
      setPerDistrictName(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('district_id', e.value);
    }
  }

  const handleVoterCountry = (e) => {
    if (e?.value) {
      setVotCountryName(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('voter_country_id', e.value);
    }
  }

  const handlePassportCountry = (e) => {
    if (e?.value) {
      setPassportCountryName(convertValueLabel(e.value, e.label));
      AddCandidate2Formik.setFieldValue('passport_country_id', e.value);
    }
  }

  const markasCurrentAddress = (e) => {
    //console.log(AddCandidate2Formik?.values,curCountry);
    if (e.target.checked == true) {
      AddCandidate2Formik.setFieldValue("door_no", AddCandidate2Formik?.values?.cur_door_no)
      AddCandidate2Formik.setFieldValue("house_name", AddCandidate2Formik?.values?.cur_house_name)
      AddCandidate2Formik.setFieldValue("street_name", AddCandidate2Formik?.values?.cur_street_name)
      AddCandidate2Formik.setFieldValue("place_name", AddCandidate2Formik?.values?.cur_place_name)
      AddCandidate2Formik.setFieldValue("pin_code", AddCandidate2Formik?.values?.cur_pin_code)
      if (AddCandidate2Formik?.values?.cur_country_id) {
        AddCandidate2Formik.setFieldValue("country_id", AddCandidate2Formik?.values?.cur_country_id)
        setPerCountry(convertValueLabel(curCountry?.value, curCountry.label));
      }

      if (AddCandidate2Formik?.values?.cur_state_id) {
        AddCandidate2Formik.setFieldValue("state_id", AddCandidate2Formik?.values?.cur_state_id)
        setPerStateName(convertValueLabel(curStateName?.value, curStateName.label));
      }

      if (AddCandidate2Formik?.values?.cur_district_id) {
        AddCandidate2Formik.setFieldValue("district_id", AddCandidate2Formik?.values?.cur_district_id)
        setPerDistrictName(convertValueLabel(curDistrictName?.value, curDistrictName.label));
      }
    } else {
      AddCandidate2Formik.setFieldValue("door_no", "")
      AddCandidate2Formik.setFieldValue("house_name", "")
      AddCandidate2Formik.setFieldValue("street_name", "")
      AddCandidate2Formik.setFieldValue("place_name", "")
      AddCandidate2Formik.setFieldValue("pin_code", "")
      AddCandidate2Formik.setFieldValue("country_id", "")
      setPerCountry(convertValueLabel());
      AddCandidate2Formik.setFieldValue("state_id", "")
      setPerStateName(convertValueLabel());
      AddCandidate2Formik.setFieldValue("district_id", "")
      setPerDistrictName(convertValueLabel());
    }
  }

  const handleAadharIdChange = (i) => {
    let files = i.target.files;
    if (files.length > 0) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        setPreviewAadhar(event.target.result);
        setAadharImgSelected({
          selectedImage: AddCandidate2Formik.setFieldValue("aadhar_proof", event.target.result),
        })
        if (event.target.result) {
          var adRData = JSON.stringify({ "params": { "aadhar": event.target.result } });
          dispatch(AadharIdApi(adRData));
          setPreviewAadhar(URL.createObjectURL(i.target.files[0]));
        }
      }
    }
  }

  const handleAadharNoChange = (ev) => {
    setAadharImgNumber(ev);
    AddCandidate2Formik.setFieldValue("aadhar", ev);
  }

  const handleAadharNameChange = (ev) => {
    setAadharImgName(ev);
    AddCandidate2Formik.setFieldValue("name_as_per_aadhar", ev);
  }

  const handlePanCardNoChange = (ev) => {
    setPanImgNumber(ev);
    AddCandidate2Formik.setFieldValue("pan_id", ev);
  }

  const handlePanCardNameChange = (ev) => {
    setPanImgName(ev);
    AddCandidate2Formik.setFieldValue("name_as_per_pan", ev);
  }

  const handlePanIdChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setPanImgSelected({
        selectedImage: AddCandidate2Formik.setFieldValue("pan_proof", event.target.result),
      })
      if (event.target.result) {
        var paRData = JSON.stringify({ "params": { "pan": event.target.result } });
        dispatch(PanIdApi(paRData));
        setPreviewPan(URL.createObjectURL(i.target.files[0]));
      }
    }
  }

  const handleVoterIdChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setVoterImgSelected({
        selectedImage: AddCandidate2Formik.setFieldValue("voter_proof", event.target.result),
      })
      setPreviewVoter(URL.createObjectURL(i.target.files[0]));
    }
  }

  const handlePassportIdChange = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setPassportImgSelected({
        selectedImage: AddCandidate2Formik.setFieldValue("passport_proof", event.target.result),
      })
      setPreviewPassport(URL.createObjectURL(i.target.files[0]));
    }
  }


  return (
    <CCard className="mb-4">
      {
        (isLoading === true) ? <CLoader /> :
          <CCardBody>
            <CForm onSubmit={AddCandidate2Formik.handleSubmit} className="form-horizontal">
              <div>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Personal Information</h5>
                    </div>
                  </CCardHeader>

                  <CCardBody>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Date Of Birth <span className='error'>*</span></label>
                          <SingleDatePicker
                            // isDayBlocked = {momentDate => {
                            //   if ((momentDate.format('ddd') === 'Mon' || momentDate.format('ddd') === 'Tue') && ['Mar', 'Apr'].includes(momentDate.format('MMM'))) return true
                            //     return false
                            //   }}
                            isOutsideRange={d => d.isAfter(moment())}
                            isDayHighlighted={day => day.isSame(moment(), 'd')}
                            id={'birthday'}
                            date={dateOfBir}
                            onDateChange={(date) => handledateOfBir(date)}
                            focused={focusOfBir}
                            onFocusChange={({ focused }) => setfocusOfBir(focused)}
                            numberOfMonths={1}
                            displayFormat="DD-MM-YYYY"
                            placeholder='Date of Birth'
                            readOnly={true}
                            renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                  <select
                                    value={month.month()}
                                    onChange={(e) => onMonthSelect(month, e.target.value)}
                                  >
                                    {moment.months().map((label, value) => (
                                      <option value={value} key={`birthday_${value}`}>{label}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                    {yearsDD('birthday_yr')}
                                  </select>
                                </div>
                              </div>}
                          />
                          {/* <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter} className="form-control" name='birthday' placeholder='Date Of Birth' onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.birthday}/> */}
                          {AddCandidate2Formik.errors.birthday && AddCandidate2Formik.touched.birthday ? <div className="help-block text-danger">{AddCandidate2Formik.errors.birthday}</div> : null}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Gender <span className='error'>*</span></label>
                          <div className="">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder={'Choose a Gender'}
                              value={gender}
                              name="gender"
                              options={genderOptions}
                              onChange={(e) => handleGender(e)}
                              onBlur={AddCandidate2Formik.handleBlur}
                            />
                            {AddCandidate2Formik.errors.gender && AddCandidate2Formik.touched.gender ? <div className="help-block text-danger">{AddCandidate2Formik.errors.gender}</div> : null}
                          </div>
                        </div>
                      </div>
                      {/* <pre>{JSON.stringify(AddCandidate2Formik, null, 2)}</pre> */}
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Blood Group</label>
                          <div className="">
                            {/* <input type="text" className="form-control col-10" /> <Link to=""><label className="ml-1">Generate</label></Link> */}
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder={'Choose a Blood Group'}
                              value={bloodgroup}
                              name="blood_group_id"
                              options={dropdownData?.bloodCommonData?.data?.result}
                              onChange={(e) => handleBloodGroup(e)}
                              onBlur={AddCandidate2Formik.handleBlur}
                            />
                            {AddCandidate2Formik.errors.blood_group_id && AddCandidate2Formik.touched.blood_group_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.blood_group_id}</div> : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Religion</label>
                          <div className="">
                            {/* <input type="text" className="form-control col-10" /> <Link to=""><label className="ml-1">Generate</label></Link> */}
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder={'Choose a Religion'}
                              value={religion}
                              name="religion_id"
                              options={dropdownData?.religionCommonData?.data?.result}
                              onChange={(e) => handleReligion(e)}
                              onBlur={AddCandidate2Formik.handleBlur}
                            />
                            {AddCandidate2Formik.errors.religion_id && AddCandidate2Formik.touched.religion_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.religion_id}</div> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Personal Email <span className='error'>*</span></label>
                          <input type="text" name='personal_email' className="form-control" placeholder='Personal Email' maxLength={50} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.personal_email} />
                          {AddCandidate2Formik.errors.personal_email && AddCandidate2Formik.touched.personal_email ? <div className="help-block text-danger">{AddCandidate2Formik.errors.personal_email}</div> : null}
                        </div>
                      </div> */}
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Personal Mobile Number <span className='error'>*</span></label>
                          <input type="text" name='mobile_phone' className="form-control" placeholder='Personal Mobile Number' maxLength={10} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.mobile_phone} />
                          {AddCandidate2Formik.errors.mobile_phone && AddCandidate2Formik.touched.mobile_phone ? <div className="help-block text-danger">{AddCandidate2Formik.errors.mobile_phone}</div> : null}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Emergency Contact</label>
                          <input type="text" name='emergency_contact' className="form-control" placeholder='Emergency Contact' maxLength={10} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.emergency_contact} />
                          {AddCandidate2Formik.errors.emergency_contact && AddCandidate2Formik.touched.emergency_contact ? <div className="help-block text-danger">{AddCandidate2Formik.errors.emergency_contact}</div> : null}
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <label htmlFor="">Emergency Contact Person</label>
                          <input type="text" name='emergency_contact_person' className="form-control" placeholder='Emergency Contact Person' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.emergency_contact_person} />
                          {AddCandidate2Formik.errors.emergency_contact_person && AddCandidate2Formik.touched.emergency_contact_person ? <div className="help-block text-danger">{AddCandidate2Formik.errors.emergency_contact_person}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
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
                            onBlur={AddCandidate2Formik.handleBlur}
                          />
                          {AddCandidate2Formik.errors.marital && AddCandidate2Formik.touched.marital ? <div className="help-block text-danger">{AddCandidate2Formik.errors.marital}</div> : null}
                        </div>
                      </div>

                      {(() => {
                        if (hideMaritalStatus) {
                          return (
                            <>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="">Spouse Complete Name</label>
                                  <input type="text" name='spouse_complete_name' className="form-control" placeholder='Spouse Complete Name' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.spouse_complete_name} />
                                  {AddCandidate2Formik.errors.spouse_complete_name && AddCandidate2Formik.touched.spouse_complete_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.spouse_complete_name}</div> : null}
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="">Date of Marriage</label>
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
                                  {AddCandidate2Formik.errors.marriage_date && AddCandidate2Formik.touched.marriage_date ? <div className="help-block text-danger">{AddCandidate2Formik.errors.marriage_date}</div> : null}
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <label htmlFor="">Spouse Birthdate</label>
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
                                  {AddCandidate2Formik.errors.spouse_birthdate && AddCandidate2Formik.touched.spouse_birthdate ? <div className="help-block text-danger">{AddCandidate2Formik.errors.spouse_birthdate}</div> : null}
                                </div>
                              </div>
                            </>
                          )
                        }
                      })()}
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-lg-6">
                        <div className="form-group">
                          <CFormGroup variant="custom-checkbox" inline style={{ marginTop: '58px !important' }} id='compay_add_show_caste'>
                            <CInputCheckbox custom id="is_disabled" name="is_disabled" onChange={(e) => handlePhysicallyDisabledChange(e)} checked={isPhyDisab} />
                            <CLabel variant="custom-checkbox" htmlFor="is_disabled">Any Physical Challenges or Disabilities?</CLabel>
                          </CFormGroup>
                          {AddCandidate2Formik.errors.is_disabled && AddCandidate2Formik.touched.is_disabled ? <div className="help-block text-danger">{AddCandidate2Formik.errors.is_disabled}</div> : null}
                        </div>
                      </div>
                      {(() => {
                        if (hideDisabilitiesArea) {
                          return (
                            <>
                              <div className="col-md-3 col-lg-6">
                                <div className="form-group">
                                  <label htmlFor="">Disabilities</label>
                                  <textarea type="text" name='disabilities' className="form-control" placeholder='Disabilities' maxLength={500} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.disabilities}></textarea>
                                  {AddCandidate2Formik.errors.disabilities && AddCandidate2Formik.touched.disabilities ? <div className="help-block text-danger">{AddCandidate2Formik.errors.disabilities}</div> : null}
                                </div>
                              </div>
                            </>
                          )
                        }
                      })()}
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Current Address</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Door No. <span className='error'>*</span></label>
                        <input type="text" name='cur_door_no' value={AddCandidate2Formik.values.cur_door_no} className="form-control" placeholder='Door No.' maxLength={8} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.cur_door_no && AddCandidate2Formik.touched.cur_door_no ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_door_no}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                        <input type="text" name='cur_house_name' value={AddCandidate2Formik.values.cur_house_name} className="form-control" placeholder='House/Apartment Name' maxLength={25} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.cur_house_name && AddCandidate2Formik.touched.cur_house_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_house_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                        <input type="text" name='cur_street_name' value={AddCandidate2Formik.values.cur_street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.cur_street_name && AddCandidate2Formik.touched.cur_street_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_street_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                        <input type="text" name='cur_place_name' value={AddCandidate2Formik.values.cur_place_name} className="form-control" placeholder='Place Name' maxLength={25} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.cur_place_name && AddCandidate2Formik.touched.cur_place_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_place_name}</div> : null}
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Country <span className='error'>*</span></label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={curCountry}
                          name="cur_country_id"
                          options={dropdownData?.countryCommonData?.data?.result}
                          placeholder={'Choose a Country'}
                          onChange={(e) => handleCurrentCountry(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.cur_country_id && AddCandidate2Formik.touched.cur_country_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_country_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">State <span className='error'>*</span></label>
                        <Select
                          ref={selectCurStateRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={curStateName}
                          name="cur_state_id"
                          options={curState}
                          placeholder={'Choose a State'}
                          onChange={(e) => handleCurrentState(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.cur_state_id && AddCandidate2Formik.touched.cur_state_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_state_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">District <span className='error'>*</span></label>
                        <Select
                          ref={selectCurDistictRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={curDistrictName}
                          name="cur_district_id"
                          options={curDistict}
                          placeholder={'Choose a District'}
                          onChange={(e) => handleCurrentDistrict(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.cur_district_id && AddCandidate2Formik.touched.cur_district_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_district_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Zip <span className='error'>*</span></label>
                        <input type="text" name='cur_pin_code' value={AddCandidate2Formik.values.cur_pin_code} onChange={AddCandidate2Formik.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                        {AddCandidate2Formik.errors.cur_pin_code && AddCandidate2Formik.touched.cur_pin_code ? <div className="help-block text-danger">{AddCandidate2Formik.errors.cur_pin_code}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Permanent Address</h5>

                    </div>
                    <div className="">
                      <span className="float-right">
                        <CFormGroup variant="custom-checkbox" inline >
                          <CInputCheckbox custom id="is_same_as_current_address" name="is_same_as_current_address" onChange={(e) => markasCurrentAddress(e)} />
                          <CLabel variant="custom-checkbox" htmlFor="is_same_as_current_address">Same as Current Address ?</CLabel>
                        </CFormGroup>
                      </span>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Door No.</label>
                        <input type="text" name='door_no' value={AddCandidate2Formik.values.door_no} className="form-control" placeholder='Door No.' maxLength={8} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.door_no && AddCandidate2Formik.touched.door_no ? <div className="help-block text-danger">{AddCandidate2Formik.errors.door_no}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">House/Apartment Name</label>
                        <input type="text" name='house_name' value={AddCandidate2Formik.values.house_name} className="form-control" placeholder='House/Apartment Name' maxLength={25} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.house_name && AddCandidate2Formik.touched.house_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.house_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Street Name</label>
                        <input type="text" name='street_name' value={AddCandidate2Formik.values.street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.street_name && AddCandidate2Formik.touched.street_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.street_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Place Name</label>
                        <input type="text" name='place_name' value={AddCandidate2Formik.values.place_name} className="form-control" placeholder='Place Name' maxLength={25} onChange={AddCandidate2Formik.handleChange} />
                        {AddCandidate2Formik.errors.place_name && AddCandidate2Formik.touched.place_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.place_name}</div> : null}
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Country</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={perCountry}
                          name="country_id"
                          options={dropdownData?.countryCommonData?.data?.result}
                          placeholder={'Choose a Country'}
                          onChange={(e) => handlePermanentCountry(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.country_id && AddCandidate2Formik.touched.country_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.country_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">State</label>
                        <Select
                          ref={selectPerStateRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={perStateName}
                          name="state_id"
                          options={perState}
                          placeholder={'Choose a State'}
                          onChange={(e) => handlePermanentState(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.state_id && AddCandidate2Formik.touched.state_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.state_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">District</label>
                        <Select
                          ref={selectPerDistictRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={perDistrictName}
                          name="district_id"
                          options={perDistict}
                          placeholder={'Choose a District'}
                          onChange={(e) => handlePermanentDistrict(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.district_id && AddCandidate2Formik.touched.district_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.district_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Zip</label>
                        <input type="text" name='pin_code' value={AddCandidate2Formik.values.pin_code} onChange={AddCandidate2Formik.handleChange} className="form-control" placeholder='Zip' maxLength={10} />
                        {AddCandidate2Formik.errors.pin_code && AddCandidate2Formik.touched.pin_code ? <div className="help-block text-danger">{AddCandidate2Formik.errors.zpin_codeip}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
                <div className=''>
                  <CCard className="mb-4">
                    <CCardHeader id="headingTwo " className="header">
                      <div>
                        <h5 className="m-0 p-0">Aadhar Information test</h5>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row form-group">
                        <div className="col-lg-4">
                          <label htmlFor="">Aadhar Proof</label>
                          <input type="file" name='aadhar_proof' onChange={(event) => { handleAadharIdChange(event) }} />
                          {(() => {
                            if (previewAadhar) {
                              return (
                                <div className='mt-2'><a href={previewAadhar} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                              )
                            } else if (aadharExistingFile) {
                              return (
                                <div className='mt-2'><a href={aadharExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                              )
                            }
                          })()}
                          {/*
                              
                              (previewAadhar) && <div className='mt-2'><a href={previewAadhar} target='_blank' className='mt-4'>New Attachment</a></div>
                            }
                            {
                              (aadharExistingFile) && <div className='mt-2'><a href={aadharExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                            */}
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="">Aadhar Number</label>
                          <input type="text" name='aadhar' id='aadhar' className="form-control" placeholder='Aadhar Number' maxLength={12} onChange={e => handleAadharNoChange(e.target.value)} onBlur={AddCandidate2Formik.handleBlur} value={aadharImgNumber} />
                          {AddCandidate2Formik.errors.aadhar && AddCandidate2Formik.touched.aadhar ? <div className="help-block text-danger">{AddCandidate2Formik.errors.aadhar}</div> : null}
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="">Name as per Aadhar</label>
                          <input type="text" name='name_as_per_aadhar' className="form-control" placeholder='Name as per Aadhar' maxLength={50} onChange={e => handleAadharNameChange(e.target.value)} onBlur={AddCandidate2Formik.handleBlur} value={aadharImgName} />
                          {AddCandidate2Formik.errors.name_as_per_aadhar && AddCandidate2Formik.touched.name_as_per_aadhar ? <div className="help-block text-danger">{AddCandidate2Formik.errors.name_as_per_aadhar}</div> : null}
                        </div>
                        {/* <pre>{JSON.stringify(AddCandidate2Formik, null, 2)}</pre> */}
                      </div>
                    </CCardBody>
                  </CCard>
                </div>
                <div className=''>
                  <CCard className="mb-4">
                    <CCardHeader id="headingTwo " className="header">
                      <div>
                        <h5 className="m-0 p-0">PAN Information</h5>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row form-group">
                        <div className="col-lg-4">
                          <label htmlFor="">Upload PAN Card</label>
                          <input type="file" name='pan_proof' onChange={(event) => { handlePanIdChange(event) }} />
                          {/* {
                              (panExistingFile) ? <div className='mt-2'><a href={panExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                            } */}
                          {(() => {
                            if (previewPan) {
                              return (
                                <div className='mt-2'><a href={previewPan} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                              )
                            } else if (panExistingFile) {
                              return (
                                <div className='mt-2'><a href={panExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                              )
                            }
                          })()}
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="">PAN card Number</label>
                          <input type="text" name='pan_id' className="form-control" placeholder='PAN card Number' maxLength={10} onChange={e => handlePanCardNoChange(e.target.value)} onBlur={AddCandidate2Formik.handleBlur} value={panImgNumber} />
                          {AddCandidate2Formik.errors.pan_id && AddCandidate2Formik.touched.pan_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.pan_id}</div> : null}
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="">Name as per PAN card</label>
                          <input type="text" name='name_as_per_pan' className="form-control" placeholder='Name as per PAN card' maxLength={50} onChange={e => handlePanCardNameChange(e.target.value)} onBlur={AddCandidate2Formik.handleBlur} value={panImgName} />
                          {AddCandidate2Formik.errors.name_as_per_pan && AddCandidate2Formik.touched.name_as_per_pan ? <div className="help-block text-danger">{AddCandidate2Formik.errors.name_as_per_pan}</div> : null}
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </div>

                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Voter ID Information</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row">
                      <div className="col-lg-3">
                        <label htmlFor="">Upload Voter ID</label>
                        <input type="file" name='voter_proof' onChange={(event) => { handleVoterIdChange(event) }} />
                        {/* {
                          (voterIdExistingFile) ? <div className='mt-2'><a href={voterIdExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                        } */}
                        {(() => {
                          if (previewVoter) {
                            return (
                              <div className='mt-2'><a href={previewVoter} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                            )
                          } else if (voterIdExistingFile) {
                            return (
                              <div className='mt-2'><a href={voterIdExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                            )
                          }
                        })()}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Voter ID Number</label>
                        <input type="text" name='voter_id' className="form-control" placeholder='Voter ID Number' maxLength={12} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.voter_id} />
                        {AddCandidate2Formik.errors.voter_id && AddCandidate2Formik.touched.voter_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.voter_id}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Name as per Voter ID</label>
                        <input type="text" className='form-control' name='name_as_per_voter_id' placeholder='Name as per Voter ID' maxLength={50} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.name_as_per_voter_id} />
                        {AddCandidate2Formik.touched.name_as_per_voter_id && AddCandidate2Formik.errors.name_as_per_voter_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.name_as_per_voter_id}</div> : null}
                        {/* <pre>{JSON.stringify(AddCandidate2Formik, null, 2)}</pre> */}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Voter Country</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={votCountryName}
                          name="voter_country_id"
                          options={dropdownData?.countryCommonData?.data?.result}
                          placeholder={'Choose a Country'}
                          onChange={(e) => handleVoterCountry(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.voter_country_id && AddCandidate2Formik.touched.voter_country_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.voter_country_id}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>

                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Passport Information</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-lg-3">
                        <label htmlFor="">Upload Passport</label>
                        <input type="file" name='passport_proof' onChange={(event) => { handlePassportIdChange(event) }} />
                        {/* {
                          (passportIdExistingFile) ? <div className='mt-2'><a href={passportIdExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                        } */}
                        {(() => {
                          if (previewPassport) {
                            return (
                              <div className='mt-2'><a href={previewPassport} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                            )
                          } else if (passportIdExistingFile) {
                            return (
                              <div className='mt-2'><a href={passportIdExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                            )
                          }
                        })()}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Passport Country</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={passportCountryName}
                          name="passport_country_id"
                          options={dropdownData?.countryCommonData?.data?.result}
                          placeholder={'Choose a Country'}
                          onChange={(e) => handlePassportCountry(e)}
                          onBlur={AddCandidate2Formik.handleBlur}
                        />
                        {AddCandidate2Formik.errors.passport && AddCandidate2Formik.touched.passport ? <div className="help-block text-danger">{AddCandidate2Formik.errors.passport}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Passport Number</label>
                        <input type="text" name='passport_id' className="form-control" placeholder='Passport Number' maxLength={10} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.passport_id} />
                        {AddCandidate2Formik.errors.passport_id && AddCandidate2Formik.touched.passport_id ? <div className="help-block text-danger">{AddCandidate2Formik.errors.passport_id}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Surname</label>
                        <input type="text" name='passport_sur_name' className="form-control" placeholder='Surname' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.passport_sur_name} />
                        {AddCandidate2Formik.errors.passport_sur_name && AddCandidate2Formik.touched.passport_sur_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.passport_sur_name}</div> : null}
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-lg-3">
                        <label htmlFor="">Given Name</label>
                        <input type="text" name='passport_given_name' className="form-control" placeholder='Given Name' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.passport_given_name} />
                        {AddCandidate2Formik.errors.passport_given_name && AddCandidate2Formik.touched.passport_given_name ? <div className="help-block text-danger">{AddCandidate2Formik.errors.passport_given_name}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Place Of Issue</label>
                        <input type="text" name='passport_place_of_issue' className="form-control" placeholder='Place Of Issue' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.passport_place_of_issue} />
                        {AddCandidate2Formik.errors.passport_place_of_issue && AddCandidate2Formik.touched.passport_place_of_issue ? <div className="help-block text-danger">{AddCandidate2Formik.errors.passport_place_of_issue}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Date of Expiry</label>
                        <SingleDatePicker
                          id={'passport_expiry_date'}
                          date={dateOfPExp}
                          onDateChange={(date) => handledateOfPExp(date)}
                          focused={focusOfPExp}
                          onFocusChange={({ focused }) => setfocusOfPExp(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          // isOutsideRange={d => d.isAfter(moment())}
                          isDayHighlighted={day => day.isSame(moment(), 'd')}
                          placeholder='Date of Expiry'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`passport_expiry_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDateOfLeaving('passport_expiry_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {AddCandidate2Formik.errors.passport_expiry_date && AddCandidate2Formik.touched.passport_expiry_date ? <div className="help-block text-danger">{AddCandidate2Formik.errors.passport_expiry_date}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group">
                          <CFormGroup variant="custom-checkbox" inline style={{ marginTop: '58px !important' }} id='compay_add_show_caste'>
                            <CInputCheckbox custom id="is_international_worker" name="is_international_worker" onChange={(e) => CheckIsInternational(e)} checked={internationalWorker} />
                            <CLabel variant="custom-checkbox" htmlFor="is_international_worker">Is International Worker?</CLabel>
                          </CFormGroup>
                          {AddCandidate2Formik.errors.is_international_worker && AddCandidate2Formik.touched.is_international_worker ? <div className="help-block text-danger">{AddCandidate2Formik.errors.is_international_worker}</div> : null}
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>

                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">EPF Information</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-lg-3">
                        <label htmlFor="">UAN Number</label>
                        <input type="text" name='uan_no' className="form-control" placeholder='UAN Number' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.uan_no} />
                        {AddCandidate2Formik.errors.uan_no && AddCandidate2Formik.touched.uan_no ? <div className="help-block text-danger">{AddCandidate2Formik.errors.uan_no}</div> : null}
                      </div>
                      <div className="col-lg-3" style={{ whiteSpace: 'nowrap' }}>
                        <label htmlFor="">Name of the Previous Employer</label>
                        <input type="text" name='epf_previous_employer' className="form-control" placeholder='Name of the Previous Employer' maxLength={20} onChange={AddCandidate2Formik.handleChange} onBlur={AddCandidate2Formik.handleBlur} value={AddCandidate2Formik.values.epf_previous_employer} />
                        {AddCandidate2Formik.errors.epf_previous_employer && AddCandidate2Formik.touched.epf_previous_employer ? <div className="help-block text-danger">{AddCandidate2Formik.errors.epf_previous_employer}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Date of Joining</label>
                        <SingleDatePicker
                          id={'epf_joining_date'}
                          date={dateOfJoining}
                          onDateChange={(date) => handledateOfJoining(date)}
                          focused={focusOfJoining}
                          onFocusChange={({ focused }) => setfocusOfJoining(focused)}
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
                                    <option value={value} key={`epf_joining_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('epf_joining_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {AddCandidate2Formik.errors.epf_joining_date && AddCandidate2Formik.touched.epf_joining_date ? <div className="help-block text-danger">{AddCandidate2Formik.errors.epf_joining_date}</div> : null}
                      </div>
                      <div className="col-lg-3">
                        <label htmlFor="">Date of Leaving</label>
                        <SingleDatePicker
                          id={'epf_leaving_date'}
                          date={dateOfLeaving}
                          onDateChange={(date) => handledateOfLeaving(date)}
                          focused={focusOfLeaving}
                          onFocusChange={({ focused }) => setfocusOfLeaving(focused)}
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          isOutsideRange={() => false}
                          placeholder='Date of Leaving'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select
                                  value={month.month()}
                                  onChange={(e) => onMonthSelect(month, e.target.value)}
                                >
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`epf_leaving_date_${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDateOfLeaving('epf_leaving_date_yr')}
                                </select>
                              </div>
                            </div>}
                        />
                        {AddCandidate2Formik.errors.epf_leaving_date && AddCandidate2Formik.touched.epf_leaving_date ? <div className="help-block text-danger">{AddCandidate2Formik.errors.epf_leaving_date}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
              <CCardFooter>
                <CRow>
                  <CCol className='col-md-10' align="center" >
                    <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                    <Link className='ml-3 btn btn-danger' to={'/onboarding/candidates'}><CIcon name="cil-ban" /> Cancel</Link>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CForm>
          </CCardBody>
      }
    </CCard>
  )
}
export default AddCandidate2
