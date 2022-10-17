import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import * as constants from "src/actions/types"
import CunAuthLoader from '../loader/CunAuthLoader';
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
import { isLoggedIn, encryptSingleData, indianDateFormat, convertValueLabel } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CandidateDetailsUnauthenticatedAPI, CandidateApplyJob } from '../../actions/onboarding';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';

const UpdateLevel3Info = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { jobUnUserData, resumeUnUserData, error, success, showToast, isLoading } = useSelector(state => state.onboardingBackend);

  const userName = jobUnUserData?.data?.result[0]?.partner_name;
  const userEmail = jobUnUserData?.data?.result[0]?.email_from;

  const [wrkInfoData, setWrkInfoData] = useState([]);

  const [openPopGroup, setOpenPopGroup] = useState(false)
  const [workEmpFrmData, setWorkEmpFrmData] = useState([]);
  const [workTData, setWorkTData] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(0);
  const [dynStId, setDynStId] = useState(0);
  const [selectedExpLtr, setSelectedExpLtr] = useState('');
  const [selectedRelLtr, setSelectedRelLtr] = useState('');
  const [selectedPayLtr, setSelectedPayLtr] = useState('');
  const [expLtrLnk, setExpLtrLnk] = useState('');
  const [relLtrLnk, setRelLtrLnk] = useState('');
  const [payLtrLnk, setPayLtrLnk] = useState('');

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
    document.getElementById("experience_letter").value = "";
    document.getElementById("relieving_letter").value = "";
    document.getElementById("payslip").value = "";
    setExpLtrLnk("");
    setRelLtrLnk("");
    setPayLtrLnk("");
    setOpenPopGroup(!openPopGroup)
    setAddOrEdit(0)
  }

  const handleOncloseResetform = () => {
    document.getElementById("weuname").value = "";
    document.getElementById("role_played").value = "";
    document.getElementById("joining_date").value = "";
    document.getElementById("leaving_date").value = "";
    document.getElementById("experience_letter").value = "";
    document.getElementById("relieving_letter").value = "";
    document.getElementById("payslip").value = "";
    setExpLtrLnk("");
    setRelLtrLnk("");
    setPayLtrLnk("");
    setOpenPopGroup(!openPopGroup)
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
      console.log(workEmpFrmData);
      setWorkTData(marray => [...marray, workEmpFrmData]);
      setWrkInfoData(marray => [...marray, workEmpFrmData])
      // wrkInfoData.push(workEmpFrmData);
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
    setExpLtrLnk(workTData[num].experience_letter);
    setRelLtrLnk(workTData[num].relieving_letter);
    setPayLtrLnk(workTData[num].payslip);
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
    temp_element['experience_letter'] = workEmpFrmData.experience_letter != undefined ? workEmpFrmData.experience_letter : temp_element.experience_letter;
    temp_element['relieving_letter'] = workEmpFrmData.relieving_letter != undefined ? workEmpFrmData.relieving_letter : temp_element.relieving_letter;
    temp_element['payslip'] = workEmpFrmData.payslip != undefined ? workEmpFrmData.payslip : temp_element.payslip;
    temp_state[dynStId] = temp_element;
    setWorkTData([]);
    setWorkTData(temp_state);
    setWrkInfoData([]);
    setWrkInfoData(temp_state);
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
      setWrkInfoData([]);
      setWrkInfoData(arr);
    }
    if (workTData.length == 0) {
      setWorkTData([]);
      setWrkInfoData([]);
    }
  }

  const handleExperienceAttachment = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setWorkEmpFrmData({ ...workEmpFrmData, ['experience_letter']: event.target.result })
      setSelectedExpLtr({
        selectedExpLtr: event.target.result,
      })
    }
  }

  const handleRelievingAttachment = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setWorkEmpFrmData({ ...workEmpFrmData, ['relieving_letter']: event.target.result })
      setSelectedRelLtr({
        selectedRelLtr: event.target.result,
      })
    }
  }

  const handlePayslipAttachment = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setWorkEmpFrmData({ ...workEmpFrmData, ['payslip']: event.target.result })
      setSelectedPayLtr({
        selectedPayLtr: event.target.result,
      })
    }
  }

  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CandidateDetailsUnauthenticatedAPI(atob(props?.match?.params?.id), 7));
    }
  }, [props?.match?.params?.id])

  useEffect(() => {
    if (jobUnUserData?.data?.result[0]?.work_experience_ids.length > 0) {
      setWorkTData(jobUnUserData?.data?.result[0]?.work_experience_ids);
      jobUnUserData?.data?.result[0]?.work_experience_ids.map(function (val, index) {
        delete val.usr_per;
        wrkInfoData.push(val);
      })
    }
  }, [jobUnUserData])


  useEffect(() => {
    if (success == "Job Apply Success") {
      history.push('/careers/job-applied/job-success');
    }

    if (error == "user details error") {
      history.push('/careers/job-applied/job-error');
    }
  }, [success, error])

  //Form Validation
  const UpdateLevel3Data = useFormik({
    initialValues: {
      // resume:'',
    },
    /*validationSchema: Yup.object({
      resume: Yup.string().required('This field is required'),
    }),*/
    onSubmit: (values) => {
      // console.log(wrkInfoData);
      values.work_experience_ids = wrkInfoData;
      const formData = JSON.stringify({ params: { "id": parseInt(atob(props?.match?.params?.id)), data: values, "level": 8 } })
      dispatch(CandidateApplyJob(formData))
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <div className='careerStart-main'>
        {
          (isLoading === true) ? <CunAuthLoader /> :
            <CRow className="justify-content-center w-100" >
              <CCol lg="10">
                <div>
                  <CCard className="p-4 login-card">
                    <CCardBody>
                      <CForm onSubmit={UpdateLevel3Data.handleSubmit} className="form-horizontal">
                        <h1 align="center">Update Job Application</h1>
                        {/* <p className="text-muted">Sign In to your account</p> */}
                        <div className="row form-group">
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Applicant's Name <span className='error'>*</span></label>
                            <input type="text" value={userName} className="form-control" placeholder="Applicant's Name" readOnly />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="hf-email">Email <span className='error'>*</span></label>
                            <input type="text" value={userEmail} className="form-control" placeholder="Email" readOnly />
                          </div>
                        </div>
                        <CCard className="mb-4">
                          <CCardHeader id="headingTwo" className="careerheader">
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
                                        to="#"
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
                                        to="#"
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
                                          // isOutsideRange={d => d.isAfter(moment())}
                                          isOutsideRange={() => false}
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
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <label htmlFor="">Experience Letter <span className='error'>*</span></label>
                                      <div className="">
                                        <input type="file" name='experience_letter' className="form-control" id="experience_letter" onChange={(event) => { handleExperienceAttachment(event) }} />
                                        {(() => {
                                          if (expLtrLnk) {
                                            return (
                                              <div><a href={expLtrLnk} onClick={() => window.open(expLtrLnk)}>Existing File</a></div>
                                            )
                                          }
                                        })()}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <label htmlFor="">Relieving Letter <span className='error'>*</span></label>
                                      <div className="">
                                        <input type="file" name='relieving_letter' className="form-control" id="relieving_letter" onChange={(event) => { handleRelievingAttachment(event) }} />
                                        {(() => {
                                          if (relLtrLnk) {
                                            return (
                                              <div><a href={relLtrLnk} onClick={() => window.open(relLtrLnk)}>Existing File</a></div>
                                            )
                                          }
                                        })()}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <label htmlFor="">Payslip <span className='error'>*</span></label>
                                      <input type="file" name='payslip' className="form-control" id="payslip" onChange={(event) => { handlePayslipAttachment(event) }} />
                                      {(() => {
                                        if (payLtrLnk) {
                                          return (
                                            <div><a href={payLtrLnk} onClick={() => window.open(payLtrLnk)}>Existing File</a></div>
                                          )
                                        }
                                      })()}
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
                                    <CButton type="button" onClick={handleOncloseResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                                  </CCol>
                                </CRow>
                              </CCardFooter>
                            </div>
                          </CModalBody>
                        </CModal>
                        <CRow>
                          <CCol xs="6">
                            <CButton type='submit' color="primary" className="px-4">Update</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </div>
              </CCol>
            </CRow>
        }
      </div>
    </div>
  )
}

export default UpdateLevel3Info
