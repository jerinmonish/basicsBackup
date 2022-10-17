import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CostcenterList, CostCenterDeleteAPI } from './../../../actions/configuration'
import CLoader from '../../loader/CLoader'
import { useHistory } from 'react-router-dom'
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
import Swal from 'sweetalert2'
import * as constants from '../../../actions/types'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const Costcenter = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const CostCenterData = useSelector((state) => state.configurationBackend)
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
    dispatch(CostcenterList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  // console.log("CostCenterData?.costCenterListDetails?.data", CostCenterData?.costCenterListDetails?.data);
  useEffect(() => {
    if (CostCenterData?.costCenterListDetails?.data?.result.length > 0) {
      setItems(CostCenterData?.costCenterListDetails?.data?.result)
      setPages(CostCenterData?.costCenterListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(CostCenterData?.costCenterListDetails?.data?.from_count);
      setCtTo(CostCenterData?.costCenterListDetails?.data?.to_count);
      setTotalCnt(CostCenterData?.costCenterListDetails?.data?.total_count);
      // console.log(CostCenterData)
    }
    else {
      setItems([])
      setLoading(false)
    }
  })

  if (CostCenterData?.showToast) {
    let sMsg = ''
    if (CostCenterData?.success === 'Costcenter added success') {
      sMsg = 'Cost Center Saved Successfully  !'
    } else if (CostCenterData?.success === 'Costcenter update success') {
      sMsg = 'Cost Center Updated Successfully  !'
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

  const handleCostCenterDelete = (otid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(CostCenterDeleteAPI(otid))
      }
      history.push('/configuration/CostCenter')
    })
  }

  //useEffect to reload data after deletion
  useEffect(() => {
    if (CostCenterData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(CostcenterList(params));
    }
  }, [CostCenterData?.isDeleted]);

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        CostCenterData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Cost Center </strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    {/* {
                      CostCenterData?.costCenterListDetails?.data?.rts.c ? <Link className="btn btn-primary" to={'/configuration/add-costcenter'}>
                        Add
                      </Link> : ""
                    } */}

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
                      { key: 'name', label: 'Cost Center', filter: false },
                      {
                        key: 'group_id_name',
                        label: 'Group Name ',
                        filter: false,
                      },
                      {
                        key: 'company_id_name',
                        label: 'Company Name ',
                        filter: false,
                      },
                      {
                        key: 'location_id_name',
                        label: 'Location ',
                        filter: false,
                      },
                      {
                        key: 'department_id_name',
                        label: 'Function ',
                        filter: false,
                      },
                      {
                        key: 'sub_function_id_name',
                        label: 'Sub-Function',
                        filter: false,
                      },
                      {
                        key: 'short_name',
                        label: 'Short Name',
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
                        // /configuration/view-costcenter/:id
                        <td className='action-alignment'>
                          {
                            item?.usr_per?.r ? <Link
                              to={`/configuration/view-costcenter/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info'>
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/configuration/edit-costcenter/${encryptSingleData(
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
                                handleCostCenterDelete(item.id)
                              }}
                              className='btn  btn-sm btn-danger'>
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

export default React.memo(Costcenter)
