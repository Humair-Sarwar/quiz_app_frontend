import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { IoClose, IoExpandOutline } from "react-icons/io5";

interface ImageViewProps {
  image?: string;
  handleClosePopup?: () => void;
}

const ImageViewPopup: React.FC<ImageViewProps> = ({
  image,
  handleClosePopup
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClosePopup?.();
    }, 300);
  };

  return (
    <>
      <Overlay isVisible={isVisible} />

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-[80] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="bg-white rounded-[32px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] w-full max-w-[650px] overflow-hidden relative border border-slate-100">
          
          {/* --- Floating Header --- */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-white/90 to-transparent backdrop-blur-[2px]">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-orange-500 rounded-lg text-white shadow-lg shadow-orange-100">
                <IoExpandOutline size={18} />
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-tight uppercase">
                Image Preview
              </span>
            </div>
            
            <button
              onClick={handleCloseWithAnimation}
              className="p-2 cursor-pointer bg-white/80 hover:bg-red-500 text-slate-500 hover:text-white rounded-xl transition-all shadow-sm border border-slate-100 backdrop-blur-md active:scale-90"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* --- Image Display Area --- */}
          <div className="p-3 pt-16 bg-slate-50">
            <div className="relative group rounded-[22px] overflow-hidden bg-white border border-slate-200 shadow-inner">
              <img
                src={import.meta.env.VITE_BASE_URL + "/uploads/" + image}
                alt="Full Preview"
                className="w-full max-h-[70vh] object-contain block mx-auto transition-transform duration-700 hover:scale-105"
              />
              
              {/* Subtle Bottom Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-white font-bold tracking-[0.2em] uppercase text-center">
                  Digital Asset View
                </p>
              </div>
            </div>
          </div>

          {/* --- Footer Action --- */}
          <div className="px-6 py-4 bg-white flex justify-center">
             <button 
                onClick={handleCloseWithAnimation}
                className="px-8 cursor-pointer py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
             >
                Close Preview
             </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ImageViewPopup;