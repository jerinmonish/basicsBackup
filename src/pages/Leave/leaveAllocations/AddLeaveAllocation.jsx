/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LeaveTypesDropDownList, FunctionDropDownList, HREmployeeDropDownList, LocationDropDownList, CommonRemainingDropdown } from '../../../actions/commonAction'
import { LeaveAllocationAddAPI } from '../../../actions/leave'
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
    CTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { indianDateFormat, convertValueLabel } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import CryptoJS from "crypto-js";
import 'react-toastify/dist/ReactToastify.css'
// import { CTimePicker } from '@coreui/react-pro@next'

const AddLeaveAllocation = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const dropdownData = useSelector((state) => state.commonData)
    // console.log("dropdownData", dropdownData);
    //To load dropdown predefined data
    useEffect(() => {
        // dispatch(CompanyDropDownList())
        dispatch(CommonGroupList())
        // dispatch(LocationDropDownList())
        // dispatch(FunctionDropDownList())
        // dispatch(JoblistDropDownList())
        // dispatch(MediumDropDownList())
    }, [dispatch])

    const [gettime, setGetTime] = useState('');
    const [getYearNew, setGetYearNew] = useState('');

    useEffect(() => {
        var today = new Date();
        var getyear = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`

        setGetYearNew(getyear)
        // console.log("today.toLocaleString", getyear);
        var time = today.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', minute60: true })

        // console.log("time", time);
        setGetTime(time)
    })



    const [getdata, setGetdata] = useState();
    const [getgroupData, setgetGroupData] = useState();
    const [getCompyData, setgetCompanyData] = useState();
    const [getLocationData, setgetLocationData] = useState();
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


        // console.log("getdata", getdata);


        dispatch(CommonRemainingDropdown(udetails.employee_id))

    }, [])


    // console.log("admin data", getdata);

    // "regular - Regular Allocation
    // accrual - Accrual Allocation"
    //dropdown 
    const [mode, setMode] = useState();
    const [modeOptions, setModeOptions] = useState([{ value: 'employee', label: 'By Employee' }, { value: 'company', label: 'By Company' }, { value: 'department', label: 'By Function' }, { value: 'location', label: 'By Location' }]);


    const [modetype, setModeType] = useState();
    const [allocationOptions, setAllocationOptions] = useState([{ value: 'regular', label: 'Regular Allocation' }, { value: 'accrual', label: 'Accrual Allocation' }]);


    const [offEveryOptions, setoffEveryOptions] = useState([{ value: 'days', label: 'Days' }, { value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }]);

    const [addOption, setAddOption] = useState([{ value: 'hours', label: 'Hours' }, { value: 'days', label: 'Days' }])
    const [allocationStatus, setAllocationStatus] = useState('regular');

    const [compyStatus, setCompyStatus] = useState('employee');

    const handleMode = (e) => {
        if (e?.value === 'employee') {
            LeaveAllocationAddFormik.setFieldValue("isModeEmployee", 1)
        } else {
            LeaveAllocationAddFormik.setFieldValue("isModeEmployee", 0)
        }
        if (e?.value === 'company') {
            LeaveAllocationAddFormik.setFieldValue("isModeCompany", 1)
        } else {
            LeaveAllocationAddFormik.setFieldValue("isModeCompany", 0)
        }
        if (e?.value === 'department') {
            LeaveAllocationAddFormik.setFieldValue("isModefunction", 1)
        } else {
            LeaveAllocationAddFormik.setFieldValue("isModefunction", 0)
        }
        if (e?.value === 'location') {
            LeaveAllocationAddFormik.setFieldValue("isModeLocation", 1)
        } else {
            LeaveAllocationAddFormik.setFieldValue("isModeLocation", 0)
        }
        setCompyStatus(e?.value)
        if (e) {
            LeaveAllocationAddFormik.setFieldValue('holiday_type', e?.value);
            setMode(convertValueLabel(e.value, e.label));
            // setMode(e?.value)
        }
    }

    // console.log('status=', compyStatus);
    // console.log('status mode=', mode);


    const handleAllocationType = (e) => {
        setAllocationStatus(e?.value)
        // console.log("allocationStatus", allocationStatus);
        if (e) {
            LeaveAllocationAddFormik.setFieldValue('allocation_type', e?.value);
            setModeType(convertValueLabel(e.value, e.label));
        } else {
            setDateFrom(getYearNew)
        }

    }

    const handleofEvery = (e) => {
        // setAllocationStatus(e?.value)
        // console.log("e", e);
        if (e) {
            LeaveAllocationAddFormik.setFieldValue('interval_unit', e?.value);
            // setModeType(convertValueLabel(e.value, e.label));
        }
    }



    const handleofLeaveEvery = (e) => {
        // setAllocationStatus(e?.value)
        // console.log("e", e);
        if (e) {
            LeaveAllocationAddFormik.setFieldValue('interval_unit', e?.value);
            // setModeType(convertValueLabel(e.value, e.label));
        }
    }

    const handleHours = (e) => {
        // setAllocationStatus(e?.value)
        //console.log("e", e);
        if (e) {
            LeaveAllocationAddFormik.setFieldValue('unit_per_interval', e?.value);
            // setModeType(convertValueLabel(e.value, e.label));
        }
    }

    // console.log("cmp", allocationStatus);


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


    const [findHours, setFindHours] = useState([]);
    useEffect(() => {
        let getHours = []
        for (let i = 1; i <= 12; i++) {
            getHours.push(convertValueLabel((i > 9 ? "" + i : "0" + i), (i > 9 ? "" + i : "0" + i)));
        }
        setFindHours(getHours)
        // console.log('mits', findHours);
    }, [])

    // console.log("hrs", findHours);

    const [findmins, setFindMins] = useState([]);

    useEffect(() => {
        // let i = 0;
        let getMM = []
        for (let i = 1; i <= 59; i++) {
            getMM.push(convertValueLabel((i > 9 ? "" + i : "0" + i), (i > 9 ? "" + i : "0" + i)));
        }
        setFindMins(getMM)
        // console.log('mits', findmins);
    }, [])
    // useEffect(() => {
    //     // console.log();
    //     let getMinits = []
    //     for (let i = 0; i <= 59; i++) {
    //         getMinits.push(convertValueLabel(i, i));
    //     }
    //     setFindMints(getMinits)
    //     console.log('mits', findmints);
    // }, [])

    const [addAmPm, setAddAMPm] = useState([{ value: 'am', label: 'AM' }, { value: 'pm', label: 'PM' }])
    const [groupChanged, setGroupChanged] = useState(0);
    const [companyChanged, setCompanyChanged] = useState(0);
    const [locationChanged, setLocationChanged] = useState(0);
    const [functionChanged, setFunctionChanged] = useState(0);


    // to load the option data for dropdown
    const groupOptions = dropdownData?.groupComData?.data?.result
    const leaveTypeOptions = dropdownData?.leaveTypesCommonData?.data?.result
    const [companyOptions, setCompanyOptions] = useState([]);
    const [functionOptions, setFunctionOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    // const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);


    const [todateChange, setTodateChange] = useState([]);

    // const mydate
    // const handleMode = (e) => {
    //     setCompyStatus(e?.value)
    //     if (e) {
    //         LeaveAllocationAddFormik.setFieldValue('holiday_type', e?.value);
    //         setMode(convertValueLabel(e.value, e.label));
    //     }
    // }


    const [hoursFinal, setHoursFinal] = useState([]);
    const handleHoursfrom = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationAddFormik.setFieldValue('my_hours', e?.value)
        setHoursFinal(e?.value)

    }

    const [minitsFinal, setMinitsFinal] = useState([]);
    const handleMinitsfrom = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationAddFormik.setFieldValue('my_minits', e?.value)
        setMinitsFinal(e?.value)

    }

    const [amPmFinal, setamPmFinal] = useState([]);
    const handleAmPmfrom = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationAddFormik.setFieldValue('my_ampm', e?.value)
        setamPmFinal(e?.value)

    }

    // to
    const [hoursFinalto, setHoursFinalTo] = useState([]);
    const handleHoursTo = (e) => {
        // console.log("log-e", e?.value);
        // console.log("findHours", hoursFinal);
        // console.log("mints", minitsFinal);
        // console.log("am", amPmFinal);
        setHoursFinalTo(e?.value)

        // if (amPmFinal != 'am') {
        //     setHoursFinalTo(e?.value)
        // }
        // else if (hoursFinal < e?.value) {

        // }
        // if (amPmFinal === 'am' && e?.value > hoursFinal) {
        //     // setHoursFinalTo(e?.value)
        // }

        // LeaveAllocationAddFormik.setFieldValue('my_hours', e?.value)
    }

    const [title, setTitle] = useState()
    const [daysPerMonth, setDaysPerMonth] = useState()
    const [daysPermonthfinal, setDaysPermonthfinal] = useState()

    // inputPassword = event => {
    //     this.setState({ password: event.target.value });
    // };

    // confirmPassword = event => {
    //     this.setState({ c_password: event.target.value });
    // };


    const handlechangevalidation = (e) => {


        console.log("Days per month handlechangevalidation ", e);
        console.log("Days per month handlechangevalidation-dayspermonth ", daysPermonthfinal);
        // setDaysPerMonth([''])
        // // console.log('e', e);
        // if (e != undefined) {
        //
        // }
        // LeaveAllocationAddFormik.setFieldValue('number_of_days', daysPerMonth);
        // console.log('Days per year', title);

        // console.log('daysPerMonth', daysPerMonth);
        // {
        //     title > e ? LeaveAllocationAddFormik.setFieldValue('number_of_days', daysPerMonth) : toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty',
        //         { position: toast.POSITION.TOP_RIGHT })
        // }

        // console.log("  Days per year title", title);
        // console.log(" Days per month e", e);

        setDaysPermonthfinal(e)
        if (e.length <= 0) {
            toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty', { position: toast.POSITION.TOP_RIGHT })
        } else if (parseInt(title) <= parseInt(e)) {
            toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty', { position: toast.POSITION.TOP_RIGHT })
        } else {
            LeaveAllocationAddFormik.setFieldValue('number_of_days', daysPerMonth);
        }
        // if (1 <= title && e != '' && e <= 3) {
        //     LeaveAllocationAddFormik.setFieldValue('number_of_days', daysPerMonth);
        // } else {
        //     toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty',
        //         { position: toast.POSITION.TOP_RIGHT })
        // }

        // if (title >= e) {
        //     console.log(' in if Days per year', title);
        //     console.log(" in if Days per month", e);
        //     console.log("abc");
        //     LeaveAllocationAddFormik.setFieldValue('number_of_days', daysPerMonth);
        // }

        // if (title < e) {
        //     console.log(' in else Days per year', title);
        //     console.log(" in else Days per month", e);
        //     console.log("def");
        //     toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty',
        //         { position: toast.POSITION.TOP_RIGHT })
        // }

    }

    // console.log("title", title);
    const [minitsFinalto, setMinitsFinalTo] = useState([]);
    const handleMinitsTo = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationAddFormik.setFieldValue('my_minits', e?.value)
        setMinitsFinalTo(e?.value)

    }

    const [amPmFinalto, setamPmFinalTo] = useState([]);
    const handleAmPmTo = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationAddFormik.setFieldValue('my_ampm', e?.value)
        setamPmFinalTo(e?.value)

    }

    // console.log('finaldate', indianDateFormat(dateFrom) + ' ' + hoursFinal + ':' + minitsFinal + ' ' + amPmFinal);
    const handleDateOfInc = (date) => {
        // let curDT = new Date().toLocaleTimeString()

        // console.log("date", hoursFinal);
        // findHours,findmints
        setTodateChange(date)
        if (date) {
            setDateFrom(date)
            LeaveAllocationAddFormik.setFieldValue('date_from', indianDateFormat(date));
        }
    }

    const handleDateTo = (date) => {
        if (date) {
            setDateTo(date)
            LeaveAllocationAddFormik.setFieldValue('date_to', indianDateFormat(date._d));
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

    // useEffect(() => {
    //     // console.log("dropdownData?.functionCommonData?", dropdownData);
    //     if (dropdownData?.functionCommonData?.data?.result && dropdownData?.leaveTypesCommonData?.data?.result && dropdownData?.locationCommonData?.data?.result && companyChanged === 1) {
    //         setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
    //         setLeaveTypeOptions(dropdownData?.leaveTypesCommonData?.data?.result);
    //         setLocationOptions(dropdownData?.locationCommonData?.data?.result)
    //         // setLocationOptions(convertValueLabel([]));
    //     }
    // }, [dropdownData?.functionCommonData?.data?.result, dropdownData?.leaveTypesCommonData?.data?.result, dropdownData?.locationCommonData?.data?.result, companyChanged])

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

    const [groupName, setGroupName] = useState([])
    const [compyName, setCompyName] = useState([])
    const [locationName, setLocationName] = useState([])
    const [functionName, setFunctionName] = useState('')
    const [empName, setEmpName] = useState([])

    // console.log("fun", functionName);
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
            setGroupName(convertValueLabel(e?.value, e?.label))
            LeaveAllocationAddFormik.setFieldValue('group_id', e.value)
            // onCompanyClear();

            setCompyName([''])
            setLocationName([''])
            setFunctionName([''])
            onEmployeeClear();
            setGroupChanged(1);
            // setLocationOptions(convertValueLabel([]));

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
                    // 'company.location': "[['mode_company_id', '=', " + e?.value + ']]',
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
            setCompyName(convertValueLabel(e?.value, e?.label))
            LeaveAllocationAddFormik.setFieldValue('mode_company_id', e.value)
            setLocationName([''])
            setFunctionName([''])
            onEmployeeClear()
            setCompanyChanged(1);

        }
    }


    const handleLocationChange = (e) => {

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
                setLocationName(convertValueLabel(e?.value, e?.label))
                LeaveAllocationAddFormik.setFieldValue('location_id', e?.value)
                setFunctionName([''])
                // onFunctionClear()
                // onEmployeeClear()
                // setJobOptions(convertValueLabel([]));

                // setSubFunctionValues([])
                setLocationChanged(1)
                // setLocationChanged(1)
                // setLocationValues(locationListValues);
            }

        }


    }





    const handleFunctionChange = (e) => {
        // onEmployeeClear()
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
            setFunctionName(convertValueLabel(e?.value, e?.label))
            LeaveAllocationAddFormik.setFieldValue('department_id', e?.value)
            // onFunctionClear()
            // onEmployeeClear()
            setFunctionChanged(1)
            onEmployeeClear()
            // setJobOptions(convertValueLabel([]));

        }
    }

    const handleEmployee = (e) => {

        setEmpName(convertValueLabel(e?.value, e?.label))
        LeaveAllocationAddFormik.setFieldValue('employee_id', e?.value)

    }

    const [leaveTypeName, setLeaveTypeName] = useState([])



    const handleLeaveTypeByCompy = (e) => {
        // onEmployeeClear()
        if (e?.value) {

            const sendGpparamsleave = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                    filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + e?.value + ']]]',
                },
            }
            dispatch(LeaveTypesDropDownList(sendGpparamsleave))
            setLeaveTypeName(convertValueLabel(e?.value, e?.label))
            LeaveAllocationAddFormik.setFieldValue('holiday_status_id', e?.value)
            // onFunctionClear()
            // onEmployeeClear()
            // setFunctionChanged(1)
            // onEmployeeClear()
            // setJobOptions(convertValueLabel([]));

        }
    }



    const handleChangeExtradays = (e) => {
        // console.log('data', e);
    }




    const validate = (values) => {
        const errors = {};

        // if (allocationStatus === 'regular') {
        //     values.number_of_days_display = title
        //     values.number_of_days_month = daysPermonthfinal
        //     // return errors;
        // }

        if (allocationStatus === 'accrual') {
            if (!values.date_from) {
                errors.date_from = 'This field is required.';
            }
            // if (!values.unit_per_interval) {
            //     errors.unit_per_interval = 'This field is required.';
            // }
            if (!values.number_per_interval) {
                errors.number_per_interval = 'This field is required.';
            }
            if (!values.interval_number) {
                errors.interval_number = 'This field is required.';
            }
            return errors;
        }

        // if (getdata === 'Super Admin') {

        //     if (!values.group_id) {
        //         errors.group_id = 'This field is required.';
        //     }
        //     if (!values.mode_company_id) {
        //         errors.mode_company_id = 'This field is required.';
        //     }
        //     if (!values.location_id) {
        //         errors.location_id = 'This field is required.';
        //     }
        //     if (!values.department_id) {
        //         errors.department_id = 'This field is required.';
        //     }
        //     if (!values.employee_id) {
        //         errors.employee_id = 'This field is required.';
        //     }

        //     return errors;
        // }
        // else {
        //     values.group_id = getgroupData
        //     values.mode_company_id = getCompyData
        //     values.department_id = getFunctionData
        //     values.location_id = getLocationData
        //     // values.holiday_type = 'employee'
        //     values.employee_id = getEmpData
        // }

    };

    const LeaveAllocationAddFormik = useFormik({
        initialValues: {
            name: '',
            holiday_status_id: '',
            allocation_type: '',
            date_from: '',
            date_to: '',
            number_per_interval: '',
            unit_per_interval: '',
            number_of_days_month: 0,
            interval_number: '',
            interval_unit: '',
            number_of_days_display: 0,
            holiday_type: '',
            group_id: '',
            number_of_days: "",
            mode_company_id: '',
            department_id: '',
            employee_id: '',
            location_id: '',
            notes: '',
        },
        validate,
        validationSchema: Yup.object(
            {
                holiday_type: Yup.string().required('This field is required'),
                allocation_type: Yup.string().required('This field is required'),
                group_id: Yup.string().required('This field is required'),
                mode_company_id: Yup.string().required('This field is required'),
                holiday_status_id: Yup.string().required('This field is required'),
                name: Yup.string().required('This field is required'),

                isModeEmployee: Yup.boolean(),
                employee_id: Yup.string().when('isModeEmployee', {
                    is: true,
                    then: Yup.string().required('This field is required')
                }),

                isModefunction: Yup.boolean(),
                department_id: Yup.string().when('isModefunction', {
                    is: true,
                    then: Yup.string().required('This field is required')
                }),

                isModeLocation: Yup.boolean(),
                location_id: Yup.string().when('isModeLocation', {
                    is: true,
                    then: Yup.string().required('This field is required')
                }),

            },
        ),

        // validate,
        onSubmit: (values) => {
            delete values.isModeCompany;
            delete values.isModeLocation;
            delete values.isModefunction;
            delete values.isModeEmployee;

            if (allocationStatus === 'regular') {
                values.date_from = ''
                values.date_to = ""
            } else {
                values.date_from = values.date_from + ' ' + gettime
                values.date_to = values.date_to + ' ' + gettime
            }
            //console.log(values);
            const formData = JSON.stringify({ params: { data: values } })
            //console.log(formData);
            dispatch(LeaveAllocationAddAPI(formData, history))
        },
    })

    const handleNoDaysDisplay = (e) => {

        //if(e.target.value){
        LeaveAllocationAddFormik.setFieldValue('number_of_days_display', e.target.value);
        setTitle(e.target.value)
        //}
    }

    // console.log("location", getLocationData);
    // console.log("function", getFunctionData);
    // console.log("empyid", getEmpData);

    // var time = new Date();
    // console.log(
    //     time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', minute60: true })
    // );

    return (
        <main className="c-main">
            <CFade>
                <CContainer fluid>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol col="6" className="left">
                                    <strong> Add Leave Allocation</strong>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={LeaveAllocationAddFormik.handleSubmit} className="form-horizontal">
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
                                                onChange={LeaveAllocationAddFormik.handleChange}
                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                            />
                                            {/* <input
                                                                type="text"
                                                                name="name"
                                                                // value={LeaveAllocationAddFormik.values.name}
                                                                className="form-control"
                                                                placeholder=" Description"
                                                                maxLength={25}
                                                                onChange={LeaveAllocationAddFormik.handleChange}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                            /> */}
                                            {LeaveAllocationAddFormik.touched.name &&
                                                LeaveAllocationAddFormik.errors.name ? (
                                                <div className="help-block text-danger">
                                                    {LeaveAllocationAddFormik.errors.name}
                                                </div>
                                            ) : null}
                                        </div>

                                    </div>

                                    {
                                        getdata === 'Super Admin' ?
                                            <div className="row form-group">

                                                <div className="col-md-4">
                                                    <label htmlFor="hf-email">
                                                        Mode <span className="error"> *</span>
                                                    </label>
                                                    <Select
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        placeholder={'Choose a Mode'}
                                                        value={mode}
                                                        name="holiday_type"
                                                        options={modeOptions}
                                                        onChange={(e) => handleMode(e)}
                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                    />
                                                    {LeaveAllocationAddFormik.touched.holiday_type &&
                                                        LeaveAllocationAddFormik.errors.holiday_type ? (
                                                        <div className="help-block text-danger">
                                                            {LeaveAllocationAddFormik.errors.holiday_type}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                {

                                                    compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' ?
                                                        <div className="col-md-4">
                                                            <label htmlFor="hf-email">
                                                                Group <span className="error"> *</span>
                                                            </label>
                                                            <Select
                                                                //  isMulti={true}

                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a  Group '}
                                                                name="group_id"
                                                                options={groupOptions}
                                                                value={groupName}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                onChange={(e) => handleGroupChange(e)}

                                                            // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('company_id', value)}
                                                            />
                                                            {LeaveAllocationAddFormik.touched.group_id &&
                                                                LeaveAllocationAddFormik.errors.group_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveAllocationAddFormik.errors.group_id}
                                                                </div>
                                                            ) : null}
                                                        </div> : ''

                                                }

                                                {
                                                    compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' ?
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
                                                                name="mode_company_id"
                                                                options={companyOptions}
                                                                value={compyName}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                onChange={(e) => handleCompanyChange(e)}

                                                            // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('company_id', value)}
                                                            />
                                                            {LeaveAllocationAddFormik.touched.mode_company_id &&
                                                                LeaveAllocationAddFormik.errors.mode_company_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveAllocationAddFormik.errors.mode_company_id}
                                                                </div>
                                                            ) : null}
                                                        </div> : ""
                                                }


                                            </div>

                                            : ""
                                    }




                                    {
                                        getdata === 'Super Admin' ?

                                            <div className="row form-group">

                                                {
                                                    compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' ?
                                                        <div className="col-md-4">
                                                            <label htmlFor="hf-email">
                                                                Location <span className="error"> *</span>
                                                            </label>
                                                            <Select
                                                                //  isMulti={true}
                                                                ref={selectLocationRef}
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a  Location '}
                                                                name="location_id"
                                                                options={locationOptions}
                                                                value={locationName}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                onChange={(e) => handleLocationChange(e)}

                                                            // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('company_id', value)}
                                                            />
                                                            {LeaveAllocationAddFormik.touched.location_id &&
                                                                LeaveAllocationAddFormik.errors.location_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveAllocationAddFormik.errors.location_id}
                                                                </div>
                                                            ) : null}
                                                        </div> : ""
                                                }



                                                {
                                                    compyStatus === 'department' || compyStatus === 'employee' ?


                                                        <div className="col-md-4">

                                                            <label htmlFor="hf-email">
                                                                Function <span className="error"> *</span>
                                                            </label>
                                                            <Select
                                                                //  isMulti={true}
                                                                ref={selectFunctionRef}
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a  Function '}
                                                                name="department_id"
                                                                options={functionOptions}
                                                                value={functionName}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                onChange={(e) => handleFunctionChange(e)}

                                                            // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('mode_company_id', value)}
                                                            />
                                                            {LeaveAllocationAddFormik.touched.department_id &&
                                                                LeaveAllocationAddFormik.errors.department_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveAllocationAddFormik.errors.department_id}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        : ''
                                                }


                                                {
                                                    compyStatus === 'employee' ?

                                                        <div className="col-md-4">
                                                            <label htmlFor="hf-email">
                                                                Employee<span className="error"> *</span>
                                                            </label>
                                                            <Select
                                                                ref={selectEmployeeRef}
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                placeholder={'Choose a Employee'}
                                                                name="employee_id"
                                                                value={empName}
                                                                options={employeeOptions}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                onChange={(e) => handleEmployee(e)}
                                                            // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('employee_id', value)}
                                                            />
                                                            {LeaveAllocationAddFormik.touched.employee_id ||
                                                                LeaveAllocationAddFormik.errors.employee_id ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveAllocationAddFormik.errors.employee_id}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        : ''
                                                }
                                            </div>
                                            :
                                            ""
                                    }



                                    <div className="row form-group">
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                Leave Type Name <span className="error"> *</span>
                                            </label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                placeholder={'Choose a Leave Type'}
                                                value={leaveTypeName}
                                                name="holiday_status_id"
                                                options={leaveTypeOptions}
                                                // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('holiday_status_id', value)}
                                                onChange={(e) => handleLeaveTypeByCompy(e)}
                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                            />
                                            {LeaveAllocationAddFormik.touched.holiday_status_id &&
                                                LeaveAllocationAddFormik.errors.holiday_status_id ? (
                                                <div className="help-block text-danger">
                                                    {LeaveAllocationAddFormik.errors.holiday_status_id}
                                                </div>
                                            ) : null}
                                        </div>


                                        {
                                            getdata === 'Super Admin' ?
                                                <div className="col-md-4">
                                                    <label htmlFor="hf-email">
                                                        Allocation Type <span className="error"> *</span>
                                                    </label>
                                                    <Select
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        placeholder={'Choose a  Allocation Type'}
                                                        value={modetype}
                                                        name="allocation_type"
                                                        options={allocationOptions}
                                                        onChange={(e) => handleAllocationType(e)}
                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                    />
                                                    {LeaveAllocationAddFormik.touched.allocation_type &&
                                                        LeaveAllocationAddFormik.errors.allocation_type ? (
                                                        <div className="help-block text-danger">
                                                            {LeaveAllocationAddFormik.errors.allocation_type}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                :
                                                ""
                                        }



                                    </div>

                                    {
                                        allocationStatus === 'accrual' ? <div className='row mb-3'>
                                            <div className='col-md-12'>
                                                <CCard className="mb-4">
                                                    <CCardHeader id="headingTwo " className="header">
                                                        <div>
                                                            <h5 className="m-0 p-0">Dates</h5>
                                                        </div>
                                                    </CCardHeader>
                                                    <CCardBody>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    From <span className="error"> *</span>
                                                                </label>
                                                                {/* <CDatePicker locale="en-US" timepicker /> */}
                                                                {/* <CDatePicker date="2023/03/15 02:22:13 PM" locale="en-US" timepicker /> */}
                                                                {/* <CTimePicker locale="en-US" /> */}
                                                                <SingleDatePicker
                                                                    id={'date_from'}
                                                                    date={allocationStatus === 'regular' ? getYearNew : dateFrom}
                                                                    // date={dateFrom} // momentPropTypes.momentObj or null
                                                                    onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                                                    focused={focusOfInc} // PropTypes.bool
                                                                    onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                                                    numberOfMonths={1}
                                                                    displayFormat="DD-MM-YYYY"
                                                                    // Timezone={"DD-MM-YYYY"}
                                                                    //showClearDate={true}
                                                                    isOutsideRange={d => d.isSame(moment())}
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
                                                                                        <option value={value} key={`date_from${value}`}>{label}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div>
                                                                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                                                    {yearsDD('date_from')}
                                                                                </select>
                                                                            </div>
                                                                        </div>}
                                                                />
                                                                {/* {
                                                                        allocationStatus === 'regular' ? '' :
                                                                            LeaveAllocationAddFormik.touched.date_from && LeaveAllocationAddFormik.errors.date_from ?
                                                                                (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationAddFormik.errors.date_from}
                                                                                    </div>) : null
                                                                    } */}

                                                                {/* { && dateFrom?._isValid == true} */}

                                                                {LeaveAllocationAddFormik.touched.date_from &&
                                                                    LeaveAllocationAddFormik.errors.date_from ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationAddFormik.errors.date_from}
                                                                    </div>
                                                                ) : null}
                                                            </div>


                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    To
                                                                </label>
                                                                <SingleDatePicker
                                                                    id={'date_to'}
                                                                    date={dateTo} // momentPropTypes.momentObj or null
                                                                    onDateChange={(date) => handleDateTo(date)} // PropTypes.func.isRequired
                                                                    focused={focusOfTo} // PropTypes.bool
                                                                    onFocusChange={({ focused }) => setFocusOfTo(focused)} // PropTypes.func.isRequired
                                                                    numberOfMonths={1}
                                                                    displayFormat="DD-MM-YYYY"
                                                                    //showClearDate={true}
                                                                    isOutsideRange={d => d.isBefore(moment(todateChange))}
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
                                                                                        <option value={value} key={`date_to${value}`}>{label}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div>
                                                                                <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                                                    {yearsDD('date_to')}
                                                                                </select>
                                                                            </div>
                                                                        </div>}
                                                                />

                                                                {LeaveAllocationAddFormik.touched.date_to &&
                                                                    LeaveAllocationAddFormik.errors.date_to ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationAddFormik.errors.date_to}
                                                                    </div>
                                                                ) : null}
                                                            </div>

                                                            <div className="col-md-2">
                                                                <label htmlFor="hf-email">
                                                                    Extra Days
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="number_of_days_display"
                                                                    // value={LeaveAllocationAddFormik.values.name}
                                                                    className="form-control"
                                                                    placeholder="Extra Days"
                                                                    value={0.0}
                                                                    // step="0.1"
                                                                    maxLength={2}
                                                                    onChange={e => handleNoDaysDisplay(e)}
                                                                    // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('date_from', value)}
                                                                    // onChange={(value) => handleChangeExtradays(value)}
                                                                    // onChange={LeaveAllocationAddFormik.handleChange}
                                                                    onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                />
                                                                {LeaveAllocationAddFormik.touched.number_of_days_display &&
                                                                    LeaveAllocationAddFormik.errors.number_of_days_display ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationAddFormik.errors.number_of_days_display}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-2" style={{ marginTop: '33px' }}>
                                                                <label htmlFor="hf-email">
                                                                    Days per year
                                                                </label>
                                                            </div>


                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Add <span className="error"> *</span>
                                                                </label>
                                                                <div className="row">
                                                                    <div className="col-lg-8">
                                                                        <input
                                                                            type="number"
                                                                            name="number_per_interval"
                                                                            // value={LeaveAllocationAddFormik.values.number_per_interval}
                                                                            className="form-control"
                                                                            placeholder=" Add"
                                                                            title='Only number'
                                                                            maxLength={25}
                                                                            onChange={LeaveAllocationAddFormik.handleChange}
                                                                            onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                        />

                                                                        {LeaveAllocationAddFormik.touched.number_per_interval &&
                                                                            LeaveAllocationAddFormik.errors.number_per_interval ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationAddFormik.errors.number_per_interval}
                                                                            </div>
                                                                        ) : null}

                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <Select
                                                                            className="basic-single"
                                                                            classNamePrefix="select"
                                                                            placeholder={'select.'}
                                                                            // value={modetype}

                                                                            name="unit_per_interval"
                                                                            options={addOption}
                                                                            onChange={(e) => handleHours(e)}
                                                                            onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                        />

                                                                        {LeaveAllocationAddFormik.touched.unit_per_interval &&
                                                                            LeaveAllocationAddFormik.errors.unit_per_interval ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationAddFormik.errors.unit_per_interval}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="col-md-4 ">

                                                                <label htmlFor="hf-email">
                                                                    Of Leave every <span className="error"> *</span>
                                                                </label>
                                                                <div className="row">
                                                                    <div className="col-lg-8">
                                                                        <input
                                                                            type="number"
                                                                            name="interval_number"
                                                                            // value={ }
                                                                            // onChange={e => setTitle(e.target.value)}
                                                                            // value={LeaveAllocationAddFormik.values.name}
                                                                            className="form-control"
                                                                            placeholder=" Of Leave every"
                                                                            maxLength={25}
                                                                            title='Only number'
                                                                            // onChange={(e) => handleofLeaveEvery(e)}
                                                                            onChange={LeaveAllocationAddFormik.handleChange}
                                                                            onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                        />

                                                                        {LeaveAllocationAddFormik.touched.interval_number &&
                                                                            LeaveAllocationAddFormik.errors.interval_number ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationAddFormik.errors.interval_number}
                                                                            </div>
                                                                        ) : null}

                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <Select
                                                                            className="basic-single"
                                                                            classNamePrefix="select"
                                                                            placeholder={'select'}
                                                                            // value={modetype}
                                                                            name="interval_unit"
                                                                            options={offEveryOptions}
                                                                            onChange={(e) => handleofEvery(e)}
                                                                            onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                        />

                                                                        {LeaveAllocationAddFormik.touched.interval_unit &&
                                                                            LeaveAllocationAddFormik.errors.interval_unit ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationAddFormik.errors.interval_unit}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>

                                                    </CCardBody>
                                                </CCard>
                                            </div>


                                        </div>
                                            : ""

                                    }

                                    {
                                        allocationStatus === 'regular' ?
                                            <div className='row mb-3'>
                                                <div className='col-md-12'>
                                                    <CCard className="mb-4">
                                                        <CCardHeader id="headingTwo " className="header">
                                                            <div>
                                                                <h5 className="m-0 p-0">Duration</h5>
                                                            </div>
                                                        </CCardHeader>
                                                        <CCardBody>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <input
                                                                        type="number"
                                                                        name="number_of_days_display"
                                                                        className="form-control"
                                                                        placeholder="Days per year"
                                                                        value={title}
                                                                        // onChange={e => setTitle(e.target.value)}
                                                                        maxLength={2}
                                                                        // max={2}
                                                                        // onChange={LeaveAllocationAddFormik.handleChange}
                                                                        onChange={e => handleNoDaysDisplay(e)}
                                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                    />
                                                                    {LeaveAllocationAddFormik.touched.number_of_days_display &&
                                                                        LeaveAllocationAddFormik.errors.number_of_days_display ? (
                                                                        <div className="help-block text-danger">
                                                                            {LeaveAllocationAddFormik.errors.number_of_days_display}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                                <div className="col-md-2 mt-2 mr-2">
                                                                    <label htmlFor="hf-email">
                                                                        Days per year
                                                                    </label>
                                                                </div>
                                                                <div className="col-md-3">

                                                                    <input
                                                                        type="number"
                                                                        name="number_of_days_month"
                                                                        // value={LeaveAllocationAddFormik.values.name}
                                                                        // max={2}
                                                                        className="form-control"
                                                                        placeholder="Days per month"
                                                                        value={daysPerMonth}
                                                                        maxLength={2}
                                                                        onChange={LeaveAllocationAddFormik.handleChange}
                                                                        onKeyUp={e => handlechangevalidation(e.target.value)}

                                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                    />
                                                                    {LeaveAllocationAddFormik.touched.number_of_days_month &&
                                                                        LeaveAllocationAddFormik.errors.number_of_days_month ? (
                                                                        <div className="help-block text-danger">
                                                                            {LeaveAllocationAddFormik.errors.number_of_days_month}
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                                <div className="col-md-2 mt-2 mr-2">
                                                                    <label htmlFor="hf-email">
                                                                        Days per month
                                                                    </label>
                                                                </div>

                                                            </div>


                                                        </CCardBody>
                                                    </CCard>
                                                </div>
                                            </div> : ""
                                    }

                                    <div className="row mb-3">

                                        <div className='col-md-12'>
                                            <CCard className="mb-4">
                                                <CCardHeader id="headingTwo " className="header">
                                                    <div>
                                                        <h5 className="m-0 p-0">Reason</h5>
                                                    </div>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <CTextarea
                                                                name="notes"
                                                                id="textarea-input"
                                                                rows="3"
                                                                // value={LeaveAllocationAddFormik.values.name}
                                                                maxLength={500}
                                                                placeholder="Reason..."
                                                                onChange={LeaveAllocationAddFormik.handleChange}
                                                                onBlur={LeaveAllocationAddFormik.handleBlur}
                                                            />

                                                            {LeaveAllocationAddFormik.touched.notes &&
                                                                LeaveAllocationAddFormik.errors.notes ? (
                                                                <div className="help-block text-danger">
                                                                    {LeaveAllocationAddFormik.errors.notes}
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
                                            <Link className="ml-3 btn btn-danger" to={'/leave/leaveAllocation'}>
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

export default AddLeaveAllocation
