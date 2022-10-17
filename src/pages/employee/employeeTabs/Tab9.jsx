import React, { useState, useEffect } from 'react'
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
} from "@coreui/react";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GetCompensationData, GetCompensationRelatedData, AddCompensationData, EditCompensationData, UpdateCompensationData, AddEmployeeFamilyMember, DeleteCompensation, EditDetailsEmployeeFamily, EmployeeFamilyUpdate } from 'src/actions/configuration';
import { convertValueLabel, indianDateFormat, convertDateToMDY } from '../../../utils/helper'
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { ViewEmployeeByIdAPI } from 'src/actions/master';
import CLoader from 'src/pages/loader/CLoader';
const Tab9 = (props) => {
  const dispatch = useDispatch();
  const configurationData = useSelector((state) => state.configurationBackend)
  const { employeeViewDetails, isLoading } = useSelector((state) => state.masterBackend);
  // console.log(configurationData);
  const [openPopGroup, setOpenPopGroup] = useState(false)
  const yearsDD = (mrs = false) => {
    let years = []
    for (let i = moment().year() - 30; i <= moment().year(); i++) {
      years.push(<option value={i} key={mrs + i}>{i}</option>);
    }
    return years;
  }
  const [typeOptions, setTypeOptions] = useState([{ value: 'ALW', label: 'Allowance' }, { value: 'DED', label: 'Deduction' }]);
  const [typeName, setTypeName]       = useState([]);
  const [compOptions, setCompOptions] = useState([]);
  const [compVal, setCompVal]         = useState(null);
  const [compAddVal, setCompAddVal]   = useState(null);
  const [codeVal, setCodeVal]         = useState(null);
  const [amtVal, setAmtVal]           = useState(true);
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [focusdateOfBirth, setfocusdateOfBirth] = useState(false);

  // update
  const [dateOfBirthUpdate, setdateOfBirthUpdate] = useState(null);
  const [focusdateOfBirthUpdate, setfocusdateOfBirthUpdate] = useState(false);
  const [openPopGroupUpdate, setOpenPopGroupUpdate] = useState(false)

  const [relationShipOptions, setRelationShipOptions] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [phoneselect, setPhoneSelected] = useState([])

  const [typeDataTable, setTypeDataTable] = useState([])
  const [compensationTable, setCompensationTable] = useState([])


  useEffect(() => {
    setCompOptions(configurationData?.compensationListDetails?.data?.result)
  }, [configurationData?.compensationListDetails?.data?.result])


  useEffect(() => {
    if(configurationData?.compensationBasedListDetails?.data?.code){
      setCodeVal(configurationData?.compensationBasedListDetails?.data?.code)
    }

    if(configurationData?.compensationBasedListDetails?.data?.define_amount_in_emp){
      setAmtVal(false)
    }
  }, [configurationData?.compensationBasedListDetails?.data?.code,configurationData?.compensationBasedListDetails?.data?.define_amount_in_emp])
  

  const Tab9Formik = useFormik({
    initialValues: {
      type: '',
      salary_id: '',
      amount: '',
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required('This field is required'),
      salary_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(AddCompensationData(formData))
    },
  });

  const Tab9UpdateFormik = useFormik({
    initialValues: {
      type: '',
      salary_id: '',
      amount: '',
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required('This field is required'),
      salary_id: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(UpdateCompensationData(values.id, formData))
    },
  });


  const handleTypeData = (e) => {
    if (e?.value) {
      Tab9Formik.setFieldValue('type', e.value);
      Tab9Formik.setFieldValue('employee_id', props.dataId);
      setCompVal(null);
      setCompAddVal(null);
      setCompOptions([]);
      setAmtVal(true);
      setCodeVal('');
      setTypeDataTable(e.label);
      const typeValId = JSON.stringify({ params: {  filter: "[['category_id.code', '=', '"+e.value+"'],['company_id', '=', 10]]",query: '{id,name}', isDropdown: 1, } })
      dispatch(GetCompensationData(typeValId))
      setTypeName(convertValueLabel(e.value,e.label));
    }
  }

  const handleTypeDataUpdate = (e) => {
    if (e?.value) {
      Tab9UpdateFormik.setFieldValue('type', e.value);
      Tab9UpdateFormik.setFieldValue('employee_id', props.dataId);
      setCompVal(null);
      setCompAddVal(null);
      setCompOptions([]);
      setAmtVal(true);
      setCodeVal('');
      setTypeDataTable(e.label);
      const typeValId = JSON.stringify({ params: {  filter: "[['category_id.code', '=', '"+e.value+"'],['company_id', '=', 10]]",query: '{id,name}', isDropdown: 1, } })
      dispatch(GetCompensationData(typeValId))
      setTypeName(convertValueLabel(e.value,e.label));
    }
  }

  const handleCompensationChange = (e) => {
    if (e?.value) {
      Tab9Formik.setFieldValue('salary_id', e.value);
      setCompensationTable(e.label);
      setCompVal(convertValueLabel(e?.value, e?.label))
      setCompAddVal(convertValueLabel(e?.value, e?.label))
      const compBasedId = JSON.stringify({ params: {  query: '{id,name,define_amount_in_emp,code}' } })
      dispatch(GetCompensationRelatedData(compBasedId, e.value))
    }
  }

  const handleCompensationUpdateChange = (e) => {
    if (e?.value) {
      Tab9UpdateFormik.setFieldValue('salary_id', e.value);
      setCompensationTable(e.label);
      setCompVal(convertValueLabel(e?.value, e?.label))
      setCompAddVal(convertValueLabel(e?.value, e?.label))
      const compBasedId = JSON.stringify({ params: {  query: '{id,name,define_amount_in_emp,code}' } })
      dispatch(GetCompensationRelatedData(compBasedId, e.value))
    }
  }

  useEffect(() => {
    //To Show Success Message
    if (configurationData?.showToast) {
      let sMsg = ''
      if (configurationData?.success === 'compensation added successfully') {
        sMsg = 'Compensation Successfully Saved !'
        setOpenPopGroup(!openPopGroup)
      } else if (configurationData?.success === 'compensation updated successfully') {
        sMsg = 'Compensation Updated !'
        setOpenPopGroupUpdate(!openPopGroupUpdate)
        dispatch(ViewEmployeeByIdAPI(props.dataId));
      }
    }
  }, [configurationData?.success, configurationData?.showToast]);

  useEffect(() => {
    if (/*configurationData?.famid?.data && */configurationData?.success === 'compensation added successfully') {
      props?.dataEdit?.data?.compensation_ids.push({
        "type_label": typeDataTable,
        "salary_id_name": compensationTable,
        "code": Tab9Formik?.values.code,
        "amount": Tab9Formik?.values.amount,
        "id": configurationData?.compensationEditDetails?.data?.id
      });
      Tab9Formik.resetForm();
    }

  }, [props?.dataEdit?.data?.compensation_ids, configurationData?.success, compensationTable])

  const handleCompensationDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(DeleteCompensation(gid))
      }
    })
  }


  //Method to get edit values
  const handleCompensationDetails = (gid) => {
    dispatch(EditCompensationData(gid));
    setOpenPopGroupUpdate(!openPopGroupUpdate)
  }

  useEffect(() => {
    if (configurationData?.compensationEditDetails !== null) {
      setCodeVal(configurationData?.compensationEditDetails?.data?.code);
      Tab9UpdateFormik.setValues({
        "employee_id": props.dataId,
        "id": configurationData?.compensationEditDetails?.data?.id,
        "code": configurationData?.compensationEditDetails?.data?.code,
        "type": configurationData?.compensationEditDetails?.data?.type,
        "salary_id": configurationData?.compensationEditDetails?.data?.salary_id,
        "amount": configurationData?.compensationEditDetails?.data?.amount,
      });

      if (configurationData?.compensationEditDetails?.data?.salary_id_list) {
        setCompOptions(configurationData?.compensationEditDetails?.data?.salary_id_list)
      }

      if (configurationData?.compensationEditDetails?.data?.type) {
        setTypeName(convertValueLabel(configurationData?.compensationEditDetails?.data?.type,configurationData?.compensationEditDetails?.data?.type_label));
      }

      if (configurationData?.compensationEditDetails?.data?.salary_id) {
        setCompVal(convertValueLabel(configurationData?.compensationEditDetails?.data?.salary_id,configurationData?.compensationEditDetails?.data?.salary_id_name))
      }
    }
  }, [configurationData?.compensationEditDetails]);

  useEffect(() => {
    if (configurationData?.isCompensationDeleted) {
      dispatch(ViewEmployeeByIdAPI(props.dataId));
    }
  }, [configurationData?.isCompensationDeleted])

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
                        <h5 className="m-0 p-0">Compensations</h5>
                      </div>
                      <div className=''>
                        <CButton className={'float-right'} color="primary" onClick={() => setOpenPopGroup(!openPopGroup)}>Add</CButton>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row">
                        <CDataTable
                          items={props?.dataEdit?.data?.compensation_ids}
                          fields={[{ key: "type_label", label: "Type" }, { key: "salary_id_name", label: "Compensation" }, { key: "code", label: "Code" }, { key: "amount", label: "Amount" }, { key: 'action', label: 'Actions', filter: false }]}
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
                                    handleCompensationDetails(items.id)
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
                                    handleCompensationDelete(items.id)
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
                      <CModalTitle>Add Compensation</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isCompLoading === true) ? 'Saving Please Wait...' :
                          <CForm onSubmit={Tab9Formik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Type <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Type'}
                                        // value={relateUser}
                                        name="type"
                                        options={typeOptions}
                                        onChange={(e) => handleTypeData(e)}
                                        onBlur={Tab9Formik.handleBlur}
                                      />
                                      {Tab9Formik.touched.type && Tab9Formik.errors.type ? <div className="help-block text-danger">{Tab9Formik.errors.type}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Compensation <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Compensation'}
                                        value={compAddVal}
                                        name="salary_id"
                                        options={compOptions}
                                        onChange={(e) => handleCompensationChange(e)}
                                        onBlur={Tab9Formik.handleBlur}
                                      />
                                      {Tab9Formik.touched.salary_id && Tab9Formik.errors.salary_id ? <div className="help-block text-danger">{Tab9Formik.errors.salary_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Code <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" className="form-control" readOnly value={codeVal}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Amount <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name="amount" className="form-control" placeholder='Amount' maxLength={5} onChange={Tab9Formik.handleChange} onBlur={Tab9Formik.handleBlur} readOnly={amtVal ? true : false}  value={Tab9Formik.values.amount} />
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
                      <CModalTitle>Update Compensation</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        //(configurationData?.isEmpFamLoading === true) ? 'Saving Please Wait...' :
                          <CForm onSubmit={Tab9UpdateFormik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Type <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Type'}
                                        value={typeName}
                                        name="type"
                                        options={typeOptions}
                                        onChange={(e) => handleTypeDataUpdate(e)}
                                        onBlur={Tab9UpdateFormik.handleBlur}
                                      />
                                      {Tab9UpdateFormik.touched.type && Tab9UpdateFormik.errors.type ? <div className="help-block text-danger">{Tab9UpdateFormik.errors.type}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Compensation <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Compensation'}
                                        value={compVal}
                                        name="salary_id"
                                        options={compOptions}
                                        onChange={(e) => handleCompensationUpdateChange(e)}
                                        onBlur={Tab9UpdateFormik.handleBlur}
                                      />
                                      {Tab9UpdateFormik.touched.salary_id && Tab9UpdateFormik.errors.salary_id ? <div className="help-block text-danger">{Tab9UpdateFormik.errors.salary_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Code <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" className="form-control" readOnly value={codeVal}/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="form-group">
                                    <label htmlFor="">Amount <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name="amount" className="form-control" placeholder='Amount' maxLength={5} onChange={Tab9UpdateFormik.handleChange} onBlur={Tab9UpdateFormik.handleBlur} readOnly={amtVal ? true : false}  value={Tab9UpdateFormik.values.amount} />
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
export default Tab9
