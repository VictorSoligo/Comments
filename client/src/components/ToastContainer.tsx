import { ToastContainer as ToastifyContainer } from 'react-toastify';

export const ToastContainer = () => {
  return (
    <>
      <ToastifyContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
};
