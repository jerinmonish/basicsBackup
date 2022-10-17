import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LeaveTypesDropDownList, FunctionDropDownList, HREmployeeDropDownList } from '../../../actions/commonAction'
import { LeaveAllocationEditAPI } from '../../../actions/leave'
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
import { decryptSingleData, indianDateFormat, convertValueLabel, encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
// import { CTimePicker } from '@coreui/react-pro@next'

const ViewLeaveAllocation = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { leaveAllocationEditDetails, isLoading } = useSelector(state => state.leaveBackend);
    // console.log("dropdownData",dropdownData);
    useEffect(() => {
        // dispatch(CompanyDropDownList());
        dispatch(CommonGroupList())
        if (props?.match?.params?.id) {
            dispatch(LeaveAllocationEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, []);


    console.log("leaveAllocationEditDetails", leaveAllocationEditDetails);
    // useEffect(() => {
    //     isLoading, leaveAllocationEditDetails
    // }, [isLoading, leaveAllocationEditDetails])

    // "regular - Regular Allocation
    // accrual - Accrual Allocation"
    //dropdown 

    return (
        <main className="c-main">
            <CFade>
                <CContainer fluid>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol col="6" className="left">
                                    <strong> View Leave Allocation</strong>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CForm className="form-horizontal">
                                <div>

                                    <div className="row form-group">
                                        <div className="col-md-12">
                                            <label htmlFor="hf-email">
                                                Description
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.name}
                                            </label>
                                        </div>

                                    </div>

                                    <div className="row form-group">


                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Group : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.group_id_name}
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b>Company : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.mode_company_id_name}
                                            </label>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b> Function : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.department_id_name}
                                            </label>

                                        </div>




                                    </div>



                                    <div className="row form-group">
                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b> Mode : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.holiday_type_label}
                                            </label>

                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b> Location : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.location_id_name}
                                            </label>

                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b> Employee : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.employee_id_name}
                                            </label>

                                        </div>

                                    </div>
                                    <div className="row form-group">

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b> Leave Type Name : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.holiday_status_id_name}
                                            </label>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                <b> Allocation Type : </b>
                                            </label>
                                            <label className="ml-2">
                                                {leaveAllocationEditDetails?.data?.allocation_type_label}
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
                                                                From
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.date_from}
                                                            </label>
                                                        </div>
                                                        <div className="col-lg-3">

                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.my_hours}
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.my_minits}
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.my_ampm}
                                                            </label>


                                                            <div className="row">
                                                                {/* <div className="col-lg-4">
                                                                    <Select
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'HH'}
                                                                        // value={getHours}
                                                                        name="my_hours"
                                                                        options={findHours}
                                                                        onChange={(e) => handleHoursfrom(e)}
                                                                        // onChange={LeaveAllocationAddFormik.handleChange}
                                                                        // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('my_hours', value)}
                                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                    />
                                                                </div> */}
                                                                <div className="col-lg-4">
                                                                    {/* <Select
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'MM'}
                                                                        // value={getHours}
                                                                        name="my_minits"
                                                                        options={findmins}
                                                                        onChange={(e) => handleMinitsfrom(e)}
                                                                        // onChange={LeaveAllocationAddFormik.handleChange}
                                                                        // onChange={({ value }) => LeaveAllocationAddFormik.setFieldValue('date_from', value)}
                                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                    /> */}
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    {/* <Select
                                                                        className="basic-single"
                                                                        classNamePrefix="select"
                                                                        placeholder={'AM/PM'}
                                                                        // value={getHours}
                                                                        name="my_ampm"
                                                                        options={addAmPm}
                                                                        onChange={(e) => handleAmPmfrom(e)}
                                                                        // onChange={(e) => handleofEvery(e)}
                                                                        // onChange={LeaveAllocationAddFormik.handleChange}
                                                                        onBlur={LeaveAllocationAddFormik.handleBlur}
                                                                    /> */}
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                To
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.date_to}
                                                            </label>
                                                        </div>
                                                        <div className="col-lg-3">

                                                            <div className="row">
                                                                <div className="col-lg-4">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.my_hours}
                                                                    </label>

                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.my_hours}
                                                                    </label>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.my_hours}
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>


                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-4">
                                                            <label htmlFor="hf-email">
                                                                Add
                                                            </label>
                                                            <div className="row">
                                                                <div className="col-lg-8">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.number_per_interval}
                                                                    </label>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.interval_unit}
                                                                    </label>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-md-4 ">

                                                            <label htmlFor="hf-email">
                                                                Of time off every <span className="error"> *</span>
                                                            </label>
                                                            <div className="row">
                                                                <div className="col-lg-8">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.interval_number}
                                                                    </label>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <label className="ml-2">
                                                                        {leaveAllocationEditDetails?.data?.interval_unit}
                                                                    </label>


                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label htmlFor="hf-email">
                                                                Extra Days
                                                            </label>
                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.number_of_days_display}
                                                            </label>

                                                        </div>
                                                        <div className="col-md-2" style={{ marginTop: '33px' }}>
                                                            <label htmlFor="hf-email">
                                                                Days per year
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
                                                        <h5 className="m-0 p-0">Reason</h5>
                                                    </div>
                                                </CCardHeader>
                                                <CCardBody>
                                                    <div className="row">
                                                        <div className="col-md-12">

                                                            <label className="ml-2">
                                                                {leaveAllocationEditDetails?.data?.notes}
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
                                            <Link
                                                to={`/leave/edit-leaveAllocation/${encryptSingleData(
                                                    leaveAllocationEditDetails?.data?.id,
                                                )}`}
                                                className="ml-3 btn btn-primary"
                                            >
                                                <CIcon name="cil-pencil" /> Edit
                                            </Link>
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

export default ViewLeaveAllocation
