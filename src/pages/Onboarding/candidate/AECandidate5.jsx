import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CDataTable,
} from "@coreui/react";
import { TextMask, InputAdapter } from 'react-text-mask-hoc'
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddEmployeeWorkExperience, DeleteEmployeeWorkExperience, WorkingExperienceDetails, WorkingExperienceUpdate } from 'src/actions/configuration';
import { convertValueLabel, indianDateFormat, encryptSingleData, convertDateToMDY, decryptSingleData } from '../../../utils/helper'
import "react-dates/initialize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SingleDatePicker } from "react-dates";
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment';
import * as constants from "src/actions/types"
import { CandidateEditAPI } from '../../../actions/onboarding'
import CLoader from 'src/pages/loader/CLoader';

const AddCandidate5 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { isLoading } = useSelector((state) => state.onboardingBackend);
  const WorkExperienceData = useSelector((state) => state.configurationBackend)

  const [openPopGroup, setOpenPopGroup] = useState(false)
  const [openEditGroup, setOpenEditGroup] = useState(false)
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }
  const [joiningDate, setjoiningDate] = useState(null);
  const [focusJoiningDate, setfocusJoiningDate] = useState(false);
  const [leavingDate, setleavingDate] = useState(null);
  const [focusleavingDate, setfocusleavingDate] = useState(false);

  const [joiningDateUpdate, setjoiningDateUpdate] = useState(null);
  const [focusJoiningDateUpdate, setfocusJoiningDateUpdate] = useState(false);
  const [leavingDateUpdate, setleavingDateupdate] = useState(null);
  const [focusleavingDateUpdate, setfocusleavingDateUpdate] = useState(false);

  const AddCandidate5Formik = useFormik({
    initialValues: {
      name: '',
      role_played: '',
      joining_date: '',
      leaving_date: '',
      hr_applicant_id: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('This field is required'),
      role_played: Yup.string().required('This field is required'),
      joining_date: Yup.string().required('This field is required'),
      leaving_date: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(AddEmployeeWorkExperience(formData))
    },
  });

  useEffect(() => {
    if (WorkExperienceData?.empweId?.data && WorkExperienceData?.success === 'working experience add success') {
      props?.dataEdit?.data?.work_experience_ids.push({
        "name": AddCandidate5Formik?.values.name,
        "joining_date": AddCandidate5Formik?.values.joining_date,
        "leaving_date": AddCandidate5Formik?.values.leaving_date,
        "role_played": AddCandidate5Formik?.values.role_played,
        "id": WorkExperienceData?.empweId?.data
      });
      AddCandidate5Formik.resetForm();
    }
  }, [WorkExperienceData?.empweId?.data, props?.dataEdit?.data?.work_experience_ids, WorkExperienceData?.success])

  const handleJoiningDate = (date) => {
    if (date) {
      setjoiningDate(date)
      AddCandidate5Formik.setFieldValue('joining_date', indianDateFormat(date._d));
      AddCandidate5Formik.setFieldValue('hr_applicant_id', props.dataId);
    }
  }

  const handleLeavingDate = (date) => {
    if (date) {
      setleavingDate(date)
      AddCandidate5Formik.setFieldValue('leaving_date', indianDateFormat(date._d));
    }
  }

  //Method to get edit values for a woexp
  const handleWorkExperienceDetails = (gid) => {
    dispatch(WorkingExperienceDetails(gid));
    setOpenEditGroup(!openEditGroup)
  }

  useEffect(() => {
    if (WorkExperienceData?.WorkexperienceDetails !== null) {
      AddCandidate5UpdateFormik.setValues({
        "hr_applicant_id": props.dataId,
        "id": WorkExperienceData?.WorkexperienceDetails?.id,
        "name": WorkExperienceData?.WorkexperienceDetails?.name,
        "role_played": WorkExperienceData?.WorkexperienceDetails?.role_played,
        "joining_date": indianDateFormat(WorkExperienceData?.WorkexperienceDetails?.joining_date),
        "leaving_date": indianDateFormat(WorkExperienceData?.WorkexperienceDetails?.leaving_date),
      });

      if (WorkExperienceData?.WorkexperienceDetails?.joining_date) {
        setjoiningDateUpdate(moment(new Date(convertDateToMDY(WorkExperienceData?.WorkexperienceDetails?.joining_date))));
      }
      if (WorkExperienceData?.WorkexperienceDetails?.leaving_date) {
        setleavingDateupdate(moment(new Date(convertDateToMDY(WorkExperienceData?.WorkexperienceDetails?.leaving_date))));
      }
    }
  }, [WorkExperienceData?.WorkexperienceDetails]);

  const handleupdateJoiningDate = (date) => {
    if (date) {
      setjoiningDateUpdate(date)
      AddCandidate5UpdateFormik.setFieldValue('joining_date', indianDateFormat(date._d));
      AddCandidate5UpdateFormik.setFieldValue('hr_applicant_id', props.dataId);
    }
  }

  const handleupdateLeavingDate = (date) => {
    if (date) {
      setleavingDateupdate(date)
      AddCandidate5UpdateFormik.setFieldValue('leaving_date', indianDateFormat(date._d));
    }
  }


  //WorkingExperience Edit Form Initilization
  const AddCandidate5UpdateFormik = useFormik({

    initialValues: {
      name: '',
      role_played: '',
      joining_date: '',
      leaving_date: '',
      hr_applicant_id: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('This field is required'),
      role_played: Yup.string().required('This field is required'),
      joining_date: Yup.string().required('This field is required'),
      leaving_date: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(WorkingExperienceUpdate(formData))
    },
  });


  useEffect(() => {
    //To Show Success Message
    if (WorkExperienceData?.showToast) {
      let sMsg = ''
      if (WorkExperienceData?.success === 'working experience add success') {
        sMsg = 'Working Experience Successfully Saved !'
        setOpenPopGroup(!openPopGroup)
      } else if (WorkExperienceData?.success === 'working experience update success') {
        sMsg = 'Working Experience Updated !'
        setOpenEditGroup(!openEditGroup)
        dispatch(CandidateEditAPI(props.dataId));
      }
      if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT,
        })
        dispatch({
          type: constants.MESSAGE_CLEAR,
        })
      }
    }
  }, [WorkExperienceData?.success, WorkExperienceData?.showToast]);

  const handleWorkExperienceDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(DeleteEmployeeWorkExperience(gid))
      }

    })
  }

  useEffect(() => {
    if (WorkExperienceData?.isEmployeeworkExpsDeleted) {
      dispatch(CandidateEditAPI(props.dataId));
    }
  }, [WorkExperienceData?.isEmployeeworkExpsDeleted])

  return (
    <>
      {
        (isLoading === true) ? <CLoader /> :
          <CCard className="mb-4">
            {/* <ToastContainer /> */}
            <CCardBody>
              <div className="form-horizontal">
                <div>
                  <CCard className="mb-4">
                    <CCardHeader id="headingTwo " className="header">
                      <div>
                        <h5 className="m-0 p-0">Work Experience </h5>
                      </div>
                      <div className="div">
                        <CButton className={'float-right'} color="primary" onClick={() => setOpenPopGroup(!openPopGroup)}>Add</CButton>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row">
                        <CDataTable
                          items={props?.dataEdit?.data?.work_experience_ids}
                          fields={[{ key: "name", label: "Name of the Previous Employer" }, { key: "joining_date", label: "Date Of Joining" }, { key: "leaving_date", label: "Date Of Leaving" }, { key: "role_played", label: "Role Played" }, { key: 'action', label: 'Actions', filter: false }]}
                          hover
                          striped
                          bordered
                          // size="sm"
                          scopedSlots={{
                            action: (items) => (
                              <td>
                                {/* <Link
                              to={`/administration/view-user/${encryptSingleData(
                                item.id,
                              )}`}
                            >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> */}
                                {/* &nbsp;&nbsp; */}
                                  <Link
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      e.preventDefault()
                                      handleWorkExperienceDetails(items.id)
                                    }}
                                     className='btn btn-success btn-sm'
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencilAlt}
                                      title="Edit"
                                    />{' '}
                                  </Link>

                                  <Link
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      e.preventDefault()
                                      handleWorkExperienceDelete(items.id)
                                    }}
                                     className='btn btn-danger ml-2 btn-sm'
                                  >
                                    <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                                  </Link>
                              </td>
                            ),
                          }}
                        />
                      </div>
                    </CCardBody>
                  </CCard>
                  {/*  Add Form */}
                  <CModal show={openPopGroup} onClose={() => setOpenPopGroup(!openPopGroup)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Add Work Experience</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (WorkExperienceData?.isEmpWoeLoading === true) ? 'Saving Please Wait...' :
                          <CForm onSubmit={AddCandidate5Formik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Name of the Previous Employer <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`name`} className="form-control" placeholder='Name of the Previous Employer' maxLength={20} onChange={AddCandidate5Formik.handleChange} onBlur={AddCandidate5Formik.handleBlur} value={AddCandidate5Formik.values.name} />
                                      {AddCandidate5Formik.errors.name ? <div className="help-block text-danger">{AddCandidate5Formik.errors.name}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Role Played <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name='role_played' className="form-control" placeholder='Role Played' maxLength={20} onChange={AddCandidate5Formik.handleChange} onBlur={AddCandidate5Formik.handleBlur} value={AddCandidate5Formik.values.role_played} />
                                      {AddCandidate5Formik.errors.role_played ? <div className="help-block text-danger">{AddCandidate5Formik.errors.role_played}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Date Of Joining <span className='error'>*</span></label>
                                    <div className="">
                                      <SingleDatePicker
                                        id={'joining_date'}
                                        date={joiningDate}
                                        onDateChange={(date) => handleJoiningDate(date)}
                                        focused={focusJoiningDate}
                                        onFocusChange={({ focused }) => setfocusJoiningDate(focused)}
                                        numberOfMonths={1}
                                        displayFormat="DD-MM-YYYY"
                                        isOutsideRange={d => d.isAfter(moment())}
                                        isDayHighlighted={day => day.isSame(moment(), 'd')}
                                        placeholder='Date of Joining'
                                        readOnly={true}
                                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                              <select
                                                value={month.month()}
                                                onChange={(e) => onMonthSelect(month, e.target.value)}
                                              >
                                                {moment.months().map((label, value) => (
                                                  <option value={value} key={`joining_date_${value}`}>{label}</option>
                                                ))}
                                              </select>
                                            </div>
                                            <div>
                                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                {yearsDD('joining_date_yr')}
                                              </select>
                                            </div>
                                          </div>}
                                      />
                                      {AddCandidate5Formik.errors.joining_date ? <div className="help-block text-danger">{AddCandidate5Formik.errors.joining_date}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Date Of Leaving <span className='error'>*</span></label>
                                    <div className="">
                                      <SingleDatePicker
                                        id={'leaving_date'}
                                        date={leavingDate}
                                        onDateChange={(date) => handleLeavingDate(date)}
                                        focused={focusleavingDate}
                                        onFocusChange={({ focused }) => setfocusleavingDate(focused)}
                                        numberOfMonths={1}
                                        displayFormat="DD-MM-YYYY"
                                        isOutsideRange={d => d.isAfter(moment())}
                                        isDayHighlighted={day => day.isSame(moment(), 'd')}
                                        placeholder='Date of Leaving'
                                        readOnly={true}
                                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                              <select
                                                value={month.month()}
                                                onChange={(e) => onMonthSelect(month, e.target.value)}
                                              >
                                                {moment.months().map((label, value) => (
                                                  <option value={value} key={`leaving_date_${value}`}>{label}</option>
                                                ))}
                                              </select>
                                            </div>
                                            <div>
                                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                {yearsDD('leaving_date_yr')}
                                              </select>
                                            </div>
                                          </div>}
                                      />
                                      {AddCandidate5Formik.errors.leaving_date ? <div className="help-block text-danger">{AddCandidate5Formik.errors.leaving_date}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CCardBody>
                            <CCardFooter>
                              <CRow>
                                <CCol className='col-md-10' align="center" >
                                  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                                  <CButton type="reset" onClick={() => setOpenPopGroup(!openPopGroup)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                                </CCol>
                              </CRow>
                            </CCardFooter>
                          </CForm>
                      }
                    </CModalBody>
                  </CModal>

                  {/*  update Form */}
                  <CModal show={openEditGroup} onClose={() => setOpenEditGroup(!openEditGroup)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Update Work Experience</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (WorkExperienceData?.isEmpWoeLoading === true) ? ' Please Wait...' :
                          <CForm onSubmit={AddCandidate5UpdateFormik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Name of the Previous Employer <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`name`} className="form-control" placeholder='Name of the Previous Employer' maxLength={20} onChange={AddCandidate5UpdateFormik.handleChange} onBlur={AddCandidate5UpdateFormik.handleBlur} value={AddCandidate5UpdateFormik.values.name} />
                                      {AddCandidate5UpdateFormik.touched.name && AddCandidate5UpdateFormik.errors.name ? <div className="help-block text-danger">{AddCandidate5UpdateFormik.errors.name}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Role Played <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name='role_played' className="form-control" placeholder='Role Played' maxLength={20} onChange={AddCandidate5UpdateFormik.handleChange} onBlur={AddCandidate5UpdateFormik.handleBlur} value={AddCandidate5UpdateFormik.values.role_played} />
                                      {AddCandidate5UpdateFormik.touched.role_played && AddCandidate5UpdateFormik.errors.role_played ? <div className="help-block text-danger">{AddCandidate5UpdateFormik.errors.role_played}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Date Of Joining <span className='error'>*</span></label>
                                    <div className="">
                                      <SingleDatePicker
                                        id={'joining_date'}
                                        date={joiningDateUpdate}
                                        onDateChange={(date) => handleupdateJoiningDate(date)}
                                        focused={focusJoiningDateUpdate}
                                        onFocusChange={({ focused }) => setfocusJoiningDateUpdate(focused)}
                                        numberOfMonths={1}
                                        displayFormat="DD-MM-YYYY"
                                        isOutsideRange={() => false}
                                        placeholder='Date of Joining Again'
                                        readOnly={true}
                                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                              <select
                                                value={month.month()}
                                                onChange={(e) => onMonthSelect(month, e.target.value)}
                                              >
                                                {moment.months().map((label, value) => (
                                                  <option value={value} key={`joining_date_${value}`}>{label}</option>
                                                ))}
                                              </select>
                                            </div>
                                            <div>
                                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                {yearsDD('joining_date_yr')}
                                              </select>
                                            </div>
                                          </div>}
                                      />
                                      {AddCandidate5UpdateFormik.touched.joining_date && AddCandidate5UpdateFormik.errors.joining_date ? <div className="help-block text-danger">{AddCandidate5UpdateFormik.errors.joining_date}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Date Of Leaving <span className='error'>*</span></label>
                                    <div className="">
                                      <SingleDatePicker
                                        id={'leaving_date'}
                                        date={leavingDateUpdate}
                                        onDateChange={(date) => handleupdateLeavingDate(date)}
                                        focused={focusleavingDateUpdate}
                                        onFocusChange={({ focused }) => setfocusleavingDateUpdate(focused)}
                                        numberOfMonths={1}
                                        displayFormat="DD-MM-YYYY"
                                        isOutsideRange={() => false}
                                        placeholder='Date of Leaving'
                                        readOnly={true}
                                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                              <select
                                                value={month.month()}
                                                onChange={(e) => onMonthSelect(month, e.target.value)}
                                              >
                                                {moment.months().map((label, value) => (
                                                  <option value={value} key={`leaving_date_${value}`}>{label}</option>
                                                ))}
                                              </select>
                                            </div>
                                            <div>
                                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                {yearsDD('leaving_date_yr')}
                                              </select>
                                            </div>
                                          </div>}
                                      />
                                      {AddCandidate5UpdateFormik.touched.leaving_date && AddCandidate5UpdateFormik.errors.leaving_date ? <div className="help-block text-danger">{AddCandidate5UpdateFormik.errors.leaving_date}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CCardBody>
                            <CCardFooter>
                              <CRow>
                                <CCol className='col-md-10' align="center" >
                                  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                                  <CButton type="reset" onClick={() => setOpenEditGroup(!openEditGroup)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                                </CCol>
                              </CRow>
                            </CCardFooter>
                          </CForm>
                      }
                    </CModalBody>
                  </CModal>
                </div>
              </div>
            </CCardBody>
          </CCard>
      }
    </>
  )
}
export default AddCandidate5
