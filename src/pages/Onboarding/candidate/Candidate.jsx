import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CandidateList, CandidateAPIDelete, CandidateInviteAddAPI } from '../../../actions/onboarding'
import { CostCenterDropDownList, JoblistDropDownList, JobPositionDropDownList } from '../../../actions/commonAction';
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData, convertValueLabel } from '../../../utils/helper'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CContainer,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CPagination,
  CDataTable,
  CCardFooter,
  CLabel,
  CInputCheckbox,
} from '@coreui/react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import CIcon from '@coreui/icons-react'
import Select from "react-select";

const Candidate = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const CandidateData = useSelector((state) => state.onboardingBackend)
  const dropdownData = useSelector((state) => state.commonData)

  const [costCenterOptions, setCostCenterOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [columnFilterValue, setColumnFilterValue] = useState()
  const [tableFilterValue, setTableFilterValue] = useState('')
  const [sorterValue, setSorterValue] = useState()
  const [ctFrom, setCtFrom] = useState(0);
  const [ctTo, setCtTo] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [openInvitePop, setOpenInvitePop] = useState(false)
  const [t1Job, sett1Job] = useState([]);
  const [t1Position, sett1Position] = useState([]);
  const [hrEmailChk, setHrEmailChk] = useState(0);

  //To load dropdown predefined data
  useEffect(() => {
    dispatch(CostCenterDropDownList())
  }, [])

  useEffect(() => {
    setCostCenterOptions(dropdownData?.costCenterCommonData?.data?.result);
  }, [dropdownData?.costCenterCommonData?.data?.result])

  useEffect(() => {
    setJobOptions(dropdownData?.joblistComData?.data?.result);
  }, [dropdownData?.joblistComData?.data?.result])

  useEffect(() => {
    setPositionOptions(dropdownData?.jobpostionComData?.data?.result);
  }, [dropdownData?.jobpostionComData?.data?.result])

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

  const params = {
    page,
    columnFilterValue:
      columnFilterValue?.length > 0 ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: sorterValue?.length > 0 ? JSON.stringify(sorterValue) : 0,
    itemsPerPage,
  }
  const query = new URLSearchParams(params).toString()
  //useeffect for loading group list data
  useEffect(() => {
    setLoading(true)
    dispatch(CandidateList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    // console.log("CandidateData", CandidateData?.candidatelistDetails?.data);
    if (CandidateData?.candidatelistDetails?.data?.result.length > 0) {
      setItems(CandidateData?.candidatelistDetails?.data?.result)
      setPages(CandidateData?.candidatelistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(CandidateData?.candidatelistDetails?.data?.from_count);
      setCtTo(CandidateData?.candidatelistDetails?.data?.to_count);
      setTotalCnt(CandidateData?.candidatelistDetails?.data?.total_count);
      //   console.log(params)
    }
    else {
      setItems([])
      setLoading(false)
    }
  }, [CandidateData?.candidatelistDetails?.data?.result])


  if (CandidateData?.showToast) {
    let sMsg = ''
    if (CandidateData?.success === 'Candidate added success') {
      sMsg = 'Candidate Successfully Saved !'
    } else if (CandidateData?.success === 'Candidate update success') {
      sMsg = 'Candidate Successfully Updated !'
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

  const handleCandidateDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(CandidateAPIDelete(gid))
      }

      history.push('/onboarding/candidate')
    })
  }

  useEffect(() => {
    // console.log("CandidateData",CandidateData?.isDesignationDeleted);
    if (CandidateData?.iscandidateDeleted) {
      dispatch(CandidateList(params))
    }
  }, [CandidateData?.iscandidateDeleted]);

  const onboardingInviteUsers = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      cost_center_id: '',
      job_id: '',
      position_id: '',
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required('This field is required'),
      middle_name: Yup.string().required('This field is required'),
      last_name: Yup.string().required('This field is required'),
      cost_center_id: Yup.string().required('This field is required'),
      job_id: Yup.string().required('This field is required'),
      position_id: Yup.string().required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(CandidateInviteAddAPI(formData))
      
      //if(CandidateData?.showToast && CandidateData?.success == "Candidate invite success" && CandidateData?.isCandInviteLoading == false){
      onboardingInviteUsers.resetForm()
      setHrEmailChk(0);
      handleResetform()
      //}
    },
  });

  const handleResetform = () => {
    onboardingInviteUsers.resetForm()
    setOpenInvitePop(!openInvitePop)
  }

  const handleOncloseResetform = () => {
    onboardingInviteUsers.resetForm()
    setOpenInvitePop(!openInvitePop)
  }

  const handleCandCostCenter = (e) => {
    if (e?.value) {
      onJobClear();
      onJobPositionClear();
      
      const sendGpparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: '[["department_id.cost_center_id", "=", [' + e?.value + ']]]',
        },
      }
      dispatch(JoblistDropDownList(sendGpparams))

      onboardingInviteUsers.setFieldValue('cost_center_id', e.value);
    }
    // setCcenter(convertValueLabel(e?.value, e?.label));
  }

  const handleCandJobChange = (e) => {
    onJobPositionClear();
    if (e?.value) {
      const queryparams = {
        params: {
          query: '{id,name}',
          isDropdown: 1,
          filter: "[['job_id', '=', [" + e?.value + ']]]',
        },
      }
      dispatch(JobPositionDropDownList(queryparams));
      onboardingInviteUsers.setFieldValue('job_id', e.value);
      sett1Job(convertValueLabel(e.value, e.label));
    }
  }

  const handleCandJobPosChange = (e) => {
    if (e?.value) {
      onboardingInviteUsers.setFieldValue('position_id', e.value);
    }
  }

  const handleInvitionChkBx = (e) => {
    if (e.target.checked == true) {
      setHrEmailChk(1);
    } else {
      setHrEmailChk(0);
    }
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        CandidateData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Candidates </strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    <button type='button' className='btn btn-primary' onClick={() => setOpenInvitePop(!openInvitePop)}>Invite</button>&nbsp;&nbsp;
                    {
                      CandidateData?.candidatelistDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/onboarding/add-candidate'}>
                        Add
                      </Link> : ""
                    }

                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                {/* {items.length > 0 && ( */}
                <>

                  <CDataTable
                    items={items}
                    fields={[
                      // { key: 'name', label: 'Subject', filter: false },
                      { key: 'partner_name', label: 'Candidate Name', filter: false },
                      { key: 'email_from', label: 'Email', filter: false },
                      { key: 'partner_mobile', label: 'Mobile', filter: false },
                      { key: 'company_id_name', label: 'Company', filter: false },
                      { key: 'stage_id_name', label: 'Status', filter: false },
                      { key: 'process_state_label', label: 'Process Status', filter: false },

                      // {
                      //   key: 'create_date',
                      //   label: 'Created At',
                      //   filter: false,
                      // },
                      { key: 'action', label: 'Actions', filter: false },
                    ]}
                    loading={loading}
                    hover
                    cleaner
                    columnFilter={{ external: true }}
                    columnFilterValue={columnFilterValue}
                    onColumnFilterChange={setColumnFilterValue}
                    tableFilter={{ label: 'Filter:', external: true, placeholder: "Search ..." }}
                    tableFilterPlaceholder={{ label: 'Filter:' }}
                    tableFilterLabel={{ label: 'Filter:' }}
                    tableFilterValue={tableFilterValue}
                    onTableFilterChange={setTableFilterValue}
                    sorter
                    sorterValue={sorterValue}
                    onSorterValueChange={setSorterValue}
                    itemsPerPageSelect={{
                      label: 'Items per page:',
                      values: [50, 100, 150, 200],
                    }}

                    // to={`/onboarding/view-candidate/${encryptSingleData(
                    //       item.id,
                    //     )}`}
                    //   >
                    //     <FontAwesomeIcon icon={faEye} title="View" />{' '}

                    itemsPerPage={itemsPerPage}
                    onPaginationChange={setItemsPerPage}
                    scopedSlots={{
                      action: (item) => (
                        <td>
                          {/*
                              item?.usr_per?.r ? <Link
                                to={`/onboarding/view-candidate/${encryptSingleData(
                                  item.id,
                                )}`}
                                className='btn btn-sm btn-info'>
                                <FontAwesomeIcon icon={faEye} title="View" />{' '}

                              </Link> : ""*/
                          }


                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/onboarding/edit-candidate/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-success'>
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />{' '}
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.d ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleCandidateDelete(item.id)
                              }}
                              className='btn btn-sm btn-danger'>
                              <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                            </Link> : ""
                          }

                        </td>
                      ),
                    }}
                  />
                  <CPagination
                    pages={pages}
                    activePage={page}
                    onActivePageChange={setPage}
                    className={pages < 2 ? 'd-none' : ''}
                  />
                </>
                {/* )} */}
              </CCardBody>
            </CCard>
          </CContainer>
        </CFade>
      )}

      {/* Group Add Form */}
      <CModal show={openInvitePop} onClose={handleOncloseResetform} size="xl" color="info">
        <CModalHeader title='Close' closeButton>
          <CModalTitle>Invite Applicants</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {
            (CandidateData?.isCandInviteLoading === true) ? 'Inviting Please Wait...' :
              <CForm onSubmit={onboardingInviteUsers.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">First Name <span className='error'>*</span></label>
                        <div className="">
                          <input type="text" name={`first_name`} className="form-control" placeholder='First Name' maxLength={20} onChange={onboardingInviteUsers.handleChange} onBlur={onboardingInviteUsers.handleBlur} value={onboardingInviteUsers.values.first_name} />
                          {onboardingInviteUsers.touched.first_name && onboardingInviteUsers.errors.first_name ? <div className="help-block text-danger">{onboardingInviteUsers.errors.first_name}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Middle Name <span className='error'>*</span></label>
                        <div className="">
                          <input type="text" name={`middle_name`} className="form-control" placeholder='Middle Name' maxLength={20} onChange={onboardingInviteUsers.handleChange} onBlur={onboardingInviteUsers.handleBlur} value={onboardingInviteUsers.values.middle_name} />
                          {onboardingInviteUsers.touched.middle_name && onboardingInviteUsers.errors.middle_name ? <div className="help-block text-danger">{onboardingInviteUsers.errors.middle_name}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Last Name <span className='error'>*</span></label>
                        <div className="">
                          <input type="text" name={`last_name`} className="form-control" placeholder='Last Name' maxLength={20} onChange={onboardingInviteUsers.handleChange} onBlur={onboardingInviteUsers.handleBlur} value={onboardingInviteUsers.values.last_name} />
                          {onboardingInviteUsers.touched.last_name && onboardingInviteUsers.errors.last_name ? <div className="help-block text-danger">{onboardingInviteUsers.errors.last_name}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Cost Center <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Cost Center'}
                            id="cost_center_id"
                            name="cost_center_id"
                            // value={ccenter}
                            options={costCenterOptions}
                            onChange={(e) => handleCandCostCenter(e)}
                            onBlur={onboardingInviteUsers.handleBlur}
                          />
                          {onboardingInviteUsers.touched.cost_center_id && onboardingInviteUsers.errors.cost_center_id ? <div className="help-block text-danger">{onboardingInviteUsers.errors.cost_center_id}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Job <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            ref={selectJob}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Job'}
                            id="job_id"
                            name="job_id"
                            value={t1Job}
                            options={jobOptions}
                            onChange={(e) => handleCandJobChange(e)}
                            onBlur={onboardingInviteUsers.handleBlur}
                          />
                          {onboardingInviteUsers.touched.job_id && onboardingInviteUsers.errors.job_id ? <div className="help-block text-danger">{onboardingInviteUsers.errors.job_id}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="">Job Position <span className='error'>*</span></label>
                        <div className="">
                          <Select
                            ref={selectJobPosition}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose a Position'}
                            id="position_id"
                            name="position_id"
                            value={t1Position}
                            options={positionOptions}
                            onChange={(e) => handleCandJobPosChange(e)}
                            onBlur={onboardingInviteUsers.handleBlur}
                          />
                          {onboardingInviteUsers.touched.position_id && onboardingInviteUsers.errors.position_id ? <div className="help-block text-danger">{onboardingInviteUsers.errors.position_id}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <CFormGroup variant="custom-checkbox" inline style={{ marginTop: '58px !important' }} id='compay_add_show_caste'>
                        <CInputCheckbox custom id="invitation_sent" name="invitation_sent" onChange={(e) => handleInvitionChkBx(e)}/>
                        <CLabel variant="custom-checkbox" htmlFor="invitation_sent">Send invitation to HR ?</CLabel>
                        </CFormGroup>
                      </div>
                    </div>
                    {
                      hrEmailChk == 1 ?
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label htmlFor="">HR Email <span className='error'>*</span></label>
                            <div className="">
                              <input type="text" name={`email`} className="form-control" placeholder='HR Email' maxLength={50} onChange={onboardingInviteUsers.handleChange} onBlur={onboardingInviteUsers.handleBlur} value={onboardingInviteUsers.values.email} />
                            </div>
                          </div>
                        </div>
                      : ''
                    }
                  </div>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      <CButton type="reset" onClick={handleResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>
    </main>
  )
}

export default React.memo(Candidate)
