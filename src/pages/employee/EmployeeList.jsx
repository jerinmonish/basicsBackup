import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { EmployeeUserList, EmployeeDeleteAPI, EmployeeExportAPI, EmployeeImportAPI } from '../../actions/master'
import { EmployeeExportListValAPI } from '../../actions/administration'
import CLoader from '../loader/CLoader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as constants from "../../actions/types"
import mfile from "../../exfiles/Import.csv"
import * as Yup from 'yup'
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
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CInput,
  CCardFooter,
  CButton,
} from '@coreui/react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { encryptSingleData } from '../../utils/helper';
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik';
import Select from "react-select";
const EmployeeList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const EmployeeData = useSelector((state) => state.masterBackend)
  const adminiData = useSelector((state) => state.administrationBackend)
  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [openAddGroup, setOpenAddGroup] = useState(false)
  const [openExportGroup, setOpenExportGroup] = useState(false)

  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(5)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [columnFilterValue, setColumnFilterValue] = useState()
  const [tableFilterValue, setTableFilterValue] = useState('')
  const [sorterValue, setSorterValue] = useState()
  const [ctFrom, setCtFrom] = useState(0);
  const [ctTo, setCtTo] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  //Image state data
  const [iptExlFile, setIptExlFile] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [fpushData, setFpushData] = useState([]);
  const [fpushUserData, setFpushUserData] = useState([]);

  const [importCOptions, setImportCOptions] = useState([{ value: 'basic', label: 'Basic' }, { value: 'family', label: 'Family' }, { value: 'bank', label: 'Bank' }, { value: 'education', label: 'Education' }, { value: 'work_experience', label: 'Work Experience' }]);

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
    dispatch(EmployeeUserList(params))
  }, [query])

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (EmployeeData?.employeeListDetails?.data?.result.length > 0) {
      var smp = EmployeeData?.employeeListDetails?.data?.result.map((v) => {
        return { ...v, selected: false };
      });
      // console.log(EmployeeData?.employeeListDetails?.data?.result);
      setItems(smp)
      setPages(EmployeeData?.employeeListDetails?.data?.total_pages)
      setItemsPerPage(itemsPerPage)
      setLoading(false)
      setCtFrom(EmployeeData?.employeeListDetails?.data?.from_count);
      setCtTo(EmployeeData?.employeeListDetails?.data?.to_count);
      setTotalCnt(EmployeeData?.employeeListDetails?.data?.total_count);
    } else {
      setItems([])
      setLoading(false)
      setPages(1)
    }

    //To Show Success Message
    // console.log(FunctionData);
    if (EmployeeData?.showToast) {
      let sMsg = '';
      if (EmployeeData?.success === "employee add success") {
        sMsg = 'Employee Saved Successfully  !';
      } else if (EmployeeData?.success === "function update success") {
        sMsg = 'Function Updated Successfully  !';
      }
      if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT
        });
        dispatch({
          type: constants.MESSAGE_CLEAR
        });
      }
    }

    if (EmployeeData?.success === "Employee export success") {
      window.open(EmployeeData?.empExportData?.url);
    }

    if (EmployeeData?.success === "Employee import success") {
      toast.success("Employee has been imported !", { position: toast.POSITION.TOP_RIGHT });
    }

  }, [
    EmployeeData?.employeeListDetails?.data?.result,
    EmployeeData?.employeeListDetails,
    EmployeeData?.success
  ]);

  //useeffect to hide/show modal for import employee
  useEffect(() => {
    if (EmployeeData?.isImpLoading === false && EmployeeData?.success === "Employee import success") {
      setOpenAddGroup(!openAddGroup)
      dispatch(EmployeeUserList(params));
    }
  }, [EmployeeData?.isImpLoading, EmployeeData?.success]);

  const handleEmployeeDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(EmployeeDeleteAPI(gid))

      }
      //  window.location.reload(false)
      history.push('/employee/employee')
    })
  }


  const onMasterCheck = (e) => {
    let tempList = items;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    setSelectAll(e.target.checked);
  }

  const onItemCheck = (e, item) => {
    let tempList = items;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = tempList.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    setSelectAll(totalItems === totalCheckedItems)
    setItems([...tempList]);
  }

  const getCheckChkVal = () => {
    var cheData = [];
    items.map((user) => {
      // console.log(user.selected, user.id);
      if (user.selected) {
        cheData.push(parseInt(user.id));
      }
    });
    setFpushUserData(cheData);
    const sendGpparams = {
      params: {
        model: "hr.employee",
        fields: "[{'name': 'name', 'label': 'Name'},{'name': 'work_email', 'label': 'Work Email'},{'name': 'work_phone', 'label': 'Work Phone'},{'name': 'group_id', 'label': 'Group'},{'name': 'company_id', 'label': 'Company'},{'name': 'location_id', 'label': 'Location'},{'name': 'department_id', 'label': 'Function'},{'name': 'sub_function_id', 'label': 'Sub Function'},{'name': 'employee_id', 'label': 'Employee ID'},{'name': 'is_eligible_for_ot', 'label': 'Eligible for OT'},{'name': 'gender', 'label': 'Gender'},{'name': 'birthday', 'label': 'Birthday'},{'name': 'training_duration', 'label': 'Training Duration'},{'name': 'training_complete_date', 'label': 'Training Complete Date'},{'name': 'skill_ids', 'label': 'Skills'}]",
        ids: cheData
      },
    }

    const chkQuery = {
      params: {
        query: "{field_id,name}",
        isDropdown: 1,
        filter: "[['api_filter_id.model_id.model', '=', 'hr.employee']]",
        order: "sequence asc"
      },
    }

    if (cheData.length > 0) {
      setOpenExportGroup(!openExportGroup)
      dispatch(EmployeeExportListValAPI(chkQuery));
      // dispatch(EmployeeExportAPI(sendGpparams));
    } else {
      toast.error("Kindly choose some records to export !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  //Group Add Form Initilization
  const empImportP = useFormik({
    initialValues: {
      fupload: '',
      type:'',
    },
    validationSchema: Yup.object({
      fupload: Yup.string().required('This field is required'),
      type: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({ "params": { "file": values.fupload, "type": values.type } });
      dispatch(EmployeeImportAPI(formData));
      empImportP.resetForm()
    },

  });

  const handleResetform = () => {
    empImportP.resetForm()
    setOpenAddGroup(!openAddGroup)
  }

  const handleResetform2 = () => {
    empImportP.resetForm()
    setOpenExportGroup(!openExportGroup)
  }

  const handleOncloseResetform = () => {
    empImportP.resetForm()
    setOpenAddGroup(!openAddGroup)
  }

  const handleOncloseResetform2 = () => {
    empImportP.resetForm()
    setOpenExportGroup(!openExportGroup)
  }

  const handleIptExlUpload = (i) => {
    let files = i.target.files;
    if (files.length > 0) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        setIptExlFile({
          selectedImage: empImportP.setFieldValue("fupload", event.target.result),
        })
      }
    }
  }

  const handleExportCheckUValue = (e) => {
    let smp = [];
    if(e.target.checked == true){
      fpushData.push(parseInt(e.target.value));
    } else {
      fpushData.pop(parseInt(e.target.value));
    }
    setFpushData(fpushData);
  }

  const exportFinalExport = () => {
    if(fpushData.length > 0){
      setOpenExportGroup(!openExportGroup)
      const sendGpparams1 = {
        params: {
            model: "hr.employee",
            ids: fpushUserData,
            field_ids: fpushData,
            education: 1,
            family: 1,
            work_experience: 1,
            bank: 1
        }
      }
      
      dispatch(EmployeeExportAPI(sendGpparams1));
    } else {
      toast.error("Kindly choose some records to export !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  const handleTypeChange = (e) => {
    if(e.value){
      empImportP.setFieldValue("type", e.value)
    }
  }

  return (
    <main className="c-main">
      <ToastContainer />
      {params.tableFilterValue.length <= 0 &&
        EmployeeData?.isLoading === true ? (
        <CLoader />
      ) : (
        <CFade>
          <CContainer fluid>
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol col="6" className="left">
                    <strong> Employee </strong>
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
                      EmployeeData?.employeeListDetails?.data?.rts?.c ? <Link className='btn btn-primary' to={'/employee/add-employee'}>Add</Link> : ""
                    }

                    &nbsp;&nbsp;<button className='btn btn-primary' onClick={getCheckChkVal}>Export</button>
                    &nbsp;&nbsp;<button className='btn btn-primary' onClick={() => setOpenAddGroup(!openAddGroup)}>Import</button>

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
                      { key: 'listchk', label: <><CFormGroup variant="custom-checkbox" inline id=''><CInputCheckbox custom id="is_check_Btn" name="is_check_Btn" onChange={(e) => onMasterCheck(e)} /><CLabel variant="custom-checkbox" htmlFor="is_check_Btn"></CLabel></CFormGroup></>, filter: false },
                      { key: 'name', label: 'Employee Name', filter: false },
                      { key: 'employee_id', label: 'Employee Id', filter: false },
                      { key: 'work_email', label: 'Work Email', filter: false },
                      { key: 'mobile_phone', label: 'Mobile', filter: false },
                      { key: 'designation_id_name', label: 'Designation', filter: false },
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

                        <td className=''>
                          {
                            item?.usr_per?.r ? <Link
                              to={`/employee/view-employee/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-info'>
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link> : ""
                          }

                          &nbsp;&nbsp;
                          {
                            item?.usr_per?.u ? <Link
                              to={`/employee/edit-employee/${encryptSingleData(
                                item.id,
                              )}`}
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
                                handleEmployeeDelete(item.id)
                              }}
                              to={`/master/delete-employee/${encryptSingleData(
                                item.id,
                              )}`}
                              className='btn btn-sm btn-danger' >
                              <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                            </Link> : ""
                          }

                        </td>

                      ),
                      listchk: (item) => (
                        <td className='action-alignment'>
                          <CFormGroup variant="custom-checkbox" inline id=''>
                            <CInputCheckbox custom id={`${item.id}`} name={`emplList_${item.id}`} checked={item.selected} onChange={e => onItemCheck(e, item)} />
                            <CLabel variant="custom-checkbox" htmlFor={`${item.id}`}></CLabel>
                          </CFormGroup>
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

      {/* Import Employee Form */}
      <CModal show={openAddGroup} onClose={handleOncloseResetform} size="lg" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Import Employee</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {
            (EmployeeData?.isImpLoading === true) ? 'Loading Please Wait...' :
              <CForm onSubmit={empImportP.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    <CCol xs="12" md="9">
                      This is a <b><a href={mfile}>Sample File</a></b> to import employee, kindly download and update in similar formats. And also it accepts .csv and .xlx alone.
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">Import Type</CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={'Choose a Import Type'}
                        // value={marriageStatus}
                        name="type"
                        options={importCOptions}
                        onChange={(e) => handleTypeChange(e)}
                        onBlur={empImportP.handleBlur}
                      />
                      {empImportP.errors.type ? <div className="help-block text-danger">{empImportP.errors.type}</div> : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="hf-email">File to Import </CLabel><span className="error"> *</span>
                    </CCol>
                    <CCol xs="12" md="9">
                      <input type="file" name="fupload" onChange={(event) => { handleIptExlUpload(event) }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                      {empImportP.errors.fupload ? <div className="help-block text-danger">{empImportP.errors.fupload}</div> : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Upload</CButton>
                      <CButton type="reset" onClick={handleResetform} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CForm>
          }
        </CModalBody>
      </CModal>

      {/* Export Column Form */}
      <CModal show={openExportGroup} onClose={handleOncloseResetform2} size="xl" color="info">
        <CModalHeader closeButton>
          <CModalTitle>Export Employee</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {
            (EmployeeData?.isLoading === true || EmployeeData?.isImpChkLoading === true ) ? 'Loading Please Wait...' :
              <CForm onSubmit={empImportP.handleSubmit} className="form-horizontal">
                <CCardBody>
                  <CFormGroup row>
                    {/* <CCol md="3">
                      <CLabel htmlFor="hf-email">File to Import </CLabel><span className="error"> *</span>
                    </CCol> */}
                      {
                        adminiData?.columnNameChk?.data?.result.length > 0 ? 
                        adminiData?.columnNameChk?.data?.result.map((va, idx) => {
                          return <CFormGroup className={'col-md-2'} variant="custom-checkbox" inline id={"is_export_chk_Div"+idx} key={"is_export_chk_Div"+idx}><input type="checkbox" className="custom-control-input" id={"is_export_chk_Btn_"+idx} name={"is_export_chk_Btn_"+idx} value={va.value} onChange={(e) => handleExportCheckUValue(e)}/><CLabel variant="custom-checkbox" htmlFor={"is_export_chk_Btn_"+idx}>{va.label}</CLabel></CFormGroup>
                        })
                        : ''
                      }
                  </CFormGroup>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol className='col-md-10' align="center" >
                      <CButton type="button" size="md" color="primary" onClick={exportFinalExport}><CIcon name="cil-scrubber" /> Export</CButton>
                      <CButton type="reset" onClick={handleResetform2} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
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

export default React.memo(EmployeeList)
