import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList } from './../../actions/commonAction';
import { FunctionUpdate, FunctionEditDetails } from '../../actions/master';
import { convertValueLabel, decryptSingleData } from '../../utils/helper';
import CLoader from '../loader/CLoader';
import { useFormik } from 'formik';
import Select from 'react-select';
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
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom";

const EditFunction = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownData = useSelector(state => state.commonData);
  //To get function details
  const { functionDetails, isLoading } = useSelector(state => state.masterBackend);
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CompanyDropDownList());
    dispatch(CommonGroupList())
    if (props?.match?.params?.id) {
      dispatch(FunctionEditDetails(decryptSingleData(props?.match?.params?.id)));
    }
  }, []);

  const [companyOptions, setCompanyOptions] = useState([]);
  const [selectGroupName, setSelectGroupName] = useState([]);
  const [selectCompanyName, setSelectCompanyName] = useState([]);
  const [selectManagerName, setSelectManagerName] = useState([]);
  const [selectLocationName, setSelectLocationName] = useState([]);
  const [selectCCenterName, setSelectCCenterName] = useState([]);

  const [groupChanged, setGroupChanged] = useState(0);
  const [companyChanged, setCompanyChanged] = useState(0);
  const [locationChanged, setLocationChanged] = useState(0);


  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

  useEffect(() => {
    if (functionDetails?.company_id_list && groupChanged === 0) {
      setCompanyOptions(functionDetails?.company_id_list)
    }
    else if (dropdownData?.companyCommonData?.data?.result) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    }
  }, [dropdownData, functionDetails, companyOptions, groupChanged])


  useEffect(() => {
    if (functionDetails?.data !== null) {
      // console.log("functionDetails", functionDetails);
      functionEditFormik.setValues({
        "name": functionDetails?.name,
        "code": functionDetails?.code,
        "group_id": functionDetails?.group_id,
        "company_id": functionDetails?.company_id,
        // "manager_id": functionDetails?.manager_id,
        "location_id": functionDetails?.location_id,
        "cost_center_id": functionDetails?.cost_center_id,
      });
    }

    if (isLoading === false && functionDetails?.name !== undefined && functionDetails?.data !== null) {
      //Update values to all the dropdowns

      setSelectGroupName(convertValueLabel(functionDetails?.group_id, functionDetails?.group_id_name));
      setSelectCompanyName(convertValueLabel(functionDetails?.company_id, functionDetails?.company_id_name));
      // setSelectManagerName(convertValueLabel(functionDetails?.manager_id, functionDetails?.manager_id_name));
      setSelectLocationName(convertValueLabel(functionDetails?.location_id, functionDetails?.location_id_name));
      setSelectCCenterName(convertValueLabel(functionDetails?.cost_center_id, functionDetails?.cost_center_id_name));
    }
  }, [isLoading, functionDetails?.data])


  //set edit value for dropdown
  // const [selecCompanyDropdown, setselecCompanyDropdown] = useState({})

  const groupOptions = dropdownData?.groupComData?.data?.result;
  const [cpyManager, setCpyManager] = useState([]);
  const [cpyLocation, setCpyLocation] = useState([]);
  const [cpyCostCenter, setCpyCostCenter] = useState([]);

  //Group Add Form Initilization
  const functionEditFormik = useFormik({
    initialValues: {
      name: '',
      code: '',
      company_id: '',
      group_id: '',
      cost_center_id: '',
      // manager_id: '',
      location_id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      code: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      cost_center_id: Yup.string().required('This field is required'),
      // manager_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": values } });
      dispatch(FunctionUpdate(formData, decryptSingleData(props?.match?.params?.id), history));
      // console.log("for", formData);
    },
  });


  //To load dropdown data based on company id and its change
  useEffect(() => {
    /*if(selectManagerName){
      setSelectManagerName(convertValueLabel([]));
      onManagerClear();
      setCpyManager(dropdownData?.companyCommonCustomData?.hr_employee_list);
    }*/
    if (dropdownData?.companyCommonCustomData) { //This is for onchange
      setCpyManager(dropdownData?.companyCommonCustomData?.hr_employee_list);
      setCpyLocation(dropdownData?.companyCommonCustomData?.company_location_list);
      setCpyCostCenter(dropdownData?.companyCommonCustomData?.cost_center_list);
    } else if (functionDetails?.manager_id_list) { //This is for update
      setCpyManager(functionDetails?.manager_id_list);
      setCpyLocation(functionDetails?.location_id_list);
      setCpyCostCenter(functionDetails?.cost_center_id_list);
    }
  }, [dropdownData?.companyCommonCustomData, functionDetails?.manager_id_list, functionDetails?.location_id_list, functionDetails?.cost_center_id_list]);

  const selectManagerRef = useRef();
  const selectLocationRef = useRef();
  const selectCostCenterRef = useRef();
  const onManagerClear = () => {
    selectManagerRef?.current?.select.clearValue();
    setSelectManagerName(convertValueLabel([]));
  };
  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue();
    setSelectLocationName(convertValueLabel([]));
  };
  const onCostCenterClear = () => {
    selectCostCenterRef?.current?.select.clearValue();
    setSelectCCenterName(convertValueLabel([]));
  };

  // const handleManagerChange = (e) => {
  //   functionEditFormik.setFieldValue('manager_id', e?.value);
  //   setSelectManagerName(convertValueLabel(e?.value, e?.label));
  // }




  const handleGroupChange = (e) => {
    // setSelectCompanyName([])
    const sendGpparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: '[("group_id", "=", ' + e.value + ')]'
      },
    }
    dispatch(CompanyDropDownList(sendGpparams))
    functionEditFormik.setFieldValue('group_id', e?.value);

    setSelectGroupName(convertValueLabel(e?.value, e?.label));
    setGroupChanged(1);
    setSelectCompanyName([])
    setSelectLocationName([])
    setSelectCCenterName([])
    setSelectManagerName([])
  }

  const handleCompanyChanges = (e) => {
    if (e?.value) {
      functionEditFormik.setFieldValue('company_id', e?.value);
      const compCusData = JSON.stringify({
        "params": {
          "models": {
            "hr.employee": "[['company_id', '=', " + e?.value + "]]",
            "company.location": "[['company_id', '=', " + e?.value + "]]",
            "cost.center": "[['company_id', '=', " + e?.value + "]]"
          }
        }
      });
      // onManagerClear();
      // onLocationClear();
      // onCostCenterClear();
      dispatch(CommonCompanyIdBasedData(compCusData)); //To get data based on company id
      setSelectCompanyName(convertValueLabel(e?.value, e?.label));
      setSelectLocationName([])
      setSelectCCenterName([])
      setSelectManagerName([])

    }
  }



  const handleLocationChange = (e) => {
    //console.log(e);
    // let locationList = [];
    // e?.map((data, i) => (
    //   locationList.push(data.value)
    // ));
    // if(locationList.length > 0){
    functionEditFormik.setFieldValue('location_id', e?.value);
    // }
    setSelectLocationName(convertValueLabel(e?.value, e?.label));
    setSelectCCenterName([])
    setSelectManagerName([])
  }

  const handleCostCenterChange = (e) => {
    functionEditFormik.setFieldValue('cost_center_id', e?.value);
    setSelectCCenterName(convertValueLabel(e?.value, e?.label));
    setSelectManagerName([])
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
                      <strong> Edit Function </strong>
                    </CCol>
                    {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                    <Link className='btn btn-primary' to={'company'}>List Company</Link>
                  </CCol> */}
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={functionEditFormik.handleSubmit} className="form-horizontal">
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
                            onBlur={functionEditFormik.handleBlur}
                          // onChange={(e) => handleGroupChange(e)}
                          // onChange={({ value }) => functionEditFormik.setFieldValue('group_id', value)}
                          />
                          {functionEditFormik.touched.group_id && functionEditFormik.errors.group_id ? <div className="help-block text-danger">{functionEditFormik.errors.group_id}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Company <span className='error'>*</span></label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Company'}
                            value={selectCompanyName}
                            name="company_id"
                            options={companyOptions}
                            onChange={(e) => handleCompanyChanges(e)}
                            onBlur={functionEditFormik.handleBlur}
                          />
                          {functionEditFormik.touched.company_id &&
                            functionEditFormik.errors.company_id ? (
                            <div className="help-block text-danger">
                              {functionEditFormik.errors.company_id}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Location <span className='error'>*</span></label>
                          <Select
                            ref={selectLocationRef}
                            // isMulti={true}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose Location'}
                            value={selectLocationName}
                            name="location_id"
                            options={cpyLocation}
                            onBlur={functionEditFormik.handleBlur}
                            onChange={(e) => handleLocationChange(e)}
                          />
                          {functionEditFormik.touched.location_id &&
                            functionEditFormik.errors.location_id ? (
                            <div className="help-block text-danger">
                              {functionEditFormik.errors.location_id}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Function Name <span className='error'>*</span></label>
                          <input type="text" name='name' value={functionEditFormik.values.name} className="form-control" placeholder='Function Name' maxLength={25} onChange={functionEditFormik.handleChange} onBlur={functionEditFormik.handleBlur} />
                          {functionEditFormik.touched.name &&
                            functionEditFormik.errors.name ? (
                            <div className="help-block text-danger">
                              {functionEditFormik.errors.name}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Function Code <span className='error'>*</span></label>
                          <input type="text" name='code' value={functionEditFormik.values.code} className="form-control" placeholder='Function Code' maxLength={25} onChange={functionEditFormik.handleChange} onBlur={functionEditFormik.handleBlur} />
                          {functionEditFormik.touched.code &&
                            functionEditFormik.errors.code ? (
                            <div className="help-block text-danger">
                              {functionEditFormik.errors.code}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-md-4">
                          <label htmlFor="hf-email">Cost Center <span className='error'>*</span></label>
                          <Select
                            ref={selectCostCenterRef}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Cost Center'}
                            value={selectCCenterName}
                            name="cost_center_id"
                            options={cpyCostCenter}
                            onBlur={functionEditFormik.handleBlur}
                            onChange={(e) => handleCostCenterChange(e)}
                          />
                          {functionEditFormik.touched.cost_center_id &&
                            functionEditFormik.errors.cost_center_id ? (
                            <div className="help-block text-danger">
                              {functionEditFormik.errors.cost_center_id}
                            </div>
                          ) : null}
                        </div>

                      </div>
                      {/* <div className="row form-group">

                        <div className="col-md-4">
                          <label htmlFor="hf-email">Manager <span className='error'>*</span></label>
                          <Select
                            ref={selectManagerRef}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Manager'}
                            value={selectManagerName}
                            name="manager_id"
                            options={cpyManager}
                            onBlur={functionEditFormik.handleBlur}
                            onChange={(e) => handleManagerChange(e)}
                          />
                          {functionEditFormik.touched.manager_id &&
                            functionEditFormik.errors.manager_id ? (
                            <div className="help-block text-danger">
                              {functionEditFormik.errors.manager_id}
                            </div>
                          ) : null}
                        </div>


                      </div> */}
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className='col-md-10' align="center" >
                          <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                          <Link className='ml-3 btn btn-danger' to={'/master/function'}><CIcon name="cil-ban" /> Cancel</Link>
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

export default EditFunction