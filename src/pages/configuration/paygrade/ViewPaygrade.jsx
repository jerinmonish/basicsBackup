import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { PaygradeEditAPI } from '../../../actions/configuration'
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
import { convertValueLabel, decryptSingleData, encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const ViewPaygrade = (props) => {
  const dispatch = useDispatch()


  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(PaygradeEditAPI(decryptSingleData(props?.match?.params?.id)))
      //   dispatch(PayGradeDropDownList())
    }

  }, [])

  const { paygradeEditDetails } = useSelector((state) => state.configurationBackend)


  // console.log("paygradeEditDetails",paygradeEditDetails);


  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> View Pay Grade </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Name :</b>
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.name}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Pay Grade Code :
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.pay_grade_code}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Pay Structure :
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.pay_structure}
                      </label>

                    </div>

                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Pay Scale :
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.pay_scale}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Minimum (Per Month) :
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.min_pay}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Medium (Per Month):
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.med_pay}
                      </label>

                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Maximum (Per Month) :
                      </label>
                      <label className="ml-2">
                        {paygradeEditDetails?.data?.max_pay}
                      </label>

                    </div>



                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-12" align="center">
                      <Link
                        to={`/configuration/edit-paygrade/${encryptSingleData(
                          paygradeEditDetails?.data?.id,
                        )}`}
                        className="ml-3 btn btn-primary"
                      >
                        <CIcon name="cil-pencil" /> Edit
                      </Link>
                      <Link className="ml-3 btn btn-danger" to={'/configuration/paygrade'}>
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

export default ViewPaygrade
