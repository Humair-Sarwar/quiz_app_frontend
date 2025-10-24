import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const WebsiteLayout: React.FC = () => {
  return (
    <>
    <Header/>
      <Outlet/>
    <Footer/>
    </>
  )
}

export default WebsiteLayout
