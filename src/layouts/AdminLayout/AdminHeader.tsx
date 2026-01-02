import React, { useState, useRef, useEffect } from 'react';
import { BiWorld, BiBell, BiCheckCircle, BiInfoCircle, BiTrash, BiEnvelopeOpen } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

interface AdminHeaderProps {
  handleShowSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ handleShowSidebar }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const notifications = [
    { id: 1, title: "New Order #4421", time: "2m ago", icon: <BiCheckCircle className="text-emerald-500" />, desc: "Customer paid $120.00", unread: true },
    { id: 2, title: "Server Alert", time: "1h ago", icon: <BiInfoCircle className="text-blue-500" />, desc: "Memory usage is above 80%.", unread: false },
    { id: 3, title: "Stock Warning", time: "3h ago", icon: <BiBell className="text-orange-500" />, desc: "Nike Air Max is low in stock.", unread: true },
  ];

  const filteredNotif = activeTab === 'all' ? notifications : notifications.filter(n => n.unread);

  return (
    <header className='sticky top-0 z-[40] w-full bg-white/80 backdrop-blur-md border-b border-slate-100 h-[65px] flex items-center px-4 lg:px-8 shadow-sm'>
      <div className='flex items-center justify-between w-full'>
        
        {/* LEFT SECTION */}
        <div className='flex items-center gap-4'>
          <button onClick={handleShowSidebar} className='lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-all'><AiOutlineMenu size={18} /></button>

          <NavLink to={'/'} target='_blank' className='group relative hidden sm:flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 bg-slate-900 rounded-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95'>
            <div className="relative w-8 h-8 flex items-center justify-center bg-white/10 rounded-[11px] border border-white/10 group-hover:bg-[#ff5b07] transition-all duration-500">
              <BiWorld size={16} className="text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest group-hover:text-orange-400">Public</span>
              <span className="text-[12px] font-bold text-white tracking-tight">Live Site</span>
            </div>
          </NavLink>
        </div>

        {/* RIGHT SECTION */}
        <div className='flex items-center gap-3'>
          
          {/* NOTIFICATION ANCHOR */}
          <div className='relative' ref={notifRef}>
            <button 
              onClick={() => setShowNotif(!showNotif)}
              className={`relative cursor-pointer p-2.5 rounded-xl transition-all duration-300 ${showNotif ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <BiBell size={22} />
              <span className='absolute top-2.5 right-2.5 w-2 h-2 bg-[#ff5b07] rounded-full border-2 border-white animate-pulse'></span>
            </button>

            {/* UPGRADED NOTIFICATION POPUP */}
            {showNotif && (
              <div className="absolute top-full mt-3 right-0 w-[340px] bg-white border border-slate-100 rounded-[24px] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                
                {/* Header with Features */}
                <div className="p-5 pb-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Activity Feed</h3>
                    <button className="text-[10px] cursor-pointer font-bold text-slate-400 hover:text-[#ff5b07] flex items-center gap-1 transition-colors">
                      <BiEnvelopeOpen /> Mark all read
                    </button>
                  </div>

                  {/* Tabs Logic */}
                  <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                    <button 
                      onClick={() => setActiveTab('all')}
                      className={`flex-1 cursor-pointer py-1.5 text-[11px] font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setActiveTab('unread')}
                      className={`flex-1 cursor-pointer py-1.5 text-[11px] font-bold rounded-lg transition-all ${activeTab === 'unread' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      Unread
                    </button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar px-2 pb-2">
                  {filteredNotif.length > 0 ? (
                    filteredNotif.map((n) => (
                      <div key={n.id} className="group p-3 flex gap-4 hover:bg-slate-50 rounded-[18px] cursor-pointer transition-all mb-1 relative">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                          {n.icon}
                        </div>
                        <div className="flex flex-col gap-0.5 pr-6">
                          <p className={`text-[12px] font-bold ${n.unread ? 'text-slate-900' : 'text-slate-500'}`}>{n.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{n.desc}</p>
                          <p className="text-[9px] text-slate-300 mt-1 font-medium">{n.time}</p>
                        </div>
                        {n.unread && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#ff5b07] rounded-full"></div>}
                        
                        {/* Action on Hover */}
                        <button className="absolute cursor-pointer right-3 top-3 opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all">
                          <BiTrash size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-slate-400 text-[11px] font-medium">No unread notifications</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <button className="w-full cursor-pointer py-4 bg-slate-50/50 text-[11px] font-black text-slate-500 hover:text-[#ff5b07] hover:bg-orange-50 transition-all uppercase tracking-widest border-t border-slate-50">
                  Settings & Preferences
                </button>
              </div>
            )}
          </div>

          <div className='h-6 w-[1px] bg-slate-100 mx-1'></div>

          {/* COMPACT PROFILE */}
          <button className='flex items-center gap-2.5 p-1 pr-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100 group'>
            <img src="https://ui-avatars.com/api/?name=Admin&background=0f172a&color=fff&bold=true" alt="user" className='w-8 h-8 rounded-lg shadow-sm' />
            <div className='text-left hidden sm:block'>
              <p className='text-[11px] font-black text-slate-900 leading-none'>Admin</p>
              <p className='text-[9px] font-bold text-slate-400 mt-1 tracking-tighter'>SYSTEM MANAGER</p>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ff5b07; }
      `}</style>
    </header>
  );
};

export default AdminHeader;