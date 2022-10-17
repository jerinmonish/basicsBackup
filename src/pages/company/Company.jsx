import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompanyList, CompanyDelete } from './../../actions/master'
import CLoader from '../loader/CLoader'
import * as constants from '../../actions/types'
import { encryptSingleData } from '../../utils/helper'
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
// import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Company = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const companyData = useSelector((state) => state.masterBackend)
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

  const params = {
    page,
    columnFilterValue:
      columnFilterValue?.length > 0 ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: sorterValue?.length > 0 ? JSON.stringify(sorterValue) : 0,
    itemsPerPage,
  }
  const query = new URLSearchParams(params).toString()
  useEffect(() => {
    setLoading(true)
    dispatch(CompanyList(params))
  }, [query])
  // console.log("companyData?.companyListDetails?.data", companyData?.companyListDetails?.data?.rts?.c);
  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {

    // console.log('count', companyData?.companyListDetails?.data?.result.length);
    if (companyData?.companyListDetails?.data?.result.length > 0) {
      setItems(companyData?.companyListDetails?.data?.result)
      setPages(companyData?.companyListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(companyData?.companyListDetails?.data?.from_count);
      setCtTo(companyData?.companyListDetails?.data?.to_count);
      setTotalCnt(companyData?.companyListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
    }

    //To Show Success Message
    if (companyData?.showToast) {
      let sMsg = ''
      if (companyData?.success == 'company add success') {
        sMsg = 'Company Successfully Saved'
      } else if (companyData?.success == 'company update success') {
        sMsg = 'Company Successfully Updated'
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
  },
    [
      companyData?.companyListDetails?.data?.result,
      companyData?.showToast,
      companyData?.success,
    ]
  )

  //Method to delete company individual data
  // const handleCompanyDelete = (cid) => {
  //   dispatch(CompanyDelete(cid))
  // }
  // console.log("companyListDetails", companyData?.companyListDetails?.data);
  //useEffect to reload data after deletion
  useEffect(() => {
    if (companyData?.isDeleted) {
      dispatch(CompanyList(params))
    }
  }, [companyData?.isDeleted])

  const handleCompanyDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(CompanyDelete(gid))
      }
      history.push('/master/company')
    })
  }

  // params.tableFilterValue.length <= 0 &&
  // locationListData?.isLoading === true ? (
  return (
    <main className="c-main">
      <ToastContainer />
      {
        params.tableFilterValue.length <= 0 &&
          companyData?.iscmpyLoading === true ? (
          <CLoader />
        ) : (
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> Company </strong>
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
                        companyData?.companyListDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'add-company'}>
                          Add
                        </Link> : ""
                      }

                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                  {/* {items.length > 0 && ( */}
                  <><CDataTable
                    items={items}
                    fields={[
                      { key: 'name', label: 'Company', filter: false },
                      { key: 'group_id_name', label: 'Group', filter: false },
                      {
                        key: 'country_id_name',
                        label: 'Country',
                        filter: false
                      },
                      { key: 'state_id_name', label: 'State', filter: false },
                      {
                        key: 'payroll_cycle_label',
                        label: 'Payroll Cycle',
                        filter: false
                      },
                      {
                        key: 'create_date',
                        label: 'Created At',
                        filter: false
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
                      values: [50, 100, 150, 200]
                    }}
                    itemsPerPage={itemsPerPage}
                    onPaginationChange={setItemsPerPage}
                    scopedSlots={{
                      action: (item) => (
                        <td>
                          {item?.usr_per?.r ? <Link
                            to={`/master/view-company/${encryptSingleData(
                              item.id
                            )}`}
                            className='btn btn-sm btn-info'>
                            <FontAwesomeIcon icon={faEye} title="View" />
                          </Link> : ""}

                          &nbsp;&nbsp;
                          {item?.usr_per?.u ? <Link
                            to={`/master/edit-company/${encryptSingleData(
                              item.id
                            )}`}
                            className='btn  btn-sm btn-success'>
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                              title="Edit" />
                          </Link> : ""}

                          &nbsp;&nbsp;
                          {item?.usr_per?.d ? <Link
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              handleCompanyDelete(item.id)
                            }}
                            className='btn  btn-sm btn-danger'>
                            <FontAwesomeIcon icon={faTrash} title="Delete" />
                          </Link> : ""}

                        </td>
                      )
                    }} /><CPagination
                      pages={pages}
                      activePage={page}
                      onActivePageChange={setPage}
                      className={pages < 2 ? 'd-none' : ''} /></>
                  {/* )} */}
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
        )}
    </main>
  )
}

export default React.memo(Company)
