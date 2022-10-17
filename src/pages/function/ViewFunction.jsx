import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FunctionEditDetails } from '../../actions/master'
import { decryptSingleData, encryptSingleData } from '../../utils/helper'
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

const ViewFunction = (props) => {
  const dispatch = useDispatch()
  const dropdownData = useSelector((state) => state.commonData)
  //To get function details
  const { functionDetails, isLoading } = useSelector(
    (state) => state.masterBackend,
  )
  //To load dropdown predefined data
  // console.log("functionDetails", functionDetails);
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(FunctionEditDetails(decryptSingleData(props?.match?.params?.id)))
    }
  }, [])
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
                    <strong> View Function </strong>
                  </CCol>
                  {/* <CCol col="6"  sm="4" md="2" xl className="mb-3 mb-xl-0"    align="end">
                    <Link className='btn btn-primary' to={'company'}>List Company</Link>
                  </CCol> */}
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <div>
                    {/* <h4>Company Details</h4>
                    <hr /> */}
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Function Name :</b>{' '}
                        </label>
                        <label className="ml-2">{functionDetails?.name ? functionDetails?.name : "-"}</label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Function Code :</b>{' '}
                        </label>
                        <label className="ml-2">{functionDetails?.code ? functionDetails?.code : "-"}</label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Company :</b>
                        </label>
                        <label className="ml-2">
                          {functionDetails?.company_id_name ? functionDetails?.company_id_name : "-"}
                        </label>
                      </div>
                    </div>
                    <div className="row form-group">
                      {/* <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Manager :</b>{' '}
                        </label>
                        <label className="ml-2">
                          {functionDetails?.manager_id_name ? functionDetails?.manager_id_name : "-"}
                        </label>
                      </div> */}
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Location :</b>{' '}
                        </label>
                        <label className="ml-2">
                          {functionDetails?.location_id_name ? functionDetails?.location_id_name : "-"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Cost Center :</b>{' '}
                        </label>
                        <label className="ml-2">
                          {functionDetails?.cost_center_id_name ? functionDetails?.cost_center_id_name : "-"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <CCardFooter>
                    <CRow>
                      <CCol className="col-md-10" align="center">
                        <Link
                          to={`/master/edit-function/${encryptSingleData(
                            functionDetails?.id,
                          )}`}
                          className="ml-3 btn btn-primary"
                        >
                          <CIcon name="cil-pencil" /> Edit
                        </Link>
                        <Link
                          className="ml-3 btn btn-danger"
                          to={'/master/function'}
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

export default ViewFunction
