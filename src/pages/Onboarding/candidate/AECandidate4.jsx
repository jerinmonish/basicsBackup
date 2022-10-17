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
import { CandidateUpdateAPI } from '../../../actions/onboarding'
import { StudyProgramList, StudyLevelList, AddEducationDetails, DeleteEmployeeEducation, EmployeeEducationDetails, EmployeeEducationUpdate } from 'src/actions/configuration';
import { convertValueLabel, indianDateFormat } from '../../../utils/helper'
import "react-dates/initialize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { SingleDatePicker } from "react-dates";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment';
import * as constants from "src/actions/types"
import { CandidateEditAPI } from '../../../actions/onboarding'
import CLoader from 'src/pages/loader/CLoader';
const AddCandidate4 = (props) => {
  const dispatch = useDispatch();
  const { employeeViewDetails } = useSelector((state) => state.masterBackend);
  const { isLoading } = useSelector((state) => state.onboardingBackend);
  const configurationData = useSelector((state) => state.configurationBackend)
  const [openPopGroup, setOpenPopGroup] = useState(false)
  const [modeOptions, setModeOptions] = useState([{ value: 'regular', label: 'Regular' }, { value: 'private', label: 'Private' }, { value: 'not_applicable', label: 'Not Applicable' }]);
  const [yearOptions, setYearOptions] = useState([]);

  const [studyName, setStudyName] = useState([]);
  const [imgSelected, setImgSelected] = useState([]);

  //update
  const [openPopeducationupdate, setOpenPopEducationUpdate] = useState(false)

  const [studyupdate, setStudyUpdate] = useState([]);

  const [selectedStudyProgram, setSelectedStudyProgram] = useState([])

  const [selectedMode, setSelectedMode] = useState([])

  const [selectedYear, setSelectedYear] = useState([])

  const [selectedImageUpdate, setSelectedImageUpdate] = useState()

  const [studyLevelTable, setStudyLevelTable] = useState([])
  const [programTable, setProgramTable] = useState([])


  const generateYearOptions = () => {
    const arr = [];
    const startYear = 1900;
    const endYear = new Date().getFullYear();
    for (let i = endYear; i >= startYear; i--) {
      arr.push({ value: i, label: i });
    }
    return arr;
  };

  useEffect(() => {
    const queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
      },
    }
    dispatch(StudyLevelList(queryparams));
  }, [openPopGroup, openPopeducationupdate]);

  useEffect(() => {
    //To Show Success Message
    if (configurationData?.showToast) {

      let sMsg = ''
      if (configurationData?.success === 'education add success') {
        sMsg = 'Education Details Successfully Saved !'
        setOpenPopGroup(!openPopGroup)
      } else if (configurationData?.success === 'education update success') {
        sMsg = 'Education Details Updated !'
        setOpenPopEducationUpdate(!openPopeducationupdate)
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
  }, [configurationData?.success, configurationData?.showToast]);


  const AddCandidate4Formik = useFormik({
    initialValues: {
      attachment: '',
      study_level_id: '',
      program_id: '',
      mode: '',
      institution: '',
      board_or_university: '',
      year_of_passing: '',
      result: '',
      note: '',
      hr_applicant_id: ''
    },
    validationSchema: Yup.object().shape({
      study_level_id: Yup.string().required('This field is required'),
      program_id: Yup.string().required('This field is required'),
      mode: Yup.string().required('This field is required'),
      /*institution: Yup.string().required('This field is required'),
      board_or_university: Yup.string().required('This field is required'),
      year_of_passing: Yup.string().required('This field is required'),*/
      result: Yup.number().required('This field is required'),
    }),
    onSubmit: (values) => {

      const formData = JSON.stringify({ params: { data: values } })
      // console.log(formData);
      dispatch(AddEducationDetails(formData))
    },
  });


  useEffect(() => {
    if (configurationData?.educatId?.data && configurationData?.success === 'education add success') {
      props?.dataEdit?.data?.education_ids.push({
        "study_level_id_name": studyLevelTable,
        "program_id_name": programTable,
        "institution": AddCandidate4Formik?.values.institution,
        "year_of_passing_label": AddCandidate4Formik?.values.year_of_passing,
        "id": configurationData?.educatId?.data
      });
      AddCandidate4Formik.resetForm();
    }

  }, [configurationData?.educatId?.data, props?.dataEdit?.data?.education_ids, configurationData?.success])

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
      dispatch(StudyProgramList(queryparams));
      onLevelChangeClear();
      AddCandidate4Formik.setFieldValue('study_level_id', e?.value);
      AddCandidate4Formik.setFieldValue('hr_applicant_id', props.dataId);
      setStudyLevelTable(e?.label);
    }
  }

  const handleProgramStudyChange = (e) => {
    if (e?.value) {
      setSelectedStudyProgram(convertValueLabel(e.value, e.label));
      AddCandidate4Formik.setFieldValue('program_id', e?.value);
      setProgramTable(e?.label);
    }
  }

  const handleModeOnChange = (e) => {
    if (e?.value) {
      AddCandidate4Formik.setFieldValue('mode', e?.value);
    }
  }

  const handleYearOnChange = (e) => {
    if (e?.value) {
      AddCandidate4Formik.setFieldValue('year_of_passing', `${e?.value}`);
    }
  }

  const handleAttachment = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: AddCandidate4Formik.setFieldValue("attachment", event.target.result),
      })
    }
  }


  // delete
  const handleEmployeeEducationDelete = (gid) => {
    // console.log("gid",gid);
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(DeleteEmployeeEducation(gid))
      }

    })
  }

  const getdataconfig = useSelector((state) => state.configurationBackend)

  //update
  //Method to get edit values




  const handleEmployeeEducationDetails = (gid) => {
    dispatch(EmployeeEducationDetails(gid));
    setOpenPopEducationUpdate(!openPopeducationupdate)
  }

  const [getlevel, setGetlevel] = useState([]);
  // console.log('log', getdataconfig?.EmployeeEducationDetails);
  // console.log("form4", configurationData?.studylevelListDetails?.data?.result);
  // [0].name

  // console.log("val", getlevel);
  // 
  // if (configurationData?.studylevelListDetails?.data?.result =!undefined) {

  // }

  useEffect(() => {
    if (configurationData?.EmployeeEducationDetails !== null) {

      // console.log("form4", configurationData?.studylevelListDetails?.data);
      AddCandidate4UpdateFormik.setValues({
        "hr_applicant_id": props.dataId,
        "id": configurationData?.EmployeeEducationDetails?.id,
        // "attachment":configurationData?.EmployeeEducationDetails?.attachment,
        "study_level_id": configurationData?.EmployeeEducationDetails?.study_level_id,
        "program_id": configurationData?.EmployeeEducationDetails?.program_id,
        "mode": configurationData?.EmployeeEducationDetails?.mode,
        "institution": configurationData?.EmployeeEducationDetails?.institution,
        "board_or_university": configurationData?.EmployeeEducationDetails?.board_or_university,
        "year_of_passing": configurationData?.EmployeeEducationDetails?.year_of_passing,
        "result": configurationData?.EmployeeEducationDetails?.result,
        "note": configurationData?.EmployeeEducationDetails?.note,

      });

      if (configurationData?.EmployeeEducationDetails?.study_level_id) {
        setStudyUpdate(convertValueLabel(configurationData?.EmployeeEducationDetails?.study_level_id, configurationData?.EmployeeEducationDetails?.study_level_id_name));

      }
      if (configurationData?.EmployeeEducationDetails?.program_id) {
        setSelectedStudyProgram(convertValueLabel(configurationData?.EmployeeEducationDetails?.program_id, configurationData?.EmployeeEducationDetails?.program_id_name));

      }

      if (configurationData?.EmployeeEducationDetails?.mode) {
        setSelectedMode(convertValueLabel(configurationData?.EmployeeEducationDetails?.mode, configurationData?.EmployeeEducationDetails?.mode_label));

      }

      if (configurationData?.EmployeeEducationDetails?.year_of_passing) {
        setSelectedYear(convertValueLabel(configurationData?.EmployeeEducationDetails?.year_of_passing, configurationData?.EmployeeEducationDetails?.year_of_passing));

      }

      const queryparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: "[['study_level_id', '=', " + configurationData?.EmployeeEducationDetails?.study_level_id + "]]",
        },
      }
      dispatch(StudyProgramList(queryparams));
    }
  }, [configurationData?.EmployeeEducationDetails, openPopGroup, openPopeducationupdate]);

  const AddCandidate4UpdateFormik = useFormik({
    initialValues: {
      attachment: '',
      study_level_id: '',
      program_id: '',
      mode: '',
      institution: '',
      board_or_university: '',
      year_of_passing: '',
      result: '',
      note: '',
      hr_applicant_id: ''
    },
    validationSchema: Yup.object().shape({
      study_level_id: Yup.string().required('This field is required'),
      program_id: Yup.string().required('This field is required'),
      mode: Yup.string().required('This field is required'),
      institution: Yup.string().required('This field is required'),
      board_or_university: Yup.string().required('This field is required'),
      year_of_passing: Yup.string().required('This field is required'),
      // result:Yup..required('This field is required'),

    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(EmployeeEducationUpdate(formData))
    },
  });

  const handleLevelChangeUpdate = (e) => {
    if (e?.value) {
      const queryparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: "[['study_level_id', '=', " + e?.value + "]]",
        },
      }
      dispatch(StudyProgramList(queryparams));
      onLevelChangeClear();
      AddCandidate4UpdateFormik.setFieldValue('study_level_id', e?.value);
      setStudyUpdate(convertValueLabel(e.value, e.label));
      AddCandidate4UpdateFormik.setFieldValue('hr_applicant_id', props.dataId);
      setStudyLevelTable(e?.label);
      setSelectedStudyProgram([]);
    }
  }

  const handleProgramStudyChangeUpdate = (e) => {
    if (e?.value) {
      setSelectedStudyProgram(convertValueLabel(e.value, e.label));
      AddCandidate4UpdateFormik.setFieldValue('program_id', e?.value);
      setProgramTable(e?.label);
    }
  }

  const handleModeOnChangeUpdate = (e) => {
    if (e?.value) {
      setSelectedMode(convertValueLabel(e.value, e.label));
      AddCandidate4UpdateFormik.setFieldValue('mode', e?.value);
    }
  }

  const handleYearOnChangeUpdate = (e) => {
    if (e?.value) {
      setSelectedYear(convertValueLabel(e.value, e.label));
      AddCandidate4UpdateFormik.setFieldValue('year_of_passing', `${e?.value}`);
    }
  }

  const handleAttachmentUpdate = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: AddCandidate4UpdateFormik.setFieldValue("attachment", event.target.result),
      })
    }
  }
  const handleimageFile = (e) => {
    window.open(configurationData?.EmployeeEducationDetails?.attachment)
  }

  useEffect(() => {
    if (configurationData?.isEmployeeEducationDeleted) {
      dispatch(CandidateEditAPI(props.dataId));
    }
  }, [configurationData?.isEmployeeEducationDeleted])
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
                        <h5 className="m-0 p-0">Education </h5>
                      </div>
                      <div className=''>
                        <CButton className={'float-right'} color="primary" onClick={() => setOpenPopGroup(!openPopGroup)}>Add</CButton>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row">
                        <CDataTable
                          items={props?.dataEdit?.data?.education_ids}
                          fields={[{ key: "study_level_id_name", label: "Study Level" }, { key: "program_id_name", label: "Program" }, { key: "institution", label: "Institution" }, { key: "year_of_passing_label", label: "Year Of Passing" }, { key: 'action', label: 'Actions', filter: false }]}
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
                                    handleEmployeeEducationDetails(items.id)
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
                                    handleEmployeeEducationDelete(items.id)
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
                  <CModal show={openPopGroup} onClose={() => setOpenPopGroup(!openPopGroup)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Add Education</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isEmpEduLoading === true) ? 'Loading Please Wait...' :
                          <CForm onSubmit={AddCandidate4Formik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Attachment</label>
                                    <div className="">
                                      <input type="file" name={`attachment`} className="" placeholder='Attachment' onBlur={AddCandidate4Formik.handleBlur} onChange={(event) => { handleAttachment(event) }} />
                                      {AddCandidate4Formik.errors.attachment ? <div className="help-block text-danger">{AddCandidate4Formik.errors.attachment}</div> : null}
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
                                        // value={bloodgroup}
                                        name="study_level_id"
                                        options={configurationData?.studylevelListDetails?.data?.result}
                                        onChange={(e) => handleLevelChange(e)}
                                        onBlur={AddCandidate4Formik.handleBlur}
                                      />
                                      {AddCandidate4Formik.errors.study_level_id ? <div className="help-block text-danger">{AddCandidate4Formik.errors.study_level_id}</div> : null}
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
                                        options={configurationData?.studyProgramListDetails?.data?.result}
                                        onChange={(e) => handleProgramStudyChange(e)}
                                        onBlur={AddCandidate4Formik.handleBlur}
                                      />
                                      {AddCandidate4Formik.errors.program_id ? <div className="help-block text-danger">{AddCandidate4Formik.errors.program_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Mode <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Mode'}
                                        // value={bloodgroup}
                                        name="mode"
                                        options={modeOptions}
                                        onChange={(e) => handleModeOnChange(e)}
                                        onBlur={AddCandidate4Formik.handleBlur}
                                      />
                                      {AddCandidate4Formik.errors.mode ? <div className="help-block text-danger">{AddCandidate4Formik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Place and Institute</label>
                                    <div className="">
                                      <input type="text" name={`institution`} className="form-control" placeholder='Place and Institute' maxLength={20} onChange={AddCandidate4Formik.handleChange} onBlur={AddCandidate4Formik.handleBlur} value={AddCandidate4Formik.values.institution} />
                                      {AddCandidate4Formik.errors.institution ? <div className="help-block text-danger">{AddCandidate4Formik.errors.institution}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Board / University</label>
                                    <div className="">
                                      <input type="text" name={`board_or_university`} className="form-control" placeholder='Board / University' maxLength={20} onChange={AddCandidate4Formik.handleChange} onBlur={AddCandidate4Formik.handleBlur} value={AddCandidate4Formik.values.board_or_university} />
                                      {AddCandidate4Formik.errors.board_or_university ? <div className="help-block text-danger">{AddCandidate4Formik.errors.board_or_university}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Year Of Passing <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Year Of Passing'}
                                        name="year_of_passing"
                                        options={generateYearOptions()}
                                        onChange={(e) => handleYearOnChange(e)}
                                        onBlur={AddCandidate4Formik.handleBlur}
                                      />
                                      {AddCandidate4Formik.errors.mode ? <div className="help-block text-danger">{AddCandidate4Formik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Result (in %) <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`result`} className="form-control" placeholder='Result (in %)' maxLength={5} onChange={AddCandidate4Formik.handleChange} onBlur={AddCandidate4Formik.handleBlur} value={AddCandidate4Formik.values.result} />
                                      {AddCandidate4Formik.errors.result ? <div className="help-block text-danger">{AddCandidate4Formik.errors.result}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='row'>
                                <div className="col-lg-8">
                                  <div className="form-group">
                                    <label htmlFor="">Remarks</label>
                                    <div className="">
                                      <textarea type="text" name={`note`} className="form-control" placeholder='Remarks' maxLength={500} onChange={AddCandidate4Formik.handleChange} onBlur={AddCandidate4Formik.handleBlur} value={AddCandidate4Formik.values.note} rows='4' cols='8' />
                                      {AddCandidate4Formik.errors.note ? <div className="help-block text-danger">{AddCandidate4Formik.errors.note}</div> : null}
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

                  {/* education update Form */}
                  <CModal show={openPopeducationupdate} onClose={() => setOpenPopEducationUpdate(!openPopeducationupdate)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Update Education</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isEmpEduLoading === true) ? 'Loading Please Wait...' :
                          <CForm onSubmit={AddCandidate4UpdateFormik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">

                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Level <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Level'}
                                        value={studyupdate}
                                        name="study_level_id"
                                        // options={ }
                                        options={getlevel}
                                        onChange={(e) => handleLevelChangeUpdate(e)}
                                        onBlur={AddCandidate4UpdateFormik.handleBlur}
                                      />
                                      {AddCandidate4UpdateFormik.errors.study_level_id ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.study_level_id}</div> : null}
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
                                        value={selectedStudyProgram}
                                        name="program_id"
                                        options={configurationData?.studyProgramListDetails?.data?.result}
                                        onChange={(e) => handleProgramStudyChangeUpdate(e)}
                                        onBlur={AddCandidate4UpdateFormik.handleBlur}
                                      />
                                      {AddCandidate4UpdateFormik.errors.program_id ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.program_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Mode <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Program of Study'}
                                        value={selectedMode}
                                        name="mode"
                                        options={modeOptions}
                                        onChange={(e) => handleModeOnChangeUpdate(e)}
                                        onBlur={AddCandidate4UpdateFormik.handleBlur}
                                      />
                                      {AddCandidate4UpdateFormik.errors.mode ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Place and Institute</label>
                                    <div className="">
                                      <input type="text" name={`institution`} className="form-control" placeholder='Place and Institute' maxLength={20}
                                        onChange={AddCandidate4UpdateFormik.handleChange}
                                        onBlur={AddCandidate4UpdateFormik.handleBlur}
                                        value={AddCandidate4UpdateFormik.values.institution} />
                                      {AddCandidate4UpdateFormik.errors.institution ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.institution}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Board / University</label>
                                    <div className="">
                                      <input type="text" name={`board_or_university`} className="form-control" placeholder='Place and Institute' maxLength={20} onChange={AddCandidate4UpdateFormik.handleChange} onBlur={AddCandidate4UpdateFormik.handleBlur} value={AddCandidate4UpdateFormik.values.board_or_university} />
                                      {AddCandidate4UpdateFormik.errors.board_or_university ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.board_or_university}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Year Of Passing <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Year Of Passing'}
                                        name="year_of_passing"
                                        value={selectedYear}
                                        options={generateYearOptions()}
                                        onChange={(e) => handleYearOnChangeUpdate(e)}
                                        onBlur={AddCandidate4UpdateFormik.handleBlur}
                                      />
                                      {AddCandidate4UpdateFormik.errors.mode ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Result (in %) <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`result`} className="form-control" placeholder='Result (in %)' maxLength={5} onChange={AddCandidate4UpdateFormik.handleChange} onBlur={AddCandidate4UpdateFormik.handleBlur} value={AddCandidate4UpdateFormik.values.result} />
                                      {AddCandidate4UpdateFormik.errors.result ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.result}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Attachment</label>
                                    <div className="">
                                      <input type="file" name="attachment" className="" placeholder='Attachment' onBlur={AddCandidate4UpdateFormik.handleBlur} accept="image/png, image/jpeg, image/jpg"
                                        onChange={(event) => { handleAttachmentUpdate(event) }} />
                                      {AddCandidate4UpdateFormik.errors.attachment ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.attachment}</div> : null}
                                    </div>
                                    <div className='mt-2'>
                                      <a href='#' className='mt-4' onClick={(e) => { handleimageFile(e) }}>View Existing Attachment</a>
                                    </div>

                                  </div>


                                </div>

                                {/* <div className='col-md-0'>
                                    {
                                    selectedImageUpdate == undefined ? <img src={selectedImageUpdate} hidden height={60} width={60} /> : 
                                    <img  src={selectedImageUpdate} height={60} width={60}/>
                                  }
                                  </div> */}
                              </div>
                              <div className='row'>
                                <div className="col-lg-8">
                                  <div className="form-group">
                                    <label htmlFor="">Remarks</label>
                                    <div className="">
                                      <textarea type="text" name={`note`} className="form-control" placeholder='Remarks' maxLength={500} onChange={AddCandidate4UpdateFormik.handleChange} onBlur={AddCandidate4UpdateFormik.handleBlur} value={AddCandidate4UpdateFormik.values.note} rows='4' cols='8' />
                                      {AddCandidate4UpdateFormik.errors.note ? <div className="help-block text-danger">{AddCandidate4UpdateFormik.errors.note}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CCardBody>
                            <CCardFooter>
                              <CRow>
                                <CCol className='col-md-10' align="center" >
                                  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                                  <CButton type="reset" onClick={() => setOpenPopEducationUpdate(!openPopeducationupdate)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
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
export default AddCandidate4
