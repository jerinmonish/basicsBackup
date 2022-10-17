import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FuntionList, FunctionDeleteAPI } from '../../actions/master'
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../utils/helper'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const Function = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const FunctionData = useSelector((state) => state.masterBackend)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [columnFilterValue, setColumnFilterValue] = useState()
  const [tableFilterValue, setTableFilterValue] = useState('')
  const [sorterValue, setSorterValue] = useState()
  const [fetchTrigger, setFetchTrigger] = useState(0)
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
    dispatch(FuntionList(params))
  }, [query])

  // console.log("FunctionData?.functionListDetails?.data", FunctionData?.functionListDetails?.data);
  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (FunctionData?.functionListDetails?.data?.result.length > 0) {
      setItems(FunctionData?.functionListDetails?.data?.result)
      setPages(FunctionData?.functionListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(FunctionData?.functionListDetails?.data?.from_count);
      setCtTo(FunctionData?.functionListDetails?.data?.to_count);
      setTotalCnt(FunctionData?.functionListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
    }

    //To Show Success Message
    if (FunctionData?.showToast) {
      let sMsg = ''
      if (FunctionData?.success === 'function add success') {
        sMsg = 'Function Saved Successfully  !'
      } else if (FunctionData?.success === 'function update success') {
        sMsg = 'Function Updated Successfully  !'
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
    FunctionData?.functionListDetails?.data?.result,
    FunctionData?.functionListDetails,
    FunctionData?.showToast,
    FunctionData?.success,
  ])

  const handleFunctionDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(FunctionDeleteAPI(gid))
      }
      history.push('/master/function')
    })
  }

  useEffect(() => {
    if (FunctionData?.isDeleted) {
      console.log("Delte Call");
      dispatch(FuntionList(params));
    }
  }, [FunctionData?.isDeleted]);

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        FunctionData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Function </strong>
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
                      FunctionData?.functionListDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'add-function'}>
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
                      { key: 'name', label: 'Function', filter: false },
                      { key: 'code', label: ' Function Code', filter: false },

                      { key: 'group_id_name', label: 'Group', filter: false },
                      { key: 'company_id_name', label: 'Company', filter: false },
                      { key: 'location_id_name', label: 'Location', filter: false },
                      { key: 'manager_id_name', label: 'Manager', filter: false },
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
                              to={`/master/view-function/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info' >
                              <FontAwesomeIcon icon={faEye} title="View" />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/master/edit-function/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-success' >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.d ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleFunctionDelete(item.id)
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

export default React.memo(Function)
