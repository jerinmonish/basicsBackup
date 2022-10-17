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
import { isLoggedIn, encryptSingleData, indianDateFormat, convertValueLabel } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CLoader from 'src/pages/loader/CLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { SingleDatePicker } from "react-dates";
import moment from 'moment';
import { StudyProgramUAList, StudyLevelUAList } from 'src/actions/configuration';
const ExistingCareerOnBo2 = (props) => {
  const dispatch = useDispatch();
  const configurationData = useSelector((state) => state.configurationBackend)
  const [openPopGroup, setOpenPopGroup] = useState(false)
  const [modeOptions, setModeOptions] = useState([{ value: 'regular', label: 'Regular' }, { value: 'private', label: 'Private' }, { value: 'not_applicable', label: 'Not Applicable' }]);
  const [yearOptions, setYearOptions] = useState([]);
  const [studyName, setStudyName] = useState([]);
  const [imgSelected, setImgSelected] = useState([]);
  const [educationFrmData, setEducationFrmData] = useState([]);
  const [educationTData, setEducationTData] = useState([]);
  const [addOrEdit, setAddOrEdit] = useState(0);
  const [dynStId, setDynStId] = useState(0);

  const [levelPData, setLevelPData] = useState([]);
  const [programPData, setProgramPData] = useState([]);
  const [modePData, setModePData] = useState([]);
  const [yopPData, setYopPData] = useState([]);

  const handleInput = (e) => {
    setEducationFrmData({ ...educationFrmData, [e.target.name]: e.target.value })
  }


  const selectLevelRef = useRef();
  const selectModeRef = useRef();
  const selectYopRef = useRef();

  const generateYearOptions = () => {
    const arr = [];
    const startYear = 1900;
    const endYear = new Date().getFullYear();
    for (let i = endYear; i >= startYear; i--) {
      arr.push({ value: i, label: i });
    }
    return arr;
  };

  const popUpOpen = (e) => {
    document.body.classList.add('modal-open');
    setOpenPopGroup(!openPopGroup)
    const violation = document.getElementById("educationAdd");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    if (props?.educationData?.length > 0) {
      setEducationTData(props?.educationData);
      props?.educationData?.map(function (val, index) {
        delete val.usr_per;
        // wrkInfoData.push(val);
      })
    }
  }, [props?.educationData])

  const handleOncloseResetform = () => {
    document.getElementById("attachment").value = "";
    document.getElementById("institution").value = "";
    document.getElementById("board_or_university").value = "";
    document.getElementById("result").value = "";
    document.getElementById("note").value = "";
    setLevelPData(convertValueLabel());
    setProgramPData(convertValueLabel());
    setModePData(convertValueLabel());
    setYopPData(convertValueLabel());
    setStudyName(convertValueLabel());
    selectLevelRef.current.select.clearValue();
    selectProgramStudyRef.current.select.clearValue();
    selectModeRef.current.select.clearValue();
    selectYopRef.current.select.clearValue();
    setOpenPopGroup(!openPopGroup)
    document.body.classList.remove('modal-open');
    const violation = document.getElementById("educationAdd");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleResetform = () => {
    setOpenPopGroup(!openPopGroup)
  }

  useEffect(() => {
    const queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
      },
    }
    dispatch(StudyLevelUAList(queryparams));
  }, [openPopGroup]);


  const selectProgramStudyRef = useRef()
  const onLevelChangeClear = () => {
    selectProgramStudyRef.current.select.clearValue()
    setStudyName(convertValueLabel([]))
  }
  const handleLevelChange = (e) => {
    if (e?.value) {
      const queryparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: "[['study_level_id', '=', " + e?.value + "]]",
        },
      }
      dispatch(StudyProgramUAList(queryparams));
      onLevelChangeClear();
      setEducationFrmData({ ...educationFrmData, ['study_level_id_label']: e?.label, ['study_level_id']: e?.value })
      setLevelPData(convertValueLabel(e.value, e.label));
    }
  }

  const handleProgramStudyChange = (e) => {
    if (e?.value) {
      // setSelectedStudyProgram(convertValueLabel(e.value, e.label));
      setStudyName(convertValueLabel(e.value, e.label));
      setEducationFrmData({ ...educationFrmData, ['program_id_label']: e?.label, ['program_id']: e?.value })
    }
  }

  const handleModeOnChange = (e) => {
    if (e?.value) {
      setEducationFrmData({ ...educationFrmData, ['mode_label']: e?.label, ['mode']: e?.value })
      setModePData(convertValueLabel(e.value, e.label));
    }
  }

  const handleYearOnChange = (e) => {
    if (e?.value) {
      setEducationFrmData({ ...educationFrmData, ['year_of_passing_label']: e?.label, ['year_of_passing']: e?.value.toString() })
      setYopPData(convertValueLabel(e.value, e.label));
    }
  }

  const handleAttachment = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setEducationFrmData({ ...educationFrmData, ['attachment']: event.target.result })
      setImgSelected({
        selectedImage: event.target.result,
      })
    }
  }


  const handleimageFile = (e) => {
    window.open(configurationData?.EmployeeEducationDetails?.attachment)
  }

  const handleEduSubmit = () => {
    var tableData = [];

    var vald = '';
    if (educationFrmData?.study_level_id == "" || educationFrmData?.study_level_id == undefined) {
      vald = false;
    } else if (educationFrmData?.program_id == "" || educationFrmData?.program_id == undefined) {
      vald = false;
    } else if (educationFrmData?.mode == "" || educationFrmData?.mode == undefined) {
      vald = false;
    } /*else if(educationFrmData?.institution == "" || educationFrmData?.institution == undefined){
      vald = false;
    } else if(educationFrmData?.board_or_university == "" || educationFrmData?.board_or_university == undefined){
      vald = false;
    }*/ else if (educationFrmData?.year_of_passing == "" || educationFrmData?.year_of_passing == undefined) {
      vald = false;
    } else if (educationFrmData?.result == "" || educationFrmData?.result == undefined) {
      vald = false;
    }/* else if(educationFrmData?.result?.length > 0){
      let regex = /^[-+]?[0-9]+\.[0-9]+$/;
      if((regex.test(educationFrmData?.result)) == false){
        toast.error("Percentage cannnot be in Text", {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    } else if(educationFrmData?.note == "" || educationFrmData?.note == undefined){
      vald = false;
    }*/ else {
      vald = true;
    }
    if (vald == true) {
      setEducationTData(marray => [...marray, educationFrmData]);
      // props.educationData.push(educationFrmData);
      props.alterEducationData(marray => [...marray, educationFrmData]);
      handleOncloseResetform();
      setEducationFrmData([]);
    } else {
      toast.error("Fill all the mandatory fields", {
        position: toast.POSITION.TOP_RIGHT,
      })
      return false
    }
  }

  const handleEducationDetails = (num) => {
    setAddOrEdit(1)
    setDynStId(num)
    setLevelPData(convertValueLabel(educationTData[num].study_level_id, educationTData[num].study_level_id_label));
    setStudyName(convertValueLabel(educationTData[num].program_id, educationTData[num].program_id_label));
    setModePData(convertValueLabel(educationTData[num].mode, educationTData[num].mode_label));
    document.getElementById("institution").value = educationTData[num].institution;
    document.getElementById("board_or_university").value = educationTData[num].board_or_university;
    setYopPData(convertValueLabel(educationTData[num].year_of_passing, educationTData[num].year_of_passing));
    document.getElementById("result").value = educationTData[num].result;
    document.getElementById("note").value = educationTData[num].note;
    document.body.classList.add('modal-open');
    setOpenPopGroup(!openPopGroup)
    // console.log(educationTData[num]);
    const queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
        filter: "[['study_level_id', '=', " + educationTData[num].study_level_id + "]]",
      },
    }
    dispatch(StudyProgramUAList(queryparams));
    const violation = document.getElementById("educationAdd");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
    setImgSelected({
      selectedImage: educationTData[num].attachment,
    })
  }

  const handleEduUpdate = () => {
    let temp_state = [...educationTData];
    let temp_element = { ...temp_state[dynStId] };
    temp_element['study_level_id'] = educationFrmData.study_level_id != undefined ? educationFrmData.study_level_id : temp_element.study_level_id;
    temp_element['study_level_id_label'] = educationFrmData.study_level_id_label != undefined ? educationFrmData.study_level_id_label : temp_element.study_level_id_label;
    temp_element['program_id'] = educationFrmData.program_id != undefined ? educationFrmData.program_id : temp_element.program_id;
    temp_element['program_id_label'] = educationFrmData.program_id_label != undefined ? educationFrmData.program_id_label : temp_element.program_id_label;
    temp_element['mode'] = educationFrmData.mode != undefined ? educationFrmData.mode : temp_element.mode;
    temp_element['mode_label'] = educationFrmData.mode != undefined ? educationFrmData.mode_label : temp_element.mode_label;
    temp_element['institution'] = educationFrmData.institution != undefined ? educationFrmData.institution : temp_element.institution;
    temp_element['board_or_university'] = educationFrmData.board_or_university != undefined ? educationFrmData.board_or_university : temp_element.board_or_university;
    temp_element['year_of_passing'] = educationFrmData.year_of_passing != undefined ? educationFrmData.year_of_passing : temp_element.year_of_passing;
    temp_element['year_of_passing_label'] = educationFrmData.year_of_passing_label != undefined ? educationFrmData.year_of_passing_label : temp_element.year_of_passing_label;
    temp_element['result'] = educationFrmData.result != undefined ? educationFrmData.result : temp_element.result;
    temp_element['note'] = educationFrmData.note != undefined ? educationFrmData.note : temp_element.note;
    temp_state[dynStId] = temp_element;

    setEducationTData([]);
    setEducationTData(temp_state);
    props.alterEducationData(temp_state);
    document.body.classList.remove('modal-open');
    handleOncloseResetform();
    setOpenPopGroup(!openPopGroup)
    const violation = document.getElementById("educationAdd");
    window.scrollTo({
      top: violation.offsetTop,
      behavior: "smooth"
    });
  }

  const handleEducationDelete = (id) => {

    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed == true) {
        if (educationTData.length > 0) {
          const arr = educationTData.filter((item, index) => index !== id);
          setEducationTData(arr);
          props.alterEducationData(arr);
        }
        if (educationTData.length == 0) {
          setEducationTData([]);
          props.alterEducationData([]);
        }
      }
    })
  }

  return (
    <>
      <div className="form-horizontal">
        <div>
          <CCard className="mb-4">
            <CCardHeader id="" className="header">
              <div>
                <h5 className="m-0 p-0">Education </h5>
              </div>
              <div className=''>
                <button type="button" className='float-right btn btn-info' onClick={(e) => popUpOpen(e)}>Add</button>
              </div>
            </CCardHeader>
            <CCardBody>
              <div className="row">
                <CDataTable
                  items={educationTData}
                  fields={[{ key: "study_level_id_label", label: "Study Level" }, { key: "program_id_label", label: "Program" }, { key: "institution", label: "Institution" }, { key: "year_of_passing_label", label: "Year Of Passing" }, { key: 'action', label: 'Actions', filter: false }]}
                  hover
                  striped
                  bordered
                  // size="sm"
                  scopedSlots={{
                    action: (items, index) => (
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
                            handleEducationDetails(index)
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
                            handleEducationDelete(index)
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
          {/* Group Add Form */}
          <CModal show={openPopGroup} onClose={handleOncloseResetform} size="xl" color="info" id="educationAdd">
            <CModalHeader closeButton>
              <CModalTitle>Add Education</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div>
                <CCardBody>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Attachment</label>
                        <div className="">
                          <input type="file" name={`attachment`} className="" placeholder='Attachment' onChange={(event) => { handleAttachment(event) }} id="attachment" />
                          <input type="hidden" id="idx" name="idx" value={dynStId} readOnly />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Level <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Level'}
                            value={levelPData}
                            name="study_level_id"
                            options={configurationData?.studylevelUAListDetails?.data?.result}
                            onChange={(e) => handleLevelChange(e)}
                            id="study_level_id"
                            ref={selectLevelRef}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Program of Study <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            ref={selectProgramStudyRef}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Program of Study'}
                            value={studyName}
                            name="program_id"
                            options={configurationData?.studyProgramUAListDetails?.data?.result}
                            onChange={(e) => handleProgramStudyChange(e)}
                            id="program_id"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Mode <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            className="basic-single"
                            ref={selectModeRef}
                            classNamePrefix="select"
                            placeholder={'Choose a Mode'}
                            value={modePData}
                            name="mode"
                            options={modeOptions}
                            onChange={(e) => handleModeOnChange(e)}
                            id="mode"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Place and Institute</label>
                        <div className="">
                          <input type="text" name={`institution`} className="form-control" placeholder='Place and Institute' maxLength={50} id="institution" onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Board / University</label>
                        <div className="">
                          <input type="text" name={`board_or_university`} className="form-control" placeholder='Board / University' maxLength={30} id="board_or_university" onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Year Of Passing <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            className="basic-single"
                            ref={selectYopRef}
                            classNamePrefix="select"
                            placeholder={'Choose a Year Of Passing'}
                            name="year_of_passing"
                            value={yopPData}
                            options={generateYearOptions()}
                            onChange={(e) => handleYearOnChange(e)}
                            id="year_of_passing"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Result (in %) <span className='error'>*</span></label>
                        <div className="">
                          <input type="number" name={`result`} className="form-control" placeholder='Result (in %)' maxLength={5} id="result" onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-lg-8">
                      <div className="form-group">
                        <label htmlFor="">Remarks</label>
                        <div className="">
                          <textarea type="text" name={`note`} className="form-control" placeholder='Remarks' maxLength={500} rows='4' cols='8' id="note" onChange={handleInput} />
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
                          <CButton type="button" size="md" color="primary" onClick={handleEduUpdate}><CIcon name="cil-scrubber" /> Update</CButton>
                          :
                          <CButton type="button" size="md" color="primary" onClick={handleEduSubmit}><CIcon name="cil-scrubber" /> Save</CButton>
                      }
                      <CButton type="reset" onClick={handleOncloseResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </div>
            </CModalBody>
          </CModal>
        </div>
      </div>
    </>
  )
}

export default ExistingCareerOnBo2
