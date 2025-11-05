import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
        <div className="space-y-3">
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 break-words">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Badge
              className="text-blue-700 font-semibold text-xs sm:text-sm md:text-base"
              variant="ghost"
            >
              {singleJob?.position} Position
            </Badge>
            <Badge
              className="text-[#F83002] font-semibold text-xs sm:text-sm md:text-base"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="text-[#7209b7] font-semibold text-xs sm:text-sm md:text-base"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium transition-all duration-300
          ${
            isApplied
              ? "bg-gray-600 text-white cursor-not-allowed"
              : "bg-[#a821c3] hover:bg-[#5f32ad] text-white shadow-md hover:shadow-lg"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="mt-8 border-b border-gray-300 pb-2">
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800">
          Job Description
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-800">
          <p>
            <span className="font-bold">Role:</span> {singleJob?.title}
          </p>
          <p>
            <span className="font-bold">Location:</span> {singleJob?.location}
          </p>
          <p>
            <span className="font-bold">Experience:</span>{" "}
            {singleJob?.experience} year(s)
          </p>
          <p>
            <span className="font-bold">Salary:</span> {singleJob?.salary} LPA
          </p>
        </div>

        <div className="space-y-3 text-sm sm:text-base md:text-lg text-gray-800">
          <p>
            <span className="font-bold">Description:</span>{" "}
            {singleJob?.description}
          </p>
          <p>
            <span className="font-bold">Total Applicants:</span>{" "}
            {singleJob?.applications?.length}
          </p>
          <p>
            <span className="font-bold">Posted Date:</span>{" "}
            {singleJob?.createdAt?.split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
