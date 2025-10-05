import React from "react";
import coding from "../../assets/images/coding.png";
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router-dom";

const CategoriesListingPage: React.FC = () => {
  return (
    <>
      <div className="bg-[#f0f0f0] w-full">
        <div className="container mx-auto  max-w-[1400px] py-15 px-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-center mb-5 text-3xl lg:text-4xl">
              All Categories
            </h2>
            <input
              type="text"
              className="input-target-set-field"
              placeholder="Search Category..."
            />
          </div>

          <div className="my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <NavLink to={'/categories/list'}>
              <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                <div className="flex justify-center items-center box-image">
                  <img src={coding} alt="" />
                </div>
                <h3 className="text-lg font-semibold mt-3">Coding</h3>
              </div></NavLink>
              <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                <div className="flex justify-center items-center box-image">
                  <img src={coding} alt="" />
                </div>
                <h3 className="text-lg font-semibold mt-3">Coding</h3>
              </div>
              <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                <div className="flex justify-center items-center box-image">
                  <img src={coding} alt="" />
                </div>
                <h3 className="text-lg font-semibold mt-3">Coding</h3>
              </div>
              <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                <div className="flex justify-center items-center box-image">
                  <img src={coding} alt="" />
                </div>
                <h3 className="text-lg font-semibold mt-3">Coding</h3>
              </div>
              <div className="p-4 rounded-2xl text-center mx-2 category-box-target my-5 bg-white">
                <div className="flex justify-center items-center box-image">
                  <img src={coding} alt="" />
                </div>
                <h3 className="text-lg font-semibold mt-3">Coding</h3>
              </div>
            </div>




            <Pagination/>

          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesListingPage;
