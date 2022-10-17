import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LeaveMainTypesUpdateAPI, LeaveMainTypesEditAPI } from '../../../actions/leave'
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
import { decryptSingleData, convertValueLabel } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const EditMainTypes = (props) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const { maintypesEditDetails, isLoading } = useSelector(state => state.leaveBackend);

    useEffect(() => {
        // dispatch(CompanyDropDownList());
        if (props?.match?.params?.id) {
            dispatch(LeaveMainTypesEditAPI(decryptSingleData(props?.match?.params?.id)));
        }
    }, []);

    //when onchange
    const handleMode = (e) => {
        setCheckModeStatus(e?.value)
        if (e) {
            setMode(convertValueLabel(e.value, e.label));
            MaintypeEditFormik.setFieldValue('main_type', e?.value);

        }
    }
    const handleApproval = (e) => {
        if (e) {

            setApproval(convertValueLabel(e.value, e.label));
            MaintypeEditFormik.setFieldValue('main_validation_type', e?.value);

        }
    }
    const [checkModeStatus, setCheckModeStatus] = useState('fixed_allocation');

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
    const MaintypeEditFormik = useFormik({
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
            dispatch(LeaveMainTypesUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
            // console.log("formData", formData);
        },
    })

    useEffect(() => {
        if (maintypesEditDetails?.data !== null) {
            // console.log("Maintypes", maintypesEditDetails?.data);
            MaintypeEditFormik.setValues({
                "name": maintypesEditDetails?.data?.name,
                "code": maintypesEditDetails?.data?.code,
                "main_type": maintypesEditDetails?.data?.main_type,
                "main_validation_type": maintypesEditDetails?.data?.main_validation_type,
            });
        }
        if (maintypesEditDetails?.data !== undefined && maintypesEditDetails?.data !== null) {

            setMode(convertValueLabel(maintypesEditDetails?.data?.main_type, maintypesEditDetails?.data?.main_type_label));
            setApproval(convertValueLabel(maintypesEditDetails?.data?.main_validation_type, maintypesEditDetails?.data?.main_validation_type_label));
            // setTakeLeave(convertValueLabel(maintypesEditDetails?.data?.request_unit, maintypesEditDetails?.data?.request_unit_label));

        }
    }, [isLoading, maintypesEditDetails?.data])

    return (
        <main className="c-main">
            <CFade>
                <CContainer fluid>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol col="6" className="left">
                                    <strong> Edit Main Types</strong>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={MaintypeEditFormik.handleSubmit} className="form-horizontal">
                                <div>
                                    <div className="row form-group">

                                        <div className="col-md-4">
                                            <label htmlFor="hf-email">
                                                Main Type Name <span className="error"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={MaintypeEditFormik.values.name}
                                                className="form-control"
                                                placeholder="Main Type Name"
                                                maxLength={25}
                                                onChange={MaintypeEditFormik.handleChange}
                                                onBlur={MaintypeEditFormik.handleBlur}
                                            />

                                            {MaintypeEditFormik.touched.name && MaintypeEditFormik.errors.name ? (<div className="help-block text-danger">{MaintypeEditFormik.errors.name}
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
                                                value={MaintypeEditFormik.values.code}
                                                className="form-control"
                                                placeholder="Code"
                                                maxLength={25}
                                                onChange={MaintypeEditFormik.handleChange}
                                                onBlur={MaintypeEditFormik.handleBlur}
                                            />

                                            {MaintypeEditFormik.touched.code && MaintypeEditFormik.errors.code ? (<div className="help-block text-danger">{MaintypeEditFormik.errors.code}
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
                                                onBlur={MaintypeEditFormik.handleBlur}
                                            />
                                            {/* {onChange = {({ value }) => MaintypeEditFormik.setFieldValue('allocation_type', value)} } */}

                                            {MaintypeEditFormik.touched.main_type &&
                                                MaintypeEditFormik.errors.main_type ? (
                                                <div className="help-block text-danger">
                                                    {MaintypeEditFormik.errors.main_type}
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
                                                        onBlur={MaintypeEditFormik.handleBlur}
                                                    />

                                                    {MaintypeEditFormik.touched.main_validation_type && MaintypeEditFormik.errors.main_validation_type ? (
                                                        <div className="help-block text-danger">
                                                            {MaintypeEditFormik.errors.
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
                                                <CIcon name="cil-scrubber" /> Update
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

export default EditMainTypes
