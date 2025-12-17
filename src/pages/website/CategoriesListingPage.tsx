import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router-dom";
import useWebsiteCategories from "../../hooks/useWebsiteCategories";
import { handleError } from "../../toast";
import no_image from "../../assets/images/no_image.png";

const CategoriesListingPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState<string>("");
  const { data, isLoading, error } = useWebsiteCategories({
    search,
    page,
    limit: pageSize,
  });
  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (error) {
    handleError("Something went wrong!");
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const prevClick = () => {
    setPage(page - 1);
  };
  const nextClick = () => {
    setPage(page + 1);
  };
  const clickNum = (data: number) => {
    setPage(data);
  };
  const handlePageSize = (e: React.ChangeEvent<HTMLOptionElement>) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };
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
              onChange={handleSearch}
            />
          </div>
          {isLoading ? (
            // <div className="flex justify-center items-center">
            //   <MainSpinnerLoader />
            // </div>
            <div className="my-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                  <div className="animate-pulse space-y-4">
                    <div className="h-45 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : data?.data?.length == 0 ? (
            <p className="text-center">No data available!</p>
          ) : (
            <div className="my-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {data?.data?.map(
                  (category: {
                    slug: string;
                    image: string;
                    category_name: string;
                  }) => (
                    <NavLink to={"/categories/" + category?.slug}>
                      <div className="p-4 rounded-2xl text-center m-2 category-box-target bg-white">
                        <div className="flex justify-center items-center box-image">
                          <img
                            src={
                              category?.image == null ||
                              category?.image == undefined ||
                              category?.image == ""
                                ? no_image
                                : import.meta.env.VITE_BASE_URL +
                                  "/uploads/" +
                                  category?.image
                            }
                            alt=""
                          />
                        </div>
                        <h3 className="text-lg font-semibold mt-3">
                          {category?.category_name}
                        </h3>
                      </div>
                    </NavLink>
                  )
                )}
              </div>
            </div>
          )}
          <Pagination
            currentPage={data?.pagination?.currentPage}
            clickNum={clickNum}
            prevClick={prevClick}
            nextClick={nextClick}
            page={page}
            totalPages={totalPages}
            handlePageSize={handlePageSize}
            totalItems={totalItems}
            firstRecord={data?.pagination?.firstRecord}
            lastRecord={data?.pagination?.lastRecord}
            pageSize={pageSize}
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesListingPage;
