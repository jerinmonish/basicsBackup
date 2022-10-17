import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OrganizationList, OrganisationTypeAdd, OrganisationDelete, OrganizationDetails, OrganizationUpdate } from './../../../actions/configuration'
import CLoader from '../../loader/CLoader'
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
const OrganizationType = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const OrganizationListData = useSelector((state) => state.configurationBackend)
  // result[0].usr_per
  // console.log("OrganizationListData", OrganizationListData?.organizationlistDetails?.data?.result);
  // console.log("data", OrganizationListData?.organizationlistDetails?.data?.result.id);
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  // organizationlistDetails.data.rts
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [columnFilterValue, setColumnFilterValue] = useState()
  const [tableFilterValue, setTableFilterValue] = useState('')
  const [sorterValue, setSorterValue] = useState()
  const [ctFrom, setCtFrom] = useState(0);
  const [ctTo, setCtTo] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [openAddOrganisation, setopenAddOrganisation] = useState(false)
  const [openEditOrganisation, setOpenEditOrganisation] = useState(false)


  const params = {
    page,
    columnFilterValue: columnFilterValue?.length > 0 ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: sorterValue?.length > 0 ? JSON.stringify(sorterValue) : 0,
    itemsPerPage,
  }

  const query = new URLSearchParams(params).toString()
  //useeffect for loading organization list data
  useEffect(() => {
    setLoading(true)
    dispatch(OrganizationList(params))
  }, [query])

  //useEffect to set organization list data and to update data for edit privielage
  useEffect(() => {
    if (OrganizationListData?.organizationlistDetails?.data?.result.length > 0) {
      // usr_per
      setItems(OrganizationListData?.organizationlistDetails?.data?.result)
      // console.log("items", items.usr_per);
      setPages(OrganizationListData?.organizationlistDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(OrganizationListData?.organizationlistDetails?.data?.from_count);
      setCtTo(OrganizationListData?.organizationlistDetails?.data?.to_count);
      setTotalCnt(OrganizationListData?.organizationlistDetails?.data?.total_count);
    } else {
      console.log('else');
      setItems([])
      setLoading(false)
    }
  });

  // result.data.rts
  //To get update details and set it in popup
  useEffect(() => {
    if (OrganizationListData?.organizationDetails !== null) {

      organisationUpdateFormik.setValues({ "name": OrganizationListData?.organizationDetails?.name });
      // setGroupIndiDetails(OrganizationListData?.organizationDetails);
    }
  }, [OrganizationListData?.organizationDetails?.name])

  //Common Validation for both Add/Edit
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'This field is required.';
    }
    return errors;
  };

  //Organization Add Form Initilization
  const organisationAddFormik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": { "name": values.name } } });
      dispatch(OrganisationTypeAdd(formData));
    },
  });

  //Organization Edit Form Initilization
  const organisationUpdateFormik = useFormik({
    initialValues: {
      name: "",
    },
    validate,
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": { "name": values.name, "id": OrganizationListData?.organizationDetails?.id } } });
      dispatch(OrganizationUpdate(formData));
    },
  });

  //To Delete Organisation Type
  const handleOrganisationTypeDelete = (otid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(OrganisationDelete(otid))
      }
      history.push('/configuration/organizationType')
    })
  }

  //useeffect to hide/show modal for add organisation
  useEffect(() => {
    if (OrganizationListData?.isORGtypeLoading === false && OrganizationListData?.success === "organization add success") {
      setopenAddOrganisation(!openAddOrganisation)
      dispatch(OrganizationList(params));
    }
  }, [OrganizationListData?.isORGtypeLoading, OrganizationListData?.success]);


  //useeffect to hide/show modal for update organisation
  useEffect(() => {
    if (OrganizationListData?.isORGtypeLoading === false && OrganizationListData?.success === "organization update success") {
      setOpenEditOrganisation(!openEditOrganisation);
      dispatch(OrganizationList(params));
    }
  }, [OrganizationListData?.isORGtypeLoading, OrganizationListData?.success]);

  //useEffect to reload data after deletion
  useEffect(() => {
    if (OrganizationListData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(OrganizationList(params));
    }
  }, [OrganizationListData?.isDeleted]);

  const handleOrganizationDetails = (otid) => {
    setOpenEditOrganisation(!openEditOrganisation);
    dispatch(OrganizationDetails(otid));
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        OrganizationListData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Organization Type</strong>
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
                      OrganizationListData?.organizationlistDetails?.data?.rts.c ? <CButton color="primary" onClick={() => setopenAddOrganisation(!openAddOrganisation)}>
                        Add
                      </CButton> : ""
                    }

                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                {/* {items.length > 0 && ( */}
                <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                <>
                  <CDataTable
                    items={items}
                    fields={[
                      { key: 'name', label: 'Organization', filter: false },
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
                          {/* <Link
                              to={`${encryptSingleData(
                                item.id,
                              )}`}
                            >
                            
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> */}

                          {
                            item?.usr_per?.u ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleOrganizationDetails(item.id)
                              }}
                              className='btn  btn-sm btn-success' >

                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.d ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleOrganisationTypeDelete(item.id)
                              }}
                              className='btn btn-sm btn-danger' >
                              <FontAwesomeIcon icon={faTrash} title="Delete" />
                            </Link> : ''
                          }

                        </td>
                      ),
                    }}
                  />
                  {
                    items.length > 0 ? <CPagination
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
      {/* Group Add Form */}
      <CModal show={openAddOrganisation} onClose={() => setopenAddOrganisation(!openAddOrganisation)} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Add Organisation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            (OrganizationListData?.isORGtypeLoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={organisationAddFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Organization Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='name' value={organisationAddFormik.values.name} placeholder="Organization Type" maxLength={60} onChange={organisationAddFormik.handleChange} title='Group Name' />
                      {organisationAddFormik.errors.name ? <div className="help-block text-danger">{organisationAddFormik.errors.name}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                      <CButton type="reset" onClick={() => setopenAddOrganisation(!openAddOrganisation)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>

      {/* Group Edit Popup */}
      <CModal show={openEditOrganisation} onClose={() => setOpenEditOrganisation(!openEditOrganisation)} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Organization Type</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {
            (OrganizationListData?.isORGtypeLoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={organisationUpdateFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Organization Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='name' value={organisationUpdateFormik.values.name} placeholder="Organization Type" maxLength={60} onChange={organisationUpdateFormik.handleChange} title='Organization Type' />
                      {organisationUpdateFormik.errors.name ? <div className="help-block text-danger">{organisationUpdateFormik.errors.name}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                      <CButton type="reset" onClick={() => setOpenEditOrganisation(!openEditOrganisation)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
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

export default React.memo(OrganizationType)
