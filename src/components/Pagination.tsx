import React from 'react'

const Pagination: React.FC = () => {
  return (
      <div className="flex items-center justify-center space-x-2 mt-8">
  <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
    Prev
  </button>
  
  <button className="px-3 py-1 rounded-md bg-orange-500 text-white">1</button>
  <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
    2
  </button>
  <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
    3
  </button>
  <span className="px-2">...</span>
  <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
    10
  </button>

  <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
    Next
  </button>
</div>
  )
}

export default Pagination
