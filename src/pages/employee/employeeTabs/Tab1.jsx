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
} from "@coreui/react";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CostCenterDropDownList, CostCenterBasedRepManagerJob, JobPositionDropDownList } from './../../../actions/commonAction';
import { EmployeeAddAPI, EmployeeUpdateAPI } from 'src/actions/master';
import { convertValueLabel } from '../../../utils/helper'
import { useHistory } from "react-router-dom";
import CLoader from 'src/pages/loader/CLoader';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Tab1 = (props) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const dropdownData = useSelector((state) => state.commonData)
  const { isLoading } = useSelector((state) => state.masterBackend);

  const [costCenterOptions, setCostCenterOptions] = useState([]);
  const [reportManagerOptions, setReportManagerOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [imgSelected, setImgSelected] = useState([]);

  const [ccenter, setCcenter] = useState([]);
  const [rManager, setrManager] = useState([]);
  const [getname, setGetName] = useState([]);
  const [t1Job, sett1Job] = useState([]);
  const [t1Position, sett1Position] = useState([]);

  const [userImageExistingFile, setUserImageExistingFile] = useState(null);

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CostCenterDropDownList())
  }, [])

  useEffect(() => {
    setCostCenterOptions(dropdownData?.costCenterCommonData?.data?.result);
  }, [dropdownData?.costCenterCommonData?.data?.result])

  useEffect(() => {
    setReportManagerOptions(dropdownData?.ccdropdownData?.employee_list);
    setJobOptions(dropdownData?.ccdropdownData?.job_list);
  }, [dropdownData?.ccdropdownData?.employee_list, dropdownData?.ccdropdownData?.job_list])

  useEffect(() => {
    setPositionOptions(dropdownData?.jobpostionComData?.data?.result);
  }, [dropdownData?.jobpostionComData?.data?.result])


  // const [imageErr, setCcenter] = useState([]);

  const Tab1Formik = useFormik({
    initialValues: {
      name: '',
      work_email: '',
      image_1920: '',
      work_phone: '',
      cost_center_id: '',
      parent_id: '',
      job_id: '',
      position_id: '',
    },

    //  image_1920: (props?.dataEdit?.data?.image_1920) ? Yup.string() : Yup.string().required('This field is required'),

    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      work_email: Yup.string().required('This field is required'),
      image_1920: Yup.array().min(1, "select at least 1 file"),
      work_phone: Yup.number().typeError("That doesn't look like a mobile number").required('This field is required'),
      cost_center_id: Yup.string().required('This field is required'),
      parent_id: Yup.string().required('This field is required'),
      job_id: Yup.string().required('This field is required'),
      position_id: Yup.string().required('This field is required'),
    }),
    // validate,
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values, tab: 'T1' } })

      if (values.image_1920 == '') {

        setImageGetError('This field is required')

      }

      if (props?.dataEdit?.data?.id) {
        dispatch(EmployeeUpdateAPI(props?.dataEdit?.data?.id, formData))
      } else {
        dispatch(EmployeeAddAPI(formData, history))
      }
    },
  });

  const handleCostCenter = (e) => {
    if (e?.value) {
      // onReportManagerClear();
      onJobClear();
      onJobPositionClear();
      const queryparams = {
        params: {
          kwargs: {
            cost_center_id: e?.value
          }
        },
      }
      dispatch(CostCenterBasedRepManagerJob(queryparams))
      Tab1Formik.setFieldValue('cost_center_id', e.value);
    }
    setCcenter(convertValueLabel(e?.value, e?.label));
  }

  const handleReportingManager = (e) => {
    if(e?.value){
      Tab1Formik.setFieldValue('parent_id', e?.value);
      setrManager(convertValueLabel(e?.value, e?.label));
    }
    
    // console.log(" 2 nd name", e?.label.toUpperCase());

    // if (e?.label?.toUpperCase() === getname?.toUpperCase()) {
    //   toast.error('Employee Name Manager Name Not Be Same',
    //     { position: toast.POSITION.TOP_RIGHT })
    //   Tab1Formik.setFieldValue('parent_id', e?.value);
    //   setrManager('');
    // }
    // else if ((e?.label?.toUpperCase() != getname?.toUpperCase())) {
    //   Tab1Formik.setFieldValue('parent_id', e?.value);
    //   setrManager(convertValueLabel(e?.value, e?.label));
    // }
  }


  const handleJobChange = (e) => {
    // onJobPositionClear();
    if (e?.value) {
      const queryparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: "[['job_id', 'in', [" + e?.value + ']]]',
        },
      }
      dispatch(JobPositionDropDownList(queryparams));
      Tab1Formik.setFieldValue('job_id', e.value);
      sett1Job(convertValueLabel(e.value, e.label));
    }
  }

  const handleJobPosChange = (e) => {
    if (e?.value) {
      Tab1Formik.setFieldValue('position_id', e.value);
      sett1Position(convertValueLabel(e.value, e.label));
    }
  }

  const [imageFix, setImageFix] = useState([]);
  // image setter


  // if (imageFix.length === 0) {


  // }
  const [imageGetError, setImageGetError] = useState('This field is required');

  const [previewimage, setPreviewImage] = useState('');

  const handleProfilePic = (i) => {

    console.log("i", i);

    let files = i.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      setImgSelected({
        selectedImage: Tab1Formik.setFieldValue("image_1920", event.target.result),
      })
      setPreviewImage(URL.createObjectURL(i.target.files[0].name));
      // console.log("data", i.target.files[0].name);
    }
  }


  const validate = (values) => {
    const errors = {};
    if (!values.image_1920) {
      errors.image_1920 = 'This field is required.';
    }
    return errors;
  };



  // const handleProfilePic = (i) => {
  //   let files;
  //   // console.log("i", i);
  //   if (imageFix.length === 0) {

  //     alert("no image")

  //     files = i.target.files;
  //     console.log("files", files.length);
  //     if (files.length === 0) {

  //       alert('no data')

  //     }

  //     let fileReader = new FileReader();
  //     fileReader.readAsDataURL(files[0]);
  //     setImageFix(files[0].name)
  //     fileReader.onload = (event) => {
  //       setImgSelected({
  //         selectedImage: Tab1Formik.setFieldValue("image_1920", event.target.result),
  //       })
  //     }

  //   } else {
  //     files = imageFix
  //   }


  // }
  // console.log("imageFix", imageFix);

  const selectRpManager = useRef();
  const onReportManagerClear = () => {
    selectRpManager.current.select.clearValue();
    setReportManagerOptions(convertValueLabel([]));
    setrManager(convertValueLabel([]));
  }

  const selectJob = useRef();
  const onJobClear = () => {
    selectJob.current.select.clearValue();
    setJobOptions(convertValueLabel([]));
    sett1Job(convertValueLabel([]));
  }

  const selectJobPosition = useRef();
  const onJobPositionClear = () => {
    selectJobPosition.current.select.clearValue();
    setPositionOptions(convertValueLabel([]));
    sett1Position(convertValueLabel([]));
  }

  //Update Data  
  useEffect(() => {
    if (props?.dataEdit?.data !== null) {
      Tab1Formik.setValues({
        "name": props?.dataEdit?.data?.name,
        "work_email": props?.dataEdit?.data?.work_email,
        "work_phone": props?.dataEdit?.data?.work_phone,
        "cost_center_id": props?.dataEdit?.data?.cost_center_id,
        "parent_id": props?.dataEdit?.data?.parent_id,
        "job_id": props?.dataEdit?.data?.job_id,
        "position_id": props?.dataEdit?.data?.position_id,
        //"image_1920":props?.dataEdit?.data?.image_1920,
      });
      setCcenter(convertValueLabel(props?.dataEdit?.data?.cost_center_id, props?.dataEdit?.data?.cost_center_id_name));
      setrManager(convertValueLabel(props?.dataEdit?.data?.parent_id, props?.dataEdit?.data?.parent_id_name));
      sett1Job(convertValueLabel(props?.dataEdit?.data?.job_id, props?.dataEdit?.data?.job_id_name));
      sett1Position(convertValueLabel(props?.dataEdit?.data?.position_id, props?.dataEdit?.data?.position_id_name));
      setGetName(props?.dataEdit?.data?.name)
      if (props?.dataEdit?.data?.cost_center_id) {
        const queryparams = {
          params: {
            kwargs: {
              cost_center_id: props?.dataEdit?.data?.cost_center_id
            }
          },
        }
        dispatch(CostCenterBasedRepManagerJob(queryparams))
      }
      if (props?.dataEdit?.data?.job_id) {
        const queryparams = {
          params: {
            query: '{id,name}',
            isDropdown: 1,
            filter: "[['job_id', 'in', [" + props?.dataEdit?.data?.job_id + ']]]',
          },
        }
        dispatch(JobPositionDropDownList(queryparams));
      }

      if (props?.dataEdit?.data?.image_1920) {
        setUserImageExistingFile(props?.dataEdit?.data?.image_1920);
      }
    }
  }, [props?.dataEdit?.data, props?.dataFoption])


  const { fileName } = useState([])
  let file = null;

  file = fileName
    ? (<span>File Selected - {fileName[0]}</span>)
    : (<span>Choose a file...</span>);





  const [title, setTitle] = useState('')

  useEffect(() => {
    let lowerCaseText = title.toLowerCase();
    setTitle(lowerCaseText)
  })

  const nameHandleChange = (e) => {
    if(e.target.value){
      Tab1Formik.setFieldValue("name", e.target.value)
      setGetName(e.target.value)
    }
  }




  return (
    <CCard className="mb-4">
      {/* <pre>{JSON.stringify(Tab1Formik, null, 2)}</pre> */}
      {
        (isLoading === true) ? <CLoader /> :
          <CCardBody>
            <CForm onSubmit={Tab1Formik.handleSubmit} className="form-horizontal">
              <div>
                <div className="row form-group mt-2">
                  <div className="col-md-3">
                    <label htmlFor="hf-email">Name <span className='error'>*</span></label>
                    <input type="text" name='name' className="form-control" placeholder='Name' maxLength={25} onChange={e => nameHandleChange(e)} onBlur={Tab1Formik.handleBlur} value={getname ? getname : ''} />
                    {getname == '' && Tab1Formik.touched.name ? <div className="help-block text-danger">{Tab1Formik.errors.name}</div> : null}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="hf-email">Work Email <span className='error'>*</span></label>
                    <input type="text" name='work_email' className="form-control" placeholder='Work Email' maxLength={25}
                      // onKeyPress={convertTextToLowerCase}
                      // onChange={e => setTitle(e.target.value)}
                      // value={title}
                      value={(Tab1Formik.values.work_email) ? Tab1Formik.values.work_email : ''}
                      onChange={Tab1Formik.handleChange}
                      onBlur={Tab1Formik.handleBlur} />
                    {Tab1Formik.errors.work_email && Tab1Formik.touched.work_email ? <div className="help-block text-danger">{Tab1Formik.errors.work_email}</div> : null}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="hf-email">Image <span className='error'>*</span></label>
                    <br />
                    {/* 
                    file = fileName
                    ? ( <span>File Selected - {fileName[0]}</span>)
                    : ( <span>Choose a file...</span> ); */}
                    <input type="file" name='image_1920' accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => { handleProfilePic(event) }} />

                    {/* {(() => {
                      if (previewimage) {
                        return (
                          <div className='mt-2'><a href={previewimage} target='_blank' className='mt-4'><p>Error</p></a></div>
                        )
                      } else if (userImageExistingFile) {
                        return (
                          <div className='mt-2'><a href={userImageExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div>
                        )
                      }
                    })()} */}

                    {Tab1Formik.image_1920 == '' ? <div className="help-block text-danger">{imageGetError}</div> : null}
                    {/* {imageGetError} */}


                    {
                      (userImageExistingFile) ? <div className='mt-2'><a href={userImageExistingFile} target='_blank' className='mt-4'>View Existing Attachment</a></div> : ''
                    }

                  </div>

                  <div className="col-md-3">
                    <label htmlFor="hf-email">Work Phone <span className='error'>*</span></label>
                    <input type="text" name='work_phone' className="form-control" placeholder='Work Phone' maxLength={10} onChange={Tab1Formik.handleChange} onBlur={Tab1Formik.handleBlur} value={(Tab1Formik.values.work_phone) ? Tab1Formik.values.work_phone : ''} />
                    {Tab1Formik.errors.work_phone && Tab1Formik.touched.work_phone ? <div className="help-block text-danger">{Tab1Formik.errors.work_phone}</div> : null}
                  </div>
                </div>
                <div className="row form-group mt-2">
                  <div className="col-md-3">
                    <label htmlFor="hf-email">Cost Center <span className='error'>*</span></label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={'Choose a Cost Center'}
                      id="cost_center_id"
                      name="cost_center_id"
                      value={ccenter}
                      options={costCenterOptions}
                      onChange={(e) => handleCostCenter(e)}
                      onBlur={Tab1Formik.handleBlur}
                    />
                    {Tab1Formik.errors.cost_center_id && Tab1Formik.touched.cost_center_id ? <div className="help-block text-danger">{Tab1Formik.errors.cost_center_id}</div> : null}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="hf-email">Reporting Manager <span className='error'>*</span></label>
                    <Select
                      ref={selectRpManager}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={'Choose a Reporting Manager'}
                      name="parent_id"
                      value={rManager}
                      id="parent_id"
                      options={reportManagerOptions}
                      onChange={(e) => handleReportingManager(e)}
                      onBlur={Tab1Formik.handleBlur}
                    />
                    {Tab1Formik.errors.parent_id && Tab1Formik.touched.parent_id ? <div className="help-block text-danger">{Tab1Formik.errors.parent_id}</div> : null}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="hf-email">Job <span className='error'>*</span></label>
                    <Select
                      ref={selectJob}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={'Choose a Job'}
                      id="job_id"
                      name="job_id"
                      value={t1Job}
                      options={jobOptions}
                      onChange={(e) => handleJobChange(e)}
                      onBlur={Tab1Formik.handleBlur}
                    />
                    {Tab1Formik.errors.job_id && Tab1Formik.touched.job_id ? <div className="help-block text-danger">{Tab1Formik.errors.job_id}</div> : null}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="hf-email">Position <span className='error'>*</span></label>
                    <Select
                      ref={selectJobPosition}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder={'Choose a Position'}
                      id="position_id"
                      name="position_id"
                      value={t1Position}
                      options={positionOptions}
                      onChange={(e) => handleJobPosChange(e)}
                      onBlur={Tab1Formik.handleBlur}
                    />
                    {Tab1Formik.errors.position_id && Tab1Formik.touched.position_id ? <div className="help-block text-danger">{Tab1Formik.errors.position_id}</div> : null}
                  </div>
                </div>
              </div>
              <CCardFooter>
                <CRow>
                  <CCol className='col-md-10' align="center" >
                    <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> {
                      props?.dataEdit?.data?.id ? 'Update' : 'Save'
                    }</CButton>
                    <Link className='ml-3 btn btn-danger' to={'/employee/employee'}><CIcon name="cil-ban" /> Cancel</Link>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CForm>
          </CCardBody>
      }
    </CCard>
  )
}
export default Tab1
