import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  CPagination,
  CDataTable,
  CBadge,
} from "@coreui/react";
import * as constants from "src/actions/types"
import { LeaveAccumulationListData, LeaveAccumulationDeleteData } from 'src/actions/leave'
import CLoader from '../../loader/CLoader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { encryptSingleData } from 'src/utils/helper';
import { useHistory } from 'react-router-dom'

const LeaveAccumulationList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const EmployeeData = useSelector((state) => state.masterBackend)
  const LeaveAccListData = useSelector((state) => state.leaveBackend)

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
    columnFilterValue: columnFilterValue?.length > 0 ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: sorterValue?.length > 0 ? JSON.stringify(sorterValue) : 0,
    itemsPerPage,
  }
  const query = new URLSearchParams(params).toString()
  //useeffect for loading group list data
  useEffect(() => {
    setLoading(true)
    dispatch(LeaveAccumulationListData(params))
  }, [query])

  useEffect(() => {
    if (LeaveAccListData?.isDeleted) {
      dispatch(LeaveAccumulationListData(params))
    }
  }, [LeaveAccListData?.isDeleted])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (LeaveAccListData?.leaveAccumulationListDetails?.data?.result.length > 0) {
      setItems(LeaveAccListData?.leaveAccumulationListDetails?.data?.result)
      setPages(LeaveAccListData?.leaveAccumulationListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(LeaveAccListData?.leaveAccumulationListDetails?.data?.from_count);
      setCtTo(LeaveAccListData?.leaveAccumulationListDetails?.data?.to_count);
      setTotalCnt(LeaveAccListData?.leaveAccumulationListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
      setPages(1);
    }

    //To Show Success Message
    // console.log(FunctionData);
    if (LeaveAccListData?.showToast) {
      let sMsg = '';
      if (LeaveAccListData?.success === "leave accumulation added success") {
        sMsg = 'Leave Carry Forward Saved Successfully  !';
      } else if (LeaveAccListData?.success === "leave accumulation update success") {
        sMsg = 'Leave Carry Forward Updated Successfully  !';
      } else if (LeaveAccListData?.success === "leave accumulation status update success") {
        sMsg = 'Leave Carry Forward Status Updated Successfully  !';
      }
      if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT
        });
        dispatch({
          type: constants.MESSAGE_CLEAR
        });
      }
    }
  }, [
    LeaveAccListData?.leaveAccumulationListDetails?.data?.result,
    LeaveAccListData?.leaveAccumulationListDetails,
  ]);

  const handleEmployeeDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(LeaveAccumulationDeleteData(gid))
      }
      history.push('/leave/accumulation')
    })
  }

  const getBadge = (items) => {
    // console.log(items);
    switch (items) {
      case 'Done': return 'badge badge-pill badge-success'
      case 'To Approve': return 'badge badge-pill badge-warning'
      case 'Draft': return 'badge badge-pill badge-info'
      case 'Refused': return 'badge badge-pill badge-danger  '
      case 'Canceled': return 'badge badge-pill badge-dark'
      // case 'Draft': return 'badge badge-pill badge-primary'
      default: return 'badge badge-pill black'
    }
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        LeaveAccListData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Leave Carry Forward </strong>
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
                      LeaveAccListData?.leaveAccumulationListDetails?.data?.rts?.c ? <Link className='btn btn-primary' to={'/leave/add-accumulation'}>Add</Link> : ""
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
                      { key: 'name', label: 'Description', filter: false },
                      { key: 'source_leave_type_id_name', label: 'Carry Over From', filter: false },
                      { key: 'dest_leave_type_id_name', label: 'Carry Over To', filter: false },
                      { key: 'create_date', label: 'Created On', filter: false },
                      { key: 'state_label', label: 'Status', filter: false },
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
                    itemsPerPage={itemsPerPage}
                    onPaginationChange={setItemsPerPage}
                    scopedSlots={{

                      state_label:
                        (item) => (
                          <td>
                            <CBadge color={getBadge(item.state_label)} style={{ width: '75%', height: '23px' }}>
                              <span style={{ color: 'whitesmoke', padding: '5px', fontSize: '17px' }}>{item.state_label}</span>
                            </CBadge>
                          </td>
                        ),
                      action: (item) => (

                        <td className='action-alignment'>
                          {/* {
                            item?.usr_per?.r ? <Link
                              to={`/leave/view-accumulation/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info'>
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> : ""
                          } */}

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/leave/edit-accumulation/${encryptSingleData(
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
                                handleEmployeeDelete(item.id)
                              }}
                              to={`/master/delete-employee/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-danger' >
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
    </main>
  );
};

export default LeaveAccumulationList;