import {
    CCardBody,
  } from '@coreui/react'
  import 'spinkit/spinkit.min.css'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const CLoader = () => {
  //other logic
  const parentOverlay = {
      position: "fixed",
      top: '50px',
      left: '100px', 
      opacity: 0.8,
      zIndex: 998,
      height: '100%',
      width: '100%',
    };

  const overlayBox = {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%, -50%)',
    color: 'white', 
    opacity: .8,
    zIndex: 1000,
}
  return (
    <div style={parentOverlay} width="100%">
      <div style={overlayBox}>
        {/* <Circles
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        /> */}
        {/* <Audio
    heigth="100"
    width="100"
    color='grey'
    ariaLabel='loading'
  /> */} 
            <CCardBody>
              <div className="sk-wave">
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
              </div>
            </CCardBody> 

{/* <ThreeDots color="#00BFFF" height={100} width={100} /> */}
      </div>
    </div>
  );
}

export default CLoader;