import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CandidateList } from '../../../actions/onboarding'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const ViewCandidate = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { candidatelistDetails, isLoading } = useSelector((state) => state.onboardingBackend)

  // console.log("candidatelistDetails", candidatelistDetails);

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CandidateList(encryptSingleData(props?.match?.params?.id)))
    }
  }, [])



  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> View Candidate </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <div>
                  <div className="row form-group">

                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Candidate's Name  : </b>
                      </label>

                      <label className="ml-2">
                        {candidatelistDetails?.data?.result[0].partner_name}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Subject :</b>
                      </label>

                      <label className="ml-2">
                        {candidatelistDetails?.data?.result[0].name}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label hidden htmlFor="hf-email">
                        <b>Temporary Reference :</b>
                      </label>

                      <label className="ml-2">
                        {candidatelistDetails?.data?.result[0].reference}
                      </label>

                    </div>

                  </div>
                  <div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Email :</b>
                        </label>

                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].email_from}
                        </label>

                      </div>

                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Mobile :</b>
                        </label>

                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].partner_mobile}
                        </label>

                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Applied on :</b>
                        </label>

                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].applied_on}
                        </label>

                      </div>

                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Group :</b>
                        </label>
                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].group_id_name}
                        </label>

                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Company :</b>
                        </label>
                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].company_id_name}
                        </label>

                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Location :</b>
                        </label>

                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].location_id_name}
                        </label>

                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Function :</b>
                        </label>

                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].department_id_name}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Applied Job :</b>
                        </label>
                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].job_id_name}
                        </label>

                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Medium :</b>
                        </label>
                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].medium_id_name}
                        </label>

                      </div>
                    </div>

                    <div className="row form-group">


                      <div className="col-md-8">
                        <label htmlFor="hf-email">
                          <b>Application Summary :</b>
                        </label>

                        <label className="ml-2">
                          {candidatelistDetails?.data?.result[0].description}
                        </label>

                      </div>
                    </div>
                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">

                      <Link to={`/onboarding/edit-candidate/${encryptSingleData(candidatelistDetails?.data?.id)}`} className='ml-3 btn btn-primary'><CIcon name="cil-pencil" /> Edit</Link>
                      <Link className="ml-3 btn btn-danger" to={'/onboarding/candidates'}>
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

export default ViewCandidate
