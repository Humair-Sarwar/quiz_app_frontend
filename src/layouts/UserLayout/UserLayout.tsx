import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../WebsiteLayout/Header'
import Footer from '../WebsiteLayout/Footer'
import UserSidebar from './UserSidebar'



const UserLayout: React.FC = () => {
  return (
    <>
    <Header/>
    <div className='bg-[#f0f0f0] py-10'>
      
    <div className='flex gap-9 container mx-auto max-w-[1400px] px-4 items-start user-dashboard-layout'>
        <UserSidebar/>
        <Outlet/>
    </div>
 
      </div>
    <Footer/>
    </>
  )
}

export default UserLayout
