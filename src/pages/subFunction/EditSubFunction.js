import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CompanyDropDownList,
  CommonCompanyIdBasedData,
  ParentFuncationDropDownList,
  CommonGroupList
} from '../../actions/commonAction'
import { FunctionEditDetails } from '../../actions/master';
import { SubfunctionUpdate, ViewSubfuncationAPI } from '../../actions/master'
import { convertValueLabel, decryptSingleData } from '../../utils/helper'
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const EditSubfunction = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  //To get function details
  const { subfunctionEditDetails, isLoading } = useSelector((state) => state.masterBackend)

  const dropdownData = useSelector((state) => state.commonData)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(ParentFuncationDropDownList())
    dispatch(CompanyDropDownList())
    if (props?.match?.params?.id) {
      dispatch(ViewSubfuncationAPI(decryptSingleData(props?.match?.params?.id)))
    }
  },[])

  useEffect(()=>{
    // dispatch(CompanyDropDownList());
    dispatch(CommonGroupList())
    if(props?.match?.params?.id){
      dispatch(FunctionEditDetails(decryptSingleData(props?.match?.params?.id)));
    }
  },[]);

  const groupOptions = dropdownData?.groupComData?.data?.result;
  const companyOptions = dropdownData?.companyCommonData?.data?.result
  // const groupOptions = dropdownData?.groupComData?.data?.result;

  // console.log("groupOptions",groupOptions);

  const [selectCompanyName, setSelectCompanyName] = useState([])
  const [selectManagerName, setSelectManagerName]   = useState([]);
  const [selectLocationName, setSelectLocationName] = useState([]);
  const [selectCCenterName, setSelectCCenterName]   = useState([]);
  const [selectGroupName, setSelectGroupName]   = useState([]);

  const [parentOptions, setParentOptions] = useState([])
  const [cpyManager, setCpyManager] = useState([])
  const [cpyLocation, setCpyLocation] = useState([])
  const [cpyCostCenter, setCpyCostCenter] = useState([])
  const [parentFuncName, setParentFuncName] = useState([])

  
  //subfunction Add Form Initilization
  const subFunctionEditFormik = useFormik({
    
    initialValues: {
      name: '',
      code: '',
      group_id:'',
      company_id: '',
      cost_center_id: '',
      manager_id: '',
      location_id: '',
      parent_id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      code: Yup.string().required('This field is required'),
      // group_id:Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      cost_center_id: Yup.string().required('This field is required'),
      // manager_id: Yup.string().required('This field is required'),
      location_id:  Yup.string().required('This field is required'),
      parent_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      console.log("formData",formData);
      dispatch(SubfunctionUpdate(formData, decryptSingleData(props?.match?.params?.id), history))
    },
  })

  const handleCompanyChanges = (e) => {
    if (e?.value) {
      subFunctionEditFormik.setFieldValue('company_id', e?.value)
      const compCusData = JSON.stringify({
        params: {
          models: {
            'hr.employee': "[['company_id', '=', " + e?.value + ']]',
            'company.location': "[['company_id', '=', " + e?.value + ']]',
            'cost.center': "[['company_id', '=', " + e?.value + ']]',
            'hr.department': "[['company_id', '=', " + e?.value + ']]',
          },
        },
      })
      onManagerClear()
      onLocationClear()
      onCostCenterClear()
      onParentFunctionClear()
      dispatch(CommonCompanyIdBasedData(compCusData)) //To get data based on company id
      setSelectCompanyName(convertValueLabel(e?.value, e?.label));
    }
  }

  const handleGroupChange = (e) => {
    const sendGpparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter : '[("group_id", "=", '+e.value+')]'
      },
    }
    dispatch(CompanyDropDownList(sendGpparams))
    subFunctionEditFormik.setFieldValue('group_id', e?.value);

    setSelectGroupName(convertValueLabel(e?.value,e?.label));
    setSelectCompanyName([])
    setSelectLocationName([])
    setSelectCCenterName([])
    setSelectManagerName([])
  }

  const selectManagerRef = useRef()
  const selectLocationRef = useRef()
  const selectCostCenterRef = useRef()
  const selectParentFunctionRef = useRef()
  const onManagerClear = () => {
    selectManagerRef?.current?.select.clearValue()
  }
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
  }
  const onCostCenterClear = () => {
    selectCostCenterRef?.current?.select.clearValue()
  }
  const onParentFunctionClear = () => {
    selectParentFunctionRef?.current?.select.clearValue()
  }

  const handleManagerChange = (e) => {
    subFunctionEditFormik.setFieldValue('manager_id', e?.value);
    setSelectManagerName(convertValueLabel(e?.value,e?.label));
  }

  const handleLocationChange = (e) => {
    //console.log(e);
    // let locationList = []
    // e?.map((data, i) => locationList.push(data.value))
    // if (locationList.length > 0) {
      // subFunctionEditFormik.setFieldValue('location_id', e?.value)
    // }
     setSelectLocationName(convertValueLabel(e?.value,e?.label));
  }

  const handleCostCenterChange = (e) => {
    subFunctionEditFormik.setFieldValue('cost_center_id', e?.value)
    setSelectCCenterName(convertValueLabel(e?.value, e?.label));
  }
  const handleParentFuntionChange = (e) => {
    subFunctionEditFormik.setFieldValue('parent_id', e?.value);
    setParentFuncName(convertValueLabel(e?.value, e?.label));
  }

  useEffect(() => {
    if (subfunctionEditDetails?.name !== null) {
      // console.log("subfunctionEditDetails",subfunctionEditDetails);
      subFunctionEditFormik.setValues({
        name: subfunctionEditDetails?.name,
        code: subfunctionEditDetails?.code,
        group_id:subFunctionEditFormik?.group_id,
        company_id: subfunctionEditDetails?.company_id,
        cost_center_id: subfunctionEditDetails?.cost_center_id,
        manager_id: subfunctionEditDetails?.manager_id,
        location_id: subfunctionEditDetails?.location_id,
        parent_id: subfunctionEditDetails?.parent_id,
      })
    }
    if(isLoading === false && subfunctionEditDetails?.name !== undefined && subfunctionEditDetails?.name !== null) {
      setSelectGroupName(convertValueLabel(subfunctionEditDetails?.group_id, subfunctionEditDetails?.group_id_name));
      setSelectCompanyName(convertValueLabel(subfunctionEditDetails?.company_id, subfunctionEditDetails?.company_id_name));
      setParentFuncName(convertValueLabel(subfunctionEditDetails?.parent_id, subfunctionEditDetails?.parent_id_name));
      setSelectLocationName(convertValueLabel(subfunctionEditDetails?.location_id, subfunctionEditDetails?.location_id_name));
      setSelectManagerName(convertValueLabel(subfunctionEditDetails?.manager_id, subfunctionEditDetails?.manager_id_name));
      // let locationListonLoad = [];
      // subfunctionEditDetails?.location_ids_edit?.map((data, i) => (
      //   locationListonLoad.push({'value':data.value,'label':data.label})
      // ));
      // setSelectLocationName(locationListonLoad);
      setSelectCCenterName(convertValueLabel(subfunctionEditDetails?.cost_center_id, subfunctionEditDetails?.cost_center_id_name));
      
    }
  }, [isLoading, subfunctionEditDetails?.data])


  //To load dropdown data based on company id and its change
    useEffect(()=>{
    if(dropdownData?.companyCommonCustomData){ //This is for onchange
      setCpyManager(dropdownData?.companyCommonCustomData?.hr_employee_list);
      setCpyLocation(dropdownData?.companyCommonCustomData?.company_location_list);
      setCpyCostCenter(dropdownData?.companyCommonCustomData?.cost_center_list);
      setParentOptions(dropdownData?.companyCommonCustomData?.hr_department_list);
    } else if(subfunctionEditDetails?.manager_id_list){ //This is for update
      setCpyManager(subfunctionEditDetails?.manager_id_list);
      setCpyLocation(subfunctionEditDetails?.location_id_list);
      setCpyCostCenter(subfunctionEditDetails?.cost_center_id_list);
      setParentOptions(subfunctionEditDetails?.parent_id_list);
    }
  },[dropdownData?.companyCommonCustomData, subfunctionEditDetails?.manager_id_list, subfunctionEditDetails?.location_ids_list, subfunctionEditDetails?.cost_center_id_list,dropdownData?.companyCommonCustomData?.hr_department_list]);


  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Edit Sub Function </strong>
                </CCol>
                {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm
                onSubmit={subFunctionEditFormik.handleSubmit}
                className="form-horizontal"
              >
                <div>
                  {/* <h4>Company Details</h4>
                  <hr /> */}
                  <div className="row form-group">
                  <div className="col-md-4">
                      <label htmlFor="hf-email">Group Name <span className='error'>*</span></label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                       value={selectGroupName}
                        id="group_id"
                        name="group_id"
                        onChange={(e) => handleGroupChange(e)}
                         options={groupOptions}
                         onBlur={subFunctionEditFormik.handleBlur}
                      />
                      {subFunctionEditFormik.touched.group_id&& subFunctionEditFormik.errors.group_id ? <div className="help-block text-danger">{subFunctionEditFormik.errors.group_id}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company <span className="error">*</span>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company'}
                        value={selectCompanyName}
                        name="company_id"
                        options={companyOptions}
                        onChange={(e) => handleCompanyChanges(e)}
                        onBlur={subFunctionEditFormik.handleBlur}
                      />
                      {subFunctionEditFormik.touched.company_id &&
                      subFunctionEditFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Location <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectLocationRef}
                        // isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose Location'}
                        value={selectLocationName}
                        name="location_id"
                        options={cpyLocation}
                        onBlur={subFunctionEditFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      />
                      {subFunctionEditFormik.touched.location_id &&
                      subFunctionEditFormik.errors.location_id ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.location_id}
                        </div>
                      ) : null}
                    </div>
                    </div>
                    <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Function Name <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectParentFunctionRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a   Function Name'}
                        value={parentFuncName}
                        name="parent_id"
                        options={parentOptions}
                        onBlur={subFunctionEditFormik.handleBlur}
                        onChange={(e) => handleParentFuntionChange(e)}
                      />
                      {subFunctionEditFormik.touched.cost_center_id &&
                      subFunctionEditFormik.errors.cost_center_id ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.cost_center_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Sub Function Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={subFunctionEditFormik.values.name}
                        className="form-control"
                        placeholder="Sub Function Name"
                        maxLength={25}
                        onChange={subFunctionEditFormik.handleChange}
                        onBlur={subFunctionEditFormik.handleBlur}
                      />
                      {subFunctionEditFormik.touched.name &&
                      subFunctionEditFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Code <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={subFunctionEditFormik.values.code}
                        className="form-control"
                        placeholder="Function Code"
                        maxLength={25}
                        onChange={subFunctionEditFormik.handleChange}
                        onBlur={subFunctionEditFormik.handleBlur}
                      />
                      {subFunctionEditFormik.touched.code &&
                      subFunctionEditFormik.errors.code ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.code}
                        </div>
                      ) : null}
                    </div>

                  </div>
                  <div className="row form-group">


                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Cost Center <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectCostCenterRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Cost Center'}
                        value={selectCCenterName}
                        name="cost_center_id"
                        options={cpyCostCenter}
                        onBlur={subFunctionEditFormik.handleBlur}
                        onChange={(e) => handleCostCenterChange(e)}
                      />
                      {subFunctionEditFormik.touched.cost_center_id &&
                      subFunctionEditFormik.errors.cost_center_id ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.cost_center_id}
                        </div>
                      ) : null}
                    </div>

                    {/*<div className="col-md-4">
                      <label htmlFor="hf-email">
                        Manager <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectManagerRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Manager'}
                        value={selectManagerName}
                        name="manager_id"
                        options={cpyManager}
                        onBlur={subFunctionEditFormik.handleBlur}
                        onChange={(e) => handleManagerChange(e)}
                      />
                      {subFunctionEditFormik.touched.manager_id &&
                      subFunctionEditFormik.errors.manager_id ? (
                        <div className="help-block text-danger">
                          {subFunctionEditFormik.errors.manager_id}
                        </div>
                      ) : null}
                    </div> */}

                  </div>
                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Update
                      </CButton>
                      <Link className="ml-3 btn btn-danger" to={'/master/subfunction'}>
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

export default EditSubfunction
