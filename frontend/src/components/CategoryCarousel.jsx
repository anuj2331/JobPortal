



import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Machine Learning",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full bg-gray-50 py-10 sm:py-14">
      <Carousel className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <CarouselContent className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-[85%] sm:w-1/2 md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="w-full text-xs sm:text-sm md:text-base lg:text-lg py-2 sm:py-3 rounded-full border-gray-300 hover:bg-[#6A38C2] hover:text-white transition-all duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center items-center mt-6 gap-4">
          <CarouselPrevious className="scale-90 sm:scale-100" />
          <CarouselNext className="scale-90 sm:scale-100" />
        </div>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
