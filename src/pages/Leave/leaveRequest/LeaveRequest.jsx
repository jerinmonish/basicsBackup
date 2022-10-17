import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LeaveRequestList, LeaveRequestGrid, LeaveRequestAPIDelete, LeaveRequestDataViewList } from '../../../actions/leave'
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash, faList, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData, userLocalDecryptData } from '../../../utils/helper'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import CryptoJS from "crypto-js";
import 'react-toastify/dist/ReactToastify.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CFade,
  CPagination,
  CDataTable,
  CBadge,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from 'moment'

const LeaveRequest = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const LeaveData = useSelector((state) => state.leaveBackend)
  const empData = userLocalDecryptData();

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

  const [listView, setListView] = useState(1)
  const [gridView, setGridView] = useState(0)
  const [openPopCalendar, setOpenPopCalendar] = useState(false)
  const [ctitle, setCtitle] = useState('')
  const [cEmpName, setCEmpName] = useState('')
  const [cLeaveType, setCLeaveType] = useState('')
  const [cStartDate, setCStartDate] = useState('')
  const [cEndDate, setCEndDate] = useState('')
  const [cRid, setCRid] = useState(null)
  const [empNameDisp, setEmpNameDisp] = useState(0);
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
    dispatch(LeaveRequestList(params))
    dispatch(LeaveRequestGrid())
    dispatch(LeaveRequestDataViewList())
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    // console.log("Leave req", LeaveData?.leaveListDetails?.data?.result);
    if (LeaveData?.leaveListDetails?.data?.result.length > 0) {
      setItems(LeaveData?.leaveListDetails?.data?.result)
      setPages(LeaveData?.leaveListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(LeaveData?.leaveListDetails?.data?.from_count);
      setCtTo(LeaveData?.leaveListDetails?.data?.to_count);
      setTotalCnt(LeaveData?.leaveListDetails?.data?.total_count);
      // console.log(items.length)
    }
    else {
      setItems([])
      setLoading(false)
    }

  }, [LeaveData?.leaveListDetails?.data?.result])


  const [getAllLeaveType, setGetAllLeaveType] = useState('')


  // console.log("leave data", LeaveData?.getLeaveRequestDataList);


  if (LeaveData?.showToast) {
    let sMsg = ''
    if (LeaveData?.success === 'leaverequest added success') {
      sMsg = 'Leave Request Saved Successfully'
    } else if (LeaveData?.success === 'leaverequest update success') {
      sMsg = 'Leave Request Updated Successfully'
    }
    if (sMsg.length > 0) {
      toast.success(sMsg, { autoClose: 2000 }, {
        position: toast.POSITION.TOP_RIGHT,
      })
      dispatch({
        type: constants.MESSAGE_CLEAR,
      })
    }
  }

  const handleLeaveDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(LeaveRequestAPIDelete(gid))
      }

      history.push('/leave/leaveRequest')
    })
  }
  useEffect(() => {
    // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
    if (LeaveData?.isleaveDeleted) {
      dispatch(LeaveRequestList(params))
    }
  }, [LeaveData?.isleaveDeleted]);


  // const [status, setStatus] = useState([])

  // setStatus(LeaveData?.leaveListDetails?.data?.result?.[0]?.state)

  const getBadge = (items) => {
    // console.log(items);
    switch (items) {
      case 'Approved': return 'badge badge-pill badge-success'
      case 'To Approve': return 'badge badge-pill badge-warning'
      case 'To Submit': return 'badge badge-pill badge-info'
      case 'Refused': return 'badge badge-pill badge-danger  '
      case 'Cancelled': return 'badge badge-pill badge-dark'
      case 'Cancel Request': return 'badge badge-pill badge-primary'
      default: return 'badge badge-pill black'
    }
  }

  const [getdata, setGetdata] = useState([]);

  useEffect(() => {
    let Udata = localStorage.getItem('udata');
    const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
    const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
    // console.log("byts", udetails.uid);
    setGetdata(udetails.level[0])

  }, [])

  console.log('data', getdata);

  //const events = [
  /*{
  "id": 263,
  "employee_id": 42,
  "employee_name": "Jerin Monish",
  "leave_type": "Trip Leave BSF 2022",
  "title": "Jerin Monish",
  // "start": '2022-06-15T20:00:00',
  // "end": '2022-06-16T02:00:00',
  "start": "2022-06-07",
  "end": "2022-06-10",
  "color": "blue",
  "status": "confirm",
  "s_date": "16-06-2022",
  "e_date": "17-06-2022"
}]*/
  // {
  //           "title": "Long Event",
  //           "start": "2022-06-07",
  //           "end": "2022-06-10",
  //         },
  //   ]
  const events = LeaveData?.leaveGridDetails?.data;

  const handleGridPageView = () => {
    setListView(0);
    setGridView(1);
  }

  const handleListPageView = () => {
    setListView(1);
    setGridView(0);
  }

  const handleCalendarClicked = (e) => {
    console.log("value fpr,", e);
    setCtitle(e?.el?.fcSeg?.eventRange?.def?.title);
    setCEmpName(e?.el?.fcSeg?.eventRange?.def?.extendedProps?.employee_name);
    setCLeaveType(e?.el?.fcSeg?.eventRange?.def?.extendedProps?.leave_type);
    setCStartDate(e?.el?.fcSeg?.eventRange?.def?.extendedProps?.s_date);
    setCEndDate(e?.el?.fcSeg?.eventRange?.def?.extendedProps?.e_date);
    if (e?.el?.fcSeg?.eventRange?.def.publicId && e?.el?.fcSeg?.eventRange?.def.publicId != 0) {
      setCRid(encryptSingleData(parseInt(e?.el?.fcSeg?.eventRange?.def?.publicId)));
    }
    if (e?.el?.fcSeg?.eventRange?.def.publicId == empData?.employee_id) {
      setEmpNameDisp(1);
    }
    setOpenPopCalendar(!openPopCalendar)
  }

  const handleOncloseResetform = () => {
    setOpenPopCalendar(!openPopCalendar)
  }

  const handleResetform = () => {
    setOpenPopCalendar(!openPopCalendar)
  }

  return (
    <main className="c-main">



      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        LeaveData?.isLoading === true ? (
        <CLoader />
      ) : (

        <CFade>

          {/* {moment(new Date()).format("DD/MM/YYYY") } */}
          <CContainer fluid>
            {
              getdata === 'User' ? <div className="calendar_all_days mb-2">
                {/* <div className="calendar_all_days mb-2" style={{ overflowX: 'scroll', scrollbarColor: 'red' }}> */}
                {
                  LeaveData?.getLeaveRequestDataList?.map((data) =>
                    <div className="col-lg-3">
                      <div className="card">
                        <div className="card-body" style={{ borderLeft: '5px solid darkturquoise', paddingBottom: '0px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}> {data[0]}</span><br />
                          <span style={{ fontWeight: 'bold', fontSize: '30px', color: 'palevioletred' }}> {data[1].max_leaves} </span> / <span style={{ fontSize: '18px' }}>{data[1].remaining_leaves}</span> Days<br />

                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{data[1].leaves_taken} </span> <span> - Taken  {data[3] ? '(' + ' Expire on ' + moment((data[3])).format("DD/MM/YYYY") + ' )' : ''}  </span>
                          {/* <span style={{ fontWeight: 'bold', fontSize: '18px' }}> {data[1].leaves_taken}  <span /> <span> - taken (Expire on {data[3] ? data[3] : '-'} )</span><br /> */}
                        </div>
                      </div>
                    </div>

                  )
                }
              </div>
                :
                ''
            }


            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Leave Request </strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    {<button type='button' className="btn btn-info" onClick={() => handleListPageView()}><FontAwesomeIcon icon={faList} title="List" /></button>}
                    &nbsp;&nbsp;
                    {<button type="button" className="btn btn-info" onClick={() => handleGridPageView()}><FontAwesomeIcon icon={faCalendarAlt} title="Calendar" /></button>}
                    &nbsp;&nbsp;
                    {
                      LeaveData?.leaveListDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/leave/add-leaveRequest'}>Add</Link> : ""
                    }
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                {
                  (gridView == 1) ? <FullCalendar
                    initialView="dayGridMonth"
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                      // start: 'title',
                      // center: 'today prev,next',
                      // end: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    events={events}
                    dayMaxEvents={1}
                    eventClick={(e) => handleCalendarClicked(e)}
                  /> : ''
                }

                {
                  (listView == 1) ? <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div> : ''
                }
                {
                  (listView == 1) ?
                    <CDataTable
                      items={items}

                      fields={[
                        // { key: 'group_id_name', label: 'Group', filter: false },
                        // { key: 'mode_company_id_name', label: 'Company', filter: false },

                        { key: 'employee_id_name', label: getdata === 'Super Admin' ? 'Employee' : "", filter: false },
                        { key: 'holiday_status_id_name', label: 'Leave Type', filter: false },
                        { key: 'name', label: 'Description', filter: false },
                        { key: 'number_of_days', label: 'Duration', filter: false },
                        { key: 'request_date_from', label: 'From', filter: false },
                        { key: 'request_date_to', label: 'To', filter: false },
                        { key: "state_label", label: 'Approval Status', filter: false },
                        // {
                        //   key: 'create_date',
                        //   label: 'Created At',
                        //   filter: false,
                        // },
                        // {
                        //   getdata === 'Super Admin' ? : ""
                        // }
                        { key: 'action', label: 'Actions', filter: true },
                      ]}
                      loading={loading}
                      hover
                      cleaner
                      // columnFilter={{ external: true }}
                      // columnFilterValue={columnFilterValue}
                      onColumnFilterChange={setColumnFilterValue}
                      tableFilter={{ label: 'Filter:', external: true, placeholder: "Search ..." }}
                      // tableFilter={{ external: true }}
                      tableFilterValue={tableFilterValue}
                      onTableFilterChange={setTableFilterValue}
                      // {
                      //   getdata === 'Super Admin' ? sorter : hide
                      //   }
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

                        employee_id_name:
                          (item) => (
                            <td>
                              {
                                getdata === 'User' ? '' : <span>{item.employee_id_name}</span>
                              }
                            </td>
                          ),

                        state_label:
                          (item) => (
                            <td>
                              <CBadge color={getBadge(item.state_label)} style={{ width: '65%', height: '23px' }}>
                                <span style={{ color: 'whitesmoke', padding: '5px', fontSize: '17px' }}>{item.state_label}</span>
                              </CBadge>
                            </td>
                          ),
                        action: (item) => (
                          <>

                            <td>
                              {/* {item?.usr_per?.r ? <Link
                                to={`/leave/view-leaveRequest/${encryptSingleData(
                                  item.id
                                )}`}
                                className='btn btn-sm btn-info'>
                                <FontAwesomeIcon icon={faEye} title="View" />

                              </Link> : ""} */}

                              &nbsp;&nbsp;
                              {
                                item?.usr_per?.u ? <Link
                                  to={`/leave/edit-leaveRequest/${encryptSingleData(
                                    item.id
                                  )}`}
                                  className='btn btn-sm btn-success'>
                                  <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    title="Edit" />{' '}
                                </Link>
                                  : ""
                              }

                              &nbsp;&nbsp;
                              {
                                item?.usr_per?.d ? <Link
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    handleLeaveDelete(item.id)
                                  }}

                                  className='btn btn-sm btn-danger'>
                                  {/* {
                                &nbsp;&nbsp;
                                {
                                  item?.usr_per?.d || item?.state_label != 'Approved' ? <Link
                                    to={`/leave/edit-leaveRequest/${encryptSingleData(
                                      item.id
                                    )}`}
                                    className='btn btn-sm btn-success'>
                                    <FontAwesomeIcon
                                      icon={faPencilAlt}
                                      title="Edit" />{' '}
                                  </Link>
                                    : ""
                                }

                                &nbsp;&nbsp;
                                {
                                  item?.usr_per?.d ||  item?.state_label != 'Approved' ? <Link
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      e.preventDefault()
                                      handleLeaveDelete(item.id)
                                    }}

                                    className='btn btn-sm btn-danger'>
                                    {/* {

                                item = 'Approved' ? "" :
                              } */}
                                  <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                                </Link> : ""
                              }

                            </td>


                          </>

                        ),
                      }}
                    /> : ''
                }

                {
                  items.length > 1 && (listView == 1) ? <CPagination
                    pages={pages}
                    activePage={page}
                    onActivePageChange={setPage}
                    className={pages < 2 ? 'd-none' : ''}
                  /> : " "

                }
              </CCardBody>
            </CCard>
          </CContainer>
        </CFade>
      )
      }


      {/* Group Add Form */}
      <CModal show={openPopCalendar} onClose={handleOncloseResetform} size="lg" color="info">
        <CModalHeader title='Close' closeButton>
          <CModalTitle>View Leave Request</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm className="form-horizontal">
            <CCardBody>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  {ctitle}
                  {/* <CInput type="text" name='group_name'  placeholder="Group Name" maxLength={60} title='Group Name' /> */}
                </CCol>
              </CFormGroup>
              {
                empNameDisp == 0 ?
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-password">Employee Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {cEmpName}
                      {/* <CInput type="text" name='group_code' placeholder="Group Code" maxLength={10} title='Group Code' /> */}
                    </CCol>
                  </CFormGroup>
                  : ''
              }
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-password">Leave Type</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  {cLeaveType}
                  {/* <CInput type="text" name='group_code' placeholder="Group Code" maxLength={10} title='Group Code' /> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-password">Start Date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  {cStartDate}
                  {/* <CInput type="text" name='group_code' placeholder="Group Code" maxLength={10} title='Group Code' /> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-password">End Date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  {cEndDate}
                  {/* <CInput type="text" name='group_code' placeholder="Group Code" maxLength={10} title='Group Code' /> */}
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol className='col-md-10' align="center" >
                  {/* <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> </CButton> */}
                  <Link to={`/leave/edit-leaveRequest/${(cRid)}`} className="btn btn-primary"><FontAwesomeIcon icon={faPencilAlt} title="Edit" /> Edit</Link>
                  <CButton type="reset" onClick={handleResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CForm>
        </CModalBody>
      </CModal>

    </main >
  )
}

export default React.memo(LeaveRequest)
