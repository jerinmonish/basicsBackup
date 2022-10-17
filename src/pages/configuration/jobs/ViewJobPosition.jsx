import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList } from './../../../actions/commonAction'
import { JobPostionEdit } from '../../../actions/configuration'
import { useFormik } from 'formik'
import { convertValueLabel, decryptSingleData, encryptSingleData } from '../../../utils/helper'
import Select from 'react-select'
import CLoader from '../../loader/CLoader';
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const ViewJobPosition = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  const { jobPositionDetails, isLoading } = useSelector((state) => state.configurationBackend)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList());
    if (props?.match?.params?.id) {
      dispatch(JobPostionEdit(decryptSingleData(props?.match?.params?.id)));
    }
  }, []);
  console.log(jobPositionDetails?.data);
  return (
    <main className="c-main">
      {
        (isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> View Job Position</strong>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Group Name : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.group_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Company : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.company_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Location : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.location_id_name}</span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Function : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.department_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Sub Function : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.sub_function_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Job : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.job_id_name}</span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Position Code : </b></label>
                        <span className='ml-2'>{jobPositionDetails?.data?.name}</span>
                      </div>
                    </div>
                  </div>
                  <CCardFooter>
                    <CRow>
                      <CCol className="col-md-10" align="center">
                        <Link to={`/configuration/edit-job-position/${encryptSingleData(jobPositionDetails?.data?.id)}`} className='ml-3 btn btn-primary'><CIcon name="cil-pencil" /> Edit</Link>
                        <Link className="ml-3 btn btn-danger" to={'/configuration/job-position'}>
                          <CIcon name="cil-ban" /> Cancel
                        </Link>
                      </CCol>
                    </CRow>
                  </CCardFooter>
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
      }
    </main>
  )
}

export default ViewJobPosition
