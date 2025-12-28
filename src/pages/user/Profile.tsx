import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from "react-icons"; // Import this to fix the TS error
import { FaUserCog, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineGlobeAlt, HiOutlineUser } from "react-icons/hi";
import bg from '../../assets/images/bg.jpg';
import my_pic from '../../assets/images/my-pic.jpg';
import EditProfilePopup from '../../components/EditProfilePopup';

// --- Sub-component for Info Items ---
interface InfoItemProps {
  icon: IconType; // Accepts the icon component reference
  label: string;
  value: string;
}

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => (
  <div className='flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group'>
    <div className='p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-slate-400 group-hover:text-[#ff5b07] transition-colors'>
      <Icon size={20} /> 
    </div>
    <div>
      <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>{label}</p>
      <p className='text-[15px] font-bold text-slate-800'>{value}</p>
    </div>
  </div>
);

// --- Main Profile Component ---
const Profile: React.FC = () => {
  const [showEditProfile, setEditProfile] = useState<boolean>(false);
  const handleClosePopup = () => setEditProfile(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className='w-full'
    >
      {/* Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-3'>
          <div className="p-2 bg-orange-100 rounded-lg">
            <FaUserCog className="text-[#ff5b07]" size={20} />
          </div>
          Account Settings
        </h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex items-center gap-2 bg-slate-900 cursor-pointer text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-[#ff5b07] transition-all shadow-lg shadow-slate-200'
          onClick={() => setEditProfile(true)}
        >
          <FaUserEdit size={14} /> Edit Profile
        </motion.button>
      </div>

      <div className="flex gap-8 items-start lg:flex-row flex-col">
        {/* Left Side: Avatar Card */}
        <div className='bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 rounded-[2.5rem] p-2 text-center w-full lg:w-[400px] overflow-hidden'>
          <div className='w-full h-[140px] relative'>
            <img src={bg} alt="cover" className='object-cover h-full w-full rounded-[2rem]' />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-45px] h-[110px] w-[110px] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
              <img src={my_pic} alt="avatar" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className='px-6 pb-8 pt-16'>
            <h3 className='text-xl font-bold text-slate-800 tracking-tight'>Humair Sarwar</h3>
            <p className='text-slate-400 font-bold text-[11px] uppercase tracking-widest mt-1'>Premium Member</p>
            
            <div className='h-[1px] bg-slate-50 my-6' />

            <button className='w-full flex cursor-pointer items-center justify-center gap-2 py-3 border-2 border-slate-50 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all'>
              <FaSignOutAlt /> Logout Account
            </button>
          </div>
        </div>

        {/* Right Side: Info Card */}
        <div className='bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 rounded-[2.5rem] p-8 md:p-10 w-full flex flex-col gap-6'>
          <h2 className='text-xs font-black uppercase tracking-[0.2em] text-[#ff5b07] mb-2'>
            Personal Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Note: Pass the component name itself, not the <Component /> element */}
            <InfoItem icon={HiOutlineUser} label="User Name" value="Humair Sarwar" />
            <InfoItem icon={HiOutlineMail} label="Email Address" value="test@gmail.com" />
            <InfoItem icon={HiOutlinePhone} label="Phone Number" value="0308 8340373" />
            <InfoItem icon={HiOutlineGlobeAlt} label="Location" value="USA" />
          </div>

          <div className="mt-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Member Note</h4>
            <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
              "Dedicated quiz enthusiast aiming for the global leaderboard."
            </p>
          </div>
        </div>
      </div>

      {showEditProfile && <EditProfilePopup handleClosePopup={handleClosePopup} />}
    </motion.div>
  );
};

export default Profile;