import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { PaygradeUpdateAPI, PaygradeEditAPI } from '../../../actions/configuration'
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { convertValueLabel, decryptSingleData } from '../../../utils/helper'
import { useHistory } from 'react-router-dom'

const EditPaygrade = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  // to load the option data for dropdown
  const payGradeOptions = dropdownData?.paygradeComData?.data?.result

  const { paygradeEditDetails, isLoading } = useSelector((state) => state.configurationBackend)

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(PaygradeEditAPI(decryptSingleData(props?.match?.params?.id)))
      //   dispatch(PayGradeDropDownList())
    }

  }, [])

  useEffect(() => {
    if (paygradeEditDetails?.data !== null) {
      PaygradeEditFormik.setValues({
        name: paygradeEditDetails?.data?.name,
        pay_grade_code: paygradeEditDetails?.data?.pay_grade_code,
        pay_structure: paygradeEditDetails?.data?.pay_structure,
        pay_scale: paygradeEditDetails?.data?.pay_scale,
        min_pay: paygradeEditDetails?.data?.min_pay,
        med_pay: paygradeEditDetails?.data?.med_pay,
        max_pay: paygradeEditDetails?.data?.max_pay,

      })
    }

  }, [isLoading, paygradeEditDetails?.data])

  //Designation Add Form Initilization
  const PaygradeEditFormik = useFormik({
    initialValues: {
      name: "",
      pay_grade_code: '',
      pay_structure: 0,
      pay_scale: "",
      min_pay: "",
      med_pay: '',
      max_pay: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      pay_grade_code: Yup.string().required('This field is required'),
      pay_structure: Yup.number().typeError('Plz Enter Number only ').required(2, 'This field is require Number only'),
      pay_scale: Yup.string().required('This field is required'),
      min_pay: Yup.string().required('This field is required'),
      med_pay: Yup.string().required('This field is required'),
      max_pay: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(PaygradeUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
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
                  <strong> Edit Pay Grade </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={PaygradeEditFormik.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={PaygradeEditFormik.values.name}
                        className="form-control"
                        placeholder="Enter name"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.name &&
                        PaygradeEditFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Pay Grade Code <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="pay_grade_code"
                        value={PaygradeEditFormik.values.pay_grade_code}
                        className="form-control"
                        placeholder="Enter Pay Grade Code"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.pay_grade_code &&
                        PaygradeEditFormik.errors.pay_grade_code ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.pay_grade_code}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Pay Structure <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="pay_structure"
                        value={PaygradeEditFormik.values.pay_structure}
                        className="form-control"
                        placeholder="Enter Pay structure"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.pay_structure &&
                        PaygradeEditFormik.errors.pay_structure ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.pay_structure}
                        </div>
                      ) : null}
                    </div>

                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Pay Scale <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="pay_scale"
                        value={PaygradeEditFormik.values.pay_scale}
                        className="form-control"
                        placeholder="Enter Pay scale"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.pay_scale &&
                        PaygradeEditFormik.errors.pay_scale ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.pay_scale}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Minimum (Per Month) <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="min_pay"
                        value={PaygradeEditFormik.values.min_pay}
                        className="form-control"
                        placeholder="Enter Minimum Pay"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.min_pay &&
                        PaygradeEditFormik.errors.min_pay ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.min_pay}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Medium (Per Month) <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="med_pay"
                        value={PaygradeEditFormik.values.med_pay}
                        className="form-control"
                        placeholder="Enter Medium Pay"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.med_pay &&
                        PaygradeEditFormik.errors.med_pay ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.med_pay}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Maximum (Per Month) <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="max_pay"
                        value={PaygradeEditFormik.values.max_pay}
                        className="form-control"
                        placeholder="Enter Maximum Pay"
                        maxLength={25}
                        onChange={PaygradeEditFormik.handleChange}
                        onBlur={PaygradeEditFormik.handleBlur}
                      />
                      {PaygradeEditFormik.touched.max_pay &&
                        PaygradeEditFormik.errors.max_pay ? (
                        <div className="help-block text-danger">
                          {PaygradeEditFormik.errors.max_pay}
                        </div>
                      ) : null}
                    </div>

                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Update
                      </CButton>
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

export default EditPaygrade
