import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserList, UserAPIDelete } from '../../../actions/administration'
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { ToastContainer } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'
import CIcon from '@coreui/icons-react'
const User = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userlistData = useSelector((state) => state.administrationBackend)

  // console.log("userlistData",userlistData);
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openAddDesignation, setOpenAddDesignation] = useState(false)
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
    dispatch(UserList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    // console.log("userlistData",userlistData);
    if (userlistData?.userlistDetails?.data?.result.length > 0) {
      setItems(userlistData?.userlistDetails?.data?.result)
      setPages(userlistData?.userlistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(userlistData?.userlistDetails?.data?.from_count);
      setCtTo(userlistData?.userlistDetails?.data?.to_count);
      setTotalCnt(userlistData?.userlistDetails?.data?.total_count);
      //   console.log(params)
    }
    else {
      setItems([])
      setLoading(false)
    }
  }, [userlistData?.userlistDetails?.data?.result])


  if (userlistData?.showToast) {
    let sMsg = ''
    if (userlistData?.success === 'User added success') {
      sMsg = 'User Successfully Saved !'
    } else if (userlistData?.success === 'User update success') {
      sMsg = 'User Successfully Updated !'
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

  const handleUserDelete = (gid) => {
    // console.log("gid",gid);
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(UserAPIDelete(gid))
      }

      history.push('/administration/user')
    })
  }

  useEffect(() => {
    //   console.log("DesignationData",userlistData?.isDesignationDeleted);
    if (userlistData?.isUserDeleted) {
      dispatch(UserList(params))
    }
  }, [userlistData?.isUserDeleted]);



  return (
    <main className="c-main">

      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        userlistData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Users </strong>
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
                      userlistData?.userlistDetails?.data?.rts?.c ? <Link className="btn btn-primary flotfirefox" to={'/administration/add-user'}>
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
                      { key: 'name', label: 'Name', filter: false },
                      { key: 'email', label: 'Email', filter: false },
                      { key: 'login', label: 'User', filter: false },
                      { key: 'mobile', label: 'Mobile Number', filter: false },
                      { key: 'company_id_name', label: 'Company Name', filter: false },
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
                    itemsPerPage={itemsPerPage}
                    onPaginationChange={setItemsPerPage}
                    scopedSlots={{
                      action: (item) => (
                        <td>
                          {/* {
                            item?.usr_per?.r ? <Link
                              to={`/administration/view-user/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn  btn-sm btn-info' >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> : ""
                          } */}

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/administration/edit-user/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm  btn-success' >
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
                                handleUserDelete(item.id)
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

export default React.memo(User)
