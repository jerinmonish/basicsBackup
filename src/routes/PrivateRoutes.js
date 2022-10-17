import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedIn } from './../utils/helper'
import moment from 'moment'
import { userLogout } from 'src/actions/user'
// import axios from 'axios'
const PrivateRoutes = ({ component: Component, ...rest }) => {
  const { isAuthenticated /*, isLoading*/ } = useSelector(
    (state) => state.userLogin,
  )

  /*To logout if token expired Starts*/
  const dispatch = useDispatch();
  const history = useHistory();
  var expDate = new Date(moment(localStorage.getItem('tknexp')).format('MM/DD/YYYY'));
  var curDate = new Date(moment().format('MM/DD/YYYY'));
  var diffDays = curDate.getDate() - expDate.getDate();
  var timeStart = moment(localStorage.getItem('tknexp')).format('HH');
  var timeEnd = moment().format('HH');

  useEffect(() => {
    if(diffDays > 0 && timeEnd > timeStart){
      dispatch(userLogout(history));
    }
  }, [diffDays, timeEnd, timeStart])
  /*To logout if token expired Ends*/

  // return <Route {...rest} render={(props) => <Component {...props} />}/>
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() || isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default PrivateRoutes
