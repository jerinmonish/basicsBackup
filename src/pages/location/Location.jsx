import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LocationList, LocationDeleteAPI } from '../../actions/master'
import CLoader from '../loader/CLoader'
import * as constants from '../../actions/types'
import { ToastContainer, toast } from 'react-toastify'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../utils/helper'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
// import DatePicker from 'react-date-picker'
const Location = () => {
  const [value, onChange] = useState()
  const history = useHistory()
  const dispatch = useDispatch()
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [openEditGroup, setOpenEditGroup] = useState(false)
  const locationListData = useSelector((state) => state.masterBackend)
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
  const [fetchTrigger, setFetchTrigger] = useState(0)

  const [groupIndiDetails, setGroupIndiDetails] = useState(null)

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
    dispatch(LocationList(params))
  }, [query])

  // console.log("locationListData?.locationListDetails?.data?.result", locationListData?.locationListDetails?.data);
  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (locationListData?.locationListDetails?.data?.result.length > 0) {
      setItems(locationListData?.locationListDetails?.data?.result)
      setPages(locationListData?.locationListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(locationListData?.locationListDetails?.data?.from_count);
      setCtTo(locationListData?.locationListDetails?.data?.to_count);
      setTotalCnt(locationListData?.locationListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
    }

    //To Show Success Message
    if (locationListData?.showToast) {
      let sMsg = ''
      if (locationListData?.success === 'location add success') {
        sMsg = 'Location  Saved Successfully !'
      } else if (locationListData?.success === 'location update success') {
        sMsg = 'Location Updated Successfully !'
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
    locationListData?.locationListDetails?.data?.result,
    locationListData?.locationListDetails,
    locationListData?.showToast,
    locationListData?.success
  ])

  //useEffect to reload data after deletion
  useEffect(() => {
    if (locationListData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(LocationList(params))
    }
  }, [locationListData?.isDeleted])

  //Method to delete location individual data
  // const handlelocationDelete = (gid) => {
  //   dispatch(LocationDeleteAPI(gid))
  // }

  const handlelocationDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(LocationDeleteAPI(gid))
      }
      history.push('/master/location')
    })
  }

  return (
    <>
      <main className="c-main">
        {/* <ToastContainer containerId="an id"/> */}
        {
          params.tableFilterValue.length <= 0 &&
            locationListData?.isLoading === true ? (
            <CLoader />
          ) : (
            <CFade>
              <CContainer fluid>
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol col="6" className="left">
                        <strong> Location </strong>
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
                          locationListData?.locationListDetails?.data?.rts.c ? <Link className="btn btn-primary" to={'add-location'}>
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

                          { key: 'name', label: 'Location', filter: false },
                          {
                            key: 'industry_type_id_name',
                            label: 'Type of Industry',
                            filter: false,
                          },
                          {
                            key: 'company_id_name',
                            label: 'Company',
                            filter: false,
                          },
                          {
                            key: 'group_id_name',
                            label: 'Group',
                            filter: false,
                          },
                          // {
                          //   key: 'industry_type_id_name',
                          //   label: 'Industry Type',
                          //   filter: false,
                          // },
                          {
                            key: 'cost_center_id_name',
                            label: 'Cost Center',
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
                            <td className='action-alignment'>
                              {
                                item?.usr_per?.r ? <Link
                                  to={`/master/view-location/${encryptSingleData(
                                    item.id,
                                  )}`}
                                  className='btn btn-sm btn-info' >
                                  <FontAwesomeIcon icon={faEye} title="View" />{' '}
                                </Link> : ""
                              }

                              &nbsp;&nbsp;
                              {
                                item?.usr_per?.u ? <Link
                                  to={`/master/edit-location/${encryptSingleData(
                                    item.id,
                                  )}`}
                                  className='btn  btn-sm btn-success' >
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
                                    handlelocationDelete(item.id)
                                  }}
                                  className='btn btn-sm btn-danger'  >
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
    </>
  )
}

export default React.memo(Location)
