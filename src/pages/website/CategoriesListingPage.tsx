import React, { useState } from "react";
import { motion, type Variants } from "framer-motion"; // ✨ Combined version
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router-dom";
import useWebsiteCategories from "../../hooks/useWebsiteCategories";
import { handleError } from "../../toast";
import no_image from "../../assets/images/no_image.png";
import { HiOutlineSearch, HiOutlineViewGrid } from "react-icons/hi";

// --- ANIMATION VARIANTS ---
// Explicitly typing as 'Variants' fixes the index signature error
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" } 
  },
};

const CategoriesListingPage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, error } = useWebsiteCategories({
    search,
    page,
    limit: pageSize,
  });

  const totalItems = data?.pagination?.totalItems;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (error) handleError("Something went wrong!");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 overflow-x-hidden">
      {/* --- PAGE HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 pt-16 pb-12"
      >
        <div className="container mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-[#ff5b07] font-bold text-xs uppercase tracking-[0.2em] mb-3">
                <HiOutlineViewGrid size={18} />
                Explore Knowledge
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                All Categories
              </h1>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="relative group max-w-md w-full"
            >
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#ff5b07] transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search for a topic..."
                className="w-full pl-12 pr-4 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-[#ff5b07]/20 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                onChange={handleSearch}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-[1400px] py-12 px-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 animate-pulse">
                <div className="aspect-square bg-slate-100 rounded-2xl mb-4"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : data?.data?.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-20 text-center mb-10 bg-white rounded-[3rem] border border-dashed border-slate-200"
          >
            <p className="text-slate-400 text-lg font-medium">No categories found matching "{search}"</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16"
          >
            {data?.data?.map((category: any) => (
              <motion.div 
                key={category._id} 
                variants={itemVariants}
                whileHover={{ y: -5 }} // Subtle float on hover
                whileTap={{ scale: 0.97 }} // Click feedback
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* --- PAGINATION SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <Pagination
            currentPage={data?.pagination?.currentPage}
            clickNum={(n: number) => setPage(n)}
            prevClick={() => setPage(p => p - 1)}
            nextClick={() => setPage(p => p + 1)}
            page={page}
            totalPages={totalPages}
            handlePageSize={(e: any) => {
              setPageSize(parseInt(e.target.value));
              setPage(1);
            }}
            totalItems={totalItems}
            firstRecord={data?.pagination?.firstRecord}
            lastRecord={data?.pagination?.lastRecord}
            pageSize={pageSize}
          />
        </motion.div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: any }) => (
  <NavLink to={"/categories/" + category?.slug} className="group block h-full">
    <div className="h-full bg-white border border-slate-100 p-6 rounded-[2.5rem] text-center transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(255,91,7,0.12)] group-hover:border-orange-100">
      <div className="aspect-square flex items-center justify-center mb-6 bg-slate-50 rounded-[2rem] group-hover:bg-orange-50 transition-colors duration-500 overflow-hidden relative">
        <img
          src={!category?.image ? no_image : `${import.meta.env.VITE_BASE_URL}/uploads/${category.image}`}
          alt={category?.category_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-lg font-black text-slate-800 group-hover:text-[#ff5b07] transition-colors leading-tight">
        {category?.category_name}
      </h3>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
        View Challenges
      </p>
    </div>
  </NavLink>
);

export default CategoriesListingPage;