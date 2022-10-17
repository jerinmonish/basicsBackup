import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList } from '../../../actions/commonAction'
import { LeaveRequestEditAPI, LeaveRequestUpdateAPI } from '../../../actions/leave'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CContainer,
    CFade,
    CForm,
    CCardFooter,
    CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { decryptSingleData } from '../../../utils/helper'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { faCheckCircle, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from 'src/utils/helper';
import { useState } from 'react';

const ViewLeaveRequest = (props) => {
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


    const [apstatus, setApStatus] = useState()

    useEffect(() => {
        // console.log();
        setApStatus(leaveRequestEditDetails?.data?.state_label)
    })

    console.log('apr', apstatus);
    const getBadge = (apstatus) => {
        // console.log(items);
        switch (apstatus) {
            case 'To Submit': return 'success'
            case 'validate': return 'success'
            case 'refuse': return 'grey'
            case 'To Approve': return 'warning'
            case 'cencel': return 'danger'
            default: return 'primary'
        }
    }

    // const [validate, setValidate] = useState({})

    const handleApproval = (id) => {
        const datavalue = {
            "params": {
                "data": {
                    "state": "validate"
                }
            }
        }
        if (id != undefined) {
            // console.log('in approval', id);

            dispatch(LeaveRequestUpdateAPI(datavalue, history, id));
        }
    }
    const handleConfirm = (id) => {
        const datavalue = {
            "params": {
                "data": {
                    "state": "confirm"
                }
            }
        }
        if (id != undefined) {
            // console.log('in approval', id);

            dispatch(LeaveRequestUpdateAPI(datavalue, history, id));
        }
    }

    const handleDraft = (id) => {
        const datavalue = {
            "params": {
                "data": {
                    "state": "draft"
                }
            }
        }
        if (id != undefined) {
            console.log('in approval', id);

            dispatch(LeaveRequestUpdateAPI(datavalue, history, id));
        }
    }

    const handleRefuse = (id) => {
        const datavalue = {
            "params": {
                "data": {
                    "state": "refuse"
                }
            }
        }
        if (id != undefined) {
            console.log('in approval', id);

            dispatch(LeaveRequestUpdateAPI(datavalue, history, id));
        }
    }



    // console.log("leaveRequestEditDetails", leaveRequestEditDetails?.data?.state);
    useEffect(() => { }, [isLoading, leaveRequestEditDetails?.data])

    return (
        <main className="c-main">
            <CFade>
                <CContainer fluid>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol col="3" className="left">
                                    <strong> View Leave Request</strong>
                                </CCol>
                                {/* <CCol col='md-4' align='end'>
                                    <Link className='btn btn-primary'>To Submit</Link>
                                    <Link className='btn btn-primary ml-2' >To Approve</Link>
                                    <Link className='btn btn-primary ml-2' >Refused</Link>
                                    <Link className='btn btn-primary ml-2' >Approved</Link>
                                </CCol> */}
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CForm className="form-horizontal">
                                <div>
                                    <div className="row form-group">



                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Group : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveRequestEditDetails?.data?.group_id_name}
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Company : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveRequestEditDetails?.data?.mode_company_id_name}
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Leave Type Name : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveRequestEditDetails?.data?.holiday_status_id_name}
                                            </label>
                                        </div>

                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Mode : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveRequestEditDetails?.data?.holiday_type}
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Function : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveRequestEditDetails?.data?.department_id_name}
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Employee : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveRequestEditDetails?.data?.employee_id_name}
                                            </label>
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
                                                                <b> From :</b>
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.request_date_from}
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                <b> From Half :</b>
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.from_half_label}
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                <b> To :</b>
                                                            </label>

                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.request_date_to}
                                                            </label>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                <b> To Half :</b>
                                                            </label>

                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.to_half_label}
                                                            </label>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label htmlFor="hf-email">

                                                                <b> Duration :</b>
                                                            </label>

                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.number_of_days}
                                                            </label>
                                                        </div>

                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-12">
                                                            <label htmlFor="hf-email">
                                                                <b>Description :</b>
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.name}
                                                            </label>
                                                        </div>
                                                    </div>

                                                </CCardBody>
                                            </CCard>
                                        </div>
                                    </div>
                                    <div className="row mb-3">

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
                                                            <label htmlFor="hf-email">
                                                                <b>Manager's Comment :</b>
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveRequestEditDetails?.data?.report_note}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label htmlFor="hf-email">
                                                                <b> Approval Status :</b>
                                                            </label>
                                                            <label className="ml-2">
                                                                <CBadge color={getBadge(apstatus)}>
                                                                    <span style={{ fontSize: 15 }}>{apstatus}</span>
                                                                </CBadge>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </CCardBody>
                                            </CCard>
                                        </div>

                                    </div>
                                </div>
                                <CCardFooter>
                                    <CRow>
                                        <CCol className="col-md-12 text-center" >
                                            {/* <Link className='ml-3 btn btn-xl  btn-info'> <FontAwesomeIcon icon={faCheckCircle} title='Approve' />Approve</Link> */}

                                            {/* {
                                                apstatus === 'To Submit' ? <Link
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        e.preventDefault()
                                                        handleConfirm(leaveRequestEditDetails?.data?.id)
                                                    }}
                                                    className="ml-3 btn btn-success" >
                                                    <CIcon name="cil-check" /> Confirm
                                                </Link> : ""

                                            } */}


                                            {/* {
                                                apstatus === 'To Submit' ? <Link
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        e.preventDefault()
                                                        handleConfirm(leaveRequestEditDetails?.data?.id)
                                                    }}
                                                    className="ml-3 btn btn-danger" >
                                                    <CIcon name="cil-ban" /> Cancel
                                                </Link> : ""
                                            } */}

                                            {/* {
                                                apstatus === 'To Approve' ? <Link onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                    handleApproval(leaveRequestEditDetails?.data?.id)
                                                }} className="ml-3 btn btn-info" >
                                                    <CIcon name="cil-checkCircle" /> Approve
                                                </Link> : ""

                                            } */}

                                            {/* {
                                                apstatus === 'To Approve' ? <Link
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        e.preventDefault()
                                                        handleRefuse(leaveRequestEditDetails?.data?.id)
                                                    }}
                                                    className="ml-3 btn btn-danger" >
                                                    <CIcon name="cil-xCircle" className='mb-2' /> Refuse
                                                </Link> : ""

                                            } */}

                                            {/* {
                                                apstatus === 'Approved' ? "" :
                                                    <Link
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            e.preventDefault()
                                                            handleDraft(leaveRequestEditDetails?.data?.id)
                                                        }}
                                                        className="ml-3 btn btn-secondary">
                                                        <CIcon name="cil-list" /> Mark as Draft
                                                    </Link>
                                            } */}

                                            {/* <CCol className='col-md-10' align="center" >
                                                <Link to={`/master/edit-company/${encryptSingleData(companyDetails?.data?.id)}`} className='ml-3 btn btn-primary'><CIcon name="cil-pencil" /> Edit</Link>
                                                <Link className='ml-3 btn btn-danger' to={'/master/company'}><CIcon name="cil-ban" /> Cancel</Link>
                                            </CCol> */}

                                            <Link
                                                to={`/leave/edit-leaveRequest/${encryptSingleData(
                                                    leaveRequestEditDetails?.data?.id,
                                                )}`}
                                                className="ml-3 btn btn-primary"
                                            >
                                                <CIcon name="cil-pencil" /> Edit
                                            </Link>
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

export default ViewLeaveRequest
