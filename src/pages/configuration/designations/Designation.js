import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DesignationList,DesignationAPIDelete } from '../../../actions/configuration'
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
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
import { toast } from 'react-toastify'
import * as constants from '../../../actions/types'
import 'react-toastify/dist/ReactToastify.css'
const Designation = () => {
  const dispatch = useDispatch()
  const history=useHistory()
  const DesignationData = useSelector((state) => state.configurationBackend)

  // console.log("DesignationData",DesignationData);
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openAddDesignation, setOpenAddDesignation] = useState(false)
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
    dispatch(DesignationList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    // console.log("DesignationData",DesignationData);
    if (DesignationData?.designationListDetails?.data?.result.length > 0) {
      setItems(DesignationData?.designationListDetails?.data?.result)
      setPages(DesignationData?.designationListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(DesignationData?.designationListDetails?.data?.from_count);
      setCtTo(DesignationData?.designationListDetails?.data?.to_count);
      setTotalCnt(DesignationData?.designationListDetails?.data?.total_count);
      // console.log(params)
    } else {
      setItems([])
      setLoading(false)
    }


  },[DesignationData?.designationListDetails?.data?.result])
 
    if (DesignationData?.showToast) {
      let sMsg = ''
      if (DesignationData?.success === 'Designation added success') {
        sMsg = 'Designation Successfully Saved !'
      } else if (DesignationData?.success === 'Designation update success') {
        sMsg = 'Designation Successfully Updated !'
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
          dispatch(DesignationAPIDelete(gid))
        }
        
        history.push('/configuration/designation')
      })
    }
  
    useEffect(() => {
      // console.log("DesignationData",DesignationData?.isDesignationDeleted);
      if(DesignationData?.isDesignationDeleted){
        dispatch(DesignationList(params))
      }
    },[DesignationData?.isDesignationDeleted]);
 


  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
      DesignationData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Designation </strong>
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
                        DesignationData?.designationListDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/configuration/add-designation'}>
                      Add
                    </Link> :""
                      }
                     
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <div className='row'><div className='col-md-12 fontchange' style={{textAlign:'end'}}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                {/* {items.length > 0 && ( */}
                  <>
                    <CDataTable
                      items={items}
                      fields={[
                        { key: 'name', label: 'Designation', filter: false },
                        { key: 'salary_grade_id_name', label: 'Salary Grade Name', filter: false },
                        { key: 'code', label: 'Code', filter: false },
                        // {
                        //   key: 'create_date',
                        //   label: 'Created At',
                        //   filter: false,
                        // },
                         { key: 'action', label: 'Actions', filter: false },
                      ]}
                      loading={loading}
                      hover
                      cleaner
                      columnFilter={{ external: true }}
                      columnFilterValue={columnFilterValue}
                        onColumnFilterChange={setColumnFilterValue}
                         tableFilter={{ label: 'Filter:', external: true, placeholder: "Type string ..." }}
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
                          {/* <Link
                            to={`/master/view-location/${encryptSingleData(
                              item.id,
                            )}`}
                          >
                            <FontAwesomeIcon icon={faEye} title="View" />{' '}
                          </Link> */}
                         
                            {
                              item?.usr_per?.u ?<Link
                            to={`/configuration/edit-designation/${encryptSingleData(
                              item.id,
                            )}`}
                           className='btn  btn-sm btn-success'>
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                              title="Edit"
                            />{' '}
                          </Link> :""
                            }
                          
                            &nbsp;&nbsp;
                            {
                              item?.usr_per?.d ? <Link
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              handleDesignationDelete(item.id)
                            }}
                          className='btn btn-sm btn-danger'>
                            <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                          </Link>:""
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

export default React.memo(Designation)
