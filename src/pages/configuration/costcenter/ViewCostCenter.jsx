import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CostCenterEditAPI } from '../../../actions/configuration'
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
import CLoader from '../../loader/CLoader'
import { decryptSingleData, encryptSingleData } from '../../../utils/helper'
const ViewCostCenter = (props) => {
    const dispatch = useDispatch()
    // const { costCenterListDetails, iscostcenterLoading } = useSelector((state) => state.configurationBackend,)

    const { costcenterEditDetails, isLoading } = useSelector((state) => state.configurationBackend)
    useEffect(() => {
        if (props?.match?.params?.id) {
            dispatch(CostCenterEditAPI(decryptSingleData(props?.match?.params?.id)))
        }
    }, [])

    // console.log("costCenterListDetails", costcenterEditDetails);
    // console.log("id", props?.match?.params?.id);

    //   useEffect(() => {}, [iscostcenterLoading, costCenterListDetails?.data])
    return (
        <main className="c-main">
            {isLoading === true ? (
                <CLoader />
            ) : (
                <CFade>
                    <CContainer fluid>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol col="6" className="left">
                                        <strong> View Cost Center </strong>
                                    </CCol>
                                </CRow>
                            </CCardHeader>
                            <CCardBody>
                                <CForm className="form-horizontal">
                                    <div>
                                        <div className="row form-group">
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Group Name :</b>
                                                </label>

                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.group_id_name}
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Company Name :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.company_id_name}
                                                </label>

                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Location Name :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.location_id_name}
                                                </label>

                                            </div>

                                        </div>

                                        <div className="row form-group">


                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b> Function Name :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.department_id_name}
                                                </label>

                                            </div>

                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Sub Function Name :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.sub_function_id_name}
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Name :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.name}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-md-4">
                                                <label htmlFor="hf-email">
                                                    <b>Short Name :</b>
                                                </label>
                                                <label className="ml-2">
                                                    {costcenterEditDetails?.data?.short_name}
                                                </label>
                                            </div>

                                        </div>

                                    </div>

                                    {/* <Link
                                        to={`/master/edit-function/${encryptSingleData(
                                            functionDetails?.id,
                                        )}`}
                                        className="ml-3 btn btn-primary"
                                    >

                                    </Link> */}
                                    <CCardFooter>
                                        <CRow>
                                            <CCol className="col-md-10" align="center">
                                                <Link
                                                    to={`/configuration/edit-costcenter/${encryptSingleData(
                                                        costcenterEditDetails?.data?.id,
                                                    )}`}
                                                    className="ml-3 btn btn-primary" >
                                                    <CIcon name="cil-pencil" /> Edit
                                                </Link>
                                                <Link className="ml-3 btn btn-danger" to={'/configuration/CostCenter'}>
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
            )}
        </main>

    )
}

export default ViewCostCenter
