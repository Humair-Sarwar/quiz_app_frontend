import { useDispatch, useSelector } from "react-redux"
import AdminRoutes from "./routes/AdminRoutes"
import UserRoutes from "./routes/UserRoutes"
import WebsiteRoutes from "./routes/WebsiteRoutes"
import { ToastContainer } from 'react-toastify'

import { useEffect } from "react";
import { userAuthDataAdd } from "./features/auth/authSlice";
import type { AppDispatch, RootState } from "./app/store";



function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");
    const user_id = localStorage.getItem("user_id");

    if (token && user_type && user_id) {
      dispatch(
        userAuthDataAdd({
          token,
          user_type: Number(user_type),
          user_id,
        })
      );
    }
  }, [dispatch]);

    const data = useSelector((state: RootState) => state.auth);
    console.log(data, '000000---')

  return (
    <>
    <ToastContainer/>
      <WebsiteRoutes/>
      <UserRoutes/>
      <AdminRoutes/>
    </>
  )
}

export default App
