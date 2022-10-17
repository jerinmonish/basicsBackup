import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {PayGradeDropDownList} from './../../../actions/commonAction'
import { DesignationAddAPI } from '../../../actions/configuration'
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

const AddDesignation = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(PayGradeDropDownList())
  }, [])
  

  // to load the option data for dropdown
  const payGradeOptions = dropdownData?.paygradeComData?.data?.result

  //Designation Add Form Initilization
  const DesignationAddFormik = useFormik({
    initialValues: {
      name: '',
      code:'',
      salary_grade_id:'',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      code:Yup.string().required('This field is required'),
      salary_grade_id:Yup.string().required('This field is required'),
      
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(DesignationAddAPI(formData, history))
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
                  <strong> Add Designation </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={DesignationAddFormik.handleSubmit} className="form-horizontal">
                <div>
                  <div className="row form-group">
                  <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={DesignationAddFormik.values.name}
                        className="form-control"
                        placeholder="Enter name"
                        maxLength={25}
                        onChange={DesignationAddFormik.handleChange}
                        onBlur={DesignationAddFormik.handleBlur}
                      />
                      {DesignationAddFormik.touched.name &&
                      DesignationAddFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {DesignationAddFormik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Code <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={DesignationAddFormik.values.code}
                        className="form-control"
                        placeholder="Enter code"
                        maxLength={25}
                        onChange={DesignationAddFormik.handleChange}
                        onBlur={DesignationAddFormik.handleBlur}
                      />
                      {DesignationAddFormik.touched.code &&
                      DesignationAddFormik.errors.code ? (
                        <div className="help-block text-danger">
                          {DesignationAddFormik.errors.code}
                        </div>
                      ) : null}
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                      Salary Grade <span className="error">*</span>
                      </label>
                      <Select
                       
                        className="basic-single"
                         classNamePrefix="select"
                        placeholder={'Choose Salary Grade'}
                        name="salary_grade_id"
                         options={payGradeOptions}
                        onBlur={DesignationAddFormik.handleBlur}
                        onChange={({ value }) => DesignationAddFormik.setFieldValue('salary_grade_id', value)}
                      />
                      {DesignationAddFormik.touched.salary_grade_id &&
                      DesignationAddFormik.errors.salary_grade_id ? (
                        <div className="help-block text-danger">
                          {DesignationAddFormik.errors.salary_grade_id}
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
                      <Link className="ml-3 btn btn-danger" to={'/configuration/designation'}>
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

export default AddDesignation
