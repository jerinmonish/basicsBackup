import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, RoleDropDownList, CommonGroupList, LocationDropDownList, FunctionDropDownList, CommonSubfunctionList } from '../../../actions/commonAction'
import { UserAddAPI } from '../../../actions/administration'
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
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertValueLabel } from '../../../utils/helper';
import CLoader from 'src/pages/loader/CLoader'

const AddUser = () => {
  const dispatch = useDispatch()
  const timzoneData = require('../../../components/data/TimeZone.json');
  const history = useHistory()
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const dropdownData = useSelector((state) => state.commonData)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CompanyDropDownList())
    dispatch(RoleDropDownList())
    dispatch(CommonGroupList())
  }, [])

  const groupOptions = dropdownData?.groupComData?.data?.result
  const [companyOptions, setCompanyOptions] = useState([]);
  const [companyIdsOptions, setCompanyIdsOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [functionOptions, setFunctionOptions] = useState([]);
  const [subfunctionOptions, setSubFunctionOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [companyselected, setCompanySelected] = useState([]);
  const [enteredText, setEnteredText] = useState('');

  const [groupChanged, setGroupChanged] = useState(0);
  const [companyChanged, setCompanyChanged] = useState(0);
  const [locationChanged, setLocationChanged] = useState(0);
  const [functionChanged, setFunctionChanged] = useState(0);

  const selectCompanyRef = useRef()
  const selectLocationRef = useRef()
  const selectFunctionRef = useRef()
  const selectJobRef = useRef()

  const onCompanyClear = () => {
    selectCompanyRef?.current?.select.clearValue()
    setCompanyIdsOptions(convertValueLabel([]))
  }

  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
  }

  const onFunctionClear = () => {
    selectFunctionRef?.current?.select.clearValue()
  }
  const onJobClear = () => {
    selectJobRef?.current?.select.clearValue()
  }

  const [companyIdsValues, setCompanyIdsValues] = useState([]);

  const [groupRemoveStatus, setGroupRemoveStatus] = useState(0);

  const [locationValues, setLocationValues] = useState([]);

  const [companyRemoveStatus, setCompanyRemoveStatus] = useState(0);

  const [functionValues, setFunctionValues] = useState([]);

  const [LocationRemoveStatus, setLocationRemoveStatus] = useState(0);

  const [subfunctionValues, setSubFunctionValues] = useState([]);

  const [functionRemoveStatus, setFunctionRemoveStatus] = useState(0);

  const [accessRights, setAccessRights] = useState([]);
  const [accessRightsSub, setAccessRightsSub] = useState([]);

  const [checkedRole, setCheckedRole] = useState([])

  const [timeZone, setTimeZone] = useState([]);

  useEffect(() => {
    setAccessRights(dropdownData?.roleCommonData)

  })

  const handleCheckedMainRole = (parameter) => (event) => {


    console.log('accessRights', accessRights);

    var midVarRole = [...checkedRole];
    if (event.target.checked) {
      midVarRole = [...checkedRole, parameter.id];
    } else {
      midVarRole.splice(checkedRole.indexOf(parameter.id), 1);
    }
    setCheckedRole(midVarRole);
    // console.log(midVarRole);
    // console.log("checked role",checkedRole);

    UserAddFormik.setFieldValue('roles_id', midVarRole)

    // let checkedRoleless = [];
    // let roleCheckedItem = [];
    // accessRights.forEach((data) => {
    //   data.rights.forEach((inputdata) => {
    //     if (inputdata.id == parameter.id) {
    //       inputdata.status = event.target.checked;
    //       if(event.target.checked == true){
    //         console.log(inputdata);
    //         roleCheckedItem.push(...roleCheckedItem, inputdata.id);
    //         setCheckedRole(checkedRole => [...checkedRole, inputdata.id])
    //         console.log(checkedRole);
    //       }
    //     }
    //   })
    // })
    // // console.log(checkedRole);
    // setAccessRightsSub([checkedRoleless])
  }


  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result])


  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyIdsOptions(dropdownData?.companyCommonData?.data?.result);
      if (groupRemoveStatus == 2) {
        let smp = [];
        for (let x in dropdownData?.companyCommonData?.data?.result) {
          if (UserAddFormik.values.company_ids.includes(dropdownData?.companyCommonData?.data?.result[x].value)) {
            // console.log('Existing Va'+UserAddFormik.values.company_ids, 'New Va'+dropdownData?.companyCommonData?.data?.result[x].value);
            //console.log(dropdownData?.companyCommonData?.data?.result[x].value);
            smp.push({ 'value': dropdownData?.companyCommonData?.data?.result[x].value, 'label': dropdownData?.companyCommonData?.data?.result[x].label })
          }
        }
        setCompanyIdsValues(smp);
      }
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged, groupRemoveStatus])


  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
      setLocationOptions(dropdownData?.locationCommonData?.data?.result);
      if (companyRemoveStatus == 2) {
        let smp = [];
        for (let x in dropdownData?.locationCommonData?.data?.result) {
          if (UserAddFormik.values.location_ids.includes(dropdownData?.locationCommonData?.data?.result[x].value)) {
            // console.log('Existing Va'+UserAddFormik.values.company_ids, 'New Va'+dropdownData?.companyCommonData?.data?.result[x].value);
            //console.log(dropdownData?.companyCommonData?.data?.result[x].value);
            smp.push({ 'value': dropdownData?.locationCommonData?.data?.result[x].value, 'label': dropdownData?.locationCommonData?.data?.result[x].label })
          }
        }
        setLocationValues(smp);
      }
    }
  }, [dropdownData?.locationCommonData?.data?.result, companyChanged, companyRemoveStatus])


  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.functionCommonData?.data?.result && locationChanged === 1) {
      setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
      if (LocationRemoveStatus == 2) {
        let smp = [];
        for (let x in dropdownData?.functionCommonData?.data?.result) {
          if (UserAddFormik.values.department_ids.includes(dropdownData?.functionCommonData?.data?.result[x].value)) {
            // console.log('Existing Va'+UserAddFormik.values.company_ids, 'New Va'+dropdownData?.companyCommonData?.data?.result[x].value);
            //console.log(dropdownData?.companyCommonData?.data?.result[x].value);
            smp.push({ 'value': dropdownData?.functionCommonData?.data?.result[x].value, 'label': dropdownData?.functionCommonData?.data?.result[x].label })
          }
        }
        setFunctionValues(smp);
      }
    }
  }, [dropdownData?.functionCommonData?.data?.result, locationChanged, LocationRemoveStatus])


  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.subfunctionCommonData?.data?.result && functionChanged === 1) {
      setSubFunctionOptions(dropdownData?.subfunctionCommonData?.data?.result);
      if (functionRemoveStatus == 2) {
        let smp = [];
        for (let x in dropdownData?.subfunctionCommonData?.data?.result) {
          if (UserAddFormik.values.location_ids.includes(dropdownData?.subfunctionCommonData?.data?.result[x].value)) {
            // console.log('Existing Va'+UserAddFormik.values.company_ids, 'New Va'+dropdownData?.companyCommonData?.data?.result[x].value);
            //console.log(dropdownData?.companyCommonData?.data?.result[x].value);
            smp.push({ 'value': dropdownData?.subfunctionCommonData?.data?.result[x].value, 'label': dropdownData?.subfunctionCommonData?.data?.result[x].label })
          }
        }
        setSubFunctionValues(smp);
      }
    }
  }, [dropdownData?.subfunctionCommonData?.data?.result, functionChanged, functionRemoveStatus])

  // useEffect(() => {
  //   // console.log("roledata?",dropdownData);
  //   if(dropdownData?.roleCommonData?.groups_id_list){
  //     setRoleOptions(dropdownData?.roleCommonData?.groups_id_list);
  //     // setFunctionOptions(convertValueLabel([]));
  //   }
  // }, [dropdownData?.roleCommonData?.groups_id_list])
  // useEffect(() => {
  //   //  console.log("dropdownData?.role?",dropdownData?.roleCommonData?.groups_id_list);
  //   if(dropdownData?.companyCommonData?.data?.result){
  //     setCompanyIdsOptions(dropdownData?.companyCommonData?.data?.result);
  //   }
  // }, [dropdownData?.companyCommonData?.data?.result])




  // to load the option data for dropdown
  // const companyOptions = dropdownData?.companyCommonData?.data?.result
  // const roleOptions = dropdownData?.roleCommonData

  // console.log("roleOptions",dropdownData?.roleCommonData);
  //user Add Form Initilization
  const UserAddFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      login: '',
      password: '',
      image_1920: '',
      group_ids: '',
      company_id: '',
      company_ids: '',
      location_ids: '',
      department_ids: '',
      sub_function_ids: '',
      // groups_id: '',
      roles_id: '',
      tz: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      // email: Yup.string().required('This field is required'),
      // mobile: Yup.number().required('This field is required'),
      login: Yup.string().required('This field is required'),
      password: Yup.string().required('This field is required'),
      // image_1920: Yup.string().required('This field is required'),
      group_ids: Yup.array().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      company_ids: Yup.array().required('This field is required'),
      // location_ids: Yup.array().required('This field is required'),
      // department_ids: Yup.array().required('This field is required'),
      // sub_function_ids: Yup.array().required('This field is required'),
      // groups_id: Yup.array().required('This field is required'),
      tz: Yup.string().required('This field is required'),
      // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { kwargs: { data: values } } })
      dispatch(UserAddAPI(formData, history))
      // console.log("formData", formData);
    },
  })


  //   const handleCompanyIDSChange = (e) => {
  //    let companyidsList = []
  //    e?.map((data, i) => (companyidsList.push(data.value)
  //    ));
  //     UserAddFormik.setFieldValue('company_ids', companyidsList)
  //    setCompanySelected(companyidsList)

  //  }


  //when onchange

  const handleGroupChange = (e, { action }) => {

    // console.log("e length", e);
    // if (e?.length==''||e?.length==null)
    // {
    //   console.log("e length", e?.length);
    //   setLocationValues([])
    //   setFunctionValues([])
    //   setSubFunctionValues([])
    // }

    if (action == "remove-value") {
      setGroupRemoveStatus(2);
    } else if (action == "select-option") {
      setGroupRemoveStatus(1);
    }
    let groupList = []
    e?.map((data, i) => (groupList.push(data.value)));
    const sendGpparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: '[("group_id", "in", ' + '[' + groupList + ']' + ')]'
      },
    }
    dispatch(CompanyDropDownList(sendGpparams))
    UserAddFormik.setFieldValue('group_ids', groupList)
    onCompanyClear();
    onLocationClear();
    onFunctionClear();
    onJobClear();
    setGroupChanged(1);
    setLocationOptions(convertValueLabel([]));
    setFunctionOptions(convertValueLabel([]));
    setSubFunctionOptions(convertValueLabel([]));
    setLocationValues([])
    setFunctionValues([])
    setSubFunctionValues([])
  }

  const handleCompanyIDSChange = (e, { action }) => {

    if (action == "remove-value") {
      setCompanyRemoveStatus(2);
    } else if (action == "select-option") {
      setCompanyRemoveStatus(1);
    }

    let companysList = []
    let companysListValues = []

    e?.map((data, i) => (
      companysListValues.push({ 'value': data.value, 'label': data.label }),
      companysList.push(data.value)
    ));
    const sendGpparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: '[("company_id", "in", ' + '[' + companysList + ']' + ')]'
      },
    }
    dispatch(LocationDropDownList(sendGpparams))
    UserAddFormik.setFieldValue('company_ids', companysList)
    onLocationClear()
    onFunctionClear()
    onJobClear()
    setFunctionOptions(convertValueLabel([]));

    setFunctionValues([])
    setSubFunctionValues([])

    //setJobOptions(convertValueLabel([]));
    setCompanyChanged(1);
    setCompanySelected(companysList)

    setCompanyIdsValues(companysListValues);
  }

  const handleCompanyChange = (e) => {
    // console.log(companyselected);
    // console.log(e?.value);
    //console.log(companyselected.includes(10));
    if (e?.value) {
      if (companyselected.includes(e?.value)) {
        setEnteredText(convertValueLabel())
        UserAddFormik.setFieldValue('company_id', e?.value)
      } else {
        toast.error('Selected company is not present in the selected group !')
        setEnteredText('')
      }
    }
  }

  const handleLocationChange = (e, { action }) => {
    if (action == "remove-value") {
      setLocationRemoveStatus(2);
    } else if (action == "select-option") {
      setLocationRemoveStatus(1);
    }
    let locationList = []
    let locationListValues = []
    e?.map((data, i) => (
      locationListValues.push({ 'value': data.value, 'label': data.label }),
      locationList.push(data.value)
    ));
    {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["location_id", "in", [' + locationList + ']],["parent_id", "=", False]]',
        },
      }
      // onFunctionClear()
      dispatch(FunctionDropDownList(sendGpparams))
      UserAddFormik.setFieldValue('location_ids', locationList)
      onFunctionClear()
      onJobClear()
      // setJobOptions(convertValueLabel([]));

      setSubFunctionValues([])

      setLocationChanged(1)
      setLocationValues(locationListValues);
    }
  }

  const handleFunctionChange = (e, { action }) => {

    if (action == "remove-value") {
      setFunctionRemoveStatus(2);
    } else if (action == "select-option") {
      setFunctionRemoveStatus(1);
    }
    //  if (e?.value)
    let functionList = []
    let functionListValues = []
    e?.map((data, i) => (
      functionListValues.push({ 'value': data.value, 'label': data.label }),
      functionList.push(data.value)
    ));

    {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          // filter: '[["department_id", "in", [' + e?.value + ']]]',
          filter: '[("parent_id", "in", ' + '[' + functionList + ']' + ')]'
        },
      }
      onJobClear()
      dispatch(CommonSubfunctionList(sendGpparams))
      UserAddFormik.setFieldValue('department_ids', functionList)
      setFunctionChanged(1);
      setFunctionValues(functionListValues);

    }
  }

  const handleSubFunctionChange = (e) => {
    //  if (e?.value)
    let subfunctionList = []
    let subfunctionValues = []
    e?.map((data, i) => (
      subfunctionValues.push({ 'value': data.value, 'label': data.label }),
      subfunctionList.push(data.value)
    ));

    {

      // const sendGpparams = {
      //   params: {
      //     query: '{id,name}',
      //     isDropdown: 1,
      //     // filter: '[["department_id", "in", [' + e?.value + ']]]',
      //     filter: '[("parent_id", "in", ' + '['+functionList+']'+')]'
      //   },
      // }
      // onChange={({ value }) => UserAddFormik.setFieldValue('sub_function_ids', value)}
      onJobClear()
      // dispatch(CommonSubfunctionList(sendGpparams))
      UserAddFormik.setFieldValue('sub_function_ids', subfunctionList)
      // setFunctionChanged(1);
      setSubFunctionValues(subfunctionValues);

    }
  }

  // const handleMajorRoleChange = (e) => {
  //   // console.log('e val',e);
  //   //  if (e?.value)values
  //   // let majorroleList = []
  //   // e?.map((data, i) => (majorroleList.push(data.value)
  //   // ));
  //     UserAddFormik.setFieldValue('groups_id', [e?.values])
  //     // setFunctionChanged(1);
  //     // setRoleOptions(convertValueLabel(e?.value,e?.label))
  // }


  const onChangePicture = e => {
    if (e.target.files[0]) {
      //   console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        UserAddFormik.setFieldValue("image_1920", reader.result)
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }


  const handleTimezoneChange = (e) => {
    if (e?.value) {
      UserAddFormik.setFieldValue('tz', e.value);
      setTimeZone(convertValueLabel(e.value, e.label));
      // setMarriageStatus(convertValueLabel(e.value,e.label));
    }
  }


  return (
    <main className="c-main">
      {/* <ToastContainer />
      {
        isLoading === true ? (
        <CLoader />
      ) : ( */}
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add User </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={UserAddFormik.handleSubmit} className="form-horizontal">
                <div>

                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Group <span className="error">*</span>
                      </label>
                      <Select
                        isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group '}
                        name="group_ids"
                        options={groupOptions}
                        // value={}
                        onBlur={UserAddFormik.handleBlur}
                        onChange={handleGroupChange}
                      // onChange={(e) => handleGroupChange1(e)}
                      // onChange={({ value }) => UserAddFormik.setFieldValue('company_ids', value)}
                      />
                      {UserAddFormik.touched.group_ids &&
                        UserAddFormik.errors.group_ids ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.group_ids}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Access Rights To Company <span className="error">*</span></label>
                      <Select
                        useRef={selectCompanyRef}
                        isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a company '}
                        name="company_ids"
                        value={companyIdsValues}
                        options={companyIdsOptions}
                        onBlur={UserAddFormik.handleBlur}
                        onChange={handleCompanyIDSChange}
                      />
                      {UserAddFormik.touched.company_ids &&
                        UserAddFormik.errors.company_ids ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.company_ids}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company  <span className="error">*</span>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company'}
                        name="company_id"
                        value={enteredText}
                        options={companyOptions}
                        onBlur={UserAddFormik.handleBlur}
                        onChange={(e) => handleCompanyChange(e)}
                      // onChange={({ value }) => UserAddFormik.setFieldValue('company_id', value)}
                      />
                      {UserAddFormik.touched.company_id &&
                        UserAddFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Location
                      </label>
                      <Select
                        isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a location '}
                        name="location_ids"
                        options={locationOptions}
                        value={locationValues}
                        onBlur={UserAddFormik.handleBlur}
                        onChange={handleLocationChange}
                      // onChange={({ value }) => UserAddFormik.setFieldValue('company_ids', value)}
                      />
                      {UserAddFormik.touched.location_ids &&
                        UserAddFormik.errors.location_ids ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.location_ids}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Function
                      </label>
                      <Select
                        isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Function'}
                        name="department_ids"
                        options={functionOptions}
                        value={functionValues}
                        onBlur={UserAddFormik.handleBlur}
                        onChange={handleFunctionChange}
                      // onChange={({ value }) => UserAddFormik.setFieldValue('company_ids', value)}
                      />
                      {UserAddFormik.touched.department_ids &&
                        UserAddFormik.errors.department_ids ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.department_ids}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Sub Function
                      </label>
                      <Select
                        isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group '}
                        name="sub_function_ids"
                        options={subfunctionOptions}
                        value={subfunctionValues}
                        onBlur={UserAddFormik.handleBlur}
                        onChange={handleSubFunctionChange}
                      // onChange={({ value }) => UserAddFormik.setFieldValue('sub_function_ids', value)}
                      />
                      {UserAddFormik.touched.sub_function_ids &&
                        UserAddFormik.errors.sub_function_ids ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.sub_function_ids}
                        </div>
                      ) : null}
                    </div>

                  </div>
                  <div className="row form-group">

                    <div className="col-md-4">
                      <label htmlFor="">Timezone <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Timezone'}
                        value={timeZone}
                        name="tz"
                        options={timzoneData}
                        onChange={(e) => handleTimezoneChange(e)}
                        onBlur={UserAddFormik.handleBlur}
                      />
                      {UserAddFormik.errors.tz && UserAddFormik.touched.tz ? <div className="help-block text-danger">{UserAddFormik.errors.tz}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={UserAddFormik.values.name}
                        className="form-control"
                        placeholder="Name"
                        maxLength={25}
                        onChange={UserAddFormik.handleChange}
                        onBlur={UserAddFormik.handleBlur}
                      />
                      {UserAddFormik.touched.name &&
                        UserAddFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={UserAddFormik.values.email}
                        className="form-control"
                        placeholder="Email"
                        maxLength={25}
                        onChange={UserAddFormik.handleChange}
                        onBlur={UserAddFormik.handleBlur}
                      />
                      {UserAddFormik.touched.email &&
                        UserAddFormik.errors.email ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.email}
                        </div>
                      ) : null}
                    </div>


                  </div>
                  <div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Mobile
                        </label>
                        <input
                          type="number"
                          name="mobile"
                          value={UserAddFormik.values.mobile}
                          className="form-control"
                          placeholder="Mobile"
                          maxLength={10}
                          onChange={UserAddFormik.handleChange}
                          onBlur={UserAddFormik.handleBlur}
                        />
                        {UserAddFormik.touched.mobile &&
                          UserAddFormik.errors.mobile ? (
                          <div className="help-block text-danger">
                            {UserAddFormik.errors.mobile}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          User <span className="error">*</span>
                        </label>
                        <input
                          type="text"
                          name="login"
                          value={UserAddFormik.values.login}
                          className="form-control"
                          placeholder="Login"
                          maxLength={25}
                          onChange={UserAddFormik.handleChange}
                          onBlur={UserAddFormik.handleBlur}
                        />
                        {UserAddFormik.touched.login &&
                          UserAddFormik.errors.login ? (
                          <div className="help-block text-danger">
                            {UserAddFormik.errors.login}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          Password <span className="error">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={UserAddFormik.values.password}
                          className="form-control"
                          placeholder="Password"
                          maxLength={25}
                          onChange={UserAddFormik.handleChange}
                          onBlur={UserAddFormik.handleBlur}
                        />
                        {UserAddFormik.touched.password &&
                          UserAddFormik.errors.password ? (
                          <div className="help-block text-danger">
                            {UserAddFormik.errors.login}
                          </div>
                        ) : null}
                      </div>

                      {/* result[0].name */}
                    </div>
                    <div className='row form-group'>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">Image </label>
                        <input type="file" name='image_1920' className="form-control"
                          onBlur={UserAddFormik.handleBlur}
                          onChange={(event) => { onChangePicture(event) }} accept="image/png, image/jpeg, image/jpg" />
                        {UserAddFormik.touched.image_1920 && UserAddFormik.errors.image_1920 ? <div className="help-block text-danger">{UserAddFormik.errors.image_1920}</div> : null}
                      </div>
                    </div>

                    {/* <div className="col-md-4">
                        <Select
                        //  isMulti={true}
                         className="basic-single"
                         classNamePrefix="select"
                         placeholder={'Choose a role'}
                         name="groups_id"
                         options={roleOptions}
                         value={checkedRole}
                      />
                     
                    </div> */}
                    {/* <input type='text' hidden name='groups_id' value={checkedRole}/> */}

                    <div className="row form-group">
                      {
                        accessRights?.map((mainRole) => (
                          <div className="col-md-2">
                            <ul id="myUL" style={{ marginLeft: -56 }} key={"mainRole_" + mainRole.id}>
                              <li className="l1" key={mainRole.id}>
                                <div className="mt-2">
                                  <div className="form-check ">
                                    {/* <input
                                    className="form-check-input"
                                    onClick={handleAllChecked(mainRole)}
                                    type="checkbox"
                                    name={mainRole.name}
                                    id={mainRole.id}
                                    checked={mainRole.status}
                                    /> */}
                                    <label className="form-check-label" htmlFor={mainRole.id}> {mainRole.name}  </label>
                                  </div>
                                </div>
                                <ul id="subRole" key={"subRole_" + mainRole.id}>
                                  {
                                    mainRole?.rights.map((subrole) => (
                                      <li className="ml-0" key={subrole.id}>
                                        <div className="form-check">
                                          <input className="form-check-input"
                                            // checked={subrole.status}
                                            onChange={handleCheckedMainRole(subrole)} type="checkbox" id={subrole.id} />
                                          <label className="form-check-label" htmlFor={subrole.id}>{subrole.name}</label>
                                        </div>
                                      </li>
                                    ))
                                  }
                                </ul>
                              </li>
                            </ul>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Save
                      </CButton>
                      <Link className="ml-3 btn btn-danger" to={'/administration/user'}>
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
      {/* )} */}
    </main>
  )
}

export default AddUser
