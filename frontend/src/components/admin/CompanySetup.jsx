

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 w-full max-w-3xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-200"
        >
        
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 mb-8">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-medium w-full sm:w-auto hover:bg-gray-100 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800 text-center sm:text-left">
              Company Setup
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label className="text-sm font-medium text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="mt-2 w-full text-sm sm:text-base"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-2 w-full text-sm sm:text-base"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="mt-2 w-full text-sm sm:text-base"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2 w-full text-sm sm:text-base"
              />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-sm font-medium text-gray-700">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2 w-full text-sm sm:text-base cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <Button
                className="w-full flex justify-center items-center gap-2 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Loader2 className="animate-spin h-4 w-4" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-2 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
