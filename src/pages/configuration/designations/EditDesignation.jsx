import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CommonGroupList,
  CommonCountryList,
  CommonIndustryTypeDropdownList,
} from '../../../actions/commonAction'
import { DesignationEditAPI,DesignationUpdateAPI } from '../../../actions/configuration'
import {PayGradeDropDownList} from './../../../actions/commonAction'
import { useFormik } from 'formik'
import Select from 'react-select'
import 'react-dates/initialize'
import { convertValueLabel, decryptSingleData} from '../../../utils/helper'
import CLoader from '../../loader/CLoader'
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
import 'react-dates/lib/css/_datepicker.css'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

const EditDesignation = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  //To get common details 
  const dropdownData = useSelector((state) => state.commonData)
  //To get company details
  const { designationEditDetails, isLoading } = useSelector((state) => state.configurationBackend)
  const payGradeOptions = dropdownData?.paygradeComData?.data?.result
  //Set Edit Values for Dropdowns
  const [selectPaygrade, setSelectPaygrade] = useState({})
  

  //To load dropdown predefined data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(DesignationEditAPI(decryptSingleData(props?.match?.params?.id)))
      dispatch(PayGradeDropDownList())
    }
   
  }, [])

  //location Edit Form Initilization
  const EditDesignationFormik = useFormik({
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
     dispatch(DesignationUpdateAPI(formData, history, decryptSingleData(props?.match?.params?.id)))
    },
  })

 

  useEffect(() => {
    if (designationEditDetails?.data !== null) {
        EditDesignationFormik.setValues({
        name: designationEditDetails?.data?.name,
        salary_grade_id: designationEditDetails?.data?.salary_grade_id,
        code: designationEditDetails?.data?.code,
       
      })
    }
    if(isLoading === false && designationEditDetails?.data !== undefined && designationEditDetails?.data !== null) {
     setSelectPaygrade(convertValueLabel(designationEditDetails?.data?.salary_grade_id, designationEditDetails?.data.salary_grade_id_name))
     
     
    }
  }, [isLoading, designationEditDetails?.data])

  
  const handlePaygradeChange = (e) => {
    if (e?.value) {
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter : '[("salary_grade_id", "=", '+e.value+')]'
        },
      }
      dispatch(PayGradeDropDownList(sendGpparams))
      setSelectPaygrade(convertValueLabel(e.value,e.label))
      EditDesignationFormik.setFieldValue('salary_grade_id', e.value)
    }
  }


 

  return (
    <main className="c-main">
      {isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Edit Designation </strong>
                  </CCol>
                  {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={'company'}>List Company</Link>
                </CCol> */}
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm
                  onSubmit={EditDesignationFormik.handleSubmit}
                  className="form-horizontal"
                >
                  <div>
                  <div className="row form-group">
                  <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Name <span className="error">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={EditDesignationFormik.values.name}
                        className="form-control"
                        placeholder="Enter name"
                        maxLength={25}
                        onChange={EditDesignationFormik.handleChange}
                        onBlur={EditDesignationFormik.handleBlur}
                      />
                      {EditDesignationFormik.touched.name &&
                      EditDesignationFormik.errors.name ? (
                        <div className="help-block text-danger">
                          {EditDesignationFormik.errors.name}
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
                        value={EditDesignationFormik.values.code}
                        className="form-control"
                        placeholder="Enter code"
                        maxLength={25}
                        onChange={EditDesignationFormik.handleChange}
                        onBlur={EditDesignationFormik.handleBlur}
                      />
                      {EditDesignationFormik.touched.code &&
                      EditDesignationFormik.errors.code ? (
                        <div className="help-block text-danger">
                          {EditDesignationFormik.errors.code}
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
                        value={selectPaygrade}
                        options={payGradeOptions}
                        onBlur={EditDesignationFormik.handleBlur}
                        onChange={(e) => handlePaygradeChange(e)}
                        //  onChange={({ value }) => EditDesignationFormik.setFieldValue('salary_grade_id', value)}
                      />
                      {EditDesignationFormik.touched.salary_grade_id &&
                      EditDesignationFormik.errors.salary_grade_id ? (
                        <div className="help-block text-danger">
                          {EditDesignationFormik.errors.salary_grade_id}
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
                        {/* <CButton type="reset" size="md"  className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton> */}
                        <Link
                          className="ml-3 btn btn-danger"
                          to={'/configuration/designation'}
                        >
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
      )}
    </main>
  )
}

export default EditDesignation
