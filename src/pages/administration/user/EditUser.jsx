import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, RoleDropDownList, CommonGroupList, LocationDropDownList, FunctionDropDownList, CommonSubfunctionList } from '../../../actions/commonAction'
import { UserEditAPI, UserUpdateAPI, UserEditRoleAPI } from '../../../actions/administration'
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
import { convertValueLabel, decryptSingleData } from '../../../utils/helper'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import CLoader from 'src/pages/loader/CLoader'

const EditUser = (props) => {

  const dispatch = useDispatch()
  const timzoneData = require('../../../components/data/TimeZone.json');
  const history = useHistory()
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const dropdownData = useSelector((state) => state.commonData)
  // console.log("dropdownData",dropdownData);
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
    // dispatch(RoleDropDownList())
    dispatch(UserEditRoleAPI(decryptSingleData(props?.match?.params?.id)))
  }, [])

  // const groupOptions = dropdownData?.groupComData?.data?.result
  const [groupOptions, setGroupOptions] = useState([]);
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

  const [selectGroup, setGroupAllSelected] = useState([])
  const [selectAllowCompany, setSelectAllowCompany] = useState([])
  const [selectCompany, setSelectCompany] = useState([])
  const [selectedLoction, setSelectedLocation] = useState([])
  const [selectedFuntion, setSelectedFunction] = useState([])
  const [selectedsubFuntion, setSelectedSubFunction] = useState([])
  const [timeZone, setTimeZone] = useState([]);
  const [selectrole, setSelectRole] = useState([])

  const [accessRights, setAccessRights] = useState([]);
  const [accessRightsSub, setAccessRightsSub] = useState([]);

  const [checkedRoleUpdate, setCheckedRoleUpdate] = useState([])

  const [preCheckedRole, setPreCheckedRole] = useState([])
  const { userEditRoleDetails } = useSelector((state) => state.administrationBackend)

  const handleCheckedMainRoleUnchecked = (parameter) => (event) => {
    var midVarRole = [...preCheckedRole];
    if (event.target.checked) {
      midVarRole = [...preCheckedRole, parameter.id];
    } else {
      midVarRole = midVarRole.filter(item => item !== parameter.id)
      // midVarRole.splice(preCheckedRole.indexOf(parameter.id), 1);
    }
    setPreCheckedRole(midVarRole);
    userEditFormik.setFieldValue('roles_id', midVarRole)
  }

  useEffect(() => {
    var sendRle = [];
    userEditRoleDetails?.forEach(function (r, ir) {
      r?.rights.forEach(function (ri, iri) {
        if (ri?.status) {
          sendRle.push(ri?.id);
        }
      });
    });
    setPreCheckedRole(sendRle)
  }, [userEditRoleDetails])

  const onCompanyClear = () => {
    selectCompanyRef?.current?.select.clearValue()
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



  useEffect(() => {
    if (userEditDetails?.data?.company_id_list) {
      setCompanyOptions(userEditDetails?.data?.company_id_list);
    }
  }, [userEditDetails?.data?.company_id_list])


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


  useEffect(() => {
    if (dropdownData?.subfunctionCommonData?.data?.result && functionChanged === 1) {
      setSubFunctionOptions(dropdownData?.subfunctionCommonData?.data?.result);
    }
  }, [dropdownData?.subfunctionCommonData?.data?.result, functionChanged])

  useEffect(() => {
    if (dropdownData?.roleCommonData?.groups_id_list) {
      setRoleOptions(dropdownData?.roleCommonData?.groups_id_list);
    }
  }, [dropdownData?.roleCommonData?.groups_id_list])


  //Designation Add Form Initilization
  const userEditFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      login: '',
      // password: '',
      image_1920: '',
      group_ids: '',
      company_id: '',
      company_ids: '',
      location_ids: '',
      department_ids: '',
      sub_function_ids: '',
      roles_id: '',
      tz: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      // email: Yup.string().required('This field is required'),
      // mobile: Yup.number().required('This field is required'),
      login: Yup.string().required('This field is required'),
      // password: Yup.string().required('This field is required'),
      // image_1920: Yup.string().required('This field is required'),
      group_ids: Yup.array().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      company_ids: Yup.array().required('This field is required'),
      // location_ids: Yup.array().required('This field is required'),
      // department_ids: Yup.array().required('This field is required'),
      // sub_function_ids: Yup.array().required('This field is required'),
      // groups_id: Yup.array().required('This field is required'),
      tz: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { kwargs: { id: userEditDetails.data.id, data: values } } })
      dispatch(UserUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
      // console.log(values);
    },
  })

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files.name != null);
      setPicture(e.target.files[0]);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // console.log("picture",e.target.files);
        userEditFormik.setFieldValue("image_1920", reader.result)
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(UserEditAPI(decryptSingleData(props?.match?.params?.id)))


    }

  }, [])


  const { userEditDetails, isLoading } = useSelector((state) => state.administrationBackend)

  useEffect(() => {
    // console.log("userEditDetails", userEditDetails);
    // console.log("userEditRoleDetails", userEditRoleDetails);
    if (userEditDetails?.data !== null || userEditRoleDetails?.data !== null) {
      userEditFormik.setValues({
        name: userEditDetails?.data?.name,
        email: userEditDetails?.data?.email,
        mobile: userEditDetails?.data?.mobile,
        login: userEditDetails?.data?.login,
        // image_1920: userEditDetails?.data?.image_1920,
        group_ids: userEditDetails?.data?.group_ids,
        company_id: userEditDetails?.data?.company_id,
        company_ids: userEditDetails?.data?.company_ids,
        location_ids: userEditDetails?.data?.location_ids,
        department_ids: userEditDetails?.data?.department_ids,
        sub_function_ids: userEditDetails?.data?.sub_function_ids,
        groups_id: userEditDetails?.data?.groups_id,
        tz: userEditDetails?.data?.tz,
        roles_id: userEditRoleDetails?.data
      });
    }

    // to set the on loading data value
    if (isLoading === false && userEditDetails?.data !== undefined && userEditDetails?.data !== null && userEditRoleDetails?.groups_id !== null) {
      setSelectCompany(convertValueLabel(userEditDetails?.data?.company_id, userEditDetails?.data.company_id_name))

      let getalldataingroup = [];
      userEditDetails?.data?.group_ids_edit?.map((data, i) => (
        getalldataingroup.push({ 'value': data.value, 'label': data.label })
      ));
      setGroupAllSelected(getalldataingroup);
      setGroupOptions(userEditDetails?.data?.group_ids_list);

      let getallAllowedCompany = [];
      userEditDetails?.data?.company_ids_edit?.map((data, i) => (
        getallAllowedCompany.push({ 'value': data.value, 'label': data.label })
      ));

      //  console.log("getallAllowedCompany",getallAllowedCompany);
      setSelectAllowCompany(getallAllowedCompany);
      setCompanyIdsOptions(userEditDetails?.data?.company_ids_list)

      let getallinfoLocation = [];
      userEditDetails?.data?.location_ids_edit?.map((data, i) => (
        getallinfoLocation.push({ 'value': data.value, 'label': data.label })
      ));
      setSelectedLocation(getallinfoLocation);
      setLocationOptions(userEditDetails?.data?.location_ids_list);

      let getallFunction = [];
      userEditDetails?.data?.department_ids_edit?.map((data, i) => (
        getallFunction.push({ 'value': data.value, 'label': data.label })
      ));
      setSelectedFunction(getallFunction);
      setFunctionOptions(userEditDetails?.data?.department_id_list);

      let getallSubFunction = [];
      userEditDetails?.data?.sub_function_ids_edit?.map((data, i) => (
        getallSubFunction.push({ 'value': data.value, 'label': data.label })
      ));
      setSelectedSubFunction(getallSubFunction);
      setSubFunctionOptions(userEditDetails?.data?.sub_function_ids_list);

      setTimeZone(convertValueLabel(userEditDetails?.data?.tz, userEditDetails?.data?.tz_label));

      //  userEditFormik.setFieldValue('roles_id', sendRle);
    }
  }, [isLoading, userEditDetails?.data, userEditRoleDetails?.groups_id])


  const handleGroupChange = (e) => {
    let groupList = [];
    let groupList_f = [];
    e?.map((data, i) => (
      groupList.push({ 'value': data.value, 'label': data.label }),
      groupList_f.push(data.value)
    ));

    {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("group_id", "in", ' + '[' + groupList_f + ']' + ')]'
        },
      }
      dispatch(CompanyDropDownList(sendGpparams))
      userEditFormik.setFieldValue('group_ids', groupList_f)
      onCompanyClear();
      onLocationClear();
      onFunctionClear();
      onJobClear();
      setGroupChanged(1);
      setGroupAllSelected(groupList)
    }
  }

  const handleCompanyIDSChange = (e) => {
    let companysList = []
    let companysList_f = []
    e?.map((data, i) => (
      companysList.push({ 'value': data.value, 'label': data.label }),
      companysList_f.push(data.value)
    ));
    {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("company_ids", "in", ' + '[' + companysList_f + ']' + ')]'
        },
      }

      dispatch(LocationDropDownList(sendGpparams))
      userEditFormik.setFieldValue('company_ids', companysList_f)
      onLocationClear()
      onFunctionClear()
      onJobClear()
      setCompanyChanged(1);
      setSelectAllowCompany(companysList)
    }
  }

  const handleCompanyChange = (e) => {
    var isYes = 1;
    for (let user of selectAllowCompany) {
      if (user.value == e?.value) {
        isYes = 0;
        setSelectCompany(convertValueLabel())
        userEditFormik.setFieldValue('company_id', e?.value)
      }
    }
    if (isYes == 1) {
      toast.error('Selected company is not present in the selected group')
      setSelectCompany('')
    }
  }


  const handleLocationChange = (e) => {
    let locationList = [];
    let locationList_f = [];
    e?.map((data, i) => (
      locationList.push({ 'value': data.value, 'label': data.label }),
      locationList_f.push(data.value)
    ));

    {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["location_id", "in", [' + locationList_f + ']],["parent_id", "=", False]]',
        },
      }
      // onFunctionClear()
      dispatch(FunctionDropDownList(sendGpparams))
      userEditFormik.setFieldValue('location_ids', locationList_f)
      onFunctionClear()
      onJobClear()
      setLocationChanged(1)
      setSelectedLocation(locationList)
    }
  }

  const handleFunctionChange = (e) => {
    //  if (e?.value)
    let functionList = []
    let functionList_f = [];
    e?.map((data, i) => (
      functionList.push({ 'value': data.value, 'label': data.label }),
      functionList_f.push(data.value)
    ));

    {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          // filter: '[["department_id", "in", [' + e?.value + ']]]',
          filter: '[("parent_id", "in", ' + '[' + functionList_f + ']' + ')]'
        },
      }
      onJobClear()
      dispatch(CommonSubfunctionList(sendGpparams))
      userEditFormik.setFieldValue('department_ids', functionList_f)
      setFunctionChanged(1);
      setSelectedFunction(functionList)
      //  setSelectedSubFunction([])


    }
  }

  const handleSubFunctionChange = (e) => {
    //  if (e?.value)
    let subfunctionList = []
    let subfunctionList_f = []
    e?.map((data, i) => (
      subfunctionList.push({ 'value': data.value, 'label': data.label }),
      subfunctionList_f.push(data.value)
    ));
    {
      onJobClear()
      // dispatch(CommonSubfunctionList(sendGpparams))
      userEditFormik.setFieldValue('sub_function_ids', subfunctionList_f)
      // setFunctionChanged(1);
      setSelectedSubFunction(subfunctionList)

    }
  }


  const handleimageFile = (e) => {
    window.open(userEditDetails?.data?.image_1920)
  }

  const handleMajorRoleChange = (e) => {
    userEditFormik.setFieldValue('groups_id', [e?.values])
  }

  const handleTimezoneChange = (e) => {
    if (e?.value) {
      userEditFormik.setFieldValue('tz', e.value);
      setTimeZone(convertValueLabel(e.value, e.label));
      // setMarriageStatus(convertValueLabel(e.value,e.label));
    }
  }


  return (
    <main className="c-main">
      <ToastContainer />
      {
        userEditDetails?.isLoading === true ? (
          <CLoader />
        ) : (
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> Edit User </strong>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={userEditFormik.handleSubmit} className="form-horizontal">
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
                            value={selectGroup}
                            onBlur={userEditFormik.handleBlur}
                            onChange={(e) => handleGroupChange(e)}
                          // onChange={({ value }) => userEditFormik.setFieldValue('company_ids', value)}
                          />
                          {userEditFormik.touched.group_ids &&
                            userEditFormik.errors.group_ids ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.group_ids}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Access Rights To Company <span className="error">*</span>
                          </label>
                          <Select
                            isMulti={true}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a company '}
                            name="company_ids"
                            options={companyIdsOptions}
                            value={selectAllowCompany}
                            onBlur={userEditFormik.handleBlur}
                            onChange={(e) => handleCompanyIDSChange(e)}
                          // onChange={({ value }) => userEditFormik.setFieldValue('company_ids', value)}
                          />
                          {userEditFormik.touched.company_ids &&
                            userEditFormik.errors.company_ids ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.company_ids}
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
                            value={selectCompany}
                            // value={enteredText}
                            options={companyOptions}
                            onBlur={userEditFormik.handleBlur}
                            onChange={(e) => handleCompanyChange(e)}
                          // onChange={({ value }) => userEditFormik.setFieldValue('company_id', value)}
                          />
                          {userEditFormik.touched.company_id &&
                            userEditFormik.errors.company_id ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.company_id}
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
                            placeholder={'Choose a location'}
                            name="location_ids"
                            options={locationOptions}
                            value={selectedLoction}
                            onBlur={userEditFormik.handleBlur}
                            onChange={(e) => handleLocationChange(e)}
                          // onChange={({ value }) => userEditFormik.setFieldValue('company_ids', value)}
                          />
                          {userEditFormik.touched.location_ids &&
                            userEditFormik.errors.location_ids ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.location_ids}
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
                            value={selectedFuntion}
                            onBlur={userEditFormik.handleBlur}
                            onChange={(e) => handleFunctionChange(e)}
                          // onChange={({ value }) => userEditFormik.setFieldValue('company_ids', value)}
                          />
                          {userEditFormik.touched.department_ids &&
                            userEditFormik.errors.department_ids ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.department_ids}
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
                            value={selectedsubFuntion}
                            onBlur={userEditFormik.handleBlur}
                            onChange={(e) => handleSubFunctionChange(e)}
                          // onChange={({ value }) => userEditFormik.setFieldValue('sub_function_ids', value)}
                          />
                          {userEditFormik.touched.sub_function_ids &&
                            userEditFormik.errors.sub_function_ids ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.sub_function_ids}
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
                            onBlur={userEditFormik.handleBlur}
                          />
                          {userEditFormik.errors.tz && userEditFormik.touched.tz ? <div className="help-block text-danger">{userEditFormik.errors.tz}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Name <span className="error">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={userEditFormik.values.name}
                            className="form-control"
                            placeholder="Enter name"
                            maxLength={25}
                            onChange={userEditFormik.handleChange}
                            onBlur={userEditFormik.handleBlur}
                          />
                          {userEditFormik.touched.name &&
                            userEditFormik.errors.name ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.name}
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
                            value={userEditFormik.values.email}
                            className="form-control"
                            placeholder="Enter Email"
                            maxLength={25}
                            onChange={userEditFormik.handleChange}
                            onBlur={userEditFormik.handleBlur}
                          />
                          {userEditFormik.touched.email &&
                            userEditFormik.errors.email ? (
                            <div className="help-block text-danger">
                              {userEditFormik.errors.email}
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
                              type="text"
                              name="mobile"
                              value={userEditFormik.values.mobile}
                              className="form-control"
                              placeholder="Enter Mobile Number"
                              maxLength={10}
                              onChange={userEditFormik.handleChange}
                              onBlur={userEditFormik.handleBlur}
                            />
                            {userEditFormik.touched.mobile &&
                              userEditFormik.errors.mobile ? (
                              <div className="help-block text-danger">
                                {userEditFormik.errors.mobile}
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
                              value={userEditFormik.values.login}
                              className="form-control"
                              placeholder="Enter login name"
                              maxLength={25}
                              onChange={userEditFormik.handleChange}
                              onBlur={userEditFormik.handleBlur}
                            />
                            {userEditFormik.touched.login &&
                              userEditFormik.errors.login ? (
                              <div className="help-block text-danger">
                                {userEditFormik.errors.login}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-md-4">
                            <label htmlFor="hf-email">Image </label>
                            <input type="file"

                              // file: URL.createObjectURL(event.target.files[0])
                              // value={userEditDetails?.data?.image_1920 ?userEditDetails?.data?.image_1920 : userEditFormik.image_1920}
                              name='image_1920' className="form-control"

                              onBlur={userEditFormik.handleBlur}
                              onChange={(event) => { onChangePicture(event) }} accept="image/png, image/jpeg, image/jpg" />
                            {userEditFormik.touched.image_1920 && userEditFormik.errors.image_1920 ? <div className="help-block text-danger">{userEditFormik.errors.image_1920}</div> : null}
                          </div>

                        </div>
                        <div className="row form-group">
                          <div className="col-md-4 offset-8">
                            <div className='mt-0'>
                              <a href='#' className='mt-4' style={{ textDecoration: "none" }} onClick={(e) => { handleimageFile(e) }}><b>View Existing Image</b></a>
                            </div>
                          </div>
                          {/* <div className="col-md-3 offset-9">
                                              <label htmlFor="hf-email">Existing Image </label>
                                              <CCard className='col-md-2'>
                                                <Link >
                        <img src={`${userEditDetails?.data?.image_1920}`} title={`${userEditDetails?.data?.name}`} alt={`${userEditDetails?.data?.name}`} height={60} width={60}/>
                      </Link>
                                              </CCard>
                      
                    </div> */}

                        </div>

                        <div className="row form-group">
                          {
                            userEditRoleDetails?.map((mainRole) => (
                              <div className="col-md-2">
                                <ul id="myUL"
                                // style={{ marginLeft: -56 }} key={"mainRole_" + mainRole.id}
                                >
                                  <li className="l1"
                                  // key={mainRole.id}
                                  >
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
                                          <li className="ml-0"
                                          // key={subrole.id}
                                          >
                                            <div className="form-check">
                                              <input className="form-check-input"
                                                defaultChecked={subrole.status}
                                                // checked={subrole.status}
                                                onChange={handleCheckedMainRoleUnchecked(subrole)}
                                                type="checkbox"
                                                id={subrole.id} />
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
                            <CIcon name="cil-scrubber" /> Update
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
        )}
    </main>
  )
}

export default EditUser
