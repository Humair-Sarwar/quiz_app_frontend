import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaListCheck } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";


const UserSidebar: React.FC = () => {
  return (
    <>
      <div className='bg-white rounded-2xl p-6 lg:w-[390px] shadow md:w-full sm:w-full w-full'>
        <h5 className='text-[13px] font-semibold mb-2 uppercase text-[#848484]'>Dashboard</h5>
        <ul className='mb-7'>
            <li className='text-[14px] cursor-pointer'><NavLink
  to="/user/quiz-list"
  className={({ isActive }) =>
    `flex items-center gap-2 rounded-md transition-colors ${
      isActive
        ? " text-[#ff5b07]"
        : "text-gray-700 hover:text-[#ff5b07]"
    }`
  }
>
  <FaListCheck />
  Solved Quiz List
</NavLink></li>
        </ul>
        <h5 className='text-[13px] font-semibold mb-2 uppercase text-[#848484]'>Account Settings</h5>
        <ul className=''>
          <li className='text-[14px] cursor-pointer'><NavLink to={'/user/profile-info'} className={({ isActive }) =>
    `flex items-center gap-2 rounded-md transition-colors ${
      isActive
        ? " text-[#ff5b07]"
        : "text-gray-700 hover:text-[#ff5b07]"
    }`
  }><FaUserCog />  Profile Info</NavLink></li>

        </ul>
      </div>
    </>
  )
}

export default UserSidebar
