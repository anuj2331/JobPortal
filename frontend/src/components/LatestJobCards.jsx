

import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl bg-white border border-gray-100 cursor-pointer 
      transition-all duration-300 ease-in-out hover:scale-[1.02] w-full max-w-md sm:max-w-full mx-auto'
    >
   
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4'>
        <div className='flex-1 min-w-0'>
          <h1 className='font-semibold text-base sm:text-lg md:text-xl text-gray-900 truncate'>
            {job?.company?.name}
          </h1>
          <p className='text-xs sm:text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div className='my-2 md:my-3'>
        <h1 className='font-bold text-base sm:text-lg md:text-xl text-gray-800 my-1 line-clamp-1'>
          {job?.title}
        </h1>
        <p className='text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2'>
          {job?.description}
        </p>
      </div>

   
      <div className='flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4'>
        <Badge className='text-blue-700 font-semibold text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1' variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className='text-[#F83002] font-semibold text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1' variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className='text-[#7209b7] font-semibold text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1' variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
