import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WebsiteLayout from '../layouts/WebsiteLayout/WebsiteLayout'
import Home from '../pages/website/Home'
import Login from '../pages/website/Login'
import Signup from '../pages/website/Signup'
import CategoriesListingPage from '../pages/website/CategoriesListingPage'
import QuizListing from '../pages/website/QuizListing'

const WebsiteRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<WebsiteLayout/>}>
            <Route path='/' element={<Home/>}/>
        <Route path='/categories' element={<CategoriesListingPage/>}/>
        <Route path='/categories/list' element={<QuizListing/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/join-now' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default WebsiteRoutes
