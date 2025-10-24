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

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/quiz-list" element={<QuizList />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/media" element={<Media />} />
          <Route path="/admin/profile-settings" element={<ProfileSettings />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
