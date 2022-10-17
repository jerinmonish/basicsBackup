/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LeaveTypesDropDownList, FunctionDropDownList, HREmployeeDropDownList, LocationDropDownList, CommonRemainingDropdown } from '../../../actions/commonAction'
import { LeaveAllocationEditAPI, LeaveAllocationUpdateAPI, LeaveAllocationApprove, LeaveAllocationRefuse, LeaveAllocationDraft, LeaveAllocationSecondApprove, LeaveAllocationConfirm, LeaveAllocationList } from '../../../actions/leave'
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
import { indianDateFormat, convertValueLabel, decryptSingleData, convertDateToMDY } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { dateFormat } from 'highcharts'
import { MultiStepForm, Step } from 'react-multi-form';
import { toast } from 'react-toastify'
import CryptoJS from "crypto-js";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CLoader from 'src/pages/loader/CLoader'
// import { CTimePicker } from '@coreui/react-pro@next'

const EditLeaveAllocation = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const dropdownData = useSelector((state) => state.commonData)
    // console.log("dropdownData",dropdownData);
    //To load dropdown predefined data

    const [getdata, setGetdata] = useState([]);
    const [getgroupData, setgetGroupData] = useState();
    const [getCompyData, setgetCompanyData] = useState();
    const [getLocationData, setgetLocationData] = useState();
    const [getFunctionData, setgetFunctionData] = useState();
    const [getEmpData, setgetEmpData] = useState();
    useEffect(() => {
        let Udata = localStorage.getItem('udata');
        const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
        const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
        // /console.log("byts", udetails);
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
        dispatch(CommonRemainingDropdown(udetails.employee_id))

    }, [])
    useEffect(() => {
        // dispatch(CompanyDropDownList())
        dispatch(CommonGroupList())
        // dispatch(LocationDropDownList())
        // dispatch(FunctionDropDownList())
        // dispatch(JoblistDropDownList())
        // dispatch(MediumDropDownList())
    }, [])

    // update
    useEffect(() => {
        // dispatch(CompanyDropDownList());
        // dispatch(CommonGroupList())
        if (props?.match?.params?.id) {
            // console.log(props?.match?.params?.id);
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }

    }, []);

    const { leaveAllocationEditDetails, isLoading } = useSelector(state => state.leaveBackend);

    useEffect(() => {

        var newid = decryptSingleData(props?.match?.params?.id)
        // console.log("neee", newid);
        if (newid) {
            const datavalue = {
                "params": {
                    "kwargs": {
                        "ids": [newid]
                    }
                }
            }


            // dispatch(LeaveAllocationApprove(datavalue, history));
        }

    }, []);

    const { leaveAllocationApprove } = useSelector(state => state.leaveBackend);




    // "regular - Regular Allocation
    // accrual - Accrual Allocation"
    //dropdown 
    const [mode, setMode] = useState();
    const [modeOptions, setModeOptions] = useState([{ value: 'employee', label: 'By Employee' }, { value: 'company', label: 'By Company' }, { value: 'department', label: 'By Function' }, { value: 'location', label: 'By Location' }]);


    const [modetype, setModeType] = useState([]);
    const [allocationOptions, setAllocationOptions] = useState([{ value: 'regular', label: 'Regular Allocation' }, { value: 'accrual', label: 'Accrual Allocation' }]);


    const [offEveryOptions, setoffEveryOptions] = useState([{ value: 'days', label: 'Days' }, { value: 'weeks', label: 'Weeks' }, { value: 'months', label: 'Months' }, { value: 'years', label: 'Years' }]);

    const [addOption, setAddOption] = useState([{ value: 'hours', label: 'Hours' }, { value: 'days', label: 'Days' }])
    const [allocationStatus, setAllocationStatus] = useState([]);

    const [compyStatus, setCompyStatus] = useState();

    const [positionStatus, setPositionStatus] = useState([{ value: "draft", label: 'To Submit' }, { value: "confirm", label: 'To Approve' }, { value: 'validate1', label: 'Second Approval' }, { value: 'validate', label: 'Approved' }, { value: 'refuse', label: 'Refused' }, { value: "cancel", label: 'Cancelled' }])

    // const handleMode = (e) => {
    //     setCompyStatus(e?.value)
    //     if (e) {

    //         setSelectHolydayType(convertValueLabel(e.value, e.label));
    //         LeaveRequestEditFormik.setFieldValue('holiday_type', e?.value);
    //     }
    // }
    const handleMode = (e) => {
        console.log("current state", e?.value);
        // console.log("prestate", previousState);
        console.log("prestate", previousMode);

        if (e?.value === 'employee') {
            LeaveAllocationEditFormik.setFieldValue("isModeEmployee", 1)
        } else {
            LeaveAllocationEditFormik.setFieldValue("isModeEmployee", 0)
        }
        if (e?.value === 'company') {
            LeaveAllocationEditFormik.setFieldValue("isModeCompany", 1)
        } else {
            LeaveAllocationEditFormik.setFieldValue("isModeCompany", 0)
        }
        if (e?.value === 'department') {
            LeaveAllocationEditFormik.setFieldValue("isModefunction", 1)
        } else {
            LeaveAllocationEditFormik.setFieldValue("isModefunction", 0)
        }
        if (e?.value === 'location') {
            LeaveAllocationEditFormik.setFieldValue("isModeLocation", 1)
        } else {
            LeaveAllocationEditFormik.setFieldValue("isModeLocation", 0)
        }
        setPreviousMode('')
        setCompyStatus(e?.value)
        if (e) {
            setSelectModeType(convertValueLabel(e.value, e.label));
            LeaveAllocationEditFormik.setFieldValue('holiday_type', e?.value);

        }
    }

    const handleAllocationType = (e) => {
        setPreviousState([''])
        setAllocationStatus(e?.value)
        // console.log("allocationStatus", allocationStatus);
        if (e) {
            setSelectType(convertValueLabel(e.value, e.label));
            LeaveAllocationEditFormik.setFieldValue('allocation_type', e?.value);

        }
    }

    const handleofEvery = (e) => {
        // setAllocationStatus(e?.value)
        // console.log("e", e);
        if (e) {
            setSelectUnit(convertValueLabel(e.value, e.label));
            LeaveAllocationEditFormik.setFieldValue('interval_unit', e?.value);

        }
    }

    const handleHours = (e) => {
        // setAllocationStatus(e?.value)
        // console.log("e", e);
        if (e) {
            setSelectIntervalUnit(convertValueLabel(e.value, e.label));
            LeaveAllocationEditFormik.setFieldValue('unit_per_interval', e?.value);

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


    const [findHours, setFindHours] = useState([]);

    useEffect(() => {
        let a = 0;
        let getHours = []
        for (let i = 1 + a; i <= 12; i++) {

            // getHours.push(convertValueLabel(i, i));
            getHours.push(convertValueLabel((i > 9 ? "" + i : "0" + i), (i > 9 ? "" + i : "0" + i)));
        }
        // var get = getHours.padStart(2, '0');
        setFindHours(getHours)
        // console.log('mits', findHours);
    }, [])

    // console.log("hrs", findHours);

    const [findmins, setFindMins] = useState([]);

    useEffect(() => {
        // let i = 0;
        let getMM = []
        for (let i = 1; i <= 59; i++) {

            // getMM.push(convertValueLabel(i, i));
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
    // const leaveTypeOptions = dropdownData?.leaveTypesCommonData?.data?.result


    const [companyOptions, setCompanyOptions] = useState([]);
    const [functionOptions, setFunctionOptions] = useState([]);
    const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    const [todateChange, setTodateChange] = useState([]);

    const [hrssplitfrom, setSplitFrom] = useState({});
    const [mnssplitfrom, setMnsSplitFrom] = useState({});

    const [ampmsplitfrom, setAmpmSplitFrom] = useState({});

    const [hrssplitto, setSplitTo] = useState({});
    const [mnssplitTo, setMnsSplitTo] = useState({});

    const [ampmsplitTo, setAmpmSplitTo] = useState({});

    useEffect(() => {

    })
    useEffect(() => {
        var date = leaveAllocationEditDetails?.data?.date_from;
        if (date) {
            // console.log("date", date);
            var time = date.split(" ");
            // console.log("hh", time);
            var hrsfrom = time[1].split(':')
            // console.log("hrs", hrsfrom[0]);
            var hrsfromfinal = hrsfrom[0]
            var mnsfromfinal = hrsfrom[1]
            var ampmfromfinal = time[2]

            var dateampm = ampmfromfinal.toUpperCase();

            // console.log("dateampm", dateampm);
            setSplitFrom(convertValueLabel(hrsfromfinal, hrsfromfinal))
            // setSplitFrom(hrsfromfinal)
            setMnsSplitFrom(convertValueLabel(mnsfromfinal, mnsfromfinal))
            setAmpmSplitFrom(convertValueLabel(dateampm, dateampm))
        }

        //  

        // LeaveAllocationEditFormik.setFieldValue('my_hours', hrsfromfinal)
    }, [])

    useEffect(() => {
        var date = leaveAllocationEditDetails?.data?.date_to;
        if (date) {
            // console.log("date", date);
            var time = date.split(" ");
            // console.log("hh", time);
            var hrsfrom = time[1].split(':')
            // console.log("hrs", hrsfrom[0]);
            var hrstofinal = hrsfrom[0]
            var mnstofinal = hrsfrom[1]
            var ampmtofinal = time[2]
            var dateampmto = ampmtofinal.toUpperCase();
            // console.log("hrsfromfinal", mnsfromfinal);
            setSplitTo(convertValueLabel(hrstofinal, hrstofinal))
            // setSplitFrom(hrsfromfinal)
            setMnsSplitTo(convertValueLabel(mnstofinal, mnstofinal))
            setAmpmSplitTo(convertValueLabel(dateampmto, dateampmto))
        }

        //  

        // LeaveAllocationEditFormik.setFieldValue('my_hours', hrsfromfinal)
    }, [])



    // console.log("slice", slicedate);

    const [hoursFinal, setHoursFinal] = useState([]);
    const handleHoursfrom = (e) => {
        console.log("log-e", e);
        // LeaveAllocationEditFormik.setFieldValue('my_hours', e?.value)
        setSplitFrom(convertValueLabel(e.value, e.label))
        setHoursFinal(e?.value)

    }

    const [minitsFinal, setMinitsFinal] = useState([]);
    const handleMinitsfrom = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationEditFormik.setFieldValue('my_minits', e?.value)
        setMnsSplitFrom(convertValueLabel(e.value, e.label))
        setMinitsFinal(e?.value)

    }

    const [amPmFinal, setamPmFinal] = useState([]);
    const handleAmPmfrom = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationEditFormik.setFieldValue('my_ampm', e?.value)
        setAmpmSplitFrom(convertValueLabel(e.value, e.label))
        setamPmFinal(e?.value)

    }

    // to
    const [hoursFinalto, setHoursFinalTo] = useState([]);
    const handleHoursTo = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationEditFormik.setFieldValue('my_hours', e?.value)
        setSplitTo(convertValueLabel(e.value, e.label))
        setHoursFinalTo(e?.value)

    }

    const [minitsFinalto, setMinitsFinalTo] = useState([]);
    const handleMinitsTo = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationEditFormik.setFieldValue('my_minits', e?.value)
        setMnsSplitTo(convertValueLabel(e.value, e.label))
        setMinitsFinalTo(e?.value)

    }

    const [amPmFinalto, setamPmFinalTo] = useState([]);
    const handleAmPmTo = (e) => {
        // console.log("log-e", e);
        // LeaveAllocationEditFormik.setFieldValue('my_ampm', e?.value)
        setAmpmSplitTo(convertValueLabel(e.value, e.label))
        setamPmFinalTo(e?.value)

    }



    const handleDateOfInc = (date) => {
        // let curDT = new Date().toLocaleTimeString()

        // console.log("date", hoursFinal);
        // findHours,findmints
        setTodateChange(date)
        if (date) {
            setDateFrom(date)
            LeaveAllocationEditFormik.setFieldValue('date_from', indianDateFormat(date));
        }
    }

    const handleDateTo = (date) => {
        if (date) {
            setDateTo(date)
            LeaveAllocationEditFormik.setFieldValue('date_to', indianDateFormat(date._d));
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
        setSelectCompanyName([])
        setSelectFunction([])
        setSelectLocation([])
        setSelectEmployee([])
        setSelectLeaveAllocation([])
        // setSelectLeaveRequest([])
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
            LeaveAllocationEditFormik.setFieldValue('group_id', e.value)
            onCompanyClear();
            onLocationClear();
            onFunctionClear();
            onJobClear();
            setGroupChanged(1);
            // setLocationOptions(convertValueLabel([]));

            //  setSubfunctionOptions(convertValueLabel([]));


        }
    }


    // predefine data load

    useEffect(() => {
        if (dropdownData?.companyCommonData?.data?.result) {
            // console.log("dropdownData?.companyCommonData?.data", dropdownData);
            setCompanyOptions(dropdownData?.companyCommonData?.data?.result);
        } else if (leaveAllocationEditDetails?.data?.mode_company_id_list) {
            setCompanyOptions(leaveAllocationEditDetails?.data?.mode_company_id_list)
        }
    }, [dropdownData?.companyCommonData?.data?.result, leaveAllocationEditDetails?.data?.mode_company_id_list])

    useEffect(() => {
        if (dropdownData?.locationCommonData?.data?.result) {
            // console.log("dropdownData?.companyCommonData?.data", dropdownData);
            setLocationOptions(dropdownData?.locationCommonData?.data?.result);
        } else if (leaveAllocationEditDetails?.data?.location_id_list) {
            setLocationOptions(leaveAllocationEditDetails?.data?.location_id_list)
        }
    }, [dropdownData?.locationCommonData?.data?.result, leaveAllocationEditDetails?.data?.location_id_list])


    useEffect(() => {
        if (dropdownData?.functionCommonData?.data?.result) {
            // console.log("dropdownData?.companyCommonData?.data", dropdownData);
            setFunctionOptions(dropdownData?.functionCommonData?.data?.result);
        } else if (leaveAllocationEditDetails?.data?.department_id_list) {
            setFunctionOptions(leaveAllocationEditDetails?.data?.department_id_list)
        }
    }, [dropdownData?.functionCommonData?.data?.result, leaveAllocationEditDetails?.data?.department_id_list])

    // holiday_status_id_list

    useEffect(() => {
        if (dropdownData?.leaveTypesCommonData?.data?.result) {
            // console.log("dropdownData?.companyCommonData?.data", dropdownData);
            setLeaveTypeOptions(dropdownData?.leaveTypesCommonData?.data?.result);
        } else if (leaveAllocationEditDetails?.data?.holiday_status_id_list) {
            setLeaveTypeOptions(leaveAllocationEditDetails?.data?.holiday_status_id_list)
        }

    }, [dropdownData?.leaveTypesCommonData?.data?.result, leaveAllocationEditDetails?.data?.holiday_status_id_list])



    useEffect(() => {

        if (dropdownData?.hrEmployeeCommonData?.data?.result) {
            setEmployeeOptions(dropdownData?.hrEmployeeCommonData?.data?.result);
        }
        else if (leaveAllocationEditDetails?.data?.employee_id_list) {
            setEmployeeOptions(leaveAllocationEditDetails?.data?.employee_id_list);
        }

    }, [dropdownData?.hrEmployeeCommonData?.data?.result, leaveAllocationEditDetails?.data?.employee_id_list])



    const handleCompanyChange = (e) => {

        // setSelectCompanyName([])
        setSelectFunction([])
        setSelectLocation([])
        setSelectEmployee([])
        // setSelectFunction([])
        // setSelectEmployee([])
        // setSelectLocation([])
        setSelectLeaveAllocation([])
        if (e?.value) {

            // const sendGpparams = {
            //     params: {
            //         query: '{id,name}',
            //         isDropdown: 1,
            //         // filter: '[("mode_company_id", "=", ' + e.value + ')]'
            //         filter: '[["company_id", "in", [' + e?.value + ']],["parent_id", "=", False]]',
            //     },
            // }

            const sendGpparamsleave = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    // filter: '[("mode_company_id", "=", ' + e.value + ')]'
                    filter: '[["allocation_type","!=", "no"],["company_id", "in", [' + e?.value + ']]]',
                },
            }

            const sendGpparamslocation = {
                params: {
                    query: '{id,name}',
                    isDropdown: 1,
                    filter: '[("company_id", "=", ' + e?.value + ')]'
                    // 'company.location': "[['company_id', '=', " + e?.value + ']]',
                },
            }

            // dispatch(FunctionDropDownList(sendGpparams))
            dispatch(LeaveTypesDropDownList(sendGpparamsleave))
            dispatch(LocationDropDownList(sendGpparamslocation))
            setSelectCompanyName(convertValueLabel(e.value, e.label))
            LeaveAllocationEditFormik.setFieldValue('mode_company_id', e.value)
            onLocationClear()
            onFunctionClear()
            onJobClear()
            setCompanyChanged(1);

        }
    }
    const handleFunctionChange = (e) => {
        setSelectEmployee([])
        setSelectLeaveAllocation([])
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
            LeaveAllocationEditFormik.setFieldValue('department_id', e?.value)
            onFunctionClear()
            onJobClear()
            setFunctionChanged(1)
            // setJobOptions(convertValueLabel([]));

        }
    }

    const handleLocationChange = (e) => {

        setSelectFunction([])
        setSelectEmployee([])
        setSelectLeaveAllocation([])

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
                setSelectLocation(convertValueLabel(e.value, e.label))
                LeaveAllocationEditFormik.setFieldValue('location_id', e?.value)
                onFunctionClear()
                onJobClear()
                // setJobOptions(convertValueLabel([]));

                // setSubFunctionValues([])

                setLocationChanged(1)
                // setLocationValues(locationListValues);
            }

        }


    }

    const handleLeaveTypeAllocation = (e) => {
        setSelectLeaveAllocation(convertValueLabel(e.value, e.label))
        LeaveAllocationEditFormik.setFieldValue('holiday_status_id', e.value)
    }
    const handleEmplyee = (e) => {
        setSelectEmployee(convertValueLabel(e.value, e.label))
        LeaveAllocationEditFormik.setFieldValue('employee_id', e.value)
    }

    const [newfromdate, setNewFromdate] = useState();
    const [newtodate, setNewTodate] = useState();

    const [title, setTitle] = useState()
    const [daysPerMonth, setDaysPerMonth] = useState()
    const [daysPermonthfinal, setDaysPermonthfinal] = useState()

    const handlechangevalidation = (e) => {
        // value={previousgetDisplay}

        console.log("get previous", inputTitle);
        console.log('daysPerMonth', e);
        setDaysPerMonth(e)


        // setDaysPermonthfinal(e)
        if (e.length <= 0) {
            toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty', { position: toast.POSITION.TOP_RIGHT })
        } else if (parseInt(inputTitle) <= parseInt(e)) {
            toast.error('Days per month should not be equal, to Days per year or Less than && Not Empty', { position: toast.POSITION.TOP_RIGHT })
        } else {
            LeaveAllocationEditFormik.setFieldValue('number_of_days', daysPerMonth);
        }



    }

    // if (hoursFinal != null && hoursFinal != undefined) {
    //     var ddd = hoursFinal + ':' + minitsFinal + ' ' + amPmFinal

    //     console.log('dd', ddd);
    //     setNewFromdate(ddd)
    // }
    // console.log(newfromdate);
    // setNewFromdate(ddd)
    // console.log('ddd', newfromdate);
    // console.log("roleOptions",dropdownData?.roleCommonData);
    //Designation Add Form Initilization
    const LeaveAllocationEditFormik = useFormik({
        initialValues: {
            name: '',
            holiday_status_id: '',
            allocation_type: '',
            date_from: '',
            date_to: '',
            number_per_interval: '',
            interval_number: '',
            interval_unit: '',
            number_of_days_display: '',
            number_of_days_month: '',
            holiday_type: '',
            unit_per_interval: '',
            group_id: '',
            mode_company_id: '',
            department_id: '',
            employee_id: '',
            notes: '',
        },
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

            // holiday_status_id: Yup.string().required('This field is required'),
            // name: Yup.string().required('This field is required'),
            // allocation_type: Yup.string().required('This field is required'),
            // request_date_from: Yup.string().required('This field is required'),
            // group_id: Yup.string().required('This field is required'),
            // mode_company_id: Yup.string().required('This field is required'),
            // location_id: Yup.string().required('This field is required'),
            // department_id: Yup.string().required('This field is required'),
            // employee_id: Yup.string().required('This field is required'),

            // holiday_status_id: Yup.string().required('This field is required'),
            // name: Yup.string().required('This field is required'),
            // allocation_type: Yup.string().required('This field is required'),
            // request_date_from: Yup.string().required('This field is required'),
            // request_date_to: Yup.string().required('This field is required'),
            // number_per_interval: Yup.string().required('This field is required'),
            // unit_per_interval: Yup.string().required('This field is required'),
            // interval_number: Yup.string().required('This field is required'),
            // // interval_unit: Yup.string().required('This field is required'),
            // // holiday_type: Yup.string().required('This field is required'),
            // group_id: Yup.string().required('This field is required'),
            // mode_company_id: Yup.string().required('This field is required'),
            // // department_id: Yup.string().required('This field is required'),
            // // employee_id: Yup.string().required('This field is required'),
            // // note: Yup.string().required('This field is required')

        ),
        onSubmit: (values) => {

            delete values.isModeCompany;
            delete values.isModeLocation;
            delete values.isModefunction;
            delete values.isModeEmployee;

            // if (leaveAllocationEditDetails?.data !== null && leaveAllocationEditDetails?.data !== undefined) {
            //     values.date_from = values.date_from + ' ' + gettime
            //     values.date_to = values.date_to + ' ' + gettime
            // }
            // else {
            //     // values.date_from = leaveAllocationEditDetails?.data?.date_from
            //     // values.date_to = leaveAllocationEditDetails?.data?.date_to
            // }
            console.log("val", values);
            const formData = JSON.stringify({ params: { data: values } })
            dispatch(LeaveAllocationUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
            // dispatch((formData, history))
            // console.log("formData", values);
        },
    })


    const [gettime, setGetTime] = useState([]);
    useEffect(() => {
        var today = new Date();

        var time = today.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', minute60: true })

        // console.log("time", time);
        setGetTime(time)
    })

    const [selectGroupName, setSelectGroupName] = useState({});
    const [selectCompanyName, setSelectCompanyName] = useState({});
    const [selectmodetype, setSelectModeType] = useState({});
    const [selectLocation, setSelectLocation] = useState({});
    const [selectFunction, setSelectFunction] = useState({});
    const [selectEmployee, setSelectEmployee] = useState({});
    const [selectleaveallocation, setSelectLeaveAllocation] = useState({});
    const [selecttype, setSelectType] = useState({})
    const [selectintervalunit, setSelectIntervalUnit] = useState({})
    const [selectunit, setSelectUnit] = useState({})
    const [selectExtradays, setSelectExtraDays] = useState({})
    const [selectFromtHalf, setSelectFromtHalf] = useState({});
    const [selectToHalf, setSelectToHalf] = useState({});

    const [previousState, setPreviousState] = useState([]);

    const [previousMode, setPreviousMode] = useState();
    const [previousgetDisplay, setPreviousGetDisplay] = useState();

    // useEffect(() => {
    //     setPreviousState(leaveAllocationEditDetails?.data?.allocation_type_label)
    // })

    // console.log("leaveAllocation", leaveAllocationEditDetails?.data)
    // console.log("previousMode", previousMode);
    // console.log("current Mode", compyStatus);


    useEffect(() => {
        if (leaveAllocationEditDetails?.data !== null) {
            console.log("leaveAllocation", leaveAllocationEditDetails?.data?.date_to);
            setPreviousState(leaveAllocationEditDetails?.data?.allocation_type_label)
            setPreviousMode(leaveAllocationEditDetails?.data?.holiday_type)
            setInputTitle(leaveAllocationEditDetails?.data?.number_of_days_display)

            LeaveAllocationEditFormik.setValues({

                "name": leaveAllocationEditDetails?.data?.name,
                // "number_of_days": leaveAllocationEditDetails?.data?.number_of_days,
                "holiday_status_id": leaveAllocationEditDetails?.data?.holiday_status_id,
                "allocation_type": leaveAllocationEditDetails?.data?.allocation_type,
                "date_from": leaveAllocationEditDetails?.data?.date_from,
                "date_to": leaveAllocationEditDetails?.data?.date_to,
                "number_per_interval": leaveAllocationEditDetails?.data?.number_per_interval,
                "unit_per_interval": leaveAllocationEditDetails?.data?.unit_per_interval,
                "interval_number": leaveAllocationEditDetails?.data?.interval_number,
                "interval_unit": leaveAllocationEditDetails?.data?.interval_unit,
                "number_of_days_display": leaveAllocationEditDetails?.data?.number_of_days_display,
                "number_of_days_month": leaveAllocationEditDetails?.data?.number_of_days_month,
                "holiday_type": leaveAllocationEditDetails?.data?.holiday_type,
                "group_id": leaveAllocationEditDetails?.data?.group_id,
                "mode_company_id": leaveAllocationEditDetails?.data?.mode_company_id,
                "department_id": leaveAllocationEditDetails?.data?.department_id,
                "employee_id": leaveAllocationEditDetails?.data?.employee_id,
                "location_id": leaveAllocationEditDetails?.data?.location_id,
                "notes": leaveAllocationEditDetails?.data?.notes,

            });
        }
        if (leaveAllocationEditDetails?.data !== undefined && leaveAllocationEditDetails?.data !== null) {

            setSelectGroupName(convertValueLabel(leaveAllocationEditDetails?.data?.group_id, leaveAllocationEditDetails?.data?.group_id_name));
            setSelectCompanyName(convertValueLabel(leaveAllocationEditDetails?.data?.mode_company_id, leaveAllocationEditDetails?.data?.mode_company_id_name));
            setSelectLocation(convertValueLabel(leaveAllocationEditDetails?.data?.location_id, leaveAllocationEditDetails?.data?.location_id_name));
            setSelectFunction(convertValueLabel(leaveAllocationEditDetails?.data?.department_id, leaveAllocationEditDetails?.data?.department_id_name));
            setSelectEmployee(convertValueLabel(leaveAllocationEditDetails?.data?.employee_id, leaveAllocationEditDetails?.data?.employee_id_name));
            setSelectLeaveAllocation(convertValueLabel(leaveAllocationEditDetails?.data?.holiday_status_id, leaveAllocationEditDetails?.data?.holiday_status_id_name));
            setSelectModeType(convertValueLabel(leaveAllocationEditDetails?.data?.holiday_type, leaveAllocationEditDetails?.data?.holiday_type_label));
            setSelectType(convertValueLabel(leaveAllocationEditDetails?.data?.allocation_type, leaveAllocationEditDetails?.data?.allocation_type_label));
            setSelectIntervalUnit(convertValueLabel(leaveAllocationEditDetails?.data?.unit_per_interval, leaveAllocationEditDetails?.data?.unit_per_interval_label));
            setSelectUnit(convertValueLabel(leaveAllocationEditDetails?.data?.interval_unit, leaveAllocationEditDetails?.data?.interval_unit_label));
            // setSelectFromtHalf(convertValueLabel(leaveRequestEditDetails?.data?.from_half, leaveRequestEditDetails?.data?.from_half_label));
            // setSelectToHalf(convertValueLabel(leaveRequestEditDetails?.data?.to_half, leaveRequestEditDetails?.data?.to_half_label));
            setDateFrom(moment(new Date(convertDateToMDY(leaveAllocationEditDetails?.data?.date_from))));
            setDateTo(moment(new Date(convertDateToMDY(leaveAllocationEditDetails?.data?.date_to))));
        }
    }, [isLoading, leaveAllocationEditDetails?.data])

    const updateCandSatus = (e) => {
        const tempParams = JSON.stringify({ params: { "level": e, "id": decryptSingleData(props?.match?.params?.id) } })
        // dispatch(onBoardingUpdateStatus(tempParams));
    }


    const Alldata = useSelector((state) => state.leaveBackend)
    // const Alldata = useSelector((state) => state.leaveBackend)

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (Alldata?.isleaveAllocationApprove) {
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [Alldata?.isleaveAllocationApprove]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (Alldata?.isleaveAllocationRefuse) {
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [Alldata?.isleaveAllocationRefuse]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (Alldata?.isleaveAllocationDraft) {
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [Alldata?.isleaveAllocationDraft, dispatch, props?.match?.params?.id]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (Alldata?.isleaveAllocationConfirm) {
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [Alldata?.isleaveAllocationConfirm, dispatch, props?.match?.params?.id]);

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (Alldata?.isleaveAllocationSecondApprove) {
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, [Alldata?.isleaveAllocationSecondApprove]);




    const handleToApproval = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }


        dispatch(LeaveAllocationApprove(datavalue, history));
        // console.log("isloading", isLoading);
        // dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));



    }

    // const { leaveAllocationApprove, isLoading } = useSelector(state => state.leaveBackend);

    const handleToScondApproval = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }
        if (id != undefined) {
            // console.log('in approval', id);

            dispatch(LeaveAllocationSecondApprove(datavalue, history));
        }
    }
    const handleToConfirm = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }
        if (id != undefined) {
            // console.log('in approval', id);

            dispatch(LeaveAllocationConfirm(datavalue, history));
        }
    }
    const handleToDraft = (id) => {
        const datavalue = {
            "params": {
                "kwargs": {
                    "ids": [id]
                }
            }
        }
        if (id != undefined) {
            // console.log('in approval', id);

            dispatch(LeaveAllocationDraft(datavalue, history));
        }
    }
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

            dispatch(LeaveAllocationUpdateAPI(datavalue, history, id));
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
        if (id != undefined) {
            // console.log('in approval', id);

            dispatch(LeaveAllocationRefuse(datavalue, history));
        }
    }



    const [inputTitle, setInputTitle] = useState('');








    // console.log("isloading", isLoading);
    // console.log("leaveAllocationEditDetails", leaveAllocationEditDetails);

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
                                        <strong> Edit Leave Allocation</strong>
                                    </CCol>
                                    <CCol col='6'>
                                        <div className='text-center'>
                                            {
                                                (() => {
                                                    if (leaveAllocationEditDetails?.data?.state == 'draft')
                                                        return <button className="btn btn-md btn-primary" onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            handleToConfirm(leaveAllocationEditDetails?.data?.id)
                                                        }}>Confirm</button>
                                                    else if (leaveAllocationEditDetails?.data?.state == 'cancel')
                                                        return <><button className="btn btn-md btn-warning" onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            handleToCancel(leaveAllocationEditDetails?.data?.id)
                                                        }}>Cancelled</button>
                                                        </>

                                                    else if (leaveAllocationEditDetails?.data?.state == 'confirm')
                                                        return <>
                                                            <button className="btn btn-md btn-success" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToApproval(leaveAllocationEditDetails?.data?.id)
                                                            }}>Approve</button>&nbsp;&nbsp;
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToRefuse(leaveAllocationEditDetails?.data?.id)
                                                            }}>Refuse</button>&nbsp;&nbsp;
                                                            <button className="btn btn-md btn-primary" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToDraft(leaveAllocationEditDetails?.data?.id)
                                                            }}>Mark as Draft</button>
                                                        </>

                                                    else if (leaveAllocationEditDetails?.data?.state == 'validate')
                                                        return <>
                                                            <button className="btn btn-md btn-danger" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToRefuse(leaveAllocationEditDetails?.data?.id)
                                                            }}>Refuse</button></>

                                                    // else if (leaveAllocationEditDetails?.data?.state == 'validate')
                                                    //     return <>
                                                    //         <button className="btn btn-md btn-danger" onClick={(e) => {
                                                    //             e.stopPropagation()
                                                    //             e.preventDefault()
                                                    //             handleToScondApproval(leaveAllocationEditDetails?.data?.id)
                                                    //         }}>Refuse</button></>


                                                    else if (leaveAllocationEditDetails?.data?.state == 'refuse')
                                                        return <>
                                                            <button className="btn btn-md btn-primary" onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                                handleToDraft(leaveAllocationEditDetails?.data?.id)
                                                            }}>Mark As Draft</button></>

                                                })()
                                            }

                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            {/* activeStep={leaveAllocationEditDetails?.data} */}



                            {
                                (leaveAllocationEditDetails?.data?.state === 'confirm') ?
                                    <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }}>
                                        <span style={{ backgroundColor: '#2eb85c', font: '50px' }}>To Approve</span>
                                    </div>
                                    : ''
                            }

                            {
                                (leaveAllocationEditDetails?.data?.state === 'validate') ?
                                    <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                        <span style={{ backgroundColor: '#2eb85c' }}>Approved</span>
                                    </div>
                                    : ''
                            }
                            {
                                (leaveAllocationEditDetails?.data?.state === 'refuse') ?
                                    <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                        <span style={{ backgroundColor: '#e55353ab' }}>Refused</span>
                                    </div>
                                    : ''
                            }
                            {
                                (leaveAllocationEditDetails?.data?.state === 'draft') ?
                                    <div class="ribbon ribbon-top-right" style={{ right: '0px', width: "130px", }} >
                                        <span style={{ backgroundColor: '#e55133ab' }}>To Submit</span>
                                    </div>
                                    : ''
                            }



                            {/* <div className="mulFormallocation mt-3">
                            {
                                (() => {

                                    if (leaveAllocationEditDetails?.data?.state == 'draft') {
                                        var step = 1;
                                        return (
                                            <MultiStepForm activeStep={step} className="mainFTag" accentColor="#3399ff">
                                                {
                                                    positionStatus?.map(oData => {
                                                        return (
                                                            <Step label={oData?.label} className="mainStepTag" key={oData?.label}>
                                                            </Step>
                                                        )
                                                    })
                                                }

                                            </MultiStepForm>
                                        )
                                    }
                                    else if (leaveAllocationEditDetails?.data?.state == 'confirm') {
                                        var step = 2;
                                        return (
                                            <MultiStepForm activeStep={step} className="mainFTag" accentColor="#3399ff">
                                                {
                                                    positionStatus?.map(oData => {
                                                        return (
                                                            <Step label={oData?.label} className="mainStepTag" key={oData?.label}>
                                                            </Step>
                                                        )
                                                    })
                                                }

                                            </MultiStepForm>
                                        )
                                    }
                                    else if (leaveAllocationEditDetails?.data?.state == 'validate1') {
                                        var step = 3;
                                        return (
                                            <MultiStepForm activeStep={step} className="mainFTag" accentColor="#3399ff">
                                                {
                                                    positionStatus?.map(oData => {
                                                        return (
                                                            <Step label={oData?.label} className="mainStepTag" key={oData?.label}>
                                                            </Step>
                                                        )
                                                    })
                                                }

                                            </MultiStepForm>
                                        )
                                    }
                                    else if (leaveAllocationEditDetails?.data?.state == 'validate') {
                                        var step = 4;
                                        return (
                                            <MultiStepForm activeStep={step} className="mainFTag" accentColor="#3399ff">
                                                {
                                                    positionStatus?.map(oData => {
                                                        return (
                                                            <Step label={oData?.label} className="mainStepTag" key={oData?.label}>
                                                            </Step>
                                                        )
                                                    })
                                                }

                                            </MultiStepForm>
                                        )
                                    }
                                    else if (leaveAllocationEditDetails?.data?.state == 'refuse') {
                                        var step = 5;
                                        return (
                                            <MultiStepForm activeStep={step} className="mainFTag" accentColor="#3399ff">
                                                {
                                                    positionStatus?.map(oData => {
                                                        return (
                                                            <Step label={oData?.label} className="mainStepTag" key={oData?.label}>
                                                            </Step>
                                                        )
                                                    })
                                                }

                                            </MultiStepForm>
                                        )
                                    }
                                    else if (leaveAllocationEditDetails?.data?.state == 'cancel') {
                                        var step = 6;
                                        return (
                                            <MultiStepForm activeStep={step} className="mainFTag" accentColor="#3399ff">
                                                {
                                                    positionStatus?.map(oData => {
                                                        return (
                                                            <Step label={oData?.label} className="mainStepTag" key={oData?.label}>
                                                            </Step>
                                                        )
                                                    })
                                                }

                                            </MultiStepForm>
                                        )
                                    }

                                })()
                            }

                        </div> */}

                            <CCardBody>
                                <CForm onSubmit={LeaveAllocationEditFormik.handleSubmit} className="form-horizontal mt-0">
                                    <div className='mt-0'>

                                        {
                                            leaveAllocationEditDetails?.data?.state === 'validate' || leaveAllocationEditDetails?.data?.state === 'refuse' ?
                                                <div className="row form-group" style={{ pointerEvents: 'none' }}>
                                                    <div className="col-md-12" >
                                                        <label htmlFor="hf-email">
                                                            Description  <span className="error"> *</span>
                                                        </label>
                                                        <CTextarea
                                                            name="name"
                                                            id="textarea-input"
                                                            rows="1"
                                                            value={LeaveAllocationEditFormik.values.name}
                                                            maxLength={500}
                                                            placeholder="Description"
                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />

                                                        {LeaveAllocationEditFormik.touched.name &&
                                                            LeaveAllocationEditFormik.errors.name ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.name}
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
                                                            value={LeaveAllocationEditFormik.values.name}
                                                            maxLength={500}
                                                            placeholder="Description"
                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />

                                                        {LeaveAllocationEditFormik.touched.name &&
                                                            LeaveAllocationEditFormik.errors.name ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                        }


                                        {
                                            leaveAllocationEditDetails?.data?.state === 'validate' || leaveAllocationEditDetails?.data?.state === 'refuse' ?

                                                <div className="row form-group" style={{ pointerEvents: 'none' }}>
                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Mode
                                                        </label>
                                                        <Select

                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Mode'}
                                                            value={selectmodetype}
                                                            name="holiday_type"
                                                            options={modeOptions}
                                                            onChange={(e) => handleMode(e)}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />
                                                        {LeaveAllocationEditFormik.touched.holiday_type &&
                                                            LeaveAllocationEditFormik.errors.holiday_type ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.holiday_type}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    {

                                                        compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' || previousMode === 'company' || previousMode === 'department' || previousMode === 'employee' || previousMode === 'location' ?
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Group <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    // ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Group '}
                                                                    name="group_id"
                                                                    readOnly
                                                                    options={groupOptions}
                                                                    value={selectGroupName}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleGroupChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.group_id &&
                                                                    LeaveAllocationEditFormik.errors.group_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.group_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''

                                                    }

                                                    {
                                                        compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' || previousMode === 'company' || previousMode === 'department' || previousMode === 'employee' || previousMode === 'location' ?
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Company <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    readOnly
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Company '}
                                                                    name="mode_company_id"
                                                                    options={companyOptions}
                                                                    value={selectCompanyName}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleCompanyChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.mode_company_id &&
                                                                    LeaveAllocationEditFormik.errors.mode_company_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.mode_company_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }

                                                </div>
                                                :
                                                <div className="row form-group">
                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Mode
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Mode'}
                                                            value={selectmodetype}
                                                            name="holiday_type"
                                                            options={modeOptions}
                                                            onChange={(e) => handleMode(e)}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />
                                                        {LeaveAllocationEditFormik.touched.holiday_type &&
                                                            LeaveAllocationEditFormik.errors.holiday_type ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.holiday_type}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    {

                                                        compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' || previousMode === 'company' || previousMode === 'department' || previousMode === 'employee' || previousMode === 'location' ?

                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Group <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    // ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Group '}
                                                                    name="group_id"
                                                                    options={groupOptions}
                                                                    value={selectGroupName}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleGroupChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.group_id &&
                                                                    LeaveAllocationEditFormik.errors.group_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.group_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''

                                                    }

                                                    {
                                                        compyStatus === 'company' || compyStatus === 'department' || compyStatus === 'employee' || compyStatus === 'location' || previousMode === 'company' || previousMode === 'department' || previousMode === 'employee' || previousMode === 'location' ?

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
                                                                    value={selectCompanyName}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleCompanyChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.mode_company_id &&
                                                                    LeaveAllocationEditFormik.errors.mode_company_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.mode_company_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }

                                                </div>
                                        }


                                        {
                                            leaveAllocationEditDetails?.data?.state === 'validate' || leaveAllocationEditDetails?.data?.state === 'refuse' ?

                                                <div className="row form-group" style={{ pointerEvents: "none" }}>

                                                    {
                                                        compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' || previousMode === 'employee' || previousMode === 'location' || previousMode === 'department' ?
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Location <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    // ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Location '}
                                                                    name="location_id"
                                                                    options={locationOptions}
                                                                    value={selectLocation}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleLocationChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.location_id &&
                                                                    LeaveAllocationEditFormik.errors.location_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.location_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }




                                                    {
                                                        compyStatus === 'department' || compyStatus === 'employee' || previousMode === 'department' || previousMode === 'employee' ?
                                                            <div className="col-md-4">

                                                                <label htmlFor="hf-email">
                                                                    Function <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Function '}
                                                                    name="department_id"
                                                                    options={functionOptions}
                                                                    value={selectFunction}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleFunctionChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('mode_company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.department_id &&
                                                                    LeaveAllocationEditFormik.errors.department_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.department_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''
                                                    }
                                                    {
                                                        compyStatus === 'employee' || previousMode === 'employee' ?
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Employee<span className="error"> *</span>
                                                                </label>
                                                                <Select

                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a Employee'}
                                                                    name="employee_id"
                                                                    value={selectEmployee}
                                                                    options={employeeOptions}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleEmplyee(e)}
                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('employee_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.employee_id &&
                                                                    LeaveAllocationEditFormik.errors.employee_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.employee_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''
                                                    }

                                                </div>
                                                :
                                                <div className="row form-group">

                                                    {
                                                        compyStatus === 'employee' || compyStatus === 'location' || compyStatus === 'department' || previousMode === 'employee' || previousMode === 'location' || previousMode === 'department' ?

                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Location <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    // ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Location '}
                                                                    name="location_id"
                                                                    options={locationOptions}
                                                                    value={selectLocation}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleLocationChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.location_id &&
                                                                    LeaveAllocationEditFormik.errors.location_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.location_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ""
                                                    }




                                                    {
                                                        compyStatus === 'department' || compyStatus === 'employee' || previousMode === 'department' || previousMode === 'employee' ?
                                                            <div className="col-md-4">

                                                                <label htmlFor="hf-email">
                                                                    Function <span className="error"> *</span>
                                                                </label>
                                                                <Select
                                                                    //  isMulti={true}
                                                                    ref={selectCompanyRef}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a  Function '}
                                                                    name="department_id"
                                                                    options={functionOptions}
                                                                    value={selectFunction}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleFunctionChange(e)}

                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('mode_company_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.department_id &&
                                                                    LeaveAllocationEditFormik.errors.department_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.department_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''
                                                    }

                                                    {
                                                        compyStatus === 'employee' || previousMode === 'employee' ?
                                                            <div className="col-md-4">
                                                                <label htmlFor="hf-email">
                                                                    Employee<span className="error"> *</span>
                                                                </label>

                                                                <Select

                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    placeholder={'Choose a Employee'}
                                                                    name="employee_id"
                                                                    value={selectEmployee}
                                                                    options={employeeOptions}
                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                    onChange={(e) => handleEmplyee(e)}
                                                                // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('employee_id', value)}
                                                                />
                                                                {LeaveAllocationEditFormik.touched.employee_id &&
                                                                    LeaveAllocationEditFormik.errors.employee_id ? (
                                                                    <div className="help-block text-danger">
                                                                        {LeaveAllocationEditFormik.errors.employee_id}
                                                                    </div>
                                                                ) : null}
                                                            </div> : ''
                                                    }




                                                </div>
                                        }



                                        {
                                            leaveAllocationEditDetails?.data?.state === 'validate' || leaveAllocationEditDetails?.data?.state === 'refuse' ?
                                                <div className="row form-group" style={{ pointerEvents: 'none' }} >
                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Leave Type Name <span className="error"> *</span>
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Leave Type'}
                                                            value={selectleaveallocation}
                                                            name="holiday_status_id"
                                                            options={leaveTypeOptions}
                                                            onChange={(e) => handleLeaveTypeAllocation(e)}
                                                            // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('holiday_status_id', value)}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />
                                                        {LeaveAllocationEditFormik.touched.holiday_status_id &&
                                                            LeaveAllocationEditFormik.errors.holiday_status_id ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.holiday_status_id}
                                                            </div>
                                                        ) : null}
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Allocation Type
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a  Allocation Type'}
                                                            value={selecttype}
                                                            name="allocation_type"
                                                            options={allocationOptions}
                                                            onChange={(e) => handleAllocationType(e)}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />
                                                        {LeaveAllocationEditFormik.touched.allocation_type &&
                                                            LeaveAllocationEditFormik.errors.allocation_type ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.allocation_type}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                </div> :


                                                <div className="row form-group">
                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Leave Type Name <span className="error"> *</span>
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a Leave Type'}
                                                            value={selectleaveallocation}
                                                            name="holiday_status_id"
                                                            options={leaveTypeOptions}
                                                            onChange={(e) => handleLeaveTypeAllocation(e)}
                                                            // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('holiday_status_id', value)}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />
                                                        {LeaveAllocationEditFormik.touched.holiday_status_id &&
                                                            LeaveAllocationEditFormik.errors.holiday_status_id ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.holiday_status_id}
                                                            </div>
                                                        ) : null}
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label htmlFor="hf-email">
                                                            Allocation Type
                                                        </label>
                                                        <Select
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            placeholder={'Choose a  Allocation Type'}
                                                            value={selecttype}
                                                            name="allocation_type"
                                                            options={allocationOptions}
                                                            onChange={(e) => handleAllocationType(e)}
                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                        />
                                                        {LeaveAllocationEditFormik.touched.allocation_type &&
                                                            LeaveAllocationEditFormik.errors.allocation_type ? (
                                                            <div className="help-block text-danger">
                                                                {LeaveAllocationEditFormik.errors.allocation_type}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                </div>

                                        }

                                        {
                                            previousState === 'Accrual Allocation' ?

                                                <div className='row mb-3'>
                                                    {
                                                        leaveAllocationEditDetails?.data?.state === 'validate' || leaveAllocationEditDetails?.data?.state === 'refuse' ?
                                                            <div className='col-md-12' style={{ pointerEvents: 'none' }}>
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
                                                                                    date={dateFrom?._isValid == false ? null : dateFrom}
                                                                                    // date={dateFrom} // momentPropTypes.momentObj or null
                                                                                    onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                                                                    focused={focusOfInc} // PropTypes.bool
                                                                                    onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                                                                    numberOfMonths={1}
                                                                                    displayFormat="DD-MM-YYYY"
                                                                                    // Timezone={"DD-MM-YYYY"}
                                                                                    //showClearDate={true}
                                                                                    isOutsideRange={d => d.isBefore(moment())}
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
                                                                                {LeaveAllocationEditFormik.touched.date_from &&
                                                                                    LeaveAllocationEditFormik.errors.date_from ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.date_from}
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>


                                                                            <div className="col-md-4">
                                                                                <label htmlFor="hf-email">
                                                                                    To
                                                                                </label>

                                                                                {/* {leaveAllocationEditDetails?.data?.date_to } */}
                                                                                <SingleDatePicker
                                                                                    id={'date_to'}
                                                                                    date={leaveAllocationEditDetails?.data?.date_to === undefined ? null : dateTo}
                                                                                    // date={dateTo} // momentPropTypes.momentObj or null
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

                                                                                {LeaveAllocationEditFormik.touched.date_to &&
                                                                                    LeaveAllocationEditFormik.errors.date_to ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.date_to}
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>


                                                                            <div className="col-md-4">
                                                                                <label htmlFor="hf-email">
                                                                                    Extra Days
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="number_of_days_display"
                                                                                    value={LeaveAllocationEditFormik.values.number_of_days_display}
                                                                                    className="form-control"
                                                                                    placeholder={"Extra Days"}
                                                                                    maxLength={50}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />
                                                                                {LeaveAllocationEditFormik.touched.number_of_days_display &&
                                                                                    LeaveAllocationEditFormik.errors.number_of_days_display ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_of_days_display}
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>

                                                                        </div>

                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <label htmlFor="hf-email">
                                                                                    Add
                                                                                </label>
                                                                                <div className="row">
                                                                                    <div className="col-lg-8">
                                                                                        <input
                                                                                            type="number"
                                                                                            name="number_per_interval"
                                                                                            value={LeaveAllocationEditFormik.values.number_per_interval}
                                                                                            className="form-control"
                                                                                            placeholder=" Add"
                                                                                            maxLength={25}
                                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.number_per_interval &&
                                                                                            LeaveAllocationEditFormik.errors.number_per_interval ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.number_per_interval}
                                                                                            </div>
                                                                                        ) : null}

                                                                                    </div>
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            // placeholder={'Hours'}
                                                                                            value={selectintervalunit}
                                                                                            name="unit_per_interval"
                                                                                            options={addOption}
                                                                                            onChange={(e) => handleHours(e)}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.unit_per_interval &&
                                                                                            LeaveAllocationEditFormik.errors.unit_per_interval ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.unit_per_interval}
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
                                                                                            value={LeaveAllocationEditFormik.values.interval_number}
                                                                                            className="form-control"
                                                                                            placeholder=" Of Leave every"
                                                                                            maxLength={25}
                                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.interval_number &&
                                                                                            LeaveAllocationEditFormik.errors.interval_number ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.interval_number}
                                                                                            </div>
                                                                                        ) : null}

                                                                                    </div>
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            placeholder={'Days'}
                                                                                            value={selectunit}
                                                                                            name="interval_unit"
                                                                                            options={offEveryOptions}
                                                                                            onChange={(e) => handleofEvery(e)}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.interval_unit &&
                                                                                            LeaveAllocationEditFormik.errors.interval_unit ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.interval_unit}
                                                                                            </div>
                                                                                        ) : null}
                                                                                    </div>

                                                                                </div>
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
                                                                                    date={dateFrom?._isValid == false ? null : dateFrom}
                                                                                    // date={dateFrom} // momentPropTypes.momentObj or null
                                                                                    onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                                                                    focused={focusOfInc} // PropTypes.bool
                                                                                    onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                                                                    numberOfMonths={1}
                                                                                    displayFormat="DD-MM-YYYY"
                                                                                    // Timezone={"DD-MM-YYYY"}
                                                                                    //showClearDate={true}
                                                                                    isOutsideRange={d => d.isBefore(moment())}
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
                                                                                {LeaveAllocationEditFormik.touched.date_from &&
                                                                                    LeaveAllocationEditFormik.errors.date_from ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.date_from}
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>


                                                                            <div className="col-md-4">
                                                                                <label htmlFor="hf-email">
                                                                                    To <span className="error"> *</span>
                                                                                </label>

                                                                                <SingleDatePicker
                                                                                    id={'date_to'}
                                                                                    date={dateTo?._isValid == false ? null : dateTo}
                                                                                    // date={dateTo} // momentPropTypes.momentObj or null
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

                                                                                {LeaveAllocationEditFormik.touched.date_to &&
                                                                                    LeaveAllocationEditFormik.errors.date_to ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.date_to}
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>
                                                                            {/* <div className="col-lg-3">
                                                                                <label htmlFor="hf-email text-center">
                                                                                    Time
                                                                                </label>
                                                                                <div className="row">
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            placeholder={'HH'}
                                                                                            value={hrssplitto}
                                                                                            // name="my_hours"
                                                                                            options={findHours}
                                                                                            onChange={(e) => handleHoursTo(e)}
                                                                                            // onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('my_hours', value)}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            placeholder={'MM'}
                                                                                            value={mnssplitTo}
                                                                                            // name="my_minits"
                                                                                            options={findmins}
                                                                                            onChange={(e) => handleMinitsTo(e)}
                                                                                            // onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            // onChange={({ value }) => LeaveAllocationEditFormik.setFieldValue('date_from', value)}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            placeholder={'AM/PM'}
                                                                                            value={ampmsplitTo}
                                                                                            // name="my_ampm"
                                                                                            options={addAmPm}
                                                                                            onChange={(e) => handleAmPmTo(e)}
                                                                                            // onChange={(e) => handleofEvery(e)}
                                                                                            // onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                            </div> */}
                                                                            <div className="col-md-4">
                                                                                <label htmlFor="hf-email">
                                                                                    Extra Days
                                                                                </label>


                                                                                <input
                                                                                    type="text"
                                                                                    name="number_of_days_display"
                                                                                    value={LeaveAllocationEditFormik.values.number_of_days_display}
                                                                                    // value={0.0}
                                                                                    className="form-control"
                                                                                    placeholder={"Extra Days"}
                                                                                    maxLength={50}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />
                                                                                {LeaveAllocationEditFormik.touched.number_of_days_display &&
                                                                                    LeaveAllocationEditFormik.errors.number_of_days_display ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_of_days_display}
                                                                                    </div>
                                                                                ) : null}
                                                                            </div>

                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <label htmlFor="hf-email">
                                                                                    Add
                                                                                </label>
                                                                                <div className="row">
                                                                                    <div className="col-lg-8">
                                                                                        <input
                                                                                            type="number"
                                                                                            name="number_per_interval"
                                                                                            value={LeaveAllocationEditFormik.values.number_per_interval}
                                                                                            className="form-control"
                                                                                            placeholder=" Add"
                                                                                            maxLength={25}
                                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.number_per_interval &&
                                                                                            LeaveAllocationEditFormik.errors.number_per_interval ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.number_per_interval}
                                                                                            </div>
                                                                                        ) : null}

                                                                                    </div>
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            // placeholder={'Hours'}
                                                                                            value={selectintervalunit}
                                                                                            name="unit_per_interval"
                                                                                            options={addOption}
                                                                                            onChange={(e) => handleHours(e)}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.unit_per_interval &&
                                                                                            LeaveAllocationEditFormik.errors.unit_per_interval ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.unit_per_interval}
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
                                                                                            value={LeaveAllocationEditFormik.values.interval_number}
                                                                                            className="form-control"
                                                                                            placeholder=" Of Leave every"
                                                                                            maxLength={25}
                                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.interval_number &&
                                                                                            LeaveAllocationEditFormik.errors.interval_number ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.interval_number}
                                                                                            </div>
                                                                                        ) : null}

                                                                                    </div>
                                                                                    <div className="col-lg-4">
                                                                                        <Select
                                                                                            className="basic-single"
                                                                                            classNamePrefix="select"
                                                                                            placeholder={'Days'}
                                                                                            value={selectunit}
                                                                                            name="interval_unit"
                                                                                            options={offEveryOptions}
                                                                                            onChange={(e) => handleofEvery(e)}
                                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                        />

                                                                                        {LeaveAllocationEditFormik.touched.interval_unit &&
                                                                                            LeaveAllocationEditFormik.errors.interval_unit ? (
                                                                                            <div className="help-block text-danger">
                                                                                                {LeaveAllocationEditFormik.errors.interval_unit}
                                                                                            </div>
                                                                                        ) : null}
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </CCardBody>
                                                                </CCard>
                                                            </div>
                                                    }

                                                </div>

                                                : ""

                                        }

                                        {
                                            previousState === 'Regular Allocation' ?

                                                <div className='row mb-2'>
                                                    {
                                                        leaveAllocationEditDetails?.data?.state === 'validate' || leaveAllocationEditDetails?.data?.state === 'refuse' ?
                                                            <div className='col-md-12' style={{ pointerEvents: 'none' }}>
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
                                                                                    type="text"
                                                                                    name="number_of_days_display"
                                                                                    value={LeaveAllocationEditFormik.values.number_of_days_display}
                                                                                    className="form-control"
                                                                                    placeholder="Days per year"
                                                                                    maxLength={50}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />
                                                                                {LeaveAllocationEditFormik.touched.number_of_days_display &&
                                                                                    LeaveAllocationEditFormik.errors.number_of_days_display ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_of_days_display}
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
                                                                                    value={LeaveAllocationEditFormik.values.number_of_days_month}
                                                                                    // value={daysPerMonth}
                                                                                    className="form-control"
                                                                                    placeholder="Days per month"
                                                                                    maxLength={50}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />
                                                                                {LeaveAllocationEditFormik.touched.number_of_days_month &&
                                                                                    LeaveAllocationEditFormik.errors.number_of_days_month ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_of_days_month}
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
                                                            :


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
                                                                                    type="text"
                                                                                    name="number_of_days_display"
                                                                                    value={inputTitle}
                                                                                    className="form-control"
                                                                                    placeholder="Days per year"
                                                                                    maxLength={50}
                                                                                    onChange={(e) => setInputTitle(e.target.value)}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />
                                                                                {LeaveAllocationEditFormik.touched.number_of_days_display &&
                                                                                    LeaveAllocationEditFormik.errors.number_of_days_display ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_of_days_display}
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
                                                                                    value={LeaveAllocationEditFormik.values.number_of_days_month}
                                                                                    // value={daysPerMonth}
                                                                                    className="form-control"
                                                                                    placeholder="Days per month"
                                                                                    maxLength={50}
                                                                                    onKeyUp={e => handlechangevalidation(e.target.value)}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />
                                                                                {LeaveAllocationEditFormik.touched.number_of_days_month &&
                                                                                    LeaveAllocationEditFormik.errors.number_of_days_month ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_of_days_month}
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
                                                    }

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
                                                                            type="text"
                                                                            name="number_of_days_display"
                                                                            value={inputTitle}
                                                                            className="form-control"
                                                                            placeholder="Days per year"
                                                                            maxLength={50}
                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveAllocationEditFormik.touched.number_of_days_display &&
                                                                            LeaveAllocationEditFormik.errors.number_of_days_display ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.number_of_days_display}
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
                                                                            value={LeaveAllocationEditFormik.values.number_of_days_month}
                                                                            // value={daysPerMonth}
                                                                            className="form-control"
                                                                            placeholder="Days per month"
                                                                            maxLength={50}
                                                                            // onChange={LeaveAllocationEditFormik.handleChange}
                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveAllocationEditFormik.touched.number_of_days_month &&
                                                                            LeaveAllocationEditFormik.errors.number_of_days_month ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.number_of_days_month}
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
                                        {
                                            allocationStatus === 'accrual' ?
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
                                                                    <div className="col-md-4">
                                                                        <label htmlFor="hf-email">
                                                                            From <span className="error"> *</span>
                                                                        </label>
                                                                        {/* <CDatePicker locale="en-US" timepicker /> */}
                                                                        {/* <CDatePicker date="2023/03/15 02:22:13 PM" locale="en-US" timepicker /> */}
                                                                        {/* <CTimePicker locale="en-US" /> */}
                                                                        <SingleDatePicker
                                                                            id={'date_from'}
                                                                            date={dateFrom} // momentPropTypes.momentObj or null
                                                                            onDateChange={(date) => handleDateOfInc(date)} // PropTypes.func.isRequired
                                                                            focused={focusOfInc} // PropTypes.bool
                                                                            onFocusChange={({ focused }) => setFocusOfInc(focused)} // PropTypes.func.isRequired
                                                                            numberOfMonths={1}
                                                                            displayFormat="DD-MM-YYYY"
                                                                            // Timezone={"DD-MM-YYYY"}
                                                                            //showClearDate={true}
                                                                            isOutsideRange={d => d.isBefore(moment())}
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
                                                                        {LeaveAllocationEditFormik.touched.date_from &&
                                                                            LeaveAllocationEditFormik.errors.date_from ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.date_from}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="hf-email">
                                                                            To <span className="error"> *</span>
                                                                        </label>

                                                                        <SingleDatePicker
                                                                            id={'date_to'}
                                                                            // date={dateTo} // momentPropTypes.momentObj or null
                                                                            date={dateTo?._isValid == false ? null : dateTo}
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

                                                                        {LeaveAllocationEditFormik.touched.date_to &&
                                                                            LeaveAllocationEditFormik.errors.date_to ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.date_to}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="hf-email">
                                                                            Extra Days
                                                                        </label>

                                                                        <input
                                                                            type="text"
                                                                            name="number_of_days_display"
                                                                            value={inputTitle}
                                                                            // value={selectExtradays}
                                                                            // onChange={e => setTitle(e.target.value)}
                                                                            className="form-control"
                                                                            // {
                                                                            // ...allocationStatus === 'regular' ? placeholder = " Duration" : placeholder = " Duration"
                                                                            // }
                                                                            placeholder={"Extra Days"}
                                                                            maxLength={50}
                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                        />
                                                                        {LeaveAllocationEditFormik.touched.number_of_days_display &&
                                                                            LeaveAllocationEditFormik.errors.number_of_days_display ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.number_of_days_display}
                                                                            </div>
                                                                        ) : null}
                                                                    </div>

                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <label htmlFor="hf-email">
                                                                            Add
                                                                        </label>
                                                                        <div className="row">
                                                                            <div className="col-lg-8">
                                                                                <input
                                                                                    type="number"
                                                                                    name="number_per_interval"
                                                                                    value={LeaveAllocationEditFormik.values.number_per_interval}
                                                                                    className="form-control"
                                                                                    placeholder=" Add"
                                                                                    maxLength={25}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />

                                                                                {LeaveAllocationEditFormik.touched.number_per_interval &&
                                                                                    LeaveAllocationEditFormik.errors.number_per_interval ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.number_per_interval}
                                                                                    </div>
                                                                                ) : null}

                                                                            </div>
                                                                            <div className="col-lg-4">
                                                                                <Select
                                                                                    className="basic-single"
                                                                                    classNamePrefix="select"
                                                                                    placeholder={'Hours'}
                                                                                    value={selectintervalunit}
                                                                                    name="unit_per_interval"
                                                                                    options={addOption}
                                                                                    onChange={(e) => handleHours(e)}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />

                                                                                {LeaveAllocationEditFormik.touched.unit_per_interval &&
                                                                                    LeaveAllocationEditFormik.errors.unit_per_interval ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.unit_per_interval}
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
                                                                                    value={LeaveAllocationEditFormik.values.interval_number}
                                                                                    className="form-control"
                                                                                    placeholder=" Of Leave every"
                                                                                    maxLength={25}
                                                                                    onChange={LeaveAllocationEditFormik.handleChange}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />

                                                                                {LeaveAllocationEditFormik.touched.interval_number &&
                                                                                    LeaveAllocationEditFormik.errors.interval_number ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.interval_number}
                                                                                    </div>
                                                                                ) : null}

                                                                            </div>
                                                                            <div className="col-lg-4">
                                                                                <Select
                                                                                    className="basic-single"
                                                                                    classNamePrefix="select"
                                                                                    placeholder={'Days'}
                                                                                    value={selectunit}
                                                                                    name="interval_unit"
                                                                                    options={offEveryOptions}
                                                                                    onChange={(e) => handleofEvery(e)}
                                                                                    onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                                />

                                                                                {LeaveAllocationEditFormik.touched.interval_unit &&
                                                                                    LeaveAllocationEditFormik.errors.interval_unit ? (
                                                                                    <div className="help-block text-danger">
                                                                                        {LeaveAllocationEditFormik.errors.interval_unit}
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
                                            leaveAllocationEditDetails?.data?.state === 'validate' ?

                                                <div className="row mb-3" style={{ pointerEvents: 'none' }}>

                                                    <div className='col-md-12' >
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
                                                                            value={LeaveAllocationEditFormik.values.notes}
                                                                            maxLength={500}
                                                                            placeholder="Reason..."
                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                        />

                                                                        {LeaveAllocationEditFormik.touched.notes &&
                                                                            LeaveAllocationEditFormik.errors.notes ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.notes}
                                                                            </div>
                                                                        ) : null}


                                                                    </div>
                                                                </div>
                                                            </CCardBody>
                                                        </CCard>
                                                    </div>
                                                </div> :
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
                                                                            value={LeaveAllocationEditFormik.values.notes}
                                                                            maxLength={500}
                                                                            placeholder="Reason..."
                                                                            onChange={LeaveAllocationEditFormik.handleChange}
                                                                            onBlur={LeaveAllocationEditFormik.handleBlur}
                                                                        />

                                                                        {LeaveAllocationEditFormik.touched.notes &&
                                                                            LeaveAllocationEditFormik.errors.notes ? (
                                                                            <div className="help-block text-danger">
                                                                                {LeaveAllocationEditFormik.errors.notes}
                                                                            </div>
                                                                        ) : null}


                                                                    </div>
                                                                </div>
                                                            </CCardBody>
                                                        </CCard>
                                                    </div>
                                                </div>
                                        }






                                    </div>
                                    <CCardFooter>
                                        <CRow>
                                            <CCol className="col-md-12" align="center">
                                                <CButton type="submit" size="md" color="primary">
                                                    <CIcon name="cil-scrubber" /> Update
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
            )}
        </main>
    )
}

export default EditLeaveAllocation
