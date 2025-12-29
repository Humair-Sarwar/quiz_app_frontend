import React from "react";
import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout/WebsiteLayout";
import Home from "../pages/website/Home";
import Login from "../pages/website/Login";
import Signup from "../pages/website/Signup";
import CategoriesListingPage from "../pages/website/CategoriesListingPage";
import QuizListing from "../pages/website/QuizListing";

import { handleError } from "../toast";
import useWebsite from "../hooks/useWebsite";
import ComingSoon from "../pages/website/ComingSoon";
import Maintenance from "../pages/website/Maintenance";

const WebsiteRoutes: React.FC = () => {
  const { data, error, isLoading } = useWebsite();
  console.log(data, error, "==========");
  if (error) {
    handleError("Something went wrong!");
  }
  return (
    <>
      <Routes>
        <Route
          element={<WebsiteLayout data={data?.data} isLoading={isLoading} />}
        >
          <Route
            index
            element={<Home data={data?.data} isLoading={isLoading} />}
          />
          <Route path="categories" element={<CategoriesListingPage />} />
          <Route path="categories/:slug" element={<QuizListing />} />
          
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="join-now" element={<Signup />} />
        <Route path="coming-soon" element={<ComingSoon />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Routes>
    </>
  );
};

export default WebsiteRoutes;
