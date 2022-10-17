import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BloodGroupList } from './../../../actions/configuration'
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
const BloodGroup = () => {
  const dispatch = useDispatch()

  const BloodGroupData = useSelector((state) => state.configurationBackend)

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
    dispatch(BloodGroupList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (BloodGroupData?.bloodgroupListDetails?.data?.result.length > 0) {
      setItems(BloodGroupData?.bloodgroupListDetails?.data?.result)
      setPages(BloodGroupData?.bloodgroupListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(BloodGroupData?.bloodgroupListDetails?.data?.from_count);
      setCtTo(BloodGroupData?.bloodgroupListDetails?.data?.to_count);
      setTotalCnt(BloodGroupData?.bloodgroupListDetails?.data?.total_count);
      // console.log(params)
    }
    else {
      setItems([])
      setLoading(false)
    }


  }, [BloodGroupData?.bloodgroupListDetails?.data?.result])


  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        BloodGroupData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Blood Group </strong>
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
                      { key: 'name', label: 'Blood Group', filter: false },
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

export default React.memo(BloodGroup)
