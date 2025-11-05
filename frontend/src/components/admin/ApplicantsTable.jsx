import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Table className="min-w-full text-sm sm:text-base">
          <TableCaption className="text-gray-500 mt-3 text-center">
            A list of your recently applied users
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">
                Full Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">
                Email
              </TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">
                Contact
              </TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">
                Resume
              </TableHead>
              <TableHead className="font-semibold text-gray-700 whitespace-nowrap">
                Date
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700 whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

       
          <TableBody>
            {applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="py-3 px-4 text-gray-700 font-medium whitespace-nowrap">
                    {item?.applicant?.fullname}
                  </TableCell>

                  <TableCell className="py-3 px-4 text-gray-700 break-words max-w-[200px]">
                    {item?.applicant?.email}
                  </TableCell>

                  <TableCell className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    {item?.applicant?.phoneNumber || "N/A"}
                  </TableCell>

                  <TableCell className="py-3 px-4 text-gray-700 whitespace-nowrap">
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-[#6A38C2] hover:underline"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item?.applicant?.profile?.resumeOriginalName ||
                          "View Resume"}
                      </a>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>

                  <TableCell className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {item?.applicant?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right py-3 px-4 cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="hover:text-[#6A38C2] transition duration-200" />
                      </PopoverTrigger>
                      <PopoverContent className="w-36 bg-white shadow-lg rounded-lg border border-gray-100">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer transition"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))
            ) : (
              <tr>
                <TableCell
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No applicants found
                </TableCell>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
