import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyDropDownList, RoleDropDownList } from '../../../actions/commonAction'
import { UserEditAPI } from '../../../actions/administration'
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
import { encryptSingleData, decryptSingleData } from '../../../utils/helper'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const ViewUser = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()


  const { userEditDetails, isLoading } = useSelector((state) => state.administrationBackend)
  // data.result[0].name
  // console.log("userEditDetails",userEditDetails);
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(UserEditAPI(decryptSingleData(props?.match?.params?.id)))
      // dispatch(UserList(encryptSingleData(props?.match?.params?.id)))
    }
  }, [])

  return (
    <main className="c-main">
      <CFade>
        <CContainer fluid>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol col="6" className="left">
                  <strong> View  User </strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Group :</b>
                      </label>
                      <label className="ml-2">
                        {/* userEditDetails.data.result[0].group_ids_view */}
                        {/* data.company_ids_view */}
                        {userEditDetails?.data?.group_ids_view ? userEditDetails?.data?.group_ids_view : "-"}
                      </label>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Access Rights To Company :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.company_ids_view ? userEditDetails?.data?.company_ids_view : "-"}
                      </label>


                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Company :</b>
                      </label>

                      <label className="ml-2">
                        {userEditDetails?.data?.company_id_name ? userEditDetails?.data?.company_id_name : "-"}
                      </label>

                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Location :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.location_ids_view ? userEditDetails?.data?.location_ids_view : "-"}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Function :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.department_ids_view ? userEditDetails?.data?.department_ids_view : "-"}
                      </label>


                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Sub Function :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.sub_function_ids_view ? userEditDetails?.data?.sub_function_ids_view : "-"}
                      </label>

                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>  Name :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.name ? userEditDetails?.data?.name : "-"}
                      </label>

                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Email :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.email ? userEditDetails?.data?.email : "-"}
                      </label>

                      {/* {UserAddFormik.touched.email &&
                      UserAddFormik.errors.email ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.email}
                        </div>
                      ) : null} */}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="hf-email">
                        <b>Mobile :</b>
                      </label>
                      <label className="ml-2">
                        {userEditDetails?.data?.mobile ? userEditDetails?.data?.mobile : "-"}
                      </label>
                      {/* {UserAddFormik.touched.mobile &&
                      UserAddFormik.errors.mobile ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.mobile}
                        </div>
                      ) : null} */}
                    </div>

                  </div>
                  <div>
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b> Login :</b>
                        </label>
                        <label className="ml-2">
                          {userEditDetails?.data?.login ? userEditDetails?.data?.login : "-"}
                        </label>

                      </div>
                      {/* 
                                           <div className="col-md-4">
                      <label htmlFor="hf-email">
                        Password<span className="error">*</span>
                      </label>
                      <label className="ml-2">
                    {userEditDetails?.data?.result[0].name}
                    </label>
                      {UserAddFormik.touched.password &&
                      UserAddFormik.errors.password ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.login}
                        </div>
                      ) : null}
                        </div> */}
                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Image :</b></label>


                        <label className="ml-2">
                          {/* <CCard > */}
                          {/* <Link > */}
                          <img src={`${userEditDetails?.data?.image_1920}`} title={`${userEditDetails?.data?.name}`} alt={`${userEditDetails?.data?.name}`} height={40} width={40} />
                          {/* </Link> */}
                          {/* </CCard> */}
                        </label>

                      </div>



                    </div>
                    <div className="row form-group">


                      <div className="col-md-4">
                        <label htmlFor="hf-email">
                          <b>Major Role :</b>
                        </label>
                        <label className="ml-2">
                          {userEditDetails?.data?.role_id_name ? userEditDetails?.data?.role_id_name : "-"}
                        </label>
                        {/* {UserAddFormik.touched.groups_id &&
                      UserAddFormik.errors.groups_id ? (
                        <div className="help-block text-danger">
                          {UserAddFormik.errors.groups_id}
                        </div>
                      ) : null} */}
                      </div>
                    </div>
                  </div>

                </div>
                <CCardFooter>
                  <CRow>
                    <CCol className="col-md-10" align="center">
                      <Link
                        to={`/administration/edit-user/${encryptSingleData(
                          userEditDetails?.data?.id,
                        )}`}
                        className="ml-3 btn btn-primary"
                      >
                        <CIcon name="cil-pencil" /> Edit
                      </Link>
                      <Link className="ml-3 btn btn-danger" to={'/administration/user'}>
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

export default ViewUser
