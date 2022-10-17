import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import 'spinkit/spinkit.min.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { ResetPasswordAPI } from 'src/actions/user';
import { useDispatch } from 'react-redux';
import { isLoggedIn, encryptSingleData } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Select from 'react-select'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
    
const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const resetPasswordData = useSelector(state => state.userLogin);
  const resetPasswordFormik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
     validationSchema: Yup.object({
      password: Yup.string().required('This field is required'),
      confirm_password:Yup.string().required('This field is required').oneOf([Yup.ref('password')], 'Password Mismatch'),
    }),
    onSubmit: values => {
      // values.push({db: "hris_demo"})
      const fformData = { ...values, ...{db: "hris_demo", token:props?.match?.params?.id} };
      const formData = JSON.stringify({ "params": fformData });
      dispatch(ResetPasswordAPI(formData, history));
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={resetPasswordFormik.handleSubmit}>
                      <h1>Reset Password</h1>
                      {/* <p className="text-muted">Reset Password &amp; Login</p> */}
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" name='password' placeholder="Password" onChange={resetPasswordFormik.handleChange} value={resetPasswordFormik.values.password} autoFocus tabIndex={1} onBlur={resetPasswordFormik.handleBlur}/>
                  </CInputGroup>
                  <span className='pb-0'>{resetPasswordFormik.touched.password&& resetPasswordFormik.errors.password ? <div className="text-danger">{resetPasswordFormik.errors.password}</div> : null}</span>
                      
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" name='confirm_password' placeholder="Confirm Password" onChange={resetPasswordFormik.handleChange} value={resetPasswordFormik.values.confirm_password} tabIndex={2} onBlur={resetPasswordFormik.handleBlur}/>
                      </CInputGroup>
                      {resetPasswordFormik.touched.confirm_password&& resetPasswordFormik.errors.confirm_password ? <div className="text-danger">{resetPasswordFormik.errors.confirm_password}</div> : null}
                      <CRow>
                        <CCol xs="6">
                          {/* {
                            (resetPasswordData?.isLoading == true) ? 
                                <Link to="#" className="btn btn-primary px-4">
                                  <div className="sk-wave">
                                    <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                    <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                    <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                    <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                    <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                  </div>
                                </Link> 
                              : */}
                         <CButton type='submit' color="primary" className="px-4">Reset Password</CButton>    
                      
                          {/* } */}
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <Link color="link" className="px-0" to={'/'}><CButton type='submit' color="danger" className="px-4">Cancel</CButton>    </Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
