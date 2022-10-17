import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { JobsList, JobsDelete } from './../../../actions/configuration'
import CLoader from '../../loader/CLoader'
import * as constants from '../../../actions/types'
import Swal from 'sweetalert2'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CFade,
  CPagination,
  CDataTable
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Jobs = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const JobsListData = useSelector((state) => state.configurationBackend)

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
  // const params = {
  //   page,
  //   columnFilterValue: columnFilterValue?.length > 0 ? JSON.stringify(columnFilterValue) : 0,
  //   tableFilterValue,
  //   sorterValue: sorterValue?.length > 0 ? JSON.stringify(sorterValue) : 0,
  //   itemsPerPage,
  // }
  const query = new URLSearchParams(params).toString()
  //useeffect for loading jobs list data
  useEffect(() => {
    setLoading(true)
    dispatch(JobsList(params))
  }, [query])

  //useEffect to set jobs list data and to update data for edit privielage
  // console.log(JobsListData?.jobslistDetails?.data?.rts.c, "JobsListData?.jobslistDetails?.data?");
  useEffect(() => {
    console.log('count', JobsListData?.jobslistDetails?.data?.result.length);
    if (JobsListData?.jobslistDetails?.data?.result.length > 0) {
      setItems(JobsListData?.jobslistDetails?.data?.result)
      setPages(JobsListData?.jobslistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(JobsListData?.jobslistDetails?.data?.from_count);
      setCtTo(JobsListData?.jobslistDetails?.data?.to_count);
      setTotalCnt(JobsListData?.jobslistDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
    }

    // To Show Success Message
    if (JobsListData?.showToast) {
      let sMsg = ''
      if (JobsListData?.success == 'job add success') {
        sMsg = 'Job Successfully Saved !'
      } else if (JobsListData?.success == 'job update success') {
        sMsg = 'Job Successfully Updated !'
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
  }, [JobsListData?.jobslistDetails?.data?.result, JobsListData?.showToast, JobsListData?.success]);


  //To Delete Organisation Type
  const handleJobsDelete = (otid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(JobsDelete(otid))
      }
      history.push('/configuration/jobs')
    })
  }

  //useEffect to reload data after deletion
  useEffect(() => {
    if (JobsListData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(JobsList(params));
    }
  }, [JobsListData?.isDeleted]);

  return (
    <main className="c-main">
      <ToastContainer />
      {
        ((params.tableFilterValue.length <= 0) && JobsListData?.isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong>Jobs</strong>
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
                        JobsListData?.jobslistDetails?.data?.rts.c ? <Link className="btn btn-primary" to={'/configuration/add-job'}>
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
                        { key: 'name', label: 'Job Name', filter: false },
                        { key: 'group_id_name', label: 'Group', filter: false },
                        { key: 'company_id_name', label: 'Company', filter: false },
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
                              item?.usr_per?.r ? <Link to={`/configuration/view-job/${encryptSingleData(item.id)}`} className='btn btn-sm btn-info' >
                                <FontAwesomeIcon icon={faEye} title="View" />
                              </Link> : ""
                            }

                            &nbsp;&nbsp;
                            {
                              item?.usr_per?.u ? <Link to={`/configuration/edit-job/${encryptSingleData(item.id)}`} className='btn  btn-sm btn-success'>
                                <FontAwesomeIcon icon={faPencilAlt} title="Edit" />
                              </Link> : ""
                            }

                            &nbsp;&nbsp;

                            {
                              item?.usr_per?.d ? <Link onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleJobsDelete(item.id) }} className='btn  btn-sm btn-danger'>
                                <FontAwesomeIcon icon={faTrash} title="Delete" />
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
      }
    </main>
  )
}

export default React.memo(Jobs)
