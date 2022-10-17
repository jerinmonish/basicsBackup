import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import * as constants from "src/actions/types"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
  CFade,
  CCardFooter,
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CDataTable,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux';
import { convertValueLabel, convertDateToMDY, isLoggedIn, encryptSingleData, indianDateFormat } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddEmployeeWorkExperience, DeleteEmployeeWorkExperience, WorkingExperienceDetails, WorkingExperienceUpdate } from '../../../actions/configuration';
import CLoader from 'src/pages/loader/CLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
const ExistingCareerOnBo3 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [openPopGroup, setOpenPopGroup] = useState(false)
  const [workEmpFrmData, setWorkEmpFrmData] = useState([]);
  const [workTData, setWorkTData] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(0);
  const [dynStId, setDynStId] = useState(0);
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

  const popUpOpen = (e) => {
    document.getElementById("weuname").value = "";
    document.getElementById("role_played").value = "";
    document.getElementById("joining_date").value = "";
    document.getElementById("leaving_date").value = "";
    document.body.classList.add('modal-open');
    setOpenPopGroup(!openPopGroup)
    setAddOrEdit(0)
    const violation = document.getElementById("workExperience");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleOncloseResetform = () => {
    document.getElementById("weuname").value = "";
    document.getElementById("role_played").value = "";
    document.getElementById("joining_date").value = "";
    document.getElementById("leaving_date").value = "";
    setOpenPopGroup(!openPopGroup)
    document.body.classList.remove('modal-open');
    const violation = document.getElementById("education1");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleInput = (e) => {
    setWorkEmpFrmData({ ...workEmpFrmData, [e.target.name]: e.target.value })
  }

  const handleJoiningDate = (date) => {
    if (date) {
      setjoiningDate(date)
      setWorkEmpFrmData({ ...workEmpFrmData, ['joining_date']: indianDateFormat(date._d) })
    }
  }

  const handleLeavingDate = (date) => {
    if (date) {
      setleavingDate(date)
      setWorkEmpFrmData({ ...workEmpFrmData, ['leaving_date']: indianDateFormat(date._d) })
    }
  }

  const handleWESubmit = () => {
    var tableData = [];

    var vald = '';
    if (workEmpFrmData?.name == "" || workEmpFrmData?.name == undefined) {
      vald = false;
    } else if (workEmpFrmData?.role_played == "" || workEmpFrmData?.role_played == undefined) {
      vald = false;
    } else if (workEmpFrmData?.joining_date == "" || workEmpFrmData?.joining_date == undefined) {
      vald = false;
    } else if (workEmpFrmData?.leaving_date == "" || workEmpFrmData?.leaving_date == undefined) {
      vald = false;
    } else {
      vald = true;
    }

    if (vald == true) {
      setWorkTData(marray => [...marray, workEmpFrmData]);
      props.WorkExpData.push(workEmpFrmData);
      handleOncloseResetform();
      setWorkEmpFrmData([]);
    } else {
      toast.error("Fill all the mandatory fields", {
        position: toast.POSITION.TOP_RIGHT,
      })
      return false
    }
  }

  const handleEditWorkExpDetails = (num) => {
    setAddOrEdit(1)
    setDynStId(num)
    document.getElementById("weuname").value = workTData[num].name;
    document.getElementById("role_played").value = workTData[num].role_played;
    document.getElementById("joining_date").value = workTData[num].joining_date;
    document.getElementById("leaving_date").value = workTData[num].leaving_date;
    //setjoiningDate(workTData[num].joining_date);
    //setleavingDate(workTData[num].leaving_date);
    document.body.classList.add('modal-open');
    setOpenPopGroup(!openPopGroup)
    const violation = document.getElementById("workExperience");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleWEUpdate = () => {
    let temp_state = [...workTData];
    let temp_element = { ...temp_state[dynStId] };
    temp_element['name'] = workEmpFrmData.name != undefined ? workEmpFrmData.name : temp_element.name;
    temp_element['role_played'] = workEmpFrmData.role_played != undefined ? workEmpFrmData.role_played : temp_element.role_played;
    temp_element['joining_date'] = workEmpFrmData.joining_date != undefined ? workEmpFrmData.joining_date : temp_element.joining_date;
    temp_element['leaving_date'] = workEmpFrmData.leaving_date != undefined ? workEmpFrmData.leaving_date : temp_element.leaving_date;
    temp_state[dynStId] = temp_element;
    setWorkTData(temp_state);
    document.body.classList.remove('modal-open');
    handleOncloseResetform();
    setOpenPopGroup(!openPopGroup)
    const violation = document.getElementById("workExperience");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleWorkExpDelete = (id) => {
    if (workTData.length > 0) {
      const arr = workTData.filter((item, index) => index !== id);
      setWorkTData(arr);
    }
    if (workTData.length == 0) {
      setWorkTData([]);
    }
  }


  const handleWorkExperienceDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {

    })
  }

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader id="" className="header">
          <div>
            <h5 className="m-0 p-0">Work Experience</h5>
          </div>
          <button type="button" className='float-right btn btn-info' onClick={(e) => popUpOpen(e)}>Add</button>
        </CCardHeader>
        <CCardBody>
          <div className="row">
            <CDataTable
              items={workTData}
              fields={[{ key: "name", label: "Name of the Previous Employer" },
              { key: "joining_date", label: "Date Of Joining" }, { key: "leaving_date", label: "Date Of Leaving" }, { key: "role_played", label: "Role Played" }, { key: 'action', label: 'Actions', filter: false }]}
              hover
              striped
              bordered
              // size="sm"
              scopedSlots={{
                action: (items, index) => (
                  <td>
                    <Link
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleEditWorkExpDetails(index)
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
                        handleWorkExpDelete(index)
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
      <CModal show={openPopGroup} onClose={() => setOpenPopGroup(!openPopGroup)} size="xl" color="info" id="workExperience">
        <CModalHeader closeButton>
          <CModalTitle>Add Work Experience</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <CCardBody>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">Name of the Previous Employer <span className='error'>*</span></label>
                    <div className="">
                      <input type="text" name={`name`} className="form-control" placeholder='Name of the Previous Employer' maxLength={20} onChange={handleInput} id="weuname" />
                      <input type="hidden" id="idx" name="idx" value={dynStId} readOnly />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">Role Played <span className='error'>*</span></label>
                    <div className="">
                      <input type="text" name='role_played' className="form-control" placeholder='Role Played' maxLength={20} onChange={handleInput} id="role_played" />
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
                        // isOutsideRange={d => d.isAfter(moment())}
                        isOutsideRange={d => d.isBefore(moment(joiningDate))}
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
                    </div>
                  </div>
                </div>
              </div>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol className='col-md-10' align="center" >
                  {
                    (addOrEdit == 1) ?
                      <CButton type="button" size="md" color="primary" onClick={handleWEUpdate}><CIcon name="cil-scrubber" /> Update</CButton>
                      :
                      <CButton type="button" size="md" color="primary" onClick={handleWESubmit}><CIcon name="cil-scrubber" /> Save</CButton>
                  }
                  <CButton type="reset" onClick={handleOncloseResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default ExistingCareerOnBo3
