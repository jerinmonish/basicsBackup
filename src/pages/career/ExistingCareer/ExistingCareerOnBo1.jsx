import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import 'spinkit/spinkit.min.css'
import * as constants from "src/actions/types"
import Swal from 'sweetalert2'
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
import { isLoggedIn, encryptSingleData, indianDateFormat, convertValueLabel, convertDateToMDY } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UnauthenticatedRelationshipListDropdown } from '../../../actions/configuration';
import { CandidateApplyJob } from '../../../actions/onboarding';
import CLoader from 'src/pages/loader/CLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
const ExistingCareerOnBo1 = (props) => {
  const dispatch = useDispatch();
  const { jobUnUserData, resumeUnUserData, success, showToast, isLoading } = useSelector(state => state.onboardingBackend);
  const configurationData = useSelector((state) => state.configurationBackend)
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [famTableData, setFamTableData] = useState([]);
  const [famTData, setFamTData] = useState([]);

  const selectRelationRef = useRef();
  const selectGenderRef = useRef();

  const handleInput = (e) => {
    setFamTableData({ ...famTableData, [e.target.name]: e.target.value })
  }

  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }
  const handleOncloseResetform = () => {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("birthday").value = "";
    selectRelationRef.current.select.clearValue();
    setRelationShipFam(convertValueLabel([]));
    setGenderTable(convertValueLabel([]));
    selectGenderRef.current.select.clearValue();
    setdateOfBirth(null);
    setOpenAddGroup(!openAddGroup)
    document.body.classList.remove('modal-open');
    const violation = document.getElementById("family1");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const [formHeaders, setFormHeaders] = useState('Family Member');
  const popUpOpen = (e) => {
    setAddOrEdit(0)
    document.body.classList.add('modal-open');
    setOpenAddGroup(!openAddGroup)
    const violation = document.getElementById("familyPopUp");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }
  useEffect(() => {
    if (props?.familyData?.length > 0) {
      setFamTData(props?.familyData);
      props?.familyData?.map(function (val, index) {
        delete val.usr_per;
        // wrkInfoData.push(val);
      })
    }
  }, [props?.familyData])

  useEffect(() => {
    dispatch(UnauthenticatedRelationshipListDropdown())
  }, [])


  const [genderOptions, setGenderOptions] = useState([{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'transgender', label: 'Transgender' }]);
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [focusdateOfBirth, setfocusdateOfBirth] = useState(false);
  const [relationShipTable, setRelationShipTable] = useState([])
  const [genderTable, setGenderTable] = useState([])
  const [dobTable, setDobTable] = useState([])
  const [relationShipFam, setRelationShipFam] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(0);
  const [dynStId, setDynStId] = useState(0);


  const handleDateOfBirth = (date) => {
    if (date) {
      setdateOfBirth(date)
      setDobTable(indianDateFormat(date._d));
      setFamTableData({ ...famTableData, ['birthday']: indianDateFormat(date._d) })
    }
  }

  const handleRelationship = (e) => {
    if (e?.value) {
      if (e?.label == "Mother") {
        setGenderTable(convertValueLabel('female', 'Female'));
        setFamTableData({ ...famTableData, ['gender_label']: 'Female', ['gender']: 'female', ['relationship_label']: e?.label, ['relationship_id']: e?.value })
      } else if (e?.label == "Father") {
        setGenderTable(convertValueLabel('male', 'Male',));
        setFamTableData({ ...famTableData, ['gender_label']: 'Male', ['gender']: 'male', ['relationship_label']: e?.label, ['relationship_id']: e?.value })
      } else {
        setGenderTable(convertValueLabel([]));
        setFamTableData({ ...famTableData, ['relationship_label']: e?.label, ['relationship_id']: e?.value })
      }

      setRelationShipTable(e.label);
      // setFamTableData({...famTableData, })
      setRelationShipFam(convertValueLabel(e?.value, e?.label));
    }
  }

  const handleGender = (e) => {
    if (e?.value) {
      setGenderTable(convertValueLabel(e?.value, e?.label));
      setFamTableData({ ...famTableData, ['gender_label']: e?.label, ['gender']: e?.value })
    }
  }

  const handleFamSubmit = () => {
    var tableData = [];
    //console.log(famTableData);
    var vald = '';
    if (famTableData?.name == "" || famTableData?.name == undefined) {
      vald = false;
    } else if (famTableData?.relationship_id == "" || famTableData?.relationship_id == undefined) {
      vald = false;
    } else if (famTableData?.gender == "" || famTableData?.gender == undefined) {
      vald = false;
    } else if (famTableData?.phone == "" || famTableData?.phone == undefined) {
      vald = false;
    } else if (famTableData?.birthday == "" || famTableData?.birthday == undefined) {
      vald = false;
    } else {
      vald = true;
    }


    if (vald == true) {
      console.log(famTData);
      console.log(famTableData);
      setFamTData(marray => [...marray, famTableData]);
      props.alterFamilyData(marray => [...marray, famTableData]);
      handleOncloseResetform();
      setFamTableData([]);
    } else {
      toast.error("Fill all the mandatory fields !", {
        position: toast.POSITION.TOP_RIGHT,
      })
      return false
    }
  }
  const handleEditFamDetails = (num) => {
    setAddOrEdit(1)
    setDynStId(num)
    document.getElementById("name").value = famTData[num].name;
    document.getElementById("phone").value = famTData[num].phone;
    document.getElementById("birthday").value = famTData[num].birthday;
    console.log(famTData[num].birthday);
    famTData[num].birthday ? setdateOfBirth(moment(new Date(convertDateToMDY(famTData[num].birthday)))) : setdateOfBirth(null);
    setRelationShipFam(convertValueLabel(famTData[num].relationship_id, famTData[num].relationship_label));
    setGenderTable(convertValueLabel(famTData[num].gender, famTData[num].gender_label));
    document.body.classList.add('modal-open');
    setOpenAddGroup(!openAddGroup)
    const violation = document.getElementById("familyPopUp");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleFamUpdate = () => {
    let temp_state = [...famTData];
    let temp_element = { ...temp_state[dynStId] };
    temp_element['name'] = famTableData.name != undefined ? famTableData.name : temp_element.name;
    temp_element['relationship_id'] = famTableData.relationship_id != undefined ? famTableData.relationship_id : temp_element.relationship_id;
    temp_element['relationship_label'] = famTableData.relationship_label != undefined ? famTableData.relationship_label : temp_element.relationship_label;
    temp_element['gender'] = famTableData.gender != undefined ? famTableData.gender : temp_element.gender;
    temp_element['gender_label'] = famTableData.gender != undefined ? famTableData.gender_label : temp_element.gender_label;
    temp_element['phone'] = famTableData.phone != undefined ? famTableData.phone : temp_element.phone;
    temp_element['birthday'] = famTableData.birthday != undefined ? famTableData.birthday : temp_element.birthday;
    temp_state[dynStId] = temp_element;
    setFamTData(temp_state);
    props.alterFamilyData(temp_state);
    document.body.classList.remove('modal-open');
    handleOncloseResetform();
    setOpenAddGroup(!openAddGroup)
    const violation = document.getElementById("familyPopUp");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleFamilyDelete = (id) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed == true) {
        if (famTData.length > 0) {
          const arr = famTData.filter((item, index) => index !== id);
          setFamTData(arr);
          props.alterFamilyData(arr);
        }
        if (famTData.length == 0) {
          setFamTData([]);
          props.alterFamilyData([]);
        }
      }
    })
  }

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader id="" className="header">
          <div>
            <h5 className="m-0 p-0">Family Members</h5>
          </div>
          <button type="button" className='float-right btn btn-info' onClick={(e) => popUpOpen(e)}>Add</button>
        </CCardHeader>
        <CCardBody>
          <div className="row">
            <CDataTable
              items={famTData}
              fields={[{ key: "name", label: "Name" }, { key: "relationship_label", label: "Relationship" }, { key: "gender_label", label: "Gender" }, { key: "birthday", label: "Birthday" }, { key: "phone", label: "Phone" }, { key: 'action', label: 'Actions', filter: false }]}
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
                        handleEditFamDetails(index)
                      }}
                      className='btn btn-success btn-sm'
                      to={"#"}
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
                        handleFamilyDelete(index)
                      }}
                      to={"#"}
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
      {/* Group Add Form */}
      <CModal show={openAddGroup} onClose={handleOncloseResetform} size="xl" color="info" id="familyPopUp">
        <CModalHeader closeButton>
          <CModalTitle>{formHeaders}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            // (JobCareerFamilyFormik?.isGALoading === true) ? 'Loading Please Wait...' :
            <div>
              <CCardBody>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Name  <span className='error'>*</span></label>
                      <div className="">
                        <input type="text" value={famTableData.name} id="name" name="name" className="form-control" placeholder='Name' maxLength={50} onChange={handleInput} />
                        <input type="hidden" id="idx" name="idx" value={dynStId} readOnly onChange={handleInput} />
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
                          value={relationShipFam}
                          ref={selectRelationRef}
                          name="relationship_id"
                          options={configurationData?.relationshipListDetails?.data?.result}
                          onChange={(e) => handleRelationship(e)}
                        />
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
                          value={genderTable}
                          ref={selectGenderRef}
                          name="gender"
                          options={genderOptions}
                          onChange={(e) => handleGender(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="">Phone <span className='error'>*</span></label>
                      <div className="">
                        <input type="text" value={famTableData.phone} name="phone" className="form-control" id="phone" placeholder='Phone' maxLength={10} onChange={handleInput} />
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
                        <CButton type="button" size="md" color="primary" onClick={handleFamUpdate}><CIcon name="cil-scrubber" /> Update</CButton>
                        :
                        <CButton type="button" size="md" color="primary" onClick={handleFamSubmit}><CIcon name="cil-scrubber" /> Save</CButton>
                    }
                    <CButton type="reset" onClick={handleOncloseResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </div>
          }
        </CModalBody>
      </CModal>

    </>
  )
}

export default ExistingCareerOnBo1
