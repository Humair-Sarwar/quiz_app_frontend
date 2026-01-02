import { useDispatch } from "react-redux"
import AdminRoutes from "./routes/AdminRoutes"
import UserRoutes from "./routes/UserRoutes"
import WebsiteRoutes from "./routes/WebsiteRoutes"
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { userAuthDataAdd } from "./features/auth/authSlice";
import type { AppDispatch } from "./app/store";



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

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />

          <Route path="/user/*" element={<UserRoutes />} />

          <Route path="/*" element={<WebsiteRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
