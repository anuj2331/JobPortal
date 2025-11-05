

import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg bg-white border border-gray-100 
                    flex flex-col justify-between transition-all duration-300 
                    hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
  
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full p-2 sm:p-2.5 md:p-3" size="icon">
          <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 my-3 flex-wrap sm:flex-nowrap">
        <div className="p-3 sm:p-4 border rounded-full bg-gray-50">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-base sm:text-lg truncate">{job?.company?.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500 truncate">India</p>
        </div>
      </div>

   
      <div>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl my-2 truncate">
          {job?.title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
          {job?.description}
        </p>
      </div>


      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

    
      <div className="flex flex-col sm:flex-row gap-2 mt-5 w-full">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 text-sm sm:text-base py-2 sm:py-3"
        >
          Details
        </Button>
        <Button className="bg-[#0a5a45] flex-1 text-sm sm:text-base py-2 sm:py-3 hover:bg-[#0b7058]">
          Save For Later
        </Button>
      </div>
    </div>
  )
}

export default Job
