import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CommonGroupList, CompanyDropDownList, LocationDropDownList, FunctionDropDownList } from '../../../actions/commonAction'
import { LeaveMainTypesAddAPI } from '../../../actions/leave'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
import { indianDateFormat, convertValueLabel } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const AddMainTypes = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    //when onchange
    const handleMode = (e) => {
        setCheckModeStatus(e?.value)
        if (e) {
            LeaveTypesAddFormik.setFieldValue('main_type', e?.value);
            setMode(convertValueLabel(e.value, e.label));
        }
    }

    const handleApproval = (e) => {
        if (e) {
            LeaveTypesAddFormik.setFieldValue('main_validation_type', e?.value);
            setApproval(convertValueLabel(e.value, e.label));
        }
    }

    const [checkModeStatus, setCheckModeStatus] = useState([]);

    const [todateChange, setTodateChange] = useState([]);

    //dropdown 

    const [mode, setMode] = useState([]);
    const [approval, setApproval] = useState([]);
    const [takeLeave, setTakeLeave] = useState([]);
    // to load the select data
    const [modeOptions, setModeOptions] = useState([{ value: 'no', label: 'No Limit' }, { value: 'fixed_allocation', label: 'Allow Employees Requests' }, { value: 'fixed', label: 'Set by Leave Officer' }]);
    const [allocationOptions, setAllocationOptions] = useState([{ value: 'hr', label: 'By Leave Officer' }, { value: 'manager', label: 'By Employees Manager' }, { value: 'both', label: 'By Employees Manager and Leave Officer' }]);


    // console.log("roleOptions",dropdownData?.roleCommonData);
    //Designation Add Form Initilization
    const LeaveTypesAddFormik = useFormik({
        initialValues: {
            name: '',
            code: '',
            main_type: '',
            main_validation_type: '',

        },
        validationSchema: Yup.object({
            // main_validation_type: Yup.string().required('This field is required'),
            // main_type: Yup.string().required('This field is required'),
            name: Yup.string().required('This field is required'),
            // code: Yup.string().required('This field is required'),


        }),
        onSubmit: (values) => {
            const formData = JSON.stringify({ params: { data: values } })
            dispatch(LeaveMainTypesAddAPI(formData, history))
            console.log("formData", formData);
        },
    })


    return (
        <main className="c-main">
            <CFade>
                <CContainer fluid>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol col="6" className="left">
                                    <strong> Add Main Types</strong>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={LeaveTypesAddFormik.handleSubmit} className="form-horizontal">
                                <div>
                                    <div className="row form-group">

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                Main Type Name <span className="error"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                // value={LeaveTypesAddFormik.values.name}
                                                className="form-control"
                                                placeholder="Main Type Name"
                                                maxLength={25}
                                                onChange={LeaveTypesAddFormik.handleChange}
                                                onBlur={LeaveTypesAddFormik.handleBlur}
                                            />

                                            {LeaveTypesAddFormik.touched.name && LeaveTypesAddFormik.errors.name ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.name}
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
                                                // value={LeaveTypesAddFormik.values.name}
                                                className="form-control"
                                                placeholder="Code"
                                                maxLength={25}
                                                onChange={LeaveTypesAddFormik.handleChange}
                                                onBlur={LeaveTypesAddFormik.handleBlur}
                                            />

                                            {LeaveTypesAddFormik.touched.code && LeaveTypesAddFormik.errors.code ? (<div className="help-block text-danger">{LeaveTypesAddFormik.errors.code}
                                            </div>
                                            ) : null}
                                        </div>


                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                Mode
                                            </label>
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                placeholder={'Choose a Mode'}
                                                value={mode}
                                                name="main_type"
                                                options={modeOptions}
                                                onChange={(e) => handleMode(e)}
                                                onBlur={LeaveTypesAddFormik.handleBlur}
                                            />
                                            {/* {onChange = {({ value }) => LeaveTypesAddFormik.setFieldValue('allocation_type', value)} } */}

                                            {LeaveTypesAddFormik.touched.main_type &&
                                                LeaveTypesAddFormik.errors.main_type ? (
                                                <div className="help-block text-danger">
                                                    {LeaveTypesAddFormik.errors.main_type}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {
                                        checkModeStatus == 'fixed_allocation' ?
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label htmlFor="hf-email">
                                                        Allocation Validation
                                                    </label>
                                                    <Select
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        placeholder={'Choose a  Approval Condition'}
                                                        value={approval}
                                                        name="main_validation_type"
                                                        options={allocationOptions}
                                                        onChange={(e) => handleApproval(e)}
                                                        onBlur={LeaveTypesAddFormik.handleBlur}
                                                    />

                                                    {LeaveTypesAddFormik.touched.main_validation_type && LeaveTypesAddFormik.errors.main_validation_type ? (
                                                        <div className="help-block text-danger">
                                                            {LeaveTypesAddFormik.errors.
                                                                main_validation_type}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            : ""
                                    }



                                </div>
                                <CCardFooter>
                                    <CRow>
                                        <CCol className="col-md-10" align="center">
                                            <CButton type="submit" size="md" color="primary">
                                                <CIcon name="cil-scrubber" /> Save
                                            </CButton>
                                            <Link className="ml-3 btn btn-danger" to={'/leave/maintypes'}>
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

export default AddMainTypes
