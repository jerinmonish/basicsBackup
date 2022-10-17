import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OPEN_SIDEBAR } from 'src/actions/types'
// import { footerimg } from '../../assets/backgroud_login.jpg'
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarBrand,
  CImg,
} from '@coreui/react'

// sidebar nav config
import CryptoJS from "crypto-js";
import  footerlogo  from '../../assets/footerimg.png';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const CusSidebar = () => {
  const loginData = useSelector(state => state.userLogin);
  // console.log(loginData?.menuData);
  // console.log(navigation);
  let Udata = localStorage.getItem('udata');
  const bytes = (Udata) ? CryptoJS.AES.decrypt(Udata, 'talents-tech-bsoft-org') : '';
  const udetails = (bytes) ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : '';
  let userInput=JSON.parse(loginData.userDetails);
  let userLogo= userInput?.logo ? userInput?.logo :udetails?.logo
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeState?.sidebarShow)

  const encMenu = (localStorage.getItem('mnpdata')) ? CryptoJS.AES.decrypt(localStorage.getItem('mnpdata'), 'talents-tech-bsoft-menu-org') : '';
  const encMenuProcess = (encMenu) ? JSON.parse(encMenu.toString(CryptoJS.enc.Utf8)) : '';
  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch({type: OPEN_SIDEBAR, sidebarShow: val})}
    >
      <CSidebarBrand className="d-md-down-none">
        <img src={userLogo} className="imgTopLogo"/>
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      {/* <CImg
        src={userLogo}
        // className="c-sidebar-brand-full c-sidebar-brand-minimized m-2 rounded-circle ml-5"
        className="c-sidebar-brand-full c-sidebar-brand-minimized m-2 imgTopLogo"
        // width={100} height={100} borderradius={50}
    /> */}
      {/* <h1 class="text-hide" style="background-image: url('/assets/brand/bootstrap-solid.svg'); width: 50px; height: 50px;">Bootstrap</h1> */}
      {/* <p>Test</p> */}
      <CSidebarNav>
        {
          loginData?.isMenuLoading ? 'Loading' :
            <CCreateElement
            items={loginData?.menuData ? loginData?.menuData : encMenuProcess}
            // items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        }

        {/* <CSidebarNavDivider />
        <CSidebarNavTitle>System Utilization</CSidebarNavTitle>
        <CNavItem className="px-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>CPU Usage</b></small></div>
          <CProgress size="xs" value={25} color="info" />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CNavItem>
        <CNavItem className="px-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>Memory Usage</b></small></div>
          <CProgress size="xs" value={70} color="warning" />
          <small className="text-muted">11444GB/16384MB</small>
        </CNavItem>
        <CNavItem className="px-3 mb-3 d-compact-none c-d-minimized-none">
          <div className="text-uppercase mb-1"><small><b>SSD 1 Usage</b></small></div>
          <CProgress size="xs" value={95} color="danger" />
          <small className="text-muted">243GB/256GB</small>
        </CNavItem> */}
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none " disabled  /> */}
      <div className=" c-d-md-down-none bottom-logo" >
        <img src={footerlogo} className="img-fluid"/>
      </div>
     {/* <CImg
        src={logoto}
        className="c-sidebar-brand-full c-sidebar-brand-minimized m-2  ml-5"
        width={100} height={100}
    /> */}
      {/* <Image src */}
    </CSidebar>
  )
}

export default React.memo(CusSidebar)
