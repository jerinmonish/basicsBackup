import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LeaveTypesDropDownList, FunctionDropDownList, HREmployeeDropDownList, LocationDropDownList, CommonRemainingDropdown } from '../../../actions/commonAction'
import { LeaveRequestAddAPI } from '../../../actions/leave'
import { useFormik } from 'formik'
import Select from 'react-select'
import CryptoJS from "crypto-js";
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
    CSelect,
    CTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { decryptSingleData, indianDateFormat, convertValueLabel } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { date } from 'yup/lib/locale'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddLeaveRequest = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const dropdownData = useSelector((state) => state.commonData)
    // console.log("dropdownData",dropdownData);
    //To load dropdown predefined data


    // local storage

    const [getdata, setGetdata] = useState([]);
    const [getgroupData, setgetGroupData] = useState();
    const [getCompyData, setgetCompanyData] = useState();
    const [getLocationData, setgetLocationData] = useState();
    const [getFunctionData, setgetFunctionData] = useState();
    const [getEmpData, setgetEmpData] = useState();


    // console.log("dropdownData", dropdownData);

    useEffect(() => {
        let Udata = localStorage.getItem('udata');
        const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
        const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
        // console.log("byts", udetails);
        // setgetCompanyData(udetails)
        setgetGroupData(udetails.group_id)
        setgetCompanyData(udetails.company_id)
        setgetLocationData(udetails.location_id)
        setgetFunctionData(udetails.department_id)
        // setgetSubFunctionData(udetails.sub_function_id)
        setgetEmpData(udetails.employee_id)
        setGetdata(udetails.level[0])


        if (getdata === 'User') {

            const sendGpparamsleave = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                    filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + udetails.company_id + ']]]',
                },
            }
            dispatch(LeaveTypesDropDownList(sendGpparamsleave))
        }


        // const sendGpparamsleave = {
        //     params: {
        //         query: '{id,name}',
        //         isDropdown: 1,
        //         // filter: '[("mode_company_id", "=", ' + e.value + ')]'
        //         filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + udetails.company_id + ']]]',
        //     },
        // }
        // dispatch(LeaveTypesDropDownList(sendGpparamsleave))

        dispatch(CommonRemainingDropdown(udetails.employee_id))

    }, [])

    useEffect(() => {
        dispatch(CommonGroupList())

    }, [])



    // "first_half - First Half
    // second_half - Second Half"

    //dropdown 
    const [mode, setMode] = useState();
    const [modeOptions, setModeOptions] = useState([{ value: 'employee', label: 'By Employee' }]);
    // const [modeOptions, setModeOptions] = useState([{ value: 'employee', label: 'By Employee' }, { value: 'company', label: 'By Company' }, { value: 'department', label: 'By Function' }, { value: 'location', label: 'By Location' }]);

    useEffect(() => {
        // setMode('employee')
        setMode(convertValueLabel('employee', 'By Employee'))
    }, [])


    const [compyStatus, setCompyStatus] = useState('employee');


    const [toHalf, setToHalf] = useState();
    const [toHalfOptions, setToHalfOptions] = useState([{ value: 'first_half', label: 'First Half' }, { value: 'second_half', label: 'Second Half' }]);
    // const [colorCodeOption, setColorCodeOption] = useState([{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }, { value: 'lightgreen', label: 'Light Green' }, { value: 'lightblue', label: 'Light Blue' }, { value: 'lightblue', label: 'Light Blue' }, { value: 'lightyellow', label: 'Light Yellow' }, { value: 'magenta', label: 'Magenta' }, { value: 'lightcyan', label: 'Light Cyan' }, { value: 'black', label: 'Black' }, { value: 'lightpink', label: 'Light Pink' }, { value: 'brown', label: 'Brown' }, { value: 'violet', label: 'Violet' }, { value: 'lightcoral', label: 'Light Coral' }, { value: 'lightsalmon', label: 'Light Salmon' }, { value: 'lavender', label: 'Lavender' }, { value: 'wheat', label: 'Wheat' }, { value: 'ivory', label: 'Ivory' }]);
    const [fromHalf, setFromHalf] = useState();
    const [fromHalfOptions, setFromHalfOptions] = useState([{ value: 'first_half', label: 'First Half' }, { value: 'second_half', label: 'Second Half' }]);


    const [fromHalfdate, setFromHalfDate] = useState([]);
    const [toHalfdate, setToHalfDate] = useState([]);
    const [fromHalfText, setFromHalfText] = useState([]);
    const [toHalftext, setToHalfText] = useState([]);

    const datepik = (f1, f2, t1, t2) => {
        let fromDate = f1 ? indianDateFormat(f1._d) : '';
        let toDate = t1 ? indianDateFormat(t1._d) : '';
        if (f1 && t1 && f2 && t2) {
            let fValue1 = t1?.diff(f1, 'days') + 1;
            if (f2 == "first_half" && t2 == "first_half") {
                fValue1 = fValue1 - 0.5
            } else if (f2 == "second_half" && t2 == "first_half") {
                fValue1 = fValue1 - 1
            } else if (f2 == "second_half" && t2 == "second_half") {
                fValue1 = fValue1 - 0.5
            }

            if (fValue1 == 0) {
                setDateFrom('')
                setFromHalf('')
                setDateTo('')
                setToHalf(0)
                toast.error('Duration must not be zero !', { position: toast.POSITION.TOP_RIGHT })
                LeaveRequestAddFormik.setFieldValue('number_of_days', '');

            } else {
                LeaveRequestAddFormik.setFieldValue('number_of_days', fValue1);
            }
        }
    }

    const handleFromHalf = (e) => {
        // setCompyStatus(e?.value)
        // setToHalf('')
        // setToHalfText('')

        var cal = 0.0;
        var myval = 0.0;

        setFromHalfText(e.value)
        if (e) {
            LeaveRequestAddFormik.setFieldValue('from_half', e?.value);
            setFromHalf(convertValueLabel(e.value, e.label));
            datepik(dateFrom, e.value, dateTo, toHalftext);
        }

        if ((fromHalfdate <= toHalfdate) && (e.value == 'first_half') && (toHalftext == 'first_half')) {

            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 0.5
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (toHalftext == 'second_half') && (e.value == 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 0.5
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (toHalftext === 'first_half') && (e.value === 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 1.0
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (fromHalfText === 'first_half') && (e.value === 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 1.0
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (e.value === 'first_half') && (fromHalfText === 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 1.0
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }


    }


    const handleToHalf = (e) => {
        // setCompyStatus(e?.value)
        var cal = 0.0;
        var myval = 0.0;
        setToHalfText(e.value)
        if (e) {
            LeaveRequestAddFormik.setFieldValue('to_half', e?.value);
            setToHalf(convertValueLabel(e.value, e.label));
            datepik(dateFrom, fromHalfText, dateTo, e.value);
        }

        // console.log("tohalf", toHalftext);
        // console.log("from", fromHalfText);
        // console.log("to", toHalf);

        if ((fromHalfdate <= toHalfdate) && (fromHalfText == 'first_half') && (e.value == 'first_half')) {

            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 0.5
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (fromHalfText == 'second_half') && (e.value == 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 0.5
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (fromHalfText === 'first_half') && (e.value === 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 1.0
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }
        else if ((fromHalfdate <= toHalfdate) && (e.value === 'first_half') && (fromHalfText === 'second_half')) {
            cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
            // console.log("cal", cal.toFixed(1));
            myval = cal + 1.0
            //LeaveRequestAddFormik.setFieldValue('number_of_days', myval);
        }

    }

    const handleMode = (e) => {
        setCompyStatus(e?.value)
        if (e) {
            LeaveRequestAddFormik.setFieldValue('holiday_type', e?.value);
            setMode(convertValueLabel(e.value, e.label));
        }
    }
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
    const [locationChanged, setLocationChanged] = useState(0);

    const [functionChanged, setFunctionChanged] = useState(0);


    // to load the option data for dropdown
    const groupOptions = dropdownData?.groupComData?.data?.result
    const leaveTypeOptions = dropdownData?.leaveTypesCommonData?.data?.result
    // console.log("dropdownData", dropdownData);
    const reMainingDaysOptions = dropdownData?.reMainginCommonData
    const [companyOptions, setCompanyOptions] = useState([]);
    const [functionOptions, setFunctionOptions] = useState([]);
    const [remainingOptions, setRemainingOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);

    const [todateChange, setTodateChange] = useState([]);

    const handleDateOfInc = (fromdate) => {

        setFromHalf('')
        setToHalf('')

        // console.log("date from", fromdate._d);

        setFromHalfDate(fromdate._d)
        setTodateChange(fromdate)

        if (fromdate) {
            setDateFrom(fromdate)
            LeaveRequestAddFormik.setFieldValue('request_date_from', indianDateFormat(fromdate._d));
            datepik(fromdate, fromHalfText, dateTo, toHalftext);
        }
    }

    const handleDateTo = (date) => {
        // console.log("date to", date._d);
        setToHalfDate(date._d)

        if (date) {
            setDateTo(date)
            LeaveRequestAddFormik.setFieldValue('request_date_to', indianDateFormat(date._d));
            datepik(dateFrom, fromHalfText, date, toHalftext);
        }
    }


    const selectCompanyRef = useRef()
    const selectLocationRef = useRef()
    const selectFunctionRef = useRef()
    const selectEmployeeRef = useRef()

    const onCompanyClear = () => {
        selectCompanyRef?.current?.select.clearValue()
    }


    const onLocationClear = () => {
        selectLocationRef?.current?.select.clearValue()
    }

    const onFunctionClear = () => {
        selectFunctionRef?.current?.select.clearValue()
    }

    const onEmployeeClear = () => {
        selectEmployeeRef?.current?.select.clearValue()
    }



    useEffect(() => {
        if (dropdownData?.reMainginCommonData?.data?.result) {
            setRemainingOptions(dropdownData?.reMainginCommonData?.data?.result);
        }
    }, [dropdownData?.reMainginCommonData?.data?.result])


    useEffect(() => {
        if (dropdownData?.companyCommonData?.data?.result && groupChanged === 1) {
            setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
        }
    }, [dropdownData?.companyCommonData?.data?.result, groupChanged])

    useEffect(() => {
        // console.log("dropdownData?.functionCommonData?", dropdownData);
        if (dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
            // setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
            setLocationOptions(dropdownData?.locationCommonData?.data?.result)
        }
    }, [dropdownData?.locationCommonData?.data?.result, companyChanged])


    useEffect(() => {
        // console.log("dropdownData?.functionCommonData?", dropdownData);
        if (dropdownData?.functionCommonData?.data?.result && locationChanged === 1) {
            // setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
            setFunctionOptions(dropdownData?.functionCommonData?.data?.result)
        }
    }, [dropdownData?.functionCommonData?.data?.result, locationChanged])




    useEffect(() => {
        // console.log("dropdownData?.functionCommonData?", dropdownData);
        if (dropdownData?.hrEmployeeCommonData?.data?.result && functionChanged === 1) {
            setEmployeeOptions(dropdownData?.hrEmployeeCommonData?.data?.result);
        }
    }, [dropdownData?.hrEmployeeCommonData?.data?.result, functionChanged])



    // hrEmployeeCommonData
    //when onchange

    const handleGroupChange = (e) => {

        // onCompanyClear(['']);
        // onLocationClear();
        // onFunctionClear();
        // onEmployeeClear();
        // setgetGroupData([''])
        if (e?.value) {

            const sendGpparams = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    filter: '[("group_id", "=", ' + e.value + ')]'
                },
            }
            dispatch(CompanyDropDownList(sendGpparams))
            LeaveRequestAddFormik.setFieldValue('group_id', e.value)
            onCompanyClear();
            onLocationClear();
            onFunctionClear();
            setGroupChanged(1);
            // onCompanyClear(['']);
            // onLocationClear(['']);
            // onFunctionClear(['']);
            // onEmployeeClear(['']);
            //  setSubfunctionOptions(convertValueLabel([]));


        }
    }

    const handleCompanyChange = (e) => {
        if (e?.value) {

            const sendGpparamslocation = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    filter: '[("company_id", "=", ' + e.value + ')]'
                    // 'company.location': "[['company_id', '=', " + e?.value + ']]',
                },
            }

            const sendGpparamsleave = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                    filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + e.value + ']]]',
                },
            }
            // dispatch(FunctionDropDownList(sendGpparams))
            dispatch(LeaveTypesDropDownList(sendGpparamsleave))
            dispatch(LocationDropDownList(sendGpparamslocation))
            LeaveRequestAddFormik.setFieldValue('mode_company_id', e?.value)
            onLocationClear()
            onFunctionClear()
            // onEmployeeClear();
            setCompanyChanged(1);

        }
    }

    const handleLocationChange = (e) => {

        onFunctionClear()
        if (e?.value) {
            {
                const sendGpparams = {
                    params: {
                        query: '{id,name}',
                        isDropdown: 1,
                        // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                        filter: '[["location_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
                    },
                }
                // onFunctionClear()
                dispatch(FunctionDropDownList(sendGpparams))
                LeaveRequestAddFormik.setFieldValue('location_id', e?.value)
                onFunctionClear()
                setLocationChanged(1)

                // onEmployeeClear();
            }
        }
    }

    const handleFunctionChange = (e) => {
        // onEmployeeClear();
        if (e?.value) {

            const sendGpparams = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    //  filter : '[("location_id", "=", '+e.value+')]'
                    filter: '[["department_id", "in", [' + e?.value + ']]]',
                },
            }
            // onFunctionClear()
            dispatch(HREmployeeDropDownList(sendGpparams))
            LeaveRequestAddFormik.setFieldValue('department_id', e?.value)
            // onFunctionClear()
            onEmployeeClear();
            setFunctionChanged(1)
            // setJobOptions(convertValueLabel([]));

        }
    }

    const handleEmployee = (e) => {
        LeaveRequestAddFormik.setFieldValue('employee_id', e?.value)
        // onFunctionClear()
        // onEmployeeClear();
        // setFunctionChanged(1)
        // setJobOptions(convertValueLabel([]));

    }




    const validate = (values) => {
        const errors = {};

        if (getdata === 'Super Admin') {

            if (!values.group_id) {
                errors.group_id = 'This field is required.';
            }
            if (!values.mode_company_id) {
                errors.mode_company_id = 'This field is required.';
            }
            if (!values.location_id) {
                errors.location_id = 'This field is required.';
            }
            if (!values.department_id) {
                errors.department_id = 'This field is required.';
            }
            if (!values.employee_id) {
                errors.employee_id = 'This field is required.';
            }

            return errors;
        }
        else {
            values.group_id = getgroupData
            values.mode_company_id = getCompyData
            values.department_id = getFunctionData
            values.location_id = getLocationData
            values.holiday_type = 'employee'
            values.employee_id = getEmpData
        }


    };

    const LeaveRequestAddFormik = useFormik({
        initialValues: {
            holiday_status_id: '',
            request_date_from: '',
            from_half: '',
            to_half: '',
            request_date_to: '',
            number_of_days: 0,
            name: '',
            location_id: '',
            holiday_type: '',
            group_id: '',
            mode_company_id: '',
            department_id: '',
            employee_id: '',
            report_note: ''
        },
        validate,
        validationSchema: Yup.object({

            holiday_status_id: Yup.string().required('This field is required'),
            request_date_from: Yup.string().required('This field is required'),
            request_date_to: Yup.string().required('This field is required'),
            name: Yup.string().required('This field is required'),

        }),
        onSubmit: (values) => {

            // console.log("vale", values);
            // if (getdata != 'Super Admin') {
            //     values.group_id = getgroupData
            //     values.mode_company_id = getCompyData
            // }
            // if (getdata === 'Super Admin') {

            //     values.department_id = ''
            //     values.location_id = ''
            //     values.employee_id = ''
            // }
            // else {
            //     values.group_id = getgroupData
            //     values.mode_company_id = getCompyData
            // }

            const formData = JSON.stringify({ params: { data: values } })
            dispatch(LeaveRequestAddAPI(formData, history))
            // console.log("formData", formData);
        },
    })

    const [tosetGroupdata, setTosetGroupdata] = useState();
    const [tosetCompanydata, setTosetCompanydata] = useState();

    // useEffect(() => {

    //     setTosetGroupdata(getgroupData)
    //     setTosetCompanydata(getCompyData)

    //     // console.log("grp", tosetGroupdata);
    //     // console.log("cpy", getCompyData);

    // })


    return (
        <main className="c-main">
            <CFade>
                <CContainer fluid>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol col="6" className="left">
                                    <strong> Add Leave Request</strong>
                                    {/* <i class="cil-grid"></i> */}
                                </CCol>
                                <i class="cil-list"></i>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={LeaveRequestAddFormik.handleSubmit} className="form-horizontal">
                                <div>
                                    <div className="row form-group">

                                        <div className="col-md-12">
                                            <label htmlFor="hf-email">
                                                Description <span className="error"> *</span>
                                            </label>
                                            <CTextarea
                                                name="name"
                                                id="textarea-input"
                                                rows="1"
                                                // value={LeaveRequestAddFormik.values.name}
                                                maxLength={500}
                                                placeholder="Description"
                                                onChange={LeaveRequestAddFormik.handleChange}
                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                            />
                                            {LeaveRequestAddFormik.touched.name &&
                                                LeaveRequestAddFormik.errors.name ? (
                                                <div className="help-block text-danger">
                                                    {LeaveRequestAddFormik.errors.name}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        {/* {
                                            getdata === 'Super Admin' ? "" : */}

                                        <div className="col-md-4" hidden>
                                            <label htmlFor="hf-email">
                                                Mode
                                            </label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                placeholder={'Choose a Mode'}
                                                value={mode}
                                                name="holiday_type"
                                                // options={modeOptions}
                                                onChange={(e) => handleMode(e)}
                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                            />
                                            {LeaveRequestAddFormik.touched.holiday_type &&
                                                LeaveRequestAddFormik.errors.holiday_type ? (
                                                <div className="help-block text-danger">
                                                    {LeaveRequestAddFormik.errors.holiday_type}
                                                </div>
                                            ) : null}
                                        </div>

                                        {/* } */}


                                        {

                                            compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' ?
                                                <div className="col-md-4">

                                                    {
                                                        getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                            Group <span className="error"> *</span>
                                                        </label> : ""
                                                    }
                                                    {
                                                        getdata === 'Super Admin' ?

                                                            <Select
                                                                //  isMulti={true}
                                                                ref={selectCompanyRef}
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a  Group '}
                                                                name="group_id"
                                                                // value={tosetGroupdata}
                                                                options={getdata !== 'Super Admin' ? getgroupData : groupOptions}
                                                                // {groupOptions}
                                                                // value={}
                                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                                                onChange={(e) => handleGroupChange(e)}

                                                            // onChange={({ value }) => LeaveRequestAddFormik.setFieldValue('company_id', value)}
                                                            /> : ""
                                                    }

                                                    {
                                                        getdata === 'Super Admin' ?
                                                            LeaveRequestAddFormik.touched.group_id &&
                                                                LeaveRequestAddFormik.errors.group_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestAddFormik.errors.group_id}
                                                                </div>
                                                            ) : null : ""
                                                    }


                                                </div> : ''

                                        }


                                        {
                                            compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' ?

                                                <div className="col-md-4">

                                                    {
                                                        getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                            Company <span className="error"> *</span>
                                                        </label> : ""
                                                    }

                                                    {
                                                        getdata === 'Super Admin' ? <Select
                                                            //  isMulti={true}
                                                            ref={selectCompanyRef}
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a  Company '}
                                                            name="mode_company_id"
                                                            // value={tosetCompanydata}
                                                            // value={getdata !== 'Super Admin' ? tosetCompanydata : ''}
                                                            options={getdata !== 'Super Admin' ? getCompyData : companyOptions}
                                                            // options={companyOptions}
                                                            // value={}
                                                            onBlur={LeaveRequestAddFormik.handleBlur}
                                                            onChange={(e) => handleCompanyChange(e)}

                                                        // onChange={({ value }) => LeaveRequestAddFormik.setFieldValue('company_id', value)}
                                                        /> : ""
                                                    }

                                                    {
                                                        getdata === 'Super Admin' ? LeaveRequestAddFormik.touched.mode_company_id &&
                                                            LeaveRequestAddFormik.errors.mode_company_id ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestAddFormik.errors.mode_company_id}
                                                            </div>
                                                        ) : null : ''

                                                    }

                                                </div> : ""

                                        }


                                        {
                                            compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' ?

                                                <div className="col-md-4">
                                                    {
                                                        getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                            Location <span className="error"> *</span>
                                                        </label>
                                                            : ""
                                                    }

                                                    {
                                                        getdata === 'Super Admin' ?

                                                            <Select
                                                                ref={selectLocationRef}
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a  Location '}
                                                                name="location_id"
                                                                options={getdata !== 'Super Admin' ? getLocationData : locationOptions}
                                                                // options={locationOptions}
                                                                // value={getdata != 'Super Admin' ? getLocationData : ''}
                                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                                                onChange={(e) => handleLocationChange(e)}
                                                            /> : ""

                                                    }

                                                    {
                                                        getdata === 'Super Admin' ? LeaveRequestAddFormik.touched.location_id &&
                                                            LeaveRequestAddFormik.errors.location_id ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestAddFormik.errors.location_id}
                                                            </div>
                                                        ) : null : ""
                                                    }

                                                </div> : ""
                                        }







                                    </div>
                                    <div className="row form-group">




                                        {
                                            compyStatus === 'department' || compyStatus === 'employee' ? <div className="col-md-4">

                                                {
                                                    getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                        Function <span className="error"> *</span>
                                                    </label> : ""
                                                }

                                                {
                                                    getdata === 'Super Admin' ? <Select
                                                        //  isMulti={true}
                                                        ref={selectFunctionRef}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        placeholder={'Choose a  Function '}
                                                        name="department_id"
                                                        options={functionOptions}
                                                        // value={}
                                                        onBlur={LeaveRequestAddFormik.handleBlur}
                                                        onChange={(e) => handleFunctionChange(e)}

                                                    // onChange={({ value }) => LeaveRequestAddFormik.setFieldValue('mode_company_id', value)}
                                                    /> : ""
                                                }

                                                {
                                                    getdata === 'Super Admin' ? LeaveRequestAddFormik.touched.department_id &&
                                                        LeaveRequestAddFormik.errors.department_id ? (
                                                        <div className="help-block text-danger">
                                                            {LeaveRequestAddFormik.errors.department_id}
                                                        </div>
                                                    ) : null : ''
                                                }

                                            </div> : ''
                                        }

                                        {
                                            compyStatus === 'employee' ? <div className="col-md-4">
                                                {
                                                    getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                        Employee <span className="error"> *</span>
                                                    </label> : ''
                                                }
                                                {
                                                    getdata === 'Super Admin' ? <Select
                                                        ref={selectEmployeeRef}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        placeholder={'Choose a Employee'}
                                                        name="employee_id"
                                                        options={employeeOptions}
                                                        onBlur={LeaveRequestAddFormik.handleBlur}
                                                        onChange={(e) => handleEmployee(e)}
                                                    // onChange={({ value }) => LeaveRequestAddFormik.setFieldValue('employee_id', value)}
                                                    /> : ""
                                                }

                                                {
                                                    getdata === 'Super Admin' ? LeaveRequestAddFormik.touched.employee_id &&
                                                        LeaveRequestAddFormik.errors.employee_id ? (
                                                        <div className="help-block text-danger">
                                                            {LeaveRequestAddFormik.errors.employee_id}
                                                        </div>
                                                    ) : null : ''
                                                }

                                            </div> : ''
                                        }


                                    </div>

                                    <div className="row form-group">

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                Leave Type Name <span className="error"> *</span>
                                            </label>

                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                placeholder={'Choose a Leave Type'}
                                                // value={mode}
                                                name="holiday_status_id"
                                                options={getdata === 'Super Admin' ? leaveTypeOptions : reMainingDaysOptions}
                                                // {
                                                // ...reMainingDaysOptions.map((user) =>

                                                //     // options = { user. }
                                                //        )
                                                // }

                                                onChange={({ value }) => LeaveRequestAddFormik.setFieldValue('holiday_status_id', value)}
                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                            />
                                            {LeaveRequestAddFormik.touched.holiday_status_id &&
                                                LeaveRequestAddFormik.errors.holiday_status_id ? (
                                                <div className="help-block text-danger">
                                                    {LeaveRequestAddFormik.errors.holiday_status_id}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-md-12'>
                                            <CCard className="mb-4">
                                                <CCardHeader id="headingTwo " className="header">
                                                    <div>
                                                        <h5 className="m-0 p-0">Dates</h5>
                                                    </div>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                From <span className="error"> *</span>
                                                            </label>
                                                            <SingleDatePicker
                                                                isOutsideRange={d => d.isSame()}
                                                                // isOutsideRange={d => d.isBefore(moment())}
                                                                id={'request_date_from'}
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
                                                                                    <option value={value} key={`request_date_from${value}`}>{label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                        <div>
                                                                            <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                                                {yearsDD('request_date_from')}
                                                                            </select>
                                                                        </div>
                                                                    </div>}
                                                            />
                                                            {LeaveRequestAddFormik.touched.request_date_from &&
                                                                LeaveRequestAddFormik.errors.request_date_from ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestAddFormik.errors.request_date_from}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                From Half
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a  From Half'}
                                                                value={fromHalf}
                                                                name="from_half"
                                                                options={fromHalfOptions}
                                                                onChange={(e) => handleFromHalf(e)}
                                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                                            />
                                                            {LeaveRequestAddFormik.touched.from_half &&
                                                                LeaveRequestAddFormik.errors.from_half ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestAddFormik.errors.from_half}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                To <span className="error"> *</span>
                                                            </label>

                                                            <SingleDatePicker
                                                                isOutsideRange={d => d.isBefore(moment(todateChange))}
                                                                id={'request_date_to'}
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
                                                                                    <option value={value} key={`request_date_to${value}`}>{label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                        <div>
                                                                            <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                                                {yearsDD('request_date_to')}
                                                                            </select>
                                                                        </div>
                                                                    </div>}
                                                            />

                                                            {LeaveRequestAddFormik.touched.request_date_to &&
                                                                LeaveRequestAddFormik.errors.request_date_to ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestAddFormik.errors.request_date_to}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                To Half
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a   To Half'}
                                                                value={toHalf}
                                                                name="to_half"
                                                                options={toHalfOptions}
                                                                onChange={(e) => handleToHalf(e)}
                                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                                            />
                                                            {LeaveRequestAddFormik.touched.to_half &&
                                                                LeaveRequestAddFormik.errors.to_half ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestAddFormik.errors.to_half}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label htmlFor="hf-email">
                                                                Duration
                                                            </label>
                                                            <input
                                                                type="number" step="0.1"
                                                                name="number_of_days"
                                                                value={LeaveRequestAddFormik.values.number_of_days}
                                                                // value={fromHalfdate}

                                                                readOnly
                                                                className="form-control"
                                                                placeholder=" Duration"
                                                                maxLength={25}
                                                                onChange={LeaveRequestAddFormik.handleChange}
                                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                                            />
                                                            {LeaveRequestAddFormik.touched.number_of_days &&
                                                                LeaveRequestAddFormik.errors.number_of_days ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestAddFormik.errors.number_of_days}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                    </div>


                                                </CCardBody>
                                            </CCard>
                                        </div>


                                    </div>
                                    {/* <div className="col-md-3">
                                        <label htmlFor="hf-email">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            // value={LeaveRequestAddFormik.values.name}
                                            className="form-control"
                                            placeholder=" Description"
                                            maxLength={25}
                                            onChange={LeaveRequestAddFormik.handleChange}
                                            onBlur={LeaveRequestAddFormik.handleBlur}
                                        />
                                        {LeaveRequestAddFormik.touched.name &&
                                            LeaveRequestAddFormik.errors.name ? (
                                            <div className="help-block text-danger">
                                                {LeaveRequestAddFormik.errors.name}
                                            </div>
                                        ) : null}
                                    </div> */}

                                    {
                                        getdata === 'Super Admin' ? <div className="row mb-3">

                                            <div className='col-md-12'>
                                                <CCard className="mb-4">
                                                    <CCardHeader id="headingTwo " className="header">
                                                        <div>
                                                            <h5 className="m-0 p-0">Manager's Comment</h5>
                                                        </div>
                                                    </CCardHeader>
                                                    <CCardBody>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <CTextarea
                                                                    name="report_note"
                                                                    id="textarea-input"
                                                                    rows="3"
                                                                    // value={LeaveRequestAddFormik.values.name}
                                                                    maxLength={500}
                                                                    placeholder="Manager's Comment..."
                                                                    onChange={LeaveRequestAddFormik.handleChange}
                                                                    onBlur={LeaveRequestAddFormik.handleBlur}
                                                                />
                                                                {/* <input
                                                                type="range"
                                                                name="report_note"
                                                                // value={LeaveRequestAddFormik.values.name}
                                                                className="form-control"
                                                                placeholder=" Leave Type Name"
                                                                // maxLength={500}
                                                                onChange={LeaveRequestAddFormik.handleChange}
                                                                onBlur={LeaveRequestAddFormik.handleBlur}
                                                            /> */}
                                                                {LeaveRequestAddFormik.touched.report_note &&
                                                                    LeaveRequestAddFormik.errors.report_note ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestAddFormik.errors.report_note}
                                                                    </div>
                                                                ) : null}


                                                            </div>
                                                        </div>
                                                    </CCardBody>
                                                </CCard>
                                            </div>
                                        </div> : ""
                                    }



                                </div>
                                <CCardFooter>
                                    <CRow>
                                        <CCol className="col-md-12" align="center">
                                            <CButton type="submit" size="md" color="primary">
                                                <CIcon name="cil-scrubber" /> Save
                                            </CButton>
                                            <Link className="ml-3 btn btn-danger" to={'/leave/leaveRequest'}>
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

export default AddLeaveRequest
