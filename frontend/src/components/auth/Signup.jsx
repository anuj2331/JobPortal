import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading,user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFiletHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler=async (e) =>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("fullname",input.fullname);
      formData.append("email",input.email);
      formData.append("phoneNumber",input.phoneNumber);
      formData.append("password",input.password);
      formData.append("role",input.role);
      if(input.file){
          formData.append("file",input.file);
      }
     try{
       dispatch(setLoading(true));
          const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
              "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
          });
          if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
          }
     }catch(error){
       console.log(error);
       toast.error(error.response.data.message);
     }finally{
      dispatch(setLoading(false));
     }
  }

  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-200 rounded-md p-6 sm:p-8 bg-white shadow-md"
        >
          <h1 className="font-bold text-2xl sm:text-3xl mb-6 text-center ">Signup</h1>
          
          <div className="my-3">
            <Label>Full Name</Label>
            <Input 
              type="text" 
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Anuj"
            />
          </div>
          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email" 
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="anujm5207@gmail.com" 
            />
          </div>
          <div className="my-3">
            <Label>Phone Number</Label>
            <Input 
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8080808080" 
            />
          </div>
          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********" 
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-4">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role==='student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>  
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role==='recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input 
                accept="image/*" 
                type="file" 
                onChange={changeFiletHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? 
            <Button className="w-full my-4 flex justify-center items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
           : 
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          }

          <span className="text-sm text-center mt-2">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;




