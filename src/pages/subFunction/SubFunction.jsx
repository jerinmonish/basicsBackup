import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SubFunctionList, SubfunctionDeleteAPI } from '../../actions/master'
import CLoader from '../loader/CLoader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from '../../actions/types'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../utils/helper'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const SubFunction = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const subFunctionData = useSelector((state) => state.masterBackend)

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
    dispatch(SubFunctionList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  // console.log("subFunctionData?.subfunctionListDetails?.data", subFunctionData?.subfunctionListDetails?.data?.rts.c);
  useEffect(() => {
    if (subFunctionData?.subfunctionListDetails?.data?.result.length > 0) {
      setItems(subFunctionData?.subfunctionListDetails?.data?.result)
      setPages(subFunctionData?.subfunctionListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(subFunctionData?.subfunctionListDetails?.data?.from_count);
      setCtTo(subFunctionData?.subfunctionListDetails?.data?.to_count);
      setTotalCnt(subFunctionData?.subfunctionListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
    }

    //To Show Success Message
    if (subFunctionData?.showToast) {
      let sMsg = ''
      if (subFunctionData?.success === 'sub function add success') {
        sMsg = 'Sub Function Successfully Saved !'
      } else if (subFunctionData?.success === 'sub function update success') {
        sMsg = 'Sub Function Successfully Updated !'
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

  }, [
    subFunctionData?.subfunctionListDetails?.data?.result,
    subFunctionData?.subfunctionListDetails,
    subFunctionData?.showToast,
    subFunctionData?.success,
  ])

  //useEffect to reload data after deletion
  useEffect(() => {
    if (subFunctionData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(SubFunctionList(params))
    }
  }, [subFunctionData?.isDeleted])


  const handleSubfunctionDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(SubfunctionDeleteAPI(gid))
      }
      history.push('/master/subFunction')
    })
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        subFunctionData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Sub Function </strong>
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
                      subFunctionData?.subfunctionListDetails?.data?.rts.c ? <Link
                        className="btn btn-primary" to={'/master/add-subFunction'}>
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
                      { key: 'name', label: 'Sub Function', filter: false },
                      { key: 'code', label: 'Sub Function Code', filter: false },
                      { key: 'parent_id_name', label: 'Function', filter: false },
                      {
                        key: 'create_date',
                        label: 'Created At',
                        filter: false,
                      },
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

                          {
                            item?.usr_per?.r ? <Link
                              to={`/master/view-subfunction/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info' >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/master/edit-subFunction/${encryptSingleData(
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
                                handleSubfunctionDelete(item.id)
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
                    items.length > 1 ?
                      <CPagination
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

export default React.memo(SubFunction)
