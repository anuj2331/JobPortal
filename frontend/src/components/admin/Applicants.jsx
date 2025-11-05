import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-800 tracking-tight mb-3 sm:mb-0">
            Applicants
            <span className="ml-2 text-[#6A38C2]">
              ({applicants?.applications?.length || 0})
            </span>
          </h1>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 p-3 sm:p-4 md:p-6 transition-all duration-300">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
