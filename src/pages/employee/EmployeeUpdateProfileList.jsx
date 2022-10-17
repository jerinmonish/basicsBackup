import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EmployeeProfileUpdateHistoryList, EmployeeDeletePersonalSelfAPI } from '../../actions/master'
import CLoader from '../loader/CLoader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from "../../actions/types"
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { encryptSingleData, decryptSingleData, userLocalDecryptData, convertValueLabel } from '../../utils/helper';
import { useHistory } from 'react-router-dom'
const EmployeeUpdateProfileList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const EmployeeData = useSelector((state) => state.masterBackend)
  const empData = userLocalDecryptData();
  console.log("empData", empData);

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
    eid: empData.employee_id
  }
  const query = new URLSearchParams(params).toString()

  //useeffect for loading group list data
  useEffect(() => {
    setLoading(true)
    dispatch(EmployeeProfileUpdateHistoryList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {

    console.log("EmployeeData?.empProfHistoryListDetails?.data?.result?", EmployeeData?.empProfHistoryListDetails?.data?.result);
    if (EmployeeData?.empProfHistoryListDetails?.data?.result?.length > 0) {
      setItems(EmployeeData?.empProfHistoryListDetails?.data?.result)
      setPages(EmployeeData?.empProfHistoryListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(EmployeeData?.empProfHistoryListDetails?.data?.from_count);
      setCtTo(EmployeeData?.empProfHistoryListDetails?.data?.to_count);
      setTotalCnt(EmployeeData?.empProfHistoryListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
      setPages(1)
    }

    //To Show Success Message
    if (EmployeeData?.showToast) {
      let sMsg = '';
      if (EmployeeData?.success === "employee add success") {
        sMsg = 'Employee Saved Successfully  !';
      } else if (EmployeeData?.success === "employee update success") {
        sMsg = 'Employee Updated Successfully  !';
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
  }, [EmployeeData?.success, EmployeeData?.showToast]);

  useEffect(() => {
    if (EmployeeData?.success === "employee delete success") {
      setLoading(true)
      dispatch(EmployeeProfileUpdateHistoryList(params))
    }
  }, [EmployeeData?.success])


  const handleEmployeeDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(EmployeeDeletePersonalSelfAPI(gid))
      }
      history.push('/employee/self-update-list')
    })
  }
  const getBadge = (items) => {
    switch (items) {
      case 'Approved': return 'badge badge-pill badge-success'
      case 'Draft': return 'badge badge-pill badge-warning'
      case 'Requested': return 'badge badge-pill badge-info'
      default: return 'badge badge-pill primary'
    }
  }
  return (
    <main className="c-main">
      {/* <div><ToastContainer /></div> */}
      {params.tableFilterValue.length <= 0 &&
        EmployeeData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Employee Self Update </strong>
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
                      EmployeeData?.empProfHistoryListDetails?.data?.create ?
                        <Link className='btn btn-primary' style={{ float: 'right' }} to={'/employee/self-update/' + encryptSingleData(empData.employee_id) + '/create'}>Update Existing Profile</Link>

                        : ""
                    }

                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <div className='row'><div className='col-md-12 fontchange ' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                {/* {items.length > 0 && ( */}
                <>
                  <CDataTable
                    items={items}
                    fields={[
                      { key: 'name', label: 'Employee Name', filter: false },
                      { key: 'status_label', label: 'Status', filter: false },
                      // { key: 'requested_date', label: 'Requested At', filter: false },
                      // { key: 'approved_date', label: 'Approved At', filter: false },
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
                      status_label:
                        (item) => (
                          <td>
                            <CBadge color={getBadge(item.status_label)} style={{ width: '70%', height: '23px' }}>
                              <span style={{ color: 'whitesmoke', padding: '5px', fontSize: '17px' }}>{item.status_label}</span>
                            </CBadge>
                          </td>
                        ),
                      action: (item) => (

                        <td className='action-alignment'>
                          {/* <Link
                              to={`/employee/view-employee/${encryptSingleData(
                                encryptSingleData(empData.employee_id),
                              )}`}
                              className='btn btn-sm btn-info'>
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> */}

                          &nbsp;&nbsp;
                          {
                            item?.rts?.write ? <Link
                              // to={`/employee/self-update/${encryptSingleData(empData.employee_id)`/edit`}`}
                              to={'/employee/self-update/' + encryptSingleData(item.id) + '/edit'}
                              className='btn btn-sm btn-success' >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />{' '}
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.rts?.delete ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleEmployeeDelete(item.id)
                              }}
                              to={`/`}
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
  )
}

export default React.memo(EmployeeUpdateProfileList)
