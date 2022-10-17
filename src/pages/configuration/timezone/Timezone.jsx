import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import CLoader from '../../loader/CLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CFade,
  CDataTable
} from '@coreui/react'

const Timezone = () => {
  const groupData = require('../../../components/data/TimeZone.json');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [columnFilterValue, setColumnFilterValue] = useState();
  const [tableFilterValue, setTableFilterValue] = useState("");
  const [sorterValue, setSorterValue] = useState();

  const params = {
    page,
    columnFilterValue: (columnFilterValue?.length > 0) ? JSON.stringify(columnFilterValue) : 0,
    tableFilterValue,
    sorterValue: (sorterValue?.length > 0) ? JSON.stringify(sorterValue) : 0,
    itemsPerPage
  };

  //useEffect to set Group list data and to update data for edit privielage
  useEffect(() => {
    if (groupData) {
      setItems(groupData);
      setLoading(false);
      // console.log(params);
    }


  })

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
                      <strong> Timezone </strong>
                    </CCol>
                    <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" align="end">
                      {/* <CButton  color="primary" onClick={() => setOpenAddGroup(!openAddGroup)}>Add</CButton> */}
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {items.length > 0 &&
                    (<><CDataTable
                      items={items}
                      fields={[{ key: "label", label: "TimeZone", filter: false },
                        // { key: "action", label: "Actions",filter: false }
                      ]}
                      loading={loading}
                      hover
                      // cleaner
                      // columnFilter={{ external: false }}
                      // columnFilterValue={columnFilterValue}
                      // onColumnFilterChange={setColumnFilterValue}
                      // tableFilter={{ external: false }}
                      // tableFilterValue={tableFilterValue}
                      // onTableFilterChange={setTableFilterValue}
                      sorter
                      sorterValue={sorterValue}
                      onSorterValueChange={setSorterValue}
                      // itemsPerPageSelect={{ label: 'Items per page:',  values: [50, 100, 150, 200] }}
                      // itemsPerPage={itemsPerPage}
                      onPaginationChange={setItemsPerPage}
                      scopedSlots={{
                        'action': () => (
                          <td>
                            {/* <Link
                              to={`${encryptSingleData(
                                item.id,
                              )}`}
                            >
                              <FontAwesomeIcon icon={faEye} title="View" />{' '}
                            </Link>
                            &nbsp;&nbsp;
                            <Link
                              to={`${encryptSingleData(
                                item.id,
                              )}`}
                            >
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                title="Edit"
                              />{' '}
                            </Link>
                            &nbsp;&nbsp;
                            <Link
                              onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                // handlelocationDelete(item.id)
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} title="Delete" />{' '}
                            </Link> */}
                          </td>
                        )
                      }} />
                      {/* <CPagination
                  pages={pages}
                  activePage={page}
                  onActivePageChange={setPage}
                  className={pages < 2 ? "d-none" : ""} /> */}
                    </>)
                  }
                </CCardBody>
              </CCard>
            </CContainer>
          </CFade>
      }



    </main>
  )
}

export default React.memo(Timezone)
