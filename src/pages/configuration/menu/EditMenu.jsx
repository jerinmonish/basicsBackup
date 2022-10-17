import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CusMenuEdit, CusMenuUpdate } from '../../../actions/configuration'
import { useFormik } from 'formik'
import { convertValueLabel, decryptSingleData } from '../../../utils/helper'
import Select from 'react-select'
import CLoader from '../../loader/CLoader';
import * as Yup from 'yup'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CFade,
  CForm,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

const EditMenu = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dropdownData = useSelector((state) => state.commonData)

  const { cusMenuDetails, isLoading } = useSelector((state) => state.configurationBackend)
  //To load dropdown predefined data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(CusMenuEdit(decryptSingleData(props?.match?.params?.id)));
    }
  }, []);

  const [accessRightOptions, setAccessRightOptions] = useState([]);
  const [accessRightName, setAccessRightName] = useState([])
  const [frontendMenuName, setFrontendMenu] = useState([])


  //Job Add Form Initilization
  const menuUpdateFormik = useFormik({
    initialValues: {
      name: '',
      sequence: '',
      frontend_menu: '',
      frontend_menu_icon: '',
      frontend_menu_path: '',
      groups_id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('This field is required'),
      sequence: Yup.string().required('This field is required'),
      // frontend_menu: Yup.string().required('This field is required'),
      // frontend_menu_icon: Yup.string().required('This field is required'),
      // frontend_menu_path: Yup.string().required('This field is required'),
      // groups_id: Yup.array().min(1, 'This field is required'),
    }),
    onSubmit: (values) => {
      const formData = JSON.stringify({ params: { data: values } });
      dispatch(CusMenuUpdate(decryptSingleData(props?.match?.params?.id), formData, history));
    },
  });


  useEffect(() => {
    if (cusMenuDetails?.data !== null) {
      menuUpdateFormik.setValues({
        "name": cusMenuDetails?.data?.name,
        "sequence": cusMenuDetails?.data?.sequence,
        "frontend_menu": cusMenuDetails?.data?.frontend_menu,
        "frontend_menu_icon": cusMenuDetails?.data?.frontend_menu_icon,
        "frontend_menu_path": cusMenuDetails?.data?.frontend_menu_path,
        "groups_id": cusMenuDetails?.data?.groups_id,
      });
    }
    if (isLoading === false && cusMenuDetails?.data !== undefined && cusMenuDetails?.data !== null) {
      //Update values to all the dropdowns
      // setGroupName(convertValueLabel(cusMenuDetails?.data?.group_id,cusMenuDetails?.data?.group_id_name));
      if (cusMenuDetails?.data?.frontend_menu == 1) {
        setFrontendMenu(convertValueLabel(cusMenuDetails?.data?.frontend_menu, "Yes"));
      } else {
        setFrontendMenu(convertValueLabel(cusMenuDetails?.data?.frontend_menu, "No"));
      }

      let accRightLisonLoad = [];
      cusMenuDetails?.data?.groups_id_edit?.map((data, i) => (
        accRightLisonLoad.push({ 'value': data.value, 'label': data.label })
      ));
      setAccessRightName(accRightLisonLoad);
      setAccessRightOptions(cusMenuDetails?.data?.groups_id_list);
    }
  }, [isLoading, cusMenuDetails?.data])

  const handleAccRightsChange = (e) => {
    let accRightArr = [];
    let accRightArr_f = [];
    e?.map((data, i) => (
      accRightArr.push({ 'value': data.value, 'label': data.label }),
      accRightArr_f.push(data.value)
    ));
    // if(accRightArr.length > 0){
    menuUpdateFormik.setFieldValue('groups_id', accRightArr_f);
    // }
    setAccessRightName(accRightArr);
  }


  const handleFrtMenuChange = (e) => {
    if (e?.value) {
      if (e?.value == 3) {
        menuUpdateFormik.setFieldValue('frontend_menu', 0);
        setFrontendMenu(convertValueLabel(e?.value, e?.label));
      } else {
        menuUpdateFormik.setFieldValue('frontend_menu', e?.value);
        setFrontendMenu(convertValueLabel(e?.value, e?.label));
      }
    }
  }


  return (
    <main className="c-main">
      {
        (isLoading === true) ? <CLoader /> :
          <CFade>
            <CContainer fluid>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol col="6" className="left">
                      <strong> Edit Menu </strong>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={menuUpdateFormik.handleSubmit} className="form-horizontal">
                    <div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">Menu Name <span className='error'>*</span></label>
                          <input
                            type="text"
                            name="name"
                            value={menuUpdateFormik.values.name}
                            className="form-control"
                            placeholder="Menu Name"
                            maxLength={25}
                            onChange={menuUpdateFormik.handleChange}
                            onBlur={menuUpdateFormik.handleBlur}
                          />
                          {menuUpdateFormik.errors.name ? <div className="help-block text-danger">{menuUpdateFormik.errors.name}</div> : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Sequence <span className="error">*</span>
                          </label>
                          <input
                            type="text"
                            name="sequence"
                            value={menuUpdateFormik.values.sequence}
                            className="form-control"
                            placeholder="Sequence"
                            maxLength={25}
                            onChange={menuUpdateFormik.handleChange}
                            onBlur={menuUpdateFormik.handleBlur}
                          />
                          {menuUpdateFormik.touched.sequence && menuUpdateFormik.errors.sequence ? (<div className="help-block text-danger">{menuUpdateFormik.errors.sequence}</div>) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Fontend Menu
                          </label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose Fontend Menu'}
                            value={frontendMenuName}
                            name="frontend_menu"
                            options={[{ value: 1, label: 'Yes' }, { value: 3, label: 'No' }]}
                            onBlur={menuUpdateFormik.handleBlur}
                            onChange={(e) => handleFrtMenuChange(e)}
                          />
                          {menuUpdateFormik.touched.frontend_menu && menuUpdateFormik.errors.frontend_menu ? (<div className="help-block text-danger">{menuUpdateFormik.errors.frontend_menu}</div>) : null}
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Menu Icon
                          </label>
                          <input
                            type="text"
                            name="frontend_menu_icon"
                            value={menuUpdateFormik.values.frontend_menu_icon}
                            className="form-control"
                            placeholder="Menu Icon"
                            maxLength={25}
                            onChange={menuUpdateFormik.handleChange}
                            onBlur={menuUpdateFormik.handleBlur}
                          />
                          {menuUpdateFormik.touched.frontend_menu_icon && menuUpdateFormik.errors.frontend_menu_icon ? (<div className="help-block text-danger">{menuUpdateFormik.errors.frontend_menu_icon}</div>) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Menu Path
                          </label>
                          <input
                            type="text"
                            name="frontend_menu_path"
                            value={menuUpdateFormik.values.frontend_menu_path}
                            className="form-control"
                            placeholder="Menu Path"
                            maxLength={25}
                            onChange={menuUpdateFormik.handleChange}
                            onBlur={menuUpdateFormik.handleBlur}
                          />
                          {menuUpdateFormik.touched.frontend_menu_path && menuUpdateFormik.errors.frontend_menu_path ? (<div className="help-block text-danger">{menuUpdateFormik.errors.frontend_menu_path}</div>) : null}
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="hf-email">
                            Access Rights
                          </label>
                          <Select
                            isMulti={true}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder={'Choose Access Rights'}
                            value={accessRightName}
                            name="groups_id"
                            options={accessRightOptions}
                            onBlur={menuUpdateFormik.handleBlur}
                            onChange={(e) => handleAccRightsChange(e)}
                          />
                          {menuUpdateFormik.touched.groups_id && menuUpdateFormik.errors.groups_id ? (<div className="help-block text-danger">{menuUpdateFormik.errors.groups_id}</div>) : null}
                        </div>
                      </div>
                    </div>
                    <CCardFooter>
                      <CRow>
                        <CCol className="col-md-10" align="center">
                          <CButton type="submit" size="md" color="primary">
                            <CIcon name="cil-scrubber" /> Update
                          </CButton>
                          <Link className="ml-3 btn btn-danger" to={'/configuration/menu'}>
                            <CIcon name="cil-ban" /> Cancel
                          </Link>
                        </CCol>
                      </CRow>
                    </CCardFooter>
                  </CForm>
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
      }
    </main>
  )
}

export default EditMenu
