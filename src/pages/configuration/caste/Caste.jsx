import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import { CasteList, CasteAdd, CasteDetails, CasteUpdate, CasteAPIDelete } from '../../../actions/configuration'
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
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react'
const Caste = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const CasteData = useSelector((state) => state.configurationBackend)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openAddCaste, setOpenAddCaste] = useState(false)
  const [openEditCaste, setOpenEditCaste] = useState(false)
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

  const casteAddFormik = useFormik({
    initialValues: {
      name: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),

    }),
    onSubmit: values => {
      const formData = JSON.stringify({ params: { data: values } });
      dispatch(CasteAdd(formData));
    },
  });

  //caste Edit Form Initilization
  const casteUpdateFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),

    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": { "name": values.name, "id": CasteData?.casteIdDetails?.id } } });
      console.log("formData", formData);
      dispatch(CasteUpdate(formData));
    },
  });

  const query = new URLSearchParams(params).toString()
  //useeffect for loading group list data
  useEffect(() => {
    setLoading(true)
    dispatch(CasteList(params))
  }, [query])

  useEffect(() => {
    if (CasteData?.casteListDetails?.data?.result.length > 0) {
      setItems(CasteData?.casteListDetails?.data?.result)
      setPages(CasteData?.casteListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(CasteData?.casteListDetails?.data?.from_count);
      setCtTo(CasteData?.casteListDetails?.data?.to_count);
      setTotalCnt(CasteData?.casteListDetails?.data?.total_count);
      // console.log('if')
    }
    else {
      // console.log('else')
      setItems([])
      setLoading(false)
    }
  }, [CasteData?.casteListDetails?.data?.result])

  const handleCasteDelete = (otid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(CasteAPIDelete(otid))
      }
      history.push('/configuration/caste')
    })
  }

  // isCasteDeleted

  useEffect(() => {
    // console.log("CasteData?.isCasteDeleted", CasteData?.isCasteDeleted);
    // console.log("after delete");
    if (CasteData?.isCasteDeleted) {
      //console.log("Delte Call");
      dispatch(CasteList(params));
    }
  }, [CasteData?.isCasteDeleted]);




  //useeffect to hide/show modal for add group
  useEffect(() => {
    if (CasteData?.isCasteLoading === false && CasteData?.success === "caste added success") {

      casteAddFormik.resetForm()
      setOpenAddCaste(!openAddCaste);

      dispatch(CasteList(params));
      // console.log("params",params);
    }
  }, [CasteData?.isCasteLoading, CasteData?.success]);

  useEffect(() => {
    if (CasteData?.isCasteLoading === false && CasteData?.success === "caste update success") {

      setOpenEditCaste(!openEditCaste);
      dispatch(CasteList(params));
      // console.log("params",params);
    }
  }, [CasteData?.isCasteLoading, CasteData?.success]);


  const handleCasteIdDisplay = (cid) => {
    setOpenEditCaste(!openEditCaste);
    dispatch(CasteDetails(cid));
  }

  //To get update details and set it in popup
  useEffect(() => {
    //  console.log("casteIdDetails",CasteData?.casteIdDetails.name);
    if (CasteData?.casteIdDetails !== null && CasteData?.casteIdDetails != undefined) {
      casteUpdateFormik.setValues({ "name": CasteData?.casteIdDetails?.name });

    }
  }, [CasteData?.casteIdDetails])

  const handleResetform = () => {
    // console.log("log");
    casteAddFormik.resetForm()
    setOpenAddCaste(!openAddCaste)
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 && CasteData?.isCasteLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Caste </strong>
                  </CCol>
                  <CCol
                    col="6"
                    sm="4"
                    md="2"
                    xl
                    className="mb-3 mb-xl-0"
                    align="end"
                  >
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" align="end">
                      {
                        CasteData?.casteListDetails?.data?.rts?.c ? <CButton color="primary" onClick={() => setOpenAddCaste(!openAddCaste)}>Add</CButton> : ""
                      }

                    </CCol>
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
                      { key: 'name', label: 'Caste', filter: false },

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
                                handleCasteIdDisplay(item.id)
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
                                handleCasteDelete(item.id)
                              }}
                              className='btn btn-sm btn-danger' >
                              <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
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

      {/* caste Add Form */}
      <CModal show={openAddCaste} onClose={handleResetform} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Add Caste</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CCardHeader>
     Horizontal
     <small> Form</small>
     </CCardHeader> */}
          {
            (CasteData?.isCasteLoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={casteAddFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Caste Name</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput type="text" name='name' value={casteAddFormik.values.name} placeholder="Caste Name" maxLength={30} onChange={casteAddFormik.handleChange} title='Group Name' />
                      {casteAddFormik.touched.name && casteAddFormik.errors.name ? <div className="help-block text-danger">{casteAddFormik.errors.name}</div> : null}

                    </CCol>
                  </CFormGroup>

                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      <CButton type="reset" onClick={handleResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>

      {/* caste Edit Popup */}
      <CModal show={openEditCaste} onClose={() => setOpenEditCaste(!openEditCaste)} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Edit Caste</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CCardHeader>
     Horizontal
     <small> Form</small>
     </CCardHeader> */}
          {
            (CasteData?.isCasteLoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={casteUpdateFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Caste Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='name' value={casteUpdateFormik.values.name} placeholder="Caste Name" maxLength={60} onChange={casteUpdateFormik.handleChange} title='Caste Name' />
                      {casteUpdateFormik.errors.name ? <div className="help-block text-danger">{casteUpdateFormik.errors.name}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                      <CButton type="reset" onClick={() => setOpenEditCaste(!openEditCaste)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
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

export default React.memo(Caste)
