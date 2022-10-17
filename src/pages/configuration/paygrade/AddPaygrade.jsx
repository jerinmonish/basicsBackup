import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { PaygradeAddAPI } from '../../../actions/configuration'
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
import { useHistory } from 'react-router-dom'

const AddPaygrade = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  // to load the option data for dropdown
  const payGradeOptions = dropdownData?.paygradeComData?.data?.result

  //Designation Add Form Initilization
  const PaygradeAddFormik = useFormik({
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
      pay_structure: Yup.number().typeError('Plz Enter Number only ').required('This field is require Number only'),
      pay_scale: Yup.string().required('This field is required'),
      min_pay: Yup.string().required('This field is required'),
      med_pay: Yup.string().required('This field is required'),
      max_pay: Yup.string().required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(PaygradeAddAPI(formData, history))
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
                  <strong> Add Pay Grade </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={PaygradeAddFormik.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={PaygradeAddFormik.values.name}
                        className="form-control"
                        placeholder="Enter Name"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.name &&
                        PaygradeAddFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.name}
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
                        value={PaygradeAddFormik.values.pay_grade_code}
                        className="form-control"
                        placeholder="Enter Pay Grade Code"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.pay_grade_code &&
                        PaygradeAddFormik.errors.pay_grade_code ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.pay_grade_code}
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
                        value={PaygradeAddFormik.values.pay_structure}
                        className="form-control"
                        placeholder=" Pay Structure"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.pay_structure &&
                        PaygradeAddFormik.errors.pay_structure ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.pay_structure}
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
                        value={PaygradeAddFormik.values.pay_scale}
                        className="form-control"
                        placeholder="Enter Pay scale"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.pay_scale &&
                        PaygradeAddFormik.errors.pay_scale ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.pay_scale}
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
                        value={PaygradeAddFormik.values.min_pay}
                        className="form-control"
                        placeholder="Enter Minimum Pay"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.min_pay &&
                        PaygradeAddFormik.errors.min_pay ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.min_pay}
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
                        value={PaygradeAddFormik.values.med_pay}
                        className="form-control"
                        placeholder="Enter Medium Pay"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.med_pay &&
                        PaygradeAddFormik.errors.med_pay ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.med_pay}
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
                        value={PaygradeAddFormik.values.max_pay}
                        className="form-control"
                        placeholder="Enter Maximum Pay"
                        maxLength={25}
                        onChange={PaygradeAddFormik.handleChange}
                        onBlur={PaygradeAddFormik.handleBlur}
                      />
                      {PaygradeAddFormik.touched.max_pay &&
                        PaygradeAddFormik.errors.max_pay ? (
                        <div className="help-block text-danger">
                          {PaygradeAddFormik.errors.max_pay}
                        </div>
                      ) : null}
                    </div>



                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <CButton type="submit" size="md" color="primary">
                        <CIcon name="cil-scrubber" /> Save
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

export default AddPaygrade
