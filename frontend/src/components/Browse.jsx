





import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto my-6 sm:my-10 px-3 sm:px-6 lg:px-10">
                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-10 text-gray-800 text-center sm:text-left">
                    Search Results ({allJobs.length})
                </h1>

                <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {allJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>

                {allJobs.length === 0 && (
                    <p className="text-center text-gray-500 mt-10 text-sm sm:text-base">
                        No jobs found. Try adjusting your search criteria.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Browse;
