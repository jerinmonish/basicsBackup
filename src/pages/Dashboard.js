import React, { Suspense } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CCard, CCardBody, CCardHeader, CCol, CFade, CRow, CButton } from '@coreui/react'
import routes from '../routes'
import 'spinkit/spinkit.min.css'
import CLoader from './loader/CLoader'
import highcharts3d from 'highcharts/highcharts-3d';
import DashboardChart1 from './commonChart/DashboardChart1';
import DashboardChart2 from './commonChart/DashboardChart2';
import DashboardChart3 from './commonChart/DashboardChart3';
import DashboardChart4 from './commonChart/DashboardChart4';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
) 
 
const Dashboard = () => {
  
let isLoading = false; 
// let stateVal = useSelector(state => state.userLogin);
/* setTimeout(() => {
  console.log("settimeout");
   isLoading = false; 
}, 100); */
  
  return (
    // <main className="c-main">
    //   <CContainer fluid>
    //     <Suspense fallback={loading}>
    //       <Switch>
    //         {routes.map((route, idx) => {
    //           return route.component && (
    //             <Route
    //               key={idx}
    //               path={route.path}
    //               exact={route.exact}
    //               name={route.name}
    //               render={props => (
    //                 <CFade>
    //                   <route.component {...props} />
    //                 </CFade>
    //               )} />
    //           )
    //         })}
    //         <Redirect from="/" to="/dashboard" />
    //       </Switch>
    //     </Suspense>
    //   </CContainer>
    // </main>

    isLoading===true ? <CLoader/> :
    
      <main className="c-main">
        <CFade>
          <CContainer fluid>
            <Suspense fallback={loading}>
              <CRow className={'row'}>
                <div className='mb-4 col-md-6'>
                  <CCard>
                    <CCardHeader>
                      Employee Head Count{/* <small> Form</small> */}
                    </CCardHeader>
                    <CCardBody>
                      <DashboardChart1 />
                    </CCardBody>
                  </CCard>
                </div>
                <div className='mb-4 col-md-6'>
                    <CCard>
                      <CCardHeader>
                        Bar Graph
                      </CCardHeader>
                      <CCardBody>
                        <DashboardChart2 />
                      </CCardBody>
                    </CCard>
                </div>
              </CRow>
              <CRow className={'row'}>
                <div className='mb-4 col-md-6'>
                  <CCard>
                    <CCardHeader>
                      Dual axes, line and column
                    </CCardHeader>
                    <CCardBody>
                      <DashboardChart4 />
                    </CCardBody>
                  </CCard>
              </div>
              <div className='mb-4 col-md-6'>
                  <CCard>
                    <CCardHeader>
                      Donut Chart
                    </CCardHeader>
                    <CCardBody>
                      <DashboardChart3 />
                    </CCardBody>
                  </CCard>
              </div>
            </CRow>  
            </Suspense>
          </CContainer>
        </CFade>
      </main>
  )
}

export default React.memo(Dashboard)
