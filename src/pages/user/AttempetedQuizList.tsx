import React from 'react'
import Pagination from '../../components/Pagination'
import { FaEye } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";

const AttempetedQuizList: React.FC = () => {
  return (
    <>
      <div className='w-full'>
        <h2 className='text-[20px] font-semibold mb-5 flex items-center gap-4'><FaListCheck /> Solved Quiz List</h2>
        <div className="w-full overflow-x-auto">
  <div className="min-w-max border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
    <table className="w-full text-sm border-collapse">
      <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
        <tr>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Sr. #</th>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Quiz Name</th>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Quiz Category</th>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Total Questions</th>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Correct</th>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Incorrect</th>
          <th className="px-6 py-3 text-left font-semibold text-[13px] capitalize whitespace-nowrap">Skipped</th>
          <th className="px-6 py-3 text-center font-semibold text-[13px] capitalize whitespace-nowrap">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100 text-gray-800">
        <tr className="hover:bg-gray-50 transition">
          <td className="px-6 py-4 text-[13px] whitespace-nowrap">1</td>
          <td className="px-6 py-4 text-[13px] whitespace-nowrap">General Knowledge Quiz</td>
          <td className="px-6 py-4 text-[13px] whitespace-nowrap">General</td>
          <td className="px-6 py-4 text-[13px] whitespace-nowrap">10</td>
          <td className="px-6 py-4 text-[13px] whitespace-nowrap text-green-600 font-medium">8</td>
          <td className="px-6 py-4 text-[13px] whitespace-nowrap text-red-500 font-medium">1</td>
          <td className="px-6 py-4 text-[13px] whitespace-nowrap text-yellow-500 font-medium">1</td>
          <td className="px-6 py-4 text-center">
            <button className="text-green-600 hover:text-green-800 transition">
              <FaEye />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


<Pagination/>
      </div>
    </>
  )
}

export default AttempetedQuizList
