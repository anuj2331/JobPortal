import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 sm:my-8 md:my-10 p-4 sm:p-6 md:p-8 shadow-md">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border border-gray-300">
              <AvatarImage
                src="https://th.bing.com/th/id/OIP.YBpXSFpgZNTEKo-yQ8_DNQHaEK?w=270&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                alt="profile"
              />
            </Avatar>
            <div className="truncate">
              <h1 className="font-semibold text-lg sm:text-xl truncate">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                {user?.profile?.bio}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="mt-3 sm:mt-0 w-full sm:w-auto"
          >
            <Pen className="h-4 w-4 sm:mr-1" />{" "}
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>

        <div className="my-6 flex flex-col sm:flex-row sm:items-center sm:gap-10 text-gray-700 text-sm sm:text-base">
          <div className="flex items-center gap-2 my-2 break-all">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#6A38C2]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 my-2 break-all">
            <Contact className="h-4 w-4 sm:h-5 sm:w-5 text-[#6A38C2]" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-bold text-base sm:text-lg mb-3">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="text-sm sm:text-base px-3 py-1">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="my-5 w-full">
          <Label className="text-md sm:text-lg font-bold mb-1 block">
            Resume
          </Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline cursor-pointer block truncate text-sm sm:text-base"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500 text-sm">NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 md:p-8 mt-5 shadow-md">
        <h1 className="font-bold text-lg sm:text-xl mb-4 text-center sm:text-left">
          Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
