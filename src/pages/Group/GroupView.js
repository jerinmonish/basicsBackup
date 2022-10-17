import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFade,
  CRow,
} from '@coreui/react'

// routes config
// import routes from '../routes'
import routes from 'src/routes'

  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const GroupView = () => {
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
        <main className="c-main">
          <CFade>
            <CContainer fluid>
              <Suspense fallback={loading}>
                <CRow>
                  <CCol lg="12" xs="12" sm="6">
                    <CCard>
                      <CCardHeader>
                        Group{/* <small> Form</small> */}
                      </CCardHeader>
                      <CCardBody>
                        Welcome To Group
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </Suspense>
            </CContainer>
          </CFade>
        </main>
  )
}

export default React.memo(GroupView)
