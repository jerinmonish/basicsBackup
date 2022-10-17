import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CusMenuList, JobPostionDelete } from './../../../actions/configuration'
import CLoader from '../../loader/CLoader'
import { useFormik } from 'formik';
import * as constants from '../../../actions/types'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CContainer,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CPagination,
  CDataTable,
  CCardFooter,
  CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
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
  const menuListData = useSelector((state) => state.configurationBackend)

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
    dispatch(CusMenuList(params))
  }, [query])

  //useEffect to set jobs list data and to update data for edit privielage
  useEffect(() => {
    if (menuListData?.menulistDetails?.data?.result.length > 0) {
      setItems(menuListData?.menulistDetails?.data?.result)
      setPages(menuListData?.menulistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(menuListData?.menulistDetails?.data?.from_count);
      setCtTo(menuListData?.menulistDetails?.data?.to_count);
      setTotalCnt(menuListData?.menulistDetails?.data?.total_count);
    }
    else {
      setItems([])
      setLoading(false)
    }

    //To Show Success Message
    if (menuListData?.showToast) {
      let sMsg = ''
      if (menuListData?.success === 'menu add success') {
        sMsg = 'Menu Successfully Saved !'
      } else if (menuListData?.success === 'menu update success') {
        sMsg = 'Menu Successfully Updated !'
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
  }, [menuListData?.menulistDetails?.data?.result, menuListData?.showToast, menuListData?.success,]);


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
    if (menuListData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(CusMenuList(params));
    }
  }, [menuListData?.isDeleted]);

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        menuListData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong>Menu</strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    {/* <Link className="btn btn-primary" to={'/configuration/add-job-position'}>
                      Add
                    </Link> */}
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
                      { key: 'name', label: 'Menu', filter: false },
                      { key: 'complete_name', label: 'Path', filter: false },
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
                          {/* <Link to={`/configuration/view-job-position/${encryptSingleData(item.id)}`}>
                              <FontAwesomeIcon icon={faEye} title="View" />
                            </Link> */}
                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link to={`/configuration/edit-cus-menu/${encryptSingleData(item.id)}`} className='btn btn-sm btn-success' >
                              <FontAwesomeIcon icon={faPencilAlt} title="Edit" />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {/* <Link onClick={(e) => { e.stopPropagation();e.preventDefault();handleJobPositionDelete(item.id)} }>
                              <FontAwesomeIcon icon={faTrash} title="Delete" />
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

export default React.memo(JobPosition)
