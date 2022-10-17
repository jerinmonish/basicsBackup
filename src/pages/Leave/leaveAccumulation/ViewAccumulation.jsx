import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
// import { LeaveTypesDropDownList } from './../../actions/commonAction';
import { LeaveAccumulationEditData } from './../../../actions/leave';
import Select from 'react-select';
import "react-dates/initialize";
import moment from 'moment';
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
  CFormGroup,
  CCardFooter,
  CLabel,
  CInputCheckbox
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "react-dates/lib/css/_datepicker.css";
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { decryptSingleData, encryptSingleData } from '../../../utils/helper'

const ViewAccumulation = (props) => {
  const dispatch = useDispatch();
  const dropdownData = useSelector((state) => state.commonData)

  const { leaveAccumulationDetails, isLoading } = useSelector(state => state.leaveBackend);

  useEffect(() => {
    // dispatch(CompanyDropDownList());
    if (props?.match?.params?.id) {
      dispatch(LeaveAccumulationEditData(decryptSingleData(props?.match?.params?.id)));
    }
  }, []);


  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong>View Leave Accumulation</strong>
                </CCol>
                {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Title  :</label>
                      <label className="ml-2">
                        {leaveAccumulationDetails?.data?.name ? leaveAccumulationDetails?.data?.name : "-"}
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Carry Over From  :</label>

                      <label className="ml-2">
                        {leaveAccumulationDetails?.data?.source_leave_type_id ? leaveAccumulationDetails?.data?.source_leave_type_id : "-"}
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">Carry Over To  :</label>
                      <label className="ml-2">
                        {leaveAccumulationDetails?.data?.dest_leave_type_id ? leaveAccumulationDetails?.data?.dest_leave_type_id : "-"}
                      </label>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      <label htmlFor="hf-email">Carry Over Method : </label>

                      <label className="ml-2">
                        {leaveAccumulationDetails?.data?.dest_leave_type_id ? leaveAccumulationDetails?.data?.dest_leave_type_id : "-"}
                      </label>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="hf-email">Carry Over Percentage % :</label>
                      <label className="ml-2">
                        {leaveAccumulationDetails?.data?.carryover_percentage ? leaveAccumulationDetails?.data?.carryover_percentage : "-"}
                      </label>
                    </div>

                    {/* <div className="col-md-2">
                      <CFormGroup variant="custom-checkbox" inline id='accumulation_add_leave'>
                        <CInputCheckbox custom id="limit_carryover" name="limit_carryover" onChange={(e) => handleLimitCarryOver(e)} />
                        <CLabel variant="custom-checkbox" htmlFor="limit_carryover">Limit Carry Over</CLabel>
                      </CFormGroup>
                      {LeaveAccumulation.errors.limit_carryover ? <div className="help-block text-danger">{LeaveAccumulation.errors.limit_carryover}</div> : null}
                    </div> */}

                    <div className="col-md-3">
                      <label htmlFor="hf-email">Max Days to Carry Over : </label>

                      <label className="ml-2">
                        {leaveAccumulationDetails?.data?.carryover_days ? leaveAccumulationDetails?.data?.carryover_days : "-"}
                      </label>
                    </div>

                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-12" align="center">
                      <Link
                        to={`/leave/edit-accumulation/${encryptSingleData(
                          leaveAccumulationDetails?.data?.id,
                        )}`}
                        className="ml-3 btn btn-primary"
                      >
                        <CIcon name="cil-pencil" /> Edit
                      </Link>
                      <Link className="ml-3 btn btn-danger" to={'/leave/accumulation'}>
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

export default ViewAccumulation