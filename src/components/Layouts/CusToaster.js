import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CusToaster = (props) => {
  if(props.message && props.type == "error"){
    toast.error(props.message, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "Login1",
      autoClose: 3000
    });
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

        />
      <ToastContainer />
    </>
  )
}

export default CusToaster