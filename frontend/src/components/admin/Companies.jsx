import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow max-w-7xl w-full mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 my-5">
          <Input
            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 focus:ring-2 focus:ring-[#6A38C2] focus:outline-none transition-all duration-200"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto bg-[#6A38C2] hover:bg-[#5c0ae9] text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            New Company
          </Button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 md:p-8 transition-all duration-200">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
