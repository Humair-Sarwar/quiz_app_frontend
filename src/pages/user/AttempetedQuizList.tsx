import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Pagination from '../../components/Pagination';
import { FaEye, FaListCheck } from "react-icons/fa6";
import { useAttemptedQuizList } from '../../hooks/useCustomer';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import ViewStudentQuizAttemptedData from '../../components/ViewStudentQuizAttemptedData';
import SearchInput from '../../components/SearchInput';
import QuizPopup from '../../components/QuizPopup';
import { MdRestartAlt } from 'react-icons/md';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const AttempetedQuizList: React.FC = () => {
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [quiz_id, set_quiz_id] = useState<string>("")
  const [user_attempted_quiz_id, set_user_attempted_quiz_id]=useState("")
  const [viewAttQuiz, setViewAttQuiz] = useState<any>([]);
  const [attDate, setAttDate] = useState("");
  const [viewCustomerAttData, setViewCustomerAttData] = useState<boolean>(false);
  const handleClosePopup = () => setViewCustomerAttData(false);
  const businessId = useSelector((state: RootState) => state.auth.user_id);
   const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useAttemptedQuizList({
      user_id: businessId!,
      search,
    page,
    limit: pageSize,
    });
    const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    };
    const prevClick = () => setPage(page - 1);
      const nextClick = () => setPage(page + 1);
      const clickNum = (n: number) => setPage(n);
      const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(e.target.value));
        setPage(1);
      };
  return (<>
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='w-full'
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className='md:text-2xl text-[20px] font-bold text-slate-900 flex items-center gap-3'>
            <div className="p-2 bg-orange-100 rounded-lg">
              <FaListCheck className="text-[#ff5b07]" size={20} />
            </div>
            Solved Quiz List
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Review your performance and past attempts.</p>
        </div>
        <div>
          <SearchInput
            placeholder="Search Quiz..."
            handleSearch={handleSearch}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-hidden bg-white rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-5 text-[11px] whitespace-nowrap font-bold uppercase tracking-[0.15em] text-slate-400">Sr. #</th>
                <th className="px-6 py-5 text-[11px] whitespace-nowrap font-bold uppercase tracking-[0.15em] text-slate-400">Quiz Name</th>
                <th className="px-6 py-5 text-[11px] whitespace-nowrap font-bold uppercase tracking-[0.15em] text-slate-400">Category</th>
                <th className="px-6 py-5 text-[11px] whitespace-nowrap font-bold uppercase tracking-[0.15em] text-slate-400 text-center">Questions</th>
                <th className="px-6 py-5 text-[11px] whitespace-nowrap font-bold uppercase tracking-[0.15em] text-slate-400">Score Stats</th>
                <th className="px-6 py-5 text-[11px] whitespace-nowrap font-bold uppercase tracking-[0.15em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>

        <tbody className="divide-y divide-slate-50">
  {isLoading ? (
    // Professional Skeleton Loader or Spinner Row
    <tr>
      <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-medium">
        <div className="flex justify-center items-center gap-2">
          <div className="w-5 h-5 border-2 border-[#ff5b07] border-t-transparent rounded-full animate-spin" />
          Loading results...
        </div>
      </td>
    </tr>
  ) : data?.data?.length > 0 ? (
    data.data.map((quiz: any, index: number) => {
      // 💡 Calculate percentage dynamically
      const correctPercent = (quiz?.correct / quiz?.total_questions) * 100;

      return (
        <motion.tr
          key={quiz?._id || index}
          variants={rowVariants}
          initial="initial"
          animate="animate"
          className="hover:bg-slate-50/80 transition-colors group"
        >
          <td className="px-6 py-4 text-sm font-bold text-slate-300">
            {String(index + 1).padStart(2, '0')}
          </td>
          
          <td className="px-6 py-4">
            <div className="text-sm whitespace-nowrap font-bold text-slate-800 group-hover:text-[#ff5b07] transition-colors line-clamp-1">
              {quiz?.quiz_title}
            </div>
            <div className="text-[10px] whitespace-nowrap text-slate-400 font-semibold uppercase tracking-tight">
              {new Date(quiz?.attempted_on).toLocaleDateString("en-US", {
                month: "short", day: "2-digit", year: "numeric"
              })} • {new Date(quiz?.attempted_on).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </td>

          <td className="px-6 py-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-lg tracking-wider group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
              {quiz?.category_name}
            </span>
          </td>

          <td className="px-6 py-4 text-center">
            <span className="text-sm font-bold text-slate-700">{quiz?.total_questions}</span>
            <p className="text-[9px] text-slate-400 font-bold uppercase">Items</p>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col flex-1 min-w-[100px]">
                <div className="flex justify-between mb-1">
                   <span className="text-[10px] font-bold text-green-600 uppercase whitespace-nowrap">Correct: {quiz?.correct}</span>
                   <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{Math.round(correctPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${correctPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-green-500 h-full rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-red-400 uppercase whitespace-nowrap">Wrong: {quiz?.incorrect}</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase whitespace-nowrap">Skip: {quiz?.skipped}</span>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex justify-center gap-3">
              <motion.button 
              onClick={()=> {setViewAttQuiz(quiz?.detailed_questions); setViewCustomerAttData(true); setAttDate(quiz?.attempted_on)}}
                whileHover={{ scale: 1.1, backgroundColor: "#fff5ed" }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-white border cursor-pointer border-slate-100 text-slate-400 hover:text-[#ff5b07] hover:border-orange-200 rounded-xl shadow-sm transition-all"
              >
                <FaEye size={16} />
              </motion.button>
              <motion.button 
              onClick={()=> {setStartQuiz(true); set_quiz_id(quiz?.quiz_id); set_user_attempted_quiz_id(quiz?.attempted_quiz_id)}}
                whileHover={{ scale: 1.1, backgroundColor: "#fff5ed" }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-white border cursor-pointer border-slate-100 text-slate-400 hover:text-[#ff5b07] hover:border-orange-200 rounded-xl shadow-sm transition-all"
              >
                <MdRestartAlt size={16} />
              </motion.button>
            </div>
          </td>
        </motion.tr>
      );
    })
  ) : (
    // Professional Empty State Row
    <tr>
      <td colSpan={6} className="px-6 py-20 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <FaEye className="text-slate-200 text-3xl" />
          </div>
          <h4 className="text-slate-900 font-bold">No quizzes found</h4>
          <p className="text-slate-400 text-sm mt-1">Start your first challenge to see results here.</p>
        </div>
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>

        {/* Pagination Footer Integration */}
        {data?.data?.length > 0 && <div className="p-6 bg-slate-50/30 border-t border-slate-100">
           <Pagination currentPage={data?.pagination?.currentPage}
                clickNum={clickNum}
                prevClick={prevClick}
                nextClick={nextClick}
                page={page}
                totalPages={totalPages}
                handlePageSize={handlePageSize}
                totalItems={totalItems}
                firstRecord={data?.pagination?.firstRecord}
                lastRecord={data?.pagination?.lastRecord}
                pageSize={pageSize}/>
        </div>}
        
      </div>
    </motion.div>

    {viewCustomerAttData && (
        <ViewStudentQuizAttemptedData attDate={attDate} attempts={viewAttQuiz} handleClosePopup={handleClosePopup} />
      )}
      
      
            {startQuiz && <QuizPopup onClose={() => setStartQuiz(false)} quiz_id={quiz_id} user_attempted_quiz_id={user_attempted_quiz_id}/>}

      
      
      </>
  );
}

export default AttempetedQuizList;