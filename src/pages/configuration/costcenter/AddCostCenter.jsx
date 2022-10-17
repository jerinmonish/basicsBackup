import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonGroupList, FunctionDropDownList, LocationDropDownList, CommonSubfunctionList } from './../../../actions/commonAction'
import { CostcenterAddAPI } from '../../../actions/configuration'
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
import { convertValueLabel } from '../../../utils/helper'
import { useHistory } from 'react-router-dom'

const AddCostCenter = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  // stop loading predefine  data before handlegroup change
  const [groupChanged, setGroupChanged] = useState(0);
  const [companyChanged, setCompanyChanged] = useState(0);
  const [locationChanged, setLocationChanged] = useState(0);
  const [functionChanged, setFunctionChanged] = useState(0);
  const [subFunctionChanged, setSubfunctionChanged] = useState(0);
  const groupOptions = dropdownData?.groupComData?.data?.result;

  //handle groupchange set to company select options
  const [companyOptions, setCompanyOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [functionOptions, setFunctionOptions] = useState([]);
  const [subfunctionOptions, setSubfunctionOptions] = useState([]);

  useEffect(() => {
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
      // setCompanyOptions(convertValueLabel([]));
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
      setLocationOptions(dropdownData?.locationCommonData?.data?.result);
      // setLocationOptions(convertValueLabel([]));
    }
  }, [dropdownData?.locationCommonData?.data?.result, companyChanged])

  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.functionCommonData?.data?.result && locationChanged === 1) {
      setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
      // setFunctionOptions(convertValueLabel([]));
    }
  }, [dropdownData?.functionCommonData?.data?.result, locationChanged])

  useEffect(() => {
    // console.log("dropdownData?.locationCommonData?",dropdownData);
    if (dropdownData?.subfunctionCommonData?.data?.result && functionChanged === 1) {
      setSubfunctionOptions(dropdownData?.subfunctionCommonData?.data?.result);
      // setSubfunctionOptions(convertValueLabel([]));
    }
  }, [dropdownData?.subfunctionCommonData?.data?.result, functionChanged])

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
  }, [])

  const selectCompanyRef = useRef()
  const selectLocationRef = useRef()
  const selectFunctionRef = useRef()
  const selectSubfunctionRef = useRef()

  const onCompanyClear = () => {
    selectCompanyRef?.current?.select.clearValue()
  }


  const onLocationClear = () => {
    selectLocationRef?.current?.select.clearValue()
  }

  const onFunctionClear = () => {
    selectFunctionRef?.current?.select.clearValue()
  }

  const onSubfunctionClear = () => {
    selectSubfunctionRef?.current?.select.clearValue()
  }



  //when onchange
  const handleGroupChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("group_id", "=", ' + e.value + ')]'
        },
      }



      dispatch(CompanyDropDownList(sendGpparams))
      CostCenterAddFormik.setFieldValue('group_id', e.value)
      onCompanyClear();
      onLocationClear();
      onFunctionClear();
      onSubfunctionClear();
      setGroupChanged(1);
      setLocationOptions(convertValueLabel([]));
      setFunctionOptions(convertValueLabel([]));
      setSubfunctionOptions(convertValueLabel([]));


    }
  }

  const handleCompanyChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[("company_id", "=", ' + e.value + ')]'
        },
      }


      dispatch(LocationDropDownList(sendGpparams))
      CostCenterAddFormik.setFieldValue('company_id', e.value)
      onLocationClear()
      onFunctionClear()
      onSubfunctionClear()
      setFunctionOptions(convertValueLabel([]));
      setSubfunctionOptions(convertValueLabel([]));
      setCompanyChanged(1);



    }
  }


  const handleLocationChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["location_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
        },
      }
      onFunctionClear()
      onSubfunctionClear()
      dispatch(FunctionDropDownList(sendGpparams))
      CostCenterAddFormik.setFieldValue('location_id', e.value)
      onFunctionClear()
      onSubfunctionClear()
      setSubfunctionOptions(convertValueLabel([]));
      setLocationChanged(1)



    }
  }

  const handleFunctionChange = (e) => {
    if (e?.value) {

      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["parent_id", "in", [' + e?.value + ']],["parent_id", "!=", False]]',
        },
      }
      onSubfunctionClear()
      dispatch(CommonSubfunctionList(sendGpparams))
      CostCenterAddFormik.setFieldValue('department_id', e.value)
      setFunctionChanged(1);
    }
  }

  const handleSubFunctionChange = (e) => {
    if (e?.value) {
      CostCenterAddFormik.setFieldValue('sub_function_id', e?.value)
    }
  }

  //Designation Add Form Initilization
  const CostCenterAddFormik = useFormik({
    initialValues: {
      name: '',
      short_name: "",
      group_id: "",
      company_id: "",
      location_id: "",
      department_id: "",
      sub_function_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      short_name: Yup.string().required('This field is required'),
      group_id: Yup.string().required('This field is required'),
      company_id: Yup.string().required('This field is required'),
      location_id: Yup.string().required('This field is required'),
      department_id: Yup.string().required('This field is required'),
      sub_function_id: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(CostcenterAddAPI(formData, history))
    },
  })

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add Cost Center </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={CostCenterAddFormik.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Group Name <span className="error">*</span>
                      </label>
                      <Select

                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        name="group_id"
                        options={groupOptions}
                        onBlur={CostCenterAddFormik.handleBlur}
                        onChange={(e) => handleGroupChange(e)}
                      />
                      {CostCenterAddFormik.touched.group_id &&
                        CostCenterAddFormik.errors.group_id ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.group_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company Name <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectCompanyRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Company Name'}
                        name="company_id"
                        options={companyOptions}
                        onBlur={CostCenterAddFormik.handleBlur}
                        onChange={(e) => handleCompanyChange(e)}
                      />
                      {CostCenterAddFormik.touched.company_id &&
                        CostCenterAddFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Location Name <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectLocationRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Location Name'}
                        name="location_id"
                        options={locationOptions}
                        onBlur={CostCenterAddFormik.handleBlur}
                        onChange={(e) => handleLocationChange(e)}
                      />
                      {CostCenterAddFormik.touched.location_id &&
                        CostCenterAddFormik.errors.location_id ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.location_id}
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
                        ref={selectFunctionRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Function Name'}
                        name="department_id"
                        options={functionOptions}
                        onBlur={CostCenterAddFormik.handleBlur}
                        onChange={(e) => handleFunctionChange(e)}
                      />
                      {CostCenterAddFormik.touched.department_id &&
                        CostCenterAddFormik.errors.department_id ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.department_id}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Sub Function Name <span className="error">*</span>
                      </label>
                      <Select
                        ref={selectSubfunctionRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Sub Function Name'}
                        name="sub_function_id"
                        options={subfunctionOptions}
                        onBlur={CostCenterAddFormik.handleBlur}
                        onChange={(e) => handleSubFunctionChange(e)}
                      />
                      {CostCenterAddFormik.touched.sub_function_id &&
                        CostCenterAddFormik.errors.sub_function_id ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.sub_function_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={CostCenterAddFormik.values.name}
                        className="form-control"
                        placeholder="Enter name"
                        maxLength={25}
                        onChange={CostCenterAddFormik.handleChange}
                        onBlur={CostCenterAddFormik.handleBlur}
                      />
                      {CostCenterAddFormik.touched.name &&
                        CostCenterAddFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Short Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="short_name"
                        value={CostCenterAddFormik.values.short_name}
                        className="form-control"
                        placeholder="Enter Short name"
                        maxLength={25}
                        onChange={CostCenterAddFormik.handleChange}
                        onBlur={CostCenterAddFormik.handleBlur}
                      />
                      {CostCenterAddFormik.touched.short_name &&
                        CostCenterAddFormik.errors.short_name ? (
                        <div className="help-block text-danger">
                          {CostCenterAddFormik.errors.short_name}
                        </div>
                      ) : null}
                    </div>

                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Save
                      </CButton>
                      <Link className="ml-3 btn btn-danger" to={'/configuration/CostCenter'}>
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

export default AddCostCenter
