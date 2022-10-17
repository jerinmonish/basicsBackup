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
import { RelationshipListDropdown, AddEmployeeFamilyMember, DeleteEmployeeFamilyMember, EditDetailsEmployeeFamily, EmployeeFamilyUpdate } from 'src/actions/configuration';
import { convertValueLabel, indianDateFormat, convertDateToMDY } from '../../../utils/helper'
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import * as constants from "src/actions/types"
import { CandidateEditAPI } from '../../../actions/onboarding'
import CLoader from 'src/pages/loader/CLoader';
const AddCandidate3 = (props) => {
  const dispatch = useDispatch();
  const configurationData = useSelector((state) => state.configurationBackend)
  const { isLoading } = useSelector((state) => state.onboardingBackend);

  const [openPopGroup, setOpenPopGroup] = useState(false)
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }
  const [genderOptions, setGenderOptions] = useState([{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'transgender', label: 'Transgender' }]);
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [focusdateOfBirth, setfocusdateOfBirth] = useState(false);

  // update
  const [dateOfBirthUpdate, setdateOfBirthUpdate] = useState(null);
  const [focusdateOfBirthUpdate, setfocusdateOfBirthUpdate] = useState(false);
  const [openPopGroupUpdate, setOpenPopGroupUpdate] = useState(false)

  const [relationShipOptions, setRelationShipOptions] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [phoneselect, setPhoneSelected] = useState([])

  const [relationShipTable, setRelationShipTable] = useState([])
  const [genderTable, setGenderTable] = useState([])
  const [dobTable, setDobTable] = useState([])

  useEffect(() => {
    dispatch(RelationshipListDropdown())
  }, [openPopGroup, openPopGroupUpdate])


  const AddCandidate3Formik = useFormik({
    initialValues: {
      name: '',
      relationship_id: '',
      gender: '',
      phone: '',
      birthday: '',
      hr_applicant_id: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('This field is required'),
      relationship_id: Yup.string().required('This field is required'),
      gender: Yup.string().required('This field is required'),
      phone: Yup.string().required('This field is required'),
      birthday: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(AddEmployeeFamilyMember(formData))
    },
  });


  const AddCandidate3UpdateFormik = useFormik({
    initialValues: {
      name: '',
      relationship_id: '',
      gender: '',
      phone: '',
      birthday: '',
      hr_applicant_id: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('This field is required'),
      relationship_id: Yup.string().required('This field is required'),
      gender: Yup.string().required('This field is required'),
      phone: Yup.string().required('This field is required'),
      birthday: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(EmployeeFamilyUpdate(formData))
    },
  });


  const handleDateOfBirth = (date) => {
    if (date) {
      setdateOfBirth(date)
      AddCandidate3Formik.setFieldValue('birthday', indianDateFormat(date._d));
      setDobTable(indianDateFormat(date._d));
    }
  }

  const handleDateOfBirthUpdate = (date) => {
    if (date) {
      setdateOfBirthUpdate(date)
      AddCandidate3UpdateFormik.setFieldValue('birthday', indianDateFormat(date._d));
      setDobTable(indianDateFormat(date._d));
    }
  }

  const handleRelationship = (e) => {
    if (e?.value) {
      AddCandidate3Formik.setFieldValue('relationship_id', e.value);
      AddCandidate3Formik.setFieldValue('hr_applicant_id', props.dataId);
      setRelationShipTable(e.label);
    }
  }

  const handleRelationshipupdate = (e) => {
    if (e?.value) {
      AddCandidate3UpdateFormik.setFieldValue('relationship_id', e.value);
      setRelationShipOptions(convertValueLabel(e?.value, e?.label))
      AddCandidate3UpdateFormik.setFieldValue('hr_applicant_id', props.dataId);
      setRelationShipTable(e.label);
    }
  }

  const handleGender = (e) => {
    if (e?.value) {
      AddCandidate3Formik.setFieldValue('gender', e.value);
      setGenderTable(e.label);
    }
  }

  const handleGenderupdate = (e) => {
    if (e?.value) {
      AddCandidate3UpdateFormik.setFieldValue('gender', e.value);
      setSelectedGender(convertValueLabel(e?.value, e?.label))
      setGenderTable(e.label);
    }
  }

  const handlePhoneupdate = (e) => {
    if (e?.value) {
      AddCandidate3UpdateFormik.setFieldValue('phone', e?.value);
      //  setSelectedGender(convertValueLabel(e?.value,e?.label))
    }
  }

  useEffect(() => {
    //To Show Success Message
    if (configurationData?.showToast) {
      let sMsg = ''
      if (configurationData?.success === 'employee family add success') {
        sMsg = 'Family Member Successfully Saved !'
        setOpenPopGroup(!openPopGroup)
      } else if (configurationData?.success === 'employee family update success') {
        sMsg = 'Family Member Updated !'
        setOpenPopGroupUpdate(!openPopGroupUpdate)
        dispatch(CandidateEditAPI(props.dataId));
      }
      /*if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT,
        })
        dispatch({
          type: constants.MESSAGE_CLEAR,
        })
      }*/
    }
  }, [configurationData?.success, configurationData?.showToast]);

  useEffect(() => {
    if (configurationData?.famid?.data && configurationData?.success === 'employee family add success') {
      props?.dataEdit?.data?.family_member_ids.push({
        "name": AddCandidate3Formik?.values.name,
        "relationship_id_name": relationShipTable,
        "gender_label": genderTable,
        "birthday": dobTable,
        "phone": AddCandidate3Formik?.values.phone,
        "famid": configurationData?.famid?.data,
        "id": configurationData?.famid?.data
      });
      AddCandidate3Formik.resetForm();
    }

  }, [configurationData?.famid?.data, props?.dataEdit?.data?.family_member_ids, configurationData?.success, relationShipTable, genderTable, dobTable])

  const handleEmployeefamilyDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(DeleteEmployeeFamilyMember(gid))
      }
    })
  }


  //Method to get edit values
  const handleEmployeeFamilyDetails = (gid) => {
    dispatch(EditDetailsEmployeeFamily(gid));
    setOpenPopGroupUpdate(!openPopGroupUpdate)
  }
  // phone
  useEffect(() => {
    if (configurationData?.employeeFamilyDetails !== null) {
      AddCandidate3UpdateFormik.setValues({
        "hr_applicant_id": props.dataId,
        "id": configurationData?.employeeFamilyDetails?.id,
        "name": configurationData?.employeeFamilyDetails?.name,
        "relationship_id": configurationData?.employeeFamilyDetails?.relationship_id,
        "gender": configurationData?.employeeFamilyDetails?.gender,
        "birthday": indianDateFormat(configurationData?.employeeFamilyDetails?.birthday),
        "phone": configurationData?.employeeFamilyDetails?.phone,
      });

      if (configurationData?.employeeFamilyDetails?.birthday) {
        setdateOfBirthUpdate(moment(new Date(convertDateToMDY(configurationData?.employeeFamilyDetails?.birthday))));
      }

      if (configurationData?.employeeFamilyDetails?.relationship_id_name) {
        setRelationShipOptions(convertValueLabel(configurationData?.employeeFamilyDetails?.relationship_id, configurationData?.employeeFamilyDetails?.relationship_id_name));

      }
      if (configurationData?.employeeFamilyDetails?.gender_label) {
        setSelectedGender(convertValueLabel(configurationData?.employeeFamilyDetails?.gender, configurationData?.employeeFamilyDetails?.gender_label));

      }

      if (configurationData?.employeeFamilyDetails?.phone) {
        setPhoneSelected(configurationData?.employeeFamilyDetails?.phone)
      }

    }
  }, [configurationData?.employeeFamilyDetails]);

  useEffect(() => {
    if (configurationData?.isEmployeeFamilyDeleted) {
      dispatch(CandidateEditAPI(props.dataId));
    }
  }, [configurationData?.isEmployeeFamilyDeleted])

  return (
    <>
      <CCard className="mb-4">
        {
          (isLoading === true) ? <CLoader /> :
            <CCardBody>
              <div className="form-horizontal">
                <div>
                  <CCard className="mb-4">
                    <CCardHeader id="headingTwo " className="header">
                      <div>
                        <h5 className="m-0 p-0">Family Members </h5>
                      </div>
                      <div className=''>
                        <CButton className={'float-right'} color="primary" onClick={() => setOpenPopGroup(!openPopGroup)}>Add</CButton>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row">
                        <CDataTable
                          items={props?.dataEdit?.data?.family_member_ids}
                          fields={[{ key: "name", label: "Name" },
                          { key: "relationship_id_name", label: "Relationship" }, { key: "gender_label", label: "Gender" }, { key: "birthday", label: "Birthday" }, { key: "phone", label: "Phone" }, { key: 'action', label: 'Actions', filter: false }]}
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
                                    handleEmployeeFamilyDetails(items.id)
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
                                    handleEmployeefamilyDelete(items.id)
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
                      <CModalTitle>Add Family Member</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isEmpFamLoading === true) ? 'Saving Please Wait...' :
                          <CForm onSubmit={AddCandidate3Formik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Name <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name="name" className="form-control" placeholder='Name' maxLength={50} onChange={AddCandidate3Formik.handleChange}
                                        onBlur={AddCandidate3Formik.handleBlur} value={AddCandidate3Formik.values.name} />
                                      {AddCandidate3Formik.touched.name && AddCandidate3Formik.errors.name ? <div className="help-block text-danger">{AddCandidate3Formik.errors.name}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Relationship <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Relationship'}
                                        // value={relateUser}
                                        name="relationship_id"
                                        options={configurationData?.relationshipListDetails?.data?.result}
                                        onChange={(e) => handleRelationship(e)}
                                        onBlur={AddCandidate3Formik.handleBlur}
                                      />
                                      {AddCandidate3Formik.touched.relationship_id && AddCandidate3Formik.errors.relationship_id ? <div className="help-block text-danger">{AddCandidate3Formik.errors.relationship_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Gender <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Gender'}
                                        // value={relateUser}
                                        name="gender"
                                        options={genderOptions}
                                        onChange={(e) => handleGender(e)}
                                        onBlur={AddCandidate3Formik.handleBlur}
                                      />
                                      {AddCandidate3Formik.touched.gender && AddCandidate3Formik.errors.gender ? <div className="help-block text-danger">{AddCandidate3Formik.errors.gender}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Phone <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name="phone" className="form-control" placeholder='Phone' maxLength={10} onChange={AddCandidate3Formik.handleChange} onBlur={AddCandidate3Formik.handleBlur} value={AddCandidate3Formik.values.phone} />
                                      {AddCandidate3Formik.touched.gender && AddCandidate3Formik.errors.phone ? <div className="help-block text-danger">{AddCandidate3Formik.errors.phone}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Date Of Birth <span className='error'>*</span></label>
                                    <div className="">
                                      <SingleDatePicker
                                        id="birthday"
                                        date={dateOfBirth}
                                        isOutsideRange={d => d.isAfter(moment())}
                                        isDayHighlighted={day => day.isSame(moment(), 'd')}
                                        onDateChange={(date) => handleDateOfBirth(date)}
                                        focused={focusdateOfBirth}
                                        onFocusChange={({ focused }) => setfocusdateOfBirth(focused)}
                                        numberOfMonths={1}
                                        displayFormat="DD-MM-YYYY"
                                        placeholder='Date Of Birth'
                                        readOnly={true}
                                        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
                                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div>
                                              <select
                                                value={month.month()}
                                                onChange={(e) => onMonthSelect(month, e.target.value)}
                                              >
                                                {moment.months().map((label, value) => (
                                                  <option value={value} key={`birthday_${value}`}>{label}</option>
                                                ))}
                                              </select>
                                            </div>
                                            <div>
                                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                {yearsDD('birthday_yr')}
                                              </select>
                                            </div>
                                          </div>}
                                      />
                                      {AddCandidate3Formik.touched.birthday && AddCandidate3Formik.errors.birthday ? <div className="help-block text-danger">{AddCandidate3Formik.errors.birthday}</div> : null}
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
                  <CModal show={openPopGroupUpdate} onClose={() => setOpenPopGroupUpdate(!openPopGroupUpdate)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Update Family Member</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isEmpFamLoading === true) ? 'Saving Please Wait...' :
                          <CForm onSubmit={AddCandidate3UpdateFormik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Name <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name="name" className="form-control" placeholder='Name' maxLength={50}
                                        onChange={AddCandidate3UpdateFormik.handleChange} onBlur={AddCandidate3UpdateFormik.handleBlur}
                                        value={AddCandidate3UpdateFormik.values.name} />
                                      {AddCandidate3UpdateFormik.touched.name && AddCandidate3UpdateFormik.errors.name ? <div className="help-block text-danger">{AddCandidate3UpdateFormik.errors.name}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Relationship <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Relationship'}
                                        value={relationShipOptions}
                                        name="relationship_id"
                                        options={configurationData?.relationshipListDetails?.data?.result}
                                        onChange={(e) => handleRelationshipupdate(e)}
                                        onBlur={AddCandidate3UpdateFormik.handleBlur}
                                      />
                                      {AddCandidate3UpdateFormik.touched.relationship_id && AddCandidate3Formik.errors.relationship_id ? <div className="help-block text-danger">{AddCandidate3UpdateFormik.errors.relationship_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Gender <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Gender'}
                                        value={selectedGender}
                                        name="gender"
                                        options={genderOptions}
                                        onChange={(e) => handleGenderupdate(e)}
                                        onBlur={AddCandidate3UpdateFormik.handleBlur}
                                      />
                                      {AddCandidate3UpdateFormik.touched.gender && AddCandidate3UpdateFormik.errors.gender ? <div className="help-block text-danger">{AddCandidate3UpdateFormik.errors.gender}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Phone <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name="phone" className="form-control" placeholder='Phone' maxLength={10}
                                        onChange={AddCandidate3UpdateFormik.handleChange} onBlur={AddCandidate3UpdateFormik.handleBlur}
                                        value={AddCandidate3UpdateFormik.values.phone} />
                                      {AddCandidate3UpdateFormik.touched.phone && AddCandidate3UpdateFormik.errors.phone ? <div className="help-block text-danger">{AddCandidate3UpdateFormik.errors.phone}</div> : null}
                                    </div>
                                    {/* <div className="">
                                    <input type="text"
                                      name="phone" className="form-control"
                                      placeholder='Phone' maxLength={10}
                                      //  onChange={(e) => handlePhoneupdate(e)}
                                      onChange={AddCandidate3UpdateFormik.handleChange}
                                      onBlur={AddCandidate3UpdateFormik.handleBlur}
                                      // value={phoneselect}
                                      value={AddCandidate3UpdateFormik.values.phone}
                                    />
                                  {AddCandidate3UpdateFormik.touched.phone&& AddCandidate3UpdateFormik.errors.phone ? <div className="help-block text-danger">{AddCandidate3UpdateFormik.errors.phone}</div> : null}
                                </div> */}
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Date Of Birth <span className='error'>*</span></label>
                                    <div className="">
                                      <SingleDatePicker
                                        id="birthday"
                                        date={dateOfBirthUpdate}
                                        onDateChange={(date) => handleDateOfBirthUpdate(date)}
                                        focused={focusdateOfBirthUpdate}
                                        onFocusChange={({ focused }) => setfocusdateOfBirthUpdate(focused)}
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
                                                  <option value={value} key={`birthday_${value}`}>{label}</option>
                                                ))}
                                              </select>
                                            </div>
                                            <div>
                                              <select value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
                                                {yearsDD('birthday_yr')}
                                              </select>
                                            </div>
                                          </div>}
                                      />
                                      {AddCandidate3UpdateFormik.touched.birthday && AddCandidate3UpdateFormik.errors.birthday ? <div className="help-block text-danger">{AddCandidate3UpdateFormik.errors.birthday}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CCardBody>
                            <CCardFooter>
                              <CRow>
                                <CCol className='col-md-10' align="center" >
                                  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                                  <CButton type="reset" onClick={() => setOpenPopGroupUpdate(!openPopGroupUpdate)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
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
        }
      </CCard>
    </>
  )
}
export default AddCandidate3
