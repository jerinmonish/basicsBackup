import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BankList, BankAddAPI, BankDisplayAPI, BankUpdateAPI, BankAPIDelete } from '../../../actions/configuration'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react'
const Bank = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const BankData = useSelector((state) => state.configurationBackend)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [columnFilterValue, setColumnFilterValue] = useState()
  const [tableFilterValue, setTableFilterValue] = useState([])
  const [sorterValue, setSorterValue] = useState()
  const [openAddBank, setOpenAddBank] = useState(false)
  const [openEditBank, setOpenEditBank] = useState(false)
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
  //useeffect for loading bank list data
  useEffect(() => {
    setLoading(true)
    dispatch(BankList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    console.log("result", BankData?.bankListDetails?.data?.result);
    if (BankData?.bankListDetails?.data?.result?.length > 0) {

      setItems(BankData?.bankListDetails?.data?.result)
      setPages(BankData?.bankListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(BankData?.bankListDetails?.data?.from_count);
      setCtTo(BankData?.bankListDetails?.data?.to_count);
      setTotalCnt(BankData?.bankListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
    }
  }, [BankData?.bankListDetails?.data?.result]);

  const bankAddFormik = useFormik({
    initialValues: {
      name: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),

    }),
    onSubmit: values => {
      const formData = JSON.stringify({ params: { data: values } });
      dispatch(BankAddAPI(formData));
    },
  });

  //useeffect to hide/show modal for add group
  useEffect(() => {
    if (BankData?.isbankLoading === false && BankData?.success === "Bank added success") {

      setOpenAddBank(!openAddBank);
      dispatch(BankList(params));
      // console.log("params",params);
    }
  }, [BankData?.isbankLoading, BankData?.success]);


  const handleBankIdDisplay = (cid) => {
    setOpenEditBank(!openEditBank);
    dispatch(BankDisplayAPI(cid));
  }

  useEffect(() => {
    //  console.log("casteIdDetails",CasteData?.casteIdDetails.name);
    if (BankData?.bankIdDisplayData !== null) {
      bankUpdateFormik.setValues({ "name": BankData?.bankIdDisplayData?.name });

    }
  }, [BankData?.bankIdDisplayData])

  //caste Edit Form Initilization
  const bankUpdateFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),

    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": { "name": values.name, "id": BankData?.bankIdDisplayData?.id } } });
      // console.log("formData",formData);
      dispatch(BankUpdateAPI(formData));
    },
  });



  useEffect(() => {
    if (BankData?.isbankLoading === false && BankData?.success === "bank update success") {

      setOpenEditBank(!openEditBank);
      dispatch(BankList(params));
      // console.log("params",params);
    }
  }, [BankData?.isbankLoading, BankData?.success]);


  const handleBankDelete = (otid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(BankAPIDelete(otid))
      }
      history.push('/configuration/bank')
    })
  }

  useEffect(() => {
    if (BankData?.isBankDeleted) {
      //console.log("Delte Call");
      dispatch(BankList(params));
    }
  }, [BankData?.isBankDeleted]);

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length < 0 && BankData?.isbankLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Bank </strong>
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
                      BankData?.bankListDetails?.data?.rts?.c ? <CButton
                        color="primary"
                        onClick={() => setOpenAddBank(!openAddBank)}
                      >
                        Add
                      </CButton> : ""
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
                      { key: 'name', label: 'Bank', filter: false },
                      {
                        key: 'create_date',
                        label: 'Created At',
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
                            item?.usr_per?.u ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleBankIdDisplay(item.id)
                              }}
                              className='btn btn-sm btn-success' >
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
                                handleBankDelete(item.id)
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


      {/* caste Add Form */}
      <CModal show={openAddBank} onClose={() => setOpenAddBank(!openAddBank)} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Add Bank</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CCardHeader>
     Horizontal
     <small> Form</small>
     </CCardHeader> */}
          {
            (BankData?.isGALoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={bankAddFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Bank Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput type="text" name='name' value={bankAddFormik.values.name} placeholder="Bank Name" maxLength={60} onChange={bankAddFormik.handleChange} title='Bank Name' />
                      {bankAddFormik.touched.name && bankAddFormik.errors.name ? <div className="help-block text-danger">{bankAddFormik.errors.name}</div> : null}

                    </CCol>
                  </CFormGroup>

                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      <CButton type="reset" onClick={() => setOpenAddBank(!openAddBank)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>

      {/* caste Edit Popup */}
      <CModal show={openEditBank} onClose={() => setOpenEditBank(!openEditBank)} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Edit Bank</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CCardHeader>
     Horizontal
     <small> Form</small>
     </CCardHeader> */}
          {
            (BankData?.isbankLoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={bankUpdateFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Bank Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='name' value={bankUpdateFormik.values.name} placeholder="Ban Name" maxLength={60} onChange={bankUpdateFormik.handleChange} title='Bank Name' />
                      {bankUpdateFormik.errors.name ? <div className="help-block text-danger">{bankUpdateFormik.errors.name}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                      <CButton type="reset" onClick={() => setOpenEditBank(!openEditBank)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>



    </main>
  )
}

export default React.memo(Bank)
