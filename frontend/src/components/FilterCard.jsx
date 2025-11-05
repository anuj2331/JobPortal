import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Lucknow"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Machine Learning",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh", "6lakh to 25lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-800 text-center sm:text-left">
        Filter Jobs
      </h1>
      <hr className="mb-4 border-gray-200" />

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="flex flex-col gap-5 sm:gap-6"
      >
        {filterData.map((data, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h1 className="font-semibold text-base sm:text-lg text-gray-700">
              {data.filterType}
            </h1>

            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mt-1">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-2 rounded-md transition-all duration-200 cursor-pointer"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label
                      htmlFor={itemId}
                      className="text-sm sm:text-base text-gray-700 cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
