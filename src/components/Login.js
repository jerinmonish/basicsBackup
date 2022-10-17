import React, { useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import 'spinkit/spinkit.min.css'
import logo from '../assets/tmpt66ftwrh.png'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { userLoginProcess } from 'src/actions/user';
import { userForgotPassword } from 'src/actions/user';
import { useDispatch } from 'react-redux';
import { isLoggedIn, encryptSingleData } from 'src/utils/helper';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validate = (values) => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Username is Required';
  }

  if (!values.password) {
    errors.password = 'Password is Required';
  }
  return errors;
};
    
const Login = () => {
  const [loginValues, setLoginValues] = useState({});
  const [forgotValues, setForgotValues] = useState({});
  const [forgotPassForm, setForgotPassForm] = useState(false);
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.userLogin);
  // console.log(loginData);
  useEffect(() => {
    if(loginData?.success == "Reset password success"){
      toast.success("Password Reset Success, Kindly Login", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, [loginData?.success])
  
  const handleChange = (e) => {
    setLoginValues(prevValues => ({
     ...prevValues,
     [e.target.name]: e.target.value
   }));
  }
  const loginFormik = useFormik({
    initialValues: {
      login: '',
      password: '',
      db:'hris_demo',
    },
    validate,
    onSubmit: values => {
      //const formData = JSON.stringify({ "params": {'login':encryptSingleData(values.login),'password':encryptSingleData(values.password),'db':encryptSingleData(values.db),} });
      const formData = JSON.stringify({ "params": values });
      dispatch(userLoginProcess(formData));
    },
  });

  const forgotPasswordFormik = useFormik({
     initialValues: {
       unameoremail: '',
     },
     onSubmit: values => {
       if (values.unameoremail.length > 0) {
         
        //  console.log("window.location.origin",window.location.origin);
         
        const fgData = {'login':values.unameoremail,'uri': window.location.origin}
        const forgotData = JSON.stringify({ "params":fgData });
        // console.log(forgotData);
        dispatch(userForgotPassword(forgotData));
       } else {
        toast.error("Email is Required", {
          position: toast.POSITION.TOP_RIGHT
        });
       }
     },
   });

   if(isLoggedIn() || loginData?.isAuthenticated){
    return <Redirect to="/master/dashboard" />;
   }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <ToastContainer />
      <div className='login-main'>
         <CRow className="justify-content-center w-100" >
          <CCol lg="4">
            {
              forgotPassForm ? 
              /* Forgot Password Form */
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={forgotPasswordFormik.handleSubmit}>
                      <h1>Forgot Password</h1>
                      <p className="text-muted">Registered Email</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" name='unameoremail' placeholder="your@gmail.com" onChange={forgotPasswordFormik.handleChange} value={forgotPasswordFormik.values.unameoremail}/>
                      </CInputGroup>
                      {/* {forgotPasswordFormik.errors.unameoremail ? <div className="text-danger">{forgotPasswordFormik.errors.unameoremail}</div> : null} */}
                      <CRow>
                        <CCol xs="8">
                           {
                              (loginData?.isLoading == true) ? 
                                  <Link to="#" className="btn btn-primary px-4">
                                    <div className="sk-wave">
                                      <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                      <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                      <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                      <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                      <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                    </div>
                                  </Link> 
                                :
                                  <CButton type='submit' color="primary" className="px-4">Send Password Reset Email</CButton>
                            }
                        </CCol>
                        <CCol xs="4" className='text-right'>
                          <CButton type='button' color="danger" className="px-4" onClick={()=>setForgotPassForm(false)}>Cancel</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
              :
              /*Login Form*/
                <div>
                  <div className='logo'>
                    <div className='logo-part'>
                      
                       <CImg src={logo} width={100} height={100} borderradius={50} />
                    </div>
                    </div>
                  <CCard className="p-4 login-card">
                  
                <CCardBody>
                  <CForm onSubmit={loginFormik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name='login' maxLength={50} placeholder="Username" autoComplete="username" onChange={loginFormik.handleChange} value={loginFormik.values.login}/>
                    </CInputGroup>
                    {loginFormik.errors.login ? <div className="text-danger">{loginFormik.errors.login}</div> : null}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                          <CInput type="password" name='password' placeholder="Password" autoComplete="current-password" onChange={loginFormik.handleChange} value={loginFormik.values.password} />
                          
                    </CInputGroup>
                    {loginFormik.errors.password ? <div className="text-danger">{loginFormik.errors.password}</div> : null}
                    <CRow>
                      <CCol xs="6">
                        {
                          (loginData?.isLoading == true) ? 
                              <Link to="#" className="btn btn-primary px-4">
                                <div className="sk-wave">
                                  <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                  <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                  <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                  <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                  <div className="sk-wave-rect" style={{backgroundColor: "white"}}></div>
                                </div>
                              </Link> 
                            :
                              <CButton type='submit' color="primary" className="px-4">Login</CButton>    
                        }
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0" onClick={()=>setForgotPassForm(true)}>Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </div>
            }
          </CCol>
        </CRow>
     </div>
    </div>
  )
}

export default Login
