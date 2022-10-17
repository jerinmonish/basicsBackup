import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PaygradeList, PaygradeAPIDelete } from '../../../actions/configuration'
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
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const Paygrade = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const PayGradeData = useSelector((state) => state.configurationBackend)

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
  //useeffect for loading PaygradeList data
  useEffect(() => {
    setLoading(true)
    dispatch(PaygradeList(params))
  }, [query])

  //useEffect to set PaygradeList data and to update data for edit privielage
  useEffect(() => {
    if (PayGradeData?.payGradeListDetails?.data?.result.length > 0) {
      setItems(PayGradeData?.payGradeListDetails?.data?.result)
      setPages(PayGradeData?.payGradeListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(PayGradeData?.payGradeListDetails?.data?.from_count);
      setCtTo(PayGradeData?.payGradeListDetails?.data?.to_count);
      setTotalCnt(PayGradeData?.payGradeListDetails?.data?.total_count);
      // console.log(params)
    } else {
      setItems(0)
      setLoading(false)
    }
  })

  if (PayGradeData?.showToast) {
    let sMsg = ''
    if (PayGradeData?.success === 'PayGrade added success') {
      sMsg = 'Pay Grade Saved Successfully !'
    } else if (PayGradeData?.success === 'Paygrade update success') {
      sMsg = 'Pay Grade Updated Successfully !'
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


  const handleDesignationDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(PaygradeAPIDelete(gid))
      }

      history.push('/configuration/paygrade')
    })
  }

  useEffect(() => {
    // console.log("DesignationData",PayGradeData?.isDesignationDeleted);
    if (PayGradeData?.isPaygradeDeleted) {
      dispatch(PaygradeList(params))
    }
  }, [PayGradeData?.isPaygradeDeleted]);


  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        PayGradeData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Pay Grade </strong>
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
                      PayGradeData?.payGradeListDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/configuration/add-paygrade'}>
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
                      { key: 'name', label: 'Pay Grade', filter: false },
                      { key: 'pay_scale', label: 'Pay Scale', filter: false },
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
                              to={`/configuration/view-paygrade/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info'>
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/configuration/edit-paygrade/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn  btn-sm btn-success'>
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
                                handleDesignationDelete(item.id)
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

export default React.memo(Paygrade)
