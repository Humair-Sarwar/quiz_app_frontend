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
import PageNotFound from "../pages/website/PageNotFound";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/admin/quiz-list" element={<PrivateRoute><QuizList /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/admin/media" element={<PrivateRoute><Media /></PrivateRoute>} />
          <Route path="/admin/profile-settings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
