import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout/UserLayout";
import AttempetedQuizList from "../pages/user/AttempetedQuizList";
import Profile from "../pages/user/Profile";

const UserRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/user/quiz-list" element={<AttempetedQuizList />} />
          <Route path="/user/profile-info" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
