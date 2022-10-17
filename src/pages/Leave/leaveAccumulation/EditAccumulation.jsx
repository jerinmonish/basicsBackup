import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CostCenterDropDownList, LeaveTypesDropDownList, CommonCompanyIdBasedData } from '../../../actions/commonAction';
import { LeaveAccumulationUpdateData, LeaveAccumulationEditData, LeaveAccumulationStatusUpdateData } from '../../../actions/leave';
import CLoader from '../../loader/CLoader';
import { useFormik } from 'formik';
import Select from 'react-select';
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { indianDateFormat, convertDateToMDY, convertValueLabel, decryptSingleData, userLocalDecryptData } from '../../../utils/helper';
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditAccumulation = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const empData = userLocalDecryptData();
  const dropdownData = useSelector((state) => state.commonData)
  const leaveData = useSelector((state) => state.leaveBackend)

  const [carryOverMethodOptions, setCarryOverMethodOptions] = useState([{ value: 'balance', label: 'Carry Over Balance' }, { value: 'percentage', label: 'Carry Over a Percentage of Balance' }]);

  const [hsCarryOverPer, setHsCarryOverPer] = useState(0);
  const [hsLimitOverPer, setHsLimitOverPer] = useState(0);
  const [hsScheduleOverPer, setHsScheduleOverPer] = useState(0);

  const [carryOverName, setCarryOverName] = useState([]);
  const [carryOverTo, setCarryOverTo] = useState([]);
  const [carryOverMethodName, setCarryOverMethodName] = useState([]);
  const [checkboxstatus, setCheckboxStatus] = useState()

  const [ccenter, setCcenter] = useState([]);
  const [eempId, setEempId] = useState([]);
  const [costCenterOptions, setCostCenterOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const selectEmpRef = useRef();


  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }
  useEffect(() => {
    const sendGpparamsleave = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: '[["company_id", "in", [' + empData?.company_id + ']]]',
      },
    }
    dispatch(LeaveTypesDropDownList(sendGpparamsleave))
    dispatch(LeaveAccumulationEditData(decryptSingleData(props?.match?.params?.id)));
  }, [])

  useEffect(() => {
    dispatch(CostCenterDropDownList())
  }, [])

  useEffect(() => {
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

  useEffect(() => {
    setCostCenterOptions(dropdownData?.costCenterCommonData?.data?.result);
  }, [dropdownData?.costCenterCommonData?.data?.result])

  useEffect(() => {
    if (leaveData.leaveAccumulationDetails?.data !== null) {
      LeaveAccumulation.setValues({
        "name": leaveData.leaveAccumulationDetails?.data?.name,
        "carryover_percentage": leaveData.leaveAccumulationDetails?.data?.carryover_percentage,
        "carryover_days": leaveData.leaveAccumulationDetails?.data?.carryover_days,
        "source_leave_type_id": leaveData.leaveAccumulationDetails?.data?.source_leave_type_id,
        "dest_leave_type_id": leaveData.leaveAccumulationDetails?.data?.dest_leave_type_id,
        "carryover_method": leaveData.leaveAccumulationDetails?.data?.carryover_method,
        "limit_carryover": leaveData.leaveAccumulationDetails?.data?.limit_carryover,
        "cost_center_ids": leaveData.leaveAccumulationDetails?.data?.cost_center_ids,
        "employee_ids": leaveData.leaveAccumulationDetails?.data?.employee_ids
      });
    }
    if (leaveData.isLoading === false && leaveData.leaveAccumulationDetails?.data !== undefined && leaveData.leaveAccumulationDetails?.data !== null) {
      //Update values to all the dropdowns
      setCarryOverName(convertValueLabel(leaveData.leaveAccumulationDetails?.data?.source_leave_type_id, leaveData.leaveAccumulationDetails?.data?.source_leave_type_id_name));
      setCarryOverTo(convertValueLabel(leaveData.leaveAccumulationDetails?.data?.dest_leave_type_id, leaveData.leaveAccumulationDetails?.data?.dest_leave_type_id_name));
      setCarryOverMethodName(convertValueLabel(leaveData.leaveAccumulationDetails?.data?.carryover_method, leaveData.leaveAccumulationDetails?.data?.carryover_method_label));

      if (leaveData.leaveAccumulationDetails?.data?.carryover_method == 'percentage') {
        setHsCarryOverPer(1);
      }
      setCheckboxStatus(leaveData.leaveAccumulationDetails?.data?.limit_carryover)
      if (leaveData.leaveAccumulationDetails?.data?.limit_carryover == 1) {
        setHsLimitOverPer(1);
      }

      let getAllCCenter = [];
      leaveData.leaveAccumulationDetails?.data?.cost_center_ids_edit?.map((data, i) => (
        getAllCCenter.push({ 'value': data.value, 'label': data.label })
      ));
      setCcenter(getAllCCenter);

      let getAllEmpId = [];
      leaveData.leaveAccumulationDetails?.data?.employee_ids_edit?.map((data, i) => (
        getAllEmpId.push({ 'value': data.value, 'label': data.label })
      ));
      setEempId(getAllEmpId);
      setEmployeeOptions(leaveData.leaveAccumulationDetails?.data?.employee_ids_list);

      //Update values of all dates to particular date fields
      // setDateEpfSt(moment(new Date(convertDateToMDY(leaveData.leaveAccumulationDetails?.data?.carryover_days))));

    }
  }, [leaveData.isLoading, leaveData.leaveAccumulationDetails?.data])

  const [dateEpfSt, setDateEpfSt] = useState(null);
  const [focusEpfSt, setFocusEpfSt] = useState(false);

  //Group Add Form Initilization
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
      employee_ids: '',
      // schedule_carryover: '',
      // schedule_date: '',
    },
    validationSchema: Yup.object({
      name: Yup.mixed().required("This field is Required"),
      source_leave_type_id: Yup.string().required("This field is Required"),
      dest_leave_type_id: Yup.string().required("This field is Required"),
      cost_center_ids: Yup.array().required('This field is required'),
      // employee_ids: Yup.array().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": values } });
      dispatch(LeaveAccumulationUpdateData(decryptSingleData(props?.match?.params?.id), formData, history));
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
    if (e.value) {
      if (e.value == "percentage") {
        setHsCarryOverPer(1);
        LeaveAccumulation.setFieldValue('carryover_method', e.value)
      } else {
        setHsCarryOverPer(0);
        LeaveAccumulation.setFieldValue('carryover_method', e.value)
      }
      setCarryOverMethodName(convertValueLabel(e.value, e.label));
    }
  }

  const handleLimitCarryOver = (e) => {
    if (e.target.checked == true) {
      setHsLimitOverPer(1);
      setCheckboxStatus(1);
      LeaveAccumulation.setFieldValue('limit_carryover', 1);
    } else {
      setHsLimitOverPer(0);
      setCheckboxStatus(0);
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
    let groupList_f = [];
    e?.map((data, i) => (
      groupList.push({ 'value': data.value, 'label': data.label }),
      groupList_f.push(data.value)
    ));
    const sendGpparams = {
      params: {
        models: {
          "hr.employee": "[['cost_center_id', 'in', [" + groupList_f + "]]]"
        },
      },
    }
    dispatch(CommonCompanyIdBasedData(sendGpparams));
    LeaveAccumulation.setFieldValue('cost_center_ids', groupList_f);
    setCcenter(groupList)
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

  const updateFormAccStatus = (e) => {
    var url = '';
    if (e == "draft") {
      url = 'reset_to_draft';
    } else if (e == "done") {
      url = 'confirm_carryover';
    } else if (e == "cancel") {
      url = 'cancel_carryover';
    } else if (e == "generate_carry_over") {
      url = 'generate_carryover';
    } else if (e == "re_generate_carryover") {
      url = 're_generate_carryover';
    }
    if (url) {
      dispatch(LeaveAccumulationStatusUpdateData(decryptSingleData(props?.match?.params?.id), url, history))
    }
  }

  return (
    <main className="c-main">
      {
        (leaveData.isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <ToastContainer />
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong>Edit Carry Forward</strong>

                      <span style={{ marginRight: '115px' }} className="float-right">
                        {
                          ((leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_erp_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_executive") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_group_admin") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_md")) && leaveData.leaveAccumulationDetails?.data?.carryover_executed == false && leaveData.leaveAccumulationDetails?.data?.allocations_generated == false && leaveData.leaveAccumulationDetails?.data?.state == 'draft') ?
                            <button className="btn btn-sm btn-primary mr-1" onClick={() => updateFormAccStatus("generate_carry_over")}>Generate Carry Over</button> : ''
                        }

                        {
                          ((leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_erp_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_executive") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_group_admin") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_md")) && leaveData.leaveAccumulationDetails?.data?.allocations_generated == true && leaveData.leaveAccumulationDetails?.data?.state == 'draft') ? <button className="btn btn-sm btn-primary mr-1" onClick={() => updateFormAccStatus("re_generate_carryover")}>Re-Generate Carry Over</button> : ''
                        }

                        {
                          ((leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_erp_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_executive") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_group_admin") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_md")) && leaveData.leaveAccumulationDetails?.data?.carryover_executed == true && leaveData.leaveAccumulationDetails?.data?.state == 'draft') ? <button className="btn btn-sm btn-primary mr-1" onClick={() => updateFormAccStatus("done")}>Validate</button> : ''
                        }

                        {
                          ((leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_erp_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_executive") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_group_admin") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_md")) && leaveData.leaveAccumulationDetails?.data?.state == 'draft') ? <button className="btn btn-sm btn-primary mr-1" onClick={() => updateFormAccStatus("cancel")}>Cancel</button> : ''
                        }

                        {
                          ((leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_erp_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_executive") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_hr_manager") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_group_admin") || leaveData?.leaveAccumulationDetails?.data?.assigned_groups.includes("group_hris_md")) && leaveData.leaveAccumulationDetails?.data?.state != 'draft' && leaveData.leaveAccumulationDetails?.data?.state != 'scheduled') ? <button className="btn btn-sm btn-primary mr-1" onClick={() => updateFormAccStatus("draft")}>Reset to Draft</button> : ''
                        }
                      </span>
                    </CCol>
                    {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                    <Link className='btn btn-primary' to={'company'}>List Company</Link>
                  </CCol> */}
                  </CRow>
                </CCardHeader>
                {
                  (leaveData.leaveAccumulationDetails?.data?.state_label == "Draft") ?
                    <div className="ribbon ribbon-top-right">
                      <span style={{ backgroundColor: '#eac53e' }}>{leaveData.leaveAccumulationDetails?.data?.state_label}</span>
                    </div> : ''
                }
                {
                  (leaveData.leaveAccumulationDetails?.data?.state_label == "Scheduled") ?
                    <div className="ribbon ribbon-top-right">
                      <span style={{ backgroundColor: '#eac53e' }}>{leaveData.leaveAccumulationDetails?.data?.state_label}</span>
                    </div> : ''
                }
                {
                  (leaveData.leaveAccumulationDetails?.data?.state_label == "Done") ?
                    <div className="ribbon ribbon-top-right">
                      <span style={{ backgroundColor: '#2eb85c' }}>{leaveData.leaveAccumulationDetails?.data?.state_label}</span>
                    </div> : ''
                }
                {
                  (leaveData.leaveAccumulationDetails?.data?.state_label == "Cancelled") ?
                    <div className="ribbon ribbon-top-right">
                      <span style={{ backgroundColor: '#e55353ab' }}>{leaveData.leaveAccumulationDetails?.data?.state_label}</span>
                    </div> : ''
                }
                <CCardBody>
                  <CForm onSubmit={LeaveAccumulation.handleSubmit} className="form-horizontal">
                    <div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Title <span className='error'>*</span></label>
                          <input type="text" name='name' value={LeaveAccumulation.values.name} className="form-control" placeholder='Title' maxLength={25} onChange={LeaveAccumulation.handleChange} />
                          {LeaveAccumulation.errors.name ? <div className="help-block text-danger">{LeaveAccumulation.errors.name}</div> : null}
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
                            onChange={(e) => handleCarryOverFrom(e)}
                          />
                          {LeaveAccumulation.errors.source_leave_type_id ? <div className="help-block text-danger">{LeaveAccumulation.errors.source_leave_type_id}</div> : null}
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
                            onChange={(e) => handleCarryOverTo(e)}
                          />
                          {LeaveAccumulation.errors.dest_leave_type_id ? <div className="help-block text-danger">{LeaveAccumulation.errors.dest_leave_type_id}</div> : null}
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email">Carry Over Method <span className='error'>*</span></label>
                          <Select
                            value={carryOverMethodName}
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={""}
                            name="carryover_method"
                            options={carryOverMethodOptions}
                            placeholder={'Choose a Carry Over Method'}
                            onChange={(e) => handleCarryOverMethod(e)}
                          />
                          {LeaveAccumulation.errors.carryover_method ? <div className="help-block text-danger">{LeaveAccumulation.errors.carryover_method}</div> : null}
                        </div>
                        {
                          hsCarryOverPer == 1 ?
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Carry Over Percentage % <span className='error'>*</span></label>
                              <input type="text" name='carryover_percentage' value={LeaveAccumulation.values.carryover_percentage} className="form-control" placeholder='Carry Over Percentage %' maxLength={3} onChange={LeaveAccumulation.handleChange} />
                              {LeaveAccumulation.errors.carryover_percentage ? <div className="help-block text-danger">{LeaveAccumulation.errors.carryover_percentage}</div> : null}
                            </div> : ''
                        }
                        <div className="col-md-2">
                          <CFormGroup variant="custom-checkbox" inline id='accumulation_add_leave'>
                            <CInputCheckbox custom id="limit_carryover" name="limit_carryover" onChange={(e) => handleLimitCarryOver(e)} checked={checkboxstatus == true ? true : false} />
                            <CLabel variant="custom-checkbox" htmlFor="limit_carryover">Limit Carry Over</CLabel>
                          </CFormGroup>
                          {LeaveAccumulation.errors.limit_carryover ? <div className="help-block text-danger">{LeaveAccumulation.errors.limit_carryover}</div> : null}
                        </div>
                        {
                          hsLimitOverPer == 1 ?
                            <div className="col-md-3">
                              <label htmlFor="hf-email">Max Days to Carry Over <span className='error'>*</span></label>
                              <input type="text" name='carryover_days' value={LeaveAccumulation.values.carryover_days} className="form-control" placeholder='Max Days to Carry Over' maxLength={3} onChange={LeaveAccumulation.handleChange} />
                              {LeaveAccumulation.errors.carryover_days ? <div className="help-block text-danger">{LeaveAccumulation.errors.carryover_days}</div> : null}
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
                            id="cost_center_ids"
                            name="cost_center_ids"
                            value={ccenter}
                            options={costCenterOptions}
                            onChange={handleCostCenter}
                            onBlur={LeaveAccumulation.handleBlur}
                          />
                          {LeaveAccumulation.errors.cost_center_ids ? <div className="help-block text-danger">{LeaveAccumulation.errors.cost_center_ids}</div> : null}
                        </div>
                        <div className="col-md-9">
                          <label htmlFor="hf-email">Employee <span className='error'>*</span></label>
                          <Select
                            isMulti={true}
                            ref={selectEmpRef}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose an Employee'}
                            id="employee_ids"
                            name="employee_ids"
                            value={eempId}
                            options={employeeOptions}
                            onChange={handleEmployees}
                            onBlur={LeaveAccumulation.handleBlur}
                          />
                          {LeaveAccumulation.errors.employee_ids ? <div className="help-block text-danger">{LeaveAccumulation.errors.employee_ids}</div> : null}
                        </div>
                      </div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className='col-md-10' align="center" >
                          <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
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
      }
    </main>
  )
}

export default EditAccumulation