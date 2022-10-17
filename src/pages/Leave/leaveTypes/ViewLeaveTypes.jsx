import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList } from '../../../actions/commonAction'
import { LeaveTypesEditAPI, LeaveTypesUpdateAPI } from '../../../actions/leave'
import { useFormik } from 'formik'
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
import { decryptSingleData, indianDateFormat, convertValueLabel, convertDateToMDY, encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import CLoader from 'src/pages/loader/CLoader'

const ViewLeaveTypes = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dropdownData = useSelector((state) => state.commonData)
    const { leaveTypesEditDetails, isLoading } = useSelector(state => state.leaveBackend);

    useEffect(() => {
        // dispatch(CompanyDropDownList());
        dispatch(CommonGroupList())
        if (props?.match?.params?.id) {
            dispatch(LeaveTypesEditAPI(decryptSingleData(props?.match?.params?.id)));

        }
    }, []);

    // console.log("view", leaveTypesEditDetails?.data);

    useEffect(() => { }, [isLoading, leaveTypesEditDetails?.data])

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
                                        <strong> View Leave Types</strong>
                                    </CCol>
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
                                                    {leaveTypesEditDetails?.data?.group_id_name}
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Company : </b>
                                                </label>
                                                <label className="ml-2">
                                                    {leaveTypesEditDetails?.data?.company_id_name}
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Leave Type Name : </b>
                                                </label>
                                                <label className="ml-2">
                                                    {leaveTypesEditDetails?.data?.name}
                                                </label>
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
                                                                    <b> From : </b>
                                                                </label>
                                                                <label className="ml-2">
                                                                    {leaveTypesEditDetails?.data?.validity_start}
                                                                </label>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="hf-email">
                                                                    <b> To :</b>
                                                                </label>
                                                                <label className="ml-2">
                                                                    {leaveTypesEditDetails?.data?.validity_stop}
                                                                </label>

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
                                                                    <b>  Mode : </b>
                                                                </label>
                                                                <label className="ml-2">
                                                                    {leaveTypesEditDetails?.data?.allocation_type_label}
                                                                </label>
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
                                                                    <b>  Approval Condition:</b>
                                                                </label>
                                                                <label className="ml-2">
                                                                    {leaveTypesEditDetails?.data?.allocation_validation_type_label}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </CCardBody>
                                                </CCard>
                                            </div>
                                        </div>

                                        <div className="row form-group">
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b> Take Leave In :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {leaveTypesEditDetails?.data?.request_unit}
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b> Code :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {leaveTypesEditDetails?.data?.code}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <CCardFooter>
                                        <CRow>
                                            <CCol className="col-md-12" align="center">
                                                <Link
                                                    to={`/leave/edit-leaveTypes/${encryptSingleData(
                                                        leaveTypesEditDetails?.data?.id,
                                                    )}`}
                                                    className="ml-3 btn btn-primary"
                                                >
                                                    <CIcon name="cil-pencil" /> Edit
                                                </Link>
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

export default ViewLeaveTypes
