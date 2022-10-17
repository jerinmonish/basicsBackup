import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LocationEditAPI } from '../../actions/master'
import { encryptSingleData, decryptSingleData } from '../../utils/helper'
import CLoader from '../loader/CLoader'
import {
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

const ViewLocation = (props) => {
  const dispatch = useDispatch()
  //To get location details
  const { locationEditDetails, isLoading } = useSelector(
    (state) => state.masterBackend,
  )

  //To load dropdown predefined data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(LocationEditAPI(decryptSingleData(props?.match?.params?.id)))
    }
  }, [])

  useEffect(() => { }, [isLoading, locationEditDetails?.data])

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
                    <strong> View Location </strong>
                  </CCol>
                  {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                  <Link className='btn btn-primary' to={`master/company`}>List Company</Link>
                </CCol> */}
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <div>
                    <h4>Location Details</h4>
                    <hr />
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Location Name :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.name ? locationEditDetails?.data?.name : '-'}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Known As :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.known_as ? locationEditDetails?.data?.known_as : '-'}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Type of Industry :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.industry_type_id_name ? locationEditDetails?.data?.industry_type_id_name : '-'}
                        </label>
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Branch Code :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.code ? locationEditDetails?.data?.code : "-"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Company :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.company_id_name ? locationEditDetails?.data?.company_id_name : "-"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Cost Center: </b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.cost_center_id_name ? locationEditDetails?.data?.cost_center_id_name : "-"}
                        </label>
                      </div>
                    </div>
                    <hr />
                    <h4>General Informations</h4>
                    <hr />
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>Door No :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.door_no ? locationEditDetails?.data?.door_no : "-"}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>House/Apartment Name : </b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.house_name ? locationEditDetails?.data?.house_name : "-"}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>Street Name :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.street_name ? locationEditDetails?.data?.street_name : "-"}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>Place Name :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.place_name ? locationEditDetails?.data?.place_name : "-"}
                        </label>
                      </div>

                    </div>
                    <div className="row form-group">
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>Country :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.country_id_name ? locationEditDetails?.data?.country_id_name : '-'}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>State :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.state_id_name ? locationEditDetails?.data?.state_id_name : "-"}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>District :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.district_id_name ? locationEditDetails?.data?.district_id_name : '-'}
                        </label>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="hf-email">
                          <b>Zip :</b>
                        </label>
                        <label className="ml-2">
                          {locationEditDetails?.data?.pin_code ? locationEditDetails?.data?.pin_code : "-"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <CCardFooter>
                    <CRow>
                      <CCol className="col-md-10" align="center">
                        <Link
                          to={`/master/edit-location/${encryptSingleData(
                            locationEditDetails?.data?.id,
                          )}`}
                          className="ml-3 btn btn-primary"
                        >
                          <CIcon name="cil-pencil" /> Edit
                        </Link>
                        <Link
                          className="ml-3 btn btn-danger"
                          to={'/master/location'}
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

export default ViewLocation
