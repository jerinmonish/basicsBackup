import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LeaveTypesList, LeaveTypesAPIDelete } from '../../../actions/leave'
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
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
} from '@coreui/react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'

const LeaveTypes = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const LeaveTypesData = useSelector((state) => state.leaveBackend)

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
    dispatch(LeaveTypesList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    // console.log("LeaveTypesData", LeaveTypesData?.leaveTypeslistDetails);
    if (LeaveTypesData?.leaveTypeslistDetails?.data?.result.length > 0) {
      setItems(LeaveTypesData?.leaveTypeslistDetails?.data?.result)
      setPages(LeaveTypesData?.leaveTypeslistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(LeaveTypesData?.leaveTypeslistDetails?.data?.from_count);
      setCtTo(LeaveTypesData?.leaveTypeslistDetails?.data?.to_count);
      setTotalCnt(LeaveTypesData?.leaveTypeslistDetails?.data?.total_count);
      //   console.log(params)
    }
    else {
      setItems([])
      setLoading(false)
    }
  }, [LeaveTypesData?.leaveTypeslistDetails?.data?.result])


  if (LeaveTypesData?.showToast) {
    let sMsg = ''
    if (LeaveTypesData?.success === 'leavetypes added success') {
      sMsg = 'Leave Type  Saved Successfully !'
    } else if (LeaveTypesData?.success === 'LeaveType update success') {
      sMsg = 'Leave Type Updated Successfully !'
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

  const handleLeaveTypesDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(LeaveTypesAPIDelete(gid))
        dispatch(LeaveTypesList())
      }

      history.push('/leave/LeaveTypes')
    })
  }

  useEffect(() => {
    // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
    if (LeaveTypesData?.isleaveTypesDeleted) {
      dispatch(LeaveTypesList())
    }
  }, [LeaveTypesData?.isleaveTypesDeleted]);



  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        LeaveTypesData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Leave Types </strong>
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
                      LeaveTypesData?.leaveTypeslistDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/leave/add-leaveTypes'}>
                        Add
                      </Link> : ""
                    }
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                {/* {items.length > 0 && ( */}
                <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                <>
                  <CDataTable
                    items={items}
                    fields={[
                      { key: 'name', label: 'Leave Types', filter: false },
                      { key: 'request_unit_label', label: ' Take Leave In', filter: false },

                      { key: 'validity_start', label: 'From', filter: false },
                      { key: 'validity_stop', label: 'To', filter: false },
                      { key: 'company_id_name', label: 'Company', filter: false },

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
                      action: (item) => (
                        <td>
                          {
                            item?.usr_per?.r ? <Link
                              to={`/leave/view-leaveTypes/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info' >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}

                            </Link> : ""
                          }


                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/leave/edit-leaveTypes/${encryptSingleData(
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
                                handleLeaveTypesDelete(item.id)
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

export default React.memo(LeaveTypes)
