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
import ScrollToTop from "../components/ScrollToTop";
import PageNotFound from "../pages/website/PageNotFound";

const WebsiteRoutes: React.FC = () => {
  const { data, error, isLoading } = useWebsite();
  if (error) {
    handleError("Something went wrong!");
  }
  return (
    <>
    <Routes>
        <Route
          element={<><ScrollToTop/>{data?.data?.website_mode == 1 && <WebsiteLayout data={data?.data} isLoading={isLoading} />}</>}
        >
          {data?.data?.website_mode == 1 && <>
          <Route
            index
            element={<Home data={data?.data} isLoading={isLoading} />}
          />
          <Route path="categories" element={<CategoriesListingPage />} />
          <Route path="categories/:slug" element={<QuizListing />} />
          </>}
          
        </Route>

        <Route path="login" element={<Login />} />
        {data?.data?.website_mode == 1 && <>
        <Route path="join-now" element={<Signup />} />
        
        </>}
          {data?.data?.website_mode == 2 && <Route path="/" element={<ComingSoon />} />}
          {data?.data?.website_mode == 3 && <Route path="/" element={<Maintenance />} />}
          <Route path="*" element={<PageNotFound />} />
      </Routes>
      
    </>
  );
};

export default WebsiteRoutes;
