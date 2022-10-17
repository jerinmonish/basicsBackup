import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LeaveTypesDropDownList, FunctionDropDownList, HREmployeeDropDownList, LocationDropDownList, CommonRemainingDropdown } from '../../../actions/commonAction'
import { LeaveRequestEditAPI, LeaveRequestUpdateAPI, LeaveRequestList, LeaveRequestUpdateApproval, LeaveRequestUpdateRefuse, LeaveRequestUpdateConfirm, LeaveRequestUpdateDraft, LeaveRequestSecondApproval, LeaveRequestCancelRequest, LeaveRequestCancelApproval } from '../../../actions/leave'
import { useFormik } from 'formik'
import Select from 'react-select'
import CryptoJS from "crypto-js";
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
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
    CTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { SingleDatePicker } from "react-dates";
import moment, { duration } from 'moment';
import { decryptSingleData, indianDateFormat, convertValueLabel, convertDateToMDY } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import CLoader from 'src/pages/loader/CLoader'

const EditLeaveRequest = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const dropdownData = useSelector((state) => state.commonData)
    const { leaveRequestEditDetails, isLoading } = useSelector(state => state.leaveBackend);
    // console.log("dropdownData",dropdownData);
    //To load dropdown predefined data

    // update
    useEffect(() => {
        // dispatch(CompanyDropDownList());
        dispatch(CommonGroupList())
        if (props?.match?.params?.id) {
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, []);


    // console.log("leaveRequestEditDetails", leaveRequestEditDetails);



    const [selectGroupName, setSelectGroupName] = useState({});
    const [selectCompanyName, setSelectCompanyName] = useState({});
    const [selectFunction, setSelectFunction] = useState({});
    const [selectLocationName, setSelectLocationName] = useState({});
    const [selectEmployee, setSelectEmployee] = useState({});
    const [selectleaverequest, setSelectLeaveRequest] = useState({});
    const [selectholydaytype, setSelectHolydayType] = useState({});
    const [selectFromtHalf, setSelectFromtHalf] = useState();
    const [selectToHalf, setSelectToHalf] = useState();

    const [selectduration, setSelectDuration] = useState({});
    const [selectdesc, setSelectDesc] = useState({});
    const [selectmngNote, setSelectMngNote] = useState({});


    const [toHalf, setToHalf] = useState([]);
    const [toHalfOptions, setToHalfOptions] = useState([{ value: 'first_half', label: 'First Half' }, { value: 'second_half', label: 'Second Half' }]);


    const [fromHalf, setFromHalf] = useState([]);
    const [fromHalfOptions, setFromHalfOptions] = useState([{ value: 'first_half', label: 'First Half' }, { value: 'second_half', label: 'Second Half' }]);

    const [fromHalfdate, setFromHalfDate] = useState([]);
    const [toHalfdate, setToHalfDate] = useState([]);
    const [fromHalfText, setFromHalfText] = useState([]);
    const [toHalftext, setToHalfText] = useState();

    const datepik = (f1, f2, t1, t2) => {
        let fromDate = f1 ? indianDateFormat(f1._d) : '';
        let toDate = t1 ? indianDateFormat(t1._d) : '';
        if (f1 && t1 && f2 && t2) {
            let fValue1 = t1?.diff(f1, 'days') + 1;
            if (f2 == "first_half" && t2 == "first_half") {

                console.log("f2", f2);
                console.log("t1", t2);

                fValue1 = fValue1 - 0.5
            } else if (f2 == "second_half" && t2 == "first_half") {
                console.log("f2", f2);
                console.log("t1", t2);
                fValue1 = fValue1 - 1
            } else if (f2 == "second_half" && t2 == "second_half") {
                console.log("f2", f2);
                console.log("t1", t2);
                fValue1 = fValue1 - 0.5
            }
            else if (f2 == "second_half" && t2 == "first_half") {
                console.log("f2", f2);
                console.log("t1", t2);
                fValue1 = fValue1 - 1
            }
            if (fValue1 == 0) {

                // console.log("duration", durationReset);
                setDateFrom('')
                setFromHalf('')
                // setselectFromtHalf
                setSelectFromtHalf('')
                setSelectToHalf('')
                setDateTo('')
                setToHalf(0)
                // setDurationReset('')
                // LeaveRequestEditFormik.setFieldValue('number_of_days', 0);
                toast.error('Duration must not be zero !', { position: toast.POSITION.TOP_RIGHT })
                // setDurationReset('')

                LeaveRequestEditFormik.setFieldValue("number_of_days", '');

            } else {

                LeaveRequestEditFormik.setFieldValue("number_of_days", fValue1);
                setDurationReset(fValue1)
            }
        }
    }


    const handleFromHalf = (e) => {
        // setCompyStatus(e?.value)

        setDateTo('')
        setSelectToHalf('')
        setDurationReset('')

        // console.log("from db fromhalf-", fromHalftextfromDB);
        // console.log("from db tohalf-", toHalftextfromDB);
        console.log(" onchange handlefromhalf value is fromhalftext==", e.value);
        console.log(" onchange handlefromhalf value is tohalftext==", selectToHalf.value);
        // setToHalf('')
        // setToHalfText('')
        var cal = 0.0;
        var myval = 0.0;
        setFromHalfText(e.value)
        if (e) {
            LeaveRequestEditFormik.setFieldValue('from_half', e?.value);
            setSelectFromtHalf(convertValueLabel(e.value, e.label));
            datepik(dateFrom, e.value, dateTo, selectToHalf.value);
        }
        setDurationReset([])

        // if ((fromHalfdate <= toHalfdate) && (e.value == 'first_half') && (toHalftext == 'first_half')) {
        //     console.log('first');

        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 0.5
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }
        // else if ((fromHalfdate <= toHalfdate) && (toHalftext == 'second_half') && (e.value == 'second_half')) {
        //     console.log('second');
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 0.5
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }
        // else if ((fromHalfdate <= toHalfdate) && (toHalftext === 'first_half') && (e.value === 'second_half')) {
        //     console.log("in last 1");
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 1.0
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }
        // else if ((fromHalfdate <= toHalfdate) && (fromHalfText === 'first_half') && (e.value === 'second_half')) {
        //     console.log("in last 1");
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 1.0
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }

        // else if ((fromHalfdate <= toHalfdate) && (e.value === 'first_half') && (toHalftext === 'second_half')) {
        //     console.log("in last 1");
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 1.0
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }

        // else if ((fromHalfdate <= toHalfdate) && (fromHalftextfromDB == 'first_half') && (toHalftextfromDB == 'first_half')) {
        //     console.log('first db');

        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 0.5
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }
        // else if ((fromHalfdate <= toHalfdate) && (fromHalftextfromDB == 'second_half') && (toHalftextfromDB == 'second_half')) {
        //     console.log('second db');
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 0.5
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }



    }


    const handleToHalf = (e) => {
        // setCompyStatus(e?.value)
        // console.log("check to half ==", e);
        // console.log("from db toHalf -", toHalftextfromDB);
        console.log(" onchange handleToHalf value is tohalftext==", e.value);
        console.log(" onchange handleToHalf value is fromhalftext==", selectFromtHalf.value);
        var cal = 0.0;
        var myval = 0.0;
        // selectToHalf
        setToHalfText(e.value)
        if (e) {
            LeaveRequestEditFormik.setFieldValue('to_half', e?.value);
            setSelectToHalf(convertValueLabel(e.value, e.label));
            datepik(dateFrom, selectFromtHalf.value, dateTo, e.value);
        }

        // console.log("tohalf", toHalftext);
        // console.log("from", fromHalfText);
        // console.log("to", toHalf);

        // if ((fromHalfdate <= toHalfdate) && (fromHalfText == 'first_half') && (e.value == 'first_half')) {
        //     console.log('first');

        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 0.5

        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }
        // else if ((fromHalfdate <= toHalfdate) && (fromHalfText == 'second_half') && (e.value == 'second_half')) {
        //     console.log('second');
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 0.5
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }
        // else if ((fromHalfdate <= toHalfdate) && (fromHalfText === 'first_half') && (e.value === 'second_half')) {
        //     console.log("in last 1");
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 1.0
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }

        // else if ((fromHalfdate <= toHalfdate) && (e.value === 'first_half') && (fromHalfText === 'second_half')) {
        //     console.log("in last 1");
        //     cal = Math.floor((Math.abs(toHalfdate - fromHalfdate)) / (1000 * 60 * 60 * 24));
        //     // console.log("cal", cal.toFixed(1));
        //     myval = cal + 1.0
        //     // LeaveRequestEditFormik.setFieldValue(durationReset, myval);
        // }

    }





    // useEffect(() => {
    //     let Udata = localStorage.getItem('udata');
    //     const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
    //     const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
    //     // console.log("byts", udetails.uid);
    //     setGetUID(udetails.uid)

    // }, [])

    // console.log("uid", getUID);

    // result.data.employee_id.id
    // employee_id.leave_manager_id

    const [toHalftextfromDB, setToHalfTextFromDB] = useState();
    const [fromHalftextfromDB, setFromHalfTextFromDB] = useState();

    useEffect(() => {
        if (leaveRequestEditDetails?.data !== null) {
            // console.log("leaverequest", leaveRequestEditDetails?.data?.to_half);
            setDurationReset(leaveRequestEditDetails?.data?.number_of_days)
            setToHalfTextFromDB(leaveRequestEditDetails?.data?.from_half)
            setFromHalfTextFromDB(leaveRequestEditDetails?.data?.to_half)
            LeaveRequestEditFormik.setValues({
                "holiday_status_id": leaveRequestEditDetails?.data?.holiday_status_id,
                "request_date_from": leaveRequestEditDetails?.data?.request_date_from,
                "request_date_to": leaveRequestEditDetails?.data?.request_date_to,
                "number_of_days": leaveRequestEditDetails?.data?.number_of_days,
                "location_id": leaveRequestEditDetails?.data?.location_id,
                "name": leaveRequestEditDetails?.data?.name,
                "holiday_type": leaveRequestEditDetails?.data?.holiday_type,
                "group_id": leaveRequestEditDetails?.data?.group_id,
                "mode_company_id": leaveRequestEditDetails?.data?.mode_company_id,
                "department_id": leaveRequestEditDetails?.data?.department_id,
                "employee_id": leaveRequestEditDetails?.data?.employee_id?.id,
                "report_note": leaveRequestEditDetails?.data?.report_note,
                "from_half": leaveRequestEditDetails?.data?.from_half,
                "to_half": leaveRequestEditDetails?.data?.to_half,

            });

            // result.data.employee_id.id
        }
        if (leaveRequestEditDetails?.data !== undefined && leaveRequestEditDetails?.data !== null) {

            setSelectGroupName(convertValueLabel(leaveRequestEditDetails?.data?.group_id, leaveRequestEditDetails?.data?.group_id_name));
            setSelectCompanyName(convertValueLabel(leaveRequestEditDetails?.data?.mode_company_id, leaveRequestEditDetails?.data?.mode_company_id_name));
            setSelectFunction(convertValueLabel(leaveRequestEditDetails?.data?.department_id, leaveRequestEditDetails?.data?.department_id_name));
            setSelectLocationName(convertValueLabel(leaveRequestEditDetails?.data?.location_id, leaveRequestEditDetails?.data?.location_id_name));
            setSelectEmployee(convertValueLabel(leaveRequestEditDetails?.data?.employee_id?.id, leaveRequestEditDetails?.data?.employee_id?.name));
            setSelectLeaveRequest(convertValueLabel(leaveRequestEditDetails?.data?.holiday_status_id, leaveRequestEditDetails?.data?.holiday_status_id_name));
            setSelectHolydayType(convertValueLabel(leaveRequestEditDetails?.data?.holiday_type, leaveRequestEditDetails?.data?.holiday_type_label));
            setSelectFromtHalf(convertValueLabel(leaveRequestEditDetails?.data?.from_half, leaveRequestEditDetails?.data?.from_half_label));
            setSelectToHalf(convertValueLabel(leaveRequestEditDetails?.data?.to_half, leaveRequestEditDetails?.data?.to_half_label));
            setDateFrom(moment(new Date(convertDateToMDY(leaveRequestEditDetails?.data?.request_date_from))));
            setDateTo(moment(new Date(convertDateToMDY(leaveRequestEditDetails?.data?.request_date_to))));
        }
    }, [isLoading, leaveRequestEditDetails?.data])

    //dropdown 
    const [mode, setMode] = useState([]);
    const [modeOptions, setModeOptions] = useState([{ value: 'employee', label: 'By Employee' }, { value: 'company', label: 'By Company' }, { value: 'location', label: 'By Location' }, { value: 'department', label: 'By Function' }]);

    const [compyStatus, setCompyStatus] = useState('employee');

    // setSelectGroupName(convertValueLabel(e.value, e.label))

    const handleMode = (e) => {
        setCompyStatus(e?.value)
        if (e) {

            setSelectHolydayType(convertValueLabel(e.value, e.label));
            LeaveRequestEditFormik.setFieldValue('holiday_type', e?.value);

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
    const [companyOptions, setCompanyOptions] = useState([]);
    const [functionOptions, setFunctionOptions] = useState([]);
    // const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);




    const [dateFromandTo, setDateFromandTo] = useState(null);

    const [durationReset, setDurationReset] = useState('');




    const handleDateOfInc = (date) => {

        console.log("fromdate", date._d);

        setSelectFromtHalf('')
        setDateTo('')
        setSelectToHalf('')
        setDurationReset('')

        setDateFromandTo(date)

        setFromHalfDate(date._d)

        if (date) {
            setDateFrom(date)
            LeaveRequestEditFormik.setFieldValue('request_date_from', indianDateFormat(date._d));
        }
    }

    const handleDateTo = (date) => {


        setSelectToHalf('')
        setDurationReset('')

        // console.log("todate", date._d);

        setToHalfDate(date._d)

        if (date) {
            setDateTo(date)
            LeaveRequestEditFormik.setFieldValue('request_date_to', indianDateFormat(date._d));
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

    // useEffect(() => {
    //     // console.log("dropdownData?.functionCommonData?", dropdownData);
    //     if (dropdownData?.functionCommonData?.data?.result && dropdownData?.leaveTypesCommonData?.data?.result && companyChanged === 1) {
    //         setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
    //         setLeaveTypeOptions(dropdownData?.leaveTypesCommonData?.data?.result);
    //         // setLocationOptions(convertValueLabel([]));
    //     }
    // }, [dropdownData?.functionCommonData?.data?.result, dropdownData?.leaveTypesCommonData?.data?.result, companyChanged])

    useEffect(() => {
        // console.log("dropdownData?.functionCommonData?", dropdownData);
        if (dropdownData?.hrEmployeeCommonData?.data?.result && functionChanged === 1) {
            setEmployeeOptions(dropdownData?.hrEmployeeCommonData?.data?.result);
        }
    }, [dropdownData?.hrEmployeeCommonData?.data?.result, functionChanged])

    // hrEmployeeCommonData
    //when onchange


    useEffect(() => {
        if (dropdownData?.companyCommonData?.data?.result) {
            // console.log("dropdownData?.companyCommonData?.data", dropdownData);
            setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
        } else if (leaveRequestEditDetails?.data?.mode_company_id_list) {
            setCompanyOptions(leaveRequestEditDetails?.data?.mode_company_id_list)
        }
    }, [dropdownData?.companyCommonData?.data?.result, leaveRequestEditDetails?.data?.mode_company_id_list])



    // useEffect(() => {

    //     if (leaveRequestEditDetails?.data?.mode_company_id_list) {
    //         setCompanyOptions(leaveRequestEditDetails?.data?.mode_company_id_list)
    //     }
    // }, [dropdownData?.companyCommonData?.data?.result, leaveRequestEditDetails?.data?.mode_company_id_list])


    const handleGroupChange = (e) => {

        setSelectCompanyName([])
        setSelectFunction([])
        setSelectEmployee([])
        setSelectLeaveRequest([])
        setSelectLocationName([])
        //  setCompyStatus()

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
            LeaveRequestEditFormik.setFieldValue('group_id', e.value)
            onCompanyClear();
            onLocationClear();
            onFunctionClear();
            onJobClear();
            setGroupChanged(1);
            // setLocationOptions(convertValueLabel([]));

            //  setSubfunctionOptions(convertValueLabel([]));


        }
    }


    const handleCompanyChange = (e) => {
        setSelectFunction([])
        setSelectEmployee([])
        setSelectLeaveRequest([])
        setSelectLocationName([])
        if (e?.value) {

            const sendGpparamslocation = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                    // 'company.location': "[['mode_company_id', '=', " + e?.value + ']]',
                    filter: '[("company_id", "=", ' + e.value + ')]'
                },
            }

            dispatch(LocationDropDownList(sendGpparamslocation))
            setSelectCompanyName(convertValueLabel(e.value, e.label))
            LeaveRequestEditFormik.setFieldValue('mode_company_id', e?.value)
            // onLocationClear()
            // onFunctionClear()
            // onEmployeeClear();
            setCompanyChanged(1);

        }
    }

    const handleLocationChange = (e) => {
        setSelectFunction([])
        setSelectEmployee([])
        setSelectLeaveRequest([])
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
                setSelectLocationName(convertValueLabel(e.value, e.label))
                LeaveRequestEditFormik.setFieldValue('location_id', e?.value)
                setLocationChanged(1)
                // onFunctionClear()
                // onEmployeeClear();
            }
        }
    }



    // const handleCompanyChange = (e) => {
    //     setSelectFunction([])
    //     setSelectLeaveRequest([])
    //     if (e?.value) {

    //         const sendGpparams = {
    //             params: {
    //                 query: '{id,name}',
    //                 isDropdown: 1,
    //                 // filter: '[("mode_company_id", "=", ' + e.value + ')]'
    //                 filter: '[["company_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
    //             },
    //         }

    //         const sendGpparamsleave = {
    //             params: {
    //                 query: '{id,name}',
    //                 isDropdown: 1,
    //                 // filter: '[("mode_company_id", "=", ' + e.value + ')]'
    //                 filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + e?.value + ']]]',
    //             },
    //         }

    //         dispatch(FunctionDropDownList(sendGpparams))
    //         dispatch(LeaveTypesDropDownList(sendGpparamsleave))
    //         setSelectCompanyName(convertValueLabel(e.value, e.label))
    //         LeaveRequestEditFormik.setFieldValue('mode_company_id', e.value)
    //         onLocationClear()
    //         onFunctionClear()
    //         onJobClear()
    //         setCompanyChanged(1);



    //     }
    // }

    const handleLeaveType = (e) => {
        setSelectLeaveRequest(convertValueLabel(e.value, e.label))
        LeaveRequestEditFormik.setFieldValue('holiday_status_id', e.value)
    }



    const handleFunctionChange = (e) => {
        setSelectEmployee([])
        // setSelectLeaveRequest([])
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
            setSelectFunction(convertValueLabel(e.value, e.label))
            LeaveRequestEditFormik.setFieldValue('department_id', e?.value)
            onFunctionClear()
            onJobClear()
            setFunctionChanged(1)
            // setJobOptions(convertValueLabel([]));

        }
    }

    const handleEmplyee = (e) => {
        setSelectEmployee(convertValueLabel(e.value, e.label))
        LeaveRequestEditFormik.setFieldValue('employee_id', e.value)
    }



    const validate = (values) => {
        const errors = {};

        if (getdata === 'Super Admin') {

            if (!values.group_id) {
                errors.group_id = 'This field is required.';
            }
            // if (!values.mode_company_id) {
            //     errors.mode_company_id = 'This field is required.';
            // }
            // if (!values.location_id) {
            //     errors.location_id = 'This field is required.';
            // }
            // if (!values.department_id) {
            //     errors.department_id = 'This field is required.';
            // }
            // if (!values.employee_id) {
            //     errors.employee_id = 'This field is required.';
            // }
            // if (!values.holiday_type) {
            //     errors.holiday_type = 'This field is required.';
            // }
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


    const LeaveRequestEditFormik = useFormik({
        initialValues: {
            holiday_status_id: '',
            request_date_from: '',
            request_date_to: '',
            number_of_days: 0,
            name: '',
            from_half: '',
            to_half: '',
            holiday_type: '',
            group_id: '',
            mode_company_id: '',
            department_id: '',
            employee_id: '',
            report_note: ''
        },
        // validate,
        validationSchema: Yup.object({

            holiday_status_id: Yup.string().required('This field is required'),
            name: Yup.string().required('This field is required'),

            // holiday_status_id: Yup.string().required('This field is required'),
            name: Yup.string().required('This field is required'),
            // allocation_type: Yup.string().required('This field is required'),
            // request_date_from: Yup.string().required('This field is required'),
            group_id: Yup.string().required('This field is required'),
            mode_company_id: Yup.string().required('This field is required'),
            location_id: Yup.string().required('This field is required'),
            department_id: Yup.string().required('This field is required'),
            employee_id: Yup.string().required('This field is required'),

            // // holiday_status_id: Yup.string().required('This field is required'),
            // // request_date_from: Yup.string().required('This field is required'),
            // request_date_to: Yup.string().required('This field is required'),
            // // number_of_days: Yup.string().required('This field is required'),
            // name: Yup.string().required('This field is required'),
            // holiday_type: Yup.string().required('This field is required'),
            // group_id: Yup.string().required('This field is required'),
            // mode_company_id: Yup.string().required('This field is required'),
            // department_id: Yup.string().required('This field is required'),
            // employee_id: Yup.string().required('This field is required'),
            // report_note: Yup.string().required('This field is required')

        }),
        onSubmit: (values) => {


            // values.group_id = leaveRequestEditDetails?.data?.group_id
            // values.mode_company_id = leaveRequestEditDetails?.data?.mode_company_id
            // values.holiday_status_id = leaveRequestEditDetails?.data?.holiday_status_id
            // values.request_date_from = leaveRequestEditDetails?.data?.request_date_from
            // values.request_date_to = leaveRequestEditDetails?.data?.request_date_to
            // values.department_id = leaveRequestEditDetails?.data?.department_id
            // values.employee_id = leaveRequestEditDetails?.data?.employee_id?.id
            // values.holiday_type = leaveRequestEditDetails?.data?.holiday_type
            // values.report_note = leaveRequestEditDetails?.data?.report_note

            // console.log("val", values);
            const formData = JSON.stringify({ params: { data: values } })
            dispatch(LeaveRequestUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
            // console.log("formData", formData);
        },
    })

    const AllLeaveRequestStatus = useSelector((state) => state.leaveBackend)
    const reMainingDaysOptions = dropdownData?.reMainginCommonData
    // const Alldata = useSelector((state) => state.leaveBackend)

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (AllLeaveRequestStatus?.isleaveRequestApprove) {
            // console.log('afterload');
            // dispatch(LeaveRequestList(leaveRequestEditDetails?.data?.id));

            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [AllLeaveRequestStatus?.isleaveRequestApprove]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (AllLeaveRequestStatus?.isleaveRequestRefuse) {
            // console.log('afterload');
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [AllLeaveRequestStatus?.isleaveRequestRefuse]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (AllLeaveRequestStatus?.isleaveRequestConfirm) {
            // console.log('afterload');
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [AllLeaveRequestStatus?.isleaveRequestConfirm, dispatch, props?.match?.params?.id]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (AllLeaveRequestStatus?.isleaveRequestDraft) {
            // console.log('afterload');
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [AllLeaveRequestStatus?.isleaveRequestDraft]);


    useEffect(() => {
        if (AllLeaveRequestStatus?.isleaveRequestSecondApproval) {
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }

    }, [AllLeaveRequestStatus?.isleaveRequestSecondApproval])

    useEffect(() => {
        if (AllLeaveRequestStatus?.isleaveRequestCancelRequest) {
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [AllLeaveRequestStatus?.isleaveRequestCancelRequest])

    useEffect(() => {
        if (AllLeaveRequestStatus?.isleaveRequestCancelApproval) {
            dispatch(LeaveRequestEditAPI(decryptSingleData(props?.match?.params?.id)));
        }

    }, [AllLeaveRequestStatus?.isleaveRequestCancelApproval])


    const handleToApproval = (id) => {

        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }
        // console.log("toApproval");
        if (leaveRequestEditDetails?.data?.report_note != "") {

            // console.log("id", id);
            dispatch(LeaveRequestUpdateApproval(datavalue, history, id));
        } else {
            toast.error(' Please enter your comment', {
                position: toast.POSITION.TOP_RIGHT,
            })
        }

    }

    const handleToRefuse = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }

        dispatch(LeaveRequestUpdateRefuse(datavalue, history, id));

    }

    const handleToConfirm = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }

        dispatch(LeaveRequestUpdateConfirm(datavalue, history, id));
    }
    const handleToDraft = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }

        dispatch(LeaveRequestUpdateDraft(datavalue, history, id));
    }

    // const { leaveAllocationApprove, isLoading } = useSelector(state => state.leaveBackend);

    const handleToScondApproval = (id) => {
        const datavalue = {
            "params": {
                "data": {
                    "state": "validate1"
                }
            }
        }

        dispatch(LeaveRequestSecondApproval(datavalue, history, id));

    }

    const handleToCancelRequest = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }

        dispatch(LeaveRequestCancelRequest(datavalue, history, id));
    }
    const handleToCancelApproval = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }

        dispatch(LeaveRequestCancelApproval(datavalue, history, id));
    }

    // const handleToConfirm = (id) => {
    //     const datavalue = {
    //         "params": {
    //             "kwargs": {
    //                 "ids": [id]
    //             }
    //         }
    //     }
    //     if (id != undefined) {
    //         // console.log('in approval', id);

    //         // dispatch(LeaveAllocationConfirm(datavalue, history));
    //     }

    // }


    // const handleToDraft = (id) => {
    //     const datavalue = {
    //         "params": {
    //             "kwargs": {
    //                 "ids": [id]
    //             }
    //         }
    //     }
    //     if (id != undefined) {
    //         // console.log('in approval', id);

    //         // dispatch(LeaveAllocationDraft(datavalue, history));
    //     }

    // }



    const handleToCancel = (id) => {
        const datavalue = {
            "params": {
                "data": {
                    "state": "cancel"
                }
            }
        }
        if (id != undefined) {
            // console.log('in approval', id);

            // dispatch(LeaveAllocationUpdateAPI(datavalue, history, id));
        }
    }

    const [getdata, setGetdata] = useState([]);
    const [getUID, setGetUID] = useState([]);
    // const [getEmpData, setgetEmpData] = useState();

    const [getgroupData, setgetGroupData] = useState();
    const [getCompyData, setgetCompanyData] = useState();
    const [getLocationData, setgetLocationData] = useState();
    const [getFromData, setgetFromData] = useState();
    const [getToData, setgetToData] = useState();
    const [getFunctionData, setgetFunctionData] = useState();
    const [getEmpData, setgetEmpData] = useState();
    useEffect(() => {
        let Udata = localStorage.getItem('udata');
        const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
        const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
        // console.log("byts", udetails);
        // setgetCompanyData(udetails)
        setgetGroupData(udetails.group_id)
        setgetCompanyData(udetails.company_id)
        setgetLocationData(udetails.location_id)
        // setgetFunctionData(udetails.department_id)
        // setgetSubFunctionData(udetails.sub_function_id)
        setgetEmpData(udetails.employee_id)
        setGetUID(udetails.uid)
        setGetdata(udetails.level[0])
        const sendGpparamsleave = {
            params: {
                query: '{id,name}',
                isDropdown: 1,
                // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + udetails.company_id + ']]]',
            },
        }
        dispatch(LeaveTypesDropDownList(sendGpparamsleave))
        dispatch(CommonRemainingDropdown(udetails.employee_id))

    }, [])

    // console.log("uid", getUID);
    const leaveTypeOptions = dropdownData?.leaveTypesCommonData?.data?.result

    return (
        <main className="c-main">
            <ToastContainer />
            {isLoading == true ? (
                <CLoader />
            ) : (
                <CFade>
                    <CContainer fluid>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol col="6" className="left">
                                        <strong> Edit Leave Request</strong>
                                    </CCol>
                                    <CCol col='6'>
                                        {/* {
                                            leaveRequestEditDetails?.data?.employee_id?.leave_manager_id === getUID ? */}
                                        <div className='text-center'>
                                            {
                                                (() => {
                                                    if (leaveRequestEditDetails?.data?.state == 'draft')
                                                        return <button className="btn btn-md btn-primary" onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            handleToConfirm(leaveRequestEditDetails?.data?.id)
                                                        }}>Confirm</button>

                                                    // else if (leaveRequestEditDetails?.data?.state == 'cancel')
                                                    //     return <>
                                                    //         <button className="btn btn-md btn-warning" onClick={(e) => {
                                                    //         e.stopPropagation()
                                                    //         e.preventDefault()
                                                    //         handleToCancel(leaveRequestEditDetails?.data?.id)
                                                    //     }}>Cancelled</button>
                                                    //     </>

                                                    else if (leaveRequestEditDetails?.data?.state == 'confirm' && leaveRequestEditDetails?.data?.employee_id?.leave_manager_id === getUID)
                                                        return <>
                                                            <button className="btn btn-md btn-success" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToApproval(leaveRequestEditDetails?.data?.id)
                                                            }}>Approve</button>&nbsp;&nbsp;
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToRefuse(leaveRequestEditDetails?.data?.id)
                                                            }}>Refuse</button>&nbsp;&nbsp;
                                                            <button className="btn btn-md btn-primary" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToDraft(leaveRequestEditDetails?.data?.id)
                                                            }}>Mark as Draft</button>
                                                        </>

                                                    else if (leaveRequestEditDetails?.data?.state == 'validate' && leaveRequestEditDetails?.data?.employee_id?.leave_manager_id === getUID)
                                                        return <>
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToRefuse(leaveRequestEditDetails?.data?.id)
                                                            }}>Refuse</button></>

                                                    else if (leaveRequestEditDetails?.data?.state == 'validate')
                                                        return <>
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToCancelRequest(leaveRequestEditDetails?.data?.id)
                                                            }}>Cancel Request</button></>

                                                    else if (leaveRequestEditDetails?.data?.state == 'approved')
                                                        return <>
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToScondApproval(leaveRequestEditDetails?.data?.id)
                                                            }}>second Approval</button></>

                                                    else if (leaveRequestEditDetails?.data?.state == 'cancel1' && leaveRequestEditDetails?.data?.employee_id?.leave_manager_id === getUID)
                                                        return <>
                                                            <button className="btn btn-md btn-info" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToCancelApproval(leaveRequestEditDetails?.data?.id)
                                                            }}>Cancel Approve</button>
                                                            &nbsp;&nbsp;
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToRefuse(leaveRequestEditDetails?.data?.id)
                                                            }}>Refuse</button></>


                                                    else if (leaveRequestEditDetails?.data?.state == 'refuse')
                                                        return <>
                                                            <button className="btn btn-md btn-primary" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToDraft(leaveRequestEditDetails?.data?.id)
                                                            }}>Mark As Draft</button></>

                                                    else if (leaveRequestEditDetails?.data?.state == 'confirm')
                                                        return <>
                                                            <button className="btn btn-md btn-primary" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToDraft(leaveRequestEditDetails?.data?.id)
                                                            }}>Mark As Draft</button></>

                                                    else if (leaveRequestEditDetails?.data?.state == 'cancel' && leaveRequestEditDetails?.data?.employee_id?.leave_manager_id === getUID)
                                                        return <>
                                                            <button className="btn btn-md btn-primary" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToDraft(leaveRequestEditDetails?.data?.id)
                                                            }}>Mark As Draft</button></>

                                                })()
                                            }
                                        </div>
                                        {/* } */}

                                    </CCol>
                                </CRow>
                            </CCardHeader>


                            <div className="">
                                {
                                    (leaveRequestEditDetails?.data?.state === 'confirm') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px" }}>
                                            <span style={{ backgroundColor: '#2eb85c', font: '50px' }}>To Approve</span>
                                        </div>
                                        : ''
                                }

                                {
                                    (leaveRequestEditDetails?.data?.state === 'validate') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                            <span style={{ backgroundColor: '#2eb85c' }}>Approved</span>
                                        </div>
                                        : ''
                                }
                                {
                                    (leaveRequestEditDetails?.data?.state === 'validate1') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                            <span style={{ backgroundColor: '#2eb85c' }}> Second Approvel</span>
                                        </div>
                                        : ''
                                }
                                {
                                    (leaveRequestEditDetails?.data?.state === 'refuse') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                            <span style={{ backgroundColor: '#e55353ab' }}>Refused</span>
                                        </div>
                                        : ''
                                }
                                {
                                    (leaveRequestEditDetails?.data?.state === 'draft') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                            <span style={{ backgroundColor: '#e55133ab' }}>To Submit</span>
                                        </div>
                                        : ''
                                }

                                {
                                    (leaveRequestEditDetails?.data?.state === 'cancel1') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                            <span style={{ backgroundColor: '#e55133ab' }}>Cancel Request</span>
                                        </div>
                                        : ''
                                }
                                {
                                    (leaveRequestEditDetails?.data?.state === 'cancel') ?
                                        <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                            <span style={{ backgroundColor: '#e55133ab' }}>Cancelled</span>
                                        </div>
                                        : ''
                                }

                            </div>

                            <CCardBody>
                                <CForm onSubmit={LeaveRequestEditFormik.handleSubmit} className="form-horizontal">
                                    <div>
                                        {
                                            leaveRequestEditDetails?.data?.state === 'validate' || leaveRequestEditDetails?.data?.state === 'refuse' || leaveRequestEditDetails?.data?.state === 'cancel' ?
                                                <div className="row form-group" style={{ pointerEvents: 'none' }}>

                                                    <div className="col-md-12">
                                                        <label htmlFor="hf-email">
                                                            Description <span className="error"> *</span>
                                                        </label>
                                                        <CTextarea
                                                            name="name"
                                                            id="textarea-input"
                                                            rows="1"
                                                            value={LeaveRequestEditFormik.values.name}
                                                            maxLength={500}
                                                            placeholder="Description"
                                                            onChange={LeaveRequestEditFormik.handleChange}
                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                        />

                                                        {LeaveRequestEditFormik.touched.name &&
                                                            LeaveRequestEditFormik.errors.name ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestEditFormik.errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                :
                                                <div className="row form-group">

                                                    <div className="col-md-12">
                                                        <label htmlFor="hf-email">
                                                            Description <span className="error"> *</span>
                                                        </label>
                                                        <CTextarea
                                                            name="name"
                                                            id="textarea-input"
                                                            rows="1"
                                                            value={LeaveRequestEditFormik.values.name}
                                                            maxLength={500}
                                                            placeholder="Description"
                                                            onChange={LeaveRequestEditFormik.handleChange}
                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                        />

                                                        {LeaveRequestEditFormik.touched.name &&
                                                            LeaveRequestEditFormik.errors.name ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestEditFormik.errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                        }

                                        {
                                            leaveRequestEditDetails?.data?.state === 'validate' || leaveRequestEditDetails?.data?.state === 'refuse' || leaveRequestEditDetails?.data?.state === 'cancel' ?
                                                <div className="row form-group" style={{ pointerEvents: 'none' }}>
                                                    <div className="col-md-0" hidden>
                                                        <label htmlFor="hf-email">
                                                            Mode
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Mode'}
                                                            value={selectholydaytype}
                                                            name="holiday_type"

                                                            // options={modeOptions}
                                                            onChange={(e) => handleMode(e)}
                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                        />


                                                        {LeaveRequestEditFormik.touched.holiday_type &&
                                                            LeaveRequestEditFormik.errors.holiday_type ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestEditFormik.errors.holiday_type}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    {

                                                        compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' ?
                                                            <div className="col-md-4">


                                                                {
                                                                    getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                        Group <span className="error"> *</span>
                                                                    </label> : ""
                                                                }

                                                                {
                                                                    getdata === 'Super Admin' ? <Select
                                                                        //  isMulti={true}
                                                                        ref={selectCompanyRef}
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'Choose a  Group '}
                                                                        name="group_id"
                                                                        options={groupOptions}
                                                                        // value={LeaveRequestEditFormik.values.group_id_name}
                                                                        value={selectGroupName}
                                                                        onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        onChange={(e) => handleGroupChange(e)}

                                                                    /> : ""

                                                                }

                                                                {/* {
                                                                    getdata === 'Super Admin' ?
                                                                        LeaveRequestEditFormik.touched.group_id &&
                                                                            LeaveRequestEditFormik.errors.group_id && selectGroupName === '' ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.group_id}
                                                                            </div>
                                                                        ) : null : ""
                                                                } */}
                                                                {LeaveRequestEditFormik.touched.group_id &&
                                                                    LeaveRequestEditFormik.errors.group_id && selectGroupName === '' ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.group_id}
                                                                    </div>
                                                                ) : null}

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
                                                                        options={companyOptions}
                                                                        value={selectCompanyName}
                                                                        onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        onChange={(e) => handleCompanyChange(e)}

                                                                    // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('company_id', value)}
                                                                    /> : ""
                                                                }

                                                                {LeaveRequestEditFormik.touched.mode_company_id &&
                                                                    LeaveRequestEditFormik.errors.mode_company_id && selectCompanyName === '' ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.mode_company_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }

                                                    {
                                                        compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' || compyStatus === 'location' ?

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
                                                                            ref={selectCompanyRef}
                                                                            className="basic-single"
                                                                            classNamePrefix="select"
                                                                            placeholder={'Choose a  Location '}
                                                                            name="location_id"
                                                                            options={locationOptions}
                                                                            value={selectLocationName}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                            onChange={(e) => handleLocationChange(e)}
                                                                        /> : ""

                                                                }


                                                                {LeaveRequestEditFormik.touched.location_id &&
                                                                    LeaveRequestEditFormik.errors.location_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.location_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }




                                                </div>
                                                :

                                                <div className="row form-group">



                                                    <div className="col-md-0" hidden>

                                                        <label htmlFor="hf-email">
                                                            Mode
                                                        </label>



                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Mode'}
                                                            value={selectholydaytype}
                                                            name="holiday_type"
                                                            // options={modeOptions}
                                                            onChange={(e) => handleMode(e)}
                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                        />


                                                        {LeaveRequestEditFormik.touched.holiday_type &&
                                                            LeaveRequestEditFormik.errors.holiday_type ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestEditFormik.errors.holiday_type}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    {

                                                        compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' ? <div className="col-md-4">


                                                            {
                                                                getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                    Group <span className="error"> *</span>
                                                                </label> : ""
                                                            }

                                                            {
                                                                getdata === 'Super Admin' ? <Select
                                                                    //  isMulti={true}
                                                                    ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Group '}
                                                                    name="group_id"
                                                                    options={groupOptions}
                                                                    value={selectGroupName}
                                                                    onBlur={LeaveRequestEditFormik.handleBlur}
                                                                    onChange={(e) => handleGroupChange(e)}

                                                                /> : ""

                                                            }


                                                            {LeaveRequestEditFormik.touched.group_id &&
                                                                LeaveRequestEditFormik.errors.group_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestEditFormik.errors.group_id}
                                                                </div>
                                                            ) : null}
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
                                                                        options={companyOptions}
                                                                        value={selectCompanyName}
                                                                        onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        onChange={(e) => handleCompanyChange(e)}

                                                                    // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('company_id', value)}
                                                                    /> : ""
                                                                }

                                                                {LeaveRequestEditFormik.touched.mode_company_id &&
                                                                    LeaveRequestEditFormik.errors.mode_company_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.mode_company_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }


                                                    {
                                                        compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' || compyStatus === 'location' ?

                                                            <div className="col-md-4">
                                                                {
                                                                    getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                        Location <span className="error"> *</span>
                                                                    </label>
                                                                        : ""
                                                                }

                                                                {
                                                                    getdata === 'Super Admin' ? <Select

                                                                        ref={selectCompanyRef}
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'Choose a  Location '}
                                                                        name="location_id"
                                                                        options={locationOptions}
                                                                        value={selectLocationName}
                                                                        onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        onChange={(e) => handleLocationChange(e)}
                                                                    /> : ""

                                                                }


                                                                {LeaveRequestEditFormik.touched.location_id &&
                                                                    LeaveRequestEditFormik.errors.location_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.location_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }



                                                </div>
                                        }

                                        {
                                            leaveRequestEditDetails?.data?.state === 'validate' || leaveRequestEditDetails?.data?.state === 'refuse' || leaveRequestEditDetails?.data?.state === 'cancel' ?
                                                <div className="row form-group" style={{ pointerEvents: 'none' }}>


                                                    {/* {
                                                        compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' || compyStatus === 'location' ?

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
                                                                            ref={selectCompanyRef}
                                                                            className="basic-single"
                                                                            classNamePrefix="select"
                                                                            placeholder={'Choose a  Location '}
                                                                            name="location_id"
                                                                            options={locationOptions}
                                                                            value={selectLocationName}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                            onChange={(e) => handleLocationChange(e)}
                                                                        /> : ""

                                                                }


                                                                {LeaveRequestEditFormik.touched.location_id &&
                                                                    LeaveRequestEditFormik.errors.location_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.location_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    } */}


                                                    {
                                                        compyStatus === 'department' || compyStatus === 'employee' ?
                                                            <div className="col-md-4">

                                                                {
                                                                    getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                        Function <span className="error"> *</span>
                                                                    </label> : ""
                                                                }
                                                                {
                                                                    getdata === 'Super Admin' ? <Select
                                                                        //  isMulti={true}
                                                                        ref={selectCompanyRef}
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'Choose a  Function '}
                                                                        name="department_id"
                                                                        options={functionOptions}
                                                                        value={selectFunction}
                                                                        onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        onChange={(e) => handleFunctionChange(e)}

                                                                    // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('mode_company_id', value)}
                                                                    /> : ""
                                                                }

                                                                {LeaveRequestEditFormik.touched.department_id &&
                                                                    LeaveRequestEditFormik.errors.department_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.department_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''
                                                    }


                                                    {
                                                        compyStatus === 'employee' ? <div className="col-md-4">
                                                            {
                                                                getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                    Employee <span className="error"> *</span>
                                                                </label> : ""
                                                            }
                                                            {
                                                                getdata === 'Super Admin' ? <Select

                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a Employee'}
                                                                    name="employee_id"
                                                                    value={selectEmployee}
                                                                    options={employeeOptions}
                                                                    onBlur={LeaveRequestEditFormik.handleBlur}
                                                                    onChange={(e) => handleEmplyee(e)}
                                                                // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('employee_id', value)}
                                                                /> : ""
                                                            }

                                                            {LeaveRequestEditFormik.touched.employee_id &&
                                                                LeaveRequestEditFormik.errors.employee_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestEditFormik.errors.employee_id}
                                                                </div>
                                                            ) : null}
                                                        </div> : ''
                                                    }

                                                </div>
                                                :
                                                <div className="row form-group">




                                                    {
                                                        compyStatus === 'department' || compyStatus === 'employee' ?
                                                            <div className="col-md-4">

                                                                {
                                                                    getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                        Function <span className="error"> *</span>
                                                                    </label> : ""
                                                                }
                                                                {
                                                                    getdata === 'Super Admin' ? <Select
                                                                        //  isMulti={true}
                                                                        ref={selectCompanyRef}
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'Choose a  Function '}
                                                                        name="department_id"
                                                                        options={functionOptions}
                                                                        value={selectFunction}
                                                                        onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        onChange={(e) => handleFunctionChange(e)}

                                                                    // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('mode_company_id', value)}
                                                                    /> : ""
                                                                }

                                                                {LeaveRequestEditFormik.touched.department_id &&
                                                                    LeaveRequestEditFormik.errors.department_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveRequestEditFormik.errors.department_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''
                                                    }


                                                    {
                                                        compyStatus === 'employee' ? <div className="col-md-4">
                                                            {
                                                                getdata === 'Super Admin' ? <label htmlFor="hf-email">
                                                                    Employee <span className="error"> *</span>
                                                                </label> : ""
                                                            }
                                                            {
                                                                getdata === 'Super Admin' ? <Select

                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a Employee'}
                                                                    name="employee_id"
                                                                    value={selectEmployee}
                                                                    options={employeeOptions}
                                                                    onBlur={LeaveRequestEditFormik.handleBlur}
                                                                    onChange={(e) => handleEmplyee(e)}
                                                                // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('employee_id', value)}
                                                                /> : ""
                                                            }

                                                            {LeaveRequestEditFormik.touched.employee_id &&
                                                                LeaveRequestEditFormik.errors.employee_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveRequestEditFormik.errors.employee_id}
                                                                </div>
                                                            ) : null}
                                                        </div> : ''
                                                    }

                                                </div>
                                        }

                                        {
                                            leaveRequestEditDetails?.data?.state === 'validate' || leaveRequestEditDetails?.data?.state === 'refuse' || leaveRequestEditDetails?.data?.state === 'cancel' ?

                                                <div className="row form-group" style={{ pointerEvents: 'none' }} >

                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Leave Type Name <span className="error"> *</span>
                                                        </label>  <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Leave Type'}
                                                            value={LeaveRequestEditFormik?.data?.holiday_status_id ? LeaveRequestEditFormik?.data?.holiday_status_id : selectleaverequest}
                                                            name="holiday_status_id"
                                                            options={getdata === 'Super Admin' ? leaveTypeOptions : reMainingDaysOptions}
                                                            onChange={(e) => handleLeaveType(e)}
                                                            // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('holiday_status_id', value)}
                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                        />


                                                        {LeaveRequestEditFormik.touched.holiday_status_id &&
                                                            LeaveRequestEditFormik.errors.holiday_status_id && leaveRequestEditDetails?.data?.holiday_status_id ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestEditFormik.errors.holiday_status_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                :
                                                <div className="row form-group">

                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Leave Type Name <span className="error"> *</span>
                                                        </label>  <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Leave Type'}
                                                            value={LeaveRequestEditFormik?.data?.holiday_status_id ? LeaveRequestEditFormik?.data?.holiday_status_id : selectleaverequest}
                                                            name="holiday_status_id"
                                                            options={getdata === 'Super Admin' ? leaveTypeOptions : reMainingDaysOptions}
                                                            onChange={(e) => handleLeaveType(e)}
                                                            // onChange={({ value }) => LeaveRequestEditFormik.setFieldValue('holiday_status_id', value)}
                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                        />


                                                        {LeaveRequestEditFormik.touched.holiday_status_id &&
                                                            LeaveRequestEditFormik.errors.holiday_status_id ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveRequestEditFormik.errors.holiday_status_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                        }

                                        {
                                            leaveRequestEditDetails?.data?.state === 'validate' || leaveRequestEditDetails?.data?.state === 'refuse' || leaveRequestEditDetails?.data?.state === 'cancel' ?

                                                <div className='row mb-3' style={{ pointerEvents: 'none' }}>
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
                                                                            // isOutsideRange={d => d.isSameOrAfter(moment(dateFrom))}
                                                                            id={'request_date_from'}
                                                                            onOutsideClick={true}
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
                                                                        {LeaveRequestEditFormik.touched.request_date_from &&
                                                                            LeaveRequestEditFormik.errors.request_date_from ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.request_date_from}
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
                                                                            value={selectFromtHalf}
                                                                            name="from_half"
                                                                            options={fromHalfOptions}
                                                                            onChange={(e) => handleFromHalf(e)}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveRequestEditFormik.touched.from_half &&
                                                                            LeaveRequestEditFormik.errors.from_half ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.from_half}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <label htmlFor="hf-email">
                                                                            To <span className="error"> *</span>
                                                                        </label>

                                                                        <SingleDatePicker
                                                                            isOutsideRange={d => d.isBefore(moment(dateFromandTo))}
                                                                            id={'request_date_to'}
                                                                            date={dateTo} // momentPropTypes.momentObj or null
                                                                            onDateChange={(date) => handleDateTo(date)} // PropTypes.func.isRequired
                                                                            focused={focusOfTo} // PropTypes.bool
                                                                            onFocusChange={({ focused }) => setFocusOfTo(focused)} // PropTypes.func.isRequired
                                                                            numberOfMonths={1}
                                                                            displayFormat="DD-MM-YYYY"
                                                                            //showClearDate={true}
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

                                                                        {LeaveRequestEditFormik.touched.request_date_to &&
                                                                            LeaveRequestEditFormik.errors.request_date_to ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.request_date_to}
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
                                                                            value={selectToHalf}
                                                                            name="to_half"
                                                                            options={toHalfOptions}
                                                                            onChange={(e) => handleToHalf(e)}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveRequestEditFormik.touched.to_half &&
                                                                            LeaveRequestEditFormik.errors.to_half ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.to_half}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>


                                                                    <div className="col-md-4">
                                                                        <label htmlFor="hf-email">
                                                                            Duration
                                                                        </label>
                                                                        <input
                                                                            // type="text"
                                                                            type="text" step="0.1"
                                                                            name="number_of_days"
                                                                            readOnly
                                                                            value={durationReset}
                                                                            // value={LeaveRequestEditFormik.values.number_of_days}
                                                                            className="form-control"
                                                                            placeholder=" Duration"
                                                                            maxLength={25}
                                                                            onChange={LeaveRequestEditFormik.handleChange}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveRequestEditFormik.touched.number_of_days &&
                                                                            LeaveRequestEditFormik.errors.number_of_days ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.number_of_days}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                </div>



                                                            </CCardBody>
                                                        </CCard>
                                                    </div>


                                                </div>
                                                :
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
                                                                            isOutsideRange={d => d.isBefore(moment(dateFrom))}
                                                                            id={'request_date_from'}
                                                                            date={dateFrom} // momentPropTypes.momentObj or null
                                                                            onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                                                            focused={focusOfInc} // PropTypes.bool
                                                                            onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                                                            numberOfMonths={1}
                                                                            displayFormat="DD-MM-YYYY"
                                                                            //showClearDate={true}
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
                                                                        {LeaveRequestEditFormik.touched.request_date_from &&
                                                                            LeaveRequestEditFormik.errors.request_date_from ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.request_date_from}
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
                                                                            value={selectFromtHalf}
                                                                            name="from_half"
                                                                            options={fromHalfOptions}
                                                                            onChange={(e) => handleFromHalf(e)}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveRequestEditFormik.touched.from_half &&
                                                                            LeaveRequestEditFormik.errors.from_half ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.from_half}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <label htmlFor="hf-email">
                                                                            To <span className="error"> *</span>
                                                                        </label>

                                                                        <SingleDatePicker
                                                                            isOutsideRange={d => d.isBefore(moment(dateFromandTo ? dateFromandTo : dateFrom))}
                                                                            id={'request_date_to'}
                                                                            date={dateTo} // momentPropTypes.momentObj or null
                                                                            onDateChange={(date) => handleDateTo(date)} // PropTypes.func.isRequired
                                                                            focused={focusOfTo} // PropTypes.bool
                                                                            onFocusChange={({ focused }) => setFocusOfTo(focused)} // PropTypes.func.isRequired
                                                                            numberOfMonths={1}
                                                                            displayFormat="DD-MM-YYYY"
                                                                            //showClearDate={true}
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

                                                                        {LeaveRequestEditFormik.touched.request_date_to &&
                                                                            LeaveRequestEditFormik.errors.request_date_to ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.request_date_to}
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
                                                                            value={selectToHalf}
                                                                            name="to_half"
                                                                            options={toHalfOptions}
                                                                            onChange={(e) => handleToHalf(e)}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveRequestEditFormik.touched.to_half &&
                                                                            LeaveRequestEditFormik.errors.to_half ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.to_half}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>


                                                                    <div className="col-md-4">
                                                                        <label htmlFor="hf-email">
                                                                            Duration
                                                                        </label>
                                                                        <input
                                                                            // type="text"
                                                                            type="number" step="0.1"
                                                                            name="number_of_days"
                                                                            readOnly
                                                                            value={durationReset}
                                                                            // value={LeaveRequestEditFormik.values.number_of_days}
                                                                            className="form-control"
                                                                            placeholder=" Duration"
                                                                            maxLength={25}
                                                                            onChange={LeaveRequestEditFormik.handleChange}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveRequestEditFormik.touched.number_of_days &&
                                                                            LeaveRequestEditFormik.errors.number_of_days ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.number_of_days}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                </div>



                                                            </CCardBody>
                                                        </CCard>
                                                    </div>


                                                </div>
                                        }

                                        {
                                            leaveRequestEditDetails?.data?.state === 'validate' ||
                                                leaveRequestEditDetails?.data?.state === 'refuse' ||
                                                leaveRequestEditDetails?.data?.state === 'cancel' ? "" : ''
                                        }

                                        <div className="row mb-3">
                                            {
                                                leaveRequestEditDetails?.data?.employee_id?.leave_manager_id === getUID ?
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
                                                                            value={LeaveRequestEditFormik.values.report_note}
                                                                            maxLength={500}
                                                                            placeholder="Manager's Comment..."
                                                                            onChange={LeaveRequestEditFormik.handleChange}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />

                                                                        {LeaveRequestEditFormik.touched.report_note &&
                                                                            LeaveRequestEditFormik.errors.report_note ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.report_note}
                                                                            </div>
                                                                        ) : null}


                                                                    </div>
                                                                </div>
                                                            </CCardBody>
                                                        </CCard>
                                                    </div>
                                                    :
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
                                                                            readOnly
                                                                            value={LeaveRequestEditFormik.values.report_note}
                                                                            maxLength={500}
                                                                            placeholder="Manager's Comment..."
                                                                            onChange={LeaveRequestEditFormik.handleChange}
                                                                            onBlur={LeaveRequestEditFormik.handleBlur}
                                                                        />

                                                                        {LeaveRequestEditFormik.touched.report_note &&
                                                                            LeaveRequestEditFormik.errors.report_note ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveRequestEditFormik.errors.report_note}
                                                                            </div>
                                                                        ) : null}


                                                                    </div>
                                                                </div>
                                                            </CCardBody>
                                                        </CCard>
                                                    </div>
                                            }

                                        </div>


                                    </div>
                                    <CCardFooter>
                                        <CRow>
                                            <CCol className="col-md-12" align="center">
                                                <CButton type="submit" size="md" color="primary">
                                                    <CIcon name="cil-scrubber" /> Update
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
            )
            }
        </main >
    )
}

export default EditLeaveRequest
