import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LeaveAllocationList, LeaveAllocationAPIDelete } from '../../../actions/leave'
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
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
} from '@coreui/react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'

const LeaveAllocations = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const LeaveAllocationsData = useSelector((state) => state.leaveBackend)

  //  console.log("LeaveTypesData",LeaveTypesData);
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
    dispatch(LeaveAllocationList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    // console.log("LeaveAllocationsData", LeaveAllocationsData?.leaveAllocationlistDetails?.data?.result);
    if (LeaveAllocationsData?.leaveAllocationlistDetails?.data?.result.length > 0) {
      setItems(LeaveAllocationsData?.leaveAllocationlistDetails?.data?.result)
      setPages(LeaveAllocationsData?.leaveAllocationlistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(LeaveAllocationsData?.leaveAllocationlistDetails?.data?.from_count);
      setCtTo(LeaveAllocationsData?.leaveAllocationlistDetails?.data?.to_count);
      setTotalCnt(LeaveAllocationsData?.leaveAllocationlistDetails?.data?.total_count);
      //   console.log(params)
    } else {
      setItems([])
      setLoading(false)
    }
  }, [LeaveAllocationsData?.leaveAllocationlistDetails?.data?.result])

  if (LeaveAllocationsData?.showToast) {
    let sMsg = ''
    if (LeaveAllocationsData?.success === 'leaveAllocation added success') {
      sMsg = 'Leave Allocation Saved Successfully !'
    } else if (LeaveAllocationsData?.success === 'leaverAllocation update success') {
      sMsg = 'Leave Allocation Updated Successfully !'
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

  const [getdata, setGetdata] = useState([]);

  useEffect(() => {
    let Udata = localStorage.getItem('udata');
    const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
    const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
    // console.log("byts", udetails.uid);
    setGetdata(udetails.level[0])

  }, [])


  const handleLeaveAllocationDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(LeaveAllocationAPIDelete(gid))
      }

      history.push('/leave/leaveAllocation')
    })
  }

  useEffect(() => {
    // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
    if (LeaveAllocationsData?.isleaveAllocationDeleted) {
      dispatch(LeaveAllocationList(params))
    }
  }, [LeaveAllocationsData?.isleaveAllocationDeleted]);

  const getBadge = (items) => {
    // console.log(items);
    switch (items) {
      case 'Approved': return 'badge badge-pill badge-success'
      case 'To Approve': return 'badge badge-pill badge-warning'
      case 'To Submit': return 'backgroud-colour'
      case 'Refused': return 'badge badge-pill badge-danger  '
      case 'Second Approval': return 'badge badge-pill badge-info'
      default: return 'badge badge-pill primary'
    }
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        LeaveAllocationsData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard className="leave-allocation">
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Leave Allocation </strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    {
                      LeaveAllocationsData?.leaveAllocationlistDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/leave/add-leaveAllocation'}>
                        Add
                      </Link> : ""
                    }

                  </CCol>
                </CRow>

              </CCardHeader>
              <CCardBody>
                {/* {items.length > 0 && ( */}
                <>
                  <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                  <CDataTable
                    items={items}
                    fields={[
                      { key: 'holiday_status_id_name', label: 'Leave Type', filter: false },
                      { key: 'holiday_type_label', label: 'Mode', filter: false },
                      { key: 'employee_id_name', label: 'Employee', filter: false },
                      { key: 'allocation_type_label', label: 'Leave Allocation', filter: false },
                      { key: 'name', label: 'Description', filter: false },
                      { key: 'duration_display', label: 'Duration', filter: false },
                      { key: 'date_from', label: 'From', filter: false },
                      { key: 'date_to', label: 'To', filter: false },
                      { key: "state_label", label: 'Approval Status', filter: false },

                      // { key: 'department_id_name', label: 'Function', filter: false },
                      // {
                      //   key: 'create_date',
                      //   label: 'Created At',
                      //   filter: false,
                      // },
                      { key: 'action', label: getdata === 'Super Admin' ? 'Actions' : "", filter: false },
                    ]}
                    loading={loading}
                    hover
                    cleaner
                    columnFilter={{ external: true }}
                    columnFilterValue={columnFilterValue}
                    onColumnFilterChange={setColumnFilterValue}
                    tableFilter={{ label: 'Filter:', external: true, placeholder: "Search ..." }}
                    // tableFilter={{ external: true }}
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

                      state_label:
                        (item) => (
                          <td>
                            <CBadge color={getBadge(item.state_label)} style={{ width: '90%', height: '23px' }}>
                              <span style={{ color: 'whitesmoke', padding: '5px', fontSize: '17px' }}>{item.state_label}</span>
                            </CBadge>
                          </td>
                        ),

                      date_from:
                        (item) => (
                          <td>
                            {/* {
                              item.date_from.split(' ')[0]
                            } */}
                            <span >{item.date_from.split(' ')[0]}</span>
                          </td>
                        ),
                      date_to:
                        (item) => (
                          <td>
                            <span >{item.date_to.split(' ')[0]}</span>
                          </td>
                        ),
                      action: (item) => (


                        <td >

                          {/* {
                            item?.usr_per?.r && getdata === 'Super Admin' ? <Link
                              to={`/leave/view-leaveAllocation/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info' >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}

                            </Link> : ""
                          } */}

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/leave/edit-leaveAllocation/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-success' >
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
                                handleLeaveAllocationDelete(item.id)
                              }}
                              className='btn btn-sm btn-danger' >
                              <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                            </Link> : ""
                          }

                        </td>
                      ),
                    }}
                  />
                  {
                    items.length > 1 ? <CPagination
                      pages={pages}
                      activePage={page}
                      onActivePageChange={setPage}
                      className={pages < 2 ? 'd-none' : ''}
                    /> : ""
                  }
                </>
                {/* )} */}
              </CCardBody>
            </CCard>
          </CContainer>
        </CFade>
      )}


    </main>
  )
}

export default React.memo(LeaveAllocations)
