import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineLightBulb } from "react-icons/hi";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-white">
  <div className="container mx-auto max-w-[1400px] px-4 py-15">
    {/* Responsive Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Brand Section */}
      <div>
        <NavLink to="/" className="flex items-center gap-1 mb-5 justify-start sm:justify-start">
          <h3 className="font-bold text-4xl primary-color-text">Quiz</h3>
          <HiOutlineLightBulb className="text-4xl" />
        </NavLink>
        <p className="text-left text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
          reprehenderit laudantium error quod dolor totam!
        </p>
      </div>

      {/* Links Section */}
      <div className="text-left">
        <h4 className="font-semibold text-2xl mb-3">Links</h4>
        <ul className="space-y-2">
          <li>
            <NavLink to="/" className="hover:text-orange-500 transition-colors">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="hover:text-orange-500 transition-colors">
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="hover:text-orange-500 transition-colors">
              FAQs
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Newsletter Section */}
      <div className="text-left">
        <h3 className="text-2xl font-semibold mb-2">
          Sign up for exciting tech updates & offers!
        </h3>
        <p className="my-4 text-sm text-gray-600">
          Don't miss out on updates regarding new launches and same-day delivery
          availability!
        </p>
        <form className="flex gap-3 join-n-letter-form">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full sm:flex-1 rounded-lg px-3 py-2 "
          />
          <button className="primary-button">Submit</button>
        </form>
      </div>
    </div>
  </div>

  {/* Footer Bottom Bar */}
  <div className="text-center border-t border-gray-300 py-4">
    <p className="text-sm text-gray-600">
      © 2025 Quiz App | Developed by{" "}
      <a href="#" className="font-semibold hover:text-orange-500">
        Humair Sarwar
      </a>
    </p>
  </div>
</footer>

    </>
  )
}

export default Footer
