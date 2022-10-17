import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LeaveMaintypesList, LeaveMainTypesAPIDelete } from '../../../actions/leave'
import CLoader from '../../loader/CLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { encryptSingleData } from '../../../utils/helper'
import { ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import CryptoJS from "crypto-js";
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

const MainTypes = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const MaintypeData = useSelector((state) => state.leaveBackend)

    //  console.log("LeaveTypesData",LeaveTypesData);
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
        dispatch(LeaveMaintypesList(params))
    }, [query])

    const [getdata, setGetdata] = useState([]);

    useEffect(() => {
        let Udata = localStorage.getItem('udata');
        const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
        const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
        // console.log("byts", udetails.uid);
        setGetdata(udetails.level[0])

    }, [])

    //useEffect to set Group list data and to update data for edit privielage
    useEffect(() => {
        // console.log("LeaveTypesData", MaintypeData?.mainTypesListDetails);
        if (MaintypeData?.mainTypesListDetails?.data?.result.length > 0) {
            setItems(MaintypeData?.mainTypesListDetails?.data?.result)
            setPages(MaintypeData?.mainTypesListDetails?.data?.total_pages)
            setItemsPerPage(itemsPerPage)
            setLoading(false)
            setCtFrom(MaintypeData?.mainTypesListDetails?.data?.from_count);
            setCtTo(MaintypeData?.mainTypesListDetails?.data?.to_count);
            setTotalCnt(MaintypeData?.mainTypesListDetails?.data?.total_count);
            //   console.log(params)
        }
        else {
            setItems([])
            setLoading(false)
        }
    }, [MaintypeData?.mainTypesListDetails?.data?.result])


    if (MaintypeData?.showToast) {
        let sMsg = ''
        if (MaintypeData?.success === 'maintypes added success') {
            sMsg = 'Main Type  Saved Successfully !'
        } else if (MaintypeData?.success === 'maintypes update success') {
            sMsg = 'Main Type Updated Successfully !'
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

    const handleMainTypesDelete = (gid) => {
        Swal.fire({
            title: 'Are you sure to delete ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonColor: 'red',
        }).then((result) => {
            if (result.value === true) {
                dispatch(LeaveMainTypesAPIDelete(gid))
                dispatch(LeaveMaintypesList())
            }

            history.push('/leave/maintypes')
        })
    }

    useEffect(() => {
        // console.log("LeaveTypesData",LeaveTypesData?.isDesignationDeleted);
        if (MaintypeData?.isMaintypeDeleted) {
            dispatch(LeaveMaintypesList())
        }
    }, [MaintypeData?.isMaintypeDeleted]);



    return (
        <main className="c-main">
            <ToastContainer />
            {params.tableFilterValue.length <= 0 &&
                MaintypeData?.isLoading === true ? (
                <CLoader />
            ) : (
                <CFade>
                    <CContainer fluid>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol col="6" className="left">
                                        <strong> Main Types </strong>
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
                                            MaintypeData?.mainTypesListDetails?.data?.rts?.c ? <Link className="btn btn-primary" to={'/leave/add-maintypes'}>
                                                Add
                                            </Link> : ""
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
                                            { key: 'name', label: 'Main Type Name', filter: false },
                                            { key: 'code', label: ' Code', filter: false },

                                            { key: 'main_type_label', label: 'Mode', filter: false },
                                            { key: 'main_validation_type_label', label: 'Allocation Validation', filter: false, },
                                            // {
                                            //   key: 'create_date',
                                            //   label: 'Created At',
                                            //   filter: false,
                                            // },
                                            //  getdata === 'Super Admin' ? 'Employee' : ""
                                            // { key: 'action', label: 'Actions', filter: false },
                                            // { key: 'action', label: getdata === 'Super Admin' ? 'Actions' : "", filter: false, },
                                        ]}
                                        loading={loading}
                                        hover
                                        cleaner
                                        // columnFilter={{ external: true }}
                                        // columnFilterValue={columnFilterValue}
                                        onColumnFilterChange={setColumnFilterValue}
                                        tableFilter={{ label: 'Filter:', external: true, placeholder: "Search ..." }}
                                        // tableFilter={{ external: true }}
                                        tableFilterValue={tableFilterValue}
                                        onTableFilterChange={setTableFilterValue}
                                        sorter
                                        // sorterValue={sorterValue}
                                        // onSorterValueChange={setSorterValue}
                                        itemsPerPageSelect={{
                                            label: 'Items per page:',
                                            values: [50, 100, 150, 200],
                                        }}

                                        // to={`/onboarding/view-candidate/${encryptSingleData(
                                        //       item.id,
                                        //     )}`}
                                        //   >
                                        //     <FontAwesomeIcon icon={faEye} title="View" />{' '}

                                        itemsPerPage={itemsPerPage}
                                        onPaginationChange={setItemsPerPage}
                                        scopedSlots={{
                                            action: (item) => (
                                                <td>
                                                    {/* {
                                                        item?.usr_per?.r ? <Link
                                                            to={`/leave/view-leaveTypes/${encryptSingleData(
                                                                item.id,
                                                            )}`}
                                                            className='btn btn-sm btn-info' >
                                                            <FontAwesomeIcon icon={faEye} title="View" />{' '}

                                                        </Link> : ""
                                                    } */}

                                                    &nbsp;&nbsp;
                                                    {
                                                        item?.usr_per?.u ? <Link
                                                            to={`/leave/edit-maintypes/${encryptSingleData(
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
                                                                handleMainTypesDelete(item.id)
                                                            }}
                                                            className='btn btn-sm btn-danger' >
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


        </main>
    )
}

export default React.memo(MainTypes)
