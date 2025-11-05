import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </header>

      <main className="flex flex-col gap-8 sm:gap-10 md:gap-16 lg:gap-20 w-full">
        <section className="w-full pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-10">
          <HeroSection />
        </section>

        <section className="w-full px-3 sm:px-6 md:px-10">
          <CategoryCarousel />
        </section>

        <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 bg-white py-10 sm:py-14 md:py-20 rounded-t-3xl shadow-inner">
          <LatestJobs />
        </section>
      </main>

      <footer className="mt-auto bg-gray-900 text-white px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
