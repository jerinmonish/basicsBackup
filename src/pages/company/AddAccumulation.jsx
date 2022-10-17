import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CostCenterDropDownList, LeaveTypesDropDownList, CommonCompanyIdBasedData } from './../../actions/commonAction';
import { LeaveAccumulationAddData } from './../../actions/leave';
import { useFormik } from 'formik';
import Select from 'react-select';
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { indianDateFormat, convertBase64, convertValueLabel, userLocalDecryptData } from '../../utils/helper';
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
  CFormGroup,
  CInput,
  CInputGroup,
  CPagination,
  CDataTable,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
  CCardFooter,
  CLabel,
  CFormText,
  CButtonToolbar,
  CInputCheckbox
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "react-dates/lib/css/_datepicker.css";
import * as Yup from 'yup'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddAccumulation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const empData = userLocalDecryptData();
  const dropdownData = useSelector((state) => state.commonData)
  const [carryOverMethodOptions, setCarryOverMethodOptions] = useState([{ value: 'balance', label: 'Carry Over Balance' }, { value: 'percentage', label: 'Carry Over a Percentage of Balance' }]);
  const [hsCarryOverPer, setHsCarryOverPer] = useState(0);
  const [hsLimitOverPer, setHsLimitOverPer] = useState(0);
  const [hsScheduleOverPer, setHsScheduleOverPer] = useState(0);

  const [carryOverName, setCarryOverName] = useState([]);
  const [carryOverTo, setCarryOverTo] = useState([]);

  const [ccenter, setCcenter] = useState([]);
  const [eempId, setEempId] = useState();
  const [costCenterOptions, setCostCenterOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState();
  const selectEmpRef = useRef();

  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }

  const onEmpClear = () => {
    selectEmpRef.current.select.clearValue();
    setEmployeeOptions(convertValueLabel([]));
  }

  //To load dropdown predefined data
  useEffect(() => {
    const sendGpparamsleave = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: '[["company_id", "in", [' + empData?.company_id + ']]]',
      },
    }
    dispatch(LeaveTypesDropDownList(sendGpparamsleave))
  }, [])

  useEffect(() => {
    dispatch(CostCenterDropDownList())
  }, [])

  useEffect(() => {
    setCostCenterOptions(dropdownData?.costCenterCommonData?.data?.result);
  }, [dropdownData?.costCenterCommonData?.data?.result])

  useEffect(() => {
    // console.log('emp', dropdownData);
    setEmployeeOptions(dropdownData?.companyCommonCustomData?.hr_employee_list);

    let empList = []
    let empListView = []
    dropdownData?.companyCommonCustomData?.hr_employee_list?.map((data, i) => (
      empList.push(data.value),
      empListView.push({ 'value': data.value, 'label': data.label })
    ));
    LeaveAccumulation.setFieldValue('employee_ids', empList);
    setEempId(empListView);
  }, [dropdownData?.companyCommonCustomData?.hr_employee_list])


  const [dateEpfSt, setDateEpfSt] = useState(null);
  const [focusEpfSt, setFocusEpfSt] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'This field is required.';
    }
    return errors;
  };

  const LeaveAccumulation = useFormik({
    initialValues: {
      name: '',
      source_leave_type_id: '',
      dest_leave_type_id: '',
      carryover_method: '',
      carryover_percentage: '',
      limit_carryover: '',
      carryover_days: '',
      cost_center_ids: '',
      employee_ids: ''
      // schedule_carryover: '',
      // schedule_date: '',
    },
    // validate,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("This field is Required"),
      carryover_method: Yup.string().required('This field is Required'),
      source_leave_type_id: Yup.string().required("This field is Required"),
      dest_leave_type_id: Yup.string().required("This field is Required"),
      cost_center_ids: Yup.array().required('This field is required'),
      // employee_ids: Yup.array().required('This field is required'),
      // employee_ids: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": values } });
      dispatch(LeaveAccumulationAddData(formData, history));
    },
  });

  const handleEpfDate = (date) => {
    if (date) {
      setDateEpfSt(date)
      LeaveAccumulation.setFieldValue('schedule_date', indianDateFormat(date._d));
    }
  }

  const handleCarryOverFrom = (e) => {
    if (e.value) {
      LeaveAccumulation.setFieldValue('source_leave_type_id', e.value);
      setCarryOverName(convertValueLabel(e.value, e.label))
      if (carryOverTo.value == e.value) {
        toast.error('Carry Over From and Carry Over To must not be the same !', { position: toast.POSITION.TOP_RIGHT });
        setCarryOverName([])
        LeaveAccumulation.setFieldValue('dest_leave_type_id', '');
      }
    }
  }

  const handleCarryOverTo = (e) => {
    if (e.value) {
      LeaveAccumulation.setFieldValue('dest_leave_type_id', e.value)
      setCarryOverTo(convertValueLabel(e.value, e.label));
      if (carryOverName.value == e.value) {
        toast.error('Carry Over From and Carry Over To must not be the same !', { position: toast.POSITION.TOP_RIGHT });
        setCarryOverName([])
        LeaveAccumulation.setFieldValue('source_leave_type_id', '');
      }
    }
  }

  const handleCarryOverMethod = (e) => {
    if (e.value == "percentage") {
      setHsCarryOverPer(1);
      LeaveAccumulation.setFieldValue('carryover_method', e.value)
    } else {
      setHsCarryOverPer(0);
      LeaveAccumulation.setFieldValue('carryover_method', e.value)
    }
  }

  const handleLimitCarryOver = (e) => {
    if (e.target.checked == true) {
      setHsLimitOverPer(1);
      LeaveAccumulation.setFieldValue('limit_carryover', 1);
    } else {
      setHsLimitOverPer(0);
      LeaveAccumulation.setFieldValue('limit_carryover', 0);
    }
  }

  const handleScheduleCarryOver = (e) => {
    if (e.target.checked == true) {
      setHsScheduleOverPer(1);
      LeaveAccumulation.setFieldValue('schedule_carryover', 1);
    } else {
      setHsScheduleOverPer(0);
      LeaveAccumulation.setFieldValue('schedule_carryover', 0);
    }
  }

  const handleCostCenter = (e, { action }) => {
    //onEmpClear();
    let groupList = []
    e?.map((data, i) => (groupList.push(data.value)));
    const sendGpparams = {
      params: {
        models: {
          "hr.employee": "[['cost_center_id', 'in', [" + groupList + "]]]"
        },
      },
    }
    dispatch(CommonCompanyIdBasedData(sendGpparams));
    LeaveAccumulation.setFieldValue('cost_center_ids', groupList);
    // setCcenter(convertValueLabel(e?.value, e?.label));
  }

  const handleEmployees = (e, { action }) => {
    let empList = []
    let empList_f = []
    e?.map((data, i) => (
      empList_f.push({ 'value': data.value, 'label': data.label }),
      empList.push(data.value)
    ));
    LeaveAccumulation.setFieldValue('employee_ids', empList);
    setEempId(empList_f);
  }

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong>Add Carry Forward</strong>
                </CCol>
                {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
              </CRow>
            </CCardHeader>
            <div className="ribbon ribbon-top-right">
              <span style={{ backgroundColor: '#eac53e' }}>Draft</span>
            </div>
            <CCardBody>
              <CForm onSubmit={LeaveAccumulation.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Title <span className='error'>*</span></label>
                      <input type="text" name='name' value={LeaveAccumulation.values.name} className="form-control" placeholder='Title' maxLength={25} onBlur={LeaveAccumulation.handleBlur} onChange={LeaveAccumulation.handleChange} />
                      {LeaveAccumulation.touched.name && LeaveAccumulation.errors.name ? <div className="help-block text-danger">{LeaveAccumulation.errors.name}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Carry Over From <span className='error'>*</span></label>
                      <Select
                        value={carryOverName}
                        className="basic-single"
                        classNamePrefix="select"
                        name="source_leave_type_id"
                        options={dropdownData?.leaveTypesCommonData?.data?.result}
                        placeholder={'Choose a Carry Over From'}
                        onBlur={LeaveAccumulation.handleBlur}
                        onChange={(e) => handleCarryOverFrom(e)}
                      />
                      {LeaveAccumulation.touched.source_leave_type_id && LeaveAccumulation.errors.source_leave_type_id ? <div className="help-block text-danger">{LeaveAccumulation.errors.source_leave_type_id}</div> : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Carry Over To <span className='error'>*</span></label>
                      <Select
                        value={carryOverTo}
                        className="basic-single"
                        classNamePrefix="select"
                        name="dest_leave_type_id"
                        options={dropdownData?.leaveTypesCommonData?.data?.result}
                        placeholder={'Choose a Carry Over To'}
                        onBlur={LeaveAccumulation.handleBlur}
                        onChange={(e) => handleCarryOverTo(e)}
                      />
                      {LeaveAccumulation.touched.dest_leave_type_id && LeaveAccumulation.errors.dest_leave_type_id ? <div className="help-block text-danger">{LeaveAccumulation.errors.dest_leave_type_id}</div> : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Carry Over Method <span className='error'>*</span></label>
                      <Select
                        // ref={selectDistrictRef}
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={""}
                        name="carryover_method"
                        options={carryOverMethodOptions}
                        placeholder={'Choose a Carry Over Method'}
                        onBlur={LeaveAccumulation.handleBlur}
                        onChange={(e) => handleCarryOverMethod(e)}
                      />
                      {LeaveAccumulation.touched.carryover_method && LeaveAccumulation.errors.carryover_method ? <div className="help-block text-danger">{LeaveAccumulation.errors.carryover_method}</div> : null}
                    </div>
                    {
                      hsCarryOverPer == 1 ?
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Carry Over Percentage % <span className='error'>*</span></label>
                          <input type="text" name='carryover_percentage' value={LeaveAccumulation.values.carryover_percentage} className="form-control" placeholder='Carry Over Percentage %' maxLength={3} onBlur={LeaveAccumulation.handleBlur} onChange={LeaveAccumulation.handleChange} />
                          {LeaveAccumulation.touched.carryover_percentage && LeaveAccumulation.errors.carryover_percentage ? <div className="help-block text-danger">{LeaveAccumulation.errors.carryover_percentage}</div> : null}
                        </div> : ''
                    }
                    <div className="col-md-2">
                      <CFormGroup variant="custom-checkbox" inline id='accumulation_add_leave'>
                        <CInputCheckbox custom id="limit_carryover" name="limit_carryover" onBlur={LeaveAccumulation.handleBlur} onChange={(e) => handleLimitCarryOver(e)} />
                        <CLabel variant="custom-checkbox" htmlFor="limit_carryover">Limit Carry Over</CLabel>
                      </CFormGroup>
                      {LeaveAccumulation.touched.limit_carryover && LeaveAccumulation.errors.limit_carryover ? <div className="help-block text-danger">{LeaveAccumulation.errors.limit_carryover}</div> : null}
                    </div>
                    {
                      hsLimitOverPer == 1 ?
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Max Days to Carry Over </label>
                          <input type="text" name='carryover_days' value={LeaveAccumulation.values.carryover_days} className="form-control" placeholder='Max Days to Carry Over' maxLength={3} onBlur={LeaveAccumulation.handleBlur} onChange={LeaveAccumulation.handleChange} />
                          {LeaveAccumulation.touched.carryover_days && LeaveAccumulation.errors.carryover_days ? <div className="help-block text-danger">{LeaveAccumulation.errors.carryover_days}</div> : null}
                        </div> : ''
                    }
                  </div>
                  {/* <div className='row form-group'>
                    <div className="col-md-3">
                      <CFormGroup variant="custom-checkbox" inline id='accumulation_add_leave'>
                        <CInputCheckbox custom id="schedule_carryover" name="schedule_carryover" onChange={(e) => handleScheduleCarryOver(e)}/>
                        <CLabel variant="custom-checkbox" htmlFor="schedule_carryover">Schedule Carry Over ?</CLabel>
                      </CFormGroup>
                      {LeaveAccumulation.errors.schedule_carryover ? <div className="help-block text-danger">{LeaveAccumulation.errors.schedule_carryover}</div> : null}
                    </div>
                    {
                      hsScheduleOverPer == 1 ? 
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Scheduled Date <span className='error'>*</span></label>
                          <SingleDatePicker
                            id={'schedule_date'}
                            date={dateEpfSt} // momentPropTypes.momentObj or null
                            onDateChange={(date) => handleEpfDate(date)} // PropTypes.func.isRequired
                            focused={focusEpfSt} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocusEpfSt(focused)} // PropTypes.func.isRequired
                            numberOfMonths={1}
                            displayFormat="DD-MM-YYYY"
                            //showClearDate={true}
                            isOutsideRange={() => false}
                            placeholder='Scheduled Date'
                            readOnly={true}
                            renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div>
                                  <select
                                    value={month.month()}
                                    onChange={(e) => onMonthSelect(month, e.target.value)}
                                  >
                                    {moment.months().map((label, value) => (
                                      <option value={value} key={`epf_start_date_${value}`}>{label}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                    {yearsDD('epf_start_date_')}
                                  </select>
                                </div>
                              </div>}
                          />
                          {LeaveAccumulation.errors.name ? <div className="help-block text-danger">{LeaveAccumulation.errors.name}</div> : null}
                        </div> : ''
                    }
                  </div> */}
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Cost Center <span className='error'>*</span></label>
                      <Select
                        isMulti={true}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Cost Center'}
                        // id="cost_center_ids"
                        name="cost_center_ids"
                        // value={ccenter}
                        options={costCenterOptions}
                        onChange={handleCostCenter}
                        onBlur={LeaveAccumulation.handleBlur}
                      />
                      {LeaveAccumulation.touched.cost_center_ids && LeaveAccumulation.errors.cost_center_ids ? <div className="help-block text-danger">{LeaveAccumulation.errors.cost_center_ids}</div> : null}
                    </div>
                    <div className="col-md-9">
                      <label htmlFor="hf-email">Employee </label>
                      <Select
                        isMulti={true}
                        ref={selectEmpRef}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose an Employee'}
                        // id="employee_ids"
                        name="employee_ids"
                        options={employeeOptions}
                        onChange={handleEmployees}
                        onBlur={LeaveAccumulation.handleBlur}
                        value={eempId}
                      />
                      {LeaveAccumulation.touched.employee_ids && LeaveAccumulation.errors.employee_ids ? <div className="help-block text-danger">{LeaveAccumulation.errors.employee_ids}</div> : null}
                    </div>
                  </div>
                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      {/* <CButton type="reset" size="md"  className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton> */}
                      <Link className='ml-3 btn btn-danger' to={'/leave/accumulation'}><CIcon name="cil-ban" /> Cancel</Link>
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

export default AddAccumulation