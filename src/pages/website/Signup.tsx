import React from 'react'
import { NavLink } from 'react-router-dom'

const Signup: React.FC = () => {
  return (
    <>
     <div className="w-full h-[100vh] bg-[#fff5ed] flex justify-center items-center">
        <form action="" className="bg-white p-6 form-container-target mx-4">
          <h1 className="text-3xl font-bold text-center">Join <span className='primary-color-text'>Now</span></h1>
          <div className='mt-5'>
<label htmlFor="name">Full Name:</label>
          <input type="text" id='name' className="mt-1" placeholder="Enter Your Full Name" />
          </div>
          <div className='mt-3'>
<label htmlFor="email">Email:</label>
          <input type="email" id='email' className="mt-1" placeholder="Enter Your Email" />
          </div>
          <div className='mt-3'>
            <label htmlFor="password">Password:</label>
          <input
          id='password'
            type="password"
            className="mt-1"
            placeholder="Enter Your Password"
          /></div>
          <div className='mt-3'>
            <label htmlFor="confirm-password">Confirm Password:</label>
          <input
          id='confirm-password'
            type="password"
            className="mt-1"
            placeholder="Enter Your Confirm Password"
          /></div>
          <button className="primary-button w-full mt-5">Create Account</button>
          <p className="mt-5 text-center text-[14px]">
           Already have an account?{" "}
            <NavLink className={"font-bold"} to={"/login"}>
              Log In
            </NavLink>
          </p>
       
        </form>
      </div> 
    </>
  )
}

export default Signup
