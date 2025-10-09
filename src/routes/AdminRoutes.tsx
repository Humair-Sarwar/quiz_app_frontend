import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import QuizList from "../pages/admin/QuizList";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/quiz-list" element={<QuizList />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
