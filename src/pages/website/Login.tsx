import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";

const Login: React.FC = () => {
  return (
    <>
      <div className="w-full h-[100vh] bg-[#fff5ed] flex justify-center items-center">
              <form action="" className="bg-white p-6 form-container-target mx-4">
                <NavLink to="/" className="flex items-center gap-1 justify-center">
                            <h3 className="font-bold text-4xl">Quiz</h3>
                            <HiOutlineLightBulb className='text-4xl primary-color-text'/>
                          </NavLink>
                <div className='mt-5'>
      <label htmlFor="name">Name:</label>
                <input type="email" id='name' className="mt-1" placeholder="Enter Your Email" />
                </div>
                <div className='mt-3'>
                  <label htmlFor="password">Password:</label>
                <input
                id='password'
                  type="password"
                  className="mt-1"
                  placeholder="Enter Your Password"
                /></div>
                <button className="primary-button w-full mt-5">Log in</button>
                <p className="mt-5 text-center text-[14px]">
                  Don't have an account?{" "}
                  <NavLink className={"font-bold"} to={"/join-now"}>
                    Register
                  </NavLink>
                </p>
                <div className="bg-[#f5f5f5] py-3 mt-5 rounded-[10px]">
                  <p className="text-center text-[14px]">
                    Forgot your password?{" "}
                    <NavLink className={"font-bold"} to={"/join-now"}>
                      Reset It
                    </NavLink>
                  </p>
                </div>
              </form>
            </div> 
    </>
  );
};

export default Login;
