import React, { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import {
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineChatAlt2,
  HiChevronRight,
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineCloudDownload,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import {
  MdOutlineQuiz,
  MdOutlineAutoGraph,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { useDashboardCountsGet } from "../../hooks/useDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { NavLink } from "react-router-dom";

// --- ANIMATION HELPER ---
const Counter = ({
  value,
  suffix = "",
}: {
  value: string | number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const numericValue =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setCount(latest),
    });
    return () => controls.stop();
  }, [numericValue]);

  return (
    <span>
      {count.toLocaleString(undefined, {
        maximumFractionDigits: numericValue % 1 === 0 ? 0 : 1,
      })}
      {suffix}
    </span>
  );
};

const Dashboard: React.FC = () => {
  const businessId = useSelector((state: RootState) => state.auth.user_id);
  const { data } = useDashboardCountsGet({
    business_id: businessId!,
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 lg:p-10 font-sans selection:bg-orange-100">
      {/* --- TOP NAV --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200"
          >
            <HiOutlineLightningBolt className="text-white text-2xl" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Quiz Admin
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Optimal
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search data..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm text-sm"
             
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition text-slate-600 shadow-sm active:scale-95">
            <HiOutlineChatAlt2 className="text-xl" />
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <QuickAction
          icon={<HiOutlinePlus />}
          label="Create Quiz"
          primary
          path="/admin/quiz-list"
        />
        <QuickAction
          icon={<MdOutlineTrackChanges />}
          label="New Category"
          path="/admin/categories"
        />
        <QuickAction icon={<HiOutlineCloudDownload />} label="Export CSV" />
        <QuickAction
          icon={<HiOutlineEmojiHappy />}
          label="Users"
          path="/admin/users"
        />
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Students"
          value={data?.data?.totalCustomers}
          change="+12%"
          icon={<HiOutlineUserGroup />}
          color="orange"
        />
        <StatCard
          title="Quizzes Taken"
          value={data?.data?.totalAttemptedQuizzes}
          change="+8.2%"
          icon={<MdOutlineQuiz />}
          color="rose"
        />
        <StatCard
          title="Total Quiz's"
          value={data?.data?.totalQuizzes}
          change="+2.1%"
          icon={<MdOutlineAutoGraph />}
          color="emerald"
        />
        <StatCard
          title="Total Categories"
          value={data?.data?.totalCategories}
          change="Live"
          icon={<HiOutlineLightningBolt />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* --- MAIN COLUMN --- */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Performance</h3>
              <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                View Analytics
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.15em] font-black">
                  <tr>
                    <th className="px-8 py-5">Student</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Score</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
  {data?.data?.topRecentUsers?.length > 0 ? (
    data.data.topRecentUsers.map((users: any, index: number) => (
      <TableRow
        image={users?.user_image}
        key={index}
        name={users?.user_name}
        email={users?.user_email}
        category={users?.category_name}
        score={`${users?.score_percentage ?? 0}%`}
        status={users?.score_percentage > 50 ? "Pass" : "Fail"}
      />
    ))
  ) : (
    <tr>
      <td
        colSpan={5}
        className="py-4 text-center text-[12px] text-slate-400"
      >
        No Data Available!
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div>
                <HiOutlineCalendar className="text-3xl mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-1">Upcoming Exam</h3>
                <p className="text-slate-400 text-sm">
                  Fullstack Certification starts in 2h.
                </p>
              </div>
              <button className="mt-8 w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-sm hover:bg-orange-600 transition shadow-lg shadow-orange-900/20">
                Notify All
              </button>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Feedback</h3>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-1 rounded-lg uppercase">
                  New
                </span>
              </div>
              <p className="text-sm text-slate-500 italic leading-relaxed">
                "The React quiz was challenging but fair. Would love more hooks
                questions!"
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-8 h-8 bg-slate-100 rounded-full border border-white" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  James Wilson
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2 text-xs uppercase tracking-widest">
              <span className="w-1.5 h-4 bg-orange-500 rounded-full" /> Top
              Latest Categories
            </h3>
            {data?.data?.latestCategories?.length > 0 ? (
  <div className="space-y-8">
    {data.data.latestCategories.slice(0, 3).map((category: any, index: any) => (
      <CategoryMetric
        key={index}
        label={category.category_name}
        total={category.quiz_list.length}
        progress={category.quiz_list.length}
        color={
          ["bg-orange-500", "bg-rose-500", "bg-amber-500"][index]
        }
      />
    ))}
  </div>
) : (
  <div className="space-y-8">
    <p className="text-[12px] text-center">No Data Available!</p>
  </div>
)}

            
           
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 mb-6 text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />{" "}
              Live Pulse
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium italic">
                  React Hooks
                </span>
                <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                  24 active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium italic">
                  UI Design
                </span>
                <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                  12 active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE SUB-COMPONENTS ---

const QuickAction = ({ icon, label, primary, path }: any) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className={`flex items-center justify-center gap-3 px-5 py-3 rounded-3xl cursor-pointer font-black text-[10px] uppercase tracking-widest transition-all
    ${
      primary
        ? "bg-orange-500 text-white shadow-xl shadow-orange-100 hover:bg-orange-600"
        : "bg-white border-2 border-slate-50 text-slate-400 hover:border-orange-200 hover:text-orange-500"
    }`}
  >
    <NavLink to={path} className={"w-full flex justify-center items-center"}>
      <span className="text-lg mr-2">{icon}</span> {label}
    </NavLink>
  </motion.button>
);

const StatCard = ({ title, value, change, icon, color, suffix }: any) => {
  const colors: any = {
    orange: "bg-orange-50 text-orange-600",
    rose: "bg-rose-50 text-rose-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
    >
      <div className="flex justify-between items-start mb-6">
        <div
          className={`p-4 rounded-2xl transition-transform group-hover:scale-110 shadow-sm ${colors[color]}`}
        >
          {icon}
        </div>
        <span
          className={`text-[10px] font-black px-2 py-1 rounded-lg ${
            change.includes("+")
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
        {title}
      </p>
      <h2 className="text-3xl font-bold text-slate-800 mt-1">
        <Counter value={value} suffix={suffix} />
      </h2>
    </motion.div>
  );
};

const TableRow = ({ name, email, category, score, status, image }: any) => (
  <tr className="hover:bg-orange-50/30 transition-colors cursor-pointer group">
    <td className="px-8 py-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-slate-100 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center font-black text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all overflow-hidden">
  {image ? (
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  ) : (
    <span className="uppercase">{name?.charAt(0)}</span>
  )}
</div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-[10px] text-slate-400 font-medium">{email}</p>
        </div>
      </div>
    </td>
    <td className="px-8 py-5 text-sm text-slate-500 font-bold">{category}</td>
    <td className="px-8 py-5 text-sm font-black text-slate-800">{score}</td>
    <td className="px-8 py-5 text-right">
      <span
        className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter ${
          status === "Pass"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-rose-100 text-rose-700"
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);

const CategoryMetric = ({ label, total, progress, color }: any) => (
  <div>
    <div className="flex justify-between items-end mb-3">
      <div>
        <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
          {label}
        </p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {total} Active
        </p>
      </div>
      <HiChevronRight className="text-slate-300" />
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  </div>
);

export default Dashboard;
