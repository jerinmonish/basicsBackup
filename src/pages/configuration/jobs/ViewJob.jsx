import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, CommonCompanyIdBasedData, CommonGroupList } from './../../../actions/commonAction'
import { JobEdit, JobUpdate } from '../../../actions/configuration'
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

const ViewJob = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  const { jobDetails, isLoading } = useSelector((state) => state.configurationBackend)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CommonGroupList());
    if (props?.match?.params?.id) {
      dispatch(JobEdit(decryptSingleData(props?.match?.params?.id)));
    }
  }, []);
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
                      <strong> View Job </strong>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Group Name : </b></label>
                        <span className='ml-2'>{jobDetails?.data?.group_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Company : </b></label>
                        <span className='ml-2'>{jobDetails?.data?.company_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Location : </b></label>
                        <span className='ml-2'>{jobDetails?.data?.location_id_name}</span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Function Name : </b></label>
                        <span className='ml-2'>{jobDetails?.data?.department_id_name}</span>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email"><b>Job Title : </b></label>
                        <span className='ml-2'>{jobDetails?.data?.name}</span>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-8">
                        <label htmlFor="hf-email"><b>Job Description : </b></label>
                        <span className='ml-2'>{jobDetails?.data?.description}</span>
                      </div>
                    </div>
                  </div>
                  <CCardFooter>
                    <CRow>
                      <CCol className="col-md-10" align="center">
                        <Link to={`/configuration/edit-job/${encryptSingleData(jobDetails?.data?.id)}`} className='ml-3 btn btn-primary'><CIcon name="cil-pencil" /> Edit</Link>
                        <Link className="ml-3 btn btn-danger" to={'/configuration/jobs'}>
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

export default ViewJob
