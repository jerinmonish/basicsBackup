import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LocationDropDownList, FunctionDropDownList, JoblistDropDownList, MediumDropDownList, CommonCountryList, CommonStateList, CommonDistrictList } from '../../actions/commonAction'
import { CandidateAddAPI, CandidateUpdateAPI, GetJobBasedCompany, CandidateApplyJob, JobBasicAddAPI } from '../../actions/onboarding'
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
  CFormGroup,
  CInputCheckbox,
  CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { decryptSingleData, indianDateFormat, convertValueLabel, convertDateToMDY } from '../../utils/helper'
import { UserListDropDown } from '../../actions/administration';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import CLoader from 'src/pages/loader/CLoader';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from "src/actions/types"
const JobBasicTab = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const dropdownData = useSelector((state) => state.commonData);
  // console.log("dara", dropdownData);
  const { isLoading, error, success, showToast } = useSelector((state) => state.onboardingBackend);

  const AppliedJob = useSelector((state) => state.onboardingBackend);
  // console.log("onboard", AppliedJob);

  const administrationData = useSelector((state) => state.administrationBackend);
  const [gender, setGender] = useState([]);
  const [genderOptions, setGenderOptions] = useState([{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'transgender', label: 'Transgender' }]);

  const [curCountry, setCurCountry] = useState([]);
  const [curState, setCurState] = useState([]);
  const [curDistict, setCurDistict] = useState([]);
  const [perCountry, setPerCountry] = useState([]);
  const [perState, setPerState] = useState([]);
  const [perDistict, setPerDistict] = useState([]);

  const [curStateName, setCurStateName] = useState([]);
  const [curDistrictName, setCurDistrictName] = useState([]);
  const [perStateName, setPerStateName] = useState([]);
  const [perDistrictName, setPerDistrictName] = useState([]);

  // useEffect(() => {
  //   if (AppliedJob?.data?.result?.length > 0) {
  //     setJobOptions(AppliedJob?.data?.result)
  //   }
  // }, [AppliedJob])

  useEffect(() => {
    //To Show Success Message
    if (showToast) {
      let sMsg = ''
      if (success === 'Candidate add success') {
        sMsg = 'Candidate Successfully Saved'
      }
      if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT,
        })
        dispatch({
          type: constants.MESSAGE_CLEAR,
        })
      }
    }
  }, [success, showToast]);

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
    dispatch(JoblistDropDownList())
    dispatch(MediumDropDownList())
  }, [])

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

  const [dateEpfSt, setDateEpfSt] = useState(null);
  const [focusEsiSt, setFocusEsiSt] = useState(false);

  const handleEsiDate = (date) => {
    if (date) {
      setDateEpfSt(date)
      CandidateAddFormik.setFieldValue('applied_on', indianDateFormat(date._d));
    }
  }

  const [dateAvailability, setDateAvailability] = useState(null);
  const [focusAvailability, setFocusAviSt] = useState(false);

  const [datebirthday, setDateBirthday] = useState(null);
  const [focusBirthday, setFocusBirthday] = useState(false);

  const handleAviDate = (date) => {
    if (date) {
      setDateAvailability(date)
      CandidateAddFormik.setFieldValue('availability', indianDateFormat(date._d));
    }
  }
  const handleBirtDate = (date) => {
    if (date) {
      setDateBirthday(date)
      CandidateAddFormik.setFieldValue('birthday', indianDateFormat(date._d));
    }
  }

  //To load years
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  const [groupChanged, setGroupChanged] = useState(0);
  const [companyChanged, setCompanyChanged] = useState(0);
  const [locationChanged, setLocationChanged] = useState(0);
  const [functionChanged, setFunctionChanged] = useState(0);
  const [jobChanged, setJobChanged] = useState(0);


  // to load the option data for dropdown
  const groupOptions = dropdownData?.groupComData?.data?.result
  const [companyOptions, setCompanyOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [functionOptions, setFunctionOptions] = useState([]);
  // const [jobOptions, setJobOptions] = useState([]);
  const [recruiterOptions, setRecruiterOptions] = useState([]);
  const jobOptions = dropdownData?.joblistComData?.data?.result
  const mediumOptions = dropdownData?.mediumComData?.data?.result
  // setJobOptions(dropdownData?.joblistComData?.data?.result);

  const [selectGroupName, setSelectGroupName] = useState([])
  const [selectCompany, setSelectCompany] = useState([])
  const [selectlocation, setSelectLocation] = useState([])
  const [selectfunction, setSelectFunction] = useState([])
  const [selectjobname, setSelectJobname] = useState([])
  const [selectMedium, setSelectMedium] = useState([])
  const [selectRecruiter, setSelectRecruiter] = useState([])


  const selectCompanyRef = useRef()
  const selectLocationRef = useRef()
  const selectFunctionRef = useRef()
  const selectJobRef = useRef()
  const selectRecuriterRef = useRef()

  const onCompanyClear = () => {
    selectCompanyRef?.current?.select.clearValue();
    setSelectCompany(convertValueLabel([]));
  }


  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
    setSelectLocation(convertValueLabel([]));
  }

  const onFunctionClear = () => {
    selectFunctionRef?.current?.select.clearValue()
    setSelectFunction(convertValueLabel([]));
  }

  // const onJobClear = () => {
  //   selectJobRef?.current?.select.clearValue()
  //   setSelectJobname(convertValueLabel([]));
  //   setJobOptions([]);
  // }

  const onRecruiterClear = () => {
    selectRecuriterRef?.current?.select.clearValue()
    setSelectRecruiter(convertValueLabel([]));
    setRecruiterOptions([]);
  }

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

  useEffect(() => {
    if (dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
      setLocationOptions(dropdownData?.locationCommonData?.data?.result);
    }
  }, [dropdownData?.locationCommonData?.data?.result, companyChanged])


  useEffect(() => {
    if (dropdownData?.functionCommonData?.data?.result && locationChanged === 1) {
      setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
    }
  }, [dropdownData?.functionCommonData?.data?.result, locationChanged])



  // useEffect(() => {
  //   if (dropdownData?.joblistComData?.data?.result && functionChanged === 1) {
  //     setJobOptions(dropdownData?.joblistComData?.data?.result);
  //   }
  // }, [dropdownData?.joblistComData?.data?.result, functionChanged])

  useEffect(() => {
    if (administrationData?.userlistDetails?.data?.result && companyChanged === 1) {
      setRecruiterOptions(administrationData?.userlistDetails?.data?.result);
    }
  }, [administrationData?.userlistDetails?.data?.result, companyChanged])


  // const handleGroupChange = (e) => {
  //   if (e?.value) {

  //     const sendGpparams = {
  //       params: {
  //         query: '{id,name}',
  //         isDropdown: 1,
  //         filter: '[("group_id", "=", ' + e.value + ')]'
  //       },
  //     }
  //     dispatch(CompanyDropDownList(sendGpparams))
  //     CandidateAddFormik.setFieldValue('group_id', e.value)
  //     setSelectGroupName(convertValueLabel(e?.value, e?.label))
  //     onCompanyClear();
  //     onLocationClear();
  //     onFunctionClear();
  //     onJobClear();
  //     setGroupChanged(1);
  //     setLocationOptions(convertValueLabel([]));
  //     setFunctionOptions(convertValueLabel([]));
  //   }
  // }


  // const handleCompanyChange = (e) => {
  //   if (e?.value) {
  //     const sendGpparams = {
  //       params: {
  //         query: '{id,name}',
  //         isDropdown: 1,
  //         filter: '[("company_id", "=", ' + e.value + ')]'
  //       },
  //     }

  //     dispatch(LocationDropDownList(sendGpparams))
  //     CandidateAddFormik.setFieldValue('company_id', e.value)
  //     setSelectCompany(convertValueLabel(e?.value, e?.label))
  //     onLocationClear()
  //     onFunctionClear()
  //     onJobClear()
  //     onRecruiterClear()
  //     setFunctionOptions(convertValueLabel([]));
  //     setJobOptions(convertValueLabel([]));
  //     setCompanyChanged(1);
  //     const recParams = {
  //       params: {
  //         query: "{id,name}",
  //         isDropdown: 1,
  //         filter: "[['company_id', '=', " + e.value + "]]",
  //       },
  //     }
  //     dispatch(UserListDropDown(recParams));
  //   }
  // }

  const markasCurrentAddress = (e) => {
    //console.log(CandidateAddFormik?.values,curCountry);
    if (e.target.checked === true) {
      CandidateAddFormik.setFieldValue("door_no", CandidateAddFormik?.values?.cur_door_no)
      CandidateAddFormik.setFieldValue("house_name", CandidateAddFormik?.values?.cur_house_name)
      CandidateAddFormik.setFieldValue("street_name", CandidateAddFormik?.values?.cur_street_name)
      CandidateAddFormik.setFieldValue("place_name", CandidateAddFormik?.values?.cur_place_name)
      CandidateAddFormik.setFieldValue("pin_code", CandidateAddFormik?.values?.cur_pin_code)
      CandidateAddFormik.setFieldValue("country_id", CandidateAddFormik?.values?.cur_country_id)
      setPerCountry(convertValueLabel(curCountry?.value, curCountry.label));
      CandidateAddFormik.setFieldValue("state_id", CandidateAddFormik?.values?.state_id)
      setPerStateName(convertValueLabel(curStateName?.value, curStateName.label));
      CandidateAddFormik.setFieldValue("district_id", CandidateAddFormik?.values?.cur_district_id)
      setPerDistrictName(convertValueLabel(curDistrictName?.value, curDistrictName.label));
    } else {
      CandidateAddFormik.setFieldValue("door_no", "")
      CandidateAddFormik.setFieldValue("house_name", "")
      CandidateAddFormik.setFieldValue("street_name", "")
      CandidateAddFormik.setFieldValue("place_name", "")
      CandidateAddFormik.setFieldValue("pin_code", "")
      CandidateAddFormik.setFieldValue("country_id", "")
      setPerCountry(convertValueLabel());
      CandidateAddFormik.setFieldValue("state_id", "")
      setPerStateName(convertValueLabel());
      CandidateAddFormik.setFieldValue("district_id", "")
      setPerDistrictName(convertValueLabel());
    }
  }


  // const handleLocationChange = (e) => {
  //   if (e?.value) {
  //     const sendGpparams = {
  //       params: {
  //         query: '{id,name}',
  //         isDropdown: 1,
  //         filter: '[["location_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
  //       },
  //     }
  //     dispatch(FunctionDropDownList(sendGpparams))
  //     CandidateAddFormik.setFieldValue('location_id', e?.value)
  //     setSelectLocation(convertValueLabel(e?.value, e?.label))
  //     onFunctionClear()
  //     onJobClear()
  //     setJobOptions(convertValueLabel([]));
  //     setLocationChanged(1)
  //   }
  // }

  // const handleFunctionChange = (e) => {
  //   if (e?.value) {
  //     const sendGpparams = {
  //       params: {
  //         query: '{id,name}',
  //         isDropdown: 1,
  //         filter: '[["department_id", "in", [' + e?.value + ']]]',
  //       },
  //     }
  //     onJobClear()
  //     dispatch(JoblistDropDownList(sendGpparams))
  //     CandidateAddFormik.setFieldValue('department_id', e?.value)
  //     setFunctionChanged(1);
  //     setSelectFunction(convertValueLabel(e?.value, e?.label))
  //   }
  // }

  const handleJobChange = (e) => {
    if (e?.value) {
      CandidateAddFormik.setFieldValue('position_id', e?.value)
      setSelectJobname(convertValueLabel(e?.value, e?.label))
    }
  }



  const handleMediumChange = (e) => {
    if (e?.value) {
      CandidateAddFormik.setFieldValue('medium_id', e?.value)
      setSelectMedium(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleRecuriterChange = (e) => {
    if (e?.value) {
      CandidateAddFormik.setFieldValue('user_id', e?.value);
      setSelectRecruiter(convertValueLabel(e?.value, e?.label));
    }
  }

  // const handleCurrentCountry = (e) => {
  //   if (e?.value) {
  //     setCurCountry(convertValueLabel(e.value, e.label));
  //     CandidateAddFormik.setFieldValue('cur_country_id', e.value);
  //     dispatch(CommonStateList(e.value));
  //     onCurCountryClear();
  //     onCurStateClear();
  //   }
  // }
  const selectStateRef = useRef();
  const selectDistrictRef = useRef();

  const onDistrictClear = () => {
    selectDistrictRef.current.select.clearValue();
  };

  const onStateClear = () => {
    selectStateRef.current.select.clearValue();
  };


  const handleCountryChange = (e) => {
    console.log("ev country", e);
    if (e?.value) {
      onStateClear();
      onDistrictClear();
      dispatch(CommonStateList(e.value));
      setCurCountry(convertValueLabel(e.value, e.label));
      CandidateAddFormik.setFieldValue('cur_country_id', e.value);
    }
  }

  const handleStateChange = (e) => {
    if (e?.value) {
      onDistrictClear();
      setCurStateName(convertValueLabel(e.value, e.label));
      CandidateAddFormik.setFieldValue('state_id', e?.value);
      dispatch(CommonDistrictList(e.value));

    }
  }

  // const handleCurrentState = (e) => {
  //   if (e?.value) {
  //     setCurStateName(convertValueLabel(e.value, e.label));
  //     CandidateAddFormik.setFieldValue('cur_state_id', e.value);
  //     dispatch(CommonDistrictList(e.value));
  //     onCurStateClear();
  //   }
  // }

  // const handleCurrentDistrict = (e) => {
  //   if (e?.value) {
  //     setCurDistrictName(convertValueLabel(e.value, e.label));
  //     CandidateAddFormik.setFieldValue('cur_district_id', e.value);
  //   }
  // }

  const handleDistrictChange = (e) => {
    if (e?.value) {
      setCurDistrictName(convertValueLabel(e.value, e.label));
      CandidateAddFormik.setFieldValue('cur_district_id', e.value);
    }
  }

  const handlePermanentCountry = (e) => {
    if (e?.value) {
      setPerCountry(convertValueLabel(e.value, e.label));
      CandidateAddFormik.setFieldValue('country_id', e.value);
      dispatch(CommonStateList(e.value));
      onPerCountryClear();
      onPerStateClear();
    }
  }

  const handlePermanentState = (e) => {
    if (e?.value) {
      setPerStateName(convertValueLabel(e.value, e.label));
      CandidateAddFormik.setFieldValue('state_id', e.value);
      dispatch(CommonDistrictList(e.value));
      onPerStateClear();
    }
  }

  const handlePermanentDistrict = (e) => {
    if (e?.value) {
      setPerDistrictName(convertValueLabel(e.value, e.label));
      CandidateAddFormik.setFieldValue('district_id', e.value);
    }
  }


  const handleGender = (e) => {
    console.log("e gender", e);
    if (e) {
      CandidateAddFormik.setFieldValue('gender', e.value);
      setGender(convertValueLabel(e.value, e.label));
    }
  }

  // const handleMediumChange = (e) => {
  //   console.log("e gender", e);
  //   if (e) {
  //     CandidateAddFormik.setFieldValue('gender', e.value);
  //     setGender(convertValueLabel(e.value, e.label));
  //   }
  // }
  //To load dropdown predefined data
  useEffect(() => {
    // dispatch(CommonGroupList());
    // dispatch(CommonTypeOfOrgList());
    dispatch(CommonCountryList());
    // dispatch(CommonCurrencyList());
  }, []);

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      // onClear();
      setCurState(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result,]);

  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      // onDistrictClear();
      setCurDistict(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result, curDistict]);

  const countryOptions = dropdownData?.countryCommonData?.data?.result;

  const CandidateAddFormik = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      birthday: '',
      gender: '',
      email_from: '',
      year_of_experience: '',
      partner_phone: '',
      linkedin_url: '',
      cur_door_no: '',
      cur_house_name: '',
      street_name: '',
      cur_place_name: '',
      cur_country_id: '',
      state_id: '',
      cur_district_id: '',
      pin_code: '',
      position_id: '',
      salary_current: '',
      salary_expected: '',
      worked_earlier: '',
      applied_earlier: '',
      medium_id: '',
      availability: ''
    },
    validationSchema: Yup.object({
      // name: Yup.string().required('This field is required'),
      // partner_name: Yup.string().required('This field is required'),
      // // reference: Yup.string().required('This field is required'),
      // email_from: Yup.string()
      //   .required('Email is required')
      //   .email('Email is invalid'),
      // partner_mobile: Yup.string()
      //   .required("This field is Required")
      //   .matches(
      //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{7,8}?$/,
      //     "Phone number is not valid"
      //   ),
      // // description: Yup.string().required('This field is required'),
      // group_id: Yup.string().required('This field is required'),
      // company_id: Yup.string().required('This field is required'),
      // location_id: Yup.string().required('This field is required'),
      // // department_id: Yup.array().required('This field is required'),
      // job_id: Yup.string().required('This field is required'),
      // applied_on: Yup.string().required('This field is required'),
      // // medium_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {

      // console.log("val", values);

      const formData = JSON.stringify({ params: { data: values } })

      if (props?.dataEdit?.data?.id) {
        dispatch(CandidateUpdateAPI(props.dataId, formData))
      } else {
        dispatch(JobBasicAddAPI(formData, history))
      }

      // console.log("data", formData);
    },
  })

  //Update Data  
  // useEffect(() => {
  //   if (props?.dataEdit?.data !== null) {
  //     CandidateAddFormik.setValues({
  //       "name": props?.dataEdit?.data?.name ? props?.dataEdit?.data?.name : '',
  //       "partner_name": props?.dataEdit?.data?.partner_name ? props?.dataEdit?.data?.partner_name : '',
  //       "email_from": props?.dataEdit?.data?.email_from ? props?.dataEdit?.data?.email_from : '',
  //       "description": props?.dataEdit?.data?.description ? props?.dataEdit?.data?.description : '',
  //       "partner_mobile": props?.dataEdit?.data?.partner_mobile ? props?.dataEdit?.data?.partner_mobile : '',
  //       "applied_on": props?.dataEdit?.data?.applied_on ? props?.dataEdit?.data?.applied_on : null,
  //       "group_id": props?.dataEdit?.data?.group_id,
  //       "company_id": props?.dataEdit?.data?.company_id,
  //       "location_id": props?.dataEdit?.data?.location_id,
  //       "department_id": props?.dataEdit?.data?.department_id,
  //       "job_id": props?.dataEdit?.data?.job_id,
  //       "medium_id": props?.dataEdit?.data?.medium_id,
  //       "user_id": props?.dataEdit?.data?.user_id,
  //       "availability": props?.dataEdit?.data?.availability,

  //     });

  //     if (props?.dataEdit?.data?.applied_on) {
  //       setDateEpfSt(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.applied_on))));
  //     } else {
  //       setDateEpfSt(null);
  //     }
  //     if (props?.dataEdit?.data?.availability) {
  //       setDateAvailability(moment(new Date(convertDateToMDY(props?.dataEdit?.data?.availability))));
  //     } else {
  //       setDateAvailability(null);
  //     }

  //     setSelectGroupName(convertValueLabel(props?.dataEdit?.data?.group_id, props?.dataEdit?.data?.group_id_name))
  //     setSelectCompany(convertValueLabel(props?.dataEdit?.data?.company_id, props?.dataEdit?.data?.company_id_name))
  //     setSelectLocation(convertValueLabel(props?.dataEdit?.data?.location_id, props?.dataEdit?.data?.location_id_name))
  //     setSelectFunction(convertValueLabel(props?.dataEdit?.data?.department_id, props?.dataEdit?.data?.department_id_name))
  //     setSelectJobname(convertValueLabel(props?.dataEdit?.data?.job_id, props?.dataEdit?.data?.job_id_name))
  //     setSelectMedium(convertValueLabel(props?.dataEdit?.data?.medium_id, props?.dataEdit?.data?.medium_id_name))
  //     setSelectRecruiter(convertValueLabel(props?.dataEdit?.data?.user_id, props?.dataEdit?.data?.user_id_name))

  //     setCompanyOptions(props?.dataEdit?.data?.company_id_list);
  //     setLocationOptions(props?.dataEdit?.data?.location_id_list);
  //     setFunctionOptions(props?.dataEdit?.data?.department_id_list);
  //     setJobOptions(props?.dataEdit?.data?.job_id_list);
  //     setRecruiterOptions(props?.dataEdit?.data?.user_id_list);
  //   }
  // }, [props?.dataEdit?.data])

  return (
    <CCard className="mb-4">
      {
        (isLoading === true) ? <CLoader /> :
          <CCardBody>
            <CForm onSubmit={CandidateAddFormik.handleSubmit} className="form-horizontal">
              <div>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Personal Information</h5>
                    </div>
                  </CCardHeader>

                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">First Name <span className="error">*</span></label>
                        <input type="text" name="first_name" value={CandidateAddFormik.values.first_name ? CandidateAddFormik.values.first_name : ''} className="form-control" placeholder="First Name" maxLength={25} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.first_name && CandidateAddFormik.errors.first_name ? (<div className="help-block text-danger">{CandidateAddFormik.errors.first_name}</div>) : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Middle Name <span className="error">*</span></label>
                        <input type="text" name="middle_name" value={CandidateAddFormik.values.middle_name ? CandidateAddFormik.values.middle_name : ''} className="form-control" placeholder="Middle Name" maxLength={25} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.middle_name && CandidateAddFormik.errors.middle_name ? (<div className="help-block text-danger">{CandidateAddFormik.errors.middle_name}</div>) : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Last Name <span className="error">*</span></label>
                        <input type="text" name="last_name" value={CandidateAddFormik.values.last_name ? CandidateAddFormik.values.last_name : ''} className="form-control" placeholder="Last Name" maxLength={25} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.last_name && CandidateAddFormik.errors.last_name ? (<div className="help-block text-danger">{CandidateAddFormik.errors.last_name}</div>) : null}
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Date of Birth <span className="error">*</span></label>
                        <SingleDatePicker
                          id={'birthday'}
                          date={datebirthday} // momentPropTypes.momentObj or null
                          onDateChange={(date) => handleBirtDate(date)} // PropTypes.func.isRequired
                          focused={focusBirthday} // PropTypes.bool
                          onFocusChange={({ focused }) => setFocusBirthday(focused)} // PropTypes.func.isRequired
                          numberOfMonths={1}
                          displayFormat="DD-MM-YYYY"
                          //showClearDate={true}
                          isOutsideRange={() => false}
                          isDayHighlighted={day => day.isSame(moment(), 'd')}
                          placeholder='Date of Birth'
                          readOnly={true}
                          renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div>
                                <select value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
                                  {moment.months().map((label, value) => (
                                    <option value={value} key={`birthday${value}`}>{label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                  {yearsDD('birthday')}
                                </select>
                              </div>
                            </div>
                          }
                        />
                        {CandidateAddFormik.touched.birthday && CandidateAddFormik.errors.birthday ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.birthday}</div>) : null}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">Email <span className="error">*</span></label>
                        <input type="email" name="email_from" value={CandidateAddFormik.values.email_from} className="form-control" placeholder="Email" maxLength={50} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.email_from && CandidateAddFormik.errors.email_from ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.email_from}</div>) : null}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">Gender <span className="error">*</span></label>
                        <Select className="basic-single" classNamePrefix="select" placeholder={'Choose a Gender'} value={gender} name="gender" options={genderOptions} onChange={(e) => handleGender(e)} onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.gender && CandidateAddFormik.errors.gender ? (<div className="help-block text-danger">{CandidateAddFormik.errors.gender}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Year Of Experience <span className="error">*</span></label>
                          <input type="text" name="year_of_experience" value={CandidateAddFormik.values.year_of_experience} className="form-control" placeholder="Year Of Experience" maxLength={50} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} />
                          {CandidateAddFormik.touched.year_of_experience && CandidateAddFormik.errors.year_of_experience ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.year_of_experience}</div>) : null}
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Phone Number <span className="error">*</span></label>
                          <input type="text" name="partner_phone" value={CandidateAddFormik.values.partner_phone} className="form-control" placeholder="
                                   Phone Number" maxLength={10} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} />
                          {CandidateAddFormik.touched.partner_phone && CandidateAddFormik.errors.partner_phone ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.partner_phone} </div>) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">LinkedIn Url <span className="error">*</span></label>
                          <input type="text" name="linkedin_url" value={CandidateAddFormik.values.linkedin_url} className="form-control" placeholder="LinkedIn Url" maxLength={50} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} />
                          {CandidateAddFormik.touched.linkedin_url && CandidateAddFormik.errors.linkedin_url ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.linkedin_url}</div>) : null}
                        </div>
                      </div>
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
                        <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                        <input type="text" name='cur_door_no' value={CandidateAddFormik.values.cur_door_no} className="form-control" placeholder='Door No' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.cur_door_no && CandidateAddFormik.touched.cur_door_no ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_door_no}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">House Name /Apartment Name <span className='error'>*</span></label>
                        <input type="text" name='cur_house_name' value={CandidateAddFormik.values.cur_house_name} className="form-control" placeholder='House Name /Apartment Name' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.cur_house_name && CandidateAddFormik.touched.cur_house_name ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_house_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                        <input type="text" name='street_name' value={CandidateAddFormik.values.cur_street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.cur_street_name && CandidateAddFormik.touched.cur_street_name ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_street_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Village / Place Name <span className='error'>*</span></label>
                        <input type="text" name='cur_place_name' value={CandidateAddFormik.values.cur_place_name} className="form-control" placeholder='Village/ Place Name' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.cur_place_name && CandidateAddFormik.touched.cur_place_name ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_place_name}</div> : null}
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
                          options={countryOptions}
                          placeholder={'Choose a Country'}
                          onChange={(e) => handleCountryChange(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.errors.cur_country_id && CandidateAddFormik.touched.cur_country_id ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_country_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">State <span className='error'>*</span></label>
                        <Select
                          ref={selectStateRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={curStateName}
                          name="state_id"
                          options={curState}
                          placeholder={'Choose a State'}
                          onChange={(e) => handleStateChange(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.errors.state_id && CandidateAddFormik.touched.state_id ? <div className="help-block text-danger">{CandidateAddFormik.errors.state_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">District Name
                          <span className='error'>*</span></label>
                        <Select
                          ref={selectDistrictRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={curDistrictName}
                          name="cur_district_id"
                          options={curDistict}
                          placeholder={'Choose a District Name'}
                          onChange={(e) => handleDistrictChange(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.errors.cur_district_id && CandidateAddFormik.touched.cur_district_id ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_district_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          PIN Code <span className='error'>*</span></label>
                        <input type="text" name='pin_code' value={CandidateAddFormik.values.pin_code} onChange={CandidateAddFormik.handleChange} className="form-control" placeholder='PIN Code' maxLength={10} />
                        {CandidateAddFormik.errors.pin_code && CandidateAddFormik.touched.pin_code ? <div className="help-block text-danger">{CandidateAddFormik.errors.pin_code}</div> : null}
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
                        <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                        <input type="text" name='cur_door_no' value={CandidateAddFormik.values.door_no} className="form-control" placeholder='Door No' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.cur_door_no && CandidateAddFormik.touched.cur_door_no ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_door_no}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">House Name/Apartment Name <span className='error'>*</span></label>
                        <input type="text" name='cur_house_name' value={CandidateAddFormik.values.house_name} className="form-control" placeholder='House Name/Apartment Name' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.cur_house_name && CandidateAddFormik.touched.cur_house_name ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_house_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                        <input type="text" name='street_name' value={CandidateAddFormik.values.street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.street_name && CandidateAddFormik.touched.street_name ? <div className="help-block text-danger">{CandidateAddFormik.errors.street_name}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Village / Place Name <span className='error'>*</span></label>
                        <input type="text" name='place_name' value={CandidateAddFormik.values.place_name} className="form-control" placeholder='Village / Place Name' maxLength={25} onChange={CandidateAddFormik.handleChange} />
                        {CandidateAddFormik.errors.place_name && CandidateAddFormik.touched.place_name ? <div className="help-block text-danger">{CandidateAddFormik.errors.place_name}</div> : null}
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">Country <span className='error'>*</span></label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={perCountry}
                          name="country_id"
                          options={dropdownData?.countryCommonData?.data?.result}
                          placeholder={'Choose a Country'}
                          onChange={(e) => handlePermanentCountry(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.errors.country_id && CandidateAddFormik.touched.country_id ? <div className="help-block text-danger">{CandidateAddFormik.errors.country_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">State <span className='error'>*</span></label>
                        <Select
                          ref={selectPerStateRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={perStateName}
                          name="state_id"
                          options={perState}
                          placeholder={'Choose a State'}
                          onChange={(e) => handlePermanentState(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.errors.state_id && CandidateAddFormik.touched.state_id ? <div className="help-block text-danger">{CandidateAddFormik.errors.state_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">District Name <span className='error'>*</span></label>
                        <Select
                          ref={selectPerDistictRef}
                          className="basic-single"
                          classNamePrefix="select"
                          value={perDistrictName}
                          name="district_id"
                          options={perDistict}
                          placeholder={'Choose a District Name'}
                          onChange={(e) => handlePermanentDistrict(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.errors.cur_district_id && CandidateAddFormik.touched.cur_district_id ? <div className="help-block text-danger">{CandidateAddFormik.errors.cur_district_id}</div> : null}
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">PIN Code <span className='error'>*</span></label>
                        <input type="text" name='pin_code' value={CandidateAddFormik.values.pin_code} onChange={CandidateAddFormik.handleChange} className="form-control" placeholder='PIN Code' maxLength={10} />
                        {CandidateAddFormik.errors.pin_code && CandidateAddFormik.touched.pin_code ? <div className="help-block text-danger">{CandidateAddFormik.errors.pin_code}</div> : null}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="mb-4">
                  <CCardHeader id="headingTwo " className="header">
                    <div>
                      <h5 className="m-0 p-0">Employment Desired</h5>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Position Applied <span className="error">*</span></label>

                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectjobname}
                          name="position_id"
                          options={jobOptions}
                          placeholder={'Choose a Position Applied'}
                          onChange={(e) => handleJobChange(e)}
                        />

                        {/* <input type="text" name="position_id" value={CandidateAddFormik.values.position_id ? CandidateAddFormik.values.position_id : ''} className="form-control" placeholder="Position Applied" maxLength={25}
                          onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        /> */}
                        {CandidateAddFormik.touched.position_id && CandidateAddFormik.errors.position_id ? (<div className="help-block text-danger">{CandidateAddFormik.errors.position_id}</div>) : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Current Salary <span className="error">*</span></label>
                        <input type="text" name="salary_current" value={CandidateAddFormik.values.salary_current ? CandidateAddFormik.values.salary_current : ''} className="form-control" placeholder="Current Salary" maxLength={25} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.salary_current && CandidateAddFormik.errors.salary_current ? (<div className="help-block text-danger">{CandidateAddFormik.errors.salary_current}</div>) : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Expected Salary <span className="error">*</span></label>
                        <input type="text" name="salary_expected" value={CandidateAddFormik.values.salary_expected ? CandidateAddFormik.values.salary_expected : ''} className="form-control" placeholder="Expected Salary" maxLength={25} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} />
                        {CandidateAddFormik.touched.salary_expected && CandidateAddFormik.errors.salary_expected ? (<div className="help-block text-danger">{CandidateAddFormik.errors.salary_expected}</div>) : null}
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Have you Worked Here Before? <span className="error">*</span></label>

                        <div className="">
                          <input type={'radio'} className="" id="radio1" onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} name="worked_earlier" value="1" /> Yes&nbsp;&nbsp;
                          <input type={'radio'} className="" id="radio1" onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} name="worked_earlier" value="0" /> No
                          {/* <CFormGroup variant="checkbox">
                                        <CInputRadio className="form-check-input" id="radio1" name="radios" value="Yes" />
                                        <CLabel variant="checkbox" htmlFor="radio1">Yes</CLabel>
                                        <CInputRadio className="form-check-input" id="radio2" name="radios" value="No" />
                                        <CLabel variant="checkbox" htmlFor="radio2">No</CLabel>
                                      </CFormGroup> */}
                          {CandidateAddFormik.touched.worked_earlier && CandidateAddFormik.errors.worked_earlier ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.worked_earlier}</div>) : null}
                        </div>
                        {/* <input type="text" name="worked_earlier" value={CandidateAddFormik.values.worked_earlier ? CandidateAddFormik.values.worked_earlier : ''} className="form-control" placeholder="Have you Worked Here Before?" maxLength={125} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} /> */}

                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">Have You Applied Here Before ? <span className="error">*</span></label>

                        <div className="">
                          <input type={'radio'} className="" id="radio1" onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} name="applied_earlier" value="1" /> Yes&nbsp;&nbsp;
                          <input type={'radio'} className="" id="radio1" onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} name="applied_earlier" value="0" /> No
                          {/* <CFormGroup variant="checkbox">
                                        <CInputRadio className="form-check-input" id="radio1" name="radios" value="Yes" />
                                        <CLabel variant="checkbox" htmlFor="radio1">Yes</CLabel>
                                        <CInputRadio className="form-check-input" id="radio2" name="radios" value="No" />
                                        <CLabel variant="checkbox" htmlFor="radio2">No</CLabel>
                                      </CFormGroup> */}
                          {CandidateAddFormik.touched.applied_earlier && CandidateAddFormik.errors.applied_earlier ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.applied_earlier}</div>) : null}
                          {/* {CandidateAddFormik.touched.worked_earlier && CandidateAddFormik.errors.worked_earlier ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.worked_earlier}</div>) : null} */}
                        </div>

                        {/* <input type="email" name="applied_earlier" value={CandidateAddFormik.values.applied_earlier} className="form-control" placeholder="Have You Applied Here Before ?" maxLength={50} onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur}
                        /> */}

                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">How did you hear about us <span className="error">*</span></label>
                        <Select className="basic-single" classNamePrefix="select" placeholder={'How did you hear about us'}
                          value={selectMedium}
                          name="medium_id"
                          options={mediumOptions}
                          onChange={(e) => handleMediumChange(e)}
                          onBlur={CandidateAddFormik.handleBlur}
                        />
                        {CandidateAddFormik.touched.medium_id && CandidateAddFormik.errors.medium_id ? (<div className="help-block text-danger">{CandidateAddFormik.errors.medium_id}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Available Start Date <span className="error">*</span></label>

                          <SingleDatePicker
                            id={'availability'}
                            date={dateAvailability} // momentPropTypes.momentObj or null
                            onDateChange={(date) => handleAviDate(date)} // PropTypes.func.isRequired
                            focused={focusAvailability} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocusAviSt(focused)} // PropTypes.func.isRequired
                            numberOfMonths={1}
                            displayFormat="DD-MM-YYYY"
                            //showClearDate={true}
                            isOutsideRange={() => false}
                            isDayHighlighted={day => day.isSame(moment(), 'd')}
                            placeholder='Available Start Date'
                            readOnly={true}
                            renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                  <select value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
                                    {moment.months().map((label, value) => (
                                      <option value={value} key={`availability${value}`}>{label}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                    {yearsDD('availability')}
                                  </select>
                                </div>
                              </div>
                            }
                          />

                          {/* <input type="text" name="availability" value={CandidateAddFormik.values.availability}
                            className="form-control" placeholder="Available Start Date" maxLength={50}
                            onChange={CandidateAddFormik.handleChange} onBlur={CandidateAddFormik.handleBlur} /> */}
                          {CandidateAddFormik.touched.availability && CandidateAddFormik.errors.availability ? (<div className="help-block text-danger"> {CandidateAddFormik.errors.availability}</div>) : null}
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>

              </div>
              <CCardFooter>
                <CRow>
                  <CCol className="col-md-10" align="center">
                    <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" />{props?.dataEdit?.data?.id ? ' Update' : ' Save'}</CButton>
                    <Link className="ml-3 btn btn-danger" to={'/onboarding/candidates'}><CIcon name="cil-ban" /> Cancel</Link>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CForm>
          </CCardBody>
      }
    </CCard>
  )
}

export default JobBasicTab
