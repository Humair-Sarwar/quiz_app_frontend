import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import { MdDelete, MdOutlineContentCopy, MdPermMedia } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadImg from "../../components/UploadImg";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useMediaImagesShow } from "../../hooks/useMedia";

const Media: React.FC = () => {
  useMediaImagesShow;
  const [uploadImgPop, setUploadImgPop] = useState<boolean>(false);
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const handleClosePopup = () => {
    setUploadImgPop(false);
  };
  const { data, isLoading } = useMediaImagesShow({
    page,
    limit: pageSize,
    business_id: businessId || "",
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);
  const prevClick = () => {
    setPage(page - 1);
  };
  const nextClick = () => {
    setPage(page + 1);
  };
  const clickNum = (data: number) => {
    setPage(data);
  };
  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  console.log("ppppp", data);
  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh - 60px)]">
        <div className="flex justify-between items-start flex-col lg:flex-row md:flex-row lg:items-center md:items-center">
          <h2 className="text-[20px] font-semibold flex items-center gap-2 mb-3 text-nowrap">
            <MdPermMedia className="text-[20px]" /> Media
          </h2>
          <button
            className="primary-button flex items-center gap-2 w-full lg:w-auto md:w-auto justify-center"
            onClick={() => {
              setUploadImgPop(true);
            }}
          >
            <IoCloudUploadOutline />
            Upload
          </button>
        </div>

        <div className="p-4 bg-white rounded-[10px] mt-5 shadow">
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, idx) => (
              
                <div key={idx} className="rounded-[10px] h-[85px] overflow-hidden relative">
                  <div className="animate-pulse h-full w-full bg-gray-200 rounded-[10px]" />
                </div>
              ))
              
            ) : data?.data?.length > 0 ? (
              data?.data?.map((image: any, index: number) => (
                <div
                  key={index}
                  className="rounded-[10px] h-[85px] overflow-hidden relative"
                >
                  <img
                    src={
                      import.meta.env.VITE_BASE_URL + "/uploads/" + image?.image
                    }
                    className="h-[100%] w-[100%] object-cover"
                    alt=""
                  />
                  <div className="absolute left-[5px] top-[5px] flex gap-1">
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all">
                      <MdOutlineContentCopy className="text-orange-500" />
                    </div>
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all">
                      <FaEye className="text-orange-500" />
                    </div>
                    <div className="bg-[#ffffff9c] rounded-[50%] p-[4px] cursor-pointer hover:bg-[#ffffffe3] transition-all">
                      <MdDelete className="text-orange-500" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No Image Available!</p>
            )}
          </div>
        </div>

        {!isLoading && (
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
        )}
      </div>

      {uploadImgPop && (
        <UploadImg
          handleClosePopup={handleClosePopup}
          businessId={businessId ?? undefined}
        />
      )}
    </>
  );
};

export default Media;
