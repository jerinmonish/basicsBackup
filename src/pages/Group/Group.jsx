import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { GroupList } from './../../actions/master';
import { GroupAdd } from './../../actions/master';
import { GroupDelete } from './../../actions/master';
import { GroupDetails } from './../../actions/master';
import { GroupUpdate } from './../../actions/master';
import CLoader from '../loader/CLoader';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../utils/helper'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
const Group = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [openEditGroup, setOpenEditGroup] = useState(false)
  const groupData = useSelector(state => state.masterBackend);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [columnFilterValue, setColumnFilterValue] = useState();
  const [tableFilterValue, setTableFilterValue] = useState("");
  const [sorterValue, setSorterValue] = useState();
  const [ctFrom, setCtFrom] = useState(0);
  const [ctTo, setCtTo] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const [fetchTrigger, setFetchTrigger] = useState(0);

  const [feildValue, setFeildValue] = useState("");
  const [groupIndiDetails, setGroupIndiDetails] = useState(null);

  const params = {
    page,
    columnFilterValue: (columnFilterValue?.length > 0) ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: (sorterValue?.length > 0) ? JSON.stringify(sorterValue) : 0,
    itemsPerPage
  };
  const query = new URLSearchParams(params).toString();
  //useeffect for loading group list data
  // groupListDetails.data.rts
  // console.log("groupData", groupData?.groupListDetails?.data);
  useEffect(() => {
    setLoading(true);
    dispatch(GroupList(params));
  }, [query]);

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (groupData?.groupListDetails?.data?.result.length > 0) {
      setItems(groupData?.groupListDetails?.data?.result);
      setPages(groupData?.groupListDetails?.data?.total_pages);
      setItemsPerPage(itemsPerPage);
      setLoading(false);
      setCtFrom(groupData?.groupListDetails?.data?.from_count);
      setCtTo(groupData?.groupListDetails?.data?.to_count);
      setTotalCnt(groupData?.groupListDetails?.data?.total_count);
      //console.log(params);
    } else {
      setItems([])
      setLoading(false)
    }

    if (groupData?.groupDetails !== null) {
      groupUpdateFormik.setValues({ "group_name": groupData?.groupDetails?.name, "group_code": groupData?.groupDetails?.code });
      setGroupIndiDetails(groupData?.groupDetails);
    }
  }, [groupData?.groupListDetails?.data?.result, groupData?.groupDetails])

  //useEffect to reload data after deletion
  useEffect(() => {
    if (groupData?.isDeleted) {
      //console.log("Delte Call");
      dispatch(GroupList(params));
    }
  }, [groupData?.isDeleted]);

  //useeffect to hide/show modal for add group
  useEffect(() => {
    if (groupData?.isGALoading === false && groupData?.success === " group add success") {
      setOpenAddGroup(!openAddGroup);
      dispatch(GroupList(params));
    }
  }, [groupData?.isGALoading, groupData?.success]);

  //useeffect to hide/show modal for edit group
  useEffect(() => {
    if (groupData?.isGELoading === false && groupData?.success === " group update success") {
      setOpenEditGroup(!openEditGroup);
      dispatch(GroupList(params));
    }
  }, [groupData?.isGELoading, groupData?.success]);

  //Common Validation for both Add/Edit
  const validate = (values) => {
    const errors = {};
    if (!values.group_name) {
      errors.group_name = 'This field is required.';
    }

    if (!values.group_code) {
      errors.group_code = 'This field is required.';
    }
    return errors;
  };

  //Group Add Form Initilization
  const groupAddFormik = useFormik({
    initialValues: {
      group_name: '',
      group_code: '',
    },
    validate,
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": { "name": values.group_name, "code": values.group_code } } });
      dispatch(GroupAdd(formData));
      groupAddFormik.resetForm()
    },

  });

  //Method to delete group individual data
  // const handleGroupDelete = (gid) => {
  //   dispatch(GroupDelete(gid));
  // }

  //Method to get edit values for a group
  const handleGroupDetails = (gid) => {
    dispatch(GroupDetails(gid));
    setOpenEditGroup(!openEditGroup);
  }

  //Group Edit Form Initilization
  const groupUpdateFormik = useFormik({
    initialValues: {
      group_name: "",
      group_code: "",
    },
    validate,
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "data": { "name": values.group_name, "code": values.group_code, "id": groupData?.groupDetails?.id } } });
      dispatch(GroupUpdate(formData));
    },
  });

  const handleGroupDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(GroupDelete(gid))
      }
      history.push('/master/group')
    })
  }

  const handleResetform = () => {
    console.log("log");
    groupAddFormik.resetForm()
    setOpenAddGroup(!openAddGroup)
  }

  const handleOncloseResetform = () => {
    console.log("click");
    groupAddFormik.resetForm()
    setOpenAddGroup(!openAddGroup)
  }


  return (
    <main className="c-main">
      <ToastContainer />
      {
        ((params.tableFilterValue.length <= 0) && groupData?.isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> Group </strong>
                    </CCol>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" align="end">
                      {
                        groupData?.groupListDetails?.data?.rts?.c ?

                          <CButton color="primary" title='Add' onClick={() => setOpenAddGroup(!openAddGroup)} >Add</CButton> : ""
                      }

                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <div className='row'><div className='col-md-12 fontchange' style={{ textAlign: 'end' }}>Showing {ctFrom} to {ctTo} of {totalCnt} entries</div></div>
                  {/* {items.length > 0 &&(<> */}
                  <CDataTable
                    items={items}
                    fields={[{ key: "name", label: "Group Name", filter: false },
                    { key: "code", label: "Group Code", filter: false },
                    { key: "create_date", label: "Created At", filter: false },
                    { key: "action", label: "Actions", filter: false }]}
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
                    itemsPerPageSelect={{ label: 'Items per page:', values: [50, 100, 150, 200] }}
                    itemsPerPage={itemsPerPage}
                    onPaginationChange={setItemsPerPage}
                    scopedSlots={{
                      'action': (item) => (
                        <td>
                          {/* <Link
                              to={`${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-info'   >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> */}

                          {/* &nbsp;&nbsp; */}

                          {
                            item?.usr_per.u ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleGroupDetails(item.id)
                              }}
                              className='btn btn-sm btn-success' >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per.u ? <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleGroupDelete(item.id)
                              }}
                              className='btn btn-sm btn-danger'>
                              <FontAwesomeIcon icon={faTrash} title="Delete" />
                            </Link> : ""
                          }

                        </td>

                        // <td>
                        //   <Link to="#" onClick={() => handleGroupDetails(item.id)}><CIcon name="cil-pencil" /></Link>
                        //   <Link onClick={(e) => {
                        //             e.stopPropagation()
                        //             e.preventDefault()
                        //             handleGroupDelete(item.id)
                        //           }}><CIcon name="cil-trash" /></Link>

                        // </td>
                      )
                    }} />
                  <CPagination
                    pages={pages}
                    activePage={page}
                    onActivePageChange={setPage}
                    className={pages < 2 ? "d-none" : ""} />
                  {/* )} */}
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
      }

      {/* Group Add Form */}
      <CModal show={openAddGroup} onClose={handleOncloseResetform} size="lg" color="info">
        <CModalHeader title='Close' closeButton>
          <CModalTitle>Add Group</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CCardHeader>
      Horizontal
      <small> Form</small>
      </CCardHeader> */}
          {
            (groupData?.isGALoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={groupAddFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Group Name</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='group_name' value={
                        groupAddFormik.values.group_name}
                        placeholder="Group Name" maxLength={60} onChange={groupAddFormik.handleChange} title='Group Name' />
                      {groupAddFormik.errors.group_name ? <div className="help-block text-danger">{groupAddFormik.errors.group_name}</div> : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-password">Group Code</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='group_code' value={groupAddFormik.values.group_code} placeholder="Group Code" maxLength={10} onChange={groupAddFormik.handleChange} title='Group Code' />
                      {groupAddFormik.errors.group_code ? <div className="help-block text-danger">{groupAddFormik.errors.group_code}</div> : null}
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

      {/* Group Edit Popup */}
      <CModal show={openEditGroup} onClose={() => setOpenEditGroup(!openEditGroup)} size="lg" color="info">
        <CModalHeader title='Close' closeButton>
          <CModalTitle>Edit Group</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CCardHeader>
      Horizontal
      <small> Form</small>
      </CCardHeader> */}
          {
            (groupData?.isGELoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={groupUpdateFormik.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Group Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='group_name' value={groupUpdateFormik.values.group_name} placeholder="Group Name" maxLength={60} onChange={groupUpdateFormik.handleChange} title='Group Name' />
                      {groupUpdateFormik.errors.group_name ? <div className="help-block text-danger">{groupUpdateFormik.errors.group_name}</div> : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-password">Group Code</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" name='group_code' value={groupUpdateFormik.values.group_code} placeholder="Group Code" maxLength={10} onChange={groupUpdateFormik.handleChange} title='Group Code' />
                      {groupUpdateFormik.errors.group_code ? <div className="help-block text-danger">{groupUpdateFormik.errors.group_code}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                      <CButton type="reset" onClick={() => setOpenEditGroup(!openEditGroup)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
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

export default React.memo(Group)
