import React from 'react'
import { HiLightBulb } from 'react-icons/hi'
import { MdCategory, MdQuiz } from 'react-icons/md'
import dashboard_img from '../../assets/images/dashboard-img.png'

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="p-5 lg:p-10 h-[calc(100vh - 60px)] bg-[#f0f0f0]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className='shadow rounded-[8px] bg-white p-5'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-semibold text-[18px]'>Categories</h3>
                <h6 className='text-[22px] text-[#989898]'>0</h6>
              </div>
              <div className='rounded-[50%] p-2 bg-blue-500 text-white'>
                <MdCategory className='text-[24px]'/>
              </div>
            </div>
          </div>
           <div className='shadow rounded-[8px] bg-white p-5'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-semibold text-[18px]'>All Quiz's</h3>
                <h6 className='text-[22px] text-[#989898]'>12</h6>
              </div>
              <div className='rounded-[50%] p-2 bg-red-500 text-white'>
                <MdQuiz className='text-[24px]'/>
              </div>
            </div>
          </div>

           <div className='shadow rounded-[8px] bg-white p-5'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-semibold text-[18px]'>All Questions</h3>
                <h6 className='text-[22px] text-[#989898]'>12</h6>
              </div>
              <div className='rounded-[50%] p-2 bg-yellow-400 text-white'>
                <HiLightBulb className='text-[24px]'/>
              </div>
            </div>
          </div>
          <div className='shadow rounded-[8px] bg-white p-5'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-semibold text-[18px]'>Customers</h3>
                <h6 className='text-[22px] text-[#989898]'>12</h6>
              </div>
              <div className='rounded-[50%] p-2 bg-green-500 text-white'>
                <MdCategory className='text-[24px]'/>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-5">
          <div className='shadow rounded-[8px] bg-white p-5'>
            <div className='h-auto lg:w-[300px]'>
              <img className='h-full w-full object-contain' src={dashboard_img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
