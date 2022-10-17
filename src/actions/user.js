import axios from "axios";
import * as constants from "../actions/types"
import { toast } from 'react-toastify';
import CryptoJS from "crypto-js";
import {getToken} from '../../src/utils/helper';
var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'error_code':400
}

export const userLoginProcess = (lgData) => async (dispatch) => 
{
  dispatch({
    type: constants.LOGIN_REQUEST
  });
  try {
    await axios.post(constants.BASE_URL+'/auth/token',lgData,{headers: headers})
    .then((lres)=>{
      // console.log(lres.data.result);
      if(lres.data?.result?.message === "Access denied, Login or password invalid" && lres.data.result.status == 401){
        dispatch({
          type: constants.LOGIN_ERROR
        });
      } else {
        dispatch({
          type: constants.LOGIN_SUCCESS,
          returnToken:lres.data.result.access_token,
          payload:JSON.stringify(lres.data.result),
        });
        

        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        const userData = CryptoJS.AES.encrypt(JSON.stringify(lres?.data?.result), 'talents-tech-bsoft-org').toString();
        const usertkn = CryptoJS.AES.encrypt(JSON.stringify(lres?.data?.result?.access_token), 'talents-tech-bsoft-org-tkn').toString();
        localStorage.setItem('udata',userData);
        localStorage.setItem('utkn',usertkn);
        localStorage.setItem('tknexp',lres?.data?.result?.expires);

        dispatch({
          type: constants.SIDE_MENU_REQUEST
        });
        let mnHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': lres?.data?.result?.access_token,
          'error_code':400
        }
        const queryparams = {
          params: {
            query: "{name,partner_name,email_from,partner_phone,partner_mobile,availability,description,company_id,department_id,job_id}",
          },
        }
        axios.post(constants.BASE_URL+'/ir.ui.menu/get_menu_data',queryparams,{headers: mnHeaders}).then((mRes)=>{
          if(mRes.data.result.length > 0){
            dispatch({
              type: constants.SIDE_MENU_SUCCESS,
              payloadMenu:mRes.data.result,
            });
            const mnuData = CryptoJS.AES.encrypt(JSON.stringify(mRes?.data?.result), 'talents-tech-bsoft-menu-org').toString();
            localStorage.setItem('mnpdata',mnuData);
          }
        });
      }
    });
  } catch (error) {
    dispatch({
      type: constants.LOGIN_ERROR,
      error:"login error"
    });
    toast.error("Username or Password is Incorrect !", {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}

export const userLogout = (history) => async (dispatch) => {
  dispatch({
    type: constants.LOGOUT_REQUEST
  });
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${getToken()}`,
    'error_code':400
  }
  
  try {
    await axios.post(constants.BASE_URL+'/auth/token/delete',{},{headers: headers})
    .then((lgres)=> {
      if(lgres.data?.result?.message === "Deleted Successfully"){
          dispatch({
            type: constants.LOGOUT_SUCCESS,
          });
          localStorage.removeItem('udata');
          localStorage.removeItem('utkn');
          localStorage.removeItem('tknexp');
          localStorage.removeItem('mnpdata');
          window.location = '/';
      }
    });
  } catch (error) {
    dispatch({
      type: constants.LOGOUT_ERROR
    });
    console.log(error);
    // toast.error(error.repsonse.data.message, {
    //   position: toast.POSITION.TOP_CENTER
    // });
  }
}

export const userForgotPassword = (fgData) => async (dispatch) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'error_code':400
  }
  dispatch({
    type: constants.FORGOT_PASSWORD_REQUEST
  });
  try {
    await axios.post(constants.BASE_URL+'/forgot_password',fgData,{headers: headers})
    .then((lres)=>{
      //console.log(lres);
      dispatch({
        type: constants.FORGOT_PASSWORD_SUCCESS,
        returnToken:lres.data.result.access_token,
        payload:JSON.stringify(lres.data.result),
      });
      if(lres?.data?.result?.message == "An email has been sent with credentials to reset your password" && lres?.data?.result?.status == 200){
        toast.success(lres?.data?.result?.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    });
  } catch (error) {
    dispatch({
      type: constants.FORGOT_PASSWORD_ERROR,
      error:"forgot password error"
    });
    // toast.error("Username or Password is Incorrect", {
    //   position: toast.POSITION.TOP_RIGHT
    // });
  }
}

export const ResetPasswordAPI = (fgData, history) => async (dispatch) => 
{
  dispatch({
    type: constants.RESET_PASSWORD_REQUEST
  });
  try {
    await axios.post(constants.BASE_URL+'/reset_password',fgData,{headers: headers})
    .then((lres)=>{
        dispatch({
          type: constants.RESET_PASSWORD_SUCCESS,
          returnToken:lres.data.result.access_token,
          payload:JSON.stringify(lres.data.result),
          
        });
        console.log(lres?.data?.result?.message);
        if(lres?.data?.result?.message == "Password Reset successful" && lres?.data?.result?.status == 200){
          history.push('/') 
        }
      // if(lres?.data?.result?.message == "Password Updated SuccessFully" && lres?.data?.result?.status == 200){
      //   toast.success(lres?.data?.result?.message, {
      //     position: toast.POSITION.TOP_RIGHT,
      //   })
      // }
    });
  } catch (error) {
    dispatch({
      type: constants.RESET_PASSWORD_ERROR,
      error:"reset password error"
    });
    // console.log(error?.response?.status);
    toast.error("Reset Password Token Expired !", {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}