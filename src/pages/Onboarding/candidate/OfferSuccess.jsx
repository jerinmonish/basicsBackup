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
const OfferSuccess = (props) => {
  
  return (
    <main className="c-main">
      <ToastContainer />
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>Job Offer Application</CCardHeader>
            <CCardBody>
              Congratulations, You have successfully accepted and ready to join the Company, Thank You.
            </CCardBody>
          </CCard>
        </CContainer>
      </CFade>
    </main>
  );
};

export default OfferSuccess;