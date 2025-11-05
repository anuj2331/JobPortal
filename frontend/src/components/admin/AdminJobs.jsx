

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow max-w-7xl w-full mx-auto my-6 px-4 sm:px-6 lg:px-8">
        
       
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 my-5">
          <Input
            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 focus:ring-2 focus:ring-[#6A38C2] focus:outline-none transition-all duration-200"
            placeholder="Filter by name or role"
            onChange={(e) => setInput(e.target.value)}
          />
          
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5c0ae9] text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            New Job
          </Button>
        </div>

     
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 md:p-8 transition-all duration-200">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
