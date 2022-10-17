import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CRow,
  CForm,
  CCardFooter,
  CCol,
  CCardHeader,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CDataTable,
} from "@coreui/react";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AddBankDetails, BankList, BankEditDetails, EmployeeBankUpdate, EmployeeBankDelete } from 'src/actions/configuration';
import { CommonCountryList, CommonStateList, CommonDistrictList } from './../../../actions/commonAction';
import { convertValueLabel } from '../../../utils/helper'
import "react-dates/initialize";
import 'react-toastify/dist/ReactToastify.css'
import * as constants from "src/actions/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { ViewEmployeeByIdAPI } from 'src/actions/master';
import CLoader from 'src/pages/loader/CLoader';
const Tab5 = (props) => {
  const dispatch = useDispatch();
  const configurationData = useSelector((state) => state.configurationBackend)
  const { employeeViewDetails, isLoading } = useSelector((state) => state.masterBackend);
  const dropdownData = useSelector(state => state.commonData);

  const [openPopGroup, setOpenPopGroup] = useState(false)
  const [accTypesOptions, setAccTypesOptions] = useState([{ value: 'current', label: 'Current' }, { value: 'saving', label: 'Saving' }, { value: 'salary', label: 'Salary' }, { value: 'fixed_deposit', label: 'Fixed Deposit' }, { value: 'recurring_deposit', label: 'Recurring Deposit' }]);
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const countryOptions = dropdownData?.countryCommonData?.data?.result;


  // update
  const [openPopbankupdate, setOpenPopbankUpdate] = useState(false)

  const [accountType, setAccountType] = useState([])

  const [bank, setBank] = useState([])

  const [countryname, setCountryName] = useState([])
  const [statename, setStateName] = useState([])
  const [districtname, setDistrictName] = useState([])

  useEffect(() => {
    if (dropdownData?.districtCommonData?.data?.result) {
      onDistrictClear();
      setDistrictOptions(dropdownData?.districtCommonData?.data?.result)
    }
  }, [dropdownData?.districtCommonData?.data?.result, districtOptions]);

  useEffect(() => {
    if (dropdownData?.stateCommonData?.data?.result) {
      onClear();
      setStateOptions(dropdownData?.stateCommonData?.data?.result)
    }
  }, [dropdownData?.stateCommonData?.data?.result, stateOptions]);

  useEffect(() => {
    //To Show Success Message
    if (configurationData?.showToast) {
      let sMsg = ''
      if (configurationData?.success === 'bank add success') {
        sMsg = 'Bank Details Successfully Saved !'
        setOpenPopGroup(!openPopGroup)
      } else if (configurationData?.success === 'bank update success') {
        sMsg = 'Employee Bank Details Updated !'
        setOpenPopbankUpdate(!openPopbankupdate)
      }
      /*if (sMsg.length > 0) {
        toast.success(sMsg, {
          position: toast.POSITION.TOP_RIGHT,
        })
        dispatch({
          type: constants.MESSAGE_CLEAR,
        })
      }*/
    }
  }, [configurationData?.success, configurationData?.showToast]);


  const Tab5Formik = useFormik({
    initialValues: {
      acc_holder_name: '',
      acc_number: '',
      account_type: '',
      bank_id: '',
      bank_branch: '',
      ifsc_code: '',
      door_no: '',
      house_name: '',
      street_name: '',
      place_name: '',
      country_id: '',
      state_id: '',
      district_id: '',
      pin_code: '',
      employee_id: '',
    },
    validationSchema: Yup.object().shape({
      acc_holder_name: Yup.string().required('This field is required'),
      acc_number: Yup.number().typeError('Kindly Enter Number only ').required('This field is required'),
      account_type: Yup.string().required('This field is required'),
      bank_id: Yup.string().required('This field is required'),
      bank_branch: Yup.string().required('This field is required'),
      ifsc_code: Yup.string().required('This field is required'),
      door_no: Yup.number().typeError('Kindly Enter Number only ').required('This field is required'),
      house_name: Yup.string().required('This field is required'),
      street_name: Yup.string().required('This field is required'),
      place_name: Yup.string().required('This field is required'),
      country_id: Yup.string().required('This field is required'),
      state_id: Yup.string().required('This field is required'),
      district_id: Yup.string().required('This field is required'),
      pin_code: Yup.number().typeError('Kindly Enter Number only ').required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })

      dispatch(AddBankDetails(formData))
    },
  });

  const handleAccountTypeChange = (e) => {
    if (e?.value) {
      Tab5Formik.setFieldValue('account_type', e?.value);
      Tab5Formik.setFieldValue('employee_id', props.dataId);
      setAccountType(convertValueLabel(e?.value, e?.label))
    }
  }
  const handleBankChange = (e) => {
    if (e?.value) {
      Tab5Formik.setFieldValue('bank_id', e?.value);
      setBank(convertValueLabel(e?.value, e?.label))
    }
  }

  const selectStateRef = useRef();
  const selectDistrictRef = useRef();
  const onClear = () => {
    selectStateRef.current.select.clearValue();
  };
  const onDistrictClear = () => {
    selectDistrictRef.current.select.clearValue();
  };

  const handleCountryChange = (e) => {
    if (e?.value) {
      onDistrictClear();
      dispatch(CommonStateList(e.value));
      Tab5Formik.setFieldValue('country_id', e.value);
    }
  }

  const handleStateChange = (e) => {
    if (e?.value) {
      Tab5Formik.setFieldValue('state_id', e?.value);
      dispatch(CommonDistrictList(e.value));
    }
  }

  const handleDistrictChange = (e) => {
    if (e?.value) {
      Tab5Formik.setFieldValue('district_id', e.value);
    }
  }

  // edit 
  //Method to get edit values for a woexp
  const handleBankAccountDetails = (gid) => {
    dispatch(BankEditDetails(gid));
    setOpenPopbankUpdate(!openPopbankupdate)
  }

  useEffect(() => {
    if (configurationData?.bid?.data && configurationData?.success === 'bank add success') {
      Tab5Formik.resetForm();
      props?.dataEdit?.data?.bank_account_ids.push({
        "acc_holder_name": Tab5Formik?.values.acc_holder_name,
        "acc_number": Tab5Formik?.values.acc_number,
        "account_type_label": accountType?.label,
        "bank_id_name": bank?.label,
        "bank_branch": Tab5Formik?.values.bank_branch,
        "ifsc_code": Tab5Formik?.values.ifsc_code,
        "id": configurationData?.bid?.data
      });
    }

  }, [configurationData?.bid?.data, props?.dataEdit?.data?.bank_account_ids, configurationData?.success])


  useEffect(() => {
    if (configurationData?.EmployeeBanktDetails !== null) {
      Tab5UpdateFormik.setValues({
        "employee_id": props.dataId,
        "id": configurationData?.EmployeeBanktDetails?.id,
        "acc_holder_name": configurationData?.EmployeeBanktDetails?.acc_holder_name,
        "acc_number": configurationData?.EmployeeBanktDetails?.acc_number,
        "account_type": configurationData?.EmployeeBanktDetails?.account_type,
        "bank_id": configurationData?.EmployeeBanktDetails?.bank_id,
        "bank_branch": configurationData?.EmployeeBanktDetails?.bank_branch,
        "ifsc_code": configurationData?.EmployeeBanktDetails?.ifsc_code,
        "door_no": configurationData?.EmployeeBanktDetails?.door_no,
        "house_name": configurationData?.EmployeeBanktDetails?.house_name,
        "street_name": configurationData?.EmployeeBanktDetails?.street_name,
        "place_name": configurationData?.EmployeeBanktDetails?.place_name,
        "country_id": configurationData?.EmployeeBanktDetails?.country_id,
        "state_id": configurationData?.EmployeeBanktDetails?.state_id,
        "district_id": configurationData?.EmployeeBanktDetails?.district_id,
        "pin_code": configurationData?.EmployeeBanktDetails?.pin_code,

      });
      if (configurationData?.EmployeeBanktDetails?.account_type) {
        setAccountType(convertValueLabel(configurationData?.EmployeeBanktDetails?.account_type, configurationData?.EmployeeBanktDetails?.account_type_label));
      }
      if (configurationData?.EmployeeBanktDetails?.bank_name) {
        setBank(convertValueLabel(configurationData?.EmployeeBanktDetails?.bank_name, configurationData?.EmployeeBanktDetails?.bank_name));
      }
      if (configurationData?.EmployeeBanktDetails?.country_id) {
        setCountryName(convertValueLabel(configurationData?.EmployeeBanktDetails?.country_id, configurationData?.EmployeeBanktDetails?.country_id_name));
      }
      if (configurationData?.EmployeeBanktDetails?.state_id) {
        setStateName(convertValueLabel(configurationData?.EmployeeBanktDetails?.state_id, configurationData?.EmployeeBanktDetails?.state_id_name));
      }
      if (configurationData?.EmployeeBanktDetails?.district_id) {
        setDistrictName(convertValueLabel(configurationData?.EmployeeBanktDetails?.district_id, configurationData?.EmployeeBanktDetails?.district_id_name));

      }
    }
  }, [configurationData?.EmployeeBanktDetails]);


  const handleAccountTypeChangeUpdate = (e) => {
    if (e?.value) {
      Tab5UpdateFormik.setFieldValue('account_type', e?.value);
      setAccountType(convertValueLabel(e?.value, e?.label))
      Tab5UpdateFormik.setFieldValue('employee_id', props.dataId);
    }
  }

  const handleBankChangeUpdate = (e) => {
    if (e?.value) {
      Tab5UpdateFormik.setFieldValue('bank_id', e?.value);
      setBank(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleCountryChangeUpdate = (e) => {
    if (e?.value) {
      onDistrictClear();
      dispatch(CommonStateList(e.value));
      Tab5UpdateFormik.setFieldValue('country_id', e.value);
      setCountryName(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleStateChangeUpdate = (e) => {
    if (e?.value) {
      Tab5UpdateFormik.setFieldValue('state_id', e?.value);
      dispatch(CommonDistrictList(e.value));
      setStateName(convertValueLabel(e?.value, e?.label))
    }
  }

  const handleDistrictChangeUpdate = (e) => {
    if (e?.value) {
      Tab5UpdateFormik.setFieldValue('district_id', e.value);
      setDistrictName(convertValueLabel(e?.value, e?.label))
    }
  }

  const Tab5UpdateFormik = useFormik({
    initialValues: {
      acc_holder_name: '',
      acc_number: '',
      account_type: '',
      bank_id: '',
      bank_branch: '',
      ifsc_code: '',
      door_no: '',
      house_name: '',
      street_name: '',
      place_name: '',
      country_id: '',
      state_id: '',
      district_id: '',
      pin_code: '',
      employee_id: ''
    },
    validationSchema: Yup.object().shape({
      acc_holder_name: Yup.string().required('This field is required'),
      acc_number: Yup.number().typeError('Kindly Enter Number only ').required('This field is required'),
      account_type: Yup.string().required('This field is required'),
      bank_id: Yup.string().required('This field is required'),
      bank_branch: Yup.string().required('This field is required'),
      ifsc_code: Yup.string().required('This field is required'),
      door_no: Yup.number().typeError('Kindly Enter Number only ').required('This field is required'),
      house_name: Yup.string().required('This field is required'),
      street_name: Yup.string().required('This field is required'),
      place_name: Yup.string().required('This field is required'),
      country_id: Yup.string().required('This field is required'),
      state_id: Yup.string().required('This field is required'),
      district_id: Yup.string().required('This field is required'),
      pin_code: Yup.number().typeError('Kindly Enter Number only ').required('This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } })
      dispatch(EmployeeBankUpdate(formData))
    },
  });


  //delete 
  const handleEmployeeBankDelete = (gid) => {
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.value === true) {
        dispatch(EmployeeBankDelete(gid));
        // props?.dataEdit?.data?.bank_account_ids?.filter((bankId) => console.log(bankId.id !== gid))
      }
    })
  }

  useEffect(() => {
    if (configurationData?.isEmployeeBankDeleted) {
      dispatch(ViewEmployeeByIdAPI(props.dataId));
    }
    if (configurationData?.isEmpBankUpdated) {
      dispatch(ViewEmployeeByIdAPI(props.dataId));
    }
    const queryparams = {
      params: {
        query: '{id,name}',
        isDropdown: 1,
      },
    }
    dispatch(BankList(queryparams));
    dispatch(CommonCountryList());
    dispatch({
      type: constants.MESSAGE_CLEAR,
    })
  }, [configurationData?.isEmployeeBankDeleted, configurationData?.isEmpBankUpdated])

  return (
    <>
      <CCard className="mb-4">
        {
          (isLoading === true) ? <CLoader /> :
            <CCardBody>
              <div className="form-horizontal">
                <div>
                  <CCard className="mb-4">
                    <CCardHeader id="headingTwo " className="header">
                      <div className=''>
                        <h5 className="m-0 p-0">Bank Account Details </h5>

                      </div>
                      <div className="">
                        <CButton className={'float-right'} color="primary" onClick={() => setOpenPopGroup(!openPopGroup)}>Add</CButton>

                      </div>
                    </CCardHeader>
                    <CCardBody>
                      <div className="row">
                        <CDataTable
                          items={props?.dataEdit?.data?.bank_account_ids}
                          fields={[{ key: "acc_holder_name", label: "Account Holder Name" }, { key: "acc_number", label: "Account Number" }, { key: "account_type_label", label: "Account Type" }, { key: "bank_id_name", label: "Bank" }, { key: "bank_branch", label: "Bank Branch" }, { key: "ifsc_code", label: "IFSC Code" }, { key: 'action', label: 'Actions', filter: false }]}
                          hover
                          striped
                          bordered
                          // size="sm"
                          scopedSlots={{
                            action: (items) => (
                              <td>
                                <Link onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleBankAccountDetails(items.id) }} style={{ color: 'white' }} className='btn btn-success btn-sm'>
                                  <FontAwesomeIcon icon={faPencilAlt} title="Edit" />{' '}
                                </Link>

                                <Link onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleEmployeeBankDelete(items.id) }} style={{ color: 'white' }} className='btn btn-danger ml-2 btn-sm'>
                                  <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                                </Link>
                              </td>
                            ),
                          }}
                        />
                      </div>
                    </CCardBody>
                  </CCard>
                  {/* Group Add Form */}
                  <CModal show={openPopGroup} onClose={() => setOpenPopGroup(!openPopGroup)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Add Bank Detail</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isEmpBankLoading === true) ? 'Loading Please Wait...' :
                          <CForm onSubmit={Tab5Formik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Account Holder Name</label>
                                    <div className="">
                                      <input type="text" name={`acc_holder_name`} className="form-control" placeholder='Account Holder Name' maxLength={20} onChange={Tab5Formik.handleChange} onBlur={Tab5Formik.handleBlur} value={Tab5Formik.values.acc_holder_name} />
                                      {Tab5Formik.errors.acc_holder_name && Tab5Formik.touched.acc_holder_name ? <div className="help-block text-danger">{Tab5Formik.errors.acc_holder_name}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Account Number <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`acc_number`} className="form-control" placeholder='Account Number' maxLength={20} onChange={Tab5Formik.handleChange} onBlur={Tab5Formik.handleBlur} value={Tab5Formik.values.acc_number} />
                                      {Tab5Formik.errors.acc_number && Tab5Formik.touched.acc_number ? <div className="help-block text-danger">{Tab5Formik.errors.acc_number}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Account Type <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Account Type'}
                                        // value={studyName}
                                        name="account_type"
                                        options={accTypesOptions}
                                        onChange={(e) => handleAccountTypeChange(e)}
                                        onBlur={Tab5Formik.handleBlur}
                                      />
                                      {Tab5Formik.errors.account_type && Tab5Formik.touched.account_type ? <div className="help-block text-danger">{Tab5Formik.errors.account_type}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Bank <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Bank'}
                                        // value={bloodgroup}
                                        name="bank_id"
                                        options={configurationData?.bankListDetails?.data?.result}
                                        onChange={(e) => handleBankChange(e)}
                                        onBlur={Tab5Formik.handleBlur}
                                      />
                                      {Tab5Formik.errors.bank_id && Tab5Formik.touched.bank_id ? <div className="help-block text-danger">{Tab5Formik.errors.bank_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Bank Branch <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`bank_branch`} className="form-control" placeholder='Bank Branch' maxLength={20} onChange={Tab5Formik.handleChange} onBlur={Tab5Formik.handleBlur} value={Tab5Formik.values.bank_branch} />
                                      {Tab5Formik.errors.bank_branch && Tab5Formik.touched.bank_branch ? <div className="help-block text-danger">{Tab5Formik.errors.bank_branch}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">IFSC Code <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`ifsc_code`} className="form-control" placeholder='IFSC Code' maxLength={20} onChange={Tab5Formik.handleChange} onBlur={Tab5Formik.handleBlur} value={Tab5Formik.values.ifsc_code} />
                                      {Tab5Formik.errors.ifsc_code && Tab5Formik.touched.ifsc_code ? <div className="help-block text-danger">{Tab5Formik.errors.ifsc_code}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='row form-group'>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                                  <input type="text" name='door_no' value={Tab5Formik.values.door_no} className="form-control" placeholder='Door No' maxLength={25} onChange={Tab5Formik.handleChange} />
                                  {Tab5Formik.errors.door_no && Tab5Formik.touched.door_no ? <div className="help-block text-danger">{Tab5Formik.errors.door_no}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                                  <input type="text" name='house_name' value={Tab5Formik.values.house_name} className="form-control" placeholder='House/Apartment Name' maxLength={25} onChange={Tab5Formik.handleChange} />
                                  {Tab5Formik.errors.house_name && Tab5Formik.touched.house_name ? <div className="help-block text-danger">{Tab5Formik.errors.house_name}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                                  <input type="text" name='street_name' value={Tab5Formik.values.street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={Tab5Formik.handleChange} />
                                  {Tab5Formik.errors.street_name && Tab5Formik.touched.street_name ? <div className="help-block text-danger">{Tab5Formik.errors.street_name}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                                  <input type="text" name='place_name' value={Tab5Formik.values.place_name} className="form-control" placeholder='Place Name' maxLength={25} onChange={Tab5Formik.handleChange} />
                                  {Tab5Formik.errors.place_name && Tab5Formik.touched.place_name ? <div className="help-block text-danger">{Tab5Formik.errors.place_name}</div> : null}
                                </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Country <span className='error'>*</span></label>
                                  <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={''}
                                    name="country_id"
                                    options={countryOptions}
                                    placeholder={'Choose a Country'}
                                    onChange={(e) => handleCountryChange(e)}
                                  />
                                  {Tab5Formik.errors.country_id && Tab5Formik.touched.country_id ? <div className="help-block text-danger">{Tab5Formik.errors.country_id}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">State <span className='error'>*</span></label>
                                  <Select
                                    ref={selectStateRef}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={""}
                                    name="state_id"
                                    options={stateOptions}
                                    placeholder={'Choose a State'}
                                    onChange={(e) => handleStateChange(e)}
                                  />
                                  {Tab5Formik.errors.state_id && Tab5Formik.touched.state_id ? <div className="help-block text-danger">{Tab5Formik.errors.state_id}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">District <span className='error'>*</span></label>
                                  <Select
                                    ref={selectDistrictRef}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={""}
                                    name="district_id"
                                    options={districtOptions}
                                    placeholder={'Choose a District'}
                                    onChange={(e) => handleDistrictChange(e)}
                                  />
                                  {Tab5Formik.errors.district_id && Tab5Formik.touched.district_id ? <div className="help-block text-danger">{Tab5Formik.errors.district_id}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Zip <span className='error'>*</span></label>
                                  <input type="text" name='pin_code' value={Tab5Formik.values.pin_code} onChange={Tab5Formik.handleChange} className="form-control" placeholder='Zip' maxLength={6} />
                                  {Tab5Formik.errors.pin_code && Tab5Formik.touched.pin_code ? <div className="help-block text-danger">{Tab5Formik.errors.pin_code}</div> : null}
                                </div>
                              </div>
                            </CCardBody>
                            <CCardFooter>
                              <CRow>
                                <CCol className='col-md-10' align="center" >
                                  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Save</CButton>
                                  <CButton type="reset" onClick={() => setOpenPopGroup(!openPopGroup)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                                </CCol>
                              </CRow>
                            </CCardFooter>
                          </CForm>
                      }
                    </CModalBody>
                  </CModal>

                  {/* Update Form */}
                  <CModal show={openPopbankupdate} onClose={() => setOpenPopbankUpdate(!openPopbankupdate)} size="xl" color="info">
                    <CModalHeader closeButton>
                      <CModalTitle>Update Bank Detail</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      {
                        (configurationData?.isEmpBankLoading === true) ? 'Loading Please Wait...' :
                          <CForm onSubmit={Tab5UpdateFormik.handleSubmit} className="form-horizontal">
                            <CCardBody>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Account Holder Name</label>
                                    <div className="">
                                      <input type="text" name={`acc_holder_name`} className="form-control" placeholder='Account Holder Name' maxLength={20} onChange={Tab5UpdateFormik.handleChange} onBlur={Tab5UpdateFormik.handleBlur} value={Tab5UpdateFormik.values.acc_holder_name} />
                                      {Tab5UpdateFormik.errors.acc_holder_name && Tab5Formik.touched.acc_holder_name ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.acc_holder_name}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Account Number <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`acc_number`} className="form-control" placeholder='Account Number' maxLength={20} onChange={Tab5UpdateFormik.handleChange} onBlur={Tab5UpdateFormik.handleBlur} value={Tab5UpdateFormik.values.acc_number} />
                                      {Tab5UpdateFormik.errors.acc_number && Tab5Formik.touched.acc_number ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.acc_number}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Account Type <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Account Type'}
                                        value={accountType}
                                        name="account_type_update"
                                        options={accTypesOptions}
                                        onChange={(e) => handleAccountTypeChangeUpdate(e)}
                                        onBlur={Tab5UpdateFormik.handleBlur}
                                      />
                                      {Tab5UpdateFormik.errors.account_type && Tab5Formik.touched.account_type ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.account_type}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Bank <span className='error'>*</span></label>
                                    <div className="">
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        placeholder={'Choose a Bank'}
                                        value={bank}
                                        name="bank_id_update"
                                        options={configurationData?.bankListDetails?.data?.result}
                                        onChange={(e) => handleBankChangeUpdate(e)}
                                        onBlur={Tab5UpdateFormik.handleBlur}
                                      />
                                      {Tab5UpdateFormik.errors.bank_id && Tab5Formik.touched.bank_id ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.bank_id}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">Bank Branch <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`bank_branch`} className="form-control" placeholder='Bank Branch' maxLength={20} onChange={Tab5UpdateFormik.handleChange} onBlur={Tab5UpdateFormik.handleBlur} value={Tab5UpdateFormik.values.bank_branch} />
                                      {Tab5UpdateFormik.errors.bank_branch && Tab5Formik.touched.bank_branch ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.bank_branch}</div> : null}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group">
                                    <label htmlFor="">IFSC Code <span className='error'>*</span></label>
                                    <div className="">
                                      <input type="text" name={`ifsc_code`} className="form-control" placeholder='IFSC Code' maxLength={20} onChange={Tab5UpdateFormik.handleChange} onBlur={Tab5UpdateFormik.handleBlur} value={Tab5UpdateFormik.values.ifsc_code} />
                                      {Tab5UpdateFormik.errors.ifsc_code && Tab5Formik.touched.ifsc_code ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.ifsc_code}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='row form-group'>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Door No <span className='error'>*</span></label>
                                  <input type="text" name='door_no' value={Tab5UpdateFormik.values.door_no} className="form-control" placeholder='Door No' maxLength={25} onChange={Tab5UpdateFormik.handleChange} />
                                  {Tab5UpdateFormik.errors.door_no && Tab5Formik.touched.door_no ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.door_no}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">House/Apartment Name <span className='error'>*</span></label>
                                  <input type="text" name='house_name' value={Tab5UpdateFormik.values.house_name} className="form-control" placeholder='House/Apartment Name' maxLength={25} onChange={Tab5UpdateFormik.handleChange} />
                                  {Tab5UpdateFormik.errors.house_name && Tab5Formik.touched.house_name ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.house_name}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Street Name <span className='error'>*</span></label>
                                  <input type="text" name='street_name' value={Tab5UpdateFormik.values.street_name} className="form-control" placeholder='Street Name' maxLength={25} onChange={Tab5UpdateFormik.handleChange} />
                                  {Tab5UpdateFormik.errors.street_name && Tab5Formik.touched.street_name ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.street_name}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Place Name <span className='error'>*</span></label>
                                  <input type="text" name='place_name' value={Tab5UpdateFormik.values.place_name} className="form-control" placeholder='Place Name' maxLength={25} onChange={Tab5UpdateFormik.handleChange} />
                                  {Tab5UpdateFormik.errors.place_name && Tab5Formik.touched.place_name ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.place_name}</div> : null}
                                </div>
                              </div>
                              <div className="row form-group">
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Country <span className='error'>*</span></label>
                                  <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={''}
                                    name="country_id_update"
                                    value={countryname}
                                    options={countryOptions}
                                    placeholder={'Choose a Country'}
                                    onChange={(e) => handleCountryChangeUpdate(e)}
                                  />
                                  {Tab5UpdateFormik.errors.country_id && Tab5Formik.touched.country_id ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.country_id}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">State <span className='error'>*</span></label>
                                  <Select
                                    ref={selectStateRef}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={""}
                                    name="state_id_update"
                                    value={statename}
                                    options={stateOptions}
                                    placeholder={'Choose a State'}
                                    onChange={(e) => handleStateChangeUpdate(e)}
                                  />
                                  {Tab5UpdateFormik.errors.state_id && Tab5Formik.touched.state_id ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.state_id}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">District <span className='error'>*</span></label>
                                  <Select
                                    ref={selectDistrictRef}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={districtname}
                                    name="district_id_update"
                                    options={districtOptions}
                                    placeholder={'Choose a District'}
                                    onChange={(e) => handleDistrictChangeUpdate(e)}
                                  />
                                  {Tab5UpdateFormik.errors.district_id && Tab5Formik.touched.district_id ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.district_id}</div> : null}
                                </div>
                                <div className="col-md-3">
                                  <label htmlFor="hf-email">Zip <span className='error'>*</span></label>
                                  <input type="text" name='pin_code' value={Tab5UpdateFormik.values.pin_code} onChange={Tab5UpdateFormik.handleChange} className="form-control" placeholder='Zip' maxLength={6} />
                                  {Tab5UpdateFormik.errors.pin_code && Tab5Formik.touched.pin_code ? <div className="help-block text-danger">{Tab5UpdateFormik.errors.pin_code}</div> : null}
                                </div>
                              </div>
                            </CCardBody>
                            <CCardFooter>
                              <CRow>
                                <CCol className='col-md-10' align="center" >
                                  <CButton type="submit" size="md" color="primary"><CIcon name="cil-scrubber" /> Update</CButton>
                                  <CButton type="reset" onClick={() => setOpenPopbankUpdate(!openPopbankupdate)} size="md" className='ml-3' color="danger"><CIcon name="cil-ban" /> Cancel</CButton>
                                </CCol>
                              </CRow>
                            </CCardFooter>
                          </CForm>
                      }
                    </CModalBody>
                  </CModal>
                </div>
              </div>
            </CCardBody>
        }
      </CCard>
    </>
  )
}
export default Tab5
