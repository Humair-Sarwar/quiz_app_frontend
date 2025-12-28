import React, { useState } from "react";
import { motion, type Variants } from "framer-motion"; // ✨ Type-safe animation imports
import coding from "../../assets/images/coding.png";
import Pagination from "../../components/Pagination";
import QuizPopup from "../../components/QuizPopup";
import useQuizList from "../../hooks/useQuizList";
import { handleError } from "../../toast";
import { useLocation } from "react-router-dom";
import { HiOutlineSearch, HiOutlineClock, HiOutlineClipboardList } from "react-icons/hi";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect for quiz cards
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom "out-expo" ease
  },
};

const QuizListing: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.split("/").pop() || "";
  
  const [search, setSearch] = useState<string>("");
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, error, isLoading } = useQuizList({
    search,
    category_slug: slug,
    limit: pageSize,
    page,
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (error) handleError("Something went wrong!");

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      {/* --- HERO HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 pt-16 pb-12 shadow-sm"
      >
        <div className="container mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <nav className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                <span>Categories</span>
                <span>/</span>
                <span className="text-[#ff5b07]">{slug.replace(/-/g, ' ')}</span>
              </nav>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 capitalize tracking-tight">
                {slug.replace(/-/g, ' ')} <span className="text-[#ff5b07]">Quizzes</span>
              </h1>
            </div>

            <div className="relative group w-full max-w-md">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors" size={20} />
              <input
                type="text"
                placeholder="Find a specific quiz..."
                className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-[#ff5b07]/20 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-[1400px] py-12 px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(pageSize)].map((_, i) => (
              <div key={i} className="h-80 bg-white rounded-[2.5rem] border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : data?.data?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200"
          >
             <p className="text-slate-500 font-medium text-lg">No quizzes found in this category.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {data?.data?.map((quiz: any) => (
              <motion.div 
                key={quiz._id} 
                variants={cardVariants}
                whileHover={{ y: -8 }} // Interactive lift
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white border border-slate-100 p-6 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(255,91,7,0.15)] flex flex-col"
              >
                {/* Image / Icon Container */}
                <div className="relative w-full aspect-video bg-slate-50 rounded-[2rem] mb-6 flex items-center justify-center overflow-hidden group-hover:bg-orange-50 transition-colors">
                  <img 
                    src={coding} 
                    alt="quiz" 
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-600 border border-white">
                    Free
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-[#ff5b07] transition-colors line-clamp-2">
                  {quiz.quiz_title}
                </h3>

                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-8">
                  <div className="flex items-center gap-1.5">
                    <HiOutlineClipboardList className="text-[#ff5b07]" />
                    10 Questions
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineClock className="text-[#ff5b07]" />
                    15 Mins
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => setStartQuiz(true)}
                  className="mt-auto w-full cursor-pointer py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#ff5b07] shadow-lg shadow-slate-200 hover:shadow-orange-200 transition-all active:scale-95"
                >
                  Start Quiz
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* --- PAGINATION --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
        >
          <Pagination
            currentPage={data?.pagination?.currentPage}
            prevClick={() => setPage(p => p - 1)}
            nextClick={() => setPage(p => p + 1)}
            clickNum={(n: number) => setPage(n)}
            handlePageSize={(e: any) => { setPageSize(Number(e.target.value)); setPage(1); }}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={totalItems}
            page={page}
            firstRecord={data?.pagination?.firstRecord}
            lastRecord={data?.pagination?.lastRecord}
          />
        </motion.div>
      </div>

      {startQuiz && <QuizPopup onClose={() => setStartQuiz(false)} />}
    </div>
  );
};

export default QuizListing;