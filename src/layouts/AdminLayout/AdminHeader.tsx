import React from 'react'
import { BiWorld } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";

interface AdminHeaderProps{
  handleShowSidebar: ()=> void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({handleShowSidebar}) => {
  return (
    <>
      <div className='admin-header p-3 w-full sticky top-0 left-auto right-0 bg-white h-[60px]'>
        <div className='flex gap-3'>
          <button onClick={handleShowSidebar} className='border-1 px-2 hidden mobile-btn-sidebar-admin rounded-[8px] border-orange-500 cursor-pointer'><AiOutlineMenu />
</button>
        <button className='mini-primary-button flex items-center gap-2'><BiWorld />
 Browse Web</button>
        </div>
      </div>
    </>
  )
}

export default AdminHeader
