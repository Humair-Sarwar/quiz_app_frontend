import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'



const AdminLayout: React.FC = () => {
    const [showHideSidebar, setShowHideSidebar] = useState<boolean>(false);
    const handleShowSidebar = ()=>{
        setShowHideSidebar(true);
    }
    const handlehideSidebar = ()=>{
        setShowHideSidebar(false);
    }
  return (
    <>
   
      
    <div className='flex items-start  user-dashboard-layout'>
        <AdminSidebar showHideSidebar={showHideSidebar} handlehideSidebar={handlehideSidebar}/>
        <div className='flex flex-col w-full min-h-screen ms-[280px] right-admin-content-target bg-[#f0f0f0]'>
        <AdminHeader handleShowSidebar={handleShowSidebar}/>
        <Outlet/>
        </div>
        
    </div>
 
    
    </>
  )
}

export default AdminLayout
