import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const Modal = ({ url, type, modalVisibility, setmodalVisibility }) => {
  return (
    <>
      {type === "login" ? (
        <Login
          modalVisibility={modalVisibility}
          setModalVisibility={setmodalVisibility}
          url={url}
        />
      ) : (
        <Signup
          modalVisibility={modalVisibility}
          setModalVisibility={setmodalVisibility}
          url={url}
        />
      )}
    </>
  );
};

export default Modal;
