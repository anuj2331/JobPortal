import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0 mt-10 sm:mt-16 md:mt-20">
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-10 my-8 sm:my-12 md:my-16">
        <span className="mx-auto px-5 py-2 sm:px-6 sm:py-3 rounded-full bg-gray-100 text-[#F83002] text-xs sm:text-sm md:text-base font-medium shadow-sm w-fit">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug text-gray-900">
          Search, Apply & <br className="hidden sm:block" /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-2">
          This is the Job Portal website, where you can get your dream job
          according to your skill and interest.
        </p>

        <div className="flex w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 shadow-md sm:shadow-lg border border-gray-200 pl-2 sm:pl-3 pr-1 rounded-full items-center gap-2 mx-auto bg-white focus-within:ring-2 focus-within:ring-[#6A38C2] transition-all duration-300">
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm sm:text-base md:text-lg px-3 py-2 sm:py-3 rounded-l-full bg-transparent"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full sm:rounded-r-full bg-[#6A38C2] hover:bg-[#5a2fb0] px-3 sm:px-5 py-2 sm:py-3 text-white flex items-center justify-center transition-all duration-300"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
