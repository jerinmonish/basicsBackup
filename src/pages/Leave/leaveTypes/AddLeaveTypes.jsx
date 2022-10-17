import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LocationDropDownList, FunctionDropDownList, CommonMainTypesDropdown } from '../../../actions/commonAction'
import { LeaveTypesAddAPI, LeaveMaintypesList } from '../../../actions/leave'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
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
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { indianDateFormat, convertValueLabel } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const AddLeaveTypes = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const dropdownData = useSelector((state) => state.commonData)
  // console.log("dropdownData",dropdownData);
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList())
    dispatch(CommonMainTypesDropdown())
  }, [])


  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [focusOfInc, setFocusOfInc] = useState(false);
  const [focusOfTo, setFocusOfTo] = useState(false);

  //To load years
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year(); i <= moment().year() + 30; i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  const [groupChanged, setGroupChanged] = useState(0);
  const [companyChanged, setCompanyChanged] = useState(0);


  const [colorCodeOption, setColorCodeOption] = useState([{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }, { value: 'lightgreen', label: 'Light Green' }, { value: 'lightblue', label: 'Light Blue' }, { value: 'lightblue', label: 'Light Blue' }, { value: 'lightyellow', label: 'Light Yellow' }, { value: 'magenta', label: 'Magenta' }, { value: 'lightcyan', label: 'Light Cyan' }, { value: 'black', label: 'Black' }, { value: 'lightpink', label: 'Light Pink' }, { value: 'brown', label: 'Brown' }, { value: 'violet', label: 'Violet' }, { value: 'lightcoral', label: 'Light Coral' }, { value: 'lightsalmon', label: 'Light Salmon' }, { value: 'lavender', label: 'Lavender' }, { value: 'wheat', label: 'Wheat' }, { value: 'ivory', label: 'Ivory' }]);
  // const [toHalfOptions, setToHalfOptions] = useState([{ value: 'first_half', label: 'First Half' }, { value: 'second_half', label: 'Second Half' }]);

  // to load the option data for dropdown
  const groupOptions = dropdownData?.groupComData?.data?.result
  const mainTypesOptions = dropdownData?.mainTypeCommonData?.data?.result
  const [companyOptions, setCompanyOptions] = useState([]);
  const handleDateOfInc = (date) => {


    if (date) {

      setTodateChange(date)
      setDateFrom(date)
      LeaveTypesAddFormik.setFieldValue('validity_start', indianDateFormat(date._d));
    }
  }

  const handleDateTo = (date) => {
    if (date) {
      setDateTo(date)
      if (date > todateChange) {
        LeaveTypesAddFormik.setFieldValue('validity_stop', indianDateFormat(date._d));
      }
    }
  }
  const selectCompanyRef = useRef()
  const selectLocationRef = useRef()
  const selectFunctionRef = useRef()
  const selectJobRef = useRef()

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
    if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
      setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
      // setLocationChanged(convertValueLabel([]));
    }
  }, [dropdownData?.companyCommonData?.data?.result, groupChanged])


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
      LeaveTypesAddFormik.setFieldValue('group_id', e.value)
      onCompanyClear();
      setGroupChanged(1);

      //  setSubfunctionOptions(convertValueLabel([]));


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
      LeaveTypesAddFormik.setFieldValue('company_id', e.value)
      onLocationClear()
      onFunctionClear()
      onJobClear()
      setCompanyChanged(1);



    }
  }





  const handleMode = (e) => {
    if (e) {
      LeaveTypesAddFormik.setFieldValue('allocation_type', e?.value);
      setCopyMainTypeMode(convertValueLabel(e.value, e.label));
    }
  }

  const handleApproval = (e) => {
    if (e) {
      LeaveTypesAddFormik.setFieldValue('leave_validation_type', e?.value);
      setApproval(convertValueLabel(e.value, e.label));
    }
  }

  const handleTakeLeave = (e) => {
    if (e) {
      LeaveTypesAddFormik.setFieldValue('request_unit', e?.value);
      setTakeLeave(convertValueLabel(e.value, e.label));
    }
  }

  const handleColorCode = (e) => {
    if (e) {
      LeaveTypesAddFormik.setFieldValue('color_name', e?.value);
      setApproval(convertValueLabel(e.value, e.label));
    }
  }
  const [copyMainType, setCopyMainType] = useState('');
  const [copyMainTypeCode, setCopyMainTypeCode] = useState('');
  const [copyMainTypeMode, setCopyMainTypeMode] = useState('');
  const [copyMainTypeApproval, setCopyMainTypeApproval] = useState('');
  const [copyMainTypeModeTemp, setCopyMainTypeModeTemp] = useState('');
  const [copyMainTypeApprovalTemp, setCopyMainTypeApprovalTemp] = useState('');

  const handleMainTypes = (e) => {

    // console.log(e);
    setCopyMainType(e.label)
    setCopyMainTypeCode(e.code)
    setCopyMainTypeMode(e.main_type_label)
    setCopyMainTypeModeTemp(e.main_type)
    setCopyMainTypeApproval(e.main_validation_type_label)
    setCopyMainTypeApprovalTemp(e.main_validation_type)

    if (e) {
      LeaveTypesAddFormik.setFieldValue('leave_main_id', e?.value);
      setMainTypescommon(convertValueLabel(e.value, e.label));
    }
  }

  const [title, setTitle] = useState('')

  const handleMainChanges = (e) => {
    // console.log("e", e);
    if (e) {
      setCopyMainType(e)
    }
  }

  // console.log('leave_validation_type', copyMainTypeApproval);
  // console.log('mode', copyMainTypeMode);
  // console.log('code', copyMainTypeCode);
  // console.log('maintype', copyMainType);

  const [maintypesCommon, setMainTypescommon] = useState([]);

  const [todateChange, setTodateChange] = useState([]);
  //dropdown 
  // const [mode, setMode] = useState([]);
  const [approval, setApproval] = useState([]);
  const [takeLeave, setTakeLeave] = useState([]);
  // to load the select data
  // const [modeOptions, setModeOptions] = useState([{ value: 'no', label: 'No Limit' }, { value: 'fixed_allocation', label: 'Allow Employees Requests' }, { value: 'fixed', label: 'Set by Leave Officer' }]);
  // const [approvalOptions, setApprovalOptions] = useState([{ value: 'no_validation', label: 'No Validation' }, { value: 'hr', label: 'By Leave Officer' }, { value: 'manager', label: 'By Employees Manager' }, { value: 'both', label: 'By Employees Manager and Leave Officer' }]);

  const [takeLeaveOptions, setTakeLeaveOptions] = useState([{ value: 'day', label: 'Day' }, { value: 'half_day', label: 'Half Day' }, { value: 'hour', label: 'Hours' }]);

  // console.log("roleOptions",dropdownData?.roleCommonData);
  //Designation Add Form Initilization
  const LeaveTypesAddFormik = useFormik({
    initialValues: {
      group_id: '',
      company_id: '',
      name: '',
      code: '',
      color_name: '',
      leave_main_id: '',
      request_unit: '',
      validity_start: '',
      validity_stop: '',
      allocation_type: '',
      leave_validation_type: '',


    },
    validationSchema: Yup.object({
      // group_id: Yup.string().required('This field is required'),
      // company_id: Yup.string().required('This field is required'),
      // name: Yup.string().required('This field is required'),
      // code: Yup.string().required('This field is required'),
      // request_unit: Yup.string().required('This field is required'),
      // validity_start: Yup.string().required('This field is required'),
      // validity_stop: Yup.string().required('This field is required'),
      // allocation_type: Yup.string().required('This field is required'),
      // leave_validation_type: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      // console.log("val", values);
      values.name = copyMainType
      values.code = copyMainTypeCode
      values.allocation_type = copyMainTypeModeTemp
      values.leave_validation_type = copyMainTypeApprovalTemp
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(LeaveTypesAddAPI(formData, history))
      // console.log("formData", formData);
    },
  })

  // console.log("maintype=", copyMainType);

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> Add Leave Types</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={LeaveTypesAddFormik.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Main Type
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Main Type'}
                        value={maintypesCommon}
                        name="leave_main_id"
                        options={mainTypesOptions}
                        onChange={(e) => handleMainTypes(e)}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                      />

                      {LeaveTypesAddFormik.touched.leave_main_id && LeaveTypesAddFormik.errors.leave_main_id ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.leave_main_id}
                      </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Leave Type Name <span className="error"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        // value={LeaveTypesAddFormik.values.name}
                        value={copyMainType}
                        className="form-control"
                        placeholder=" Leave Type Name"
                        maxLength={25}
                        onChange={event => handleMainChanges(event.target.value)}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                      />
                      {LeaveTypesAddFormik.touched.name && LeaveTypesAddFormik.errors.name && copyMainType === '' || copyMainType === 'undefined' ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.name}
                      </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        // value={LeaveTypesAddFormik.values.name}
                        value={copyMainTypeCode}
                        className="form-control"
                        placeholder="Code"
                        maxLength={25}
                        onChange={LeaveTypesAddFormik.handleChange}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                      />

                      {LeaveTypesAddFormik.touched.code && LeaveTypesAddFormik.errors.code ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.code}
                      </div>
                      ) : null}
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="hf-email">
                        Color
                      </label>

                      {/* <input
                        type="color"
                        name="color_name"
                        // value="#e66465"
                        // value={LeaveTypesAddFormik.values.name}
                        // value={copyMainTypeCode}
                        className="form-control"
                        placeholder="Code"
                        maxLength={25}
                        onChange={LeaveTypesAddFormik.handleChange}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                      /> */}

                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Color'}
                        name="color_name"
                        options={colorCodeOption}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                        onChange={(e) => handleColorCode(e)}
                      // onChange={({ value }) => LeaveTypesAddFormik.setFieldValue('group_id', value)}
                      />

                      {LeaveTypesAddFormik.touched.color_name && LeaveTypesAddFormik.errors.color_name ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.color_name}
                      </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Group<span className="error"> *</span>
                      </label>
                      <Select

                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Group Name'}
                        name="group_id"
                        options={groupOptions}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                        onChange={(e) => handleGroupChange(e)}
                      // onChange={({ value }) => LeaveTypesAddFormik.setFieldValue('group_id', value)}
                      />
                      {LeaveTypesAddFormik.touched.group_id &&
                        LeaveTypesAddFormik.errors.group_id ? (
                        <div className="help-block text-danger">
                          {LeaveTypesAddFormik.errors.group_id}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Company <span className="error"> *</span>
                      </label>
                      <Select
                        //  isMulti={true}
                        ref={selectCompanyRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a  Company '}
                        name="company_id"
                        options={companyOptions}
                        // value={}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                        onChange={(e) => handleCompanyChange(e)}

                      // onChange={({ value }) => LeaveTypesAddFormik.setFieldValue('company_id', value)}
                      />
                      {LeaveTypesAddFormik.touched.company_id &&
                        LeaveTypesAddFormik.errors.company_id ? (
                        <div className="help-block text-danger">
                          {LeaveTypesAddFormik.errors.company_id}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Take Leave In
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Take Leave In'}
                        value={takeLeave}
                        name="request_unit"
                        options={takeLeaveOptions}
                        onChange={(e) => handleTakeLeave(e)}
                        onBlur={LeaveTypesAddFormik.handleBlur}
                      />

                      {LeaveTypesAddFormik.touched.request_unit && LeaveTypesAddFormik.errors.request_unit ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.request_unit}
                      </div>
                      ) : null}
                    </div>




                  </div>
                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <CCard className="mb-4">
                        <CCardHeader id="headingTwo " className="header">
                          <div>
                            <h5 className="m-0 p-0">Validity</h5>
                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="hf-email">
                                From
                              </label>
                              <SingleDatePicker
                                id={'validity_start'}
                                isOutsideRange={d => d.isSame()}
                                date={dateFrom} // momentPropTypes.momentObj or null
                                onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                focused={focusOfInc} // PropTypes.bool
                                onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                numberOfMonths={1}
                                displayFormat="DD-MM-YYYY"
                                //showClearDate={true}
                                // isOutsideRange={() => false}
                                placeholder='From'
                                readOnly={true}
                                renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                      <select
                                        value={month.month()}
                                        onChange={(e) => onMonthSelect(month, e.target.value)}
                                      >
                                        {moment.months().map((label, value) => (
                                          <option value={value} key={`validity_start${value}`}>{label}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                        {yearsDD('validity_start')}
                                      </select>
                                    </div>
                                  </div>}
                              />

                            </div>
                            <div className="col-md-6">
                              <label htmlFor="hf-email">
                                To
                              </label>

                              <SingleDatePicker
                                id={'validity_stop'}
                                isOutsideRange={d => d.isBefore(moment(todateChange))}
                                date={dateTo} // momentPropTypes.momentObj or null
                                onDateChange={(date) => handleDateTo(date)} // PropTypes.func.isRequired
                                focused={focusOfTo} // PropTypes.bool
                                onFocusChange={({ focused }) => setFocusOfTo(focused)} // PropTypes.func.isRequired
                                numberOfMonths={1}
                                displayFormat="DD-MM-YYYY"
                                //showClearDate={true}
                                // isOutsideRange={() => false}
                                placeholder='To'
                                readOnly={true}
                                renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                      <select
                                        value={month.month()}
                                        onChange={(e) => onMonthSelect(month, e.target.value)}
                                      >
                                        {moment.months().map((label, value) => (
                                          <option value={value} key={`validity_stop_${value}`}>{label}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                        {yearsDD('validity_stop')}
                                      </select>
                                    </div>
                                  </div>}
                              />

                            </div>
                          </div>

                        </CCardBody>
                      </CCard>
                    </div>
                    <div className='col-md-4'>
                      <CCard className="mb-4">
                        <CCardHeader id="headingTwo " className="header">
                          <div>
                            <h5 className="m-0 p-0">Allocation Requests</h5>
                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <div className="row">
                            <div className="col-md-12">
                              <label htmlFor="hf-email">
                                Mode
                              </label>
                              <input
                                type="text"
                                name="allocation_type"
                                // value={LeaveTypesAddFormik.values.name}
                                value={copyMainTypeMode}
                                className="form-control"
                                placeholder="Mode"
                                maxLength={25}
                                onChange={LeaveTypesAddFormik.handleChange}
                                onBlur={LeaveTypesAddFormik.handleBlur}
                              />
                              {/* <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder={'Choose a Mode'}
                                value={copyMainTypeMode}
                                name="allocation_type"
                                options={modeOptions}
                                onChange={(e) => handleMode(e)}
                                onBlur={LeaveTypesAddFormik.handleBlur}
                              /> */}
                              {/* {onChange = {({ value }) => LeaveTypesAddFormik.setFieldValue('allocation_type', value)} } */}

                              {LeaveTypesAddFormik.touched.allocation_type &&
                                LeaveTypesAddFormik.errors.allocation_type ? (
                                <div className="help-block text-danger">
                                  {LeaveTypesAddFormik.errors.allocation_type}
                                </div>
                              ) : null}
                            </div>
                          </div>

                        </CCardBody>
                      </CCard>
                    </div>
                    <div className='col-md-4'>
                      <CCard className="mb-4">
                        <CCardHeader id="headingTwo " className="header">
                          <div>
                            <h5 className="m-0 p-0">Leave Requests</h5>
                          </div>
                        </CCardHeader>
                        <CCardBody>
                          <div className="row">
                            <div className="col-md-12">
                              <label htmlFor="hf-email">
                                Approval Condition
                              </label>

                              <input
                                type="text"
                                name="leave_validation_type"
                                // value={LeaveTypesAddFormik.values.name}
                                value={copyMainTypeApproval}
                                className="form-control"
                                placeholder="Approval Condition"
                                maxLength={25}
                                onChange={LeaveTypesAddFormik.handleChange}
                                onBlur={LeaveTypesAddFormik.handleBlur}
                              />
                              {/* <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder={'Choose a  Approval Condition'}
                                value={approval}
                                name="leave_validation_type"
                                options={approvalOptions}
                                onChange={(e) => handleApproval(e)}
                                onBlur={LeaveTypesAddFormik.handleBlur}
                              /> */}

                              {LeaveTypesAddFormik.touched.leave_validation_type &&
                                LeaveTypesAddFormik.errors.leave_validation_type ? (
                                <div className="help-block text-danger">
                                  {LeaveTypesAddFormik.errors.leave_validation_type}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </CCardBody>
                      </CCard>
                    </div>
                  </div>



                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-12" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Save
                      </CButton>
                      <Link className="ml-3 btn btn-danger" to={'/leave/leaveTypes'}>
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

export default AddLeaveTypes
