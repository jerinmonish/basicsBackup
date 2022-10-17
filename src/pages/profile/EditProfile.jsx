import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserProfileUpdateAPI, UserEditAPI } from '../../actions/administration'
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
import CIcon from '@coreui/icons-react'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { decryptSingleData, convertValueLabel } from '../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import CLoader from 'src/pages/loader/CLoader';
const EditProfile = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const timzoneData = require('../../components/data/TimeZone.json');
  const { userEditDetails, isLoading } = useSelector((state) => state.administrationBackend);
  const [timeZone, setTimeZone] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [imgData, setImgData] = useState(null);
  //To load dropdown predefined data
  useEffect(() => {
    dispatch(UserEditAPI(decryptSingleData(props?.match?.params?.id)))
  }, [])

  const ProfileUpdateFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      tz: '',
      image_1920: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      email: Yup.string().email('Invalid email format').required('This field is required'),
      mobile: Yup.number().typeError("That doesn't look like a mobile number").required('This field is required'),
      tz: Yup.string().required('This field is required'),
      // image_1920: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { "kwargs": { "id": decryptSingleData(props?.match?.params?.id), "data": values } } });
      dispatch(UserProfileUpdateAPI(formData));
    },
  });

  useEffect(() => {
    if (userEditDetails?.data !== null) {
      ProfileUpdateFormik.setValues({
        "name": userEditDetails?.data?.name,
        "email": userEditDetails?.data?.email,
        "mobile": userEditDetails?.data?.mobile,
        "tz": userEditDetails?.data?.tz,
      });
      setTimeZone(convertValueLabel(userEditDetails?.data?.tz, userEditDetails?.data?.tz_label));
    }
  }, [userEditDetails?.data])

  const onProfileImage = e => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        ProfileUpdateFormik.setFieldValue("image_1920", reader.result)
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleTimezoneChange = (e) => {
    if (e?.value) {
      ProfileUpdateFormik.setFieldValue('tz', e.value);
      setTimeZone(convertValueLabel(e.value, e.label));
    }
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
                      <strong> Edit Profile </strong>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={ProfileUpdateFormik.handleSubmit} className="form-horizontal">
                    <div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Name <span className="error">*</span></label>
                          <input type="text" name="name" value={ProfileUpdateFormik.values.name} className="form-control" placeholder="Name" maxLength={30} onChange={ProfileUpdateFormik.handleChange} onBlur={ProfileUpdateFormik.handleBlur} />
                          {ProfileUpdateFormik.touched.name && ProfileUpdateFormik.errors.name ? (<div className="help-block text-danger">{ProfileUpdateFormik.errors.name}</div>) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Email <span className="error">*</span></label>
                          <input type="email" name="email" value={ProfileUpdateFormik.values.email} className="form-control" placeholder="Email" maxLength={50} onChange={ProfileUpdateFormik.handleChange} onBlur={ProfileUpdateFormik.handleBlur} />
                          {ProfileUpdateFormik.touched.email && ProfileUpdateFormik.errors.email ? (<div className="help-block text-danger">{ProfileUpdateFormik.errors.email}</div>) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Mobile <span className="error">*</span></label>
                          <input type="text" name="mobile" value={ProfileUpdateFormik.values.mobile} className="form-control" placeholder="Mobile" maxLength={10} onChange={ProfileUpdateFormik.handleChange} onBlur={ProfileUpdateFormik.handleBlur} />
                          {ProfileUpdateFormik.touched.mobile && ProfileUpdateFormik.errors.mobile ? (<div className="help-block text-danger">{ProfileUpdateFormik.errors.mobile}</div>) : null}
                        </div>
                      </div>

                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Profile Image <span className="error">*</span></label>
                          <input type="file" name='image_1920' className="form-control" onBlur={ProfileUpdateFormik.handleBlur} onChange={(event) => { onProfileImage(event) }} accept="image/png, image/jpeg, image/jpg" />
                          {ProfileUpdateFormik.touched.image_1920 && ProfileUpdateFormik.errors.image_1920 ? (<div className="help-block text-danger">{ProfileUpdateFormik.errors.image_1920}</div>) : null}
                          {
                            (userEditDetails?.data?.image_1920) ? <div className='mt-2'><a href={userEditDetails?.data?.image_1920} target='_blank' className='mt-4'>Existing Profile Image</a></div> : ''
                          }
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Timezone <span className="error">*</span></label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Timezone'}
                            value={timeZone}
                            name="tz"
                            options={timzoneData}
                            onChange={(e) => handleTimezoneChange(e)}
                            onBlur={ProfileUpdateFormik.handleBlur}
                          />
                          {ProfileUpdateFormik.touched.tz && ProfileUpdateFormik.errors.tz ? (<div className="help-block text-danger">{ProfileUpdateFormik.errors.tz}</div>) : null}
                        </div>
                      </div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className="col-md-10" align="center">
                          <CButton type="submit" size="md" color="primary">
                            <CIcon name="cil-scrubber" /> Update
                          </CButton>
                          <Link className="ml-3 btn btn-danger" to={'/master/dashboard'}>
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
      }
    </main>
  )
}

export default EditProfile
