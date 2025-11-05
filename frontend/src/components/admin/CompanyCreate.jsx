import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-2 text-gray-800">
            Your Company Name
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className="flex flex-col gap-5 bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-200">
          <div>
            <Label className="text-sm sm:text-base font-medium text-gray-700">
              Company Name
            </Label>
            <Input
              type="text"
              className="my-3 w-full text-sm sm:text-base"
              placeholder="JobHunt, Microsoft, etc."
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
