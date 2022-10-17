import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, CommonMainTypesDropdown } from '../../../actions/commonAction'
import { LeaveTypesEditAPI, LeaveTypesUpdateAPI } from '../../../actions/leave'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
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
import { decryptSingleData, indianDateFormat, convertValueLabel, convertDateToMDY } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import CLoader from 'src/pages/loader/CLoader'

const EditLeaveTypes = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dropdownData = useSelector((state) => state.commonData)
    const { leaveTypesEditDetails, isLoading } = useSelector(state => state.leaveBackend);
    // console.log("dropdownData",dropdownData);
    //To load dropdown predefined data
    // useEffect(() => {
    //     dispatch(CompanyDropDownList())

    // }, [])

    // console.log("dropdown", dropdownData);
    useEffect(() => {
        // dispatch(CompanyDropDownList());
        dispatch(CommonGroupList())
        dispatch(CommonMainTypesDropdown())
        if (props?.match?.params?.id) {
            dispatch(LeaveTypesEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, []);

    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [focusOfInc, setFocusOfInc] = useState(false);
    const [focusOfTo, setFocusOfTo] = useState(false);

    // _isValid

    // console.log("date", dateFrom?._isValid);
    //To load years
    const yearsDD = (mrs = false) => {
        let years = []
        for (let i = moment().year(); i <= moment().year() + 30; i++) {
            years.push(<option value={i} key={mrs + i}>{i}</option>);
        }
        return years;
    }

    const [groupChanged, setGroupChanged] = useState(0);
    const mainTypesOptions = dropdownData?.mainTypeCommonData?.data?.result
    // to load the option data for dropdown
    const groupOptions = dropdownData?.groupComData?.data?.result
    const [companyOptions, setCompanyOptions] = useState([]);
    const handleDateOfInc = (date) => {
        if (date) {
            setTodateChange(date)
            setDateFrom(date)
            leaveTypesEditFormik.setFieldValue('validity_start', indianDateFormat(date._d));
        }
    }

    const handleDateTo = (date) => {
        if (date) {
            setDateTo(date)
            leaveTypesEditFormik.setFieldValue('validity_stop', indianDateFormat(date._d));
        }
    }
    const selectCompanyRef = useRef()
    const selectLocationRef = useRef()
    const selectFunctionRef = useRef()
    const selectJobRef = useRef()


    const onCompanyClear = () => {
        selectCompanyRef.current.select.clearValue()
    }


    useEffect(() => {
        if (dropdownData?.companyCommonData?.data?.result) {
            // console.log("dropdownData?.companyCommonData?.data", dropdownData);
            setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
        } else if (leaveTypesEditDetails?.data?.company_id_list) {
            setCompanyOptions(leaveTypesEditDetails?.data?.company_id_list)
        }
    }, [dropdownData?.companyCommonData?.data?.result, leaveTypesEditDetails?.data?.company_id_list])

    // useEffect(() => {
    //     if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
    //         setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
    //         // setLocationChanged(convertValueLabel([]));
    //     }
    // }, [dropdownData?.companyCommonData?.data?.result, groupChanged])


    //when onchange
    // const handleGroupChange = (value) => {
    //     leaveTypesEditFormik.setFieldValue('group_id', value.value);
    //     setSelectGroupName(convertValueLabel(value.value, value.label))
    // }

    const handleGroupChange = (e) => {
        setSelectCompanyName([]);
        if (e?.value) {
            const sendGpparams = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    filter: '[("group_id", "=", ' + e.value + ')]'
                },
            }
            dispatch(CompanyDropDownList(sendGpparams))
            setSelectGroupName(convertValueLabel(e.value, e.label))
            leaveTypesEditFormik.setFieldValue('group_id', e.value)
            setGroupChanged(1);
        }
    }

    const handleCompanyChange = (e) => {
        if (e?.value) {

            // dispatch(LocationDropDownList(sendGpparams))

            leaveTypesEditFormik.setFieldValue('company_id', e?.value)
            setSelectCompanyName(convertValueLabel(e?.value, e?.label))

        }
    }

    // const handleMode = (e) => {
    //     if (e) {
    //         leaveTypesEditFormik.setFieldValue('allocation_type', e?.value);
    //         setMode(convertValueLabel(e.value, e.label));
    //     }
    // }

    const handleApproval = (e) => {
        if (e) {
            leaveTypesEditFormik.setFieldValue('leave_validation_type', e?.value);
            setApproval(convertValueLabel(e.value, e.label));
        }
    }

    const handleTakeLeave = (e) => {
        if (e) {
            leaveTypesEditFormik.setFieldValue('request_unit', e?.value);
            setTakeLeave(convertValueLabel(e.value, e.label));
        }
    }

    const [copyMainType, setCopyMainType] = useState({});
    const [copyMainTypeCode, setCopyMainTypeCode] = useState({});
    const [copyMainTypeMode, setCopyMainTypeMode] = useState([]);
    const [copyMainTypeApproval, setCopyMainTypeApproval] = useState([]);
    const [copyMainfixed, setCopyMainfixed] = useState([]);
    const [copyMaincondition, setCopyMaincondition] = useState([]);

    // leave_validation_type
    const handleMainTypes = (e) => {

        console.log("e", e);

        // setSelectMainType([''])
        // setCopyMainType('')
        // setCopyMainTypeCode('')
        // main_type_label
        setCopyMainType(e.label)
        setCopyMainTypeCode(e.code)
        setCopyMainTypeMode(e.main_type_label)
        setCopyMainTypeApproval(e.main_validation_type_label)
        setCopyMainfixed(e.main_type)
        setCopyMaincondition(e.main_validation_type)

        if (e) {
            leaveTypesEditFormik.setFieldValue('leave_main_id', e?.value);
            setSelectMainType(convertValueLabel(e.value, e.label));
        }

    }

    const handleColorCode = (e) => {
        if (e) {
            leaveTypesEditFormik.setFieldValue('color_name', e?.value);
            setSelectedColor(convertValueLabel(e.value, e.label));
        }
    }
    // console.log('leave_validation_type', copyMaincondition);

    //dropdown 
    const [mode, setMode] = useState([]);
    const [approval, setApproval] = useState([]);
    const [takeLeave, setTakeLeave] = useState([]);
    // to load the select data
    const [maintypesCommon, setMainTypescommon] = useState([]);
    // const [modeOptions, setModeOptions] = useState([{ value: 'no', label: 'No Limit' }, { value: 'fixed_allocation', label: 'Allow Employees Requests' }, { value: 'fixed', label: 'Set by Leave Officer' }]);
    // const [approvalOptions, setApprovalOptions] = useState([{ value: 'no_validation', label: 'No Validation' }, { value: 'hr', label: 'By Leave Officer' }, { value: 'manager', label: 'By Employees Manager' }, { value: 'both', label: 'By Employees Manager and Leave Officer' }]);

    const [colorCodeOption, setColorCodeOption] = useState([{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }, { value: 'lightgreen', label: 'Light Green' }, { value: 'lightblue', label: 'Light Blue' }, { value: 'lightyellow', label: 'Light Yellow' }, { value: 'magenta', label: 'Magenta' }, { value: 'lightcyan', label: 'Light Cyan' }, { value: 'black', label: 'Black' }, { value: 'lightpink', label: 'Light Pink' }, { value: 'brown', label: 'Brown' }, { value: 'violet', label: 'Violet' }, { value: 'lightcoral', label: 'Light Coral' }, { value: 'lightsalmon', label: 'Light Salmon' }, { value: 'lavender', label: 'Lavender' }, { value: 'wheat', label: 'Wheat' }, { value: 'ivory', label: 'Ivory' }]);
    const [takeLeaveOptions, setTakeLeaveOptions] = useState([{ value: 'day', label: 'Day' }, { value: 'half_day', label: 'Half Day' }, { value: 'hour', label: 'Hours' }]);

    // console.log("roleOptions",dropdownData?.roleCommonData);
    //Designation Add Form Initilization
    const leaveTypesEditFormik = useFormik({
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
            group_id: Yup.string().required('This field is required'),
            company_id: Yup.string().required('This field is required'),
            name: Yup.string().required('This field is required'),
            //   request_unit: Yup.string().required('This field is required'),
            //   validity_start: Yup.string().required('This field is required'),
            //   validity_stop: Yup.string().required('This field is required'),
            //   allocation_type: Yup.string().required('This field is required'),
            //   leave_validation_type: Yup.string().required('This field is required'),

        }),
        onSubmit: (values) => {
            values.name = copyMainType
            values.code = copyMainTypeCode
            values.allocation_type = copyMainfixed
            values.leave_validation_type = copyMaincondition
            const formData = JSON.stringify({ params: { data: values } })
            dispatch(LeaveTypesUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
            // console.log("formdata", formData);
        },
    })

    //for update 

    const [selectGroupName, setSelectGroupName] = useState({});
    const [selectCompanyName, setSelectCompanyName] = useState({});
    const [todateChange, setTodateChange] = useState([]);
    const [selectMainType, setSelectMainType] = useState({});
    const [selectedColor, setSelectedColor] = useState([]);

    const handleMainChanges = (e) => {
        // console.log("e", e);
        if (e) {
            setCopyMainType(e)
        }


    }
    // validity_start
    // _isValid

    // "epf_start_date":indianDateFormat(companyDetails?.data?.epf_start_date),
    useEffect(() => {
        if (leaveTypesEditDetails?.data !== null) {
            // console.log("leavetypes=", leaveTypesEditDetails?.data);
            leaveTypesEditFormik.setValues({
                "group_id": leaveTypesEditDetails?.group_id,
                "company_id": leaveTypesEditDetails?.company_id,
                "name": leaveTypesEditDetails?.data?.name,
                "code": leaveTypesEditDetails?.data?.code,
                "color_name": leaveTypesEditDetails?.data?.color_name,
                "leave_main_id": leaveTypesEditDetails?.data?.leave_main_id,
                "request_unit": leaveTypesEditDetails?.data?.request_unit,
                "validity_start": indianDateFormat(leaveTypesEditDetails?.data?.validity_start),
                // "validity_start": indianDateFormat(leaveTypesEditDetails?.data?.validity_start === undefined ? null : leaveTypesEditDetails?.data?.validity_start),
                "validity_stop": indianDateFormat(leaveTypesEditDetails?.data?.validity_stop),
                "allocation_type": leaveTypesEditDetails?.allocation_type,
                "leave_validation_type": leaveTypesEditDetails?.leave_validation_type,
            });
        }
        if (leaveTypesEditDetails?.data !== undefined && leaveTypesEditDetails?.data !== null) {

            setSelectGroupName(convertValueLabel(leaveTypesEditDetails?.data?.group_id, leaveTypesEditDetails?.data?.group_id_name));
            setSelectCompanyName(convertValueLabel(leaveTypesEditDetails?.data?.company_id, leaveTypesEditDetails?.data?.company_id_name));
            setCopyMainTypeMode(leaveTypesEditDetails?.data?.allocation_type_label);
            setSelectMainType(convertValueLabel(leaveTypesEditDetails?.data?.leave_main_id, leaveTypesEditDetails?.data?.leave_main_id_name));
            setCopyMainTypeApproval(leaveTypesEditDetails?.data?.leave_validation_type_label);
            setTakeLeave(convertValueLabel(leaveTypesEditDetails?.data?.request_unit, leaveTypesEditDetails?.data?.request_unit_label));
            setCopyMainType(leaveTypesEditDetails?.data?.name);
            setSelectedColor(convertValueLabel(leaveTypesEditDetails?.data?.color_name, leaveTypesEditDetails?.data?.color_name_label))
            setCopyMainTypeCode(leaveTypesEditDetails?.data?.code);
            setDateFrom(moment(new Date(convertDateToMDY(leaveTypesEditDetails?.data?.validity_start))));
            // setDateFrom(moment(new Date(convertDateToMDY(leaveTypesEditDetails?.data?.validity_start === undefined && leaveTypesEditDetails?.data?.validity_start === '' ? null : leaveTypesEditDetails?.data?.validity_start))));
            setDateTo(moment(new Date(convertDateToMDY(leaveTypesEditDetails?.data?.validity_stop))));
        }
    }, [isLoading, leaveTypesEditDetails?.data])

    return (
        <main className="c-main">
            {isLoading === true ? (
                <CLoader />
            ) : (
                <CFade>
                    <CContainer fluid>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol col="6" className="left">
                                        <strong> Edit Leave Types</strong>
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>
                                <CForm onSubmit={leaveTypesEditFormik.handleSubmit} className="form-horizontal">
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
                                                    value={selectMainType}
                                                    name="leave_main_id"
                                                    options={mainTypesOptions}
                                                    onChange={(e) => handleMainTypes(e)}
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                />

                                                {leaveTypesEditFormik.touched.leave_main_id && leaveTypesEditFormik.errors.leave_main_id ? (<div className="help-block text-danger">{leaveTypesEditFormik.errors.leave_main_id}
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
                                                    value={copyMainType}
                                                    // value={leaveTypesEditFormik.values.id}
                                                    className="form-control"
                                                    placeholder=" Leave Type Name"
                                                    maxLength={25}
                                                    // onChange={leaveTypesEditFormik.handleChange}
                                                    onChange={event => handleMainChanges(event.target.value)}
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                />
                                                {leaveTypesEditFormik.touched.name && leaveTypesEditFormik.errors.name ? (<div className="help-block text-danger">{leaveTypesEditFormik.errors.name}
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
                                                    // value={leaveTypesEditFormik.values.code}
                                                    value={copyMainTypeCode}
                                                    className="form-control"
                                                    placeholder="Code"
                                                    maxLength={25}
                                                    onChange={leaveTypesEditFormik.handleChange}
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                />

                                                {leaveTypesEditFormik.touched.code && leaveTypesEditFormik.errors.code ? (<div className="help-block text-danger">{leaveTypesEditFormik.errors.code}
                                                </div>
                                                ) : null}
                                            </div>

                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    Color
                                                </label>
                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    placeholder={'Choose a Color'}
                                                    name="color_name"
                                                    value={selectedColor}
                                                    // value={leaveTypesEditFormik.values.color_name}
                                                    options={colorCodeOption}
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                    onChange={(e) => handleColorCode(e)}
                                                // onChange={({ value }) => LeaveTypesAddFormik.setFieldValue('group_id', value)}
                                                />

                                                {leaveTypesEditFormik.touched.color_name && leaveTypesEditFormik.errors.color_name ? (<div className="help-block text-danger">{leaveTypesEditFormik.errors.color_name}
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
                                                    value={selectGroupName}
                                                    name="group_id"
                                                    options={groupOptions}
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                    onChange={(e) => handleGroupChange(e)}
                                                // onChange={({ value }) => leaveTypesEditFormik.setFieldValue('group_id', value)}
                                                />
                                                {leaveTypesEditFormik.touched.group_id &&
                                                    leaveTypesEditFormik.errors.group_id ? (
                                                    <div className="help-block text-danger">
                                                        {leaveTypesEditFormik.errors.group_id}
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
                                                    value={selectCompanyName}
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                    onChange={(e) => handleCompanyChange(e)}

                                                // onChange={({ value }) => leaveTypesEditFormik.setFieldValue('company_id', value)}
                                                />
                                                {leaveTypesEditFormik.touched.company_id &&
                                                    leaveTypesEditFormik.errors.company_id ? (
                                                    <div className="help-block text-danger">
                                                        {leaveTypesEditFormik.errors.company_id}
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
                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                />

                                                {leaveTypesEditFormik.touched.request_unit && leaveTypesEditFormik.errors.request_unit ? (<div className="help-block text-danger">{leaveTypesEditFormik.errors.request_unit}
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

                                                                    // {
                                                                    // ...(() => {
                                                                    //     if (dateFrom === '') {

                                                                    //         date = ''
                                                                    //     }

                                                                    // })()
                                                                    // }


                                                                    // {
                                                                    // dateFrom ? dat
                                                                    // }

                                                                    // {
                                                                    // dateFrom ?
                                                                    // }
                                                                    // dateFrom 

                                                                    date={dateFrom?._isValid == false ? null : dateFrom} // momentPropTypes.momentObj or null

                                                                    onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                                                    focused={focusOfInc} // PropTypes.bool
                                                                    onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                                                    numberOfMonths={1}
                                                                    displayFormat="DD-MM-YYYY"
                                                                    //showClearDate={true}
                                                                    isOutsideRange={d => d.isSame()}
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
                                                                {leaveTypesEditFormik.touched.group_id &&
                                                                    leaveTypesEditFormik.errors.group_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {leaveTypesEditFormik.errors.group_id}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="hf-email">
                                                                    To
                                                                </label>

                                                                <SingleDatePicker
                                                                    id={'validity_stop'}
                                                                    date={dateTo?._isValid == false ? null : dateTo}
                                                                    // date={dateTo ? dateTo : ''} // momentPropTypes.momentObj or null
                                                                    onDateChange={(date) => handleDateTo(date)} // PropTypes.func.isRequired
                                                                    focused={focusOfTo} // PropTypes.bool
                                                                    onFocusChange={({ focused }) => setFocusOfTo(focused)} // PropTypes.func.isRequired
                                                                    numberOfMonths={1}
                                                                    displayFormat="DD-MM-YYYY"
                                                                    //showClearDate={true}
                                                                    // isOutsideRange={d => d.isBefore()}
                                                                    // isOutsideRange={d => d.isBefore(moment(todateChange))}
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

                                                                {leaveTypesEditFormik.touched.group_id &&
                                                                    leaveTypesEditFormik.errors.group_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {leaveTypesEditFormik.errors.group_id}
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
                                                                    placeholder=" Choose a Mode"
                                                                    maxLength={25}
                                                                    onChange={leaveTypesEditFormik.handleChange}
                                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                                />
                                                                {/* <Select
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a Mode'}
                                                                    value={mode}
                                                                    name="allocation_type"
                                                                    options={modeOptions}
                                                                    onChange={(e) => handleMode(e)}
                                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                                /> */}
                                                                {/* {onChange = {({ value }) => leaveTypesEditFormik.setFieldValue('allocation_type', value)} } */}

                                                                {leaveTypesEditFormik.touched.allocation_type &&
                                                                    leaveTypesEditFormik.errors.allocation_type ? (
                                                                    <div className="help-block text-danger">
                                                                        {leaveTypesEditFormik.errors.allocation_type}
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
                                                                    placeholder=" Choose a  Approval Condition"
                                                                    maxLength={25}
                                                                    onChange={leaveTypesEditFormik.handleChange}
                                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                                />
                                                                {/* <Select
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Approval Condition'}
                                                                    value={approval}
                                                                    name="leave_validation_type"
                                                                    options={approvalOptions}
                                                                    onChange={(e) => handleApproval(e)}
                                                                    onBlur={leaveTypesEditFormik.handleBlur}
                                                                /> */}

                                                                {leaveTypesEditFormik.touched.leave_validation_type &&
                                                                    leaveTypesEditFormik.errors.leave_validation_type ? (
                                                                    <div className="help-block text-danger">
                                                                        {leaveTypesEditFormik.errors.leave_validation_type}
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
                                                    <CIcon name="cil-scrubber" /> Update
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
            )}
        </main>
    )
}

export default EditLeaveTypes
