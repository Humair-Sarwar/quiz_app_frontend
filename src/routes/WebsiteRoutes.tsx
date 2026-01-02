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
import { HiOutlineLightBulb } from "react-icons/hi";

const WebsiteRoutes: React.FC = () => {
  const { data, error, isLoading } = useWebsite();

  if (isLoading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Professional Orbit Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          {/* Animated Orbiting Path */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#ff5b07] border-l-[#ff5b07] rounded-full animate-spin"></div>
          {/* Inner Pulsing Glow */}
          <div className="absolute inset-4 bg-orange-50 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-2 h-2 bg-[#ff5b07] rounded-full"></div>
          </div>
        </div>

        {/* Brand Identity */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-[#ff5b07] rounded-2xl text-white shadow-[0_8px_30px_rgb(255,91,7,0.3)] animate-bounce-slow">
              <HiOutlineLightBulb className="text-3xl" />
            </div>
            <h3 className="font-black text-3xl tracking-tighter text-slate-800">
              Quiz<span className="text-[#ff5b07]">Master</span>
            </h3>
          </div>
          
          {/* Elegant Loading Text */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Initializing Experience
            </span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-[#ff5b07] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-[#ff5b07] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-[#ff5b07] rounded-full animate-bounce"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

  if (error) {
    handleError("Something went wrong!");
  }

  const websiteMode = data?.data?.website_mode;

  return (
    <>
      <Routes>
        {websiteMode === 1 && (
          <Route
            element={
              <>
                <ScrollToTop />
                <WebsiteLayout data={data?.data} isLoading={isLoading} />
              </>
            }
          >
            <Route index element={<Home data={data?.data} isLoading={isLoading} />} />
            <Route path="categories" element={<CategoriesListingPage />} />
            <Route path="categories/:slug" element={<QuizListing />} />
          </Route>
        )}

        <Route path="login" element={<Login />} />
        
        {websiteMode === 1 && <Route path="join-now" element={<Signup />} />}
        
        {websiteMode === 2 && <Route path="/" element={<ComingSoon />} />}
        {websiteMode === 3 && <Route path="/" element={<Maintenance />} />}
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};


export default WebsiteRoutes;
