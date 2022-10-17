import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decryptSingleData } from '../../../src/utils/helper';
import { ViewEmployeeByIdAPI } from 'src/actions/master';
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
import Tab1 from "./employeeTabs/Tab1";
import Tab2 from "./employeeTabs/Tab2";
import Tab3 from "./employeeTabs/Tab3";
import Tab4 from "./employeeTabs/Tab4";
import Tab6 from "./employeeTabs/Tab6";
import Tab8 from "./employeeTabs/Tab8";
import Tab7 from "./employeeTabs/Tab7";
import Tab5 from "./employeeTabs/Tab5";
import Tab9 from "./employeeTabs/Tab9";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from '../../actions/types'
const AddEmployee = (props) => {
  const dispatch = useDispatch()
  const {employeeAddDetails} = useSelector((state) => state.masterBackend);
  const {employeeViewDetails} = useSelector((state) => state.masterBackend);
  //To get employee data if exists
  useEffect(() => {
    if(props?.match?.params?.id){
      dispatch(ViewEmployeeByIdAPI(decryptSingleData(props?.match?.params?.id)));
    } else {
      console.log("FLUSTH DATA");
      dispatch({
        type: constants.EMPLOYEE_VIEW_ERROR,
      })
    }
  }, [props?.match?.params?.id])

  return (
    <main className="c-main">
      <ToastContainer />
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>Employee Details</CCardHeader>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>Basic Details</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    {/* <CNavLink>Private Info</CNavLink> */}
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Private Info</CNavLink> : <CNavLink disabled>Private Info</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Work Information</CNavLink> : <CNavLink disabled>Work Information</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>HR Settings</CNavLink> : <CNavLink disabled>HR Settings</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Bank Accounts</CNavLink> : <CNavLink disabled>Bank Accounts</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Family Members</CNavLink> : <CNavLink disabled>Family Members</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Education</CNavLink> : <CNavLink disabled>Education</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Work Experience</CNavLink> : <CNavLink disabled>Work Experience</CNavLink>
                    }
                  </CNavItem>
                  <CNavItem>
                    {
                      ((employeeViewDetails?.data && employeeViewDetails?.message == "Data retrieved successfully.") || (employeeAddDetails?.data && employeeAddDetails?.state == "success")) ?
                        <CNavLink>Compensations</CNavLink> : <CNavLink disabled>Compensations</CNavLink>
                    }
                  </CNavItem>
                </CNav>
                  <CTabContent>
                    <CTabPane>
                      <Tab1 dataId={(employeeViewDetails?.data && employeeViewDetails?.data?.id) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails} />
                    </CTabPane>
                    <CTabPane>
                      <Tab2 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab3 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab4 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab5 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab6 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab7 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab8 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                    <CTabPane>
                      <Tab9 dataId={(employeeViewDetails?.data) ? employeeViewDetails?.data?.id : employeeAddDetails?.data } dataEdit={employeeViewDetails}/>
                    </CTabPane>
                  </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CContainer>
      </CFade>
    </main>
  );
};

export default AddEmployee;