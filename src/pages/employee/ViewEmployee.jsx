import React, { useEffect, useState } from 'react'
import { ViewEmployeeByIdAPI } from './../../actions/master'
import { useSelector, useDispatch } from 'react-redux'
import 'react-dates/initialize'
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
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CInput,
  CDataTable,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import 'react-dates/lib/css/_datepicker.css'
import CLoader from '../loader/CLoader'
import { encryptSingleData, decryptSingleData } from '../../utils/helper'
import logoimage from './User.png';
import CryptoJS from "crypto-js";
// import logoimage from './../../../public/avatars/img1.jpeg';
import '../../scss/ViewEmployee.scss'

const ViewEmployee = (props) => {

  const [bankDetails, setBankDetails] = useState([]);
  const loginData = useSelector(state => state.userLogin);
  let Udata = localStorage.getItem('udata');
  const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
  const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
  let userInput = JSON.parse(loginData.userDetails);
  let userImage = userInput?.image ? userInput?.image : udetails?.image
  const dispatch = useDispatch()

  //To get location details
  const { employeeViewDetails, isLoading } = useSelector(
    (state) => state.masterBackend,
  )

  // console.log('employeeViewDetails', employeeViewDetails);
  useEffect(() => {

    setBankDetails(employeeViewDetails?.data?.bank_account_ids)
  }, [])
  // education_ids
  // bank_account_ids
  // [4].acc_holder_name
  // console.log("employeeViewDetails", employeeViewDetails?.data?.family_member_ids);
  console.log("data", employeeViewDetails?.data);
  // console.log("education_ids", employeeViewDetails?.data?.education_ids);

  //To load dropdown predefined data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(ViewEmployeeByIdAPI(decryptSingleData(props?.match?.params?.id)))
    }
  }, [])





  return (

    <main className="c-main">
      {
        employeeViewDetails?.isLoading === true ? <CLoader /> : (
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  View Employee


                </CCardHeader>
                <CCardBody>
                  <div class="profile-area">
                    <div className='d-flex justify-content-spacebetween responsive-profile' style={{ alignItems: 'center' }}>
                      <div class="profile-image">
                        <div className='profile-part'>
                          {/* <i class="cis-user"></i> */}
                          {
                            employeeViewDetails?.data?.image_1920 ? <img src={employeeViewDetails?.data?.image_1920} alt="" className='profile' /> : <img src={userImage} alt="" className='profile' />
                          }
                          {/* <img src={logoimage} alt="" className='profile' /> */}
                        </div>
                        <div className='profile-details'>
                          <h3 className='name'>{employeeViewDetails?.data?.name} </h3>
                          <h4 className='designation'>{employeeViewDetails?.data?.position_id_name ? employeeViewDetails?.data?.position_id_name : '-'}</h4>
                          <a href='#'><h5 className='mail'>{employeeViewDetails?.data?.work_email ? employeeViewDetails?.data?.work_email : '-'}</h5></a>
                          <h5 className='phone-number'>{employeeViewDetails?.data?.work_phone ? employeeViewDetails?.data?.work_phone : '-'}</h5>
                        </div>
                      </div>

                      <div className='actions-part '>
                        <div className=''>
                          <div className="form-group action-part-fields">
                            <label htmlFor="">Resume :</label>
                            {/* <input type="text" className='form-control' /> */}
                            {
                              (employeeViewDetails?.data.aadhar_proof) ? <div className='mt-0 ml-2'><button className='btn btn-primary ml-2' ><a href={employeeViewDetails?.data.aadhar_proof} target='_blank' className='mt-0'>View</a></button></div> : ''
                            }
                          </div>
                          <div className="form-group action-part-fields ">
                            <div className=''>
                              <label htmlFor="">Aadhaar Card :</label>

                            </div>
                            <div className="">
                              {/* <input type="file" className='form-control ml-2 h-auto' /> */}
                              {
                                (employeeViewDetails?.data.aadhar_proof) ? <div className='mt-0 ml-2'><button className='btn btn-primary ml-2' ><a href={employeeViewDetails?.data.aadhar_proof} target='_blank' className='mt-0'>View</a></button></div> : ''
                              }
                            </div>
                          </div>
                          <div className="form-group action-part-fields mt-0">
                            <div className="">
                              <label htmlFor="">Pan Card :</label>
                            </div>
                            <div className="">
                              {
                                (employeeViewDetails?.data.pan_proof) ? <div className='mt-0 ml-2' ><button className='btn btn-primary ml-2' ><a href={employeeViewDetails?.data.pan_proof} target='_blank' className='mt-0'>View</a></button></div> : ''
                              }
                            </div>
                          </div>
                          <div className="form-group action-part-fields mt-0">
                            <div className="">
                              <label htmlFor="">Voter ID :</label>
                            </div>
                            <div className="">
                              {
                                (employeeViewDetails?.data.voter_proof) ? <div className='mt-0  ml-2' ><button className='btn btn-primary ml-2' ><a href={employeeViewDetails?.data.voter_proof} target='_blank' className='mt-0'>View</a></button></div> : ''
                              }
                            </div>
                          </div>
                          <div className="form-group action-part-fields mt-0">
                            <div className="">
                              <label htmlFor="">Passport :</label>
                            </div>
                            <div className="">
                              {
                                (employeeViewDetails?.data.passport_proof) ? <div className='mt-0 ml-2' ><button className='btn btn-primary ml-2' ><a href={employeeViewDetails?.data.passport_proof} target='_blank' className='mt-0'>View</a></button></div> : ''
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <CTabs>
                    {/* <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink>Basic Details</CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink>Profile</CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink>Messages</CNavLink>
                      </CNavItem>
                    </CNav> */}
                    {/* <CTabContent> */}
                    <CTabPane>
                      <CForm className="form-horizontal custum-label-wrapper">
                        <div className=''>
                          <div className="card">
                            <div className="card-header header ">
                              <h4>   Basic Details</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"><strong>Name :</strong></label> <p className='ml-2' >{employeeViewDetails?.data?.name ? employeeViewDetails?.data?.name : '-'}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"><strong>Work Email :</strong></label>
                                  <p className='ml-2' >{employeeViewDetails?.data?.work_email ? employeeViewDetails?.data?.work_email : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"><strong>Work Phone :</strong></label><p className='ml-2' >{employeeViewDetails?.data?.work_phone ? employeeViewDetails?.data?.work_phone : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"><strong>Cost Center :</strong></label><p className='ml-2' >{employeeViewDetails?.data?.cost_center_id_name ? employeeViewDetails?.data?.cost_center_id_name : "-"}</p>
                                </div>
                              </div>

                              <div className="row form-group mt-2">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"><strong>Reporting Manager :</strong> </label><p className='ml-2' >{employeeViewDetails?.data?.parent_id_name ? employeeViewDetails?.data?.parent_id_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"> <strong>Job :</strong></label><p className='ml-2' >{employeeViewDetails?.data?.job_id_name ? employeeViewDetails?.data?.job_id_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email"><strong>Position : </strong> </label><p className='ml-2' >{employeeViewDetails?.data?.position_id_name ? employeeViewDetails?.data?.position_id_name : "-"}</p>
                                </div>
                                {/* <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email"><strong>Image : </strong></label>
                                  {
                                    (employeeViewDetails?.data.aadhar_proof) ? <div className='ml-2'><a href={employeeViewDetails?.data.aadhar_proof} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                                  }
                                </div> */}
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Personal Information</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Date Of Birth :</label><p className='ml-2' >{employeeViewDetails?.data?.birthday ? employeeViewDetails?.data?.birthday : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Gender :</label><p className='ml-2' >{employeeViewDetails?.data?.gender_label ? employeeViewDetails?.data?.gender_label : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Blood Group :</label><p className='ml-2' >{employeeViewDetails?.data?.blood_group_id_name ? employeeViewDetails?.data?.blood_group_id_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Religion :</label><p className='ml-2' >{employeeViewDetails?.data?.religion_id_name ? employeeViewDetails?.data?.religion_id_name : "-"}</p>
                                </div>

                              </div>

                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Personal Email :</label><p className='ml-2' >{employeeViewDetails?.data?.personal_email ? employeeViewDetails?.data?.personal_email : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Personal Mobile Number :</label><p className='ml-2' >{employeeViewDetails?.data?.mobile_phone ? employeeViewDetails?.data?.mobile_phone : '-'}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Emergency Contact :</label><p className='ml-2' >{employeeViewDetails?.data?.emergency_contact ? employeeViewDetails?.data?.emergency_contact : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Emergency Contact Person :</label><p className='ml-2' >{employeeViewDetails?.data?.emergency_contact_person ? employeeViewDetails?.data?.emergency_contact_person : "-"}</p>
                                </div>


                              </div>
                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Marital Status :</label><p className='ml-2' >{employeeViewDetails?.data?.marital ? employeeViewDetails?.data?.marital : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Spouse Complete Name :</label><p className='ml-2' >{employeeViewDetails?.data?.spouse_complete_name ? employeeViewDetails?.data?.spouse_complete_name : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Date of Marriage :</label><p className='ml-2' >{employeeViewDetails?.data?.marriage_date ? employeeViewDetails?.data?.marriage_date : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Spouse Birthdate :</label><p className='ml-2' >{employeeViewDetails?.data?.spouse_birthdate ? employeeViewDetails?.data?.spouse_birthdate : "-"}</p>
                                </div>


                              </div>
                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Any Physical Challenges or Disabilities? :</label><p className='ml-2' >{employeeViewDetails?.data?.is_disabled ? employeeViewDetails?.data?.is_disabled : "-"}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Current Address</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Door No :</label><p className='ml-2' >{employeeViewDetails?.data?.door_no ? employeeViewDetails?.data?.door_no : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">House/Apartment Name :</label><p className='ml-2' >{employeeViewDetails?.data?.house_name ? employeeViewDetails?.data?.house_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Street Name :</label><p className='ml-2' >{employeeViewDetails?.data?.street_name ? employeeViewDetails?.data?.street_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Place Name :</label><p className='ml-2' >{employeeViewDetails?.data?.place_name ? employeeViewDetails?.data?.place_name : "-"}</p>
                                </div>

                              </div>

                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Country :</label><p className='ml-2' >{employeeViewDetails?.data?.country_id_name ? employeeViewDetails?.data?.country_id_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">State :</label><p className='ml-2' >{employeeViewDetails?.data?.state_id_name ? employeeViewDetails?.data?.state_id_name : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">District :</label><p className='ml-2' >{employeeViewDetails?.data?.district_id_name ? employeeViewDetails?.data?.district_id_name : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Pin Code :</label><p className='ml-2' >{employeeViewDetails?.data?.pin_code ? employeeViewDetails?.data?.pin_code : "-"}</p>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Permanent Address</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Door No :</label><p className='ml-2' >{employeeViewDetails?.data?.door_no ? employeeViewDetails?.data?.door_no : '-'}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">House/Apartment Name :</label><p className='ml-2' >{employeeViewDetails?.data?.house_name ? employeeViewDetails?.data?.house_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Street Name :</label><p className='ml-2' >{employeeViewDetails?.data?.street_name ? employeeViewDetails?.data?.street_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Place Name :</label><p className='ml-2' >{employeeViewDetails?.data?.place_name ? employeeViewDetails?.data?.place_name : "-"}</p>
                                </div>

                              </div>

                              <div className="row form-group">
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Country :</label><p className='ml-2' >{employeeViewDetails?.data?.country_id_name ? employeeViewDetails?.data?.country_id_name : "-"}</p>
                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">State :</label><p className='ml-2' >{employeeViewDetails?.data?.state_id_name ? employeeViewDetails?.data?.state_id_name : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">District :</label><p className='ml-2' >{employeeViewDetails?.data?.district_id_name ? employeeViewDetails?.data?.district_id_name : "-"}</p>

                                </div>
                                <div className='col-lg-3 col-md-12 col-sm-12 d-flex'>
                                  <label htmlFor="hf-email">Pin Code :</label><p className='ml-2' >{employeeViewDetails?.data?.pin_code ? employeeViewDetails?.data?.pin_code : '-'}</p>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row form-group">
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-4">
                              <div className="card">
                                <div className="card-header header">
                                  <h4>Aadhar Information</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    {/* <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Aadhar Proof :</label><p className='ml-2' >{employeeViewDetails?.data?.aadhar}</p>
                                </div> */}
                                    <div className="col-md-12 d-flex">
                                      <label htmlFor="hf-email">Aadhar Number :</label><p className='ml-2' >{employeeViewDetails?.data?.aadhar ? employeeViewDetails?.data?.aadhar : '-'}</p>
                                    </div>
                                    <div className="col-md-12 d-flex">
                                      <label htmlFor="hf-email">Name as per Aadhar :</label><p className='ml-2' >{employeeViewDetails?.data?.name_as_per_aadhar ? employeeViewDetails?.data?.name_as_per_aadhar : "-"}</p>
                                    </div>


                                  </div>

                                </div>
                              </div>

                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 mb-4">
                              <div className="card">
                                <div className="card-header header">
                                  <h4>PAN Information</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-md-12 d-flex">
                                      <label htmlFor="hf-email">PAN card Number :</label><p className='ml-2' >{employeeViewDetails?.data?.pan_id ? employeeViewDetails?.data?.pan_id : "-"}</p>
                                    </div>
                                    <div className="col-md-12 d-flex">
                                      <label htmlFor="hf-email">Name as per PAN card :</label><p className='ml-2' >{employeeViewDetails?.data?.name_as_per_pan ? employeeViewDetails?.data?.name_as_per_pan : "-"}</p>
                                    </div>


                                  </div>

                                </div>
                              </div>

                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                              <div className="card">
                                <div className="card-header header">
                                  <h4>Voter ID Information</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex">
                                      <label htmlFor="hf-email">Voter ID Number :</label><p className='ml-2' >{employeeViewDetails?.data?.voter_id ? employeeViewDetails?.data?.voter_id : "-"}</p>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex">
                                      <label htmlFor="hf-email">Voter Country :</label><p className='ml-2' >{employeeViewDetails?.data?.voter_country_id_name ? employeeViewDetails?.data?.voter_country_id_name : "-"}</p>
                                    </div>
                                    <div className="col-md-12 d-flex">
                                      <label htmlFor="hf-email">Name as per Voter ID :</label><p className='ml-2' >{employeeViewDetails?.data?.name_as_per_voter_id ? employeeViewDetails?.data?.name_as_per_voter_id : "-"}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>



                          <div className="card">
                            <div className="card-header header">
                              <h4>Passport Information</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Passport Country :</label><p className='ml-2' >{employeeViewDetails?.data?.passport_country_id ? employeeViewDetails?.data?.passport_country_id : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Passport Number :</label><p className='ml-2' >{employeeViewDetails?.data?.passport_id ? employeeViewDetails?.data?.passport_id : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Sur Name :</label><p className='ml-2' >{employeeViewDetails?.data?.passport_sur_name ? employeeViewDetails?.data?.passport_sur_name : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Given Name :</label><p className='ml-2' >{employeeViewDetails?.data?.passport_given_name ? employeeViewDetails?.data?.passport_given_name : "-"}</p>
                                </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Place Of Issue :</label><p className='ml-2' >{employeeViewDetails?.data?.passport_place_of_issue ? employeeViewDetails?.data?.passport_place_of_issue : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Expiry :</label><p className='ml-2' >{employeeViewDetails?.data?.passport_expiry_date ? employeeViewDetails?.data?.passport_expiry_date : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Is International Worker? :</label><p className='ml-2' >{employeeViewDetails?.data?.is_international_worker ? employeeViewDetails?.data?.is_international_worker : "-"}</p>
                                </div>

                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>EPF Information</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">UAN Number :</label><p className='ml-2' >{employeeViewDetails?.data?.uan_no ? employeeViewDetails?.data?.uan_no : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Voter Country :</label><p className='ml-2' >{employeeViewDetails?.data?.voter_country_id_name ? employeeViewDetails?.data?.voter_country_id_name : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Name of the Previous Employer :</label><p className='ml-2' >{employeeViewDetails?.data?.epf_previous_employer ? employeeViewDetails?.data?.epf_previous_employer : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Leaving :</label><p className='ml-2' >{employeeViewDetails?.data?.epf_leaving_date ? employeeViewDetails?.data?.epf_leaving_date : "-"}</p>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="row form-group">
                            <div className="col-lg-4 col-md-12 col-sm-12 mb-4">
                              <div className="card">
                                <div className="card-header header">
                                  <h4>Approvers</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-md-12 d-flex ">
                                      <label htmlFor="hf-email">Leave :</label><p className='ml-2' >{employeeViewDetails?.data?.leave_manager_id_name ? employeeViewDetails?.data?.leave_manager_id_name : "-"}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                            <div className="col-xl-8 col-md-12 col-sm-12 mb-4" >
                              <div className="card">
                                <div className="card-header header">
                                  <h4>Schedule</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex ">
                                      <label htmlFor="hf-email">Working Hours :</label><p className='ml-2' >{employeeViewDetails?.data?.resource_calendar_id ? employeeViewDetails?.data?.resource_calendar_id : "-"}</p>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex ">
                                      <label htmlFor="hf-email">Timezone :</label><p className='ml-2' >{employeeViewDetails?.data?.tz ? employeeViewDetails?.data?.tz : "-"}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Joining Details</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Appointment Proof :</label><p className='ml-2' >{employeeViewDetails?.data?.door_no ? employeeViewDetails?.data?.door_no : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Joining :</label><p className='ml-2' >{employeeViewDetails?.data?.joining_date ? employeeViewDetails?.data?.joining_date : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Type of Employment :</label><p className='ml-2' >{employeeViewDetails?.data?.employment_type_id_name ? employeeViewDetails?.data?.employment_type_id_name : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Pay Grade :</label><p className='ml-2' >{employeeViewDetails?.data?.pay_grade_id_name ? employeeViewDetails?.data?.pay_grade_id_name : '-'}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Company Transport</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Is Company Transport? :</label><p className='ml-2' >{employeeViewDetails?.data?.is_company_transport ? employeeViewDetails?.data?.is_company_transport : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Pick-up Location :</label><p className='ml-2' >{employeeViewDetails?.data?.pickup_location ? employeeViewDetails?.data?.pickup_location : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">PIN Code :</label><p className='ml-2' >{employeeViewDetails?.data?.pickup_pin_code ? employeeViewDetails?.data?.pickup_pin_code : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Route No :</label><p className='ml-2' >{employeeViewDetails?.data?.route_no ? employeeViewDetails?.data?.route_no : '-'}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row form-group">
                            <div className="col-xl-8 col-md-12 col-sm-12 form-group">
                              <div className="card">
                                <div className="card-header header">
                                  <h4 className="m-0 p-0">Overtime &amp; Shift</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-lg-4 col-md-12 col-sm-12 d-flex ">
                                      <label htmlFor="hf-email">Eligibility for Overtime Wages :</label><p className='ml-2' >{employeeViewDetails?.data?.is_eligible_for_ot ? employeeViewDetails?.data?.is_eligible_for_ot : '-'}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 d-flex ">
                                      <label htmlFor="hf-email">Rate of Overtime Wages :</label><p className='ml-2' >{employeeViewDetails?.data?.ot_wages ? employeeViewDetails?.data?.ot_wages : "-"}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12 d-flex ">
                                      <label htmlFor="hf-email">Eligibility for Shift Allowance :</label><p className='ml-2' >{employeeViewDetails?.data?.is_eligible_for_shift_allowance ? employeeViewDetails?.data?.is_eligible_for_shift_allowance : '-'}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12 form-group">
                              <div className="card">
                                <div className="card-header header">
                                  <h4 className="m-0 p-0">Rehiring</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-md-12 d-flex ">
                                      <label htmlFor="hf-email">Date of Joining Again :</label><p className='ml-2' >{employeeViewDetails?.data?.rejoin_date ? employeeViewDetails?.data?.rejoin_date : '-'}</p>
                                    </div>

                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Employment Details</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Duration of Training :</label>
                                  <label><p className='ml-2' >{employeeViewDetails?.data?.training_duration ? employeeViewDetails?.data?.training_duration : '-'}</p></label>

                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Training Completion Date :</label><p className='ml-2' >{employeeViewDetails?.data?.training_complete_date ? employeeViewDetails?.data?.training_complete_date : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Duration of Probation :</label><p className='ml-2' >{employeeViewDetails?.data?.probation_duration ? employeeViewDetails?.data?.probation_duration : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Probation Completion Date :</label><p className='ml-2' >{employeeViewDetails?.data?.probation_complete_date ? employeeViewDetails?.data?.probation_complete_date : '-'}</p>
                                </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Confirmation :</label><p className='ml-2' >{employeeViewDetails?.data?.confirmation_date ? employeeViewDetails?.data?.confirmation_date : '-'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header header">
                              <h4>Employee Separation</h4>
                            </div>
                            <div className="card-body">
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Resignation :</label><p className='ml-2' >{employeeViewDetails?.data?.resignation_date ? employeeViewDetails?.data?.resignation_date : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Notice Period :</label><p className='ml-2' >{employeeViewDetails?.data?.notice_period ? employeeViewDetails?.data?.notice_period : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Relieving :</label><p className='ml-2' >{employeeViewDetails?.data?.relieving_date ? employeeViewDetails?.data?.relieving_date : '-'}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Reason for Leaving :</label><p className='ml-2' >{employeeViewDetails?.data?.leaving_reason_id ? employeeViewDetails?.data?.leaving_reason_id : '-'}</p>
                                </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Termination :</label><p className='ml-2' >{employeeViewDetails?.data?.termination_date ? employeeViewDetails?.data?.termination_date : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Date of Death :</label><p className='ml-2' >{employeeViewDetails?.data?.death_date ? employeeViewDetails?.data?.death_date : "-"}</p>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 d-flex">
                                  <label htmlFor="hf-email">Other Reason:</label><p className='ml-2' >{employeeViewDetails?.data?.other_reason ? employeeViewDetails?.data?.other_reason : '-'}</p>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="row form-group">
                            <div className="col-xl-8 col-md-12 col-sm-12 form-group">

                              <div className="card">
                                <div className="card-header header">
                                  <h4>Employee Name Change by Gazette</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex">
                                      <label htmlFor="hf-email">Upload Gazette Notification :</label><p className='ml-2' >{employeeViewDetails?.data?.gazette_proof ? employeeViewDetails?.data?.gazette_proof : "-"}</p>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex">
                                      <label htmlFor="hf-email">New Name As per Gazette Notification :</label><p className='ml-2' >{employeeViewDetails?.data?.new_name ? employeeViewDetails?.data?.new_name : '-'}</p>
                                    </div>
                                    <div className="col-md-12 d-flex">
                                      <label htmlFor="hf-email">Date of Gazette Notification :</label><p className='ml-2' >{employeeViewDetails?.data?.gazette_date ? employeeViewDetails?.data?.user_id : '-'}</p>
                                    </div>

                                  </div>

                                </div>
                              </div>

                            </div>
                            <div className="col-xl-4 col-md-12 col-sm-12 form-group">
                              <div className="card">
                                <div className="card-header header">
                                  <h4>HR Details</h4>
                                </div>
                                <div className="card-body">
                                  <div className="row form-group">
                                    <div className="col-lg-4 col-md-12 col-sm-12 d-flex">
                                      <label htmlFor="hf-email">Related User :</label><p className='ml-2' >{employeeViewDetails?.data?.user_id ? employeeViewDetails?.data?.user_id : '-'}</p>
                                    </div>
                                  </div>

                                </div>
                              </div>

                            </div>
                          </div>



                          {/* {[4].acc_holder_name} */}
                          {/* {

                            employeeViewDetails?.data?.bank_account_ids.map((label) => {

                              // // <p value={value} key={`acc_holder_name${value}`}>{label}</p>
                              // <p>{value}</p>
                              // console.log(label.acc_holder_name);
                            })

                          } */}
                          <div className="card">
                            <div className="card-header header">
                              <h4>Bank Details </h4>
                            </div>

                            <CCardBody>
                              <div className="row">
                                <CDataTable
                                  items={employeeViewDetails?.data?.bank_account_ids}
                                  fields={[{ key: "acc_holder_name", label: "Account Holder Name" },
                                  { key: "acc_number", label: "Account Number" },
                                  { key: "account_type", label: "Account Type" },
                                  { key: 'bank_id_name', label: 'Bank' },
                                  { key: "bank_branch", label: "Bank Branch" },
                                  { key: "ifsc_code", label: "IFSC Code" },

                                  ]}
                                  hover
                                  striped
                                  bordered
                                // size="sm"
                                />
                              </div>
                            </CCardBody>

                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Family Member Details</h4>
                            </div>
                            <CCardBody>
                              <div className="row">
                                <CDataTable
                                  items={employeeViewDetails?.data?.family_member_ids}
                                  fields={[{ key: "name", label: "Name" },
                                  { key: "relationship_id_name", label: "Relationship" },
                                  { key: "gender", label: "Gender" },
                                  { key: 'phone', label: 'Phone' },
                                  { key: "birthday", label: "Date Of Birth" },

                                  ]}
                                  hover
                                  striped
                                  bordered
                                // size="sm"
                                />
                              </div>
                            </CCardBody>
                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Education Details</h4>
                            </div>

                            <CCardBody>
                              <div className="row">
                                <CDataTable
                                  items={employeeViewDetails?.data?.education_ids}
                                  fields={[{ key: "study_level_id_name", label: "Level" },
                                  { key: "program_id_name", label: "Program of Study" },
                                  { key: "mode", label: "Mode" },
                                  { key: 'institution', label: 'Place and Institute' },
                                  { key: "board_or_university", label: "Board / University" },
                                  { key: "year_of_passing", label: "Year Of Passing" },
                                  { key: "result", label: "Result" },
                                  { key: "note", label: "Remarks" },

                                  ]}
                                  hover
                                  striped
                                  bordered
                                // size="sm"
                                />
                              </div>
                            </CCardBody>

                          </div>

                          <div className="card">
                            <div className="card-header header">
                              <h4>Work Experience Details</h4>
                            </div>
                            <CCardBody>
                              <div className="row">
                                <CDataTable
                                  items={employeeViewDetails?.data?.work_experience_ids}
                                  fields={[{ key: "name", label: "Name" },
                                  { key: "role_played", label: "Role Played" },
                                  { key: "joining_date", label: "Date of Join" },
                                  { key: 'leaving_date', label: 'Date of Leaving' },
                                  ]}
                                  hover
                                  striped
                                  bordered
                                // size="sm"
                                />
                              </div>
                            </CCardBody>

                          </div>


                        </div>
                        <CCardFooter>
                          <CRow>
                            <CCol className="col-md-12" align="center">
                              <Link
                                to={`/employee/edit-employee/${encryptSingleData(
                                  employeeViewDetails?.data?.id,
                                )}`}
                                className="ml-3 btn btn-primary"
                              >
                                <CIcon name="cil-pencil" /> Edit
                              </Link>
                              <Link
                                className="ml-3 btn btn-danger"
                                to={'/employee/employee'}
                              >
                                <CIcon name="cil-ban" /> Cancel
                              </Link>
                            </CCol>
                          </CRow>
                        </CCardFooter>
                      </CForm>
                    </CTabPane>
                    {/* <CTabPane>{`2. ${lorem}`}</CTabPane>
                  <CTabPane>{`3. ${lorem}`}</CTabPane> */}
                    {/* </CTabContent> */}
                  </CTabs>
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
        )
      }

    </main>
  )
}

export default ViewEmployee
