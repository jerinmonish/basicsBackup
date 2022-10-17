import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CommonEditDetails } from '../../actions/master';
import { encryptSingleData, decryptSingleData } from '../../utils/helper';
import CLoader from '../loader/CLoader';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CFade,
  CForm,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ViewCompany = (props) => {
  const dispatch = useDispatch();
  //To get company details
  const { companyDetails, isLoading } = useSelector(state => state.masterBackend);

  //To load dropdown predefined data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CommonEditDetails(decryptSingleData(props?.match?.params?.id)));
    }
  }, []);

  useEffect(() => {
  }, [isLoading, companyDetails?.data])

  const handleimageFile = (e) => {
    window.open(companyDetails?.data?.logo)
  }


  return (
    <main className="c-main">
      {
        (isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> View Company </strong>
                    </CCol>
                    {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={`master/company`}>List Company</Link>
                </CCol> */}
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm className="form-horizontal">
                    <div>
                      <h4>Company Details</h4>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Company Name :</b> </label>
                          <label className='ml-2'>{companyDetails?.data?.name}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Group Name : </b></label>
                          <label className='ml-2'>{companyDetails?.data?.group_id_name}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Type of Organization :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.organization_type_id_name}</label>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Date of Incorporation :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.incorporation_date}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Registration Number :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.registration_no}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Existing Logo : </b></label>
                          <label className='ml-2'>
                            <img onClick={(e) => { handleimageFile(e) }} src={`${companyDetails?.data?.logo}`} title={`${companyDetails?.data?.name}`} alt={`${companyDetails?.data?.name}`} height={60} width={60} />
                          </label>
                        </div>
                      </div>
                      <hr />
                      <h4>General Informations</h4>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Door No :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.door_no}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>House/Apartment Name :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.house_name}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Street Name :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.street_name}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Place Name :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.place_name}</label>
                        </div>

                      </div>
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Country :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.country_id_name}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>State :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.state_id_name}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>District :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.district_id_name}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Zip :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.pin_code}</label>
                        </div>

                      </div>

                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Phone :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.phone}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Email :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.email}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Website :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.website}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Tax ID :</b> </label>
                          <label className='ml-2'>{companyDetails?.data?.vat}</label>
                        </div>

                      </div>
                      <div className="row form-group">
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Company Registry :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.company_registry}</label>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="hf-email"><b>Currency :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.currency_id_name}</label>
                        </div>
                      </div>
                      <hr />
                      <h4>Other Informations</h4>
                      <hr />
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>EPF Start Date :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.epf_start_date}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>EPF Employer Code	:</b></label>
                          <label className='ml-2'>{companyDetails?.data?.epf_employer_code}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Employer PAN Number :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.employer_pan_no}</label>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>ESI Start Date :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.esi_start_date}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>ESI Employer Code	:</b></label>
                          <label className='ml-2'>{companyDetails?.data?.esi_employer_code}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Payroll Cycle :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.payroll_cycle_label}</label>
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Monthly Process Date :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.monthly_process_date}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Remind the candidate Before (Recruitment) :</b></label>
                          <label className='ml-2'>{companyDetails?.data?.remind_before}</label>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email"><b>Show caste in Employee Form :</b></label>
                          <label className='ml-2'>{(companyDetails?.data?.compay_add_show_caste) ? 'Yes' : 'No'}</label>
                        </div>
                      </div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className='col-md-10' align="center" >
                          <Link to={`/master/edit-company/${encryptSingleData(companyDetails?.data?.id)}`} className='ml-3 btn btn-primary'><CIcon name="cil-pencil" /> Edit</Link>
                          <Link className='ml-3 btn btn-danger' to={'/master/company'}><CIcon name="cil-ban" /> Cancel</Link>
                        </CCol>
                      </CRow>
                    </CCardFooter>
                  </CForm>
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
      }
    </main>
  )
}

export default ViewCompany