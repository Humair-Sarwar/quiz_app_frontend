import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const WebsiteLayout: React.FC = () => {
  return (
    <>
    <Header/>
      <Outlet/>
    </>
  )
}

export default WebsiteLayout
