import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LeavingReasonList } from './../../../actions/configuration'
import CLoader from '../../loader/CLoader'
import { ToastContainer } from 'react-toastify'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const LeavingReason = () => {
  const dispatch = useDispatch()
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [openEditGroup, setOpenEditGroup] = useState(false)
  const LeavingReasonData = useSelector((state) => state.configurationBackend)

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
    dispatch(LeavingReasonList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (LeavingReasonData?.leavingreasonListDetails?.data?.result.length > 0) {
      setItems(LeavingReasonData?.leavingreasonListDetails?.data?.result)
      setPages(LeavingReasonData?.leavingreasonListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(LeavingReasonData?.leavingreasonListDetails?.data?.from_count);
      setCtTo(LeavingReasonData?.leavingreasonListDetails?.data?.to_count);
      setTotalCnt(LeavingReasonData?.leavingreasonListDetails?.data?.total_count);
      // console.log(params)
    }
    else {
      setItems([])
      setLoading(false)
    }
  }, [LeavingReasonData?.leavingreasonListDetails?.data?.result])

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        LeavingReasonData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Leaving Reason </strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    {/* <CButton
                      color="primary"
                      onClick={() => setOpenAddGroup(!openAddGroup)}
                    >
                      Add
                    </CButton> */}
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
                      { key: 'name', label: 'Leavel Reason', filter: false },
                      {
                        key: 'create_date',
                        label: 'Created At',
                        filter: false,
                      },
                      // { key: 'action', label: 'Actions', filter: false },
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
                          {/* <Link
                              to={`${encryptSingleData(
                                item.id,
                              )}`}
                            >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link>
                            &nbsp;&nbsp;
                            <Link
                              to={`${encryptSingleData(
                                item.id,
                              )}`}
                            >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />{' '}
                            </Link>
                            &nbsp;&nbsp;
                            <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                // handlelocationDelete(item.id)
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                            </Link> */}
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

export default React.memo(LeavingReason)
