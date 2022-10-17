import CryptoJS from "crypto-js";
import moment from "moment";

//To Decrypt token Data
export const getToken = () => {
  const bytes = (localStorage.getItem('utkn') != null) ? CryptoJS.AES.decrypt(localStorage.getItem('utkn'), 'talents-tech-bsoft-org-tkn') : null;
  const retToken = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : null;
  return retToken;
}

//To Descrypt and set user token
export function isLoggedIn(){
  //const token = localStorage.getItem('user_token');
  const bytes = (localStorage.getItem('utkn')) ? CryptoJS.AES.decrypt(localStorage.getItem('utkn'), 'talents-tech-bsoft-org-tkn') : '';
  const tmpToken = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
  if(tmpToken) return true;

  return false;
}

//To convert default date object to indian date format
export function indianDateFormat(cDate){
  return moment(cDate,'DD-MM-YYYY').format('DD-MM-YYYY');
}

//To encypt single data
export function encryptSingleData(encData) {
  if(encData){
    var retData = btoa((encData + 122354125410));
    return retData;
    /*var b64 = CryptoJS.AES.encrypt((encData).toString(), 'encSingleData-internalKey').toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;*/
  }
}

//To Decrypt single data
export function decryptSingleData(encData) {
  if(encData){
    var smp = atob(encData);
    if((smp)){
      var retData = atob(encData) - 122354125410;
      return retData
    }
    /*var reb64 = CryptoJS.enc.Hex.parse(encData);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, 'encSingleData-internalKey');
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;*/
  }
}


export function userLocalDecryptData(){
  const encMenu = (localStorage.getItem('udata')) ? CryptoJS.AES.decrypt(localStorage.getItem('udata'), 'talents-tech-bsoft-org') : '';
  const encMenuProcess = (encMenu) ? JSON.parse(encMenu.toString(CryptoJS.enc.Utf8)) : '';
  return encMenuProcess;
}

//To convert indian date format to default date object
export function convertDateToMDY(date){
  if(date){
    const exiDate = date?.split('-');
    return exiDate[1]+'-'+exiDate[0]+'-'+exiDate[2];
  }
}

export function convertValueLabel(val,lab){
  if(val && lab){
    return {
      "value": val,
      "label": lab
    }
  }
}