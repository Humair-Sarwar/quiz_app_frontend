import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import QuizList from "../pages/admin/QuizList";
import Users from "../pages/admin/Users";
import Media from "../pages/admin/Media";
import Settings from "../pages/admin/Settings";
import ProfileSettings from "../pages/admin/ProfileSettings";
import PrivateRoute from "./PrivateAdminRoute";
import ScrollToTop from "../components/ScrollToTop";
import PageNotFound from "../pages/website/PageNotFound";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<><ScrollToTop/><AdminLayout /></>}>
        
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/quiz-list" element={<PrivateRoute><QuizList /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/media" element={<PrivateRoute><Media /></PrivateRoute>} />
          <Route path="/profile-settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
