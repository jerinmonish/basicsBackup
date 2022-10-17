import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CContainer,
  CFade,
  CForm,
  CCardFooter,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CCollapse,
  CCardHeader,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CInputRadio,
  CInputGroup,
  CInput,
  CInputGroupText,
} from "@coreui/react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from '../../../actions/types'
const JobSuccess = (props) => {

  return (
    <main className="c-main">
      <ToastContainer />
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>Job Application</CCardHeader>
            <CCardBody>
              Thank you for applying, we will shortly contact you.
            </CCardBody>
          </CCard>
        </CContainer>
      </CFade>
    </main>
  );
};

export default JobSuccess;