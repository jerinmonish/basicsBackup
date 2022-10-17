import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CForm,
  CCardFooter,
  CCol,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CDataTable,
  CInputRadio,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { StudyProgramList, StudyLevelList, AddEducationDetails, DeleteEmployeeEducation, EmployeeEducationDetails, EmployeeEducationUpdate } from 'src/actions/configuration';
import { convertValueLabel } from '../../utils/helper'
import "react-dates/initialize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css'
import { ViewEmployeeByIdAPI } from 'src/actions/master';
import CLoader from 'src/pages/loader/CLoader';
const EduBasicTab = (props) => {
  const dispatch = useDispatch();
  const { employeeViewDetails, isLoading } = useSelector((state) => state.masterBackend);
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
        dispatch(ViewEmployeeByIdAPI(props.dataId));
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


  const EduBasicTabFormik = useFormik({
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
      employee_id: ''
    },
    validationSchema: Yup.object().shape({
      study_level_id: Yup.string().required('This field is required'),
      program_id: Yup.string().required('This field is required'),
      mode: Yup.string().required('This field is required'),
      institution: Yup.string().required('This field is required'),
      board_or_university: Yup.string().required('This field is required'),
      year_of_passing: Yup.string().required('This field is required'),
      result: Yup.number().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(AddEducationDetails(formData))
    },
  });


  useEffect(() => {
    if (configurationData?.educatId?.data && configurationData?.success === 'education add success') {
      props?.dataEdit?.data?.education_ids.push({
        "study_level_id_name": studyLevelTable,
        "program_id_name": programTable,
        "institution": EduBasicTabFormik?.values.institution,
        "year_of_passing_label": EduBasicTabFormik?.values.year_of_passing,
        "id": configurationData?.educatId?.data
      });
      EduBasicTabFormik.resetForm();
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
      EduBasicTabFormik.setFieldValue('study_level_id', e?.value);
      EduBasicTabFormik.setFieldValue('employee_id', props.dataId);
      setStudyLevelTable(e?.label);
    }
  }

  const handleProgramStudyChange = (e) => {
    if (e?.value) {
      setSelectedStudyProgram(convertValueLabel(e.value, e.label));
      EduBasicTabFormik.setFieldValue('program_id', e?.value);
      setProgramTable(e?.label);
    }
  }

  const handleModeOnChange = (e) => {
    if (e?.value) {
      EduBasicTabFormik.setFieldValue('mode', e?.value);
    }
  }

  const handleYearOnChange = (e) => {
    if (e?.value) {
      EduBasicTabFormik.setFieldValue('year_of_passing', `${e?.value}`);
    }
  }

  const handleAttachment = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: EduBasicTabFormik.setFieldValue("attachment", event.target.result),
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

  //update
  //Method to get edit values
  const handleEmployeeEducationDetails = (gid) => {
    dispatch(EmployeeEducationDetails(gid));
    setOpenPopEducationUpdate(!openPopeducationupdate)
  }



  useEffect(() => {
    if (configurationData?.EmployeeEducationDetails !== null) {
      EduBasicTabUpdateFormik.setValues({
        "employee_id": props.dataId,
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

  const EduBasicTabUpdateFormik = useFormik({
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
      employee_id: ''
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
      EduBasicTabUpdateFormik.setFieldValue('study_level_id', e?.value);
      setStudyUpdate(convertValueLabel(e.value, e.label));
      EduBasicTabUpdateFormik.setFieldValue('employee_id', props.dataId);
      setStudyLevelTable(e?.label);
      setSelectedStudyProgram([]);
    }
  }

  const handleProgramStudyChangeUpdate = (e) => {
    if (e?.value) {
      setSelectedStudyProgram(convertValueLabel(e.value, e.label));
      EduBasicTabUpdateFormik.setFieldValue('program_id', e?.value);
      setProgramTable(e?.label);
    }
  }

  const handleModeOnChangeUpdate = (e) => {
    if (e?.value) {
      setSelectedMode(convertValueLabel(e.value, e.label));
      EduBasicTabUpdateFormik.setFieldValue('mode', e?.value);
    }
  }

  const handleYearOnChangeUpdate = (e) => {
    if (e?.value) {
      setSelectedYear(convertValueLabel(e.value, e.label));
      EduBasicTabUpdateFormik.setFieldValue('year_of_passing', `${e?.value}`);
    }
  }

  const handleAttachmentUpdate = (i) => {
    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: EduBasicTabUpdateFormik.setFieldValue("attachment", event.target.result),
      })
    }
  }
  const handleimageFile = (e) => {
    window.open(configurationData?.EmployeeEducationDetails?.attachment)
  }

  useEffect(() => {
    if (configurationData?.isEmployeeEducationDeleted) {
      dispatch(ViewEmployeeByIdAPI(props.dataId));
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
                          <CForm onSubmit={EduBasicTabFormik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Attachment</label>
                                    <div className="">
                                      <input type="file" name={`attachment`} className="" placeholder='Attachment' onBlur={EduBasicTabFormik.handleBlur} accept="image/png, image/jpeg, image/jpg" onChange={(event) => { handleAttachment(event) }} />
                                      {EduBasicTabFormik.errors.attachment ? <div className="help-block text-danger">{EduBasicTabFormik.errors.attachment}</div> : null}
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
                                        onBlur={EduBasicTabFormik.handleBlur}
                                      />
                                      {EduBasicTabFormik.errors.study_level_id ? <div className="help-block text-danger">{EduBasicTabFormik.errors.study_level_id}</div> : null}
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
                                        onBlur={EduBasicTabFormik.handleBlur}
                                      />
                                      {EduBasicTabFormik.errors.program_id ? <div className="help-block text-danger">{EduBasicTabFormik.errors.program_id}</div> : null}
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
                                        onBlur={EduBasicTabFormik.handleBlur}
                                      />
                                      {EduBasicTabFormik.errors.mode ? <div className="help-block text-danger">{EduBasicTabFormik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Place and Institute <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`institution`} className="form-control" placeholder='Place and Institute' maxLength={20} onChange={EduBasicTabFormik.handleChange} onBlur={EduBasicTabFormik.handleBlur} value={EduBasicTabFormik.values.institution} />
                                      {EduBasicTabFormik.errors.institution ? <div className="help-block text-danger">{EduBasicTabFormik.errors.institution}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Board / University <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`board_or_university`} className="form-control" placeholder='Board / University' maxLength={20} onChange={EduBasicTabFormik.handleChange} onBlur={EduBasicTabFormik.handleBlur} value={EduBasicTabFormik.values.board_or_university} />
                                      {EduBasicTabFormik.errors.board_or_university ? <div className="help-block text-danger">{EduBasicTabFormik.errors.board_or_university}</div> : null}
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
                                        onBlur={EduBasicTabFormik.handleBlur}
                                      />
                                      {EduBasicTabFormik.errors.mode ? <div className="help-block text-danger">{EduBasicTabFormik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Result (in %) <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`result`} className="form-control" placeholder='Result (in %)' maxLength={5} onChange={EduBasicTabFormik.handleChange} onBlur={EduBasicTabFormik.handleBlur} value={EduBasicTabFormik.values.result} />
                                      {EduBasicTabFormik.errors.result ? <div className="help-block text-danger">{EduBasicTabFormik.errors.result}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Were there any arrears? <span className='error'>*</span></label>
                                    <div className="">
                                      <input type={'radio'} className="" id="radio1" name="any_arrears" value="1"/> Yes&nbsp;&nbsp;
                                      <input type={'radio'} className="" id="radio1" name="any_arrears" value="0"/> No
                                      {/* <CFormGroup variant="checkbox">
                                        <CInputRadio className="form-check-input" id="radio1" name="radios" value="Yes" />
                                        <CLabel variant="checkbox" htmlFor="radio1">Yes</CLabel>
                                        <CInputRadio className="form-check-input" id="radio2" name="radios" value="No" />
                                        <CLabel variant="checkbox" htmlFor="radio2">No</CLabel>
                                      </CFormGroup> */}
                                      {EduBasicTabFormik.errors.result ? <div className="help-block text-danger">{EduBasicTabFormik.errors.result}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='row'>
                                <div className="col-lg-8">
                                  <div className="form-group">
                                    <label htmlFor="">Remarks <span className='error'>*</span></label>
                                    <div className="">
                                      <textarea type="text" name={`note`} className="form-control" placeholder='Remarks' maxLength={500} onChange={EduBasicTabFormik.handleChange} onBlur={EduBasicTabFormik.handleBlur} value={EduBasicTabFormik.values.note} rows='4' cols='8' />
                                      {EduBasicTabFormik.errors.note ? <div className="help-block text-danger">{EduBasicTabFormik.errors.note}</div> : null}
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
                          <CForm onSubmit={EduBasicTabUpdateFormik.handleSubmit} className="form-horizontal">
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
                                        options={configurationData?.studylevelListDetails?.data?.result}
                                        onChange={(e) => handleLevelChangeUpdate(e)}
                                        onBlur={EduBasicTabUpdateFormik.handleBlur}
                                      />
                                      {EduBasicTabUpdateFormik.errors.study_level_id ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.study_level_id}</div> : null}
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
                                        onBlur={EduBasicTabUpdateFormik.handleBlur}
                                      />
                                      {EduBasicTabUpdateFormik.errors.program_id ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.program_id}</div> : null}
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
                                        onBlur={EduBasicTabUpdateFormik.handleBlur}
                                      />
                                      {EduBasicTabUpdateFormik.errors.mode ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Place and Institute <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`institution`} className="form-control" placeholder='Place and Institute' maxLength={20}
                                        onChange={EduBasicTabUpdateFormik.handleChange}
                                        onBlur={EduBasicTabUpdateFormik.handleBlur}
                                        value={EduBasicTabUpdateFormik.values.institution} />
                                      {EduBasicTabUpdateFormik.errors.institution ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.institution}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Board / University <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`board_or_university`} className="form-control" placeholder='Place and Institute' maxLength={20} onChange={EduBasicTabUpdateFormik.handleChange} onBlur={EduBasicTabUpdateFormik.handleBlur} value={EduBasicTabUpdateFormik.values.board_or_university} />
                                      {EduBasicTabUpdateFormik.errors.board_or_university ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.board_or_university}</div> : null}
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
                                        onBlur={EduBasicTabUpdateFormik.handleBlur}
                                      />
                                      {EduBasicTabUpdateFormik.errors.mode ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.mode}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Result (in %) <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`result`} className="form-control" placeholder='Result (in %)' maxLength={5} onChange={EduBasicTabUpdateFormik.handleChange} onBlur={EduBasicTabUpdateFormik.handleBlur} value={EduBasicTabUpdateFormik.values.result} />
                                      {EduBasicTabUpdateFormik.errors.result ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.result}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Attachment</label>
                                    <div className="">
                                      <input type="file" name="attachment" className="" placeholder='Attachment' onBlur={EduBasicTabUpdateFormik.handleBlur} accept="image/png, image/jpeg, image/jpg"
                                        onChange={(event) => { handleAttachmentUpdate(event) }} />
                                      {EduBasicTabUpdateFormik.errors.attachment ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.attachment}</div> : null}
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
                                    <label htmlFor="">Remarks <span className='error'>*</span></label>
                                    <div className="">
                                      <textarea type="text" name={`note`} className="form-control" placeholder='Remarks' maxLength={500} onChange={EduBasicTabUpdateFormik.handleChange} onBlur={EduBasicTabUpdateFormik.handleBlur} value={EduBasicTabUpdateFormik.values.note} rows='4' cols='8' />
                                      {EduBasicTabUpdateFormik.errors.note ? <div className="help-block text-danger">{EduBasicTabUpdateFormik.errors.note}</div> : null}
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
export default EduBasicTab
