import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { JobPositionList, JobPostionDelete } from './../../../actions/configuration'
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
const JobPosition = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const JobsPostionListData = useSelector((state) => state.configurationBackend)

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
    columnFilterValue: columnFilterValue?.length > 0 ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: sorterValue?.length > 0 ? JSON.stringify(sorterValue) : 0,
    itemsPerPage,
  }
  const query = new URLSearchParams(params).toString()
  //useeffect for loading jobs list data
  useEffect(() => {
    setLoading(true)
    dispatch(JobPositionList(params))
  }, [query])

  //useEffect to set jobs list data and to update data for edit privielage
  console.log("JobsPostionListData", JobsPostionListData?.jobspostionlistDetails?.data);
  useEffect(() => {
    if (JobsPostionListData?.jobspostionlistDetails?.data?.result.length > 0) {
      setItems(JobsPostionListData?.jobspostionlistDetails?.data?.result)
      setPages(JobsPostionListData?.jobspostionlistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(JobsPostionListData?.jobspostionlistDetails?.data?.from_count);
      setCtTo(JobsPostionListData?.jobspostionlistDetails?.data?.to_count);
      setTotalCnt(JobsPostionListData?.jobspostionlistDetails?.data?.total_count);
    }
    else {
      console.log('else in job');
      setItems([])
      setLoading(false)
    }

    //To Show Success Message
    if (JobsPostionListData?.showToast) {
      let sMsg = ''
      if (JobsPostionListData?.success === 'job postion add success') {
        sMsg = 'Job Position Successfully Saved !'
      } else if (JobsPostionListData?.success === 'job postion update success') {
        sMsg = 'Job Position Successfully Updated !'
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
  }, [JobsPostionListData?.jobspostionlistDetails?.data?.result, JobsPostionListData?.showToast, JobsPostionListData?.success,]);


  //To Delete Organisation Type
  const handleJobPositionDelete = (otid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(JobPostionDelete(otid))
      }
      history.push('/configuration/job-position')
    })
  }

  //useEffect to reload data after deletion
  useEffect(() => {
    if (JobsPostionListData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(JobPositionList(params));
    }
  }, [JobsPostionListData?.isDeleted]);

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        JobsPostionListData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong>Job Position</strong>
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
                      JobsPostionListData?.jobspostionlistDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/configuration/add-job-position'}>
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
                      { key: 'name', label: 'Job Code', filter: false },
                      { key: 'job_id_name', label: 'Job Title', filter: false },
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
                            item?.usr_per?.r ? <Link to={`/configuration/view-job-position/${encryptSingleData(item.id)}`} className='btn btn-sm btn-info'>
                              <FontAwesomeIcon icon={faEye} title="View" />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link to={`/configuration/edit-job-position/${encryptSingleData(item.id)}`} className='btn btn-sm btn-success' >
                              <FontAwesomeIcon icon={faPencilAlt} title="Edit" />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.d ? <Link onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleJobPositionDelete(item.id) }} className='btn btn-sm btn-danger'>
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
      )}
    </main>
  )
}

export default React.memo(JobPosition)
