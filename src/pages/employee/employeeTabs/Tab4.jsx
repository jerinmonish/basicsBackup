import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CForm,
  CCardFooter,
  CCol,
} from "@coreui/react";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { EmployeeUpdateAPI } from 'src/actions/master';
import { UserListDropDown } from 'src/actions/administration';
import { convertValueLabel } from '../../../utils/helper'
const Tab4 = (props) => {
  const dispatch = useDispatch()
  //Dropdown Data
  const [relateUser, setRelateUser] = useState([]);
  const [relateUserOptions, setRelateUserOptions] = useState([]);
  const administrationData = useSelector((state) => state.administrationBackend)

  //console.log(administrationData?.userlistDetails?.data?.result);

  const Tab4Formik = useFormik({
    initialValues: {
      user_id: '',
    },
    validationSchema: Yup.object().shape({
      user_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values, tab: 'T4' } })
      dispatch(EmployeeUpdateAPI(props.dataId, formData))
    },
  });

  //Update Data
  useEffect(() => {
    if (props?.dataEdit?.data !== null) {
      Tab4Formik.setValues({
        "user_id": props?.dataEdit?.data?.user_id,
      });
      setRelateUser(convertValueLabel(props?.dataEdit?.data?.user_id, props?.dataEdit?.data?.user_id_name));
      setRelateUserOptions(props?.dataEdit?.data?.user_id_list)
    } else {
      dispatch(UserListDropDown());
      setRelateUserOptions(administrationData?.userlistDetails?.data?.result)
    }
  }, [props?.dataEdit?.data, administrationData?.userlistDetails?.data?.result])

  const handleRelatedUser = (e) => {
    if (e) {
      Tab4Formik.setFieldValue('user_id', e.value);
      setRelateUser(convertValueLabel(e.value, e.label));
    }
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CForm onSubmit={Tab4Formik.handleSubmit} className="form-horizontal">
          <div>
            <div className="row">
              <div className="col-lg-3">
                <div className="form-group">
                  <label htmlFor="">Related User <span className='error'>*</span></label>
                  <div className="">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={'Choose a Related User'}
                      value={relateUser}
                      name="user_id"
                      options={relateUserOptions}
                      onChange={(e) => handleRelatedUser(e)}
                      onBlur={Tab4Formik.handleBlur}
                    />
                    {Tab4Formik.errors.user_id && Tab4Formik.touched.user_id ? <div className="help-block text-danger">{Tab4Formik.errors.user_id}</div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CCardFooter>
            <CRow>
              <CCol className='col-md-10' align="center" >
                <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                <Link className='ml-3 btn btn-danger' to={'/employee/employee'}><CIcon name="cil-ban" /> Cancel</Link>
              </CCol>
            </CRow>
          </CCardFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
export default Tab4
