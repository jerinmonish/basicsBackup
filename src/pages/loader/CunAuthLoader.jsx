import { CCardBody } from '@coreui/react'
import 'spinkit/spinkit.min.css'

const CunAuthLoader = () => {
  const parentOverlay = {
    position: "fixed",
    //top: '50px',
    //left: '100px', 
    opacity: 0.8,
    zIndex: 998,
    height: '100%',
    width: '100%',
    backgroundColor: '#00000070',
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
            <CCardBody style={{backgroundColor:'red !important'}}>
              <div className="sk-wave">
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
              </div>
            </CCardBody> 
      </div>
    </div>
  )
}

export default CunAuthLoader;