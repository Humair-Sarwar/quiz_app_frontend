import React, { useEffect } from "react";
import Overlay from "./Overlay";
import { IoClose, IoTrashOutline, IoAlertCircleOutline } from "react-icons/io5";
import SpinnerLoader from "./SpinnerLoader";

interface DeletePopupProps {
  handleClosePopup?: () => void;
  business_id?: string | null;
  id?: string;
  selectedItems?: object[];
  handleDelete?: () => void;
  handleCloseWithAnimation?: () => void;
  isPendingDel?: boolean;
  isVisible?: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  handleDelete,
  handleCloseWithAnimation,
  isPendingDel = false,
  isVisible = false,
  setIsVisible,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [setIsVisible]);

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-[40px] shadow-[0_32px_80px_-15px_rgba(0,0,0,0.25)] w-full max-w-lg relative overflow-hidden border border-slate-50 p-8 sm:p-10 text-center">
          
          {/* Header Accent (Red for Warning) */}
          <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-600 to-pink-500"></div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => handleCloseWithAnimation?.()}
            className="absolute cursor-pointer right-6 top-6 w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 border border-slate-100"
          >
            <IoClose size={20} />
          </button>

          {/* Warning Icon with Glow */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-red-50 rounded-[28px] flex items-center justify-center text-red-500 border border-red-100">
                <IoTrashOutline size={40} />
              </div>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-semibold text-slate-900 tracking-tight leading-none mb-3">
            Confirm Deletion
          </h3>
          <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 px-4">
            Are you sure you want to remove this record? This action is permanent and cannot be undone.
          </p>

          {/* Buttons with Premium Font Style */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleCloseWithAnimation?.()}
              className="flex-1 py-4.5 cursor-pointer px-6 text-[12px] font-black text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-[20px] transition-all uppercase tracking-[0.2em]"
            >
              Keep Record
            </button>

            <button
              onClick={() => handleDelete?.()}
              disabled={isPendingDel}
              className={`flex-[1.5] relative group overflow-hidden py-4.5 px-6 bg-slate-900 text-white rounded-[20px] font-black text-[12px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/20 active:scale-[0.97] ${
                isPendingDel ? "opacity-80 cursor-not-allowed" : "hover:bg-red-600 hover:shadow-red-500/30"
              }`}
            >
              <div className="relative  cursor-pointer flex items-center justify-center gap-2">
                {isPendingDel ? (
                  <>
                    <SpinnerLoader /> <span>Wiping...</span>
                  </>
                ) : (
                  <>
                    <IoAlertCircleOutline size={18} />
                    <span>Delete</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopup;