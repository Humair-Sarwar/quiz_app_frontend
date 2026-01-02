import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout/UserLayout";
import AttempetedQuizList from "../pages/user/AttempetedQuizList";
import Profile from "../pages/user/Profile";
import PrivateUserRoute from "./PrivateUserRoute";
import ScrollToTop from "../components/ScrollToTop";
import PageNotFound from "../pages/website/PageNotFound";

const UserRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<><ScrollToTop/><UserLayout /></>}>
          <Route path="/quiz-list" element={<PrivateUserRoute><AttempetedQuizList /></PrivateUserRoute>} />
          <Route path="/profile-info" element={<PrivateUserRoute><Profile /></PrivateUserRoute>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default UserRoutes;
